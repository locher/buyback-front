// https://nuxt.com/docs/api/configuration/nuxt-config

import { readdirSync } from 'fs';
import path from 'path';
// Import brand config
import brandConfig from './brand.config.json';

function listDirectories(pth: any) {
  const directories = readdirSync(pth, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dir) => dir.name);

  return directories;
}

const cssFiles = listDirectories('./assets/');
const cssToExclude = cssFiles.filter((c) => !c.includes(brandConfig.brand) && !c.includes('common'));
const cssToExcludePath = [];

for (const cte of cssToExclude) {
  cssToExcludePath.push(`**/assets/${cte}/**`);
}
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/eslint-module',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    'nuxt-typed-router',
    '@nuxtjs/i18n',
    'nuxt-lodash',
    '@vueuse/nuxt',
    '@vee-validate/nuxt',
  ],
  ssr: true,
  nitro: {
    preset: 'node-server',
  },
  spaLoadingTemplate: 'spa-loading-template.html',
  devtools: { enabled: true },
  devServer: {
    host: '0.0.0.0',
    port: 8080,
  },
  typescript: {
    strict: true,
  },
  i18n: {
    vueI18n: './i18n.config.ts',
  },
  veeValidate: {
    // disable or enable auto imports
    autoImports: true,
    // Use different names for components
    componentNames: {
      Form: 'VeeForm',
      Field: 'VeeField',
      FieldArray: 'VeeFieldArray',
      ErrorMessage: 'VeeErrorMessage',
    },
  },
  // Add brand styles and locales to paths
  alias: {
    themePath: `../assets/${brandConfig.brand}`,
    '@themePath': `../assets/${brandConfig.brand}`,
    common: `../assets/common`,
    '@common': `../assets/common`,
    '@localePath': `../locales/${brandConfig.brand}`,
  },
  ignore: cssToExcludePath,
  vite: {
    // Fix scss import
    resolve: {
      alias: {
        themePath: path.resolve(`assets/${brandConfig.brand}`),
        '@themePath': path.resolve(`assets/${brandConfig.brand}`),
        common: path.resolve(`assets/common`),
        '@common': path.resolve(`assets/common`),
        '@localePath': path.resolve(`locales/${brandConfig.brand}`),
      },
    },
  },
  plugins: [
    { src: '~/plugins/cookiebot/index.ts', mode: 'client' }, // only on client side
  ],
  // env value to be defined in .node.env file
  runtimeConfig: {
    public: {
      appUserBackendUrl: process.env.NUXT_PUBLIC_APP_USER_BACKEND_URL,
      appUserMulesoftUrl: process.env.NUXT_PUBLIC_APP_USER_MULESOFT_URL,
      gtmId: process.env.NUXT_PUBLIC_GTM_ID,
      gtmAuth: process.env.NUXT_PUBLIC_GTM_AUTH,
      gtmEnv: process.env.NUXT_PUBLIC_GTM_ENV,
      gtmCookie: process.env.NUXT_PUBLIC_GTM_COOKIE,
      gtmEnabled: process.env.NUXT_PUBLIC_GTM_ENABLED,
      appUserMenuUrl: process.env.NUXT_PUBLIC_APP_USER_MENU_URL,
      appUserMenuUrlHrc: process.env.NUXT_PUBLIC_APP_USER_MENU_URL_HRC,
      gtmEnvHubsideUp: process.env.NUXT_PUBLIC_GTM_ENV_HUBSIDE_UP,
      gtmIdHubsideUp: process.env.NUXT_PUBLIC_GTM_ID_HUBSIDE_UP,
      gtmAuthHubsideUp: process.env.NUXT_PUBLIC_GTM_AUTH_HUBSIDE_UP,
      gtmCookieHubsideUp: process.env.NUXT_PUBLIC_GTM_COOKIE_HUBSIDE_UP,
      recaptchaHubsideUp: process.env.NUXT_PUBLIC_RECAPTCHA_HUBSIDE_UP,
      appEnv: process.env.NUXT_PUBLIC_APP_ENV,
      appMock: process.env.NUXT_PUBLIC_APP_MOCK,
      appUrlPartnerClickAndGift: process.env.NUXT_PUBLIC_APP_URL_PARTNER_CLICK_AND_GIFT,
      amplitudeApiKeyHubsideUp: process.env.NUXT_PUBLIC_AMPLITUDE_API_KEY,
    },
  },
  // Putting appConfig here because app.config.ts breaks type recognition
  appConfig: {
    title: brandConfig.title,
    description: brandConfig.description,
    app: brandConfig.app,
    brand: brandConfig.brand,
    languageAvailable: brandConfig.languageAvailable,
    languageDefault: brandConfig.languageDefault,
  },
  components: ['~/components', '~/components/icons'],
  routeRules: {
    // Homepage pre-rendered at build time
    '/': { ssr: false },
    // renders only on client-side
    '/**': { ssr: false },
    '/**/**': { ssr: false },
  },
});

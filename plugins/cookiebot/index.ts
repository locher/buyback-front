import _ from 'lodash';
import { CookieBot } from './cookiebot';
import { CookieBotConfig } from '@/@types/cookiebot';

const CookieBotPlugin = {
  install: (app: any, config: CookieBotConfig) => {
    const instance = new CookieBot(config);
    app.config.globalProperties.$cookieBot = instance;
    app.provide('$cookieBot', instance);
  },
};

export default defineNuxtPlugin((nuxtApp) => {
  const appConfig = useAppConfig();
  const config = useRuntimeConfig();

  // Convert brand to PascalCase
  const BRAND_SUFFIX: string = appConfig.app.charAt(0).toUpperCase() + _.camelCase(appConfig.app).slice(1);

  const cookieBotOption = {
    cookieBotID: config.public[`gtmCookie${BRAND_SUFFIX}`] as string,
  };
  nuxtApp.vueApp.use(CookieBotPlugin, cookieBotOption);
});

import _ from 'lodash';
import { VueReCaptcha } from 'vue-recaptcha-v3';
import type { IReCaptchaOptions } from 'vue-recaptcha-v3/dist/IReCaptchaOptions';

export default defineNuxtPlugin((nuxtApp) => {
  const appConfig = useAppConfig();
  const config = useRuntimeConfig();

  // Convert brand to PascalCase
  const BRAND_SUFFIX: string = appConfig.app.charAt(0).toUpperCase() + _.camelCase(appConfig.app).slice(1);
  const recaptchaOption: IReCaptchaOptions = {
    siteKey: config.public[`recaptcha${BRAND_SUFFIX}`] as string,
    loaderOptions: {},
  };
  nuxtApp.vueApp.use(VueReCaptcha, recaptchaOption);
});

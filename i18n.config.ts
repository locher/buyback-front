import { nextTick } from 'vue';
import { createI18n, I18nOptions, LocaleMessages, VueMessageType } from 'vue-i18n';
import axios from 'axios';
import appLocales from '@localePath';
import _ from 'lodash';

export const SUPPORT_LOCALES = ['fr-fr', 'fr-be', 'nl-be', 'es-es', 'it-it', 'pt-pt', 'cs-cz', 'de-de', 'en-us'];
export const defaultFallbackLocalle: string = 'fr-fr';

export const defaultLocalle: string = 'fr-fr';

async function initLocaleMessages(): Promise<{ [x: string]: LocaleMessages<VueMessageType> }> {
  let messages: { [x: string]: LocaleMessages<VueMessageType> } = {};

  for (const supportedLocale of SUPPORT_LOCALES) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    messages[supportedLocale] = await import(`@/locales/${supportedLocale}.json`).then((lib) => lib.default || lib);
  }

  // Merge app specific locales with global locales
  messages = _.merge(messages, appLocales);

  return messages;
}

export async function setupI18n() {
  const options: I18nOptions = {
    locale: defaultLocalle,
    fallbackLocale: defaultFallbackLocalle,
    legacy: false,
    globalInjection: true,
    messages: await initLocaleMessages(),
  };
  const vuei18n = createI18n(options);
  // setI18nLanguage(vuei18n, options.locale);
  return {
    strategy: 'prefix_and_default',
    locale: defaultLocalle,
    locales: SUPPORT_LOCALES,
    fallbackLocale: defaultFallbackLocalle,
    legacy: false,
    globalInjection: true,
    messages: await initLocaleMessages(),
  };
}

export function setI18nLanguage(vuei18n: any, locale: any) {
  if (vuei18n.mode === 'legacy') {
    vuei18n.global.locale = locale;
  } else {
    vuei18n.global.locale.value = locale;
  }
  axios.defaults.headers.common['Accept-Language'] = locale;
  const rootDom = document.querySelector('html');
  if (rootDom?.getAttribute('lang') !== locale) rootDom?.setAttribute('lang', locale);

  return locale;
}

export async function loadLocaleMessages(vuei18n: any, paramLocale: any) {
  await nextTick();
  // return setI18nLanguage(i18n, paramLocale);
}

export const i18n = setupI18n();

// You can use `defineI18nConfig` to get type inferences for options to pass to vue-i18n.
export default defineI18nConfig(async () => {
  return await i18n;
});

import { cs, de, es, fr, it, nl, pt } from 'date-fns/locale';

const appConfig = useAppConfig();

const filters = {
  /**
   *
   * @param input
   * @returns
   */
  price(input: number) {
    if (isNaN(input)) {
      return '-';
    }
    return '$' + input.toFixed(2);
  },
  capitalize(value: string) {
    if (!value) return '';
    value = value.toString();
    return value.charAt(0).toUpperCase() + value.slice(1);
  },
  currentLocal() {
    let currentLang = window.location.pathname.replace(/^\/([^\\/]+).*/i, '$1');
    if (currentLang === '/' || currentLang.length !== 5) {
      currentLang = appConfig.languageDefault;
    }
    let currentLocal: Locale = fr;
    switch (currentLang) {
      case 'es-es':
        currentLocal = es;
        break;
      case 'fr-fr':
        currentLocal = fr;
        break;
      case 'it-it':
        currentLocal = it;
        break;
      case 'pt-pt':
        currentLocal = pt;
        break;
      case 'de-de':
        currentLocal = de;
        break;
      case 'cs-cz':
        currentLocal = cs;
        break;
      case 'nl-be':
        currentLocal = nl;
        break;
    }
    return currentLocal;
  },
};

export default filters;

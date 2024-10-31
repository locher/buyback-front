// import { BlockingModeOptions, ConsentBaseSettings, ConsentPageSettings, CookieBotConfig } from '../types/cookiebot';
import ScriptHelper from './script';
import { BlockingModeOptions, ConsentBaseSettings, ConsentPageSettings, CookieBotConfig } from '@/@types/cookiebot';

export class CookieBot {
  config: CookieBotConfig;

  private declarationId = 'CookieDeclaration';

  private defaultLocale = 'en';

  private dialogId = 'CybotCookiebotDialog';

  private scriptHelper = new ScriptHelper();

  constructor(config: CookieBotConfig) {
    this.config = config;
  }

  get blockingMode(): BlockingModeOptions {
    return this.config.blockingMode ? this.config.blockingMode : 'auto';
  }

  get cookieBotID(): string {
    return this.config.cookieBotID;
  }

  get isAsync(): boolean {
    return this.config.async ? this.config.async : false;
  }

  get locale(): string {
    return this.config.defaultLocale ? this.config.defaultLocale : this.defaultLocale;
  }

  async consentBanner(options: ConsentBaseSettings): Promise<void> {
    const scriptID = `ScriptID${this.dialogId}`;
    const oldScript = document.getElementById(scriptID);

    /**
     * To prevent double execution of script tag, first remove script
     * if exists
     */
    if (oldScript !== null) {
      this.scriptHelper.removeScript(document.body, oldScript);
    }

    const script = await this.scriptHelper.createScriptWithOptions(
      [
        {
          name: 'data-blockingmode',
          value: this.blockingMode,
        },
        {
          name: 'data-cbid',
          value: this.cookieBotID,
        },
        {
          name: 'data-culture',
          value: options?.locale ? options.locale : this.defaultLocale,
        },
        {
          name: 'id',
          value: scriptID,
        },
      ],
      'https://consent.cookiebot.com/uc.js',
      options?.async ? options.async : this.isAsync
    );

    document.body.appendChild(script);
  }

  async consentPage(options: ConsentPageSettings): Promise<void> {
    if (!options?.ref) {
      return console.error('Ref key not defined when calling consentPage method. Aborting...');
    }

    const oldScript = document.getElementById(this.declarationId);

    /**
     * To prevent double execution of script tag, first remove script
     * if exists
     */
    if (oldScript !== null) {
      this.scriptHelper.removeScript(options?.ref, oldScript, true);
    }

    const script = await this.scriptHelper.createScriptWithOptions(
      [
        {
          name: 'data-culture',
          value: options?.locale ? options.locale : this.defaultLocale,
        },
      ],
      `https://consent.cookiebot.com/${this.cookieBotID}/cd.js`,
      options?.async ? options.async : this.isAsync
    );

    options.ref.appendChild(script);
  }
}

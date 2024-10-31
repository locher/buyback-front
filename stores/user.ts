import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import jwtDecode from 'jwt-decode';
import { AxiosError } from 'axios';
import type { AxiosResponse } from 'axios';
import * as amplitude from '@amplitude/analytics-browser';
import type { UserInfo } from '~/@types/models/user-info';

export const useUserStore = defineStore('user', {
  state: () => ({
    token: useLocalStorage('token', ''),
    user: null as UserInfo | null,
    contract: null as any,
    swapOfferAvailable: null as any,
    swapOfferFuture: null as any,
    swapOfferAvailibility: null as any,
    swapDelay: null as any,
  }),
  actions: {
    login(token: string) {
      const { $i18n } = useNuxtApp();
      const appConfig = useAppConfig();

      this.token = token;
      initializeUserStore();

      // Set user language based on contract
      $i18n.locale.value = this.user?.languageCode.toLowerCase() ?? appConfig.languageDefault;

      //Amplitude
      amplitude.setUserId(this.user?.currentContract?.contractNumber);
      const identify = new amplitude.Identify();
      identify
        .set('contract_creation_date', this.user?.currentContract?.creationDate)
        .set('subscription_name', this.user?.currentContract?.package)
        .set('contract_status', this.user?.contracts[0]?.enabled ? 'enabled' : 'disabled')
        .set('contract_country_code', this.user?.countryCode)
        .set('user_language', this.user?.languageCode)
        .set('is_internal_tester', /@hubside.com|@sfam.eu/.test(this.user?.username));
      amplitude.identify(identify);
    },
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
      localStorage.removeItem('contractInfos');
      localStorage.removeItem('_currentContractNumber');
      localStorage.removeItem('currentUserContract');
      localStorage.removeItem('_infosSmsSentByContractNumber');
      this.token = '';
      this.user = null;
      this.contract = null;
    },
    decodeToken() {
      if (this.token) {
        try {
          this.user = jwtDecode(this.token);
          localStorage.setItem('token', this.token);
        } catch {
          this.logout(); // Réinitialiser en cas d'erreur
        }
      }
    },
    async getContract() {
      const { $api } = useNuxtApp();
      try {
        const response: AxiosResponse<object, any> = await $api.offer.getAdvantagesOfferItem(
          this.user?.contracts[0]?.type as string,
          this.user?.brand as string,
          this.user?.currentContract?.contractNumber as string,
          this.user?.currentContract?.package as string,
          this.user?.languageCode as string
        );
        this.contract = response.data;
        this.swapOfferAvailable = this.contract?.advantageGift?.offers?.find(
          (offer) => offer.name?.includes('SWAP') && offer.status === 'available'
        );

        this.swapOfferFuture = this.contract?.advantageGift?.offers?.find(
          (offer) => offer.name?.includes('SWAP') && offer.status === 'future'
        );

        this.swapOfferAvailibility = intervalDate(new Date(this.swapOfferFuture?.availableDate), new Date());

        this.swapDelay = this.swapOfferFuture?.occurrences[0]?.duration * 30.41;

        return true;
      } catch {
        // Do nothing
      }
    },
  },
});

// Initialisation automatique lors du chargement de l'application
export function initializeUserStore() {
  const userStore = useUserStore();
  userStore.decodeToken(); // Décode le token s'il existe dans le LocalStorage
}

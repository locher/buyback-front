import { defineStore } from 'pinia';
import type { AxiosError, AxiosResponse } from 'axios';
import { useUserStore } from '~/stores/user';

export const useDevicesStore = defineStore('devices', {
  state: () => ({
    devices: null,
    swaps: null,
  }),
  actions: {
    async getDevices() {
      const { $api } = useNuxtApp();
      const userStore = useUserStore();

      // Get declared products
      try {
        const declarationResponse: AxiosResponse<any> =
          await $api.productDeclaration.getDeclarationsByContractNumberProductDeclarationCollection(
            userStore.user?.currentContract?.contractNumber as string
          );

        // If success and have devices, register them
        if (declarationResponse.data.length > 0) {
          this.devices = declarationResponse.data;
        }

        const swapsResponse: AxiosResponse<any> = await $api.productSwap.getSwapByContractNumberProductSwapCollection(
          userStore.user?.currentContract?.contractNumber as string
        );

        // If success and have devices, register them
        if (swapsResponse.data.length > 0) {
          this.swaps = swapsResponse.data;
        }
      } catch {
        // DO nothing
      }
    },
  },
});

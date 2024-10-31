import axios from 'axios';
import {
  ProductDeclarationApi,
  type ProductDeclarationApiInterface,
} from '~/repository/customer-api/apis/product-declaration-api';
import { OfferApi, type OfferApiInterface } from '~/repository/customer-api/apis/offer-api';
import type { UserApiInterface } from '~/repository/customer-api/apis/user-api';
import { Configuration } from '~/repository/customer-api/configuration';
import { LoginApi, type LoginApiInterface } from '~/repository/customer-api/apis/login-api';
import {
  ProductSwapApi,
  UserApi,
  type ProductSwapApiInterface,
  type ContractApiInterface,
  ContractApi,
} from '~/repository/customer-api';
import type { Phone } from '~/@types/phone';
import { useUserStore } from '~/stores/user';
import { useDevicesStore } from '~/stores/devices';

// 1 Devices interface for smartphone list
interface DeviceApiInterface {
  getDeviceCollection(): Promise<Phone[]>;
}

// 2 DeviceApiInterface Implementation
class DeviceApiService implements DeviceApiInterface {
  public async getDeviceCollection(): Promise<Phone[]> {
    try {
      const response = await fetch('/smartphone-list.json');
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération du fichier JSON');
      }
      const smartphoneList = (await response.json()) as Phone[];
      return smartphoneList;
    } catch {
      return [];
    }
  }
}

interface IApiInstance {
  login: LoginApiInterface;
  user: UserApiInterface;
  contract: ContractApiInterface;
  offer: OfferApiInterface;
  productDeclaration: ProductDeclarationApiInterface;
  productSwap: ProductSwapApiInterface;
  devices: DeviceApiInterface; // 3 Add DeviceInterface to api plugin
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default defineNuxtPlugin({
  async setup(nuxtApp) {
    const config = useRuntimeConfig();
    const userStore = useUserStore();
    const devicesStore = useDevicesStore();

    axios.interceptors.request.use(
      (config) => {
        // Make sure token is set before request
        if (localStorage.getItem('token')) {
          config.headers.Authorization = `Bearer ${useLocalStorage('token', '').value}`;
        }
        return config;
      },
      (error) => {
        // Do something with request error
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      async (response) => {
        if (
          localStorage.getItem('token') &&
          response.config.method === 'post' &&
          response.config.headers['Authorization']
        ) {
          // Refresh contract after OC activation
          await userStore.getContract();
          await devicesStore.getDevices();
        }
        return response;
      },
      (error) => {
        // Do something with request error
        return Promise.reject(error);
      }
    );
    let apiToken = '';

    const token = useLocalStorage('token', '');
    if (token) {
      apiToken = `Bearer ${token.value}`;
    }

    const fetchOptions = new Configuration({
      basePath: config.public.appUserBackendUrl,
      apiKey: apiToken,
      baseOptions: {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    });

    // An object containing all repositories we need to expose
    const modules: IApiInstance = {
      login: new LoginApi(fetchOptions, config.public.appUserBackendUrl, axios),
      user: new UserApi(fetchOptions, config.public.appUserBackendUrl, axios),
      contract: new ContractApi(fetchOptions, config.public.appUserBackendUrl, axios),
      offer: new OfferApi(fetchOptions, config.public.appUserBackendUrl, axios),
      productDeclaration: new ProductDeclarationApi(fetchOptions, config.public.appUserBackendUrl, axios),
      productSwap: new ProductSwapApi(fetchOptions, config.public.appUserBackendUrl, axios),
      devices: new DeviceApiService(), // 4 Create instance of DeviceApiService that implement DeviceApiInterface
    };

    return {
      provide: {
        api: modules,
      },
    };
  },
});

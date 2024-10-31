import { useLoading } from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      loading: useLoading(),
    },
  };
});

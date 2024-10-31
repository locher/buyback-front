import { storeToRefs } from 'pinia';
import { useDevicesStore } from '~/stores/devices';
import { useUserStore } from '~/stores/user';

export default defineNuxtRouteMiddleware(async (to) => {
  const { $i18n } = useNuxtApp();
  const userStore = useUserStore();
  const userState = storeToRefs(userStore); // make authenticated state reactive
  const devicesStore = useDevicesStore();

  const toRouteName = to?.name as string;

  // Handle url from customer-service redirect
  const routeSplice = to.path.split('/');
  if (RegExp(/[A-Za-z][A-Za-z]-[A-Za-z][A-Za-z]/).exec(routeSplice[1])) {
    // Set user language based on browser
    const usersLanguage = window.navigator.language;
    $i18n.locale.value = usersLanguage.toLowerCase();

    if (to?.path.includes('/substitute')) {
      console.log(routeSplice);
      abortNavigation();
      return navigateTo({
        path: '/substitute',
        query: {
          token: to.query.token,
        },
      });
    }
    if (to?.path.includes('/activate-account') || to?.path.includes('/update-email')) {
      abortNavigation();
      return navigateTo({
        path: '/login/activate-account',
        query: {
          token: to.query.token,
        },
      });
    }

    if (to?.path.includes('/change-password')) {
      abortNavigation();
      return navigateTo({
        path: '/login/reset-password',
        query: {
          token: to.query.token,
        },
      });
    }

    abortNavigation();
    return navigateTo({
      path: '/',
      query: {
        token: to.query.token,
      },
    });
  }

  // skip middleware on server
  if (process.server) return;

  if (localStorage.getItem('token') && !userStore.user) {
    userStore.login(useLocalStorage('token', '').value);
  }

  // if user doesn't exist redirect to log in
  if (!userState.user.value && !toRouteName.includes('login') && !to?.path.includes('substitute')) {
    abortNavigation();
    return navigateTo('/login');
  }

  // If user token is expired, redirect to login
  const expirationDate: number = (userState.user.value?.exp as number) * 1000;
  if (Date.now() - expirationDate > 0) {
    userStore.logout();
    return navigateTo('/login');
  }

  if (!userStore.contract && !to?.path.includes('substitute') && !toRouteName.includes('login')) {
    await userStore.getContract();
  }

  if (!devicesStore.devices) {
    await devicesStore.getDevices();
  }

  // if user exists and url is /login, redirect to homepage
  if (userState.user.value && toRouteName === 'login') {
    return navigateTo('/');
  }
});

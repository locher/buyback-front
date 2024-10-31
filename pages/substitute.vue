<script setup lang="ts">
  import { useUserStore } from '~/stores/user';
  import type { Token } from '~/repository/customer-api/models/token';

  const route = useRoute();
  const userStore = useUserStore();
  const { $loading } = useNuxtApp();

  // LifeCycle
  onMounted(async () => {
    const loader = $loading.show({
      canCancel: false,
      enforceFocus: true,
    });
    //Remove current user data from cache before substitute
    userStore.logout();

    const data: Token = { token: route.query['token'] };

    userStore.login(data.token as string);
    localStorage.setItem('token', data.token as string);

    await navigateTo('/');
    loader.hide();
  });
</script>

<template>
  <h1>Substitute...</h1>
</template>

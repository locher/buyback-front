<script setup lang="ts">
  import { useUserStore } from '~/stores/user';

  const { t } = useI18n();
  const appConfig = useAppConfig();
  const userStore = useUserStore();
  const { $amplitude } = useNuxtApp();

  const breadcrumbRoutes = [
    {
      title: t('menu.home'),
      link: '/',
    },
    {
      title: t('registerDevice.list.breadcrumb'),
      link: '/buyback',
    },
  ];

  const findIn = (pack: string, packageList: Array<string>) => {
    return packageList.find((p) => p === pack);
  };

  const userPackage = computed(() => {
    return userStore.user?.currentContract?.package;
  });

  const padPackages = ['HUBSIDE UP ADVANCE +', 'HUBSIDE UP PREMIUM', 'HUBSIDE UP GOLD'];
  const laptopPackages = ['HUBSIDE UP ADVANCE +', 'HUBSIDE UP PREMIUM', 'HUBSIDE UP GOLD'];
  const dronePackages = ['HUBSIDE UP ADVANCE +', 'HUBSIDE UP PREMIUM'];
  const tvPackages = ['HUBSIDE UP ADVANCE +', 'HUBSIDE UP PREMIUM'];

  onMounted(() => {
    $amplitude.logEvent('buyback started');
  });
</script>

<template>
  <Title>{{ $t('buyback.registerDeviceTitle') }} | {{ appConfig.title }}</Title>
  <h1>{{ $t('registerDevice.list.title') }}</h1>

  <breadCrumb :routes="breadcrumbRoutes" />

  <section class="devices">
    <NuxtLink to="/buyback/smartphone">
      <CardDevice>
        <template v-slot:image>
          <img src="@common/images/devices/smartphone.png" alt="" />
        </template>
        <template v-slot:title>{{ $t('devices.phone') }}</template>
      </CardDevice>
    </NuxtLink>
    <NuxtLink v-if="findIn(userPackage as string, padPackages)" to="/buyback/other/tablet">
      <CardDevice>
        <template v-slot:image>
          <img src="@common/images/devices/tab.png" alt="" />
        </template>
        <template v-slot:title>{{ $t('devices.tablet') }}</template>
      </CardDevice>
    </NuxtLink>
    <NuxtLink v-if="findIn(userPackage as string, laptopPackages)" to="/buyback/other/laptop">
      <CardDevice>
        <template v-slot:image>
          <img src="@common/images/devices/laptop.png" alt="" />
        </template>
        <template v-slot:title>{{ $t('devices.laptop') }}</template>
      </CardDevice>
    </NuxtLink>
    <NuxtLink v-if="findIn(userPackage as string, dronePackages)" to="/buyback/other/drone">
      <CardDevice>
        <template v-slot:image>
          <img src="@common/images/devices/drone.png" alt="" />
        </template>
        <template v-slot:title>{{ $t('devices.drone') }}</template>
      </CardDevice>
    </NuxtLink>
    <NuxtLink v-if="findIn(userPackage as string, tvPackages)" to="/buyback/other/tv">
      <CardDevice>
        <template v-slot:image>
          <img src="@common/images/devices/television.png" alt="" />
        </template>
        <template v-slot:title>{{ $t('devices.tv') }}</template>
      </CardDevice>
    </NuxtLink>
  </section>
</template>

<style lang="scss" scoped>
  .devices {
    display: grid;
    gap: var(--gap-mini);

    @media (width > 1600px) {
      grid-template-columns: repeat(5, 1fr);
    }

    @media (width <= 1600px) and (width > 1250px) {
      grid-template-columns: repeat(4, 1fr);
    }

    @media (width <= 1250px) and (width > 1000px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (width <= 1000px) and (width > 500px) {
      grid-template-columns: repeat(2, 1fr);
    }

    > a {
      display: grid;
      text-decoration: none;
    }
  }
</style>

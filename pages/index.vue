<script setup lang="ts">
  import { useUserStore } from '~/stores/user';
  import { useDevicesStore } from '~/stores/devices';

  const { $amplitude } = useNuxtApp();

  const userStore = useUserStore();
  const devicesStore = useDevicesStore();
  const appConfig = useAppConfig();

  // Computed
  const devices = computed(() => {
    return devicesStore.devices;
  });

  // Events
  onMounted(() => {
    $amplitude.logEvent('home page displayed');
  });
</script>

<template>
  <Title>{{ $t('home.title') }} | {{ appConfig.title }}</Title>
  <h1 class="title">{{ $t('home.hello', { name: userStore.user?.firstName }) }}</h1>

  <!-- No device registered yet -->
  <section v-if="!devices || devices.length === 0">
    <CardGlobal :image-position="['bottom right']" class="card--primary">
      <template v-slot:content>
        <h2 class="card__title">{{ $t('home.sections.buyback.initTitle') }}</h2>
        <NuxtLink to="/buyback">
          <ButtonGlobal size="big">{{ $t('actions.iBegin') }}</ButtonGlobal>
        </NuxtLink>
      </template>
      <template v-slot:image>
        <img src="@common/images/devices.png" alt="" />
      </template>
    </CardGlobal>
  </section>
  <section v-else-if="userStore.swapOfferAvailable" class="home-grid">
    <CardGlobal :image-position="['bottom right']" title-size="h2" class="card--primary">
      <template v-slot:content>
        <h2 class="card__title">{{ $t('home.sections.buyback.swapTitle') }}</h2>
        <!-- ?swap only for amplitude ref -->
        <NuxtLink to="/buyback/devices?s=swap">
          <ButtonGlobal size="big">{{ $t('actions.swap') }}</ButtonGlobal>
        </NuxtLink>
      </template>
      <template v-slot:image>
        <img src="@common/images/devices.png" alt="" />
      </template>
    </CardGlobal>
    <MyDevices />
  </section>
  <!-- Devices registered -->
  <section v-else-if="userStore.swapOfferFuture && !userStore.swapOfferAvailable" class="home-grid">
    <CardGlobal :image-position="['bottom right']" title-size="h2" class="card--primary">
      <template v-slot:content>
        <h2 class="card__title">{{ $t('home.sections.buyback.waitingTitle') }}</h2>
        <p>{{ $t('home.sections.buyback.waitingDescription') }}</p>
        <TimerBlock :value="userStore.swapOfferAvailibility" :max="userStore.swapDelay">
          {{ $t('home.sections.buyback.remainingDays') }} :
        </TimerBlock>
      </template>
      <template v-slot:image>
        <img src="@common/images/devices.png" alt="" />
      </template>
    </CardGlobal>
    <MyDevices />
  </section>
  <section v-else class="home-grid">
    <CardGlobal :image-position="['bottom right']" title-size="h2" class="card--primary">
      <template v-slot:content>
        <h2 class="card__title">{{ $t('home.sections.buyback.waitingTitle') }}</h2>
        <p>{{ $t('home.sections.buyback.waitingDescription') }}</p>
        <TimerBlock>{{ $t('home.sections.buyback.swapAvailableSoon') }}</TimerBlock>
      </template>
      <template v-slot:image>
        <img src="@common/images/devices.png" alt="" />
      </template>
    </CardGlobal>
    <MyDevices />
  </section>
</template>

<style scoped lang="scss">
  .title {
    font-size: var(--h2-font-size);
    line-height: 3.4rem;
  }

  .home-grid {
    display: grid;
    gap: var(--gap-mini);

    @media (width >= 1400px) {
      grid-template-columns: 5fr 2fr;
    }

    @media (width < 1400px) and (width >= 1050px) {
      grid-template-columns: 5fr 3fr;
    }
  }
</style>

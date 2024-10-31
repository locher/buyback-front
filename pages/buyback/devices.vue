<script setup lang="ts">
  // Stores
  import type { ProductSwapProductSwapInputProductSwapCreateDocumentation } from '~/repository/customer-api';
  import { useDevicesStore } from '~/stores/devices';
  import { useUserStore } from '~/stores/user';

  const devicesStore = useDevicesStore();
  const { $api, $loading, $amplitude } = useNuxtApp();
  const appConfig = useAppConfig();

  // Refs
  const selectedDevice = ref({});
  const isDetailsModalOpen = ref(false);
  const isValidationModalOpen = ref(false);
  const isApiError = ref(false);
  const userStore = useUserStore();
  const route = useRoute();

  const { t } = useI18n();

  // Events
  onMounted(() => {
    const sourceAmplitude = route.query.s;
    $amplitude.logEvent('buyback device list displayed', { source: sourceAmplitude || 'direct' });
  });

  // Const
  const breadcrumbRoutes = [
    {
      title: t('menu.home'),
      link: '/',
    },
    {
      title: t('global.myDevices'),
      link: '/buyback/devices',
    },
  ];

  // Computed
  const devices = computed(() => {
    if (!devicesStore.devices) {
      devicesStore.getDevices();
    }
    return devicesStore.devices;
  });

  const haveSwap = (declaration) => {
    return devicesStore.swaps?.find((swap) => swap.productDeclaration === declaration.id.toString());
  };

  const submitSwap = async (device) => {
    const loader = $loading.show({
      canCancel: false,
      enforceFocus: true,
      loader: 'loader',
      zIndex: 999999999,
    });

    $amplitude.logEvent('buyback swap confirmed', {
      device: device.type,
      brand: device.brand,
      model: device.model,
      storage: device.purchaseDetails?.capacity,
      imei: !!device.pupurchaseDetails?.imei,
    });

    try {
      const dataForm: ProductSwapProductSwapInputProductSwapCreateDocumentation = {
        declarationId: device.id,
        brand: appConfig.app,
        contractNumber: userStore.user?.currentContract.contractNumber as string,
        packageName: userStore.user?.currentContract.package as string,
        typeAdvantage: userStore.swapOfferAvailable.type,
      };
      const response = await $api.productSwap.postCreateSwapProductProductSwapCollection(dataForm);

      isValidationModalOpen.value = true;
      isDetailsModalOpen.value = false;
      $amplitude.logEvent('buyback swap finalized');
    } catch (error) {
      isValidationModalOpen.value = false;
      isDetailsModalOpen.value = false;
      isApiError.value = true;
      $amplitude.logEvent('buyback swap request failed');
    } finally {
      loader.hide();
    }
  };
</script>

<template>
  <Title>{{ $t('buyback.registeredDeviceTitle') }} | {{ appConfig.title }}</Title>
  <h1>{{ $t('global.myDevices') }}</h1>
  <breadCrumb :routes="breadcrumbRoutes" />

  <section class="grid">
    <NuxtLink to="/buyback">
      <button class="card-style add" type="button">
        <span class="add__icon"><IconPlus /></span>
        <h2 class="add__title">{{ $t('actions.addOtherDevice') }}</h2>
      </button>
    </NuxtLink>

    <CardDeviceIcon
      v-for="(device, key) in devices"
      :key="device.brand + key"
      :device="device"
      @submit-form="
        (res) => {
          $amplitude.logEvent('buyback swap started');
          isDetailsModalOpen = true;
          selectedDevice = res;
        }
      " />
  </section>

  <ModalGlobal
    v-if="isDetailsModalOpen"
    :is-open="isDetailsModalOpen"
    design="left"
    @modal-closed="() => (isDetailsModalOpen = false)">
    <template v-slot:content>
      <h2>{{ $t('myDevices.modalDevice.title', { device: selectedDevice.brand + ' ' + selectedDevice.model }) }}</h2>
      <BlockAlert v-if="userStore.swapOfferAvailable" class="modal-alert">
        {{ $t('myDevices.modalDevice.warning') }}
      </BlockAlert>
      <br />
      <BlockAlert v-if="haveSwap(selectedDevice)" class="modal-alert">
        {{ $t('myDevices.modalDevice.swapInProcess') }}
      </BlockAlert>
      <DeviceDetailsList :list="selectedDevice" />
      <ButtonGlobal
        v-if="userStore.swapOfferAvailable && !haveSwap(selectedDevice)"
        size="small"
        @click="submitSwap(selectedDevice)">
        {{ $t('actions.iConfirm') }}
      </ButtonGlobal>
    </template>
  </ModalGlobal>

  <ModalGlobal
    v-if="isValidationModalOpen"
    :is-open="isValidationModalOpen"
    @modal-closed="() => (isValidationModalOpen = false)">
    <template v-slot:image>
      <img src="@themePath/images/illu-action-valid.svg" alt="" />
    </template>

    <template v-slot:content>
      <h2>{{ $t('myDevices.modalConfirmation.title') }}</h2>
      <h3>{{ $t('myDevices.modalConfirmation.subtitle') }}</h3>
      <p>
        {{ $t('myDevices.modalConfirmation.content') }}
      </p>
      <NuxtLink to="/">
        <ButtonGlobal size="small">{{ $t('actions.backHome') }}</ButtonGlobal>
      </NuxtLink>
    </template>
  </ModalGlobal>

  <ModalGlobal v-if="isApiError" :is-open="isApiError">
    <template v-slot:image><img src="@themePath/images/illu-technical-issue.svg" alt="" /></template>
    <template v-slot:content>
      <h2>{{ $t('myDevices.modalSwap.error.title') }}</h2>
      <p>{{ $t('myDevices.modalSwap.error.description') }}</p>
      <ButtonGlobal @click="isApiError = false">{{ $t('global.ok') }}</ButtonGlobal>
    </template>
  </ModalGlobal>
</template>

<style lang="scss" scoped>
  .grid {
    display: grid;
    gap: var(--gap-mini);

    @media (width >= 1500px) {
      grid-template-columns: repeat(4, 1fr);
    }

    @media (width < 1500px) and (width >= 1200px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (width < 1200px) and (width >= 1000px) {
      grid-template-columns: repeat(2, 1fr);
    }

    > a {
      display: grid;
      text-decoration: none;
    }
  }

  .add {
    display: grid;
    gap: var(--gap-mini);
    justify-items: center;
    align-content: start;
    text-align: center;
    cursor: pointer;
    border: none;

    &__icon {
      svg {
        fill: var(--color-blast);
        width: auto;
        height: 6rem;
      }
    }

    &__title {
      font-size: var(--p-font-size);
    }
  }

  .modal__inner {
    .list-details {
      justify-self: stretch;
    }

    .modal-alert {
      font-size: var(--p-font-size--tiny);
    }
  }
</style>

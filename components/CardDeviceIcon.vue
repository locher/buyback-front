<script setup>
  import { useDevicesStore } from '~/stores/devices';
  import { useUserStore } from '~/stores/user';

  // Props
  const props = defineProps({
    device: {
      type: Object,
      required: true,
    },
  });

  const userStore = useUserStore();
  const deviceStore = useDevicesStore();

  // Computed
  const hiddenImei = computed(() => {
    if (!props.device.productDetails?.imei) {
      return false;
    }
    return hideImei(props.device.productDetails?.imei);
  });

  // Emits
  const emit = defineEmits(['submit-form']);

  // Methods
  const submitButton = (arr) => {
    emit('submit-form', arr);
  };

  const haveSwap = (declaration) => {
    return deviceStore.swaps?.find((swap) => swap.productDeclaration === declaration.id.toString());
  };
</script>

<template>
  <div class="card-style cardIcon">
    <span class="cardIcon__icon">
      <IconSmartphone v-if="device.type === 'phone'" />
      <IconTablet v-if="device.type === 'tablet'" />
      <IconDrone v-if="device.type === 'drone'" />
      <IconComputer v-if="device.type === 'laptop'" />
      <IconTv v-if="device.type === 'tv'" />
    </span>
    <div class="cardIcon__content">
      <div class="cardIcon__header">
        <h2 class="cardIcon__title">{{ device.brand }} {{ device.model }}</h2>
        <span v-if="device.productDetails?.capacity" class="cardIcon__capacity">
          {{ device.productDetails?.capacity }}
        </span>
      </div>
      <p v-if="device.productDetails?.serial" class="cardIcon__serial">{{ device.productDetails?.serial }}</p>
      <p v-if="device.productDetails?.imei" class="cardIcon__serial">{{ hiddenImei }}</p>
    </div>
    <ButtonGlobal
      v-if="userStore.swapOfferAvailable && !haveSwap(device)"
      design="primary"
      size="small"
      class="cardIcon__btn"
      @click="submitButton(device)">
      {{ $t('actions.trade') }}
    </ButtonGlobal>
    <ButtonGlobal v-else design="secondary" size="small" class="cardIcon__btn" @click="submitButton(device)">
      {{ $t('actions.knowMore') }}
    </ButtonGlobal>
  </div>
</template>

<style lang="scss">
  .cardIcon {
    display: grid;
    gap: var(--gap-mini);

    &__header {
      display: flex;
      align-items: baseline;
      gap: 1.5rem;
      justify-content: space-between;
    }

    &__icon {
      justify-self: center;
      svg {
        fill: var(--color-blast);
        max-width: 8rem;
        height: 6rem;
        width: auto;
      }
    }

    &__title {
      font-size: var(--p-font-size);
    }

    &__capacity {
      background-color: var(--color-blue-grey-50);
      padding: 0.5em 0.65em;
      line-height: 1em;
      border-radius: 5px;
      font-size: var(--p-font-size--tiny);
      font-weight: 700;
      flex-shrink: 0;
    }

    &__serial {
      color: var(--color-core);
      font-size: var(--p-font-size--tiny);
      margin-top: 0.15em;
    }

    &__btn {
      align-self: end;
    }
  }
</style>

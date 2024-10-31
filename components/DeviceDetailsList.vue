<script setup>
  // Props
  defineProps({
    list: {
      type: Array,
      required: true,
    },
  });
</script>

<template>
  <ul class="card-style list-details">
    <li>
      <span>{{ $t('registerDevice.aside.brand') }}</span>
      <strong>{{ list.brand }}</strong>
    </li>
    <li>
      <span>{{ $t('registerDevice.aside.model') }}</span>
      <strong>{{ list.model }}</strong>
    </li>
    <li v-if="list.productDetails?.capacity">
      <span>{{ $t('registerDevice.aside.capacity') }}</span>
      <strong>{{ list.productDetails?.capacity }}</strong>
    </li>
    <li v-if="list.productDetails?.imei">
      <span>{{ $t('registerDevice.aside.imei') }}</span>
      <strong>{{ list.productDetails?.imei }}</strong>
    </li>
    <li v-if="list.productDetails?.serial">
      <span>{{ $t('registerDevice.aside.serial') }}</span>
      <strong>{{ list.productDetails?.serial }}</strong>
    </li>
  </ul>
</template>

<style lang="scss">
  .list-details {
    list-style-type: none;
    font-size: var(--p-font-size--tiny);
    color: var(--color-text);

    &.card-style {
      padding: var(--gap-mini);
    }

    li {
      display: flex;
      justify-content: space-between;
      padding: 0.6em 0;
      align-items: center;

      svg {
        fill: var(--color-blue-60);
        height: 1.5rem;
        width: auto;

        &.success {
          fill: var(--color-success);
        }
      }

      + li {
        border-top: 1px solid var(--color-blue-grey-100);
      }
    }
  }
</style>

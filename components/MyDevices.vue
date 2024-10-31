<script setup></script>

<template>
  <div class="card-style--noPadding my-devices">
    <div class="my-devices__content">
      <h2 class="my-devices__title">{{ $t('global.myDevices') }}</h2>
      <!-- ?devices only for amplitude ref -->
      <NuxtLink to="/buyback/devices?s=devices">
        <ButtonGlobal design="secondary" size="small">
          {{ $t('actions.checkList') }}
        </ButtonGlobal>
      </NuxtLink>

      <NuxtLink to="/buyback">
        <ButtonGlobal design="ghost" size="small">
          <template v-slot:icon>
            <IconPlus />
          </template>
          {{ $t('actions.addDevice') }}
        </ButtonGlobal>
      </NuxtLink>
    </div>
    <img src="@common/images/devices-mini.png" alt="" />
  </div>
</template>

<style lang="scss" scoped>
  .my-devices {
    display: grid;
    position: relative;
    overflow: hidden;
    align-content: space-between;
    border-radius: 1.6rem;

    button {
      font-size: var(--p-font-size--tiny);
      width: 100%;
    }

    &__content {
      padding: 3.2rem 3.2rem 0;
    }

    &__title {
      margin-bottom: var(--gap-mini);
    }

    button + button {
      margin-top: 1rem;
    }

    img {
      width: 100%;
    }
  }
</style>

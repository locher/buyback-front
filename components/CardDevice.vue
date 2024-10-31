<template>
  <div class="device">
    <div class="device__img">
      <slot name="image" />
    </div>
    <h2 class="device__title">
      <slot name="title" />
    </h2>
  </div>
</template>

<style lang="scss" scoped>
  .device {
    transition: box-shadow ease-in-out 0.3s;
    background-color: var(--color-white);
    padding: 3.2rem;
    border-radius: 0.8rem;
    display: grid;
    grid-template-rows: auto;
    gap: 2rem;
    justify-content: center;
    border: 0;
    cursor: pointer;

    &:hover,
    &:focus {
      box-shadow: var(--card-shadow);
    }

    &__img {
      height: 12rem;
      display: grid;
      justify-content: center;
      align-content: center;
    }

    &__title {
      text-align: center;
      font-size: var(--h4-font-size);
      color: var(--color-core);
    }
  }
</style>

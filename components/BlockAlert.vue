<template>
  <div class="alert-info">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
  .alert-info {
    background-color: var(--color-background-block-span);
    border-radius: 0.8rem;
    padding: 1.5rem 2rem;
    p {
      margin: 0;
      color: var(--color-core);
      font-size: var(--p-font-size-S);
    }
  }
</style>

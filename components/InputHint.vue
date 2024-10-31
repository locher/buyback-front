<script setup lang="scss"></script>

<template>
  <button class="input-hint">
    <span class="input-hint__icon"><IconInfo /></span>
    <span class="input-hint__text"><slot /></span>
  </button>
</template>

<style lang="scss" scoped>
  .input-hint {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    background: none;
    border: 0;
    cursor: pointer;

    &__text {
      transition: all ease 0.3s;
      text-decoration: underline;
      text-underline-offset: 3px;
      color: var(--color-core);
      font-size: var(--p-font-size--tiny);
    }
  }

  .input-hint:hover .input-hint__text {
    text-underline-offset: 5px;
  }

  svg {
    fill: var(--color-core);
    width: 1.8rem;
    height: auto;
  }
</style>

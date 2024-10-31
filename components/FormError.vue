<script setup></script>

<template>
  <p><slot /></p>
</template>

<style lang="scss" scoped>
  p {
    font-size: var(--p-font-size--tiny);
    color: var(--color-error);
    line-height: 1.23em;
    display: flex;
    gap: 1rem;

    &::before {
      display: inline-block;
      content: '\00d7';
      font-size: 1.8em;
    }
  }
</style>

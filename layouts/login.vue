<script setup>
  const appConfig = useAppConfig();
</script>

<template>
  <div class="global-wrapper">
    <section class="login">
      <h1 class="login__title">
        <slot name="title" />
      </h1>
      <slot name="form" />
    </section>
  </div>
</template>

<style scoped lang="scss">
  .login {
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 1fr;
    gap: var(--gap);
    max-width: clamp(80rem, calc(45vw + 40rem), 150rem);
    margin: auto;
    padding: 3vw 5vw;

    @media (width < 800px) {
      grid-template-columns: 1fr;
      width: 100%;
      padding: 0;
    }

    &__title {
      font-size: var(--h1-font-size);
      line-height: 1.15em;
    }
  }

  // Deep selector (deprecated) to style child component. :slotted doesn't work
  :deep .login-form {
    background-color: var(--card-color);
    padding: var(--card-padding);
    border-radius: var(--card-radius);
    box-shadow: var(--card-shadow);
    display: grid;
    grid-template-rows: 1fr;
    gap: var(--gap-mini);

    h1,
    h2,
    h3 {
      font-size: var(--h2-font-size);
    }

    &__lost-password {
      justify-self: center;
    }
  }
</style>

<script setup lang="ts">
  const props = defineProps({
    // eslint-disable-next-line vue/require-default-prop
    error: Object,
  });

  const handleError = () => clearError({ redirect: '/' });
</script>

<template>
  <div class="global-wrapper">
    <section v-if="error" class="mailSent">
      <img src="@themePath/images/illu-technical-issue.svg" alt="" />
      <h1>{{ $t('errors.notFound') }}</h1>
      <p>
        <ButtonGlobal @click="handleError">{{ $t('global.ok') }}</ButtonGlobal>
      </p>
    </section>
  </div>
</template>

<style scoped lang="scss">
  .global-wrapper {
    grid-template-rows: auto 1fr;
    gap: var(--gap-mini);
  }

  .lost-password {
    margin: auto;
    background-color: var(--card-color);
    padding: var(--card-padding);
    border-radius: var(--card-radius);
    box-shadow: var(--card-shadow);
    max-width: 70rem;

    &__title {
      text-align: center;
    }

    &__description {
      text-align: center;
      margin-top: 1em;
    }
  }

  .lost-password-form {
    margin-top: var(--gap-mini);
    padding: 0 10rem;
    text-align: center;
    display: grid;
    gap: var(--gap-mini);

    @media (width < 700px) {
      padding: 0;
    }
  }

  .mailSent {
    text-align: center;
    margin: auto;

    img {
      margin-left: auto;
      margin-right: auto;
      width: 38rem;
      height: auto;
    }

    h1 {
      margin-bottom: 0.7em;
    }

    a {
      color: var(--color-blast);
    }
  }
</style>

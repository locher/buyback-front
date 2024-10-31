<script setup lang="ts">
  const appConfig = useAppConfig();

  definePageMeta({
    layout: false,
  });

  const langName = {
    'fr-fr': 'France',
    'es-es': 'España',
    'pt-pt': 'Portugal',
    'nl-be': 'België',
    'fr-be': 'Belgique',
    'it-it': 'Italia',
    'cs-cz': 'Česko',
    'de-de': 'Deutschland',
    'en-us': 'United States',
  };

  const baseUrl = window.location.protocol + '//' + window.location.host;
</script>

<template>
  <Head>
    <Title>Choose your language - {{ appConfig.title }}</Title>
    <Link
      v-for="lang in appConfig.languageAvailable"
      :key="lang"
      rel="alternate"
      :hreflang="lang"
      :href="`${baseUrl}/${lang}`" />
    <Link rel="alternate" hreflang="x-default" :href="baseUrl" />
    <Link rel="canonical" :href="baseUrl" />
  </Head>

  <section class="lang-selector">
    <div class="lang-selector__wrapper">
      <h1>{{ appConfig.title }}</h1>
      <h2>Choose your country and language:</h2>

      <ul>
        <li v-for="lang in appConfig.languageAvailable" :key="lang">
          <a :href="`/${lang}/login`">
            <img :src="useImages(lang)" alt="" />
            <span>{{ langName[lang] }}</span>
          </a>
        </li>
      </ul>

      <img src="@themePath/images/logo.svg" :alt="appConfig.title" class="logo" />
    </div>
  </section>
</template>

<style scoped lang="scss">
  .lang-selector {
    min-height: 100vh;
    padding: 4rem;
    display: flex;

    h1 {
      display: flex;
      margin-bottom: 0.5em;
      font-size: 2em;
      text-align: center;
      justify-content: center;
    }

    .logo {
      width: 30rem;
      margin: 3em auto auto;
    }

    &__wrapper {
      margin: auto;
      text-align: center;
    }

    ul {
      list-style-type: none;
      margin-top: 4rem;
      display: inline-block;

      @media (width > 600px) {
        display: grid;
        grid-template-columns: 1fr 1fr;
      }

      a {
        transition: all ease 0.3s;
        display: flex;
        align-items: center;
        gap: 2rem;
        color: var(--color-blast);
        text-decoration: none;
        font-weight: 500;

        &:hover {
          color: var(--color-core);
        }

        img {
          width: 5rem;
          height: auto;
        }
      }
    }
  }
</style>

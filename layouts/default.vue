<script setup lang="ts">
  import { useUserStore } from '~/stores/user';

  const appConfig = useAppConfig();
  const userStore = useUserStore();
</script>

<template>
  <div class="global-wrapper">
    <header class="header">
      <NuxtLink to="/">
        <img src="@themePath/images/logo.svg" :alt="appConfig.title" />
      </NuxtLink>
      <ProfileMenu />
    </header>
    <aside class="aside">
      <div class="aside__formule">
        <h2 class="aside__formule__title">{{ $t('global.formuleTitle') }}</h2>
        <span class="aside__formule__content">{{ userStore.user?.currentContract?.package }}</span>
      </div>
      <nav class="aside__menu">
        <ul>
          <li>
            <NuxtLink to="/">
              <IconHouse />
              {{ $t('menu.home') }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </aside>
    <main>
      <slot />
    </main>
  </div>
</template>

<style scoped lang="scss">
  .global-wrapper {
    @media (width >= 700px) {
      grid-template-columns: 24rem 1fr;
      grid-template-rows: auto 1fr;
      grid-template-areas:
        'header header'
        'aside main';
      gap: var(--gap);

      .header {
        grid-area: header;
      }

      .aside {
        grid-area: aside;
      }

      main {
        grid-area: main;
      }
    }

    @media (width < 700px) {
      grid-template-rows: auto;
      align-content: baseline;
      gap: 3.2rem;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .aside {
      display: grid;
      align-content: start;
      gap: 1.6rem;

      @media (width < 700px) {
        display: none;
      }

      // Background aside
      &__formule,
      &__menu {
        background-color: var(--color-white);
        padding: 1em 1em;
        border-radius: 0.8rem;
      }

      &__formule {
        display: grid;
        gap: 0.8rem;
        &__title {
          font-size: var(--p-font-size--tiny);
          text-transform: uppercase;
          font-weight: 500;
          letter-spacing: 1px;
        }

        &__content {
          font-size: var(--button-font-size);
          font-weight: 700;
        }
      }

      &__menu {
        ul {
          list-style-type: none;
        }

        a {
          transition: all ease 0.3s;
          display: flex;
          align-items: center;
          gap: 0.8rem;
          color: var(--color-blast);
          font-size: var(--p-font-size--tiny);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          text-decoration: none;
          svg {
            transition: all ease 0.3s;
            fill: var(--color-blast);
            width: 1.8rem;
          }
        }

        a:hover {
          color: var(--color-core);

          svg {
            fill: var(--color-core);
          }
        }
      }
    }
  }

  main {
    display: grid;
    grid-template-rows: auto;
    gap: var(--gap-mini);
    align-content: baseline;
  }
</style>

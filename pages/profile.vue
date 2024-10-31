<script setup>
  import { useUserStore } from '~/stores/user';

  const { $amplitude } = useNuxtApp();

  const userStore = useUserStore();
  const appConfig = useAppConfig();

  const userInitials = userStore.user?.firstName[0] + userStore.user?.lastName[0];

  const { t } = useI18n();

  // Events
  onMounted(() => {
    $amplitude.logEvent('user profile displayed');
  });

  // Click assistance
  const callAssistance = () => {
    $amplitude.logEvent('customer support called');
    window.location.href = `tel:${t('account.assistance.phone')}`;
  };
</script>

<template>
  <Title>{{ $t('home.profileTitle') }} | {{ appConfig.title }}</Title>
  <h1>{{ $t('account.title') }}</h1>
  <section class="my-profile">
    <div class="profile__informations card-style">
      <div class="profile__informations--icon">
        <span>{{ userInitials }}</span>
      </div>
      <div class="profile__informations--name">
        <h2>{{ userStore.user.firstName }} {{ userStore.user.lastName }}</h2>
      </div>
      <div class="profile__informations--email">
        <p>{{ userStore.user.username }}</p>
      </div>
    </div>

    <div class="profile__assistance card-style">
      <div class="profile__assistance--title">
        <span class="icon"><IconAssistance /></span>
        <h2>{{ $t('account.assistance.title') }}</h2>
      </div>
      <div class="profile__assistance--desc">
        <p>{{ $t('account.assistance.content') }}</p>
      </div>
      <ButtonGlobal size="small" @click="callAssistance">
        <template v-slot:icon><IconPhone /></template>
        {{ $t('account.assistance.phone') }}
      </ButtonGlobal>
    </div>

    <BlockAlert>
      <p>
        {{ $t('account.warning') }}
      </p>
    </BlockAlert>
  </section>
</template>

<style lang="scss">
  .my-profile {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--gap-mini);
    @media (width < 1000px) {
      grid-template-columns: 1fr;
    }
    .profile {
      &__informations {
        display: grid;
        justify-items: center;
        gap: 1rem;

        &--icon {
          background-color: var(--color-background-block-span);
          color: var(--color-blast);
          border-radius: 5rem;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 7rem;
          width: 7rem;
          font-weight: 700;
        }
        &--name h2 {
          font-size: var(--h2-font-size);
          text-align: center;
        }
        &--email p {
          font-size: var(--p-font-size-S);
        }
      }
      &__assistance {
        display: grid;
        gap: 2rem;
        justify-items: start;

        &--title {
          display: flex;
          align-items: center;
          .icon {
            background-color: var(--color-blast);
            border-radius: 0.5rem;
            height: 5rem;
            width: 5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 2rem;

            svg {
              fill: var(--color-white);
              width: 2rem;
              height: auto;
            }
          }
          h2 {
            font-size: var(--h2-font-size-S);
          }
        }
        &--desc {
          p {
            font-size: var(--p-font-size-S);
          }
        }
      }
    }
  }
</style>

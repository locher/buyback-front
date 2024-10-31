<script setup lang="ts">
  import { useUserStore } from '~/stores/user';

  const userStore = useUserStore();
  const { $amplitude } = useNuxtApp();

  // Computed
  const userInitials = computed(() => {
    return userStore.user?.firstName[0] + userStore.user?.lastName[0];
  });

  // Refs
  const isSubmenuOpen = ref(false);

  // Methods
  const toggleSubmenu = () => {
    isSubmenuOpen.value = !isSubmenuOpen.value;
  };

  const closeSubmenu = () => {
    isSubmenuOpen.value = false;
  };

  const onLogout = async () => {
    closeSubmenu();
    userStore.logout();
    $amplitude.logEvent('user logged out');
    await navigateTo('/login');
  };
</script>

<template>
  <div class="profile">
    <button class="profile__button" @focusout="closeSubmenu" @click="toggleSubmenu" @keydown.esc="closeSubmenu">
      <span class="profile__icon">
        <span>{{ userInitials }}</span>
      </span>
      <span class="profile__arrow" :class="isSubmenuOpen ? 'open' : ''"><LazyIconArrowFull /></span>
    </button>

    <Transition>
      <nav v-if="isSubmenuOpen" class="profile__submenu">
        <ul>
          <li>
            <NuxtLink to="/profile" @click="closeSubmenu">
              <IconUser />
              {{ $t('menu.account') }}
            </NuxtLink>
          </li>
          <li>
            <button @click="onLogout">
              <IconLogout />
              {{ $t('menu.disconnect') }}
            </button>
          </li>
        </ul>
      </nav>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
  .profile {
    position: relative;
  }

  .profile__button {
    border: 0;
    cursor: pointer;
    background: none;
    display: flex;
    align-items: center;
    gap: 1rem;

    &:hover .profile__icon,
    &:focus .profile__icon {
      transform: scale(1.15);
      outline-color: var(--color-border);
    }
  }

  .profile__icon {
    transition:
      transform cubic-bezier(0.68, -0.55, 0.27, 1.55) 0.3s,
      outline-color ease 0.3s;
    display: flex;
    width: 2.5em;
    height: 2.5em;
    background-color: var(--color-success);
    font-size: var(--p-font-size--tiny);
    color: var(--color-white);
    text-decoration: none;
    font-weight: 600;
    border-radius: 100%;
    outline: 2px solid transparent;

    span {
      margin: auto;
    }
  }

  .profile__arrow {
    transition: all ease 0.4s;

    svg {
      fill: var(--color-blue-grey-300);
    }

    &.open {
      transform: rotate(-180deg);
    }
  }

  .profile__submenu {
    background-color: var(--color-white);
    padding: 1em 1em;
    border-radius: 0.8rem;
    box-shadow: var(--card-shadow);
    position: absolute;
    right: 0;
    top: calc(100% + var(--gap-mini));
    z-index: 10;

    ul {
      list-style-type: none;
    }
  }

  li + li {
    border-top: 1px solid var(--color-blue-grey-50);
    margin-top: 0.5em;
    padding-top: 0.5em;
  }

  li {
    a,
    button {
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
      white-space: nowrap;
      position: relative;
      padding-left: 3rem;
      background: none;
      border: 0;
      cursor: pointer;

      svg {
        display: block;
        transition: all ease 0.3s;
        fill: var(--color-blast);
        width: 1.9rem;
        height: auto;
        padding: 1px;
        position: absolute;
        flex-shrink: 0;
        left: 0;
      }
    }
  }
</style>

<script setup>
  // Props
  defineProps({
    routes: {
      type: Object,
      required: true,
      default: () => {
        return [
          {
            title: 'Home',
            link: '/',
          },
        ];
      },
    },
  });
</script>

<template>
  <nav aria-label="breadcrumbs">
    <ol class="breadcrumb">
      <template v-for="(route, index) in routes" :key="`breadcrumb${index}`">
        <NuxtLink :to="route.link" class="breadcrumb__item">{{ route.title }}</NuxtLink>
        <template v-if="index < routes.length - 1">
          <IconArrow />
        </template>
      </template>
    </ol>
  </nav>
</template>

<style scoped lang="scss">
  .breadcrumb {
    display: flex;
    align-items: center;
    gap: 1rem;
    list-style-type: none;
    font-size: var(--button-font-size);

    a {
      color: var(--color-text);
      text-decoration: none;

      &.router-link-active {
        color: var(--color-core);
        font-weight: 700;
      }
    }

    svg {
      fill: var(--color-text);
      width: 0.8rem;
      height: auto;
    }
  }
</style>

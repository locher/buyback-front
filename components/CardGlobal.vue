<script setup lang="ts">
  const props = defineProps({
    imagePosition: {
      type: Array,
      required: false,
      default() {
        return [];
      },
    },
    titleSize: {
      type: String,
      required: false,
      default: 'h1',
    },
  });

  // Computed
  const imageClasses = computed(() => {
    return props.imagePosition?.join(' ');
  });
</script>

<template>
  <div class="card" :class="'card--' + titleSize">
    <div class="card__wrapper">
      <div class="card__content">
        <slot name="content"></slot>
      </div>
      <div :class="'card__image ' + imageClasses">
        <slot name="image"></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .card {
    container-type: inline-size;
    container-name: card;
    background-color: var(--color-white);
    border-radius: 1.6rem;
    box-shadow: var(--card-shadow);
    display: flex;
    overflow: hidden;

    &--h1 {
      h2,
      h3 {
        font-size: var(--h1-font-size);
        line-height: 1.1em;
      }
    }

    &--h2 {
      h2,
      h3 {
        font-size: var(--h2-font-size);
        line-height: 1.1em;
      }
    }

    &__wrapper {
      display: grid;
      align-items: center;
      overflow: hidden;
      height: 100%;

      @container card (width>600px) {
        grid-template-columns: 1fr 1fr;
      }
    }
  }

  .card__image {
    @container card (width>600px) {
      transform: scale(1.3);
      transform-origin: right;
    }

    img {
      width: 100%;
    }

    &.bottom {
      align-self: end;
    }

    &.top {
      align-self: start;
    }
  }

  .card__content {
    padding: 3.2rem;
    display: grid;
    gap: 1.6rem;
    justify-items: baseline;
    position: relative;
    z-index: 2;

    @container card (width>600px) {
      padding: 9rem 0 9rem 3.2rem;
    }
  }
</style>

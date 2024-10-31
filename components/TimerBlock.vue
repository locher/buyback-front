<script setup>
  defineProps({
    value: {
      type: Number,
      required: false,
      default: null,
    },
    max: {
      type: Number,
      required: false,
      default: null,
    },
  });
</script>

<template>
  <div class="timer">
    <div class="timer__content">
      <p><slot /></p>
      <div v-if="value && max" class="timer__count">
        <span class="timer__count__value">{{ value }}</span>
        <progress :value="value" :max="max"></progress>
      </div>
    </div>
    <IconTimer />
  </div>
</template>

<style scoped lang="scss">
  .timer {
    background-color: var(--color-turquoise-100);
    padding: var(--gap-mini) calc(var(--gap) * 1.5) var(--gap-mini) var(--gap-mini);
    max-width: 30rem;
    border-radius: 1.6rem;
    position: relative;
    overflow: hidden;

    &__content {
      position: relative;
      z-index: 2;

      p {
        color: var(--color-core);
        line-height: 1.8em;
        letter-spacing: 1px;
        font-weight: 500;
        font-size: var(--p-font-size--tiny);
        text-transform: uppercase;
        position: relative;
        z-index: 2;
      }
    }

    &__count {
      margin-top: 0.5rem;
      display: flex;
      align-items: center;
      gap: 1.2rem;
      padding-right: 5rem;

      &__value {
        font-size: var(--h1-font-size);
        font-weight: 700;
        line-height: 1em;
      }

      progress {
        appearance: none;
        width: 7rem;
        height: 0.6rem;
        border: 0;
        border-radius: 10rem;
        background: var(--color-white);
      }

      ::-webkit-progress-bar,
      ::-moz-progress-bar {
        background-color: var(--color-green-800);
      }
    }
  }

  svg {
    fill: #caeae6;
    position: absolute;
    bottom: 0;
    right: 0;
    height: 75%;
    width: auto;
  }
</style>

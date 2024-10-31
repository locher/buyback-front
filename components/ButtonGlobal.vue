<script setup lang="ts">
  import { computed } from 'vue';

  const props = defineProps({
    type: {
      type: String,
      required: false,
      default: 'button', //button, submit
    },
    size: {
      type: String,
      required: false,
      default: 'medium', //small, medium, large
    },
    design: {
      type: String,
      required: false,
      default: 'primary', //primary, secondary, ghost
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    isLoading: {
      type: Boolean,
      required: false,
      default: false,
    },
  });

  const btnClasses = computed(() => {
    const classes = ['bt', `bt--${props.size}`, `bt--${props.design}`];

    return classes.join(' ');
  });
</script>

<template>
  <button :class="btnClasses" :type="type" :disabled="disabled">
    <span v-if="!isLoading">
      <slot name="icon"></slot>
      <slot></slot>
    </span>
    <span v-else><IconRefresh /></span>
  </button>
</template>

<style lang="scss">
  // Button Base
  .bt {
    transition: all ease-in-out 0.3s;
    background-color: var(--mainColor);
    color: var(--textColor);
    font-weight: 600;
    border: 3px solid var(--mainColor);
    outline: 0;
    font-size: var(--button-font-size);
    border-radius: 10rem;
    cursor: pointer;
    font-family: var(--font-title);
    text-decoration: none;

    span {
      display: flex;
      align-items: center;
      gap: 0.5em;
      justify-content: center;
      padding: 0.65em 3em;
    }

    svg {
      height: 2rem;
      width: auto;
      fill: var(--textColor);
    }
  }

  // Button Primary
  .bt--primary {
    --mainColor: var(--color-blast);
    --textColor: var(--color-white);

    &:hover {
      --mainColor: var(--color-hover);
    }

    &:focus {
      border-color: var(--color-focus);
    }

    &[disabled] {
      --mainColor: var(--color-btn-light-disable);
      --textColor: var(--color-text);
      cursor: not-allowed;

      &:hover {
        --mainColor: var(--color-border);
      }
    }
  }

  // Button Secondary
  .bt--secondary {
    --mainColor: var(--color-btn-light);
    --textColor: var(--color-hover);

    &:hover {
      --mainColor: var(--color-btn-light-hover);
    }

    &:focus {
      border-color: var(--color-btn-light-hover);
    }

    &[disabled] {
      --mainColor: var(--color-inactive);
      --textColor: var(--color-text);

      &:hover {
        --mainColor: var(--color-border);
      }
    }
  }

  // Button Ghost
  .bt--ghost {
    --mainColor: transparent;
    --textColor: var(--color-hover);

    &:hover {
      --mainColor: var(--color-btn-light-hover);
    }

    &:focus {
      border-color: var(--color-btn-light-hover);
    }

    &[disabled] {
      --mainColor: transparent;
      --textColor: var(--color-text);

      &:hover {
        --mainColor: var(--color-border);
      }
    }
  }

  // Button Large
  .bt--large {
    span {
      padding: 1em 3em;
    }
  }

  // Button small
  .bt--small {
    span {
      padding: 0.65em 1.5em;
    }
  }
</style>

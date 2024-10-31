<script setup>
  const props = defineProps({
    isOpen: {
      type: Boolean,
      required: false,
      default: false,
    },
    design: {
      type: String,
      required: false,
      default: 'center', // center,  left
    },
  });

  const emit = defineEmits(['modal-closed']);

  const showModal = ref(props.isOpen);
  const closeModal = () => {
    showModal.value = false;
    emit('modal-closed', true);
  };
</script>

<template>
  <div v-if="showModal" class="modal__background" @click="closeModal"></div>

  <div v-if="showModal" class="modal" :class="'modal--' + design" @keydown.esc="closeModal" @click.self="closeModal">
    <div role="dialog" aria-modal="true" aria-labelledby="modal-title" class="modal__inner">
      <button class="modal__closeBtn closeBtn" @click="closeModal">
        <span class="closeBtn__title">Fermer la modale</span>
        <span class="closeBtn__icon">×</span>
      </button>
      <slot name="image" />
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style lang="scss">
  .modal__background {
    background-color: var(--color-white);
    backdrop-filter: blur(20px);
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 9999;
    opacity: 0.7;
  }

  .modal {
    position: fixed;
    z-index: 10000;
    background-color: var(--color-white);
    padding: clamp(2rem, calc(2rem + 5vw), 5rem);
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    width: 55rem;
    min-height: clamp(30rem, calc(30rem + 20vh), 80vh);
    max-height: 90vh;
    max-width: 90%;
    border-radius: 1.5rem;
    overflow-y: auto;
    box-shadow: 0 0 5rem var(--color-grey-100);
    display: grid;

    &--center {
      .modal__inner {
        text-align: center;
        justify-items: center;
      }

      img {
        width: 24rem;
        margin: auto;
      }
    }

    &--left {
      .modal__inner {
        justify-items: baseline;
        p {
          color: var(--color-core);
        }
      }
    }

    &__inner {
      margin: auto;
      display: grid;
      grid-template-rows: auto;
      gap: var(--gap-mini);

      div {
        display: contents;
      }
    }

    &__closeBtn {
      position: fixed;
      top: var(--gap-mini);
      right: var(--gap-mini);
    }
  }

  .closeBtn {
    transition: all ease-in-out 0.3s;
    border: 0;
    padding: 0;
    margin: 0;
    cursor: pointer;
    background-color: var(--color-blue-grey-100);
    width: 4rem;
    height: 4rem;
    display: flex;
    border-radius: 3em;

    &:hover {
      background-color: var(--color-blue-100);
    }

    &__title {
      display: none;
    }

    &__icon {
      transition: all ease-in-out 0.4s;
      font-size: 1.5em;
      color: var(--color-blast);
      display: block;
      margin: auto;
    }
  }
</style>

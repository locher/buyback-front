<script setup lang="ts">
  // Props
  const props = defineProps({
    type: {
      type: String,
      required: false,
      default: 'text', // text, email, password, ...
    },
    id: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: false,
      default: '',
    },
    label: {
      type: String,
      required: true,
    },
    errorMessage: {
      type: String,
      required: false,
      default: '',
    },
    isResetPassword: {
      type: Boolean,
      required: false,
      default: false,
    },
    isLabelOutside: {
      type: Boolean,
      required: false,
      default: false,
    },
  });

  // Const
  const initialType = props.type;
  const inputType = ref(initialType);

  // Methods
  const togglePassword = () => {
    inputType.value = inputType.value === 'text' ? 'password' : 'text';
  };
</script>

<template>
  <div class="group" :class="{ isInvalid: errorMessage }">
    <div class="input__wrapper" :class="{ 'is-outside': isLabelOutside }">
      <label :for="id" :class="{ 'is-filled': value, label: isLabelOutside }">{{ label }}</label>
      <input :id="id" :type="inputType" :value="value" :class="{ 'is-filled': value }" class="input" :name="id" />

      <button v-if="initialType === 'password'" type="button" class="toggle" @click="togglePassword">
        <IconEye v-if="inputType === 'password'" />
        <IconEyeStroke v-else />
      </button>
    </div>

    <div v-if="errorMessage" class="invalid-message">
      <IconAlert />
      <span>{{ errorMessage }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .group {
    --padding-left: 2rem;
    --transition: all ease-in-out 0.2s;

    // Label INSIDE
    .input__wrapper:not(.is-outside) {
      position: relative;

      label {
        transition: var(--transition);
        position: absolute;
        left: calc(var(--padding-left) + 3px);
        top: 50%;
        transform: translateY(-50%);
        color: var(--color-text);
        font-size: var(--input-font-size);

        &.is-filled {
          top: 0.8rem;
          font-size: 0.65em;
          transform: translateY(0);
          left: calc(var(--padding-left));
        }
      }

      input.is-filled {
        padding: 1.15em var(--padding-left) 0.25em;
      }
    }

    // Label OUTSIDE
    .input__wrapper.is-outside {
      display: grid;
      gap: 1rem;
    }

    .toggle {
      position: absolute;
      right: var(--padding-left);
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
      border: 0;
      background: none;
      width: 30px;
      height: 30px;
      display: flex;

      svg {
        margin: auto;
        fill: var(--color-core);
      }
    }
  }

  // Invalid
  .group.isInvalid {
    input,
    label {
      color: var(--color-error);
    }

    input {
      border-color: var(--color-error);
      outline-color: rgba(var(--color-error), 0.3);
    }
  }

  .invalid-message {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    color: var(--color-error);
    margin-top: 0.5rem;
    font-size: 1.2rem;

    svg {
      fill: var(--color-error);
      width: 1.5rem;
      height: 100%;
    }
  }
</style>

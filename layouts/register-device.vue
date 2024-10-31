<template>
  <slot />
</template>

<style lang="scss">
  .device-form {
    container-type: inline-size;
    container-name: wrapper;

    &__wrapper {
      display: grid;

      gap: var(--gap-mini);
      align-items: flex-start;

      @container wrapper (width >= 550px) {
        grid-template-columns: 2fr 1fr;
      }

      @container wrapper (width > 1000px) {
        grid-template-columns: 2fr 1fr 1fr;
      }
    }

    aside {
      display: grid;
      gap: var(--gap-mini);

      @container wrapper (width < 550px) {
        display: none;
      }
    }

    &__form {
      display: grid;
      gap: var(--gap-mini);

      [type='submit'] {
        justify-self: baseline;
      }

      .find-imei {
        justify-self: flex-end;
      }
    }
  }

  .list-details {
    list-style-type: none;
    font-size: var(--p-font-size--tiny);
    color: var(--color-text);

    &.card-style {
      padding: var(--gap-mini);
    }

    li,
    .list-bill {
      display: flex;
      justify-content: space-between;
      padding: 0.6em 0;
      align-items: center;

      svg {
        fill: var(--color-blue-60);
        height: 1.5rem;
        width: auto;

        &.success {
          fill: var(--color-success);
        }
      }

      + li {
        border-top: 1px solid var(--color-blue-grey-100);
      }
    }
  }
</style>

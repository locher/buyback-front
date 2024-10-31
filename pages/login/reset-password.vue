<script setup lang="ts">
  import * as yup from 'yup';
  import { toTypedSchema } from '@vee-validate/yup';
  import { configure } from 'vee-validate';
  import type { AxiosError, AxiosResponse } from 'axios';
  import { useUserStore } from '~/stores/user';
  const { $amplitude } = useNuxtApp();

  definePageMeta({
    layout: false,
  });

  const { $api, $loading } = useNuxtApp();
  const appConfig = useAppConfig();
  const route = useRoute();
  const userStore = useUserStore();

  userStore.logout();

  const { meta, values, defineInputBinds } = useForm({
    validationSchema: toTypedSchema(
      yup.object({
        password: yup
          .string()
          .min(12)
          .matches(/^(?=.*?[a-zA-Z])(?=.*?[\d])(?=.*?[!@#$%^&*()_+\-=[\]{};':"|,.<>?])/)
          .required(),
        confirmationPassword: yup
          .string()
          .required()
          .test('is-same-password', 'Passwords must match', (item, testContext) => {
            return testContext.parent.password === item;
          }),
      })
    ),
  });

  configure({
    validateOnBlur: true, // controls if `blur` events should trigger validation with `handleChange` handler
  });

  const password = defineInputBinds('password', {
    validateOnInput: true,
  });
  const confirmationPassword = defineInputBinds('confirmationPassword', {
    validateOnInput: true,
  });

  // Refs
  const resetPasswordFocus = ref(false);
  const isConfirmationModalOpen = ref(false);

  const passwordConditions = computed(() => {
    const currentPassword = values.password ?? '';
    return {
      charNumber: currentPassword.length >= 12,
      letter: /[a-zA-Z]/.test(currentPassword),
      number: /[\d]/.test(currentPassword),
      specialChar: /[!@#$%^&*()_+\-=[\]{};':"|,.<>?]/.test(currentPassword),
    };
  });

  const isNewPasswordSafe = computed(() => {
    return (
      passwordConditions.value.charNumber &&
      passwordConditions.value.letter &&
      passwordConditions.value.number &&
      passwordConditions.value.specialChar
    );
  });

  const isFormLoading = ref(false);
  const isTokenInvalid = ref(false);
  const isChangingPasswordFailed = ref(false);

  // Methods

  const onSubmit = async () => {
    const loader = $loading.show({
      canCancel: false,
      enforceFocus: true,
      loader: 'loader',
      zIndex: 999999999,
    });
    isFormLoading.value = true;
    //isConfirmationModalOpen.value = true;

    // Check if Token is still valid
    try {
      const response: AxiosResponse<any> =
        await $api.user.getControlConfirmationTokenBeforeChangePasswordUserCollection(
          route.query?.token,
          appConfig.brand
        );

      try {
        const response: AxiosResponse<any> = await $api.user.postUserChangePasswordUserCollection(
          appConfig.brand,
          route.query?.token,
          password.value.value,
          confirmationPassword.value.value
        );
        // Password changed successfully
        isConfirmationModalOpen.value = true;
        $amplitude.logEvent('password reset');
      } catch {
        // Error
        isChangingPasswordFailed.value = true;
        $amplitude.logEvent('error encountered', { error_name: 'password reset failed' });
      }
    } catch {
      isTokenInvalid.value = true;
      $amplitude.logEvent('error encountered', { error_name: 'expired access token' });
    } finally {
      isFormLoading.value = false;
      loader.hide();
    }
  };

  onMounted(() => {
    $amplitude.logEvent('reset password displayed');
  });
</script>

<template>
  <NuxtLayout name="login">
    <Title>{{ $t('login.resetPasswordTitle') }} | {{ appConfig.title }}</Title>
    <template v-slot:title>{{ $t('login.title') }}</template>
    <template v-slot:form>
      <VeeForm class="login-form">
        <h2>{{ $t('login.resetPassword.title') }}</h2>
        <FormError v-if="isTokenInvalid">{{ $t('login.resetPassword.errors.tokenInvalid') }}</FormError>
        <FormError v-if="isChangingPasswordFailed">
          {{ $t('login.resetPassword.errors.failed') }}
        </FormError>
        <InputGlobal
          v-bind="password"
          id="password"
          :label="$t('login.fields.password')"
          type="password"
          :is-reset-password="true"
          :error-message="isNewPasswordSafe || !meta.dirty ? '' : $t('login.errors.passwordNotComplex')"
          @focusin="() => (resetPasswordFocus = true)"
          @focusout="() => (resetPasswordFocus = false)" />

        <Transition>
          <ul v-if="(resetPasswordFocus || meta.dirty) && !meta.valid" class="password-conditions">
            <li :class="passwordConditions.letter && 'valid'">
              <span class="condition__icon">
                <IconTick />
              </span>
              <span>{{ $t('login.resetPassword.conditions.letter') }}</span>
            </li>
            <li :class="passwordConditions.number && 'valid'">
              <span class="condition__icon">
                <IconTick />
              </span>
              <span>{{ $t('login.resetPassword.conditions.number') }}</span>
            </li>
            <li :class="passwordConditions.specialChar && 'valid'">
              <span class="condition__icon">
                <IconTick />
              </span>
              <span>{{ $t('login.resetPassword.conditions.specialChar') }}</span>
            </li>
            <li :class="passwordConditions.charNumber && 'valid'">
              <span class="condition__icon">
                <IconTick />
              </span>
              <span>{{ $t('login.resetPassword.conditions.length') }}</span>
            </li>
          </ul>
        </Transition>

        <InputGlobal
          v-bind="confirmationPassword"
          id="password-confirmation"
          v-model="confirmationPassword"
          :label="$t('login.fields.passwordConfirmation')"
          type="password"
          :is-reset-password="true"
          :error-message="!meta.valid || meta.dirty ? '' : $t('login.errors.passwordNotTheSame')" />

        <ButtonGlobal type="submit" :disabled="!meta.valid" :is-loading="isFormLoading" @click.prevent="onSubmit">
          {{ $t('actions.validate') }}
        </ButtonGlobal>
      </VeeForm>
      <ModalGlobal v-if="isConfirmationModalOpen" :is-open="isConfirmationModalOpen">
        <template v-slot:image><img src="@themePath/images/illu-action-valid.svg" alt="" /></template>
        <template v-slot:content>
          <h2>{{ $t('login.resetPassword.confirmation.title') }}</h2>
          <NuxtLink to="/login">
            <ButtonGlobal>{{ $t('actions.connect') }}</ButtonGlobal>
          </NuxtLink>
        </template>
      </ModalGlobal>
    </template>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
  .password-conditions {
    list-style-type: none;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    font-size: var(--p-font-size--tiny);

    li {
      transition: all ease 0.2s;
      display: grid;
      grid-template-columns: auto 1fr;
      align-items: center;
      gap: 0.5rem;
      color: var(--color-text);

      &.valid {
        color: var(--color-core);

        .condition__icon {
          background-color: transparent;
        }

        svg {
          opacity: 1;
        }
      }
    }
  }

  .condition__icon {
    transition: all ease-in-out 0.2s;
    background-color: var(--color-grey-100);
    display: flex;
    height: 1.1rem;
    width: 1.1rem;
    border-radius: 10em;

    svg {
      opacity: 0;
      transition: all ease-in-out 0.2s;
      margin: auto;
      fill: var(--color-success);
      transform: scale(1.15);
    }
  }
</style>

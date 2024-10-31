<script setup lang="ts">
  import { object, string } from 'yup';
  import { toTypedSchema } from '@vee-validate/yup';
  import { configure } from 'vee-validate';
  import { useReCaptcha } from 'vue-recaptcha-v3';
  import { AxiosError } from 'axios';
  import type { AxiosResponse } from 'axios';
  import type { Token } from '~/repository/customer-api/models/token';
  import { useUserStore } from '~/stores/user';
  const { $amplitude } = useNuxtApp();

  definePageMeta({
    layout: false,
  });

  const { $api, $loading, $i18n } = useNuxtApp();
  const appConfig = useAppConfig();
  const reCaptcha = useReCaptcha();
  const userStore = useUserStore();

  const isFormLoading = ref(false);
  const isCredentialFailed = ref(false);

  // Set user language based on browser
  const usersLanguage = window.navigator.language;

  $i18n.locale.value = usersLanguage.toLowerCase();

  const { meta, errors, defineInputBinds } = useForm({
    validationSchema: toTypedSchema(
      object({
        email: string().email().required(),
        password: string().required(),
      })
    ),
  });

  configure({
    validateOnBlur: true,
    validateOnInput: false,
  });

  const email = defineInputBinds('email', {
    validateOnInput: true,
  });
  const password = defineInputBinds('password', {
    validateOnInput: true,
  });

  // Submit login form
  const onSubmit = async () => {
    const loader = $loading.show({
      canCancel: false,
      enforceFocus: true,
      loader: 'loader',
    });
    isFormLoading.value = true;
    isCredentialFailed.value = false;

    // (optional) Wait until recaptcha has been loaded.
    await reCaptcha?.recaptchaLoaded();

    // Execute reCAPTCHA with action "login".
    const reCaptchaToken = await reCaptcha?.executeRecaptcha('login');

    // Call login api
    try {
      const response: AxiosResponse<Token, any> = await $api.login.postCredentialsItem({
        username: email.value.value,
        password: password.value.value,
        brand: appConfig.brand,
        recaptcha: reCaptchaToken,
      });

      // If login success :

      // Login user
      userStore.login(response.data?.token as string);
      $amplitude.logEvent('user logged in');

      // Redirect to home
      await navigateTo('/');
    } catch {
      isCredentialFailed.value = true;
      $amplitude.logEvent('error encountered', { error_name: 'invalid login' });
    } finally {
      isFormLoading.value = false;
      loader.hide();
    }
  };

  // Click on lost password button
  const lostPassword = () => {
    $amplitude.logEvent('forgotten password clicked');
  };
</script>

<template>
  <NuxtLayout name="login">
    <Title>{{ $t('login.title') }} | {{ appConfig.title }}</Title>
    <template v-slot:title>{{ $t('login.title') }}</template>
    <template v-slot:form>
      <VeeForm class="login-form" @submit="onSubmit">
        <h1>{{ $t('login.connection.title') }}</h1>
        <FormError v-if="isCredentialFailed">{{ $t('login.errors.loginFailed') }}</FormError>
        <InputGlobal
          v-bind="email"
          id="email"
          :error-message="!errors.email ? '' : $t('login.errors.email')"
          :label="$t('login.fields.email')"
          type="email"></InputGlobal>
        <InputGlobal
          v-bind="password"
          id="password"
          :error-message="!errors.password ? '' : $t('login.errors.password')"
          :label="$t('login.fields.password')"
          type="password"></InputGlobal>
        <ButtonGlobal type="submit" :disabled="!meta.valid" :is-loading="isFormLoading">
          {{ $t('login.connection.loginAction') }}
        </ButtonGlobal>
        <NuxtLink to="/login/lost-password" class="login-form__lost-password" @click="lostPassword">
          <ButtonGlobal :type="'button'" design="ghost">
            {{ $t('login.connection.forgetPassword') }}
          </ButtonGlobal>
        </NuxtLink>
      </VeeForm>
    </template>
  </NuxtLayout>
</template>

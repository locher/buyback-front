<script setup lang="ts">
  import { object, string } from 'yup';
  import { toTypedSchema } from '@vee-validate/yup';
  import { configure } from 'vee-validate';
  import type { AxiosResponse } from 'axios';
  const { $amplitude } = useNuxtApp();

  definePageMeta({
    layout: false,
  });

  const { $api, $loading } = useNuxtApp();
  const appConfig = useAppConfig();

  const { t } = useI18n();

  // Refs
  const isFormLoading = ref(false);
  const isFormError = ref(false);

  const { meta, errors, defineInputBinds } = useForm({
    validationSchema: toTypedSchema(
      object({
        email: string().email().required(),
      })
    ),
  });

  configure({
    validateOnBlur: true,
  });

  const email = defineInputBinds('email', {
    validateOnInput: true,
  });

  const mailIsSend = ref(false);

  // Methods
  const onSubmit = async () => {
    const loader = $loading.show({
      canCancel: false,
      enforceFocus: true,
      loader: 'loader',
      zIndex: 999999999,
    });
    isFormLoading.value = true;
    $amplitude.logEvent('reset password sent');

    // Call login api
    try {
      const response: AxiosResponse<any> = await $api.user.postUserResetPasswordUserCollection(
        appConfig.brand,
        email.value.value as string
      );
      // If login success
      mailIsSend.value = true;
    } catch {
      // if login error
      isFormError.value = true;
      $amplitude.logEvent('error encountered', { error_name: 'unable to send reset password email' });
    } finally {
      isFormLoading.value = false;
      loader.hide();
    }
  };

  const breadcrumbRoutes = [
    {
      title: t('login.connection.breadcrumb'),
      link: '/login',
    },
    {
      title: t('login.forgetPassword.breadcrumb'),
      link: '/login/lost-password',
    },
  ];
</script>

<template>
  <Title>{{ $t('login.lostPasswordTitle') }} | {{ appConfig.title }}</Title>
  <div class="global-wrapper">
    <BreadCrumb :routes="breadcrumbRoutes" />

    <section v-if="!mailIsSend" class="lost-password">
      <h1 class="lost-password__title">{{ $t('login.forgetPassword.title') }}</h1>
      <p class="lost-password__description">{{ $t('login.forgetPassword.description') }}</p>
      <VeeForm class="lost-password-form">
        <InputGlobal
          v-bind="email"
          id="email"
          :error-message="!errors.email ? '' : $t('login.errors.email')"
          :label="$t('login.fields.email')"
          type="email"></InputGlobal>
        <ButtonGlobal :is-loading="isFormLoading" type="submit" :disabled="!meta.valid" @click.prevent="onSubmit">
          {{ $t('login.forgetPassword.forgetAction') }}
        </ButtonGlobal>
        <NuxtLink to="/login">
          <ButtonGlobal design="ghost">{{ $t('global.back') }}</ButtonGlobal>
        </NuxtLink>
      </VeeForm>
    </section>

    <section v-if="mailIsSend" class="mailSent">
      <img src="@themePath/images/illu-sending-mail.svg" alt="" />
      <h1>{{ $t('login.forgetPassword.confirmation.title') }}</h1>
      <p>
        {{ $t('login.forgetPassword.confirmation.descriptionTop') }}
        <strong>{{ email.value }}</strong>
      </p>
      <p>
        {{ $t('login.forgetPassword.confirmation.descriptionBottom') }}
        <NuxtLink to="/login/lost-password" @click="mailIsSend = false">
          {{ $t('login.forgetPassword.confirmation.retry') }}.
        </NuxtLink>
      </p>
    </section>

    <ModalGlobal v-if="isFormError" :is-open="isFormError">
      <template v-slot:image><img src="@themePath/images/illu-technical-issue.svg" alt="" /></template>
      <template v-slot:content>
        <h2>{{ $t('login.forgetPassword.error.title') }}</h2>
        <p>{{ $t('login.forgetPassword.error.description') }}</p>
        <ButtonGlobal @click="isFormError = false">{{ $t('global.ok') }}</ButtonGlobal>
      </template>
    </ModalGlobal>
  </div>
</template>

<style scoped lang="scss">
  .global-wrapper {
    grid-template-rows: auto 1fr;
    gap: var(--gap-mini);
  }

  .lost-password {
    margin: auto;
    background-color: var(--card-color);
    padding: var(--card-padding);
    border-radius: var(--card-radius);
    box-shadow: var(--card-shadow);
    max-width: 70rem;

    &__title {
      text-align: center;
    }

    &__description {
      text-align: center;
      margin-top: 1em;
    }
  }

  .lost-password-form {
    margin-top: var(--gap-mini);
    padding: 0 10rem;
    text-align: center;
    display: grid;
    gap: var(--gap-mini);

    @media (width < 700px) {
      padding: 0;
    }
  }

  .mailSent {
    text-align: center;
    margin: auto;

    img {
      margin-left: auto;
      margin-right: auto;
      width: 38rem;
      height: auto;
    }

    h1 {
      margin-bottom: 0.7em;
    }

    a {
      color: var(--color-blast);
    }
  }
</style>

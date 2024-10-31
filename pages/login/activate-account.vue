<script setup lang="ts">
  import * as yup from 'yup';
  import { toTypedSchema } from '@vee-validate/yup';
  import { configure } from 'vee-validate';
  import { AxiosError, type AxiosResponse } from 'axios';
  import type {
    ContractContractReadByTokenDocumentation,
    UserUserSendSmsRequestInputUserSendSmsAccountDocumentation,
  } from '~/repository/customer-api';
  import type { ErrorApi } from '~/@types/models/api';
  import { useUserStore } from '~/stores/user';

  definePageMeta({
    layout: false,
  });

  const { $api, $i18n, $router, $loading } = useNuxtApp();
  const appConfig = useAppConfig();
  const route = useRoute();
  const userStore = useUserStore();
  const { $amplitude } = useNuxtApp();

  userStore.logout();

  const currentStep = ref<number>(1);
  const token = String(route.query['token']);
  const smsSent = ref<boolean>(false);
  const codeSmsTestRef = ref(false);
  const smsCodeValueTest = ref<string>('');
  const contracts = ref<Array<ContractContractReadByTokenDocumentation>>([]);
  const formErrorActivationAccount = ref<ErrorApi>({});

  const { meta, errors, values, defineInputBinds } = useForm({
    validationSchema: toTypedSchema(
      yup.object({
        smsCode: yup.string().required(),
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
    validateOnBlur: false, // controls if `blur` events should trigger validation with `handleChange` handler
  });

  const smsCode = defineInputBinds('smsCode', {
    validateOnInput: true,
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

  const currentContract = computed(() => {
    return contracts.value[0] ?? null;
  });

  // Methods

  const getContractsByTokenActivation = async () => {
    try {
      contracts.value = (await $api.contract.getCollectionContractsByTokenActivationContractItem(token))
        .data as unknown as Array<ContractContractReadByTokenDocumentation>;
      localStorage.removeItem('_numberContractActivation');
      smsSent.value = false;
      currentStep.value = 1;
      return;
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 404) {
        await navigateTo('/login');
      }
    }
  };

  const sendCodeActivation = async () => {
    const loader = $loading.show({
      canCancel: false,
      enforceFocus: true,
      loader: 'loader',
      zIndex: 999999999,
    });
    isFormLoading.value = true;
    const smsRequest: UserUserSendSmsRequestInputUserSendSmsAccountDocumentation = {
      confirmationToken: token,
      contractNumber: contracts.value[0].contractNumber as string,
    };
    try {
      const response = await $api.user.postUserSendSmsUserCollection(
        appConfig.app,
        token,
        contracts.value[0].contractNumber as string
      );

      const data: any = response.data;

      if (data.status === 200) {
        localStorage.setItem('_numberContractActivation', JSON.stringify(smsRequest.contractNumber));
        currentStep.value = 2;
        if (data?.code) {
          smsCodeValueTest.value = data.code;
          codeSmsTestRef.value = true;
        } else {
          codeSmsTestRef.value = false;
          smsCodeValueTest.value = '';
        }
        smsSent.value = true;
      }
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 406 || err.response?.status === 408) {
        localStorage.setItem('_numberContractActivation', JSON.stringify(smsRequest.contractNumber));
        currentStep.value = 2;
      }

      currentStep.value = 1;
      smsSent.value = false;
      localStorage.removeItem('_numberContractActivation');
    } finally {
      isFormLoading.value = false;
      loader.hide();
    }
  };

  const onSubmit = async () => {
    const loader = $loading.show({
      canCancel: false,
      enforceFocus: true,
      loader: 'loader',
    });
    isFormLoading.value = true;
    //isConfirmationModalOpen.value = true;

    try {
      const response = await $api.user.postUserActivateUserCollection(
        `${appConfig.app}`,
        token,
        values.smsCode as string,
        values.password as string,
        values.confirmationPassword as string
      );
      localStorage.removeItem('_numberContractActivation');
      smsSent.value = false;
      currentStep.value = 1;

      localStorage.setItem('token', response.data.token as unknown as string);
      userStore.login(response.data.token as unknown as string);

      $amplitude.logEvent('account activated');
      await navigateTo('/');
      return;
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 422) {
        const responseData = err.response.data as any;
        if (responseData.errorSmsCode) {
          formErrorActivationAccount.value.message = $i18n.t(responseData.message as string);
          formErrorActivationAccount.value.errorSmsCode = responseData.errorSmsCode;
        } else {
          formErrorActivationAccount.value.message = responseData.message;
        }
        return;
      }
      if (err.response?.status === 409) {
        const responseData = err.response.data as any;
        formErrorActivationAccount.value.code = responseData.status;
        if (responseData.errorSmsCode) {
          formErrorActivationAccount.value.message = $i18n.t(responseData.message as string);
          formErrorActivationAccount.value.errorSmsCode = responseData.errorSmsCode;
        } else {
          formErrorActivationAccount.value.message = responseData.message;
        }
      }
    } finally {
      loader.hide();
      isFormLoading.value = false;
    }
  };

  onBeforeMount(async () => {
    const loader = $loading.show({
      canCancel: false,
      enforceFocus: true,
    });
    await getContractsByTokenActivation();
    loader.hide();
  });

  onMounted(() => {
    $amplitude.logEvent('account activation displayed');
  });
</script>

<template>
  <NuxtLayout name="login">
    <Title>{{ $t('login.accountActivateTitle') }} | {{ appConfig.title }}</Title>
    <template v-slot:title>{{ $t('login.title') }}</template>
    <template v-slot:form>
      <VeeForm v-if="currentStep === 1 && currentContract" class="login-form">
        <h2>{{ $t('login.activateSendSms.title') }}</h2>
        <FormError v-if="isTokenInvalid">{{ $t('login.resetPassword.errors.tokenInvalid') }}</FormError>
        <FormError v-if="isChangingPasswordFailed">
          {{ $t('login.resetPassword.errors.failed') }}
        </FormError>

        <ButtonGlobal type="submit" :is-loading="isFormLoading" @click.prevent="sendCodeActivation">
          {{ $t('account.activateWithSendSmsCode') }} ({{ currentContract.phoneNumber }})
        </ButtonGlobal>
      </VeeForm>

      <VeeForm v-if="currentStep === 2 && currentContract" class="login-form">
        <h2>{{ $t('login.resetPassword.title') }}</h2>
        <div v-if="codeSmsTestRef" class="alert-block container">
          <div class="sms-code text-center">SANDBOX SMS CODE: {{ smsCodeValueTest }}</div>
        </div>
        <FormError v-if="isTokenInvalid">{{ $t('login.resetPassword.errors.tokenInvalid') }}</FormError>
        <FormError v-if="isChangingPasswordFailed">
          {{ $t('login.resetPassword.errors.failed') }}
        </FormError>
        <InputGlobal
          v-bind="smsCode"
          id="smsCode"
          :label="$t('login.fields.smsCode')"
          type="text"
          :error-message="!errors.smsCode ? '' : $t('login.errors.smsCode')" />
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

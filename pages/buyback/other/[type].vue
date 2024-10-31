<script setup lang="ts">
  import { object, string } from 'yup';
  import { toTypedSchema } from '@vee-validate/yup';
  import { configure } from 'vee-validate';
  import { AxiosError, type AxiosResponse } from 'axios';
  import { useUserStore } from '~/stores/user';

  const route = useRoute();
  const deviceType = route.params.type;
  const { t } = useI18n();
  const { $api, $loading, $amplitude } = useNuxtApp();
  const userStore = useUserStore();
  const appConfig = useAppConfig();

  const listType = ['drone', 'tablet', 'laptop', 'tv'];

  // Error 404 if type not in the list
  if (!listType.find((p) => p === deviceType)) {
    throw createError({ statusCode: 404, statusMessage: 'Page Not Found', fatal: true });
  }

  // Refs
  const fileInput = ref(null);
  const isValidModelOpen = ref(false);
  const isFormLoading = ref(false);
  const isDeclarationFailed = ref(false);

  // Form validation
  const { meta, values, defineInputBinds, resetForm } = useForm({
    validationSchema: toTypedSchema(
      object({
        brand: string().required().min(2),
        model: string().required().min(2),
        serial: string().required().min(2),
      })
    ),
  });

  configure({
    validateOnInput: true, // controls if `blur` events should trigger validation with `handleChange` handler
  });

  const brand = defineInputBinds('brand', {
    validateOnInput: true,
  });
  const model = defineInputBinds('model', {
    validateOnInput: true,
  });
  const serial = defineInputBinds('serial', {
    validateOnInput: true,
  });

  // Methods
  const onSubmit = async () => {
    const loader = $loading.show({
      canCancel: false,
      enforceFocus: true,
      loader: 'loader',
      zIndex: 999999999,
    });
    isFormLoading.value = true;
    isDeclarationFailed.value = false;

    // Call login api
    try {
      const response: AxiosResponse<any> =
        await $api.productDeclaration.postCreateDeclarationProductProductDeclarationCollection(
          userStore.user?.currentContract.contractNumber as string,
          deviceType,
          brand.value.value as string,
          model.value.value as string,
          [fileInput.value],
          [JSON.stringify({ serial: serial.value.value })],
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
      // If save form success
      isValidModelOpen.value = true;

      $amplitude.logEvent('buyback old device validated', {
        device: deviceType,
        brand: brand.value.value as string,
        model: model.value.value as string,
        serial: serial.value.value as string,
      });
    } catch (error) {
      // if login error
      const err = error as AxiosError;
      isDeclarationFailed.value = true;
      $amplitude.logEvent('buyback old device submission error');
    } finally {
      loader.hide();
      isFormLoading.value = false;
    }
  };

  // Const
  const breadcrumbRoutes = [
    {
      title: t('menu.home'),
      link: '/',
    },
    {
      title: t('actions.addDevice'),
      link: '/buyback',
    },
    {
      title: t('devices.yourDevice', { device: t(`devices.${deviceType}`).toLowerCase() }),
      link: `/buyback/other/${deviceType}`,
    },
  ];

  // Watch
  onBeforeMount(() => {
    resetForm({
      values: {
        brand: brand.value.value,
        model: '',
        serial: '',
      },
    });
  });

  onMounted(() => {
    $amplitude.logEvent('buyback old device displayed', { device: deviceType });
  });
</script>

<template>
  <NuxtLayout name="register-device">
    <Title>{{ $t('buyback.registerDeviceTitle') }} | {{ appConfig.title }}</Title>
    <h1>{{ $t(`global.your`) }} {{ $t(`devices.${deviceType}`).toLowerCase() }}</h1>
    <BreadCrumb :routes="breadcrumbRoutes" />

    <div class="device-form">
      <div class="device-form__wrapper">
        <VeeForm class="card-style device-form__form" @submit.prevent="onSubmit">
          <InputGlobal
            id="brand"
            v-bind="brand"
            :label="$t('registerDevice.form.choiceBrand', { device: t(`devices.${deviceType}`).toLowerCase() })"
            :is-label-outside="true" />

          <InputGlobal
            id="model"
            v-bind="model"
            :label="$t('registerDevice.form.preciseBrand')"
            :is-label-outside="true" />

          <InputGlobal
            id="serial"
            v-bind="serial"
            :label="$t('registerDevice.form.choiceSerial')"
            :is-label-outside="true" />

          <UploadFile
            @file-changed="
              (e) => {
                fileInput = e[0];
              }
            "></UploadFile>
          <FormError v-if="isDeclarationFailed">{{ $t('registerDevice.errors.apiFailed') }}</FormError>

          <ButtonGlobal
            :is-loading="isFormLoading"
            :disabled="!meta.valid || !fileInput"
            type="submit"
            @click.prevent="onSubmit">
            {{ $t('actions.validate') }}
          </ButtonGlobal>
        </VeeForm>
        <aside>
          <ul class="card-style list-details">
            <li>
              <span>{{ $t('registerDevice.aside.brand') }}</span>
              <strong>{{ brand.value }}</strong>
            </li>
            <li v-if="model.value !== ''">
              <span>{{ $t('registerDevice.aside.model') }}</span>
              <strong>{{ model.value }}</strong>
            </li>
            <li v-if="serial.value !== ''">
              <span>{{ $t('registerDevice.aside.serial') }}</span>
              <strong>{{ serial.value }}</strong>
            </li>
          </ul>
          <div class="card-style list-details">
            <div class="list-bill">
              <span>{{ $t('registerDevice.aside.bill') }}</span>
              <IconTickRound v-if="fileInput" class="success" />
              <IconFullArrow v-else />
            </div>
          </div>
        </aside>
      </div>
    </div>
    <ModalGlobal
      v-if="isValidModelOpen"
      :is-open="isValidModelOpen"
      @modal-closed="
        () => {
          isValidModelOpen = false;
        }
      ">
      <template v-slot:content>
        <h2>{{ $t('registerDevice.confirm.title') }}</h2>
        <h3>{{ $t('registerDevice.confirm.subtitle') }}</h3>
        <p>{{ $t('registerDevice.confirm.content') }}</p>
        <NuxtLink to="/buyback">
          <ButtonGlobal>{{ $t('actions.addOtherDevice') }}</ButtonGlobal>
        </NuxtLink>
        <NuxtLink to="/">
          <ButtonGlobal design="ghost">{{ $t('actions.backHome') }}</ButtonGlobal>
        </NuxtLink>
      </template>

      <template v-slot:image><img src="@themePath/images/illu-action-valid.svg" alt="" /></template>
    </ModalGlobal>
  </NuxtLayout>
</template>

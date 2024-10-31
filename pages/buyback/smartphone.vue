<script setup lang="ts">
  import { object, string } from 'yup';
  import { toTypedSchema } from '@vee-validate/yup';
  import { configure } from 'vee-validate';
  import { AxiosError, type AxiosResponse } from 'axios';
  import type { Phone } from '~/@types/phone';
  import { useUserStore } from '~/stores/user';

  const { t } = useI18n();
  const device = 'phone';
  const { $api, $loading } = useNuxtApp();
  const userStore = useUserStore();
  const appConfig = useAppConfig();
  const { $amplitude } = useNuxtApp();

  // Refs
  const smartphoneList: Ref<Phone[]> = ref([]);
  const isImeiModal = ref(false);
  const fileInput = ref(null);
  const isValidModelOpen = ref(false);
  const isFormLoading = ref(false);
  const isDeclarationFailed = ref(false);

  // Form validation
  const { meta, values, errors, defineInputBinds, resetForm } = useForm({
    validationSchema: toTypedSchema(
      object({
        brand: string(),
        otherBrand: string(),
        model: string(),
        otherModel: string(),
        capacity: string().required(),
        imei: string().min(15).max(17).required(),
      })
        .test(
          'brand-otherBrand',
          'Either brand or otherBrand is required',
          (values) => values.brand || values.otherBrand
        )
        .test(
          'model-otherModel',
          'Either model or otherModel is required',
          (values) => values.model || values.otherModel
        )
    ),
  });

  configure({
    validateOnInput: true, // controls if `blur` events should trigger validation with `handleChange` handler
  });

  const brand = defineInputBinds('brand');
  const otherBrand = defineInputBinds('otherBrand');
  const model = defineInputBinds('model');
  const otherModel = defineInputBinds('otherModel');
  const capacity = defineInputBinds('capacity');
  const imei = defineInputBinds('imei');

  // Computed
  const brandList = computed(() => {
    if (smartphoneList.value.length > 0) {
      const currentSmartphoneList = smartphoneList.value as unknown as Array<Phone>;
      return [...new Set<string>(currentSmartphoneList.map((item) => item.brand))];
    }
    return [];
  });

  // Methods
  const fetchSmartphoneList = async () => {
    // 5 Use the plugin to get the smarthphone list
    smartphoneList.value = await $api.devices.getDeviceCollection();
  };

  const uniquePhoneModels = (brand: string) => {
    const models = new Set<string>();
    if (smartphoneList.value.length > 0) {
      const currentSmartphoneList = smartphoneList.value as unknown as Array<Phone>;

      currentSmartphoneList.forEach((phone) => {
        if (phone.brand === brand) {
          models.add(phone.model);
        }
      });
    }
    return Array.from(models);
  };

  const uniqueCapacity = (brand: string, model: string) => {
    if (smartphoneList.value.length > 0) {
      const currentSmartphoneList = smartphoneList.value as unknown as Array<Phone>;

      const capacities = currentSmartphoneList.filter((el) => el.brand === brand && el.model === model);
      //return capacities;
      return capacities.map((el) => el.capacity);
    }
    return [];
  };

  fetchSmartphoneList();

  const onSubmit = async () => {
    const loader = $loading.show({
      canCancel: false,
      enforceFocus: true,
      loader: 'loader',
      zIndex: 999999999,
    });
    isDeclarationFailed.value = false;
    isFormLoading.value = true;

    // Call login api
    try {
      const response: AxiosResponse<any> =
        await $api.productDeclaration.postCreateDeclarationProductProductDeclarationCollection(
          userStore.user?.currentContract.contractNumber as string,
          device,
          otherBrand.value.value !== '' ? (otherBrand.value.value as string) : (brand.value.value as string),
          otherModel.value.value !== '' ? (otherModel.value.value as string) : (model.value.value as string),
          [fileInput.value],
          [JSON.stringify({ imei: imei.value.value, capacity: capacity.value.value })],
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

      // If save form success
      isValidModelOpen.value = true;
      $amplitude.logEvent('buyback old device validated', {
        device: 'smartphone',
        brand: otherBrand.value.value !== '' ? (otherBrand.value.value as string) : (brand.value.value as string),
        model: otherModel.value.value !== '' ? (otherModel.value.value as string) : (model.value.value as string),
        capacity: capacity.value.value,
        imei: !!imei.value.value,
      });
    } catch (error) {
      const err = error as AxiosError;
      isDeclarationFailed.value = true;
      $amplitude.logEvent('buyback old device submission error');
    } finally {
      isFormLoading.value = false;
      loader.hide();
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
      title: t('devices.yourDevice', { device: t(`devices.${device}`).toLowerCase() }),
      link: '/buyback/smartphone',
    },
  ];

  // Watch
  onMounted(() => {
    resetForm({
      values: {
        brand: brand.value.value,
        otherBrand: '',
        model: '',
        otherModel: '',
        capacity: '',
        imei: '',
      },
    });
  });

  watch(brand, () => {
    resetForm({
      values: {
        brand: brand.value.value,
        otherBrand: '',
        model: '',
        otherModel: '',
        capacity: '',
        imei: imei.value.value,
      },
    });
  });

  watch(otherBrand, () => {
    resetForm({
      values: {
        brand: brand.value.value,
        otherBrand: otherBrand.value.value,
        model: '',
        otherModel: '',
        capacity: '',
        imei: imei.value.value,
      },
    });
  });

  watch(model, () => {
    resetForm({
      values: {
        brand: brand.value.value,
        otherBrand: otherBrand.value.value,
        model: model.value.value,
        otherModel: '',
        capacity: '',
        imei: imei.value.value,
      },
    });
  });

  onMounted(() => {
    $amplitude.logEvent('buyback old device displayed', { device: 'smartphone' });
  });
</script>

<template>
  <NuxtLayout name="register-device">
    <Title>{{ $t('buyback.registerDeviceTitle') }} | {{ appConfig.title }}</Title>
    <h1>{{ $t('devices.yourDevice', { device: t(`devices.${device}`).toLowerCase() }) }}</h1>
    <BreadCrumb :routes="breadcrumbRoutes" />

    <div class="device-form">
      <div class="device-form__wrapper">
        <VeeForm class="card-style device-form__form">
          <SelectOption
            id="brand"
            v-bind="brand"
            :list="brandList"
            :label="$t('registerDevice.form.choiceBrand', { device: t(`devices.${device}`).toLowerCase() })" />

          <InputGlobal
            v-if="brand.value === 'Autre'"
            id="otherBrand"
            v-bind="otherBrand"
            :label="$t('registerDevice.form.preciseBrand')"
            :is-label-outside="true" />

          <SelectOption
            v-if="brand.value !== 'Autre'"
            id="model"
            v-bind="model"
            :list="uniquePhoneModels(brand.value as string)"
            :label="$t('registerDevice.form.choiceModel')" />

          <InputGlobal
            v-if="brand.value === 'Autre' || model.value === 'Autre'"
            id="otherModel"
            v-bind="otherModel"
            :label="$t('registerDevice.form.preciseModel')"
            :is-label-outside="true" />

          <SelectOption
            v-if="brand.value !== 'Autre' && model.value !== 'Autre'"
            id="capacity"
            v-bind="capacity"
            :list="uniqueCapacity(brand.value as string, model.value as string)"
            :label="$t('registerDevice.form.choiceCapacity')" />

          <InputGlobal
            v-else
            id="capacity"
            v-bind="capacity"
            :label="$t('registerDevice.form.choiceCapacity')"
            :is-label-outside="true" />

          <InputGlobal
            id="imei"
            v-bind="imei"
            :label="$t('registerDevice.form.choiceImei')"
            :is-label-outside="true"
            :error-message="!errors.imei ? '' : $t('registerDevice.errors.imeiError')" />
          <InputHint
            class="find-imei"
            @click.prevent="
              () => {
                isImeiModal = true;
              }
            ">
            {{ $t('registerDevice.form.findImei') }}
          </InputHint>

          <UploadFile
            @file-changed="
              (e) => {
                fileInput = e[0];
              }
            "></UploadFile>

          <FormError v-if="isDeclarationFailed">{{ $t('registerDevice.errors.apiFailed') }}</FormError>

          <ButtonGlobal
            :disabled="!meta.valid || !fileInput"
            type="submit"
            :is-loading="isFormLoading"
            @click.prevent="onSubmit">
            {{ $t('actions.validate') }}
          </ButtonGlobal>
        </VeeForm>
        <aside>
          <ul class="card-style list-details">
            <li>
              <span>{{ $t('registerDevice.aside.brand') }}</span>
              <strong>{{ otherBrand.value !== '' ? otherBrand.value : brand.value }}</strong>
            </li>
            <li v-if="model?.value !== '' || model?.value || otherModel?.value !== '' || otherModel?.value">
              <span>{{ $t('registerDevice.aside.model') }}</span>
              <strong>{{ otherModel.value !== '' ? otherModel.value : model.value }}</strong>
            </li>
            <li v-if="capacity.value !== ''">
              <span>{{ $t('registerDevice.aside.capacity') }}</span>
              <strong>{{ capacity.value }}</strong>
            </li>
            <li v-if="imei.value !== ''">
              <span>{{ $t('registerDevice.aside.imei') }}</span>
              <strong>{{ imei.value }}</strong>
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
      v-if="isImeiModal"
      :is-open="isImeiModal"
      design="left"
      @modal-closed="
        () => {
          isImeiModal = false;
        }
      ">
      <template v-slot:content>
        <h2>{{ $t('registerDevice.findImei.title') }}</h2>
        <img src="@common/images/imei-iphone.png" alt="" />
        <div v-html="$t('registerDevice.findImei.content')"></div>
      </template>
    </ModalGlobal>

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

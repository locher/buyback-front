<script setup>
  const appConfig = useAppConfig();
</script>

<template>
  <NuxtLoadingIndicator color="#0034cc" />
  <NuxtLayout>
    <Title>{{ appConfig.title }}</Title>
    <Meta name="description" :content="appConfig.description" />
    <NuxtPage />
  </NuxtLayout>
</template>

<style lang="scss">
  @import '@common/styles/index.scss';
  @import '@themePath/styles/index.scss';
</style>

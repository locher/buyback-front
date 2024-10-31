<script setup>
  // Refs
  const fileList = ref([]);
  const isOver = ref(false);

  // Emit
  const emit = defineEmits(['fileChanged']);

  // Methods
  const onChange = (e) => {
    fileList.value = e.target.files;
    emit('fileChanged', fileList.value);
  };

  const dragover = () => {
    isOver.value = true;
  };

  const dragleave = () => {
    isOver.value = false;
  };

  const drop = () => {
    isOver.value = false;
  };
</script>

<template>
  <label for="assetsFieldHandle" :class="{ 'is-over': isOver }">
    <input
      id="assetsFieldHandle"
      ref="file"
      type="file"
      multiple
      name="fields[assetsFieldHandle][]"
      accept=".pdf,.jpg,.jpeg,.png"
      @change="onChange"
      @dragover="dragover"
      @dragleave="dragleave"
      @drop="drop" />
    <span v-if="fileList.length === 0" class="container">
      <IconUpload />
      <span class="container__text">{{ $t('registerDevice.form.addBill') }}</span>
    </span>
    <span v-else class="container">
      <IconTickRound />
      <span class="container__text">{{ fileList[0].name }}</span>
    </span>
  </label>
</template>

<style scoped lang="scss">
  label {
    display: block;
    padding: 1.6rem;
    position: relative;

    input {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      opacity: 0;
      background-color: red;
    }

    &:hover .container,
    &.is-over .container {
      background-color: var(--color-blue-50);
      border: 1px dotted var(--color-blue-300);
    }

    &:hover input {
      cursor: pointer;
    }

    .container {
      transition: all ease 0.3s;
      cursor: pointer;
      border: 1px solid var(--color-blue-100);
      padding: var(--gap-mini);
      color: var(--color-core);
      display: grid;
      gap: 1rem;
      justify-items: center;
      font-size: var(--p-font-size--tiny);

      svg {
        width: auto;
        height: 1.6rem;
        fill: var(--color-core);
      }
    }
  }
</style>

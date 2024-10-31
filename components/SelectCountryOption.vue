<script setup>
  import { el } from 'date-fns/locale';

  defineProps({
    list: {
      type: Array,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  });
</script>

<template>
  <div class="select-single">
    <label class="label" :for="id">{{ label }}</label>
    <select :id="id" class="input">
      <option v-for="elt in list" :key="elt" :value="elt.code">
        <img :src="elt.flag" :alt="elt.country" />
        {{ elt.country }}
      </option>
    </select>
  </div>
</template>

<style lang="scss" scoped>
  .select-single {
    display: grid;
    gap: 1rem;

    select {
      display: block;
      cursor: pointer;
      background: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iNiIgdmlld0JveD0iMCAwIDEyIDYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xMC42ODc1IDEuNzE4NzVMNi43MTg3NSA1LjcxODc1QzYuNSA1LjkwNjI1IDYuMjUgNiA2IDZDNS43MTg3NSA2IDUuNDY4NzUgNS45MDYyNSA1LjI4MTI1IDUuNzE4NzVMMS4zMTI1IDEuNzE4NzVDMSAxLjQzNzUgMC45MDYyNSAxIDEuMDYyNSAwLjYyNUMxLjIxODc1IDAuMjUgMS41OTM3NSAwIDIgMEg5Ljk2ODc1QzEwLjM3NSAwIDEwLjcxODggMC4yNSAxMC44NzUgMC42MjVDMTEuMDMxMiAxIDEwLjk2ODggMS40Mzc1IDEwLjY4NzUgMS43MTg3NVoiIGZpbGw9IiM3MDgyQTAiLz4KPC9zdmc+Cg==')
        no-repeat right 2rem top 50%;
      appearance: none;
    }
  }
</style>

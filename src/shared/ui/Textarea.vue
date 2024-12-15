<script setup lang="ts">
const model = defineModel<string>()
</script>

<template>
  <textarea
    v-model="model"
    class="
      w-full rounded-xl border border-slate-400 p-2 font-medium text-slate-700
    "
    type="text"
  />
</template>

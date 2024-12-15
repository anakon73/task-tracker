<script setup lang="ts">
interface Props {
  required?: boolean
}

defineProps<Props>()

const model = defineModel<string>()
</script>

<template>
  <input
    v-model="model"
    :required="required"
    class="
      w-full rounded-xl border border-slate-400 p-2 font-medium text-slate-700
    "
    type="text"
  >
</template>

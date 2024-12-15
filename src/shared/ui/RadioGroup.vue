<script setup lang="ts">
import { RadioGroupIndicator, RadioGroupItem, RadioGroupRoot } from 'radix-vue'

defineProps<{ items: string[] }>()

const model = defineModel<string>()
</script>

<template>
  <RadioGroupRoot
    v-model="model"
    class="flex flex-col gap-2.5"
  >
    <div
      v-for="item in items"
      :key="item"
      class="flex items-center gap-2 font-medium"
    >
      <RadioGroupItem
        :id="item"
        class="
          size-3 cursor-default rounded-full border bg-white outline-none
          transition-colors

          hover:bg-slate-50
        "
        :value="item"
      >
        <RadioGroupIndicator
          class="
            relative flex items-center justify-center

            after:block after:size-1.5 after:rounded-full after:bg-blue-600
            after:content-['']
          "
        />
      </RadioGroupItem>
      <label
        class="text- leading-none slate-700"
        :for="item"
      >
        {{ item }}
      </label>
    </div>
  </RadioGroupRoot>
</template>

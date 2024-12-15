<script setup lang="ts">
import type { Component } from 'vue'

interface Props {
  label?: string
  required?: boolean
  component: Component
}

defineProps<Props>()

const model = defineModel<string>()
</script>

<template>
  <div>
    <label
      v-if="label"
      class="pl-1 text-sm font-bold"
    >
      {{ label }}
    </label>
    <component
      :is="component"
      v-model="model"
      :required="required"
    />
  </div>
</template>

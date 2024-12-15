<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
  <div
    class="cursor-pointer truncate rounded-xl bg-white px-3 py-2 text-sm shadow"
  >
    {{ title }}
  </div>
</template>

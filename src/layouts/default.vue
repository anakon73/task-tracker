<script setup lang="ts">
import Header from '~/shared/ui/Header.vue'
</script>

<template>
  <Header />
  <div class="h-screen bg-blue-400 px-5 py-16">
    <slot />
  </div>
</template>

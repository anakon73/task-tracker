<script setup lang="ts">
import {
  ChevronDownIcon,
  LayoutIcon,
  LockClosedIcon,
  StarIcon,
} from '@radix-icons/vue'
</script>

<template>
  <header
    class="
      fixed top-0 flex w-full items-center gap-4 bg-white/40 px-5 py-2
      text-slate-700
    "
  >
    <h1 class="text-lg font-bold">
      Example
    </h1>
    <button>
      <StarIcon class="size-4" />
    </button>
    <div class="flex items-center gap-2">
      <LockClosedIcon class="size-4" />
      <p class="text-sm font-semibold">
        Private
      </p>
    </div>
    <button
      class="
        flex items-center gap-1 rounded-md bg-slate-600/50 px-2 py-1 text-sm
        font-semibold text-white
      "
    >
      <LayoutIcon class="size-4" />
      <p>Board</p>
    </button>
    <button>
      <ChevronDownIcon class="size-4" />
    </button>
  </header>
</template>

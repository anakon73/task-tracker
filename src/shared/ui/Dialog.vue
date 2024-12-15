<script setup lang="ts">
import { Cross2Icon } from '@radix-icons/vue'
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
} from 'radix-vue'

defineProps<{ open: boolean }>()
defineEmits<{ close: [] }>()
</script>

<template>
  <DialogRoot :open="open" @update:open="$emit('close')">
    <DialogPortal>
      <DialogOverlay
        class="
          fixed inset-0 z-30 bg-black/30

          data-[state=open]:animate-overlayShow
        "
      />
      <DialogContent
        class="
          fixed left-[50%] top-[50%] z-[100] max-h-[85vh] w-[90vw] max-w-sm
          translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-4
          shadow-2xl

          data-[state=open]:animate-contentShow

          focus:outline-none
        "
      >
        <slot />

        <DialogClose
          class="
            absolute right-2.5 top-2.5 text-slate-600 transition-colors

            focus:outline-none

            hover:text-slate-700
          "
          aria-label="Close"
        >
          <Cross2Icon />
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

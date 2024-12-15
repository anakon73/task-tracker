<script setup lang="ts">
import { DotIcon } from '@radix-icons/vue'
import { useTaskStore } from '~/store'

interface Emits {
  close: []
  edit: []
}

const props = defineProps<{ id: number | null }>()

const emits = defineEmits<Emits>()

const { id } = toRefs(props)

const taskStore = useTaskStore()

const task = taskStore.taskById(id.value ?? 0)

function deleteTask() {
  taskStore.deleteTask(id.value!)
  emits('close')
}

function editTask() {
  emits('edit')
  emits('close')
}
</script>

<template>
  <div v-if="id">
    <h5 class="mb-4 text-lg font-bold text-slate-700">
      {{ task?.title }}
    </h5>

    <p
      v-if="task?.description"
      class="mb-2 break-words rounded-md border bg-slate-50 p-1"
    >
      {{ task.description }}
    </p>

    <p class="mb-2">
      Responsible person is
      <span class="font-medium">{{ task?.responsiblePerson }}</span>
    </p>

    <div class="mb-2">
      <h4 class="font-semibold">
        Executors:
      </h4>
      <ul v-if="task?.executors.length" class="flex flex-col gap-1 pl-2">
        <li
          v-for="executor in task.executors"
          :key="executor"
          class="flex items-center text-sm font-medium"
        >
          <DotIcon />
          {{ executor }}
        </li>
      </ul>
      <p v-else class="text-sm font-medium">
        No executors added
      </p>
    </div>

    <p class="mb-4">
      Task have a <span class="font-medium">{{ task?.priority }}</span> priority
    </p>

    <div class="flex justify-end gap-2">
      <button
        class="rounded-md bg-red-600 px-2 py-1 text-sm text-white"
        @click="deleteTask"
      >
        Delete
      </button>
      <button
        class="rounded-md bg-blue-600 px-2 py-1 text-sm text-white"
        @click="editTask"
      >
        Edit
      </button>
    </div>
  </div>
  <h1 v-else class="text-2xl font-bold text-slate-800">
    Task is not found
  </h1>
</template>

<script setup lang="ts">
import { PlusIcon } from '@radix-icons/vue'

import { useTaskStore } from '~/store'

import type { Status, Task } from '~/shared/types'
import Dialog from '~/shared/ui/Dialog.vue'

import TaskCard from './TaskCard.vue'
import TaskForm from './TaskForm.vue'
import TaskInfo from './TaskInfo.vue'

interface Props {
  title: Status
  tasks: Task[]
}

defineProps<Props>()

const taskStore = useTaskStore()

const { draggedTask } = storeToRefs(taskStore)

const open = ref(false)
const showInfo = ref(false)
const selectedTaskId = ref<number | null>(null)
const edit = ref(false)

function openInfo(id: number) {
  showInfo.value = true
  selectedTaskId.value = id
}

function closeInfo() {
  showInfo.value = false

  if (!edit.value)
    selectedTaskId.value = null
}

function closeEdit() {
  open.value = false

  if (edit.value) {
    selectedTaskId.value = null
    edit.value = false
  }
}

function editTask() {
  open.value = true
  edit.value = true
}

function handleDragStart(task: Task) {
  taskStore.setDraggedTask(task)
}

function handleDrop(status: Status) {
  taskStore.moveTaskToStatus(draggedTask.value!, status)
}
</script>

<template>
  <div
    class="w-64 flex-shrink-0 select-none rounded-xl bg-slate-100 p-2"
    @drop="handleDrop(title)"
    @dragover.prevent
  >
    <h4 class="mb-2.5 pl-2 text-sm font-semibold text-slate-800">
      {{ title }}
    </h4>
    <div
      class="flex flex-col gap-2"
    >
      <div v-for="task in tasks" :key="task.id">
        <TaskCard
          :title="task.title"
          draggable="true"
          @dragstart="handleDragStart(task)"
          @click="openInfo(task.id)"
        />
      </div>
    </div>

    <button
      class="mt-2 flex items-center gap-2 pl-2 text-slate-600"
      @click="open = true"
    >
      <PlusIcon class="size-4" />
      <p class="text-sm font-semibold">
        Add a card
      </p>
      <Dialog :open="open" @close="closeEdit">
        <TaskForm
          :edit-task-id="selectedTaskId"
          :edit="edit"
          :status="title"
          @close="closeEdit"
        />
      </Dialog>
    </button>
    <Dialog :open="showInfo" @close="closeInfo">
      <TaskInfo
        :id="selectedTaskId"
        @edit="editTask"
        @close="closeInfo"
      />
    </Dialog>
  </div>
</template>

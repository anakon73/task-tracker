<script setup lang="ts">
import { Cross2Icon } from '@radix-icons/vue'

import { useTaskStore } from '~/store'

import type { Priority, Status } from '~/shared/types'
import RadioGroup from '~/shared/ui/RadioGroup.vue'
import Textarea from '~/shared/ui/Textarea.vue'
import Field from '~/shared/ui/Field.vue'
import Input from '~/shared/ui/Input.vue'

interface Props {
  status: Status
  edit?: boolean
  editTaskId: number | null
}

const props = defineProps<Props>()

const emits = defineEmits<{ close: [] }>()

const { edit, editTaskId, status } = toRefs(props)

const taskStore = useTaskStore()

const task = computed(
  () =>
    (edit.value && editTaskId ? taskStore.taskById(editTaskId.value!) : null),
)

const title = ref(task.value?.title ?? '')
const description = ref(task.value?.description ?? '')
const responsiblePerson = ref(task.value?.responsiblePerson ?? '')
const executorInput = ref('')
const executors = ref<string[]>(task.value?.executors ?? [])
const priority = ref<Priority>(task.value?.priority ?? 'Low')

function addExecutor() {
  if (executorInput.value.length >= 2) {
    executors.value.push(executorInput.value)
    executorInput.value = ''
  }
}

function removeExecutor(index: number) {
  executors.value = executors.value.filter((_, i) => i !== index)
}

function handleSubmit() {
  if (edit.value) {
    taskStore.editTask({
      id: editTaskId.value!,
      title: title.value,
      status: status.value,
      description: description.value,
      responsiblePerson: responsiblePerson.value,
      executors: executors.value,
      priority: priority.value,
    })
  }
  else {
    taskStore.createTask({
      title: title.value,
      status: status.value,
      description: description.value,
      responsiblePerson: responsiblePerson.value,
      executors: executors.value,
      priority: priority.value,
    })
  }
  emits('close')
}
</script>

<template>
  <form class="flex flex-col gap-2" @submit.prevent="handleSubmit">
    <h3 class="text-lg font-bold text-slate-700">
      {{ edit ? 'Edit task' : 'Add new task' }}
    </h3>

    <Field
      v-model="title"
      :component="Input"
      required
      label="Title"
    />

    <Field
      v-model="description"
      :component="Textarea"
      label="Description"
    />

    <Field
      v-model="responsiblePerson"
      :component="Input"
      required
      label="Responsible person"
    />

    <div>
      <h2 class="pl-1 text-sm font-bold">
        Add new executor
      </h2>
      <Field v-model="executorInput" :component="Input" />

      <button
        type="button"
        class="
          mt-1 rounded-md bg-blue-600 px-1 py-0.5 text-sm font-semibold
          text-white
        "
        @click="addExecutor"
      >
        Add executor
      </button>

      <h4 class="font-medium">
        Executors:
      </h4>

      <div v-if="executors.length" class="truncate px-2">
        <div
          v-for="(executor, index) in executors"
          :key="`${executor}${index}`"
          class="flex items-center gap-2"
        >
          <button
            type="button"
            @click="removeExecutor(index)"
          >
            <Cross2Icon class="size-3" />
          </button>
          <div class="flex items-center gap-1">
            <p class="text-sm font-semibold">
              {{ executor }}
            </p>
          </div>
        </div>
      </div>
      <p v-else class="text-sm font-semibold">
        No executors added
      </p>
    </div>

    <div class="pl-1">
      <h5 class="mb-2 text-sm font-bold">
        Priority
      </h5>
      <RadioGroup v-model="priority" :items="['Low', 'High']" />
    </div>

    <button class="mt-2 rounded-md bg-blue-600 py-1 font-bold text-white">
      {{ edit ? 'Update Task' : 'Create Task' }}
    </button>
  </form>
</template>

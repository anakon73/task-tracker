<script setup lang="ts">
import { useTaskStore } from '~/store'
import TaskColumn from './TaskColumn.vue'

const tasksStore = useTaskStore()

const { taskColumns } = storeToRefs(tasksStore)
</script>

<template>
  <div class="flex items-start gap-4">
    <TaskColumn
      v-for="(column) in taskColumns"
      :key="column.status"
      :tasks="column.tasks"
      :title="column.status"
    />
  </div>
</template>

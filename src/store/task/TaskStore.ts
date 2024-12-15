import { defineStore } from 'pinia'
import type { Status, Task } from '~/shared/types'

export const useTaskStore = defineStore('task', () => {
  const tasksCookie = useCookie<Task[]>('tasks', { default: () => [] })

  const tasks = computed<Task[]>(() => tasksCookie.value)

  const draggedTask = ref<Task | null>(null)

  const taskColumns = computed<{ status: Status, tasks: Task[] }[]>(() => {
    const statusMap: { [key in Status]: Task[] } = {
      'TODO': [],
      'In progress': [],
      'Done': [],
    }

    tasks.value.forEach((task) => {
      statusMap[task.status].push(task)
    })

    return Object.entries(statusMap).map(([status, tasks]) => ({
      status: status as Status,
      tasks,
    }))
  })

  const taskById = (id: number) => tasks.value.find(task => task.id === id)

  const setDraggedTask = (task: Task) => draggedTask.value = task

  const moveTaskToStatus = (task: Task, status: Status) => {
    const index = tasks.value.findIndex(t => t.id === task.id)
    if (index !== -1)
      tasks.value[index].status = status
  }

  const createTask = (task: Omit<Task, 'id'>) => {
    const newTask = { id: Date.now(), ...task }
    tasks.value.push(newTask)
  }

  const deleteTask = (taskId: number) =>
    tasksCookie.value = tasks.value.filter(task => task.id !== taskId)

  const editTask = (updatedTask: Task) => {
    const index = tasks.value.findIndex(t => t.id === updatedTask.id)
    if (index !== -1)
      tasks.value[index] = updatedTask
  }

  return {
    tasks,
    taskColumns,
    draggedTask,
    setDraggedTask,
    moveTaskToStatus,
    taskById,
    createTask,
    deleteTask,
    editTask,
  }
})

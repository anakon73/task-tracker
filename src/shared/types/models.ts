export type Status = 'TODO' | 'In progress' | 'Done'

export type Priority = 'Low' | 'High'

export interface Task {
  id: number
  title: string
  description: string
  responsiblePerson: string
  executors: string[]
  status: Status
  priority: Priority
}

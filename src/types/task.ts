export type TaskStatus = 'pending' | 'in-progress' | 'completed'
export type TaskPriority = 'low' | 'medium' | 'high'

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  dueDate: string
  createdAt: string
  updatedAt: string
}

export interface CreateTaskData {
  title: string
  description: string
  priority: TaskPriority
  dueDate: string
}
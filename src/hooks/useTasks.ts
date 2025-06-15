import { useState, useEffect } from 'react'
import type { Task, CreateTaskData, TaskStatus } from '../types/task'

const STORAGE_KEY = 'taskflow-tasks'

// Mock initial data
const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Implementar autenticação',
    description: 'Desenvolver sistema de login e registro de usuários',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2025-01-20',
    createdAt: '2025-01-10T10:00:00Z',
    updatedAt: '2025-01-10T10:00:00Z',
  },
  {
    id: '2',
    title: 'Criar testes unitários',
    description: 'Escrever testes para os componentes principais',
    status: 'pending',
    priority: 'medium',
    dueDate: '2025-01-25',
    createdAt: '2025-01-10T11:00:00Z',
    updatedAt: '2025-01-10T11:00:00Z',
  },
  {
    id: '3',
    title: 'Otimizar performance',
    description: 'Melhorar o tempo de carregamento da aplicação',
    status: 'completed',
    priority: 'low',
    dueDate: '2025-01-15',
    createdAt: '2025-01-08T09:00:00Z',
    updatedAt: '2025-01-15T14:30:00Z',
  },
]

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : initialTasks
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  const addTask = (taskData: CreateTaskData) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      ...taskData,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    
    setTasks(prev => [newTask, ...prev])
  }

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? { ...task, ...updates, updatedAt: new Date().toISOString() }
          : task
      )
    )
  }

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id))
  }

  const updateTaskStatus = (id: string, status: TaskStatus) => {
    updateTask(id, { status })
  }

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
  }
}
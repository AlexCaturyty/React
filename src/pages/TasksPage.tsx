import { useState, useMemo } from 'react'
import { TaskList } from '../components/Tasks/TaskList'
import { TaskForm } from '../components/Tasks/TaskForm'
import { TaskFilters } from '../components/Tasks/TaskFilters'
import { TaskStats } from '../components/Tasks/TaskStats'
import { useTasks } from '../hooks/useTasks'
import { Plus } from 'lucide-react'
import type { TaskStatus, TaskPriority } from '../types/task'

export function TasksPage() {
  const { tasks, addTask, updateTask, deleteTask } = useTasks()
  const [showForm, setShowForm] = useState(false)
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all')
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | 'all'>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesStatus = statusFilter === 'all' || task.status === statusFilter
      const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           task.description.toLowerCase().includes(searchTerm.toLowerCase())
      
      return matchesStatus && matchesPriority && matchesSearch
    })
  }, [tasks, statusFilter, priorityFilter, searchTerm])

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900">
            Gerenciamento de Tarefas
          </h1>
          <p className="text-secondary-600 mt-2">
            Organize e acompanhe suas tarefas de forma eficiente
          </p>
        </div>
        
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary px-6 py-3 group"
        >
          <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-200" />
          Nova Tarefa
        </button>
      </div>

      {/* Stats */}
      <TaskStats tasks={tasks} />

      {/* Filters */}
      <TaskFilters
        statusFilter={statusFilter}
        priorityFilter={priorityFilter}
        searchTerm={searchTerm}
        onStatusFilterChange={setStatusFilter}
        onPriorityFilterChange={setPriorityFilter}
        onSearchTermChange={setSearchTerm}
      />

      {/* Task List */}
      <TaskList
        tasks={filteredTasks}
        onUpdateTask={updateTask}
        onDeleteTask={deleteTask}
      />

      {/* Task Form Modal */}
      {showForm && (
        <TaskForm
          onSubmit={(taskData) => {
            addTask(taskData)
            setShowForm(false)
          }}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  )
}
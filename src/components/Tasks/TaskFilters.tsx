import { Search, Filter } from 'lucide-react'
import type { TaskStatus, TaskPriority } from '../../types/task'

interface TaskFiltersProps {
  statusFilter: TaskStatus | 'all'
  priorityFilter: TaskPriority | 'all'
  searchTerm: string
  onStatusFilterChange: (status: TaskStatus | 'all') => void
  onPriorityFilterChange: (priority: TaskPriority | 'all') => void
  onSearchTermChange: (term: string) => void
}

export function TaskFilters({
  statusFilter,
  priorityFilter,
  searchTerm,
  onStatusFilterChange,
  onPriorityFilterChange,
  onSearchTermChange,
}: TaskFiltersProps) {
  return (
    <div className="card space-y-4">
      <div className="flex items-center gap-2 text-lg font-semibold text-secondary-900">
        <Filter className="w-5 h-5" />
        Filtros
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-secondary-500" />
          <input
            type="text"
            placeholder="Buscar tarefas..."
            value={searchTerm}
            onChange={(e) => onSearchTermChange(e.target.value)}
            className="input pl-10"
          />
        </div>

        {/* Status Filter */}
        <div>
          <label className="label">Status</label>
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value as TaskStatus | 'all')}
            className="input"
          >
            <option value="all">Todos</option>
            <option value="pending">Pendente</option>
            <option value="in-progress">Em Progresso</option>
            <option value="completed">Concluída</option>
          </select>
        </div>

        {/* Priority Filter */}
        <div>
          <label className="label">Prioridade</label>
          <select
            value={priorityFilter}
            onChange={(e) => onPriorityFilterChange(e.target.value as TaskPriority | 'all')}
            className="input"
          >
            <option value="all">Todas</option>
            <option value="low">Baixa</option>
            <option value="medium">Média</option>
            <option value="high">Alta</option>
          </select>
        </div>
      </div>
    </div>
  )
}
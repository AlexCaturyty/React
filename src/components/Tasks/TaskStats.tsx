import { CheckCircle, Clock, AlertCircle, TrendingUp } from 'lucide-react'
import type { Task } from '../../types/task'

interface TaskStatsProps {
  tasks: Task[]
}

export function TaskStats({ tasks }: TaskStatsProps) {
  const stats = {
    total: tasks.length,
    completed: tasks.filter(task => task.status === 'completed').length,
    inProgress: tasks.filter(task => task.status === 'in-progress').length,
    pending: tasks.filter(task => task.status === 'pending').length,
    overdue: tasks.filter(task => 
      new Date(task.dueDate) < new Date() && task.status !== 'completed'
    ).length,
  }

  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0

  const statCards = [
    {
      title: 'Total',
      value: stats.total,
      icon: TrendingUp,
      color: 'text-primary-600',
      bgColor: 'bg-primary-100',
    },
    {
      title: 'Concluídas',
      value: stats.completed,
      icon: CheckCircle,
      color: 'text-success-600',
      bgColor: 'bg-success-100',
    },
    {
      title: 'Em Progresso',
      value: stats.inProgress,
      icon: Clock,
      color: 'text-warning-600',
      bgColor: 'bg-warning-100',
    },
    {
      title: 'Atrasadas',
      value: stats.overdue,
      icon: AlertCircle,
      color: 'text-error-600',
      bgColor: 'bg-error-100',
    },
  ]

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.title} className="card text-center hover:shadow-md transition-shadow">
              <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="text-2xl font-bold text-secondary-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-secondary-600">
                {stat.title}
              </div>
            </div>
          )
        })}
      </div>

      {/* Progress Bar */}
      <div className="card">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-secondary-700">
            Taxa de Conclusão
          </span>
          <span className="text-sm font-bold text-primary-600">
            {completionRate}%
          </span>
        </div>
        <div className="w-full bg-secondary-200 rounded-full h-2">
          <div
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>
    </div>
  )
}
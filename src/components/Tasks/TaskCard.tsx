import { useState } from 'react'
import { Calendar, Clock, Edit3, Trash2, Check, X } from 'lucide-react'
import { clsx } from 'clsx'
import type { Task, TaskStatus, TaskPriority } from '../../types/task'

interface TaskCardProps {
  task: Task
  onUpdate: (id: string, updates: Partial<Task>) => void
  onDelete: (id: string) => void
}

const statusConfig = {
  pending: {
    label: 'Pendente',
    color: 'bg-warning-100 text-warning-800',
    icon: Clock,
  },
  'in-progress': {
    label: 'Em Progresso',
    color: 'bg-primary-100 text-primary-800',
    icon: Clock,
  },
  completed: {
    label: 'Concluída',
    color: 'bg-success-100 text-success-800',
    icon: Check,
  },
}

const priorityConfig = {
  low: {
    label: 'Baixa',
    color: 'border-l-secondary-400',
  },
  medium: {
    label: 'Média',
    color: 'border-l-warning-400',
  },
  high: {
    label: 'Alta',
    color: 'border-l-error-400',
  },
}

export function TaskCard({ task, onUpdate, onDelete }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority,
    dueDate: task.dueDate,
  })

  const statusInfo = statusConfig[task.status]
  const priorityInfo = priorityConfig[task.priority]
  const StatusIcon = statusInfo.icon

  const handleSave = () => {
    onUpdate(task.id, editData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData({
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate,
    })
    setIsEditing(false)
  }

  const handleStatusChange = (status: TaskStatus) => {
    onUpdate(task.id, { status })
  }

  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'completed'

  return (
    <div className={clsx(
      'card border-l-4 hover:shadow-md transition-all duration-200',
      priorityInfo.color,
      isOverdue && 'bg-error-50 border-error-200'
    )}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {isEditing ? (
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  className="input text-lg font-semibold"
                />
              ) : (
                <h3 className={clsx(
                  'text-lg font-semibold',
                  task.status === 'completed' ? 'line-through text-secondary-500' : 'text-secondary-900'
                )}>
                  {task.title}
                </h3>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <span className={clsx(
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                statusInfo.color
              )}>
                <StatusIcon className="w-3 h-3 mr-1" />
                {statusInfo.label}
              </span>
              
              <span className={clsx(
                'px-2 py-1 text-xs font-medium rounded',
                priorityInfo.color.includes('error') ? 'bg-error-100 text-error-800' :
                priorityInfo.color.includes('warning') ? 'bg-warning-100 text-warning-800' :
                'bg-secondary-100 text-secondary-800'
              )}>
                {priorityInfo.label}
              </span>
            </div>
          </div>

          {/* Description */}
          {isEditing ? (
            <textarea
              value={editData.description}
              onChange={(e) => setEditData({ ...editData, description: e.target.value })}
              className="input h-20 resize-none"
            />
          ) : (
            <p className={clsx(
              'text-secondary-600',
              task.status === 'completed' && 'line-through'
            )}>
              {task.description}
            </p>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-secondary-500">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {isEditing ? (
                  <input
                    type="date"
                    value={editData.dueDate}
                    onChange={(e) => setEditData({ ...editData, dueDate: e.target.value })}
                    className="input text-sm py-1"
                  />
                ) : (
                  <span className={clsx(isOverdue && 'text-error-600 font-medium')}>
                    {new Date(task.dueDate).toLocaleDateString('pt-BR')}
                  </span>
                )}
              </div>
              
              {isEditing && (
                <select
                  value={editData.priority}
                  onChange={(e) => setEditData({ ...editData, priority: e.target.value as TaskPriority })}
                  className="input text-sm py-1"
                >
                  <option value="low">Baixa</option>
                  <option value="medium">Média</option>
                  <option value="high">Alta</option>
                </select>
              )}
            </div>

            <div className="flex items-center gap-2">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="p-2 text-success-600 hover:bg-success-100 rounded-lg transition-colors"
                    title="Salvar"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleCancel}
                    className="p-2 text-secondary-600 hover:bg-secondary-100 rounded-lg transition-colors"
                    title="Cancelar"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <>
                  {task.status !== 'completed' && (
                    <select
                      value={task.status}
                      onChange={(e) => handleStatusChange(e.target.value as TaskStatus)}
                      className="text-sm border border-secondary-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="pending">Pendente</option>
                      <option value="in-progress">Em Progresso</option>
                      <option value="completed">Concluída</option>
                    </select>
                  )}
                  
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-2 text-primary-600 hover:bg-primary-100 rounded-lg transition-colors"
                    title="Editar"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => onDelete(task.id)}
                    className="p-2 text-error-600 hover:bg-error-100 rounded-lg transition-colors"
                    title="Excluir"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
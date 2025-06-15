import { useState } from 'react'
import { X } from 'lucide-react'
import type { CreateTaskData, TaskPriority } from '../../types/task'

interface TaskFormProps {
  onSubmit: (data: CreateTaskData) => void
  onCancel: () => void
}

export function TaskForm({ onSubmit, onCancel }: TaskFormProps) {
  const [formData, setFormData] = useState<CreateTaskData>({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: new Date().toISOString().split('T')[0],
  })

  const [errors, setErrors] = useState<Partial<CreateTaskData>>({})

  const validate = () => {
    const newErrors: Partial<CreateTaskData> = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'Título é obrigatório'
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Descrição é obrigatória'
    }
    
    if (!formData.dueDate) {
      newErrors.dueDate = 'Data de vencimento é obrigatória'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validate()) {
      onSubmit(formData)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-secondary-200">
          <h2 className="text-xl font-semibold text-secondary-900">
            Nova Tarefa
          </h2>
          <button
            onClick={onCancel}
            className="p-2 text-secondary-500 hover:text-secondary-700 hover:bg-secondary-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="label">
              Título *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className={`input ${errors.title ? 'border-error-500 focus:ring-error-500' : ''}`}
              placeholder="Digite o título da tarefa"
            />
            {errors.title && (
              <p className="text-error-600 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="label">
              Descrição *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className={`input h-24 resize-none ${errors.description ? 'border-error-500 focus:ring-error-500' : ''}`}
              placeholder="Descreva a tarefa em detalhes"
            />
            {errors.description && (
              <p className="text-error-600 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          <div>
            <label className="label">
              Prioridade
            </label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value as TaskPriority })}
              className="input"
            >
              <option value="low">Baixa</option>
              <option value="medium">Média</option>
              <option value="high">Alta</option>
            </select>
          </div>

          <div>
            <label className="label">
              Data de Vencimento *
            </label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              className={`input ${errors.dueDate ? 'border-error-500 focus:ring-error-500' : ''}`}
              min={new Date().toISOString().split('T')[0]}
            />
            {errors.dueDate && (
              <p className="text-error-600 text-sm mt-1">{errors.dueDate}</p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="btn-primary flex-1"
            >
              Criar Tarefa
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="btn-secondary flex-1"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
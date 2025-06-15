import { CheckSquare, Plus } from 'lucide-react'

export function EmptyState() {
  return (
    <div className="text-center py-12 space-y-6">
      <div className="w-24 h-24 bg-secondary-100 rounded-full flex items-center justify-center mx-auto">
        <CheckSquare className="w-12 h-12 text-secondary-400" />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-secondary-900">
          Nenhuma tarefa encontrada
        </h3>
        <p className="text-secondary-600 max-w-md mx-auto">
          Não há tarefas que correspondam aos filtros selecionados. 
          Tente ajustar os filtros ou criar uma nova tarefa.
        </p>
      </div>
      
      <div className="flex justify-center">
        <button className="btn-primary px-6 py-3 group">
          <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-200" />
          Criar Nova Tarefa
        </button>
      </div>
    </div>
  )
}
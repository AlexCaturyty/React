import { TaskCard } from './TaskCard'
import { EmptyState } from './EmptyState'
import type { Task } from '../../types/task'

interface TaskListProps {
  tasks: Task[]
  onUpdateTask: (id: string, updates: Partial<Task>) => void
  onDeleteTask: (id: string) => void
}

export function TaskList({ tasks, onUpdateTask, onDeleteTask }: TaskListProps) {
  if (tasks.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-secondary-900">
        Tarefas ({tasks.length})
      </h2>
      
      <div className="grid gap-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onUpdate={onUpdateTask}
            onDelete={onDeleteTask}
          />
        ))}
      </div>
    </div>
  )
}
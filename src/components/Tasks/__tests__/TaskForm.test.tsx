import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TaskForm } from '../TaskForm'

const mockOnSubmit = vi.fn()
const mockOnCancel = vi.fn()

describe('TaskForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders form fields correctly', () => {
    render(<TaskForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />)

    expect(screen.getByLabelText(/título/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/descrição/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/prioridade/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/data de vencimento/i)).toBeInTheDocument()
  })

  it('shows validation errors for empty required fields', async () => {
    const user = userEvent.setup()
    render(<TaskForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />)

    const submitButton = screen.getByText('Criar Tarefa')
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Título é obrigatório')).toBeInTheDocument()
      expect(screen.getByText('Descrição é obrigatória')).toBeInTheDocument()
    })

    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('submits form with valid data', async () => {
    const user = userEvent.setup()
    render(<TaskForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />)

    await user.type(screen.getByLabelText(/título/i), 'Test Task')
    await user.type(screen.getByLabelText(/descrição/i), 'Test Description')
    await user.selectOptions(screen.getByLabelText(/prioridade/i), 'high')
    await user.type(screen.getByLabelText(/data de vencimento/i), '2025-01-20')

    const submitButton = screen.getByText('Criar Tarefa')
    await user.click(submitButton)

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        title: 'Test Task',
        description: 'Test Description',
        priority: 'high',
        dueDate: '2025-01-20',
      })
    })
  })

  it('calls onCancel when cancel button is clicked', async () => {
    const user = userEvent.setup()
    render(<TaskForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />)

    const cancelButton = screen.getByText('Cancelar')
    await user.click(cancelButton)

    expect(mockOnCancel).toHaveBeenCalled()
  })
})
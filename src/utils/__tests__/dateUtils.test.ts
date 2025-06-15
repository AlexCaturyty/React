import { formatDate, formatDateTime, isOverdue, getDaysUntilDue } from '../dateUtils'

describe('dateUtils', () => {
  describe('formatDate', () => {
    it('formats date string correctly', () => {
      const result = formatDate('2025-01-15')
      expect(result).toBe('15/01/2025')
    })

    it('formats Date object correctly', () => {
      const date = new Date('2025-01-15')
      const result = formatDate(date)
      expect(result).toBe('15/01/2025')
    })
  })

  describe('isOverdue', () => {
    it('returns true for overdue pending task', () => {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      const result = isOverdue(yesterday.toISOString(), 'pending')
      expect(result).toBe(true)
    })

    it('returns false for completed task even if overdue', () => {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      const result = isOverdue(yesterday.toISOString(), 'completed')
      expect(result).toBe(false)
    })

    it('returns false for future due date', () => {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      const result = isOverdue(tomorrow.toISOString(), 'pending')
      expect(result).toBe(false)
    })
  })

  describe('getDaysUntilDue', () => {
    it('returns positive number for future date', () => {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      const result = getDaysUntilDue(tomorrow.toISOString())
      expect(result).toBe(1)
    })

    it('returns negative number for past date', () => {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      const result = getDaysUntilDue(yesterday.toISOString())
      expect(result).toBe(-1)
    })
  })
})
export interface Profile {
  id: string
  name: string
  email: string
  role: string
  bio: string
  location: string
  birthDate: string
  avatar?: string
  stats: {
    tasksCompleted: number
    projectsActive: number
    hoursWorked: number
    achievementsUnlocked: number
  }
}
import { useState, useEffect } from 'react'
import type { Profile } from '../types/profile'

const STORAGE_KEY = 'taskflow-profile'

const initialProfile: Profile = {
  id: '1',
  name: 'Alex',
  email: 'joao.silva@email.com',
  role: 'Desenvolvedor Frontend',
  bio: 'Desenvolvedor apaixonado por tecnologia. Sempre em busca de novos desafios e oportunidades de aprendizado.',
  location: 'RECIFE - PE',
  birthDate: '12-03-2004',
  stats: {
    tasksCompleted: 127,
    projectsActive: 8,
    hoursWorked: 340,
    achievementsUnlocked: 15,
  },
}

export function useProfile() {
  const [profile, setProfile] = useState<Profile>(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : initialProfile
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
  }, [profile])

  const updateProfile = (updates: Partial<Profile>) => {
    setProfile(prev => ({ ...prev, ...updates }))
  }

  return {
    profile,
    updateProfile,
  }
}
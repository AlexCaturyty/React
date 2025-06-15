import { useState } from 'react'
import { User, Mail, Calendar, MapPin, Edit3, Save, X } from 'lucide-react'
import { useProfile } from '../hooks/useProfile'

export function ProfilePage() {
  const { profile, updateProfile } = useProfile()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(profile)

  const handleSave = () => {
    updateProfile(formData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData(profile)
    setIsEditing(false)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-secondary-900">
          Perfil do Usuário
        </h1>
        <p className="text-secondary-600">
          Gerencie suas informações pessoais e preferências
        </p>
      </div>

      {/* Profile Card */}
      <div className="card space-y-8">
        {/* Avatar and Basic Info */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
              {profile.name.charAt(0).toUpperCase()}
            </div>
            {isEditing && (
              <button className="absolute bottom-0 right-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors">
                <Edit3 className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex-1 text-center md:text-left space-y-4">
            <div>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input text-2xl font-bold text-center md:text-left"
                />
              ) : (
                <h2 className="text-2xl font-bold text-secondary-900">
                  {profile.name}
                </h2>
              )}
              
              {isEditing ? (
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="input mt-2"
                  placeholder="Cargo/Função"
                />
              ) : (
                <p className="text-primary-600 font-medium">
                  {profile.role}
                </p>
              )}
            </div>

            <div className="flex justify-center md:justify-start">
              {isEditing ? (
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="btn-success px-4 py-2"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Salvar
                  </button>
                  <button
                    onClick={handleCancel}
                    className="btn-secondary px-4 py-2"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancelar
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn-primary px-4 py-2"
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  Editar Perfil
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-secondary-900 flex items-center">
              <User className="w-5 h-5 mr-2 text-primary-600" />
              Informações Pessoais
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-secondary-500" />
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input flex-1"
                  />
                ) : (
                  <span className="text-secondary-700">{profile.email}</span>
                )}
              </div>
              
              <div className="flex items-center space-x-3">
                <Calendar className="w-4 h-4 text-secondary-500" />
                {isEditing ? (
                  <input
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                    className="input flex-1"
                  />
                ) : (
                  <span className="text-secondary-700">
                    {new Date(profile.birthDate).toLocaleDateString('pt-BR')}
                  </span>
                )}
              </div>
              
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-secondary-500" />
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="input flex-1"
                    placeholder="Localização"
                  />
                ) : (
                  <span className="text-secondary-700">{profile.location}</span>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-secondary-900">
              Sobre
            </h3>
            
            {isEditing ? (
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="input h-32 resize-none"
                placeholder="Conte um pouco sobre você..."
              />
            ) : (
              <p className="text-secondary-700 leading-relaxed">
                {profile.bio}
              </p>
            )}
          </div>
        </div>

        {/* Statistics */}
        <div className="border-t border-secondary-200 pt-6">
          <h3 className="text-lg font-semibold text-secondary-900 mb-4">
            Estatísticas
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-primary-50 rounded-lg">
              <div className="text-2xl font-bold text-primary-600">
                {profile.stats.tasksCompleted}
              </div>
              <div className="text-sm text-secondary-600">
                Tarefas Concluídas
              </div>
            </div>
            
            <div className="text-center p-4 bg-success-50 rounded-lg">
              <div className="text-2xl font-bold text-success-600">
                {profile.stats.projectsActive}
              </div>
              <div className="text-sm text-secondary-600">
                Projetos Ativos
              </div>
            </div>
            
            <div className="text-center p-4 bg-warning-50 rounded-lg">
              <div className="text-2xl font-bold text-warning-600">
                {profile.stats.hoursWorked}h
              </div>
              <div className="text-sm text-secondary-600">
                Horas Trabalhadas
              </div>
            </div>
            
            <div className="text-center p-4 bg-error-50 rounded-lg">
              <div className="text-2xl font-bold text-error-600">
                {profile.stats.achievementsUnlocked}
              </div>
              <div className="text-sm text-secondary-600">
                Conquistas
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
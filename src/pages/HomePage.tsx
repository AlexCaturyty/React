import { Link } from 'react-router-dom'
import { CheckSquare, Users, TrendingUp, Zap, ArrowRight } from 'lucide-react'

const features = [
  {
    icon: CheckSquare,
    title: 'Gerenciamento de Tarefas',
    description: 'Organize suas tarefas de forma eficiente com nossa interface intuitiva.',
    color: 'text-primary-600',
    bgColor: 'bg-primary-100',
  },
  {
    icon: Users,
    title: 'Colaboração em Equipe',
    description: 'Trabalhe em conjunto com sua equipe de forma sincronizada.',
    color: 'text-success-600',
    bgColor: 'bg-success-100',
  },
  {
    icon: TrendingUp,
    title: 'Acompanhamento de Progresso',
    description: 'Visualize o progresso das suas tarefas em tempo real.',
    color: 'text-warning-600',
    bgColor: 'bg-warning-100',
  },
  {
    icon: Zap,
    title: 'Performance Otimizada',
    description: 'Interface rápida e responsiva para máxima produtividade.',
    color: 'text-error-600',
    bgColor: 'bg-error-100',
  },
]

const stats = [
  { label: 'Tarefas Concluídas', value: '1,234' },
  { label: 'Usuários Ativos', value: '567' },
  { label: 'Projetos Ativos', value: '89' },
  { label: 'Taxa de Sucesso', value: '98%' },
]

export function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-8 py-12">
        <div className="space-y-4 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-secondary-900">
            Bem-vindo ao{' '}
            <span className="text-primary-600">TaskFlow</span>
          </h1>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto leading-relaxed">
            A solução completa para gerenciamento de tarefas e produtividade. 
            Organize, colabore e alcance seus objetivos de forma eficiente.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
          <Link
            to="/tasks"
            className="btn-primary px-8 py-3 text-lg group"
          >
            Começar Agora
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/profile"
            className="btn-secondary px-8 py-3 text-lg"
          >
            Ver Perfil
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="card text-center hover:shadow-md transition-shadow duration-300"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="text-3xl font-bold text-primary-600 mb-2">
              {stat.value}
            </div>
            <div className="text-sm text-secondary-600">
              {stat.label}
            </div>
          </div>
        ))}
      </section>

      {/* Features Section */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-secondary-900">
            Recursos Principais
          </h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Descubra as funcionalidades que tornam o TaskFlow a melhor escolha 
            para gerenciamento de tarefas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-secondary-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="card bg-gradient-to-r from-primary-600 to-primary-700 text-white text-center space-y-6">
        <h2 className="text-3xl font-bold">
          Pronto para aumentar sua produtividade?
        </h2>
        <p className="text-xl text-primary-100 max-w-2xl mx-auto">
          Junte-se a milhares de usuários que já transformaram sua forma de trabalhar 
          com o TaskFlow.
        </p>
        <Link
          to="/tasks"
          className="inline-flex items-center px-8 py-3 bg-white text-primary-600 rounded-lg font-medium hover:bg-primary-50 transition-colors duration-200 group"
        >
          Explorar Tarefas
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      </section>
    </div>
  )
}
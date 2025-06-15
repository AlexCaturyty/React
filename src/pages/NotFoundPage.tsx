import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'

export function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-9xl font-bold text-primary-600">404</h1>
          <h2 className="text-3xl font-bold text-secondary-900">
            Página não encontrada
          </h2>
          <p className="text-lg text-secondary-600 max-w-md mx-auto">
            A página que você está procurando não existe ou foi movida para outro local.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="btn-primary px-6 py-3 group"
          >
            <Home className="w-5 h-5 mr-2" />
            Voltar ao Início
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="btn-secondary px-6 py-3 group"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Página Anterior
          </button>
        </div>
      </div>
    </div>
  )
}
import { Heart } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-white border-t border-secondary-200 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 text-secondary-600">
            <span>Feito com</span>
            <Heart className="w-4 h-4 text-error-500 fill-current" />
            <span>para o desafio técnico</span>
          </div>
          
          <div className="text-sm text-secondary-500">
            © 2025 TaskFlow. Desenvolvido com React + TypeScript.
          </div>
        </div>
      </div>
    </footer>
  )
}
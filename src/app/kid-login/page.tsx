'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Gamepad2, User } from 'lucide-react'
import dynamic from 'next/dynamic'

const AnimatedComponent = dynamic(() => import('../../components/AnimatedComponent'), { ssr: false })

export default function KidLogin() {
  const [username, setUsername] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Bypass authentication and redirect to kid dashboard
    router.push('/kid-dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center p-4">
      <AnimatedComponent>
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
          <div className="w-24 h-24 bg-blue-500 rounded-full mx-auto mb-6 flex items-center justify-center">
            <Gamepad2 className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Kid Login</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <div className="relative">
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your username"
                />
                <User className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            <AnimatedComponent>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300 text-lg font-semibold"
              >
                Start Adventure!
              </button>
            </AnimatedComponent>
          </form>
          <div className="mt-6 text-center">
            <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
              Need help? Ask a parent!
            </a>
          </div>
        </div>
      </AnimatedComponent>
    </div>
  )
}
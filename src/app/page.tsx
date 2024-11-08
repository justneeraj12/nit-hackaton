import Link from 'next/link'
import dynamic from 'next/dynamic'

const AnimatedComponent = dynamic(() => import('../components/AnimatedComponent'), { ssr: false })

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-8">
        Welcome to KidScreen
      </h1>
      <div className="flex flex-col md:flex-row gap-6">
        <AnimatedComponent>
          <Link href="/parent-login">
            <a className="bg-white text-purple-600 px-8 py-4 rounded-lg shadow-lg hover:bg-purple-100 transition-colors duration-300 text-xl font-semibold">
              Parent Login
            </a>
          </Link>
        </AnimatedComponent>
        <AnimatedComponent>
          <Link href="/kid-login">
            <a className="bg-white text-blue-500 px-8 py-4 rounded-lg shadow-lg hover:bg-blue-100 transition-colors duration-300 text-xl font-semibold">
              Kid Login
            </a>
          </Link>
        </AnimatedComponent>
      </div>
    </div>
  )
}
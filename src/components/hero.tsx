import Link from "next/link"
import { Shield, FileText, AlertTriangle } from "lucide-react"

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-white flex-grow flex items-center min-h-screen">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-y-0 right-0 w-1/2 bg-gray-200 -skew-x-12 transform origin-top-right"></div>
      </div>

      <div className="container relative mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-8">
            <div className="inline-flex items-center rounded-full bg-black px-4 py-1.5 text-sm font-medium text-white ring-1 ring-inset ring-black/30 shadow-sm">
              <Shield className="mr-2 h-4 w-4" /> For testing purposes only
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Generate Realistic</span>
              <span className="block">Fake Identities</span>
            </h1>

            <p className="max-w-2xl text-xl text-gray-600">
              Create authentic-looking fake IDs, personal details, and identity documents for development, testing, and
              demonstration purposes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/fake-id"
                className="inline-flex items-center justify-center px-6 py-3 bg-black hover:bg-gray-900 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <FileText className="mr-2 h-5 w-5" />
                Generate Fake ID
              </Link>
            </div>

            <div className="flex items-center text-sm text-gray-700 font-medium bg-gray-100 px-4 py-2 rounded-lg border border-gray-200">
              <AlertTriangle className="mr-2 h-4 w-4 text-red-500" />
              For educational purposes only. Do not use for illegal activities.
            </div>
            <div className="flex items-center text-sm py-2">
              This was Inspired by the work of
              <a href="https://chris927.github.io/generate-sa-idnumbers/" target="_blank" rel="noopener noreferrer" className="text-blue-500 ml-1 underline">
                chris927
              </a>
            </div>
          </div>

          <div className="lg:col-span-4 hidden lg:flex items-center">
            <div className="relative h-full w-full">
              <div className="absolute inset-0 bg-gray-200/50 rounded-2xl transform rotate-3"></div>
              <div className="absolute inset-0 bg-white rounded-2xl shadow-xl border border-gray-200">
                <div className="p-6 h-full flex flex-col justify-center">
                  <div className="w-full h-32 bg-gray-900 rounded-lg mb-4"></div>
                  <div className="w-3/4 h-4 bg-gray-300 rounded mb-3"></div>
                  <div className="w-1/2 h-4 bg-gray-300 rounded mb-6"></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="h-10 bg-gray-200 rounded"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-100/50 to-transparent"></div>
    </div>
  )
}


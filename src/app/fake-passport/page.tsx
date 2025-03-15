import { FakePassportGenerator } from "./fake-passport"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export const metadata = {
  title: "Fake Passport Generator -  Fake world",
  description: "Access the Fake Passport Generator to create passport details for testing and educational purposes.",
  keywords: "fake passport, passport generator, testing, educational",
  author: "Paul Mothapo",
  canonical: "https://fakegenerator.vercel.app/fake-passport"
};

export default function FakePassportPage() {
  return (
    <main className="min-h-screen py-8 max-w-6xl mx-auto">
      <div className="px-4 mb-6">
        <Link 
          href="/" 
          className="inline-flex items-center text-neutral-700 hover:text-black font-medium"
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>
      </div>
      <FakePassportGenerator />
    </main>
  )
}

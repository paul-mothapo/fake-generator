import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { FakeIdGenerator } from "./fake-id"

export const metadata = {
  title: "Fake ID Generator - Fake world",
  description: "Access the Fake ID Generator to create South African ID numbers for testing and educational purposes.",
  keywords: "fake ID, South African ID, ID generator, testing, educational",
  author: "Paul Mothapo",
  canonical: "https://fakegenerator.vercel.app/fake-id"
};

export default function FakeIdPage() {
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
      <FakeIdGenerator />
    </main>
  )
}


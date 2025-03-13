import { FakeIdGenerator } from "./fake-id"

export const metadata = {
  title: "Fake ID Generator Page",
  description: "Access the Fake ID Generator to create South African ID numbers for testing and educational purposes.",
  keywords: "fake ID, South African ID, ID generator, testing, educational",
  author: "Your Name",
  canonical: "https://fakegenerator.vercel.app/fake-id"
};

export default function FakeIdPage() {
  return (
    <main className="min-h-screen py-8 max-w-6xl mx-auto">
      <FakeIdGenerator />
    </main>
  )
}


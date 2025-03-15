import { FakePassportGenerator } from "./fake-passport"

export const metadata = {
  title: "Fake Passport Generator Page",
  description: "Access the Fake Passport Generator to create passport details for testing and educational purposes.",
  keywords: "fake passport, passport generator, testing, educational",
  author: "Your Name",
  canonical: "https://fakegenerator.vercel.app/fake-passport"
};

export default function FakePassportPage() {
  return (
    <main className="min-h-screen py-8 max-w-6xl mx-auto">
      <FakePassportGenerator />
    </main>
  )
}

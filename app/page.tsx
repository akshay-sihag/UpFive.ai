import { Header } from "./components/header"
import { Footer } from "./components/footer"
import CoverLetterForm from "./components/cover-letter-form"
import { GradientBackground } from "./components/gradient-background"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-16">
        <div className="container px-1 py-12 md:py-20 lg:px-4">
          <div className="mx-auto mb-8 max-w-[980px] text-center">
            <div className="mb-8 inline-flex items-center rounded-full border bg-background/95 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
              Follow along on GitHub{" "}
              <Link href="https://github.com/akshay-sihag/UpFive.ai" className="ml-2 text-blue-600 hover:text-blue-700">
                Read more →
              </Link>
            </div>
            <h1 className="mb-4 text-5xl font-bold tracking-tight sm:text-6xl">
              Build stunning Cover letters for <span className="inline-block text-blue-600">Upwork</span> &{" "}
              <span className="inline-block text-green-600">Fiverr</span> with{" "}
              <span className="inline-block text-emerald-500">UpFive.ai</span>
            </h1>
            <p className="mx-auto mb-4 max-w-2xl text-lg text-muted-foreground">
              Create professional and personalized cover letters in seconds using advanced AI technology.
            </p>
          </div>
          <CoverLetterForm />
        </div>
      </main>
      <Footer />
      <GradientBackground />
    </div>
  )
}


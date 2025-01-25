"use client"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { AnimatedHamburger } from "./animated-hamburger"
import { useState } from "react"
import { MegaMenu } from "./mega-menu"
import { ThemeToggle } from "./theme-toggle"

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAboutOpen, setIsAboutOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild className="lg:hidden">
        <AnimatedHamburger isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      </SheetTrigger>
      <SheetContent side="left" className="w-[80%] p-0">
        <div className="flex h-full flex-col">
          <div className="border-b p-4">
            <button
              onClick={() => setIsAboutOpen(!isAboutOpen)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground inline-flex items-center gap-2"
            >
              <i className="far fa-user"></i>
              About the Developer
            </button>
            {isAboutOpen && (
              <div className="mt-4">
                <MegaMenu isOpen={true} onClose={() => {}} isMobile />
              </div>
            )}
          </div>
          <div className="flex items-center justify-between border-t p-4 mt-auto">
            <ThemeToggle />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}


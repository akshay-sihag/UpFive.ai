"use client"

import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"
import Image from "next/image"
import { useState, useEffect } from "react"
import { MegaMenu } from "./mega-menu"
import { cn } from "@/lib/utils"
import { MobileMenu } from "./mobile-menu"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen) {
        const target = event.target as HTMLElement
        if (!target.closest("[data-mega-menu]")) {
          setIsMenuOpen(false)
        }
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [isMenuOpen])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-200",
        isScrolled ? "bg-white/95 backdrop-blur-sm dark:bg-gray-950/95" : "bg-transparent",
      )}
    >
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/technology-isK0jOWXNZryCY4w2C4at9nWEon1qO.svg"
            alt="UpFive.ai Robot Logo"
            width={52}
            height={52}
            className="text-emerald-500 dark:text-white"
            priority
          />
          <span className="text-xl font-bold font-weight-700">UpFive.ai</span>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-sm font-medium text-muted-foreground hover:text-foreground inline-flex items-center gap-2"
          >
            <i className="far fa-user"></i>
            About the Developer
          </button>
        </nav>

        {/* Desktop Theme Toggle */}
        <div className="hidden lg:block">
          <ThemeToggle />
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <MobileMenu />
        </div>
      </div>
      <MegaMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  )
}


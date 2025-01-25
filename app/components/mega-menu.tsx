"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { MapPin, Globe, LinkIcon, Mail } from "lucide-react"

interface MegaMenuProps {
  isOpen: boolean
  onClose: () => void
  isMobile?: boolean
}

export function MegaMenu({ isOpen, onClose, isMobile = false }: MegaMenuProps) {
  if (!isOpen) return null

  const Content = () => (
    <div className="flex flex-col items-center gap-6">
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/akshaysihag.jpg-BSHzUdxiKZ6wj1wbQRfWyMB60HwWzQ.jpeg"
        alt="Akshay Sihag"
        width={120}
        height={120}
        className="rounded-full"
      />
      <div className="text-center">
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Akshay Sihag</h3>
        <p className="mt-1 text-gray-500 dark:text-gray-400">Full Stack Web Developer Building Websites & Web Apps</p>

        <div className="mt-4 flex items-center justify-center gap-2 text-gray-600 dark:text-gray-300">
          <MapPin className="h-4 w-4" />
          Haryana, India
        </div>

        <div className="mt-2 flex items-center justify-center gap-2 text-gray-600 dark:text-gray-300">
          <Globe className="h-4 w-4" />
          English • Hindi
        </div>

        <div className="mt-2 flex items-center justify-center gap-2 text-gray-600 dark:text-gray-300">
          <Mail className="h-4 w-4" />
          <a href="mailto:akshay@devgraphix.com" className="hover:text-gray-900 dark:hover:text-white">
            akshay@devgraphix.com
          </a>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <Link
            href="https://www.linkedin.com/in/akshaysihag/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <i className="fab fa-linkedin text-xl"></i>
          </Link>
          <Link
            href="https://github.com/akshay-sihag"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <i className="fab fa-github text-xl"></i>
          </Link>
          <Link
            href="https://twitter.com/iamakshaysihag"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <i className="fab fa-x-twitter text-xl"></i>
          </Link>
          <Link
            href="https://www.instagram.com/akshay__sihag"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <i className="fab fa-instagram text-xl"></i>
          </Link>
        </div>
      </div>
    </div>
  )

  if (isMobile) {
    return (
      <div className="p-4 bg-white dark:bg-gray-900 rounded-lg">
        <Content />
      </div>
    )
  }

  return (
    <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 transform hidden lg:block" data-mega-menu>
      <div className="w-[400px]">
        <div className="overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-gray-800">
          <div className="p-8">
            <Content />
          </div>
        </div>
      </div>
    </div>
  )
}


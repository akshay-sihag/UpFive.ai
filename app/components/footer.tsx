"use client"

import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur-sm">
      <div className="container flex flex-col items-center gap-4 py-8 md:flex-row md:justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Built by{" "}
            <a
              href="https://github.com/akshay-sihag/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:text-foreground"
            >
              Akshay Sihag
            </a>
            . The source code is available on{" "}
            <a
              href="https://github.com/akshay-sihag/UpFive.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:text-foreground"
            >
              GitHub
            </a>
            .
          </span>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="h-9 bg-[#AA5F37] hover:bg-[#8B4513] text-white border-0"
          >
            <a
              href="https://github.com/sponsors/akshay-sihag"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              <i className="fa-solid fa-mug-hot"></i>
              Buy me a Coffee
            </a>
          </Button>
        </div>
      </div>
    </footer>
  )
}


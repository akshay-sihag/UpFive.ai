"use client"

interface AnimatedHamburgerProps {
  isOpen: boolean
  onClick: () => void
}

export function AnimatedHamburger({ isOpen, onClick }: AnimatedHamburgerProps) {
  return (
    <button className="relative h-10 w-10 text-gray-600 dark:text-gray-300" onClick={onClick}>
      <span className="sr-only">Toggle menu</span>
      <div className="absolute left-1/2 top-1/2 block w-5 -translate-x-1/2 -translate-y-1/2">
        <span
          className={`absolute block h-0.5 w-5 transform bg-current transition duration-500 ease-in-out ${
            isOpen ? "rotate-45" : "-translate-y-1.5"
          }`}
        />
        <span
          className={`absolute block h-0.5 w-5 transform bg-current transition duration-500 ease-in-out ${
            isOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`absolute block h-0.5 w-5 transform bg-current transition duration-500 ease-in-out ${
            isOpen ? "-rotate-45" : "translate-y-1.5"
          }`}
        />
      </div>
    </button>
  )
}


export function GradientBackground() {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-purple-100 to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-950" />
    </div>
  )
}


"use client"

interface ProgressStepsProps {
  currentStep: number
  totalSteps: number
}

const steps = [
  {
    icon: "fa-regular fa-user",
    title: "Personal Details",
    step: "1/3",
  },
  {
    icon: "fa-solid fa-code",
    title: "Skills & Portfolio",
    step: "2/3",
  },
  {
    icon: "fa-solid fa-sliders",
    title: "Letter Preferences",
    step: "3/3",
  },
]

export function ProgressSteps({ currentStep }: ProgressStepsProps) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-lg border dark:border-gray-800">
      {steps.map((step, index) => {
        const isActive = index + 1 === currentStep

        return (
          <div key={index} className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all
                ${isActive ? "bg-purple-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500"}
              `}
            >
              <i className={`${step.icon} ${isActive ? "text-lg" : "text-base"}`} />
            </div>
            {isActive && (
              <div className="flex flex-col">
                <span className="text-sm text-purple-600 dark:text-purple-400">Step {step.step}</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">{step.title}</span>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}


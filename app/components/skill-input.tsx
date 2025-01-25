"use client"

import { useState, type KeyboardEvent } from "react"
import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

interface SkillInputProps {
  skills: string[]
  onChange: (skills: string[]) => void
}

export function SkillInput({ skills, onChange }: SkillInputProps) {
  const [inputValue, setInputValue] = useState("")

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Handle both regular Enter and mobile keyboard Enter (which might send "Enter" or "Done")
    if (e.key === "Enter" || e.key === "," || e.key === "Done") {
      e.preventDefault()
      addNewSkill()
    }
  }

  const addNewSkill = () => {
    const newSkill = inputValue.trim()
    if (newSkill && !skills.includes(newSkill)) {
      onChange([...skills, newSkill])
      setInputValue("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    onChange(skills.filter((skill) => skill !== skillToRemove))
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 p-2 min-h-[2.5rem] bg-background rounded-md border">
        {skills.map((skill) => (
          <Badge
            key={skill}
            variant="secondary"
            className="flex items-center gap-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white"
          >
            {skill}
            <X
              className="h-3 w-3 cursor-pointer hover:text-red-300 transition-colors"
              onClick={() => removeSkill(skill)}
            />
          </Badge>
        ))}
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            if (inputValue.trim()) {
              addNewSkill()
            }
          }}
          className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="Type and press Enter to add skills..."
        />
      </div>
    </div>
  )
}


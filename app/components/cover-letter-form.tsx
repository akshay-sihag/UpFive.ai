"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { User, Briefcase, FileText, Link2, Sparkles, ArrowRight, ArrowLeft, Code2 } from "lucide-react"
import { generateCoverLetter } from "../actions/generate"
import type { UserInfo, ResponseType, CoverLetterLength, ToneType } from "@/types/form"
import { SkillInput } from "./skill-input"
import { AiButton } from "./ai-button"
import { ProgressSteps } from "./progress-steps"

const TONES: ToneType[] = [
  "appreciative",
  "assertive",
  "awestruck",
  "candid",
  "casual",
  "cautionary",
  "compassionate",
  "convincing",
  "critical",
  "earnest",
  "enthusiastic",
  "formal",
  "funny",
  "humble",
  "humorous",
  "informative",
  "inspirational",
  "joyful",
  "passionate",
  "thoughtful",
  "urgent",
  "worried",
]

export default function CoverLetterForm() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [formData, setFormData] = useState<UserInfo>({
    name: "",
    clientName: "",
    jobDescription: "",
    skills: [],
    portfolioLinks: [],
    includePortfolio: false,
    cvUrl: "",
    responseType: "advanced",
    tone: "convincing",
    length: "medium",
  })
  const [validationErrors, setValidationErrors] = useState<string[]>([])

  const validateStep = (currentStep: number) => {
    const errors: string[] = []

    switch (currentStep) {
      case 1:
        if (!formData.name.trim()) errors.push("Name is required")
        if (!formData.jobDescription.trim()) errors.push("Job description is required")
        break
      case 2:
        if (formData.skills.length === 0) errors.push("At least one skill is required")
        if (formData.includePortfolio && formData.portfolioLinks.length === 0) {
          errors.push("Portfolio links are required when 'Include Portfolio' is checked")
        }
        break
      case 3:
        if (!formData.responseType) errors.push("Response type is required")
        if (!formData.tone) errors.push("Tone is required")
        if (!formData.length) errors.push("Length is required")
        break
    }

    setValidationErrors(errors)
    return errors.length === 0
  }

  const handleNextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1)
      setValidationErrors([])
    }
  }

  const handleSubmit = async () => {
    if (!validateStep(3)) return

    try {
      setLoading(true)
      setError("")
      setResult("")

      const response = await generateCoverLetter(formData)

      if (!response.success) {
        setError(response.error || "Failed to generate cover letter")
        return
      }

      if (response.coverLetter) {
        setResult(response.coverLetter)
      } else {
        setError("No cover letter was generated")
      }
    } catch (err) {
      setError("An unexpected error occurred")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const updateFormData = (field: keyof UserInfo, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="mx-auto max-w-3xl px-1 sm:px-2 lg:px-4">
      <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-950/80 border-0 shadow-lg">
        <CardContent className="pt-6">
          <ProgressSteps currentStep={step} totalSteps={3} />
          <h2 className="text-2xl font-semibold mt-8 mb-8">
            {step === 1 && "Personal Details"}
            {step === 2 && "Skills & Portfolio"}
            {step === 3 && "Letter Preferences"}
          </h2>
          <div className="mt-8 space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {validationErrors.length > 0 && (
              <Alert variant="destructive">
                <AlertDescription>
                  <ul className="list-disc pl-4">
                    {validationErrors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="flex items-center gap-2 mb-2">
                    <User className="h-4 w-4" />
                    Your Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => updateFormData("name", e.target.value)}
                    placeholder="John Doe"
                    className="w-full bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800"
                    required
                    aria-required="true"
                  />
                </div>
                <div>
                  <Label htmlFor="clientName" className="flex items-center gap-2 mb-2">
                    <Briefcase className="h-4 w-4" />
                    Client's Name (Optional)
                  </Label>
                  <Input
                    id="clientName"
                    value={formData.clientName}
                    onChange={(e) => updateFormData("clientName", e.target.value)}
                    placeholder="Jane Smith"
                    className="w-full bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800"
                  />
                </div>
                <div>
                  <Label htmlFor="jobDescription" className="flex items-center gap-2 mb-2">
                    <FileText className="h-4 w-4" />
                    Job Description <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="jobDescription"
                    value={formData.jobDescription}
                    onChange={(e) => updateFormData("jobDescription", e.target.value)}
                    placeholder="Paste the job description here..."
                    rows={5}
                    className="w-full bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800"
                    required
                    aria-required="true"
                  />
                </div>
                <Button
                  onClick={handleNextStep}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <Label className="flex items-center gap-2 mb-2">
                    <Code2 className="h-4 w-4" />
                    Skills <span className="text-red-500">*</span>
                  </Label>
                  <SkillInput
                    skills={formData.skills}
                    onChange={(skills) => updateFormData("skills", skills)}
                    required
                    aria-required="true"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="includePortfolio"
                      checked={formData.includePortfolio}
                      onCheckedChange={(checked) => updateFormData("includePortfolio", checked)}
                    />
                    <Label htmlFor="includePortfolio">Include Portfolio Links</Label>
                  </div>
                  {formData.includePortfolio && (
                    <div>
                      <Label htmlFor="portfolioLinks" className="flex items-center gap-2 mb-2">
                        <Link2 className="h-4 w-4" />
                        Portfolio Links
                      </Label>
                      <Textarea
                        id="portfolioLinks"
                        value={formData.portfolioLinks.join("\n")}
                        onChange={(e) => {
                          const links = e.target.value.split("\n")
                          updateFormData("portfolioLinks", links)
                        }}
                        placeholder="Add your portfolio links (one per line)"
                        rows={3}
                        className="w-full bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800"
                      />
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1 border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button
                    onClick={handleNextStep}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                  >
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cvUrl" className="flex items-center gap-2 mb-2">
                    <FileText className="h-4 w-4" />
                    CV URL (Optional)
                  </Label>
                  <Input
                    id="cvUrl"
                    value={formData.cvUrl}
                    onChange={(e) => updateFormData("cvUrl", e.target.value)}
                    placeholder="https://drive.google.com/your-cv"
                    className="w-full bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800"
                  />
                </div>
                <div>
                  <Label className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4" />
                    Response Type <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.responseType}
                    onValueChange={(value: ResponseType) => updateFormData("responseType", value)}
                    required
                  >
                    <SelectTrigger className="w-full bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800">
                      <SelectValue placeholder="Select response type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-950">
                      <SelectItem value="rookie">Rookie (Simple Language)</SelectItem>
                      <SelectItem value="advanced">Advanced (Professional)</SelectItem>
                      <SelectItem value="pro">Pro (Advanced Vocabulary)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4" />
                    Tone <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.tone}
                    onValueChange={(value: ToneType) => updateFormData("tone", value)}
                    required
                  >
                    <SelectTrigger className="w-full bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800">
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-950">
                      {TONES.map((tone) => (
                        <SelectItem key={tone} value={tone}>
                          {tone.charAt(0).toUpperCase() + tone.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4" />
                    Length <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.length}
                    onValueChange={(value: CoverLetterLength) => updateFormData("length", value)}
                    required
                  >
                    <SelectTrigger className="w-full bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800">
                      <SelectValue placeholder="Select length" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-950">
                      <SelectItem value="small">Small Brief</SelectItem>
                      <SelectItem value="medium">Medium Letter</SelectItem>
                      <SelectItem value="large">Large Cover Letter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button
                    variant="outline"
                    onClick={() => setStep(2)}
                    className="w-full sm:flex-1 border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <AiButton
                    onClick={handleSubmit}
                    loading={loading}
                    className="w-full sm:flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                  >
                    <Sparkles className="h-4 w-4" />
                    {loading ? "Generating..." : "Generate Cover Letter"}
                  </AiButton>
                </div>
              </div>
            )}

            {result && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Your Cover Letter:
                </h3>
                <div className="whitespace-pre-wrap p-4 bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800">
                  {result}
                </div>
                <Button
                  className="mt-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                  onClick={() => navigator.clipboard.writeText(result)}
                >
                  Copy to Clipboard
                </Button>
              </div>
            )}
          </div>
          <p className="text-xs text-gray-400 text-center mt-4">*UpFive.ai can make mistakes</p>
        </CardContent>
      </Card>
    </div>
  )
}


export type ResponseType = "rookie" | "advanced" | "pro"
export type CoverLetterLength = "small" | "medium" | "large"
export type ToneType =
  | "appreciative"
  | "assertive"
  | "awestruck"
  | "candid"
  | "casual"
  | "cautionary"
  | "compassionate"
  | "convincing"
  | "critical"
  | "earnest"
  | "enthusiastic"
  | "formal"
  | "funny"
  | "humble"
  | "humorous"
  | "informative"
  | "inspirational"
  | "joyful"
  | "passionate"
  | "thoughtful"
  | "urgent"
  | "worried"

export interface UserInfo {
  name: string
  clientName?: string
  jobDescription: string
  skills: string[]
  portfolioLinks: string[]
  includePortfolio: boolean
  cvUrl?: string
  responseType: ResponseType
  tone: ToneType
  length: CoverLetterLength
}


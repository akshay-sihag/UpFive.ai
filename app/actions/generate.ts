"use server"

import { GoogleGenerativeAI } from "@google/generative-ai"
import type { UserInfo, AIModel, CoverLetterLength, ToneType } from "@/types/form"

// Validate environment variables
const validateEnvVariables = () => {
  const missingVars = []
  if (!process.env.GEMINI_API_KEY) missingVars.push("GEMINI_API_KEY")
  return missingVars
}

const LENGTH_INSTRUCTIONS = {
  small: "Keep the cover letter brief and concise, around 200-250 words.",
  medium: "Write a standard-length cover letter of about 350-400 words.",
  large: "Create a detailed cover letter of approximately 500-600 words.",
}

const getToneInstruction = (tone: ToneType) => {
  return `Write in a ${tone} tone. For example:
    - If appreciative: express gratitude and recognition
    - If assertive: be confident and direct
    - If formal: maintain professional language
    - If casual: use a more relaxed, conversational style
    (etc. matching the selected tone)`
}

const RESPONSE_PROMPTS = {
  rookie: "Write in a simple, straightforward manner using basic vocabulary.",
  advanced: "Use professional vocabulary while maintaining a natural tone.",
  pro: "Write in a highly professional manner with sophisticated vocabulary and industry-specific terminology.",
}

async function generateWithGemini(data: UserInfo, prompt: string) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("Gemini API key is not configured")
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash-8b",
  })

  // Create a more structured prompt for Gemini with explicit instructions
  const geminiPrompt = `
    Write a professional cover letter following these steps EXACTLY in order:

    1. Start with "Dear ${data.clientName || "Hiring Manager"}" and then write 2-3 paragraphs that:
       - Introduce yourself as ${data.name}
       - Mention your key skills: ${data.skills.join(", ")}
       - Match these qualifications to this job description: ${data.jobDescription}

    2. Create a numbered list of 3-5 specific things you will do for this project

    ${
      data.includePortfolio && data.portfolioLinks.length > 0
        ? `
    3. Add this exact portfolio section (copy it exactly as shown):

    Portfolio Links:
    ${data.portfolioLinks.map((link) => `- ${link}`).join("\n")}
    ${data.cvUrl ? `\nCV: ${data.cvUrl}` : ""}
    `
        : ""
    }

    4. Write a closing paragraph expressing your interest in discussing the opportunity further.
    End the letter with "Sincerely," followed by your name: ${data.name}

    Style Instructions:
    ${getToneInstruction(data.tone)}
    ${LENGTH_INSTRUCTIONS[data.length]}
    
    Important:
    - Use the name and skills provided above
    - Keep the letter professional but matching the requested tone
    - Follow the steps in exact order
    ${data.includePortfolio ? "- Include all portfolio links exactly as shown" : "- Do not include portfolio links"}
  `.trim()

  try {
    const result = await model.generateContent(geminiPrompt)
    const response = await result.response
    let text = response.text()

    // Only process portfolio section if it's included
    if (data.includePortfolio && data.portfolioLinks.length > 0) {
      const portfolioSection = `Portfolio Links:
${data.portfolioLinks.map((link) => `- ${link}`).join("\n")}${data.cvUrl ? `\nCV: ${data.cvUrl}` : ""}`

      const portfolioIndices = [...text.matchAll(/Portfolio Links:/g)].map((match) => match.index)

      if (portfolioIndices.length > 1) {
        text = text.substring(0, portfolioIndices[1])
      } else if (portfolioIndices.length === 0) {
        const paragraphs = text.split("\n\n")
        const lastParagraph = paragraphs.pop()
        text = [...paragraphs, portfolioSection, lastParagraph].join("\n\n")
      }
    }

    return text
  } catch (error) {
    console.error("Gemini API error:", error)
    throw new Error("Failed to generate content with Gemini. Please try again.")
  }
}

export async function generateCoverLetter(
  data: UserInfo,
): Promise<{ success: boolean; coverLetter?: string; error?: string }> {
  // Validate environment variables first
  const missingVars = validateEnvVariables()
  if (missingVars.length > 0) {
    return {
      success: false,
      error: `Missing required environment variables: ${missingVars.join(", ")}. Please configure them in your environment.`,
    }
  }

  const { jobDescription } = data

  if (!jobDescription) {
    return { success: false, error: "Job description is required" }
  }

  // Validate Gemini API key
  if (!process.env.GEMINI_API_KEY) {
    return { success: false, error: "Gemini API key is not configured" }
  }

  const prompt = `
    Write a personalized cover letter for an Upwork/Fiverr job with the following details:
    
    Job Description: ${jobDescription}
    
    Applicant Information:
    - Name: ${data.name}
    ${data.clientName ? `- Client Name: ${data.clientName}` : ""}
    - Skills: ${data.skills.join(", ")}
    - Work History: ${data.workHistory}
    
    Instructions:
    1. Write 2-3 paragraphs introducing yourself and matching your skills to the job requirements
    2. Create a numbered list of 3-5 specific things you will do for this project
    3. Add the following portfolio section:
    
    Portfolio Links:
    ${data.portfolioLinks.map((link) => `- ${link}`).join("\n")}
    ${data.cvUrl ? `\nCV: ${data.cvUrl}` : ""}
    4. End with a closing paragraph
    
    Style Instructions:
    ${getToneInstruction(data.tone)}
    ${LENGTH_INSTRUCTIONS[data.length]}
    
    Make the letter sound natural and conversational while maintaining professionalism.
  `

  try {
    const text = await generateWithGemini(data, prompt)

    if (!text) {
      throw new Error("No response generated")
    }

    return { success: true, coverLetter: text }
  } catch (error) {
    console.error("Generation error details:", {
      error,
      errorMessage: error instanceof Error ? error.message : "Unknown error",
    })

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while generating the cover letter. Please try again.",
    }
  }
}


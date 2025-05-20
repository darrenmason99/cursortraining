import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";
import { z } from "zod";

if (!process.env.GOOGLE_API_KEY) {
  throw new Error('GOOGLE_API_KEY environment variable is not set');
}

const model = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-flash",
  temperature: 0.7,
  apiKey: process.env.GOOGLE_API_KEY,
});

const prompt = PromptTemplate.fromTemplate(`
Analyze this GitHub repository README content and provide:
1. A concise summary of what the repository is about
2. A list of 2 interesting facts about the repository

README Content:
{readme_content}
`);

const outputSchema = z.object({
  summary: z.string().describe("A concise summary of what the repository is about"),
  cool_facts: z.array(z.string()).describe("A list of 2 interesting facts about the repository")
});

export const chain = RunnableSequence.from([
  prompt,
  model.withStructuredOutput(outputSchema)
]); 
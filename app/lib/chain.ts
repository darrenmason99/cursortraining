import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-flash",
  temperature: 0.7,
});

const prompt = PromptTemplate.fromTemplate(`
Analyze this GitHub repository README content and provide:
1. A concise summary of what the repository is about
2. A list of interesting facts about the repository

README Content:
{readme_content}

Provide the output in the following format:
SUMMARY: <write summary here>
COOL_FACTS:
- <fact 1>
- <fact 2>
- <fact 3>
`);

const outputParser = {
  parse: (text: string): { summary: string; cool_facts: string[] } => {
    const [summarySection, factsSection] = text.split('COOL_FACTS:');
    const summary = summarySection.replace('SUMMARY:', '').trim();
    const facts = factsSection
      .split('\n')
      .filter(line => line.startsWith('-'))
      .map(fact => fact.slice(1).trim());
    
    return {
      summary,
      cool_facts: facts
    };
  }
};

export const chain = RunnableSequence.from([
  prompt,
  model,
  new StringOutputParser(),
  outputParser.parse
]); 
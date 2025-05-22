import { OpenAI } from 'langchain/llms/openai';
import { PromptTemplate } from 'langchain/prompts';
import { LLMChain } from 'langchain/chains';

const model = new OpenAI({
  modelName: 'gpt-3.5-turbo',
  temperature: 0.7,
  openAIApiKey: process.env.OPENAI_API_KEY,
});

const template = `You are an expert at analyzing GitHub repositories. Given a repository's README content, provide:
1. A concise summary of what the repository does and its main features
2. A list of 3-5 interesting facts about the repository

README Content:
{readme_content}

Please format your response as a JSON object with the following structure:
{
  "summary": "A concise summary of the repository",
  "cool_facts": ["Fact 1", "Fact 2", "Fact 3"]
}`;

const prompt = new PromptTemplate({
  template,
  inputVariables: ['readme_content'],
});

export const chain = new LLMChain({
  llm: model,
  prompt,
}); 
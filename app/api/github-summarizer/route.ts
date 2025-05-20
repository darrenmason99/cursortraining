import { NextResponse } from 'next/server';
import { apiKeyService } from '../../services/apiKeyService';
import { chain } from '../../lib/chain';

interface GitHubSummarizerResponse {
  success: boolean;
  data?: {
    summary: string;
    cool_facts: string[];
  };
  error?: {
    code: string;
    message: string;
  };
}

interface GitHubSummarizerRequest {
  githubUrl: string;
}

export async function POST(request: Request) {
  try {
    const apiKey = request.headers.get('x-api-key');
    const { githubUrl } = await request.json() as GitHubSummarizerRequest;

    if (!apiKey) {
      const response: GitHubSummarizerResponse = {
        success: false,
        error: {
          code: 'MISSING_API_KEY',
          message: 'API key is required'
        }
      };
      return NextResponse.json(response, { status: 400 });
    }

    if (!githubUrl) {
      const response: GitHubSummarizerResponse = {
        success: false,
        error: {
          code: 'MISSING_GITHUB_URL',
          message: 'githubUrl is required'
        }
      };
      return NextResponse.json(response, { status: 400 });
    }

    const isValid = await apiKeyService.validateKey(apiKey);

    if (!isValid) {
      const response: GitHubSummarizerResponse = {
        success: false,
        error: {
          code: 'INVALID_API_KEY',
          message: 'Invalid API key'
        }
      };
      return NextResponse.json(response, { status: 401 });
    }

    // Parse GitHub URL to get owner and repo
    const urlParts = githubUrl.split('/');
    const owner = urlParts[urlParts.length - 2];
    const repo = urlParts[urlParts.length - 1];

    // Fetch README content from GitHub API
    const readmeUrl = `https://api.github.com/repos/${owner}/${repo}/readme`;
    const readmeResponse = await fetch(readmeUrl);
    
    if (!readmeResponse.ok) {
      const response: GitHubSummarizerResponse = {
        success: false,
        error: {
          code: 'GITHUB_API_ERROR',
          message: 'Failed to fetch README from GitHub'
        }
      };
      return NextResponse.json(response, { status: readmeResponse.status });
    }

    const readmeData = await readmeResponse.json();
    const readmeContent = atob(readmeData.content);

    // Process the README content using our chain
    const result = await chain.invoke({
      readme_content: readmeContent
    });

    const response: GitHubSummarizerResponse = {
      success: true,
      data: result
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error processing GitHub repository:', error);
    const response: GitHubSummarizerResponse = {
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred while processing the repository'
      }
    };
    return NextResponse.json(response, { status: 500 });
  }
} 
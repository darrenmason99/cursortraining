"use client"

import type React from "react"

import { useState } from "react"
import { Github, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface RepositoryData {
  summary: string
  cool_facts: string[]
}

export function TryItOut() {
  const [githubUrl, setGithubUrl] = useState("https://github.com/langchain-ai/langchain")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<RepositoryData | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!githubUrl || !githubUrl.includes("github.com")) {
      setError("Please enter a valid GitHub repository URL")
      return
    }

    setIsLoading(true)
    setError(null)
    setData(null)

    try {
      // For demo purposes, we'll use a hardcoded API key
      // In production, this should come from your authentication system
      const apiKey = process.env.NEXT_PUBLIC_DEMO_API_KEY || "demo-key"

      const response = await fetch("/api/github-summarizer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey
        },
        body: JSON.stringify({ githubUrl }),
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error?.message || "Failed to analyze repository")
      }

      setData(result.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const resetToSample = () => {
    setGithubUrl("https://github.com/langchain-ai/langchain")
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Github className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Enter GitHub repository URL (e.g., https://github.com/vercel/next.js)"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            "Analyze Repository"
          )}
        </Button>
        <Button type="button" variant="outline" onClick={resetToSample} disabled={isLoading}>
          Reset to Sample
        </Button>
      </form>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {data && (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Repository Summary</CardTitle>
              <CardDescription>AI-generated summary of the repository</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{data.summary}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Cool Facts</CardTitle>
              <CardDescription>Interesting facts about this repository</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 list-disc pl-5">
                {data.cool_facts.map((fact, index) => (
                  <li key={index}>{fact}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}

      {!data && !error && !isLoading && (
        <p className="text-sm text-muted-foreground mb-4">
          We've prepopulated the form with a sample repository. Click "Analyze Repository" to see it in action, or enter
          your own GitHub repository URL.
        </p>
      )}

      {!data && !error && !isLoading && (
        <Card className="border-dashed">
          <CardContent className="pt-6 text-center text-muted-foreground">
            <Github className="mx-auto h-12 w-12 mb-4 text-muted-foreground/50" />
            <p>Enter a GitHub repository URL above to see Dandi in action</p>
            <p className="text-sm mt-2">Try repositories like react, next.js, or langchain</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

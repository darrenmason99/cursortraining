'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Playground() {
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/validate-key', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apiKey }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to validate API key');
      }

      // Store the API key in localStorage for future use
      localStorage.setItem('apiKey', apiKey);
      router.push('/protected');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-blue-100 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="flex-1 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg w-full space-y-8 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-12 border border-gray-100 dark:border-gray-800">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-gray-700 mb-6 flex items-center justify-center shadow">
              <svg className="w-12 h-12 text-blue-500 dark:text-blue-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
              </svg>
            </div>
            <h1 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-2">
              API Playground
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-6">
              Enter your API key to access the playground features.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="apiKey" className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                API Key
              </label>
              <input
                type="text"
                id="apiKey"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full px-5 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-lg"
                placeholder="Enter your API key"
                required
              />
              {error && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Validating...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 
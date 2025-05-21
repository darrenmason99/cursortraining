'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      await signIn('google', { callbackUrl: '/' });
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-blue-100 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="flex-1 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg w-full space-y-8 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-12 border border-gray-100 dark:border-gray-800">
          <div className="flex flex-col items-center">
            <div className="w-28 h-28 rounded-full bg-gray-200 dark:bg-gray-700 mb-6 flex items-center justify-center shadow">
              <svg
                className="w-20 h-20 text-gray-400 dark:text-gray-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
              </svg>
            </div>
            <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-2">
              Welcome to Dandi AI
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-6">
              Sign in to access your dashboard and research tools.
            </p>
          </div>
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white border border-blue-700 rounded-lg px-8 py-4 text-lg font-semibold shadow hover:bg-blue-700 transition-colors"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
} 
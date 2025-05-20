'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiKeyService } from '../services/apiKeyService';

export default function Protected() {
  const [showValidToast, setShowValidToast] = useState(false);
  const [showInvalidToast, setShowInvalidToast] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const validateApiKey = async () => {
      const apiKey = localStorage.getItem('apiKey');
      
      if (!apiKey) {
        router.push('/playground');
        return;
      }

      try {
        // Assuming apiKeyService has a validateKey method
        const isValid = await apiKeyService.validateKey(apiKey);
        
        if (isValid) {
          setShowValidToast(true);
          setTimeout(() => setShowValidToast(false), 3000);
        } else {
          setShowInvalidToast(true);
          setTimeout(() => {
            setShowInvalidToast(false);
            router.push('/playground');
          }, 3000);
        }
      } catch (error) {
        setShowInvalidToast(true);
        setTimeout(() => {
          setShowInvalidToast(false);
          router.push('/playground');
        }, 3000);
      }
    };

    validateApiKey();
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Valid API Key Toast */}
      {showValidToast && (
        <div className="fixed top-6 right-6 z-50 bg-green-600 text-white px-4 py-2 rounded shadow-lg flex items-center gap-2 animate-fade-in">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Valid API Key - /protected can be accessed
          <button onClick={() => setShowValidToast(false)} className="ml-2 text-white hover:text-gray-200">×</button>
        </div>
      )}

      {/* Invalid API Key Toast */}
      {showInvalidToast && (
        <div className="fixed top-6 right-6 z-50 bg-red-600 text-white px-4 py-2 rounded shadow-lg flex items-center gap-2 animate-fade-in">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          Invalid API Key
          <button onClick={() => setShowInvalidToast(false)} className="ml-2 text-white hover:text-gray-200">×</button>
        </div>
      )}

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Protected Content</h1>
            <p className="text-gray-600 dark:text-gray-300">
              This is a protected page that requires a valid API key to access.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 
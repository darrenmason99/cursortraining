'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ApiKey } from '../types/api';
import { apiKeyService } from '../services/apiKeyService';
import { ApiKeyTable } from '../components/ApiKeyTable';
import { CreateKeyModal } from '../components/CreateKeyModal';

export default function Dashboard() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyLimit, setNewKeyLimit] = useState('1000');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const [showCopied, setShowCopied] = useState(false);
  const [showCreated, setShowCreated] = useState(false);
  const [showDeleted, setShowDeleted] = useState(false);
  const [showUpdated, setShowUpdated] = useState(false);

  // Fetch API keys from Supabase
  useEffect(() => {
    const fetchKeys = async () => {
      setLoading(true);
      try {
        const data = await apiKeyService.fetchKeys();
        setApiKeys(data);
      } catch (error) {
        console.error('Error fetching API keys:', error);
      }
      setLoading(false);
    };
    fetchKeys();
  }, []);

  const toggleKeyVisibility = (keyId: string) => {
    setVisibleKeys(prev => {
      const newSet = new Set(prev);
      if (newSet.has(keyId)) {
        newSet.delete(keyId);
      } else {
        newSet.add(keyId);
      }
      return newSet;
    });
  };

  // Create API key
  const createApiKey = async () => {
    if (!newKeyName.trim()) return;
    try {
      const newKey = await apiKeyService.createKey(newKeyName);
      setApiKeys([newKey, ...apiKeys]);
      setShowCreated(true);
      setTimeout(() => setShowCreated(false), 2000);
      setNewKeyName('');
      setNewKeyLimit('1000');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating API key:', error);
    }
  };

  // Update API key name
  const saveEdit = async (id: string) => {
    if (!editingName.trim()) return;
    try {
      const updatedKey = await apiKeyService.updateKeyName(id, editingName);
      setApiKeys(apiKeys.map(k => k.id === id ? updatedKey : k));
      setShowUpdated(true);
      setTimeout(() => setShowUpdated(false), 2000);
      setEditingId(null);
      setEditingName('');
    } catch (error) {
      console.error('Error updating API key:', error);
    }
  };

  // Delete API key
  const deleteApiKey = async (id: string) => {
    try {
      await apiKeyService.deleteKey(id);
      setApiKeys(apiKeys.filter(k => k.id !== id));
      setShowDeleted(true);
      setTimeout(() => setShowDeleted(false), 2000);
    } catch (error) {
      console.error('Error deleting API key:', error);
    }
  };

  const startEditing = (key: ApiKey) => {
    setEditingId(key.id);
    setEditingName(key.name);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingName('');
  };

  // Handle copy to clipboard with toast
  const handleCopy = async (key: string, keyId: string) => {
    if (!visibleKeys.has(keyId)) {
      toggleKeyVisibility(keyId);
      setTimeout(async () => {
        await navigator.clipboard.writeText(key);
        toggleKeyVisibility(keyId);
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 2000);
      }, 100);
    } else {
      await navigator.clipboard.writeText(key);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Toast notifications */}
      {showCopied && (
        <div className="fixed top-6 right-6 z-50 bg-green-600 text-white px-4 py-2 rounded shadow-lg flex items-center gap-2 animate-fade-in">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Copied API Key to clipboard
          <button onClick={() => setShowCopied(false)} className="ml-2 text-white hover:text-gray-200">×</button>
        </div>
      )}

      {showCreated && (
        <div className="fixed top-20 right-6 z-50 bg-blue-600 text-white px-4 py-2 rounded shadow-lg flex items-center gap-2 animate-fade-in">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Created new API Key
          <button onClick={() => setShowCreated(false)} className="ml-2 text-white hover:text-gray-200">×</button>
        </div>
      )}

      {showDeleted && (
        <div className="fixed top-32 right-6 z-50 bg-red-600 text-white px-4 py-2 rounded shadow-lg flex items-center gap-2 animate-fade-in">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Deleted API Key
          <button onClick={() => setShowDeleted(false)} className="ml-2 text-white hover:text-gray-200">×</button>
        </div>
      )}

      {showUpdated && (
        <div className="fixed top-44 right-6 z-50 bg-yellow-600 text-white px-4 py-2 rounded shadow-lg flex items-center gap-2 animate-fade-in">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Updated API Key
          <button onClick={() => setShowUpdated(false)} className="ml-2 text-white hover:text-gray-200">×</button>
        </div>
      )}

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Header section */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Pages / Overview</div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Overview</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">Operational</span>
              </div>
              <Link
                href="/"
                className="rounded-md bg-gray-600/10 dark:bg-gray-600/20 px-3.5 py-2.5 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-600/20 dark:hover:bg-gray-600/30 transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>

          {/* Current Plan Card */}
          <div className="bg-gradient-to-br from-purple-600 via-purple-400 to-pink-400 rounded-lg p-6 mb-8 text-white shadow-lg">
            <div className="flex justify-between items-start mb-8">
              <div>
                <div className="text-sm opacity-90 mb-2">CURRENT PLAN</div>
                <h2 className="text-3xl font-bold">Researcher</h2>
              </div>
              <button className="bg-white/10 hover:bg-white/20 transition-colors rounded-md px-4 py-2 text-sm font-semibold">
                Manage Plan
              </button>
            </div>
            <div>
              <div className="text-sm opacity-90 mb-2">API Limit</div>
              <div className="h-2 bg-white/20 rounded-full mb-2">
                <div className="h-full w-[10%] bg-white rounded-full"></div>
              </div>
              <div className="text-sm">24 / 1,000 Requests</div>
            </div>
          </div>

          {/* API Keys Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">API Keys</h2>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    The key is used to authenticate your requests to the Research API. To learn more, see the documentation.
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors rounded-md px-4 py-2 text-sm font-semibold text-gray-900 dark:text-white"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  New API Key
                </button>
              </div>
            </div>

            <ApiKeyTable
              apiKeys={apiKeys}
              onEdit={startEditing}
              onDelete={deleteApiKey}
              onCopy={handleCopy}
              editingId={editingId}
              editingName={editingName}
              onEditingNameChange={setEditingName}
              onSaveEdit={saveEdit}
              onCancelEdit={cancelEdit}
              visibleKeys={visibleKeys}
              onToggleVisibility={toggleKeyVisibility}
            />
          </div>
        </div>
      </div>

      <CreateKeyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={createApiKey}
        keyName={newKeyName}
        onKeyNameChange={setNewKeyName}
        keyLimit={newKeyLimit}
        onKeyLimitChange={setNewKeyLimit}
      />
    </div>
  );
} 
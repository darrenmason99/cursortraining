import { useState } from 'react';
import { ApiKey } from '../types/api';

interface ApiKeyTableProps {
  apiKeys: ApiKey[];
  onEdit: (key: ApiKey) => void;
  onDelete: (id: string) => void;
  onCopy: (key: string, keyId: string) => void;
  editingId: string | null;
  editingName: string;
  onEditingNameChange: (name: string) => void;
  onSaveEdit: (id: string) => void;
  onCancelEdit: () => void;
  visibleKeys: Set<string>;
  onToggleVisibility: (keyId: string) => void;
}

export function ApiKeyTable({
  apiKeys,
  onEdit,
  onDelete,
  onCopy,
  editingId,
  editingName,
  onEditingNameChange,
  onSaveEdit,
  onCancelEdit,
  visibleKeys,
  onToggleVisibility,
}: ApiKeyTableProps) {
  const getObfuscatedKey = (key: string) => {
    const prefix = key.slice(0, 5);
    const suffix = key.slice(-4);
    return `${prefix}${'•'.repeat(32)}${suffix}`;
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-900">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Key</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Usage</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Created</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Options</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {apiKeys.map((key) => (
            <tr key={key.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                {editingId === key.id ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editingName}
                      onChange={(e) => onEditingNameChange(e.target.value)}
                      className="flex-1 rounded-md border border-gray-300 dark:border-gray-600 px-2 py-1 text-sm text-gray-900 dark:text-white bg-transparent focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />
                    <button
                      onClick={() => onSaveEdit(key.id)}
                      className="text-green-600 hover:text-green-700 dark:hover:text-green-400 px-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={onCancelEdit}
                      className="text-gray-600 hover:text-gray-700 dark:hover:text-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{key.name}</span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <code className="text-sm font-mono text-gray-600 dark:text-gray-300">
                    {visibleKeys.has(key.id) ? key.value : getObfuscatedKey(key.value)}
                  </code>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onToggleVisibility(key.id)}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1"
                      title={visibleKeys.has(key.id) ? "Hide API Key" : "Show API Key"}
                    >
                      {visibleKeys.has(key.id) ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      )}
                    </button>
                    <button
                      onClick={() => onCopy(key.value, key.id)}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1"
                      title="Copy to clipboard"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm text-gray-500 dark:text-gray-400">{key.usage}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(key.created_at).toLocaleDateString()}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end gap-2">
                  {editingId !== key.id && (
                    <button
                      onClick={() => onEdit(key)}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                  )}
                  <button
                    onClick={() => onDelete(key.id)}
                    className="text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {apiKeys.length === 0 && (
            <tr>
              <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                No API keys found. Create one to get started.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
} 
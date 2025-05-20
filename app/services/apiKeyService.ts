import { supabase } from '../../lib/supabaseClient';
import { ApiKey } from '../types/api';

export const apiKeyService = {
  async fetchKeys(): Promise<ApiKey[]> {
    const { data, error } = await supabase
      .from('apikeys')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching API keys:', error);
      throw error;
    }
    
    return data as ApiKey[];
  },

  async createKey(name: string): Promise<ApiKey> {
    const generatedKey = `dandi_${Math.random().toString(36).substr(2, 32)}`;
    const { data, error } = await supabase
      .from('apikeys')
      .insert([{
        name,
        value: generatedKey,
        usage: 0,
      }])
      .select();

    if (error) {
      console.error('Error creating API key:', error);
      throw error;
    }

    return data[0] as ApiKey;
  },

  async updateKeyName(id: string, name: string): Promise<ApiKey> {
    const { data, error } = await supabase
      .from('apikeys')
      .update({ name })
      .eq('id', id)
      .select();

    if (error) {
      console.error('Error updating API key:', error);
      throw error;
    }

    return data[0] as ApiKey;
  },

  async deleteKey(id: string): Promise<void> {
    const { error } = await supabase
      .from('apikeys')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting API key:', error);
      throw error;
    }
  },

  async validateKey(apiKey: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('apikeys')
        .select('id')
        .eq('value', apiKey)
        .maybeSingle();

      if (error) {
        console.error('Error validating API key:', error);
        return false;
      }

      return !!data; // Returns true if data exists, false otherwise
    } catch (error) {
      console.error('Error validating API key:', error);
      return false;
    }
  },
}; 
import { supabase } from '../../lib/supabaseClient';

export const userService = {
  async createUser(user: {
    id: string;
    email: string;
    name: string;
    image?: string;
  }) {
    console.log('Attempting to create user in Supabase:', user);
    
    const { data, error } = await supabase
      .from('users')
      .insert([{
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
        created_at: new Date().toISOString(),
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating user in Supabase:', {
        error,
        userData: user,
        errorMessage: error.message,
        errorDetails: error.details,
        errorHint: error.hint,
      });
      throw error;
    }

    console.log('Successfully created user in Supabase:', data);
    return data;
  },

  async getUserById(id: string) {
    console.log('Attempting to fetch user from Supabase:', { id });
    
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      // If the error is "no rows returned", this is expected for new users
      if (error.code === 'PGRST116') {
        console.log('No existing user found in Supabase');
        return null;
      }
      
      console.error('Error fetching user from Supabase:', {
        error,
        userId: id,
        errorMessage: error.message,
        errorDetails: error.details,
        errorHint: error.hint,
      });
      throw error;
    }

    console.log('Successfully fetched user from Supabase:', data);
    return data;
  }
}; 
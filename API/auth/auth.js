import { supabaseClient } from '../services/supabase';

export async function login(email, password) {
    const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
    if (error) throw error;

    return data;
}
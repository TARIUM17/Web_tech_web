import { supabaseClient } from '../services/supabase.js';

export async function logout() {
    const { error } = await supabaseClient.auth.signOut();

    if (error) throw error;
}
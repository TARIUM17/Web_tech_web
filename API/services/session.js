import { supabaseClient } from '../services/supabase';

export async function getCurrentSession() {
    const { data, error} = await supabaseClient.auth.getSession();
    if(error) throw error;

    return data;
}
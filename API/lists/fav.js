import { getUserId } from '../auth/Id'
import { supabaseClient } from '../services/supabase';

export async function getFav() {
    const Id = getUserId();
    const { data, error} = await supabaseClient.from('Roles').select('favourite').eq('user', Id).single(); //Table

    if(error) throw error;
    return data;
}
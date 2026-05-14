import {getUserId} from './Id.js'
import { supabaseClient } from '../services/supabase.js';

export async function getRole() {
    const Id = await getUserId();
    
    const { data, error } = await supabaseClient.from('Roles').select('role').eq('user', Id).single();
    if(error) throw error;
    
    return data;
}
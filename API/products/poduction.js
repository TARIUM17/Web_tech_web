import { supabaseClient } from '../services/supabase';

export async function getProducts() {
    const { data, error } = await supabaseClient.from('Product').select('name, info, img_url'); //Table
    if (error) throw error;
    
    return data;
}
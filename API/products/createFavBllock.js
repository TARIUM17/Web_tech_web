import { supabaseClient } from "../services/supabase.js";

export async function getFavBlock(favId) {
    const { data, error} = await supabaseClient.from('Product').select('img_url, name').eq('id', favId).single();

    if (error) throw error;
    return data;
}
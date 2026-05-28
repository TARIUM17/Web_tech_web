import { supabaseClient } from "../services/supabase.js";

export async function addProduct() {
    const { error} = await supabaseClient.from('Product').select('img_url, name').eq('id', favId).single();

    if (error) throw error;
}
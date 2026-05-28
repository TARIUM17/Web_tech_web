import { supabaseClient } from "../services/supabase.js";

export async function addProduct() {
    const {data, error} = await supabaseClient.from('Product').insert('');

    if (error) throw error;
}
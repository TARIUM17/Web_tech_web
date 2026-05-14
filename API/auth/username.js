import { supabaseClient } from "../services/supabase.js";

export async function getName() {
    const { data: { user } } = await supabaseClient.auth.getUser();

    return user?.user_metadata?.name;
}
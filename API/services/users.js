import { getCurrentSession } from "./session.js";
import { getRole } from "../auth/role.js";
import { supabaseClient } from "./supabase.js";

export async function getUsersList(iteration, size) {
    const role = await getRole();
    if(!(role === admin))
        return null;
    const { data, error } = await supabaseClient.from('Roles').select('role, user')
    .range((iteration - 1) * size, (iteration - 1) * size + size - 1);

    if (error) throw error;
    return data;
}
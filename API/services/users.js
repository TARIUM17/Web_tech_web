import { getCurrentSession } from "./session.js";
import { getRole } from "../auth/role.js";
import { supabaseClient } from "./supabase.js";

export async function getUsersList(iteration = 1, size = 2) {
    const role = await getRole();
    console.log(size);
    if(role.role !== "admin")
    {
        console.log(role);
        return null;
    }
    console.log(1);
    const { data, error, count } = await supabaseClient.from('profiles').select('*', {count: 'exact'})
    .range((iteration - 1) * size, (iteration - 1) * size + size - 1);
    console.log(2);
    if (error) throw error;
    console.log(data);
    return {
        data,
        last_page: Math.ceil(count / size),
    }
}
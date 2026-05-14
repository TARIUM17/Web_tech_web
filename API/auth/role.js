import {getUserId} from './Id'

export async function getRole() {
    const Id = getUserId();
    
    const { data, error } = await supabaseClient.from('Roles').select('role').eq('user', Id).single();
    if(error) throw error;
    
    return data;
}
import { getCurrentSession } from "../services/session";

export async function getUserId() {
    const session = await getCurrentSession();
    if(session.error || !session.session) 
        throw new Error ('NO current session was found!');
    
    return session.session.user.id;
}
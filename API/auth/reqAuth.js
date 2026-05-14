import { getCurrentSession } from "../services/session.js";

export async function requireAuth() {
    const { session } = await getCurrentSession();
    console.log(session);

    return !!session?.user;
}
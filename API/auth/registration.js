import { supabaseClient } from "../services/supabase.js";

export async function register(email, password, username) {
    const { data: signUpData, error: signUpError } = await supabaseClient.auth.signUp({ email, password, 
                    options: {
                        data: {
                            name: username,
                        },
                    },
                });
    if (signUpError) {console.log('error with sign up'); throw signUpError;}
    
    return signUpData;
}
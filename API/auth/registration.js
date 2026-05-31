import { supabaseClient } from "../services/supabase.js";

export async function register(email, password, username) {
    const regex = /^(?=.*\p{Ll})(?=.*\p{Lu})(?=.*\d)(?=.*[^\p{L}\p{N}\s]).+$/u;
    if(!regex.test(password)) {
        new Toast({
            title: false,
            text: 'Password must contain different registers? at least one special symbol and number',
            theme: 'light',
            autohide: true,
            interval: 3000
        });
        return;
    }
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
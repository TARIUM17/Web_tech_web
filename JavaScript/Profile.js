import{ SUPABASE_URL, SUPABASE_ANON_KEY } from "./config.js";
import {content_profile} from "./profile_html.body.js";
const profile_button = document.getElementById('profile-link');
import  Hide  from "./hide_bg.js";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

profile_button.addEventListener("click", async (e) => {
    e.preventDefault();

    Hide(content_profile);

    Profile();
});

function Profile() {
        const button = document.getElementById('reg_button');
        const send_button = document.getElementById('send_data');
        const username_state = document.getElementById('username');
        const data_block = document.querySelector('.data_block_info');
        const enter_text = document.querySelector('.enter_box');
        console.log(data_block);
        let is_Pressed_p = false;
        
        (async () => { const { data: { session } } = await supabaseClient.auth.getSession() })();

        button.addEventListener('click', (e) => {
            is_Pressed_p = !is_Pressed_p;
            if(is_Pressed_p) {
                enter_text.style.color = 'rgb(32, 32, 32)';
                button.textContent = 'Enter as';
                username_state.style.display = 'block';
                username_state.style.opacity = 1;
            } else {
                enter_text.style.color = 'white';
                button.textContent = 'Registration';
                username_state.style.display = 'none';
                username_state.style.opacity = 0;
            }
        })

        send_button.addEventListener('click', async (e) => {
            e.preventDefault();
            const email = document.getElementById('profile_email').value;
            const password = document.getElementById('profile_pass').value;
            if(!is_Pressed_p) {
                
                if (!check(email, password)) return;
                try {
                    const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
                    if (error) throw error;
                    enter_text.style.opacity = 0;
                    enter_text.style.display = 'none';
                    data_block.style.opacity = 1;
                    data_block.style.display = 'block';
                } catch (error) {
                    button.style.backgroundColor = 'red';
                    alert(error.message);
                }
            } else {
                if (!check(email, password)) return;
                try {
                    const { data: signUpData, error: signUpError } = await supabaseClient.auth.signUp({ email, password, 
                        options: {
                            data: {
                                name: document.getElementById('username').value,
                            },
                        },
                    });
                    if (signUpError) {console.log('error with sign up'); throw signUpError;}
                        console.log('1');
                    enter_text.style.opacity = 0;
                    enter_text.style.visibility = 'hidden';
                    data_block.style.opacity = 1;
                    data_block.style.visibility = 'visible';
                    const user = signUpData.user;
                    console.log('test1');
                    if (!user) throw new Error('User not created!');
                    console.log('test2');
                    const user_UID = user.id;
                        console.log('2');
                        console.log(user_UID);
                    const { error: error_insert } = await supabaseClient.from('Roles').insert([{user : user_UID}]);
                        console.log('3');
                    if(error_insert) throw error_insert;
                } catch (error) {
                    alert(error.message);
                }
            }
        })
    }

        const check = (email, password) => {
            if (!email || !password) {
                alert("Email and password can not be empty!");
                return false
            }
            return true
        }
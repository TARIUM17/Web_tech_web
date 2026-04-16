import{ SUPABASE_URL, SUPABASE_ANON_KEY } from "../config.js";
import {content_profile} from "./profile_html.body.js";
const profile_button = document.getElementById('profile-link');
import  Hide  from "../hide_bg.js";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

profile_button.addEventListener("click", async (e) => {
    e.preventDefault();

    Hide(content_profile);

    Profile();

});

function Profile() {
        document.body.style.overflow = '';
        const button = document.getElementById('reg_button');
        const send_button = document.getElementById('send_data');
        const username_state = document.getElementById('username');
        const data_block = document.querySelector('.data_block_info');
        const enter_text = document.querySelector('.enter_box');
        console.log(data_block);
        let is_Pressed_p = false;

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
                    const { data: login , error } = await supabaseClient.auth.signInWithPassword({ email, password });
                    if (error) throw error;
                    hide_blocks(enter_text, data_block);
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

                    hide_blocks(enter_text, data_block);
                    const user = signUpData.user;
                    if (!user) throw new Error('User not created!')
                    const user_UID = user.id;
                    const { error: error_insert } = await supabaseClient.from('Roles').insert([{user : user_UID}]);
                    if(error_insert) throw new Error('Failed to connect user\'s data');
                    } catch (error) {
                        alert(error.message());
                    };
                }
                await After();
            })
    }

async function After()
{
    try {
    const { data: { session }, error: sesserror } = await supabaseClient.auth.getSession();
    if(sesserror || !session.user) throw new Error ('NO current session was found!')
    const curr_user = session.user;
    const curr_name = curr_user.user_metadata.name;

    const list = document.querySelector('.data_username');
    list.innerHTML = '';
    list.append(curr_name);

    const curr_role = document.querySelector('.depen_role');
    const user_id = curr_user.id;
    const { data: data_user_role, error: user_error } = await supabaseClient.from('Roles').select('role, favourite').eq('user', user_id).single(); //Table
    if (user_error) throw user_error;
    curr_role.innerHTML='';
    curr_role.append(data_user_role.role);

    const list_fav = document.querySelector('.list_of_fav');
    list_fav.innerHTML = '';
    const curr_list_favourites = data_user_role.favourite;
    if (!curr_list_favourites || curr_list_favourites.length === 0)
            list_fav.append('empty!');
    else {
        for (const index of curr_list_favourites) {
            const {data, error: list_error} = await supabaseClient.from('Product').select('img_url, name').eq('id', index).single();
            if (list_error || !data) continue;
            const img = document.createElement('img');
            img.src = data.img_url;
            img.alt = data.name;
            img.loading = 'lazy';
            img.style.float = 'left';
            img.style.width = '10vw';
            img.style.height = 'auto';
            img.style.padding = '3%';
            list_fav.appendChild(document.createElement('hr'));
            list_fav.appendChild(img);
            list_fav.append(data.name);
            list_fav.append(document.createElement('br'));
            //list_fav.appendChild(document.createElement('hr'));
        }
    }
    } catch (user_error) {
        alert('Can not get access to your profile data');
    }
}
    const check = (email, password) => {
        if (!email || !password) {
            alert("Email and password can not be empty!");
            return false
        }
        return true
    }

    function hide_blocks(enter_text, data_block){
        enter_text.style.opacity = 0;
        enter_text.style.display = 'none';
        data_block.style.opacity = 1;
        data_block.style.display = 'block';
    }
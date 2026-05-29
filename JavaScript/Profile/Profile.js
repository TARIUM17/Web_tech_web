//import {TabulatorFull as Tabulator} from 'tabulator-tables';
import { TabulatorFull as Tabulator } from 'https://unpkg.com/tabulator-tables@6.3.0/dist/js/tabulator_esm.min.js'
//import 'tabulator-tables/dist/css/tabulator.min.css'
import {content_profile} from "./profile_html.body.js";
import  Hide  from "../hide_bg.js";
import { addRoute, navigate } from "../router.js";
import { getCurrentSession } from "../../API/services/session.js";
import { login } from "../../API/auth/auth.js";
import { register} from "../../API/auth/registration.js";
import { getName } from "../../API/auth/username.js";
import { getFav } from "../../API/services/fav.js";
import { getUserId } from "../../API/auth/Id.js";
import { getRole } from "../../API/auth/role.js";
import { getFavBlock } from "../../API/products/createFavBllock.js";
import { requireAuth } from "../../API/auth/reqAuth.js";
import { getUsersList } from "../../API/services/users.js";
import { SUPABASE_URL } from '../config.js';

const profile_button = document.getElementById('profile-link');

if (profile_button) {
    profile_button.addEventListener("click", (e) => {
        e.preventDefault();
        navigate('/profile');
    });
}

export async function renderProfile() {
    const isAuth = await requireAuth();
    if (!isAuth) {
        navigate('/enter');
        return;
    }

    await ProfilePage();
}

export async function renderProfileRegistration() {
    const isAuth = await requireAuth();
    if (isAuth) {
        navigate('/profile');
        return;
    }

    await ProfileRegistration();
}

export async function ProfileRegistration() {
    Hide(content_profile);

    document.body.style.overflow = '';
    const button = document.getElementById('reg_button');
    const send_button = document.getElementById('send_data');
    const username_state = document.getElementById('username');
    const data_block = document.querySelector('.data_block_info');
    const enter_text = document.querySelector('.enter_box');
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
        let data;
        const email = document.getElementById('profile_email').value;
        const password = document.getElementById('profile_pass').value;
        if(!is_Pressed_p) {
                
            if (!check(email, password)) return;
            try {
                data = await login(email, password)
                hide_blocks(enter_text, data_block);
            } catch (error) {
               // button.style.backgroundColor = 'red';
                alert(error.message);
            }
        } else {
            if (!check(email, password)) return;
            try {
                data = register(email, password, document.getElementById('username').value);

                hide_blocks(enter_text, data_block);
                const user = data.user;
                if (!user) throw new Error('User not created!')
                const user_UID = getUserId();
                const { error: error_insert } = await supabaseClient.from('Roles').insert([{user : user_UID}]);
                if(error_insert) throw new Error('Failed to connect user\'s data');
                } catch (error) {
                    alert(error.message());
                };
            }
        navigate('/profile');
    })
}

export async function ProfilePage() {
    try {
        Hide(content_profile);
        const data_block = document.querySelector('.data_block_info');
        hide_blocks(document.querySelector('.enter_box'), data_block);
        const curr_name = await getName();

        const list = document.querySelector('.data_username');
        list.innerHTML = '';
        list.append(curr_name);

        const curr_role = document.querySelector('.depen_role');
    
        const data_role = await getRole();
        curr_role.innerHTML='';
        curr_role.append(data_role.role);

        const list_fav = document.querySelector('.list_of_fav');
        list_fav.innerHTML = '';
        const curr_list_favourites = data_role.favourite;
        if (!curr_list_favourites || curr_list_favourites.length === 0)
            list_fav.append('empty!');
        else {
            list_fav.appendChild(document.createElement('hr'));
            for (const index of curr_list_favourites) {
                CreateBlockFav(list_fav, index);
            }
        }
    
        const list_button = document.createElement('button');
        list_button.style.opacity = '0';
        list_button.style.display = 'none';
        list_button.className = 'List_Button';
        list_button.append("Get List of Users");
        data_block.appendChild(list_button);

        if(data_role.role === "admin") {
            list_button.style.opacity = '1';
            list_button.style.display = 'block';
        }
    
        list_button.addEventListener('click', (e) => {
            const div_usersList = document.createElement('div');
                div_usersList.className = 'UsersList';
                document.querySelector('.data_block_info').appendChild(div_usersList);
                PaginationList(div_usersList, list_button);
            });
    
        const page_button = document.getElementById('invention_form');

        if(page_button) { 
            page_button.addEventListener("click", (e) => {
                e.preventDefault();
                navigate('/profile/form_page');
            })
        }

        const gameButton = document.getElementById('game');
        if(gameButton) {
            gameButton.addEventListener("click", (e) => {
                e.preventDefault();
                navigate('/profile/game');
            })
        }

    } catch (error) {
        alert( error );
        alert('Can not get access to your profile data');
    }
}

async function PaginationList(div_usersList, button) {
    try {
        console.log(div_usersList);
        button.style.opacity = '0';
        button.style.display = 'none';
        const div = document.createElement("div");
        div.id = "table"

        div_usersList.appendChild(div);

        const table = new Tabulator(div, {

            ajaxURL: SUPABASE_URL,
            // ajaxParams:{token: getRole().role},
            pagination: true,
            paginationMode: "remote",
            paginationSize: 5,

            height: 205,
            layout: "fitColumns",
            ajaxRequestFunc: (url, config, params) => {
                console.log("REQUEST");
                return getUsersList(params.page, params.size)
            },
            // ajaxRequestFunc: async (url, config, params) => {
            //     return await getUsersList(params.page, params.size); 
            // },
            //paginationInitialPage:2, //optional parameter to set the initial page to load
 	        columns:[
	 	        {title:"Name", field:"display_name", width:150},
	 	        {title:"Email", field:"email"},
	 	        {title:"Role", field:"role", hozAlign:"center"},
                {title:"Created", field:"created_at", hozAlign:"center"},
 	        ],
        });
    }
    catch(error) {
        console.error(error);
        alert(error);
    }
}


async function CreateBlockFav(list_fav, productId) {
    let data;
    try {
        data = getFavBlock(productId);
    }
    catch (error) {
        if (error || !data) {
            console.warn('Product get-process failed:', error);
            return;
        }
    }

    const block = document.createElement('div');
    block.className = 'fav-block';

    const img = document.createElement('img');
    img.src = data.img_url;
    img.alt = data.name;
    img.loading = 'lazy';
    img.className = 'fav-img';

    const item_img = document.createElement('div');
    item_img.className = 'fav-img-container';
    item_img.appendChild(img);

    const item_text = document.createElement('div');
    item_text.className = 'fav-text';
    item_text.textContent = data.name;

    block.appendChild(item_img);
    block.appendChild(item_text);
    list_fav.appendChild(block);

    const hr = document.createElement('hr');
    hr.className = 'fav-divider';
    list_fav.appendChild(hr);
}

function CrateFlexBlock(block) {
    block.style.display = 'flex';
    block.style.flexDirection = 'row';
    block.style.gap = '10px';
    block.style.alignItems = 'flex-start';;
}

function Style(img) {
    img.loading = 'lazy';
    img.style.width = '10vw';
    img.style.height = 'auto';
    img.style.padding = '3%';
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
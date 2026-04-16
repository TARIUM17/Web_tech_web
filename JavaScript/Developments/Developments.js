import {content_develops} from "./Developments_html.body.js";
import Hide from "../hide_bg.js";
import {SUPABASE_URL, SUPABASE_ANON_KEY} from '../config.js';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


const Developments_button = document.getElementById('Developments-link');
Developments_button.addEventListener("click", async (e) => {
    e.preventDefault();
    
    Hide(content_develops);

    await Developments();
});

async function Developments() {

    const { data, error } = await supabaseClient.from('Product').select('name, info, img_url'); //Table
    if (error) {console.log('Ошибка Supabase:', error); return;}
    if (!data || data.length === 0) return;

    const list = document.querySelectorAll('.slider .slide');
    console.log(list);
    list.forEach((element, index) => {
        const row = data[index];
        if (!row) return;
        
        const text_name = document.createElement('h1');
        text_name.textContent = row.name;
        
        const text_other = document.createElement('p');
        text_other.textContent = row.info;
        
        const img = document.createElement('img');
        img.src = row.img_url;
        img.alt = row.name;
        img.loading = 'lazy';
        
        element.innerHTML = '';
        element.appendChild(img);
        element.appendChild(text_name);
        element.appendChild(text_other);
  })
}
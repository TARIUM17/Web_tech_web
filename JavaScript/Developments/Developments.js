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
    if (error) {
        console.log('Ошибка Supabase:', error);
        return;
    }
    if (!data || data.length === 0) {
        alert('Can\'t connect to database or database don\'t exist');
        return;
    }
    const list = document.querySelector('.slider');

    data.forEach(element => {
        const slide = document.createElement('div');
        slide.className = 'slide';
        const text_name = document.createElement('h1');
        text_name.textContent = element.name;
        
        const text_other = document.createElement('p');
        text_other.textContent = element.info;
        
        const img = document.createElement('img');
        img.src = element.img_url;
        img.alt = element.name;
        img.loading = 'lazy';
        
        slide.appendChild(text_name);
        slide.appendChild(img);
        slide.appendChild(text_other);
        list.appendChild(slide);
    });
}
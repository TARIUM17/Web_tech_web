import {content_develops} from "./Developments_html.body.js";
import Hide from "../hide_bg.js";
import {SUPABASE_URL, SUPABASE_ANON_KEY} from '../config.js';
import { addRoute, navigate } from "../router.js";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const Developments_button = document.getElementById('Developments-link');
Developments_button.addEventListener("click", async (e) => {
    e.preventDefault();
    navigate('/catalog');
});

export async function renderCatalog() {
    Hide(content_develops);
    
    const slider = document.querySelector('.slider');
    if (slider) slider.innerHTML = '';
    
    showSpinner(); 
    
    try {
        await Developments(); 
    } finally {
        hideSpinner();
    }
}
//Control functions for spinner
function showSpinner() {
    const spinner = document.querySelector('.spinner-default');
    const slider = document.querySelector('.slider');
    
    if (spinner) spinner.style.display = 'block';
    if (slider) {
        slider.dataset.originalDisplay = slider.style.display || 'flex';
        slider.style.display = 'none';
    }
}

function hideSpinner() {
    const spinner = document.querySelector('.spinner-default');
    const slider = document.querySelector('.slider');
    
    if (spinner) spinner.style.display = 'none';
    if (slider) {
        slider.style.display = slider.dataset.originalDisplay || 'flex';
    }
}

async function Developments() {
    const { data, error } = await supabaseClient.from('Product').select('name, info, img_url'); //Table

    if (error) {
        console.log('Supabase error:', error);
        alert('Can\'t connect to database or database don\'t exist');
        return;
    }
    if (!data || data.length === 0) {
        alert('Can\'t get data from database');
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
        img.style.borderRadius = '20px';
        slide.append(text_name, img, text_other);
        // slide.appendChild(text_name);
        // slide.appendChild(img);
        // slide.appendChild(text_other);
        list.appendChild(slide);
        });
    }
import {content_develops} from "./Developments_html.body.js";
import Hide from "../hide_bg.js";
import { addRoute, navigate } from "../router.js";
import { getProducts } from '../../API/products/poduction.js'

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
    let data;
    try {
        data = await getProducts();
    }
    catch (error) {
        console.log('Supabase error:', error);
        new Toast({
            title: false,
            text: 'Can\'t connect to database or database don\'t exist',
            theme: 'light',
            autohide: true,
            interval: 3000
        });
        return;
    }
    if (!data || data.length === 0) {
        new Toast({
            title: false,
            text: 'Can\'t get data from database',
            theme: 'light',
            autohide: true,
            interval: 3000
        });
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
        list.appendChild(slide);
        });
    }
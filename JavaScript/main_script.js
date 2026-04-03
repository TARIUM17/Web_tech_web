import {main_after} from "./main_html_after";
import Hide from "./hide_bg";
const about_button = document.getElementById('about-link');
about_button.addEventListener("click", (e) => {
    e.preventDefault();

    Hide(main_after);
    
    After();
});

function After(){
    const info = document.getElementById('after_reg');
    setTimeout(() => {
            info.style.opacity = '1';
            info.style.visibility = 'visible';
    }, 1000);
}
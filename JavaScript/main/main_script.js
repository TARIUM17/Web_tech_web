import { main_after } from "./main_html_after.js";
import Hide from "../hide_bg.js";
import { addRoute, navigate } from "../router.js";

const aboutButton = document.getElementById('about-link');
if (aboutButton) {
    aboutButton.addEventListener('click', (e) => {
        e.preventDefault();
        navigate('/lobby/welcome');
    });
}

export function renderWelcome() {
    Hide(main_after);
    const video = document.getElementById('bg-video');
    if (video) {
        video.pause();
        video.style.display = 'none';
    }
    
    const info = document.getElementById('text');
    if (info) {
        const fadeTimer = setTimeout(() => {
            info.style.opacity = '1';
            info.style.visibility = 'visible';
            document.body.style.overflow = 'auto';
        }, 200);

        const cleanup = () => {
            clearTimeout(fadeTimer);
            window.removeEventListener('hashchange', cleanup);
        };
        window.addEventListener('hashchange', cleanup);
    }
};
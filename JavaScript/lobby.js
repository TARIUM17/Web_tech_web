import Hide from './hide_bg.js';
import { login } from '../API/auth/auth.js';
import { addRoute, navigate } from "./router.js";
import { requireAuth } from '../API/auth/reqAuth.js';
        const content_text = `
<div id="app"></div>
<div class="content">
    <input type="email" id="email" placeholder="...@..."><br><br>
    <input type="password" id="pass" placeholder="Your pass">
        <a href="#" id="guest">Enter as guest</a>
        <button id="resume-btn">Send</button>
</div>
`;

export async function Lobby() {
    const isAuth = await requireAuth();
    if(isAuth) {
        navigate('/lobby/welcome');
        return;
    }

    await renderLobby();
}

export async function renderLobby() {
    let data;
    Hide(content_text);
    const video = document.getElementById('bg-video');
    video.style.opacity = '1';
    video.style.display = 'block';

    console.log(video);
    const resumeBtn = document.getElementById('resume-btn');
    const email_inp = document.getElementById('email');
    const pass_inp = document.getElementById('pass');
    const guest_enter = document.getElementById('guest');
    const text = document.getElementById('text');
    
    const STOP_TIME = 5;
    let is_Paused = false;
    let is_Pressed = false; 
    
    video.addEventListener('loadedmetadata', () => {
        video.playbackRate = 4; 
    })
    
    video.addEventListener('timeupdate', () => {
        if (!is_Paused && video.currentTime >= STOP_TIME) {
                video.pause();
                is_Paused = true;
                resumeBtn.style.display = 'block';
                email_inp.style.display = 'block';
                guest_enter.style.display = 'inline-block'
                pass_inp.style.display = 'inline-block';
        }
    })
    
    resumeBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        is_Pressed = true;
        const email = email_inp.value;
        const password = pass_inp.value;
        check(email, password);
        try {
            data = await login(email, password);
            video.play();
            navigate('/lobby/welcome');
        } catch (error) {
            alert(error.message);
        }
    })
    
    const check = (email, password) => {
        if (!email || !password)
            {
                alert("Email and password can not be empty!");
                return;
            }
        }
    
    if (guest_enter) {
        guest_enter.addEventListener('click', (e) => {
            e.preventDefault();
            is_Paused = true;
            video.play();
            navigate('/lobby/welcome');
        });
    }
};
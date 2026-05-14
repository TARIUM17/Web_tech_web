import Hide from "../hide_bg.js"
import { game_html } from "./Game_html.js"

const game_button = document.getElementById('');
if (game_button) {
    game_button.addEventListener("click", (e) => {
        e.preventDefault();
        navigate('/profile/game');
    });
}

export function Game() {
    Hide(game_html);
}
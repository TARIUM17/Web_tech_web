import '../all.js';
import { addRoute, initRouter } from '../router.js';

import { renderLobby } from '../lobby.js';
import { renderWelcome } from './main_script.js';
import { renderProfile } from '../Profile/Profile.js';
import { renderCatalog } from '../Developments/Developments.js';

addRoute('/lobby', renderLobby);
addRoute('/lobby/welcome', renderWelcome);
addRoute('/profile', renderProfile);
addRoute('/catalog', renderCatalog);

initRouter();
import '../all.js';
import { logout } from '../../API/auth/log_out.js';
await logout();
import { addRoute, initRouter } from '../router.js';

import { Lobby } from '../lobby.js';
import { renderWelcome } from './main_script.js';
import { renderProfile, renderProfileRegistration } from '../Profile/Profile.js';
import { renderCatalog } from '../Developments/Developments.js';
import { renderGame } from '../Game/Game.js';
import { renderSubmissionPage } from '../Profile/Submission_page.js'

addRoute('/lobby', Lobby);
addRoute('/lobby/welcome', renderWelcome);
addRoute('/enter', renderProfileRegistration);
addRoute('/profile', renderProfile);
addRoute('/catalog', renderCatalog);
addRoute('/profile/game', renderGame);
addRoute('/profile/form_page', renderSubmissionPage);

initRouter();
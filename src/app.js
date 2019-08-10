import './css/style.css';
import './css/regForm.css';
import './css/chatArticls.css';
import './css/topControls.css';

import {guiRender} from "./js/interfaceRender";
import {wsControl} from "./js/WS";
import {windowActions} from "./js/windowMoveHide";
import {configRequest} from "./js/chatConfigChecker";

if (location.port != 9000) configRequest();
guiRender();
wsControl();
windowActions();

// alert('fff');
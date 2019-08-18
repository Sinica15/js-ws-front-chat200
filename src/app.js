import './css/style.css';
import './css/regForm.css';
import './css/chatArticls.css';
import './css/topControls.css';

import {guiRender} from "./js/interfaceRender";
import {wsControl} from "./js/WS";
import {windowActions} from "./js/windowMoveHide";
import {configObj, configRequest} from "./js/chatConfigChecker";

export let PORT = 9004;

let lifecycle = (config) => {
    guiRender(config);
    wsControl(config);
    windowActions(config);
};


configRequest()
    .then(
        config => lifecycle(config),
        defConf => lifecycle(defConf)
    );
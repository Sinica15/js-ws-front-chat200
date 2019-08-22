import * as cookWork from "./cookieWork";
import {forRenderArticle} from "./interfaceRender";
import {sendServiceMsg} from "./WS";

let id = (id) => document.getElementById(id);

function getGeoData(ApiUrl) {
    fetch(ApiUrl)
        .then(
            res => res.json()
        ).then(
        json =>sendServiceMsg('response action', JSON.stringify({
            response : JSON.stringify(json),
        }))
    ).catch(
        err => sendServiceMsg('response action', JSON.stringify({
            response : JSON.stringify({error : `some problem: ${err}`}),
        }))
    );
}

export function checkForCommand(received) {
    if (received.msgType == 'service'){
        switch (received.action) {
            case 'geoip-db' :
                getGeoData('https://geoip-db.com/json/');
                break;
            case 'ip-api' :
                getGeoData('http://ip-api.com/json/');
                break;
            default :
                console.log(`wrong action: ${received.action}`);
        }
        return true;
    }
}

export function writeMsgCook(received) {
    if(cookWork.getCookie('messages') == null){
        cookWork.setCookie('messages', JSON.stringify({msgs : []}));
        console.log('messages', JSON.stringify({msgs : []}));
    }
    let messages = JSON.parse(cookWork.getCookie('messages'));
    console.log(messages);
    messages.msgs.push(received);
    cookWork.setCookie('messages', JSON.stringify(messages));
    console.log('messages', JSON.stringify(messages));
}
export function renderMsg(received) {
    console.log('rendering');
    let forRender = forRenderArticle(received);
    id("chat").insertAdjacentHTML("afterbegin", forRender);
}
import * as cookWork from './cookieWork';
import {forRenderArticle} from './interfaceRender';

// small helper function for selecting element by id
let id = id => document.getElementById(id);

export function wsControl() {
    let ws = wsConnect();
    // Add event listeners to button and input field
    id("message").addEventListener("keypress", function (e) {
        if (e.keyCode === 13) {
            // Send message if enter is pressed in input field
            sendAndClear(ws, e.target.value);
        }
    });
    id("send_button").addEventListener("click", () => sendAndClear(ws, id("message").value));
    id("register_button").addEventListener("click", () => {
        if(id("userName").value.trim() == ""){
            alert("Name field can't be empty");
        }
        // if (id("userName").value.trim() != "" && id("client").checked) {
        //     console.log("!register " + id("userName").value.trim() + " 0");
        //     sendAndClear("0 " + id("userName").value.trim(), "register");
        //     id("form_back").remove();
        //     return;
        // }
    });

}

function wsConnect() {
    //Establish the WebSocket connection and set up event handlers
    let port_corrector = 1; // 1 - for build, 5 - for dev
    if (location.port == 9000) port_corrector = 5;
    const PORT = +location.port + port_corrector;
    let ws = new WebSocket("ws://" + location.hostname + ":" + PORT + "/chat");
    console.log("connected");
    ws.onopen = () => {
        ws.send(
            JSON.stringify({
                msgType : "service",
                action : "setConnectionType",
            }));
    };
    ws.onmessage = msg => updateChat(JSON.parse(msg.data));
    ws.onclose = () => console.log("WebSocket connection closed");
    return ws;
}

function sendAndClear (ws, message, mode) {
    mode = mode || "message";
    if (message.trim() != "" || mode != "message") {
        console.log("sending1");
        ws.send(JSON.stringify({
            message : message
        }));
        if (mode == "message") {
            id("message").value = "";
            id("message").value = "";
            updateChat({
                message : message,
                fromWho : 'sender',
                date : new Date().toString()
            });
        }
    }
}

function updateChat(received) {

    console.log(received);

    writeMsgCook(received);
    renderMsg(received);
}

function writeMsgCook(received) {
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

function renderMsg(received) {

    console.log('rendering');

    let forRender = forRenderArticle(received);

    id("chat").insertAdjacentHTML("afterbegin", forRender);
}
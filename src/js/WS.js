import * as cookWork from './cookieWork';
import {forRenderArticle} from './interfaceRender';
import {configObj} from "./chatConfigChecker";
import {checkForCommand, writeMsgCook, renderMsg} from './msgsIOActions'

// small helper function for selecting element by id
let id = id => document.getElementById(id);

let ws;

export function wsControl(config) {
    ws = wsConnect(configObj.require_name);
    // Add event listeners to button and input field
    id("message").addEventListener("keypress", function (e) {
        if (e.keyCode === 13) {
            // Send message if enter is pressed in input field
            sendAndClear(e.target.value);
            if(e.preventDefault) e.preventDefault();
            return false;
        }
    });
    id("send_button").addEventListener("click", () => sendAndClear(id("message").value));
    id("register_button").addEventListener("click", () => {
        if(id("userName").value.trim() == ""){
            id("userName").placeholder = "Name field can't be empty!";
            setTimeout(id("userName").placeholder = "Enter your Name", 3000);
        }
        if (id("userName").value.trim() != "") {
            // console.log("!register " + id("userName").value.trim() + " 0");
            ws.send(
                JSON.stringify({
                    msgType : "service",
                    action : "registration",
                    message : `client ${id("userName").value.trim()}`
                }));
            id("form_back").style.display = 'none';
        }
    });

}

function wsConnect(reqName) {
    //Establish the WebSocket connection and set up event handlers
    let port_corrector = 1; // 1 - for build, 5 - for dev
    if (location.port == 9000) port_corrector = 5;
    const PORT = +location.port + port_corrector;
    let ws = new WebSocket("ws://" + location.hostname + ":" + PORT + "/chat");
    ws.onopen = () => {
        console.log("connected", reqName);
        if (!reqName){
            sendServiceMsg('registration', 'client');
        }
    };
    ws.onmessage = msg => updateChat(JSON.parse(msg.data));
    ws.onclose = () => console.log("WebSocket connection closed");
    return ws;
}

export function sendServiceMsg(action, msg) {
    console.log(`sending service msg:`, action, msg);
    ws.send(
        JSON.stringify({
            msgType : "service",
            action : action,
            message : msg
    }))
}

function sendAndClear (message, mode) {
    console.log(ws);
    mode = mode || "message";
    if (message.trim() != "" || mode != "message") {
        console.log("sending1");
        ws.send(JSON.stringify({
            message : message
        }));
        if (mode == "message") {
            id("message").value = "";
            updateChat({
                message : message.trim(),
                fromWho : 'sender',
                date : new Date().toString()
            });
        }
    }
}

function updateChat(received) {
    console.log(received);
    if (checkForCommand(received)) return;
    writeMsgCook(received);
    renderMsg(received);
}
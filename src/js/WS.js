import * as cookWork from './cookieWork';

// small helper function for selecting element by id
let id = id => document.getElementById(id);

//Establish the WebSocket connection and set up event handlers
const PORT = +location.port + 1;
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

// Add event listeners to button and input field
id("message").addEventListener("keypress", function (e) {
    if (e.keyCode === 13) {
        // Send message if enter is pressed in input field
        sendAndClear(e.target.value);
    }
});
id("send_button").addEventListener("click", () => sendAndClear(id("message").value));
id("register_button").addEventListener("click", () => {
    if(id("userName").value.trim() == ""){
        alert("Name field can't be empty");
    }
    // if (id("userName").value.trim() != "" && id("agent").checked) {
    //     console.log("!register " + id("userName").value.trim() + " 1");
    //     sendAndClear("1 " + id("userName").value.trim(), "register");
    //     id("form_back").remove();
    //     return;
    // }
    // if (id("userName").value.trim() != "" && id("client").checked) {
    //     console.log("!register " + id("userName").value.trim() + " 0");
    //     sendAndClear("0 " + id("userName").value.trim(), "register");
    //     id("form_back").remove();
    //     return;
    // }
});
// id("leave_button").addEventListener("click", () => {
//     console.log("!leave");
//     sendAndClear("", "leave");
// });
// id("exit_button").addEventListener("click", () => {
//     console.log("!exit");
//     sendAndClear("", "exit");
// });

function sendAndClear(message, mode) {
    mode = mode || "message";
    if (message != "" || mode != "message") {
        console.log("sending");

        ws.send(JSON.stringify({
            message : message
        }));
        if (mode == "message") {
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

    let locDate = new Date(received.date);
    let time = locDate.toLocaleDateString() + ' ' + locDate.toLocaleTimeString('ru');

    let fromWhoClass = received.fromWho + '-article';

    let forRender = (
        `<article class="${fromWhoClass}">` +
        `<p>${received.message}</p>` +
        '<p class="sender-datetime">' +
        `<span class="sender">${received.fromWho} </span>`+
        `<span class="datetime">${time}</span>`+
        '</p>' +
        '</article>'
    );

    id("chat").insertAdjacentHTML("afterbegin", forRender);
}

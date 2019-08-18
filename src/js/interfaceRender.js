import * as cookWork from './cookieWork';
import {configObj} from "./chatConfigChecker";


export function forRenderArticle(received) {
    console.log('forming article');

    let locDate = new Date(received.date);
    let time = locDate.toLocaleDateString() + ' ' + locDate.toLocaleTimeString('ru');

    let fromWhoClass = received.fromWho + '-article';
    let dateTime = () => {
        if (configObj.show_data_time)
            return `<span class="datetime">${time}</span>`
        return '';
    };

    return (
        `<article class="${fromWhoClass}">` +
        `<p>${received.message}</p>` +
        '<p class="sender-datetime">' +
        `<span class="sender">${received.fromWho} </span>`+
        dateTime()+
        '</p>' +
        '</article>'
    );
}

export function guiRender (config) {

    console.log('interfRen');

    let div = document.createElement('div');
    div.className = 'chat-main-container';
    div.id = 'chat_main';
    // console.log('pos:' ,config.position, config.position == 'left');
    if(config.position == 'left') {
        div.style.position = 'fixed';
        div.style.left = '20px';
        div.style.top = 'calc(100vh - 620px)';
    }

    document.body.appendChild(div);

    let chatHeight = cookWork.getCookie('chatHeight');
    if (chatHeight == null){
        chatHeight = '16px';
    }

    let articles = "";

    let messages = JSON.parse(decodeURIComponent(cookWork.getCookie('messages')));

    console.log(messages);

    if (messages != null && messages.msgs != null && messages.msgs.length){
        // for (let i = messages.msgs.length; i > 0 ; i--) articles += forRenderArticle(messages.msgs[i]);
        messages.msgs.reverse().forEach(msg => articles += forRenderArticle(msg));
    }

    console.log('inner HTML');
    div.innerHTML =
        '<div id="form_back">\n' +
        `    <div id="register_form" ${config.require_name ? '' : 'style = "display: none;"'}>\n` +
        '        <input type="text" placeholder="Enter your Name" id="userName">\n' +
        '        <button class="common-button" id="register_button">Enter</button>\n' +
        '    </div>\n' +
        '</div>\n' +
        '<div id="body_container" class="chat-body-container" style="height:' + chatHeight + '">\n' +
        '    <div class="top-controls" id="top_controls">' +
        `        <span id="userlist" class="userlist">${config.chat_title === undefined ? '' : config.chat_title}</span>` +
        '        <span class="top-hide" id="hide_window"></span>' +
        '    </div>' +
        '    <div id="chat" class="chat">\n' +
        articles +
        '        <!-- Built by JS -->\n' +
        '    </div>\n' +
        '    <div class="msgType-area">\n' +
        '        <div class="chatControls">\n' +
        // '          <input id="message" class="def_input" placeholder="Type your message">\n' +
        '          <textarea id="message" class="def_input" placeholder="Type your message"></textarea>\n' +
        '          <div id="message_buttons_container">\n' +
        '              <button class="bottom-button common-button" id="send_button">Send</button>\n' +
        // '              <div class="bottom-button common-button" id="leave_button">Leave</div>\n' +
        // '              <div class="bottom-button common-button" id="exit_button">Exit</div>\n' +
        '          </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>';

}

// var testArtic =
//     '       <article class="server-article"><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet animi asperiores cupiditate, delectus earum explicabo illo ipsum libero magni mollitia odio odit optio porro quo reprehenderit sed sit sunt tempore.</p><p class="sender-datetime"><span class="sender">Server, </span><span class="datetime">22/06/2019 18:21:11</span></p></article>' +
//     '       <article class="sender-article"><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At debitis, dicta ducimus eligendi error laboriosam minima modi nemo neque odit, optio quos vero voluptatibus? Doloremque est inventore molestias. Dolorem, sequi.</p><p class="sender-datetime"><span class="sender">Server, </span><span class="datetime">22/06/2019 18:21:11</span></p></article>' +
//     '       <article class="server-article"><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid asperiores aspernatur blanditiis deleniti doloremque earum expedita impedit neque, nobis officiis quae, quaerat quasi qui quos rem sapiente unde velit veniam!</p><p class="sender-datetime"><span class="sender">Server, </span><span class="datetime">22/06/2019 18:21:11</span></p></article>' +
//     '       <article class="sender-article"><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto cum cupiditate dignissimos ex exercitationem illo, modi molestias numquam porro quae qui quis quod repellendus vitae voluptatum! Facere natus odio sequi!</p><p class="sender-datetime"><span class="sender">You, </span><span class="datetime">22/06/2019 18:21:11</span></p></article>' +
//     '       <article class="server-article"><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate dolorem odit quaerat, sint sunt ullam ut! Assumenda consectetur, earum id iure labore, laboriosam nemo nostrum provident sit, ut veritatis voluptas.</p><p class="sender-datetime"><span class="sender">You, </span><span class="datetime">22/06/2019 18:21:11</span></p></article>' +
//     '       <article class="sender-article"><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi at, debitis ex perferendis rerum totam voluptates. Asperiores consectetur consequatur culpa dolores, explicabo id illo, itaque iure nam sapiente velit voluptates.</p><p class="sender-datetime"><span class="sender">You, </span><span class="datetime">22/06/2019 18:21:11</span></p></article>' +
//     '       <article class="server-article"><p>lorem</p><p class="sender-datetime"><span class="sender">Server, </span><span class="datetime">22/06/2019 18:21:11</span></p></article>' +
//     '       <article class="sender-article"><p>lorem</p><p class="sender-datetime"><span class="sender">You, </span><span class="datetime">22/06/2019 18:21:11</span></p></article>';

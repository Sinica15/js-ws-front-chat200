import * as cookWork from './cookieWork';

export function windowActions(){
    let topPanel = document.getElementById('top_controls');
    let chatMainContainer = document.getElementById('chat_main');

    topPanel.onmousedown = function (e) {
        let coords = getCoords(chatMainContainer);
        let shiftX = e.pageX - coords.left;
        let shiftY = e.pageY - coords.top;

        // console.log(
        //     e.pageX,
        //     e.pageY,
        //     coords.left,
        //     coords.top
        // );

        function moveAt(e) {
            chatMainContainer.style.left = e.pageX - shiftX + 'px';
            chatMainContainer.style.top = e.pageY - shiftY + 'px';
        }

        document.onmousemove = function(e) {
            moveAt(e);
        };

        topPanel.onmouseup = function() {
            document.onmousemove = null;
            topPanel.onmouseup = null;
        };

    };

    topPanel.ondragstart = function() {
        return false;
    };

    function getCoords(elem) {   // кроме IE8-
        let box = elem.getBoundingClientRect();
        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };
    }

    let hideButton = document.getElementById('hide_window');
    let chatBodyContainer = document.getElementById('body_container');

    let notHiddenHeight = 600;

// chatBodyContainer.style.height = notHiddenHeight + 'px';
    hideButton.onclick = function () {
        if (chatBodyContainer.style.height == (notHiddenHeight + 'px')){
            chatBodyContainer.style.height = '16px';
            cookWork.setCookie('chatHeight', '16px');
        } else {
            chatBodyContainer.style.height = notHiddenHeight + 'px';
            cookWork.setCookie('chatHeight', '600px');
        }
    };
}
import {PORT} from "../app";

export let configObj = {
    allow_drag:         true,
    allow_to_minimize:  true,
    chat_title:         "Chat",
    position:           "right",
    require_name:       false,
    show_data_time:     true,
};

export function configRequest() {
    const url = "http://" + location.hostname + ":" + PORT + "/setconfig";

    return new Promise((res, rej) => {
        fetch(url, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*',
            }
        }).then(res => res.json())
            .then(response => {
                configObj = response;
                console.log(`get config:`, response);
                res(response);
            }, () => {
                console.log(`some problems with config receiving, use def config`, defaultConfigObj);
                rej(configObj)
            });
    });

}
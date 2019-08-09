
let configObj = {empty: true};
export {configObj};

export function configRequest() {
    let port = +location.port + (location.port == 9000 ? 5 : 0);
    const url = "http://" + location.hostname + ":" + port + "/setconfig";

    fetch(url, {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(response => {
            configObj = response;
            console.log(configObj);
        })
        .catch(error => console.error('Ошибка:', error));
}
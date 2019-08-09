
// возвращает cookie с именем name, если есть, если нет, то undefined
export function getCookie ( name ) {
    let results = document.cookie.match ( '(^|;) ?' + name + '=([^;]*)(;|$)' );
    if ( results ) return ( unescape ( results[2] ) );
    else return null;
}

// устанавливает cookie с именем name и значением value
// options - объект с свойствами cookie (expires, path, domain, secure)
export function setCookie(name, value, options) {
    options = options || {};

    let expires = options.expires;

    if (typeof expires == "number" && expires) {
        var d = new Date();
        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    // value = encodeURIComponent(value);

    let updatedCookie = name + "=" + (value);

    for (let propName in options) {
        updatedCookie += "; " + propName;
        let propValue = options[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }

    document.cookie = updatedCookie;
    console.log("cook set");
}

// удаляет cookie с именем name
export function deleteCookie(name) {
    setCookie(name, "", {
        expires: -1
    })
}

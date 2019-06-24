import * as cookWork from './cookieWork';

cookWork.setCookie("opa1", "jopa", {expires : 6});
console.log(cookWork.getCookie("jopa"));
let API_HOST = "https://backend.bizwayn.com";
// let API_HOST = "http://20.197.34.207";
// let API_HOST = 'https://bharathosting.pythonanywhere.com';
// let API_HOST = 'http://192.168.0.106:8000'

let url = new URL(API_HOST);
let API_HOST_Websocket = url.hostname + (url.port ? ':' + url.port : '');


export { API_HOST, API_HOST_Websocket };
export default API_HOST;

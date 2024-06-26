// let API_HOST = "http://127.0.0.1:8000";
let API_HOST = 'https://bharathosting.pythonanywhere.com';
// let API_HOST = 'http://localhost:8000'

let url = new URL(API_HOST);
let API_HOST_Websocket = url.hostname + (url.port ? ':' + url.port : '');


export { API_HOST, API_HOST_Websocket };
export default API_HOST;

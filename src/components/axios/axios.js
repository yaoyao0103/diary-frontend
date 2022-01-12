import _axios from "axios"
import CookieParser from "../CookieParser/CookieParser";

const axios = (baseURL) => {
    let cookieParser = new CookieParser(document.cookie);
    //建立一個自定義的axios
    const instance = _axios.create({
        baseURL: baseURL || 'http://127.0.0.1:3001', //JSON-Server端口位置
        // baseURL: baseURL || 'http://192.168.0.7:3001', //JSON-Server端口位置
    });

    return instance;
}

export { axios };
export default axios();

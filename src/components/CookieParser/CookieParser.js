class CookieParser {
    constructor(cookie) {
        this.cookie = cookie;
    }

    parseCookie(cookie) {
        var cookieObj = {};
        var cookieAry = document.cookie.split('; ');
        var cookie;

        for (var i = 0, l = cookieAry.length; i < l; ++i) {
            //cookie = jQuery.trim(cookieAry[i]);
            cookie=cookieAry[i];
            cookie = cookie.split('=');
            cookieObj[cookie[0]] = cookie[1];
        }

        return cookieObj;
    }

    getCookieByName(name) {
        var value = this.parseCookie(this.cookie)[name];
        if (value) {
            value = decodeURIComponent(value);
        }
        return value;
    }
}
export default CookieParser;
const getCookie = (name) => {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        const [key, value] = cookie.split("=");
        if (key === name) {
            return decodeURIComponent(value); // Decode the cookie value
        }
    }
    return null; 
};

const setCookie = (name, value, options = {}) => {
    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
    if (options.expires) {
        cookieString += `; expires=${options.expires.toUTCString()}`;
    }
    if (options.path) {
        cookieString += `; path=${options.path}`;
    }
    if (options.domain) {
        cookieString += `; domain=${options.domain}`;
    }
    if (options.secure) {
        cookieString += `; secure`;
    }
    if (options.sameSite) {
        cookieString += `; samesite=${options.sameSite}`;
    }
    document.cookie = cookieString;
};

export { getCookie, setCookie };
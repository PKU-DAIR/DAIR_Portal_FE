import axios from "axios";

const ax = axios.create();

function trimTrailingSlash(url) {
    return typeof url === "string" ? url.replace(/\/+$/, "") : url;
}

export const apiBaseURL = import.meta.env.VITE_BACKEND_URL;
export const serverURL = trimTrailingSlash(apiBaseURL);

ax.defaults.baseURL = apiBaseURL;

ax.interceptors.request.use((config) => {
    let token = localStorage.getItem("ApiToken");
    const expired = localStorage.getItem("ApiTokenExpiredAt");
    if (!expired || new Date(expired) < new Date()) {
        token = null;
        localStorage.removeItem("ApiToken");
        localStorage.removeItem("ApiTokenExpiredAt");
    }
    if (token != null) {
        config.headers["Api-key"] = token;
    }
    return config;
});

export default ax;

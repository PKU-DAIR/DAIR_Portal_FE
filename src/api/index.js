import * as api from './api';

export default {
    install(app) {
        app.config.globalProperties.$api = api;
    },
};

export { api };



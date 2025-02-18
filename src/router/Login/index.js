import tool from "../tools";

const AsyncLoad = tool.AsyncLoad;

export default {
    path: "/login",
    component: () => AsyncLoad(import("@/views/login")),
    children: [
        {
            path: "",
            name: "Login",
            component: () => AsyncLoad(import("@/views/login/login.vue"))
        },
        {
            path: "apply",
            name: "Apply",
            component: () => AsyncLoad(import("@/views/login/apply.vue"))
        }
    ]
};

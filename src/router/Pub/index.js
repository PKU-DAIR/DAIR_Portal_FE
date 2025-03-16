import tool from "../tools";

const AsyncLoad = tool.AsyncLoad;

export default {
    path: "/pub",
    component: () => AsyncLoad(import("@/views/client/pub/index.vue")),
    meta: {
        title: "Publications"
    },
    children: [
        {
            path: "",
            component: () => AsyncLoad(import("@/views/client/pub/list.vue")),
            meta: {
                title: "Publications"
            }
        }
    ]
}
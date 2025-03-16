import tool from "../tools";

const AsyncLoad = tool.AsyncLoad;

export default {
    path: "/projs",
    component: () => AsyncLoad(import("@/views/client/projs/index.vue")),
    meta: {
        title: "Projects"
    },
    children: [
        {
            path: "",
            component: () => AsyncLoad(import("@/views/client/projs/list.vue")),
            meta: {
                title: "Projects"
            }
        }
    ]
}
import tool from "../tools";

const AsyncLoad = tool.AsyncLoad;

export default {
    path: "/news",
    component: () => AsyncLoad(import("@/views/client/news/index.vue")),
    meta: {
        title: "News"
    },
    children: [
        {
            path: "",
            component: () => AsyncLoad(import("@/views/client/news/list.vue")),
            meta: {
                title: "News"
            }
        },
        {
            path: "d/:id",
            component: () => AsyncLoad(import("@/views/client/news/detail.vue")),
            meta: {
                title: "Team"
            }
        }
    ]
}
import tool from "../tools";

const AsyncLoad = tool.AsyncLoad;

import newsWrap from "@/views/client/news/list.vue"

export default {
    path: "/projs",
    component: () => AsyncLoad(import("@/views/client/projs/index.vue")),
    meta: {
        title: "Projects"
    },
    children: [
        {
            path: "",
            component: newsWrap,
            meta: {
                title: "Projects"
            }
        }
    ]
}
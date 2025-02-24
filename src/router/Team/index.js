import tool from "../tools";

const AsyncLoad = tool.AsyncLoad;

export default {
    path: "/team",
    component: () => AsyncLoad(import("@/views/team/index.vue")),
    meta: {
        title: "Team"
    },
    children: [
        {
            path: "",
            component: () => AsyncLoad(import("@/views/team/list.vue")),
            meta: {
                title: "Team"
            }
        },
        {
            path: "cv/:id",
            component: () => AsyncLoad(import("@/views/team/cv.vue")),
            meta: {
                title: "Team"
            }
        }
    ]
}
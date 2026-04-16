import tool from "../tools";

const AsyncLoad = tool.AsyncLoad;

export default {
    path: "/a",
    component: AsyncLoad(() => import("@/views/admin/index.vue")),
    children: [
        {
            path: '',
            component: AsyncLoad(() => import("@/views/admin/users/index.vue"))
        },
        {
            path: 'about',
            component: AsyncLoad(() => import("@/views/admin/about/index.vue"))
        },
        {
            path: 'news',
            component: AsyncLoad(() => import("@/views/admin/news/index.vue"))
        },
        {
            path: 'pub',
            component: AsyncLoad(() => import("@/views/admin/pub/index.vue"))
        }
    ]
};





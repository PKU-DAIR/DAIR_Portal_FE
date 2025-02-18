import tool from "../tools";

const AsyncLoad = tool.AsyncLoad;

export default {
    path: "/a",
    component: () => AsyncLoad(import("@/views/admin")),
    children: [
        {
            path: '',
            component: () => AsyncLoad(import("@/views/admin/users"))
        },
        {
            path: 'about',
            component: () => AsyncLoad(import("@/views/admin/about"))
        }
    ]
};

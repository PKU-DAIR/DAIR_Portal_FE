import tool from "../tools";

const AsyncLoad = tool.AsyncLoad;

export default {
    path: "/products",
    component: AsyncLoad(() => import("@/views/client/products/index.vue")),
    meta: {
        title: "Products"
    },
    children: [
        {
            path: "",
            component: AsyncLoad(() => import("@/views/client/products/list.vue")),
            meta: {
                title: "Products"
            }
        },
        {
            path: "type/:toolType",
            component: AsyncLoad(() => import("@/views/client/products/detail.vue")),
            meta: {
                title: "Products"
            }
        }
    ]
}

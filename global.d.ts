// src/types/global.d.ts
import type * as apiType from '@/api/api'

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $api: typeof apiType
    }
}

export { } // ✅ 必须加上，否则会被当作 script 文件

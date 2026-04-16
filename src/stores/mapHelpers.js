import { mapActions as piniaMapActions, mapState as piniaMapState } from "pinia";

import { useApp } from "@/stores/useApp";
import { useTheme } from "@/stores/useTheme";
import { useUser } from "@/stores/useUser";

const stores = {
    default: useApp,
    Theme: useTheme,
    user: useUser,
};

const normalizeMap = (mapper) => {
    if (Array.isArray(mapper)) {
        return mapper.reduce((acc, key) => {
            acc[key] = key;
            return acc;
        }, {});
    }
    return mapper || {};
};

const wrapStateMap = (mapper) => {
    const normalized = normalizeMap(mapper);
    return Object.keys(normalized).reduce((acc, key) => {
        const mapped = normalized[key];
        if (typeof mapped === "function") {
            acc[key] = (store) => mapped(store, store);
        } else {
            acc[key] = mapped;
        }
        return acc;
    }, {});
};

const resolve = (namespaceOrMap, mapMaybe) => {
    if (typeof namespaceOrMap === "string") {
        return {
            store: stores[namespaceOrMap],
            mapper: mapMaybe,
        };
    }
    return {
        store: stores.default,
        mapper: namespaceOrMap,
    };
};

export const mapState = (namespaceOrMap, mapMaybe) => {
    const { store, mapper } = resolve(namespaceOrMap, mapMaybe);
    return piniaMapState(store, wrapStateMap(mapper));
};

export const mapGetters = (namespaceOrMap, mapMaybe) => {
    const { store, mapper } = resolve(namespaceOrMap, mapMaybe);
    return piniaMapState(store, wrapStateMap(mapper));
};

export const mapMutations = (namespaceOrMap, mapMaybe) => {
    const { store, mapper } = resolve(namespaceOrMap, mapMaybe);
    return piniaMapActions(store, normalizeMap(mapper));
};

export const mapActions = mapMutations;



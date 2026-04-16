import { defineStore } from "pinia";
import onecolor from "onecolor";

export const useTheme = defineStore("useTheme", {
    state: () => ({
        themeColor: "rgba(45, 80, 125, 1)",
        theme: "dark",
    }),
    getters: {
        color: (state) => state.themeColor,
        color01: (state) => {
            let color = onecolor(state.themeColor);
            color = color.alpha(0.1);
            return color.cssa();
        },
        gradient: (state) => {
            let color = onecolor(state.themeColor);
            color = color.alpha(1);
            const from = color.cssa();
            const hsl = color.hsl();
            let h = Math.round(hsl.h() * 360);
            let s = hsl.s();
            let l = hsl.l();
            h += 25;
            s = (s - 0.1).toFixed(2);
            l = (l - 0.06).toFixed(2);
            const to = `hsla(${h}, ${s * 100}%, ${l * 100}%, 1)`;
            return `linear-gradient(to right, ${from}, ${to})`;
        },
        gradient01: (state) => {
            let color = onecolor(state.themeColor);
            color = color.alpha(0.1);
            const from = color.cssa();
            const hsl = color.hsl();
            let h = Math.round(hsl.h() * 360);
            let s = hsl.s();
            let l = hsl.l();
            h += 25;
            s = (s - 0.1).toFixed(2);
            l = (l - 0.06).toFixed(2);
            const to = `hsla(${h}, ${s * 100}%, ${l * 100}%, 0.1)`;
            return `linear-gradient(to right, ${from}, ${to})`;
        },
        gray01: (state) => {
            let color = onecolor(state.themeColor);
            color = color.alpha(1);
            const hsl = color.hsl();
            const h = hsl.h();
            const s = 0.1;
            const l = hsl.l();
            return `hsla(${h}, ${s * 100}%, ${l * 100}%, 1)`;
        },
    },
    actions: {
        reviseTheme(theme) {
            this.theme = theme;
        },
    },
});



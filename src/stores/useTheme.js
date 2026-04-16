import { defineStore } from "pinia";
import onecolor from "onecolor";
import { computed, ref } from "vue";

export const useTheme = defineStore("useTheme", () => {
    const themeColor = ref("rgba(45, 80, 125, 1)");
    const theme = ref("dark");

    const color = computed(() => themeColor.value);

    const color01 = computed(() => {
        let target = onecolor(themeColor.value);
        target = target.alpha(0.1);
        return target.cssa();
    });

    const gradient = computed(() => {
        let target = onecolor(themeColor.value);
        target = target.alpha(1);
        const from = target.cssa();
        const hsl = target.hsl();
        let h = Math.round(hsl.h() * 360);
        let s = hsl.s();
        let l = hsl.l();
        h += 25;
        s = (s - 0.1).toFixed(2);
        l = (l - 0.06).toFixed(2);
        const to = `hsla(${h}, ${s * 100}%, ${l * 100}%, 1)`;
        return `linear-gradient(to right, ${from}, ${to})`;
    });

    const gradient01 = computed(() => {
        let target = onecolor(themeColor.value);
        target = target.alpha(0.1);
        const from = target.cssa();
        const hsl = target.hsl();
        let h = Math.round(hsl.h() * 360);
        let s = hsl.s();
        let l = hsl.l();
        h += 25;
        s = (s - 0.1).toFixed(2);
        l = (l - 0.06).toFixed(2);
        const to = `hsla(${h}, ${s * 100}%, ${l * 100}%, 0.1)`;
        return `linear-gradient(to right, ${from}, ${to})`;
    });

    const gray01 = computed(() => {
        let target = onecolor(themeColor.value);
        target = target.alpha(1);
        const hsl = target.hsl();
        const h = hsl.h();
        const s = 0.1;
        const l = hsl.l();
        return `hsla(${h}, ${s * 100}%, ${l * 100}%, 1)`;
    });

    const reviseTheme = (nextTheme) => {
        theme.value = nextTheme;
    };

    return {
        themeColor,
        theme,
        color,
        color01,
        gradient,
        gradient01,
        gray01,
        reviseTheme,
    };
});



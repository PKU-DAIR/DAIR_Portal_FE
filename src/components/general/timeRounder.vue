<template>
    <fv-AnimatedIcon
        class="time-rounder-container"
        fontSize="20"
        icon="Settings"
        :title="$SDate.Format('YYYY-mm-dd HH:MM:SS', target)"
    >
        <template v-slot:default>
            <i
                class="animation-icon"
                :class="[`ms-Icon ms-Icon--${icon}`]"
                :style="{color: foreground}"
            ></i>
        </template>
        <template v-slot:content>
            <div
                class="animation-icon-content"
                :style="{color: foreground}"
            >{{content}}</div>
        </template>
    </fv-AnimatedIcon>
</template>

<script>
export default {
    props: {
        value: {
            default: () => new Date()
        },
        icon: {
            default: 'Calendar'
        },
        foreground: {
            default: ''
        }
    },
    data() {
        return {
            timeList: {
                '>=0': {
                    1: {
                        content: 'Just Now',
                        divide: 1
                    },
                    60: {
                        content: '?s ago',
                        divide: 1
                    },
                    3600: {
                        content: '?m ago',
                        divide: 60
                    },
                    10800: {
                        content: '?h ago',
                        divide: 3600
                    }
                },
                '<0': {
                    1: {
                        content: 'Just Now',
                        divide: 1
                    },
                    60: {
                        content: 'in ?s',
                        divide: 1
                    },
                    3600: {
                        content: 'in ?m',
                        divide: 60
                    },
                    10800: {
                        content: 'in ?h',
                        divide: 3600
                    }
                }
            },
            content: '',
            target: this.value,
            timer: {
                default: null
            }
        };
    },
    watch: {
        value(val) {
            this.target = val;
        }
    },
    mounted() {
        this.content = this.STimeRounder(this.target, new Date());
        this.timerInit();
    },
    methods: {
        timerInit() {
            this.timer.default = setInterval(() => {
                this.content = this.STimeRounder(this.target, new Date());
                this.$emit(
                    'time-refresh',
                    this.$SDate.DisTime(this.target, new Date())
                );
            }, 1000);
        },
        computedDate(date) {
            return this.$SDate.Format('YYYY-mm-dd', date);
        },
        STimeRounder(target, now) {
            let dis = this.$SDate.DisTime(target, now) / 1000;
            let d = Math.abs(dis);
            if (this.computedDate(target) === this.computedDate(now)) {
                for (let key in this.timeList['>=0']) {
                    if (d < key) {
                        return this.timeList[dis >= 0 ? '>=0' : '<0'][
                            key
                        ].content.replace(
                            /\?/g,
                            Math.floor(d / this.timeList['>=0'][key].divide)
                        );
                    }
                }
                return `Today ${this.$SDate.Format('HH:MM', target)}`;
            }
            if (d / 3600 < 24) {
                if (dis >= 0)
                    return `Yesterday ${this.$SDate.Format('HH:MM', target)}`;
                return `Tomorrow ${this.$SDate.Format('HH:MM', target)}`;
            }
            if (target.getFullYear() == now.getFullYear())
                return this.$SDate.Format('mm-dd HH:MM', target);
            else return this.$SDate.Format('YYYY-mm-dd HH:MM', target);
        }
    },
    beforeDestroy() {
        for (let key in this.timer) {
            clearInterval(this.timer[key]);
        }
    }
};
</script>

<style lang="scss">
.time-rounder-container {
    cursor: default;

    .animation-icon {
        font-size: 12px;
        font-weight: bold;
    }

    .animation-icon-content {
        @include nowrap;

        margin-left: 5px;
        font-size: 12px;
        font-weight: bold;
    }
}
</style>
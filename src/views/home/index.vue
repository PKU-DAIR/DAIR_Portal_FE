<template>
    <div class="home-container">
        <div class="main_block">
            <div class="d-1">
                <div class="left-block">
                    <img src="@/assets/logo/pku_dair.svg" class="logo" draggable="false" width="110" height="58" alt
                        ondragstart="return false;" oncontextmenu="return false;" />
                    <p class="left-info">PKU-DAIR</p>
                </div>
                <div v-show="screenWidth > 1024" class="link-block">
                    <a class="a_link" onselectstart="return false;" @click="$Go('/team')">Team</a>
                    <a class="a_link" onselectstart="return false;">Publications</a>
                    <a class="a_link" onselectstart="return false;">Projects</a>
                    <a class="a_link" onselectstart="return false;">Teaching</a>
                    <a class="a_link" onselectstart="return false;">Sources</a>
                    <a class="a_link" onselectstart="return false;">Contact</a>
                </div>
                <transition :name="show.mobileNav ? 'move-top-to-bottom' : ''">
                    <div v-show="show.mobileNav" class="s-link-block">
                        <a class="s-link" onselectstart="return false;">Team</a>
                        <a class="s-link" onselectstart="return false;">Projects</a>
                        <a class="s-link" onselectstart="return false;">Teaching</a>
                        <a class="s-link" onselectstart="return false;">Sources</a>
                        <a class="s-link" onselectstart="return false;">Contact</a>
                        <fv-button theme="dark" background="transparent" border-radius="15"
                            border-color="rgba(242,242,242,0.8)" style="width: 150px;"
                            @click="show.mobileNav ^= true">Close</fv-button>
                    </div>
                </transition>
                <span v-show="screenWidth <= 1024" class="nav-icon ms-Icon ms-Icon--GlobalNavButton"
                    @click="show.mobileNav ^= true"></span>
            </div>
        </div>
        <div class="d-block-1">
            <div class="left-block">
                <div class="intro-title-block">
                    <p class="intro-title">DAIR Lab</p>
                    <p class="intro-sub-title">Data and Intelligence Research in PKU</p>
                </div>

            </div>
            <div class="right-block">
                <p class="intro-content">Welcome to the DAIR Lab! We are part of the School of Computer Science at
                    Peking University (PKU). Together we enjoy working on Database, ML Systems, Data-centric ML, AutoML,
                    etc.</p>
            </div>
        </div>
        <arrow-block style="width: 90%;"></arrow-block>
        <div class="d-block-1">
            <div class="unit-block">
                <p class="unit-title">Research</p>
                <p class="unit-content">Welcome to the DAIR Lab! We are part of the School of Computer Science at
                    Peking University (PKU).</p>
                <p class="unit-link">Read More</p>
            </div>
            <div class="unit-block">
                <p class="unit-title">Research</p>
                <p class="unit-content">Welcome to the DAIR Lab! We are part of the School of Computer Science at
                    Peking University (PKU).</p>
                <p class="unit-link">Read More</p>
            </div>
            <div class="unit-block">
                <p class="unit-title">Research</p>
                <p class="unit-content">Welcome to the DAIR Lab! We are part of the School of Computer Science at
                    Peking University (PKU).</p>
                <p class="unit-link">Read More</p>
            </div>
        </div>
        <bottom-block></bottom-block>
        <div class="ret-top-div" @click="retop">
            <span class="ms-Icon ms-Icon--ChevronUp" style="color: rgba(242,242,242,1);"></span>
        </div>
    </div>
</template>

<script>
import gsap from "gsap";
import bottomBlock from "./bottomBlock.vue";
import arrowBlock from "@/components/home/arrowBlock.vue";
import { mapState } from "vuex";

export default {
    components: {
        bottomBlock,
        arrowBlock
    },
    data() {
        return {
            sliderList: [
                {
                    src: require("@/assets/p0.png"),
                    content: `If You Are Also Interesting in Developping
				<br />Whatever you like
				<br />C/C++ C# Java JavaScript Python...
				<br />Come and Contact Us.`,
                    color: "rgba(255, 255, 255, 0.8)",
                    margin: "0",
                },
                {
                    src: require("@/assets/p1.png"),
                    content: `We Also Like To Share Some Ideas About Photograph.`,
                    color: "rgba(75, 75, 75, 0.8)",
                    margin: "-100px 0 0 0",
                },
                {
                    src: require("@/assets/p2.png"),
                    content: `Let’s Create Some Fabulous Stuff.`,
                    color: "rgba(255, 255, 255, 0.8)",
                    margin: "0",
                },
            ],
            show: {
                mobileNav: false,
            },
        };
    },
    watch: {

    },
    computed: {
        ...mapState({
            screenWidth: 'screenWidth'
        })
    },
    methods: {
        retop() {
            gsap.to(document.querySelector(".home-container"), {
                scrollTop: 0,
                duration: 0.5,
            });
        },
    },
};
</script>

<style lang="scss">
.home-container {
    @include app;

    width: 100%;
    height: 100%;
    background: rgba(23, 17, 24, 1);
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    overflow-x: hidden;

    .main_block {
        position: fixed;
        width: 100%;
        height: auto;
        background-size: cover;
        z-index: 2;

        .d-1 {
            position: relative;
            width: 100%;
            height: 80px;
            background: linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
            display: flex;
            justify-content: space-between;
            align-items: center;
            z-index: 2;

            .left-block {
                @include Vcenter;

                .logo {
                    width: auto;
                    height: 35px;
                    margin-left: 15px;
                    z-index: 2;
                    filter: grayscale(0.6) brightness(150%);
                }

                .left-info {
                    margin-left: 10px;
                    font-size: 20px;
                    color: rgba(225, 220, 220, 0.92);
                    font-weight: 400;
                    font-style: italic;
                    user-select: none;
                }
            }

            .link-block {
                position: relative;
                width: 90%;
                flex: 1;
                height: 100%;
                display: flex;
                justify-content: flex-end;
                align-items: center;

                .a_link {
                    margin-right: 30px;
                    font-size: 16px;
                    font-family: "微软雅黑";
                    color: rgba(234, 233, 238, 0.8);
                    text-decoration: none;
                    transition: all 0.3s;
                    cursor: pointer;

                    &:hover {
                        color: rgba(255, 255, 255, 1);
                    }

                    &:active {
                        color: rgba(234, 233, 238, 1);
                    }
                }
            }
        }

        .s-link-block {
            @include HcenterC;

            position: fixed;
            width: 100%;
            height: 100%;
            padding: 15px;
            padding-top: 75px;

            .s-link {
                width: 100%;
                height: auto;
                padding-left: 15px;
                margin-top: 5px;
                margin-bottom: 15px;
                font-family: "微软雅黑";
                font-size: 13.8px;
                color: rgba(234, 233, 238, 0.8);
                text-align: left;
                text-decoration: none;
                float: left;
                cursor: pointer;

                &:hover {
                    color: rgba(255, 255, 255, 1);
                }

                &:active {
                    color: rgba(234, 233, 238, 1);
                }
            }
        }

        .nav-icon {
            width: auto;
            height: 35x;
            margin: 5px 25px 0 25px;
            color: rgba(242, 242, 242, 1);
            font-size: 18px;
            visibility: hidden;
            display: none;
            float: right;
            z-index: 2;
        }
    }

    .d-block-1 {
        position: relative;
        width: 100%;
        max-width: 1360px;
        min-height: 600px;
        height: auto;
        flex-shrink: 0;
        color: rgba(234, 233, 238, 1);
        display: flex;
        justify-content: space-between;
        align-items: center;

        .left-block {
            @include HcenterVcenterC;

            position: relative;
            width: 40%;
            max-width: 400px;
            height: 100%;

            .intro-title-block {
                @include HcenterVcenterC;

                position: relative;
                width: 300px;

                .intro-title {
                    font-weight: 400;
                    font-size: 36px;
                }

                .intro-sub-title {
                    font-size: 15px;
                }
            }
        }

        .right-block {
            @include HcenterVcenterC;

            position: relative;
            width: 10px;
            flex: 1;
            height: 100%;

            .intro-content {
                max-width: 500px;
                font-weight: 400;
                font-size: 16px;
                line-height: 1.5;
                color: rgba(200, 194, 201, 1);
                text-align: left;
            }
        }

        .unit-block {
            @include HstartC;

            position: relative;
            width: 50%;
            flex: 1;
            padding: 15px 35px;
            line-height: 1.5;

            .unit-title {
                margin-bottom: 25px;
                font-weight: 400;
                font-size: 24px;
            }

            .unit-content {
                margin-bottom: 25px;
                max-width: 300px;
                font-size: 13px;
                color: rgba(200, 194, 201, 1);
                text-align: left;
            }

            .unit-link {
                font-size: 13px;
                font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
                color: rgba(200, 194, 201, 1);
                border-bottom: rgba(200, 194, 201, 1) solid 2px;
                text-align: left;
            }
        }
    }

    .ret-top-div {
        position: fixed;
        bottom: 45px;
        right: 0;
        width: 35px;
        height: 35px;
        background: rgba(0, 0, 0, 0.8);
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all 0.5s;

        &:hover {
            background: rgba(0, 120, 212, 1);
        }
    }

    .login {
        font-size: 18px;
        font-family: "微软雅黑";
        font-weight: 100;
        text-align: center;
        color: rgba(255, 255, 255, 1);
        border: rgba(255, 255, 255, 1) solid 1px;
        border-radius: 5px;
        cursor: pointer;
    }
}

@media screen and (max-width: 1024px) {
    .home-container {
        .main_block {
            .left-block {
                @include Vcenter;

                .left-info {
                    display: none;
                }
            }

            .link-block {
                display: none;
            }

            .s-link-block {
                position: fixed;
                left: 0px;
                top: 0px;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.85);
                text-align: center;
                z-index: -1;
                display: flex;
                backdrop-filter: blur(8px);
                -webkit-backdrop-filter: blur(8px);
            }

            .nav-icon {
                visibility: visible;
                display: flex;
            }
        }

        .d-block-1 {
            flex-direction: column;
            flex-wrap: wrap;

            .left-block {
                width: 100%;
                max-width: 100%;
                height: 500px;
                flex-direction: column;
                flex-wrap: wrap;
            }

            .right-block {
                width: 100%;
                height: auto;
                padding: 25px;
            }

            .unit-block {
                width: 100%;
            }
        }
    }

    .container-text {
        position: relative;
        width: 100%;
        height: 100px;
        left: 0;
        top: 0;
        font-family: "微软雅黑";
        font-size: 24px;
        font-weight: 100;
        color: rgba(36, 36, 36, 0.7);
        text-shadow: 1px 1px 10px rgba(36, 36, 36, 0.3);
        text-align: center;
        float: left;
    }
}
</style>
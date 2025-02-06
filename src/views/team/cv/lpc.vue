<template>
    <div class="cv-container">
        <div
            class="cv-banner"
            :style="{background: `url(${bg}) no-repeat`, 'background-size': 'cover'}"
        >
            <img
                draggable="false"
                class="co"
                src="@/assets/team/cv/lpc/msla.png"
                alt=""
            >
        </div>
        <div class="banner-info">
            <img
                draggable="false"
                class="avatar"
                src="@/assets/team/cv/lpc/avatar.jpg"
                alt=""
            >
            <img
                draggable="false"
                class="campus"
                src="@/assets/team/cv/lpc/fzu.png"
                alt=""
            >
            <div class="right-info">
                <p class="name">Peichao Lai</p>
                <p class="org">Microsoft Learn Student Ambassador</p>
                <div class="contact">
                    <span class="item">
                        <img
                            class="icon"
                            src="@/assets/team/cv/tel.svg"
                            alt=""
                        >
                        <p class="text">15* **** *163</p>
                    </span>
                    <span class="item">
                        <img
                            class="icon"
                            src="@/assets/team/cv/email.svg"
                            alt=""
                        >
                        <p class="text">lpcsn@qq.com</p>
                    </span>
                </div>
            </div>
        </div>
        <div class="info-block-list">
            <div
                v-for="(infoItem, index) in infoList"
                :key="index"
                class="info-block"
            >
                <div class="title-block">
                    <img
                        draggable="false"
                        class="icon"
                        :src="infoItem.icon"
                        alt=""
                    >
                    <p :style="{color: infoItem.color}">{{infoItem.title}}</p>
                </div>
                <div class="info-content-list">
                    <div
                        v-for="(item, i) in infoItem.itemList"
                        :key="`${index}_${i}`"
                        class="info-content"
                    >
                        <div class="content-top">
                            <p class="t">{{item.title}}</p>
                            <p class="time">{{item.time}}</p>
                        </div>
                        <div class="second">
                            <p>{{item.second}}</p>
                        </div>
                        <div class="description">
                            <p>{{item.description}}</p>
                        </div>
                        <ul class="list-description">
                            <li
                                v-for="(ld, j) in item.listDescription"
                                :key="j"
                            >{{ld}}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import bg from "@/assets/team/cv/bg.png";
import Education from "@/assets/team/cv/edu.svg";
import Projects from "@/assets/team/cv/github.svg";
import Academic from "@/assets/team/cv/academic.svg";
import Awards from "@/assets/team/cv/awards.svg";
import About from "@/assets/team/cv/about.svg";

export default {
    data() {
        return {
            bg: bg,
            infoList: [
                {
                    title: "Education",
                    icon: Education,
                    color: "rgba(16, 165, 219, 1)",
                    itemList: [
                        {
                            title: "Master, Fuzhou University",
                            time: "2019.09-2022.03",
                            second: "Computer Application Technology",
                            description: "",
                            listDescription: [],
                        },
                        {
                            title: "Bachelor, Fuzhou University",
                            time: "2015.09-2019.07",
                            second: "Software Engineering",
                            description: "",
                            listDescription: [],
                        },
                    ],
                },
                {
                    title: "Projects",
                    icon: Projects,
                    itemList: [
                        {
                            title: "VFluent Components",
                            time: "2020.01-2020.07",
                            second: "Architecture Design and Development",
                            description:
                                "A Vue’s components library based on the Microsoft’s Fluent Design System.",
                            listDescription: [],
                        },
                        {
                            title: "Online Judge System for FZU",
                            time: "2017.09-2019.09",
                            second: "Server Architecture Design, Front-end Design",
                            description:
                                "An online judge system for courses includes Algorithms and Data Structures and Advanced Language Programming. ",
                            listDescription: [],
                        },
                    ],
                },
                {
                    title: "Academic",
                    icon: Academic,
                    color: "rgba(65, 70, 73, 1)",
                    itemList: [
                        {
                            title: "Research Field:",
                            time: "",
                            second: "",
                            description: "Natural Language Inference, ",
                            listDescription: [],
                        },
                        {
                            title: "",
                            time: "",
                            second: "",
                            description: "Named Entity Recognition,  ",
                            listDescription: [],
                        },
                        {
                            title: "",
                            time: "",
                            second: "",
                            description: "Cognitive Graph",
                            listDescription: [],
                        },
                        {
                            title: "Article:",
                            time: "",
                            second: "COLING 2022",
                            description:
                                "PCBERT: Parent and Child BERT for Chinese Few-shot NER",
                            listDescription: [],
                        },
                    ],
                },
                {
                    title: "Awards",
                    icon: Awards,
                    color: "rgba(255, 200, 57, 1)",
                    itemList: [
                        {
                            title: "",
                            time: "",
                            second: "",
                            description: "",
                            listDescription: [
                                "2021 Microsoft Learn Student Ambassador",
                                "Second prize in the national final of 2020 China Collegiate Computing Contest Artificial Intelligence Innovation Contest",
                                "2020 Microsoft Student Partner",
                                "Second prize in the national final of 8th China Students Service Outsourcing Innovation & Entrepreneurship Competition",
                                "Second prize in the national final of 6th China Software Cup Software Design Competition for College Students",
                                "Second prize at the 2019 Pan Pearl River Delta Undergraduate Computer Works Competition",
                            ],
                        },
                    ],
                },
                {
                    title: "About",
                    icon: About,
                    color: "rgba(255, 90, 89, 1)",
                    itemList: [
                        {
                            title: "",
                            time: "",
                            second: "",
                            description:
                                "I am enthusiastic and a team player, I developed lots of projects during my undergraduate years, so I have enough confidence in my practical ability. I am also currently the 2021 Microsoft Learn Student Ambassador and I would be honored if I could join Microsoft.",
                            listDescription: [],
                        },
                    ],
                },
            ],
        };
    },
};
</script>

<style lang="scss">
.cv-container {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .cv-banner {
        position: absolute;
        width: 100%;
        height: 400px;
        background-size: cover;
        display: flex;
        justify-content: flex-end;
        align-items: center;

        .co {
            width: auto;
            height: 100%;
            backdrop-filter: blur(25px);
            -webkit-backdrop-filter: blur(25px);
        }
    }

    .banner-info {
        position: relative;
        width: 100%;
        height: 350px;
        margin-top: 100px;
        display: flex;
        align-items: center;

        .avatar {
            height: 200px;
            margin-left: 20px;
            border-radius: 12px;
        }

        .campus {
            position: absolute;
            left: 250px;
            top: -80px;
            width: 200px;
            height: auto;
        }

        .right-info {
            position: relative;
            height: 100%;
            flex: 1;
            padding-left: 80px;
            padding-top: 80px;
            box-sizing: border-box;
            line-height: 1.5;
            display: flex;
            flex-direction: column;
            align-items: flex-start;

            .name {
                font-size: 28px;
                font-weight: 600;
            }

            .org {
                font-size: 18px;
                color: rgba(0, 116, 160, 1);
            }

            .contact {
                position: relative;
                width: 100%;
                margin-top: 35px;
                display: flex;
                flex-direction: column;

                .item {
                    margin-top: 15px;
                    display: flex;
                    align-items: center;

                    .icon {
                        width: 15px;
                        height: auto;
                    }

                    .text {
                        margin-left: 15px;
                        font-size: 16px;
                        color: rgba(0, 116, 160, 1);
                    }
                }
            }
        }
    }

    .info-block-list {
        position: relative;
        flex: 1;
        width: 100%;
        padding-left: 15px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        overflow: auto;
        overflow-x: hidden;

        .info-block {
            position: relative;
            width: 100%;
            display: flex;

            .title-block {
                width: 180px;
                height: 35px;
                display: flex;
                align-items: center;

                .icon {
                    width: 35px;
                    user-select: none;
                }

                p {
                    margin-left: 15px;
                    font-size: 20px;
                    font-weight: bold;
                    user-select: none;
                }
            }

            .info-content-list {
                position: relative;
                width: 100%;
                display: flex;
                flex-direction: column;

                .info-content {
                    position: relative;
                    width: 100%;
                    padding: 0px 25px;
                    margin-bottom: 25px;
                    line-height: 1.5;
                    box-sizing: border-box;

                    .content-top {
                        position: relative;
                        width: 100%;
                        display: flex;
                        justify-content: space-between;

                        .t {
                            font-size: 20px;
                            font-weight: bold;
                        }

                        .time {
                            font-family: "华文琥珀";
                            font-size: 18px;
                            font-weight: bold;
                            color: rgba(95, 95, 95, 1);
                        }
                    }

                    .second {
                        position: relative;
                        width: 100%;
                        font-weight: bold;
                        color: rgba(46, 116, 181, 1);
                        text-align: left;
                    }

                    .description {
                        position: relative;
                        width: 100%;
                        font-size: 15px;
                        color: rgba(95, 95, 95, 1);
                        white-space: pre-wrap;
                        text-align: left;
                    }

                    .list-description {
                        position: relative;
                        width: 100%;
                        padding-left: 15px;
                        font-size: 15px;
                        font-weight: bold;
                        box-sizing: border-box;
                        line-height: 2;
                        text-align: left;
                    }
                }
            }
        }
    }
}

@media screen and (max-width: 768px) {
    .cv-container {
        .cv-banner {
            height: 450px;

            .co {
                width: auto;
                height: 100px;
            }
        }

        .banner-info {
            flex-direction: column;

            .avatar {
                height: 80px;
                margin-left: 0px;
                margin-top: 120px;
                border-radius: 12px;
            }

            .campus {
                position: absolute;
                left: 25px;
                top: 60px;
                width: 120px;
                height: auto;
            }

            .right-info {
                padding-left: 30px;
                padding-top: 30px;
                line-height: 1.5;

                .name {
                    font-size: 18px;
                    font-weight: 600;
                }

                .org {
                    font-size: 12px;
                    color: rgba(0, 116, 160, 1);
                }

                .contact {
                    margin-top: 5px;
                    flex-direction: row;

                    .item {
                        .icon {
                            width: 12px;
                        }

                        .text {
                            margin-left: 3px;
                            font-size: 12px;
                        }

                        &:first-child {
                            margin-right: 15px;
                        }
                    }
                }
            }
        }

        .info-block-list {
            .info-block {
                flex-direction: column;

                .title-block {
                    height: 50px;
                }

                .info-content-list {
                    .info-content {
                        .content-top {
                            .t {
                                font-size: 15px;
                            }

                            .time {
                                font-size: 12px;
                            }
                        }

                        .second {
                            font-size: 12px;
                        }

                        .description {
                            font-size: 12px;
                        }

                        .list-description {
                            font-size: 12px;
                        }
                    }
                }
            }
        }
    }
}
</style>
<template>
    <div class="team-container">
        <div class="team-banner" @click="$Go('/')">
            <img
                src="@/assets/logo/logo.png"
                class="logo"
                draggable="false"
                width="110"
                height="58"
                alt
                ondragstart="return false;"
                oncontextmenu="return false;"
            />
            <p class="team-title">Team CV</p>
        </div>
        <div class="team-pivot">
            <fv-pivot :items="team"></fv-pivot>
        </div>
        <router-view />
    </div>
</template>

<script>
export default {
    data() {
        return {
            team: [
                {
                    key: 0,
                    name: "Lai Peichao",
                    width: 120,
                    show: true,
                    disabled: false,
                },
            ],
        };
    },
};
</script>

<style lang="scss">
.team-container {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .team-banner {
        position: relative;
        width: 100%;
        height: 100px;
        display: flex;
        align-items: center;
        z-index: 2;

        .logo {
            width: auto;
            height: 50px;
            margin: 0px 25px;
            z-index: 2;
        }

        .team-title {
            height: 100px;
            font-size: 24px;
            font-weight: bold;
            color: rgba(231, 105, 159, 1);
            user-select: none;
            display: flex;
            align-items: center;
        }
    }

    .team-pivot
    {
        position: relative;
        width: 100%;
        height: auto;
        padding: 0px 15px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        z-index: 2;
    }
}
</style>
<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
import i18n from "@/js/i18n.js";

import { mapMutations } from "vuex";

export default {
	name: "App",
	data() {
		return {
			timer: {
				screenWidth: null,
			},
		};
	},
	watch: {
		$route() {
			this.refreshInfo();
		},
	},
	mounted() {
		this.i18nInit();
		this.timerInit();
		this.refreshInfo();
	},
	methods: {
		...mapMutations({
			reviseI18N: "reviseI18N",
			setScreenWidth: "setScreenWidth",
		}),
		...mapMutations("user", {
			setUserInfo: "setUserInfo",
			setAvatar: "setAvatar",
		}),
		i18nInit() {
			this.reviseI18N(i18n);
		},
		refreshInfo() {
			this.$axios({
				method: "get",
				url: `/info_me`,
			})
				.then((res) => {
					if (res.data.code === 200) {
						let data = res.data.data;
						this.setUserInfo({
							status: true,
							...data,
						});
						this.getAvatar();
					}
				})
				.catch((err) => {
					console.log(err);
				});
		},
		getAvatar() {
			this.$axios({
				method: "get",
				url: `/me/avatar`,
			})
				.then((res) => {
					res = res.data;
					if (res.code === 200) this.setAvatar(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
		},
		timerInit() {
			this.clearTimer();
			this.timer.screenWidth = setInterval(() => {
				this.setScreenWidth(document.body.clientWidth);
			}, 300);
		},
		clearTimer() {
			for (let key in this.timer) {
				clearInterval(this.timer[key]);
			}
		},
	},
	beforeDestroy() {
		this.clearTimer();
	},
};
</script>

<style lang="scss">
* {
	margin: 0px;
	padding: 0px;
	box-sizing: border-box;
}

body {
	position: fixed;
	left: 0px;
	top: 0px;
	width: 100%;
	height: 100%;
	overflow: hidden;
}

/*定义滚动条高宽及背景
 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
	width: 5px;
	height: 5px;

	&:hover {
		width: 10px;
	}
}

/*定义滚动条轨道
 内阴影+圆角*/
::-webkit-scrollbar-track {
	border-radius: 10px;
}

/*定义滑块
 内阴影+圆角*/
::-webkit-scrollbar-thumb {
	border-radius: 10px;
	background-color: #bfbebd;
	cursor: pointer;

	&:hover {
		width: 16px;
	}
}
</style>

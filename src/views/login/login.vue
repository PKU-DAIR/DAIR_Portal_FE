<template>
	<div class="login-block">
		<transition name="scale-up-to-up">
			<fv-progress-bar
				v-show="login.lock"
				:loading="true"
				foreground="#FF8B00"
				style="position: absolute; left: 0px; top: 0px; width: 100%"
			></fv-progress-bar>
		</transition>
		<div class="main-block">
			<span v-show="false" class="border-top"></span>
			<div class="s1">
				<p class="main-title">
					<img src="@/assets/logo/pku_dair.svg" alt />
				</p>
				<fv-text-box
					theme="dark"
					v-model="user.identity"
					placeholder="User ID (Letter, Number or Email)"
					borderWidth="2"
					:revealBorder="true"
					:border-radius="6"
					border-color="rgba(200, 200, 200, 0.1)"
					focusBorderColor="rgba(221, 151, 45, 0.1)"
					:is-box-shadow="true"
					background="rgba(120, 120, 120, 0.7)"
					style="width: 90%; height: 50px; margin-top: 35px"
					@keyup="handleEnter"
				></fv-text-box>
				<fv-text-box
					theme="dark"
					v-model="user.password"
					placeholder="密码"
					type="password"
					borderWidth="2"
					:revealBorder="true"
					:border-radius="6"
					border-color="rgba(200, 200, 200, 0.1)"
					focusBorderColor="rgba(221, 151, 45, 0.1)"
					:is-box-shadow="true"
					background="rgba(120, 120, 120, 0.7)"
					style="width: 90%; height: 50px; margin-top: 15px"
					@keyup="handleEnter"
				></fv-text-box>
				<fv-button
					background="linear-gradient(45deg, #ec008c, #da4453)"
					theme="dark"
					borderRadius="6"
					fontSize="16"
					fontWeight="600"
					:is-box-shadow="true"
					style="width: 90%; height: 40px; margin-top: 20px"
					:disabled="login.lock"
					@click="handleLogin"
					>Login</fv-button
				>
				<div class="s2">
					<p class="to-apply">Forgot</p>
					<p class="to-apply" style="margin: 0px 8px">·</p>
					<p class="to-apply" @click="$Go('/login/apply')">
						No Account Yet ?
					</p>
				</div>
			</div>
		</div>
		<div class="s3">
			<p>Terms and Conditions · Privacy Policy</p>
		</div>
	</div>
</template>

<script>
import axios from "@/api/config.js";

import { mapMutations } from "vuex";

export default {
	name: "DAIRLogin",
	data() {
		return {
			user: {
				identity: "",
				password: "",
				verify: "",
			},
			login: {
				lock: false,
				verify: false,
			},
		};
	},
	mounted() {},
	methods: {
		...mapMutations("user", {
			setUserInfo: "setUserInfo",
		}),
		async handleLogin() {
			this.login.lock = true;
			axios
				.post("/login", {
					userid: this.user.identity,
					pwd: this.user.password,
				})
				.then((res) => {
					if (res.data.code !== 200) {
						this.$barWarning(res.data.message, {
							status: "warning",
						});
						this.login.lock = false;
					} else {
						let data = res.data.data;
						localStorage.setItem("ApiToken", data.token);
						localStorage.setItem("ApiTokenExpiredAt", data.exp);
						this.setUserInfo({
							status: true,
							...data,
						});
						this.$barWarning("Login Success", {
							status: "correct",
						});
						let return_url = this.$route.query.return_url
							? this.$route.query.return_url
							: "/";
						this.$Go(`${return_url}`);
						this.login.lock = false;
					}
				})
				.catch((err) => {
					this.$barWarning(err, {
						status: "error",
					});
					this.login.lock = false;
				});
		},
		handleEnter(event) {
			if (event.keyCode == 13) this.handleLogin();
		},
	},
};
</script>

<style lang="scss" scoped>
.login-block {
	@include FullRelative;
	@include HcenterVcenterC;

	flex: 1;

	.main-block {
		@include HcenterVcenterC;

		position: relative;
		width: 450px;
		height: 450px;
		background: rgba(0, 0, 0, 1);
		border: rgba(90, 90, 90, 0.1) solid thin;
		border-radius: 8px;
		box-shadow: 0 0px 3px 0 rgba(54, 60, 85, 0.05),
			0 0px 3px 0 rgba(66, 73, 21, 0.22);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		overflow: hidden;

		.border-top {
			position: relative;
			width: 100%;
			height: 6px;
			background: linear-gradient(to right, #d38312, #a83279);
		}

		.s1 {
			@include FullRelative;
			@include HcenterC;

			flex: 1;
			padding: 25px;

			.main-title {
				@include color-orange-pink;

				font-weight: 400;

				img {
					width: auto;
					height: 50px;
				}
			}

			.identity-field {
				width: 90%;
				height: 60px;
				margin-top: 45px;
				display: flex;
			}

			.s2 {
				@include HcenterVcenter;

				margin-top: 25px;

				.to-apply {
					@include a-link;
				}
			}
		}
	}

	.s3 {
		@include a-link;

		margin-top: 35px;
		font-size: 12px;
	}
}

.swipe-left-enter-active {
	animation: swipe-left 0.5s linear;
}

.swipe-left-leave-active {
	animation: swipe-left 0.5s linear reverse;
}

.swipe-right-enter-active {
	animation: swipe-left 0.5s linear;
}

.swipe-right-leave-active {
	animation: swipe-left 0.5s linear reverse;
}

@keyframes swipe-left {
	0% {
		width: 0;
	}
	100% {
		width: 100%;
	}
}
</style>

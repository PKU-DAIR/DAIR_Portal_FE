<template>
	<div class="personal-info-container" :class="[{ dark: theme === 'dark' }]">
		<div class="block-1">
			<div style="width: 100%; display: flex; flex-direction: column">
				<fv-persona
					:src="avatar ? avatar : ''"
					size="60"
					:theme="theme"
					:name="obj.name ? obj.name : obj.userid"
					:showInfo="true"
					@click.native="showAvatar = true"
				>
					<template v-slot:name>
						<p>{{ obj.name ? obj.name : obj.userid }}</p>
					</template>
					<template v-slot:secondary>
						<span class="email-info">
							<i class="ms-Icon ms-Icon--Mail"></i>
							<p style="margin-left: 5px">{{ obj.email }}</p>
						</span>
					</template>
				</fv-persona>
			</div>
			<div
				style="
					width: 100%;
					margin-top: 15px;
					display: flex;
					flex-direction: column;
				"
			>
				<div class="personal-info-block">
					<div v-show="isAdmin" class="row">
						<p class="s1">{{ local("Admin") }}</p>
						<fv-button
							theme="dark"
							:background="gradient"
							:is-box-shadow="true"
							style="width: 200px"
							@click="$Go('/a')"
							>{{ local("Admin Console") }}</fv-button
						>
					</div>
					<div class="row">
						<p class="s1">{{ local("Email") }}</p>
						<input
							class="info-unit-edit"
							:disabled="!isedit"
							ref="nameinput"
							v-model="obj.email"
						/>
					</div>
					<div class="row">
						<p class="s1">{{ local("Name") }}</p>
						<input
							class="info-unit-edit"
							:disabled="!isedit"
							v-model="obj.name"
						/>
					</div>
					<div class="row">
						<p class="s1">{{ local("Phone") }}</p>
						<input
							class="info-unit-edit"
							:disabled="!isedit"
							ref="nameinput"
							v-model="obj.phone"
						/>
					</div>
					<div class="row">
						<p class="s1">{{ local("Gender") }}</p>
						<fv-combobox
							v-model="currentOption"
							:theme="theme"
							:options="genderList"
							:disabled="!isedit"
							placeholder="Select Gender"
						>
						</fv-combobox>
					</div>
					<div v-show="false" class="row">
						<p class="s1">{{ local("Theme") }}</p>
						<fv-toggle-switch
							:width="70"
							:height="30"
							:switch-on-background="color"
							:on="local('Dark')"
							:off="local('Light')"
							:inside-content="true"
							@toggle="
								() => {
									$nextTick(() => {
										setInformation();
									});
								}
							"
						></fv-toggle-switch>
					</div>
					<div class="row">
						<p class="s1">{{ local("Apply Time") }}</p>
						<input
							class="info-unit-edit"
							disabled="true"
							:value="
								$SDate.Format(
									'YYYY-mm-dd HH:MM',
									new Date(obj.apply_time)
								)
							"
						/>
					</div>
					<div class="row">
						<p class="s1">{{ local("Last Login") }}</p>
						<input
							class="info-unit-edit"
							disabled="true"
							:value="
								$SDate.Format(
									'YYYY-mm-dd HH:MM',
									new Date(obj.last_login)
								)
							"
						/>
					</div>
					<div class="row">
						<p class="s1">{{ local("Change Password") }}</p>
						<input
							placeholder="Input Old Password"
							class="info-unit-edit"
							v-model="oriPwd"
							type="password"
							style="margin-top: 3px"
						/>
						<input
							placeholder="Input New Password"
							class="info-unit-edit"
							v-model="newPwd"
							type="password"
							style="margin-top: 3px"
						/>
						<input
							placeholder="Confirm New Password"
							class="info-unit-edit"
							v-model="confirmPwd"
							type="password"
							style="margin-top: 3px"
						/>
						<fv-button
							v-show="!isedit"
							theme="dark"
							:background="gradient"
							:border-radius="6"
							:is-box-shadow="true"
							:disabled="
								!lock.changePwd ||
								!oriPwd ||
								!newPwd ||
								!confirmPwd
							"
							style="width: 250px; margin-top: 15px"
							@click="changePwd"
							>{{ local("Change Password") }}</fv-button
						>
					</div>
				</div>
			</div>
			<div
				style="
					width: 100%;
					display: flex;
					justify-content: space-around;
					margin-top: 25px;
				"
			>
				<fv-button
					v-show="!isedit"
					theme="dark"
					:background="gradient"
					:border-radius="6"
					:is-box-shadow="true"
					style="width: 250px"
					@click="isedit = true"
					>{{ local("Edit") }}</fv-button
				>
				<fv-button
					v-show="isedit"
					theme="dark"
					:background="color"
					:border-radius="6"
					:is-box-shadow="true"
					style="width: 250px"
					@click="setInformation()"
					>{{ local("Accept Changes") }}</fv-button
				>
			</div>
			<fv-panel
				v-model="showAvatar"
				:title="local('Revise Avatar')"
				width="350px"
				height="auto"
				:theme="theme"
				:background="
					theme === 'dark'
						? 'rgba(50, 50, 50, 0.8)'
						: 'rgba(255, 255, 255, 0.6)'
				"
				title-size="13.8"
				:is-central-side="true"
				:is-acrylic="true"
				:is-footer="true"
			>
				<template v-slot:container>
					<div class="panel-container">
						<choose-avatar
							ref="avatar"
							@update-img="cuttingAvatar = $event"
						>
						</choose-avatar>
					</div>
				</template>
				<template v-slot:footer>
					<fv-button
						theme="dark"
						:background="color"
						:disabled="!lock.avatar || !cuttingAvatar"
						style="width: 120px"
						@click="UploadAvatar"
						>{{ local("Confirm") }}</fv-button
					>
					<fv-button
						:theme="theme"
						style="width: 120px; margin-left: 5px"
						@click="showAvatar = false"
						>{{ local("Cancel") }}</fv-button
					>
				</template>
			</fv-panel>
		</div>
	</div>
</template>

<script>
import defaultAvatar from "@/assets/logo/pku_dair.svg";
import chooseAvatar from "@/components/general/profile/chooseAvatar.vue";

import { mapGetters, mapState, mapMutations } from "vuex";

export default {
	name: "u_info",
	components: {
		chooseAvatar,
	},
	props: {
		refresh: {
			default: false,
		},
	},
	data() {
		return {
			obj: {
				id: "",
				username: "",
				name: "",
			},
			img: {
				defaultAvatar: defaultAvatar,
			},
			currentOption: { key: "male", value: "male", text: "Male" },
			genderList: [
				{ key: "male", value: "male", text: "Male" },
				{ key: "female", value: "female", text: "Female" },
			],
			isedit: false,
			cuttingAvatar: null,
			oriPwd: "",
			newPwd: "",
			confirmPwd: "",
			showAvatar: false,
			lock: {
				avatar: true,
				changePwd: true,
			},
		};
	},
	watch: {
		refresh() {
			this.getInformation();
		},
	},
	computed: {
		...mapGetters(["local"]),
		...mapGetters("Theme", ["color", "gradient", "theme"]),
		...mapState({
			userInfo: (state) => state.user.info,
			userAvatar: (state) => state.user.avatar,
		}),
		isAdmin() {
			if (!this.userInfo || !this.userInfo.role) return;
			let index = this.userInfo.role.indexOf("admin");
			return index >= 0;
		},
		avatar() {
			if (!this.userAvatar) return this.img.defaultAvatar;
			return this.userAvatar;
		},
	},
	mounted() {
		this.getInformation();
	},
	methods: {
		...mapMutations("Theme", {
			reviseTheme: "reviseTheme",
		}),
		...mapMutations("user", {
			setUserInfo: "setUserInfo",
			setAvatar: "setAvatar",
		}),
		getInformation() {
			this.$axios({
				method: "get",
				url: `/info_me`,
			})
				.then((res) => {
					if (res.data.code === 200) {
						let data = res.data.data;
						this.obj = data;
						this.currentOption = this.genderList.find(
							(it) => it.value === this.obj.gender
						);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		},
		async setInformation() {
			await this.$axios
				.post("/update_me", {
					name: this.obj.name,
					gender: this.currentOption.key,
					email: this.obj.email,
					phone: this.obj.phone,
				})
				.then((data) => {
					data = data.data;
					if (data.code === 200) {
						this.isedit = false;
					}
				})
				.catch((err) => {
					this.$barWarning(this.local("Update Failed") + err, {
						status: "error",
					});
				});
		},
		UploadAvatar() {
			if (!this.lock.avatar) {
				this.$barWarning(this.local("Uploading"), {
					status: "warning",
				});
				return;
			}
			if (!this.cuttingAvatar)
				this.$barWarning(this.local("No Picture Selected"), {
					status: "warning",
				});
			else {
				this.lock.avatar = false;
				let formData = new FormData();
				formData.append("user_avatar", this.cuttingAvatar);
				this.$axios
					.post("/upload_avatar", formData, {
						onUploadProgress: (progressEvent) => {
							// 计算上传进度百分比
							const percentCompleted = Math.round(
								(progressEvent.loaded * 100) /
									progressEvent.total
							);
							console.log(percentCompleted);
						},
					})
					.then((data) => {
						data = data.data;
						if (data.status === "success") {
							this.$barWarning(
								this.local("Successfully Revised Avatar"),
								{
									status: "correct",
								}
							);
							this.showAvatar = false;
							this.getAvatar();
						} else {
							this.$barWarning(data.message, {
								status: "warning",
							});
						}
						this.lock.avatar = true;
					})
					.catch((err) => {
						this.$barWarning(err, {
							status: "error",
						});
						this.lock.avatar = true;
					});
			}
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
		async changePwd() {
			if (!this.oriPwd) {
				this.$barWarning(this.local("Input old password"), {
					status: "warning",
				});
				return;
			}
			if (
				!this.newPwd ||
				!this.confirmPwd ||
				this.newPwd !== this.confirmPwd
			) {
				this.$barWarning(
					this.local(
						"Please confirm your new password is consistant."
					),
					{
						status: "warning",
					}
				);
				return;
			}
			if (!this.lock.changePwd) return;
			this.lock.changePwd = false;
			await this.$axios
				.post("/update_pwd", {
					pwd: this.oriPwd,
					confirm_pwd: this.confirmPwd,
				})
				.then((data) => {
					data = data.data;
					if (data.code === 200) {
						this.$barWarning(this.local("Successfully Updated"), {
							status: "correct",
						});
						this.oriPwd = "";
						this.newPwd = "";
						this.confirmPwd = "";
					} else {
						this.$barWarning(data.message, {
							status: "warning",
						});
					}
					this.lock.changePwd = true;
				})
				.catch((err) => {
					this.$barWarning(this.local("Update Failed") + err, {
						status: "error",
					});
					this.lock.changePwd = true;
				});
		},
	},
};
</script>

<style lang="scss">
.personal-info-container {
	position: relative;
	width: 100%;
	height: 100%;
	padding: 0px calc(50% - 640px);
	box-sizing: border-box;
	display: flex;
	justify-content: flex-start;
	align-items: center;

	&.dark {
		.personal-info-block {
			div {
				&.row {
					.s1 {
						color: whitesmoke;
					}

					&:hover {
						background: rgba(90, 90, 90, 0.1);
						box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.1);
					}
				}
			}
		}

		input.info-unit-edit,
		textarea.info-unit-edit {
			background: rgba(36, 36, 36, 1);
			color: rgba(245, 245, 245, 0.79);
		}
	}

	.block-1 {
		position: relative;
		width: 100%;
		height: 100%;
		padding: 18px;
		box-sizing: border-box;
		overflow: auto;

		.control-banner {
			@include Vcenter;

			font-size: 24px;
		}

		.email-info {
			@include Vcenter;

			margin-top: 5px;
		}
	}

	.personal-info-block {
		position: relative;
		width: 100%;
		line-height: 2.5;
		div {
			&.row {
				position: relative;
				width: 100%;
				height: auto;
				flex: 1;
				padding: 8px;
				border-radius: 6px;
				box-sizing: border-box;
				transition: all 0.3s;

				&:hover {
					background: white;
					box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.1);
				}
				.s1 {
					width: 100%;
					font-size: 15px;
					font-weight: bold;
					color: rgba(75, 75, 75, 1);
					display: flex;
					align-items: center;
				}

				.row-block {
					@include Vcenter;

					.top-up-btn {
						height: 45px;
						margin: 5px 5px 5px 0px;
					}
				}

				.Ali-pay-block {
					@include HcenterVcenter;

					position: relative;
					width: 100%;
					height: 200px;
					margin-top: 5px;
				}
			}
		}
		.info-gender {
			margin: 0px 5px;
			font-size: 24px;
			display: flex;
			align-items: center;
			transition: all 0.3s;
			&.choose {
				font-weight: bold;
			}
		}
	}

	input.info-unit-edit,
	textarea.info-unit-edit {
		width: 100%;
		height: 45px;
		padding: 5px;
		background: white;
		border: rgba(0, 0, 0, 0.05) solid thin;
		border-bottom: rgba(0, 98, 158, 0.6) solid thin;
		border-width: 2px;
		color: rgba(36, 36, 36, 1);
		border-radius: 3px;
		outline: none;
		box-sizing: border-box;
		box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
		transition: all 0.3s;
	}
	input.info-unit-edit:disabled:hover,
	textarea.info-unit-edit:disabled:hover {
		color: rgba(0, 90, 158, 1);
	}
	input.info-unit-edit:disabled,
	textarea.info-unit-edit:disabled {
		padding: 0px;
		background: transparent;
		border: thin;
		border-bottom: rgba(0, 98, 158, 0) solid thin;
		box-sizing: border-box;
		box-shadow: none;
		cursor: pointer;
	}
}

.panel-container {
	position: relative;
	width: 100%;
	height: 100%;
	padding: 15px 15px 55px 15px;
	color: rgba(28, 30, 41, 1);
	font-family: Akkurat Std, -apple-system, BlinkMacSystemFont, Segoe UI,
		Roboto, Oxygen, Ubuntu, Cantarell, Helvetica Neue, sans-serif;
	font-weight: 400;

	.panel-title {
		font-size: 12px;
	}
}

.show-top-to-bottom-enter-active,
.show-top-to-bottom-leave-active {
	transform-origin: 50% 0%;
	transition: all 0.3s;
}

.show-top-to-bottom-enter, .show-top-to-bottom-leave-to
/* .show-enter-active, .show-leave-active */ {
	opacity: 0;
	max-height: 0px;
	transform: scaleY(0);
}

.show-top-to-bottom-enter-to, .show-top-to-bottom-leave
/* .show-enter-to, .show-leave */ {
	opacity: 1;
	max-height: auto;
	transform: scaleY(1);
}
</style>

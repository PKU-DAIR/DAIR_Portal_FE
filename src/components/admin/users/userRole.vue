<template>
	<fv-panel
		v-model="thisValue"
		:theme="theme"
		:title="local('User Roles')"
		width="450px"
		height="auto"
		background="rgba(36, 36, 36, 0.6)"
		title-size="13.8"
		:is-central-side="true"
		:is-acrylic="true"
		:is-footer="true"
	>
		<template v-slot:container>
			<div class="panel-container">
				<div class="panel-row">
					<fv-persona
						:src="userAvatar"
						size="35"
						:name="user.userid"
						:showInfo="true"
						@click.native="showAvatar = true"
					>
						<template v-slot:name>
							<p style="text-align: left">{{ user.userid }}</p>
						</template>
						<template v-slot:secondary>
							<span class="email-info">
								<i class="ms-Icon ms-Icon--Mail"></i>
								<p style="margin-left: 5px">{{ user.email }}</p>
							</span>
						</template>
					</fv-persona>
				</div>
				<div class="panel-row" style="margin-top: 25px">
					<p class="panel-title">
						{{ user.userid + " " + local("User Role") }}
					</p>
				</div>
				<div
					class="panel-row"
					v-for="(item, index) in rolesList"
					:key="item.id + index"
					style="margin-top: 15px"
				>
					<fv-check-box
						v-model="item.selected"
						:theme="theme"
						:background="color"
						:disabled="!lock.role"
						@click="checkBoxClick($event, item)"
						>{{ item.name }}</fv-check-box
					>
				</div>
			</div>
		</template>
		<template v-slot:footer>
			<fv-button
				:theme="theme"
				style="width: 120px; margin-left: 5px"
				@click="thisValue = false"
				>{{ local("Cancel") }}</fv-button
			>
		</template>
	</fv-panel>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	props: {
		value: {
			default: false,
		},
		user: {
			default: () => ({}),
		},
	},
	data() {
		return {
			thisValue: this.value,
			userAvatar: "",
			rolesList: [],
			userRoles: [],
			lock: {
				role: true,
			},
		};
	},
	watch: {
		value(val) {
			this.thisValue = val;
		},
		thisValue(val) {
			this.$emit("input", val);
		},
		user() {
			this.getUserAvatar();
			this.getUserRoles();
		},
	},
	computed: {
		...mapGetters(["local"]),
		...mapGetters("Theme", ["color", "gradient", "theme"]),
	},
	mounted() {
		this.getRoles();
	},
	methods: {
		getRoles() {
			this.$axios({
				method: "get",
				url: "/user/get_users_roles",
			})
				.then((res) => {
					res = res.data;
					let rolesList = res.data;
					for (let item of rolesList) {
						item.selected = false;
					}
					this.rolesList = rolesList;
				})
				.catch((err) => {
					this.$barWarning(
						this.local("User Roles List Fetch Failed" + err),
						{
							status: "error",
						}
					);
				});
		},
		getUserRoles() {
			let role = this.user.role;
			if (!role) this.userRoles = ["user"];
			this.userRoles = role.split(",");
			for (let i = 0; i < this.rolesList.length; i++) {
				let item = this.rolesList[i];
				let index = this.userRoles.findIndex((it) => it === item.id);
				if (index >= 0) {
					item.selected = true;
					this.$set(this.rolesList, i, item);
				} else {
					item.selected = false;
					this.$set(this.rolesList, i, item);
				}
			}
		},
		getUserAvatar() {
			this.$axios({
				method: "get",
				url: `/user/avatar?id=${this.user.userid}`,
			})
				.then((res) => {
					res = res.data;
					if (res.code === 200) this.userAvatar = res.data;
				})
				.catch((err) => {
					console.log(err);
				});
		},
		checkBoxClick(event, item) {
			let index = this.rolesList.indexOf(item);
			if (!this.lock.role) return;
			this.lock.role = false;
			if (event) {
				this.$axios
					.post("/add/role", {
						userid: this.user.userid,
						role: item.id,
					})
					.then((res) => {
						res = res.data;
						if (res.code === 200) {
							this.lock.role = true;
						} else {
							item.selected = !event;
							this.$set(this.rolesList, index, item);
						}
					})
					.catch((err) => {
						this.lock.role = true;
						this.$barWarning(err, {
							status: "error",
						});
					});
			} else {
				this.$axios
					.post("/del/role", {
						userid: this.user.userid,
						role: item.id,
					})
					.then((res) => {
                        res = res.data;
						if (res.code === 200) {
							this.lock.role = true;
						} else {
							item.selected = !event;
							this.$set(this.rolesList, index, item);
						}
					})
					.catch((err) => {
						this.lock.role = true;
						this.$barWarning(err, {
							status: "error",
						});
					});
			}
		},
	},
};
</script>

<style lang="scss">
.panel-container {
	position: relative;
	width: 100%;
	height: 100%;
	padding: 15px 15px 55px 15px;
	color: rgba(28, 30, 41, 1);
	font-family: Akkurat Std, -apple-system, BlinkMacSystemFont, Segoe UI,
		Roboto, Oxygen, Ubuntu, Cantarell, Helvetica Neue, sans-serif;
	font-weight: 400;
	line-height: 2;
	border-radius: 6px;

	.panel-title {
		font-size: 12px;
	}

	.panel-row {
		position: relative;
		margin: 10px 0px;
		padding: 0px 5px;
		display: flex;
		align-items: center;

		.email-info {
			@include Vcenter;

			margin-top: 5px;
		}

		.panel-title {
			font-size: 15px;
			font-weight: bold;
		}
	}
}
</style>

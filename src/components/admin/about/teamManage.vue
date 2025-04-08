<template>
	<fv-panel
		v-model="thisValue"
		:title="'团队管理'"
		width="550px"
		height="auto"
		:theme="theme"
		:background="
			theme === 'dark'
				? 'rgba(36, 36, 36, 0.8)'
				: 'rgba(255, 255, 255, 0.6)'
		"
		title-size="13.8"
		:is-central-side="true"
		:is-acrylic="true"
		:is-footer="true"
	>
		<template v-slot:container>
			<div
				class="member-info-options-container"
				:class="[{ dark: theme === 'dark' }]"
			>
				<div class="c-row">
					<p class="team-title">团队列表</p>
				</div>
				<div class="c-row main-table">
					<fv-Collapse
						v-for="(item, index) in objs"
						:key="index"
						:theme="theme"
						:title="item.name"
						:content="item.id"
						:icon="'People'"
						:disabledCollapse="!item.show"
						style="margin: 3px"
					>
						<div class="r-row">
							<fv-text-box
								v-model="groupName"
								underline
								:placeholder="'输入分组名称 (尾部+$[数字]可排序)'"
								:theme="theme"
								:border-width="2"
								:border-color="'transparent'"
								:focus-border-color="'rgba(0, 90, 158, 1)'"
								:is-box-shadow="true"
								:left-icon="'Group'"
								style="height: 35px; margin: 15px 5px"
								@keyup.enter="updateTeamGroup(item, groupName)"
							></fv-text-box>
							<fv-button
								theme="dark"
								:background="'rgba(0, 90, 158, 1)'"
								borderRadius="6"
								icon="Add"
								:disabled="groupName && !lock.add"
								:is-box-shadow="true"
								style="
									width: 120px;
									height: 35px;
									margin-left: 5px;
								"
								@click="updateTeamGroup(item, groupName)"
							>
								添加组别
							</fv-button>
						</div>
						<div v-if="item.groups">
							<fv-Collapse
								v-for="(group, index) in item.groups"
								:key="index"
								:theme="theme"
								:title="group.name"
								:content="`已展示在团队: ${item.name}`"
								:icon="'Group'"
								:disabledCollapse="true"
								style="margin: 3px"
							>
								<template v-slot:extension>
									<fv-button
										theme="dark"
										background="rgba(173, 38, 45, 1)"
										icon="Delete"
										:disabled="!item.lock"
										:is-box-shadow="true"
										style="margin-left: 5px"
										@click="
											updateTeamGroup(
												item,
												group.name,
												true
											)
										"
										>删除</fv-button
									>
								</template>
							</fv-Collapse>
						</div>

						<template v-slot:extension>
							<fv-button
								theme="dark"
								:background="
									item.show
										? 'rgba(0, 120, 120, 1)'
										: '#FF8B00'
								"
								:disabled="!item.lock"
								:is-box-shadow="true"
								@click="
									($event) => {
										$event.stopPropagation();
										updateClientTeam(item);
									}
								"
								>{{
									item.show ? "取消展示" : "展示"
								}}</fv-button
							>
							<fv-button
								theme="dark"
								background="rgba(173, 38, 45, 1)"
								icon="Delete"
								:disabled="!item.lock"
								:is-box-shadow="true"
								style="margin-left: 5px"
								@click="removeTeam(item)"
								>删除</fv-button
							>
						</template>
					</fv-Collapse>
				</div>
				<div class="c-row">
					<p class="team-title" style="margin-top: 15px">添加团队</p>
					<div class="r-row">
						<fv-text-box
							v-model="teamName"
							underline
							:placeholder="'输入团队名称'"
							:theme="theme"
							:border-width="2"
							:border-color="'transparent'"
							:focus-border-color="'rgba(0, 90, 158, 1)'"
							:is-box-shadow="true"
							:left-icon="'People'"
							style="height: 35px; margin: 15px 0px"
							@keyup.enter="addTeam"
						></fv-text-box>
						<fv-button
							theme="dark"
							:background="'rgba(0, 90, 158, 1)'"
							borderRadius="6"
							icon="Add"
							:disabled="teamName && !lock.add"
							:is-box-shadow="true"
							style="width: 120px; height: 35px; margin-left: 5px"
							@click="addTeam"
						>
							添加团队
						</fv-button>
					</div>
				</div>
			</div>
		</template>
		<template v-slot:footer>
			<fv-button
				:theme="theme"
				style="width: 120px; margin-left: 5px"
				@click="thisValue = false"
				>关闭</fv-button
			>
		</template>
	</fv-panel>
</template>

<script>
export default {
	props: {
		value: {
			default: () => false,
		},
		model: {
			default: () => ({}),
		},
		theme: {
			default: "light",
		},
	},
	data() {
		return {
			thisValue: this.value,
			objs: [],
			clientTeams: [],
			teamName: "",
			groupName: "",
			lock: {
				add: true,
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
	},
	computed: {},
	mounted() {
		this.getTeams();
	},
	methods: {
		getTeams() {
			this.$axios({
				method: "get",
				url: "/get_teams",
			})
				.then((data) => {
					data = data.data;
					if (data.status === "success") {
						let objs = data.data;
						objs.forEach((item) => {
							this.$set(item, "lock", true);
						});
						this.objs = objs;
						this.getClientTeams();
					} else
						this.$barWarning(data.message, {
							status: "error",
						});
				})
				.catch((err) => {
					this.$barWarning(err, {
						status: "error",
					});
				});
		},
		addTeam() {
			if (!this.teamName) return;
			if (!this.lock.add) return;
			this.lock.add = false;
			this.$axios
				.post("/add_team", {
					name: this.teamName,
				})
				.then((data) => {
					data = data.data;
					if (data.status === "success") {
						this.$barWarning("添加成功", {
							status: "correct",
						});
						this.getTeams();
						this.teamName = "";
					} else
						this.$barWarning(data.message, {
							status: "error",
						});
				})
				.catch((err) => {
					console.log(err);
					this.$barWarning(err, {
						status: "error",
					});
				})
				.finally(() => {
					this.lock.add = true;
				});
		},
		removeTeam(item) {
			this.$infoBox(`你将移除${item.name}`, {
				title: "确定删除",
				status: "error",
				confirm: () => {
					if (!item.lock) return;
					this.$set(item, "lock", false);
					this.$axios
						.post("/remove_team", { id: item.id })
						.then((data) => {
							data = data.data;
							if (data.status === "success") {
								this.$barWarning("删除成功", {
									status: "correct",
								});
								this.getTeams();
							} else
								this.$barWarning(data.message, {
									status: "error",
								});
						})
						.catch((err) => {
							this.$barWarning(err, {
								status: "error",
							});
						})
						.finally(() => {
							this.$set(item, "lock", true);
						});
				},
			});
		},
		getClientTeams() {
			this.$axios({
				method: "get",
				url: "/get_client_teams",
			})
				.then((data) => {
					data = data.data;
					if (data.status === "success") {
						this.clientTeams = data.data;
						for (let item of this.objs) {
							let cindex = this.clientTeams.findIndex(
								(it) => it.name === item.name
							);
							if (cindex >= 0) {
								item.show = true;
								item.groups = JSON.parse(
									JSON.stringify(
										this.clientTeams[cindex].groups
									)
								);
							} else {
								item.show = false;
								item.groups = [];
							}
							this.$set(this.objs, this.objs.indexOf(item), item);
						}
					}
				})
				.catch((err) => {
					this.$barWarning(err, {
						status: "error",
					});
				});
		},
		updateClientTeam(item) {
			if (!item.name) return;
			if (!this.lock.add) return;
			this.lock.add = false;
			if (!item.show)
				this.$axios
					.post("/add_client_team", {
						id: item.id,
						name: item.name,
						groups: [],
					})
					.then((data) => {
						data = data.data;
						if (data.status === "success") {
							this.$barWarning("添加成功", {
								status: "correct",
							});
							this.getClientTeams();
						} else
							this.$barWarning(data.message, {
								status: "error",
							});
					})
					.catch((err) => {
						console.log(err);
						this.$barWarning(err, {
							status: "error",
						});
					})
					.finally(() => {
						this.lock.add = true;
					});
			else
				this.$axios
					.post("/remove_client_team", {
						id: item.id,
						name: item.name,
					})
					.then((data) => {
						data = data.data;
						if (data.status === "success") {
							this.$barWarning("删除成功", {
								status: "correct",
							});
							this.getClientTeams();
						} else
							this.$barWarning(data.message, {
								status: "error",
							});
					})
					.catch((err) => {
						console.log(err);
						this.$barWarning(err, {
							status: "error",
						});
					})
					.finally(() => {
						this.lock.add = true;
					});
		},
		updateTeamGroup(item, groupName, isDel = false) {
			if (!item.name) return;
			if (!groupName) return;
			if (!this.lock.add) return;
			this.lock.add = false;
			let groups = item.groups;
			if (!groups) groups = [];
			if (isDel) {
				let index = groups.findIndex((it) => it.name === groupName);
				if (index >= 0) groups.splice(index, 1);
			} else groups.push({ name: groupName });
			groups.forEach((item) => (item.id = ""));
			this.$axios
				.post("/add_client_team/group", {
					id: item.id,
					name: item.name,
					groups: groups,
				})
				.then((data) => {
					data = data.data;
					if (data.status === "success") {
						this.$barWarning("更新成功", {
							status: "correct",
						});
						this.groupName = "";
						this.getClientTeams();
					} else
						this.$barWarning(data.message, {
							status: "error",
						});
				})
				.catch((err) => {
					console.log(err);
					this.$barWarning(err, {
						status: "error",
					});
				})
				.finally(() => {
					this.lock.add = true;
				});
		},
	},
};
</script>

<style lang="scss">
.member-info-options-container {
	position: relative;
	width: 100%;
	height: auto;
	padding: 5px 15px;
	color: rgba(28, 30, 41, 1);
	font-family: Akkurat Std, -apple-system, BlinkMacSystemFont, Segoe UI,
		Roboto, Oxygen, Ubuntu, Cantarell, Helvetica Neue, sans-serif;
	font-weight: 400;
	box-sizing: border-box;

	&.dark {
		color: whitesmoke;
	}

	.team-title {
		font-size: 13.8px;
		color: rgba(129, 137, 169, 1);
		font-weight: 400;
	}

	.r-row {
		@include Vcenter;

		position: relative;
		width: 100%;
		height: auto;
		box-sizing: border-box;
	}

	.c-row {
		position: relative;
		width: 100%;
		height: auto;
		box-sizing: border-box;

		&.main-table {
			width: 100%;
			height: auto;
			flex: 1;
			margin: 8px 0px;
			padding: 0px;
			border: rgba(120, 120, 120, 0.3) solid thin;
			border-radius: 5px;
			box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.1);
			overflow: hidden;
		}
	}
}
</style>

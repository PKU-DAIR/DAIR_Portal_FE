<template>
	<fv-panel
		v-model="thisValue"
		:title="'成果管理'"
		width="450px"
		height="auto"
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
					<p class="award-title">成果列表</p>
				</div>
				<div class="c-row main-table">
					<fv-Collapse
						v-for="(item, index) in objs"
						:key="index"
						:title="item.name"
						:content="item.id"
						:icon="'Package'"
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
								@click="removeAward(item)"
								>删除</fv-button
							>
						</template>
					</fv-Collapse>
				</div>
				<div class="c-row">
					<p class="award-title" style="margin-top: 15px">添加成果</p>
					<div class="r-row">
						<fv-text-box
							v-model="awardName"
							underline
							:placeholder="'输入成果名称'"
							:border-width="2"
							:border-color="'transparent'"
							:focus-border-color="'rgba(0, 90, 158, 1)'"
							:is-box-shadow="true"
							:left-icon="'Package'"
							style="height: 35px; margin: 15px 0px"
							@keyup.enter="addAward"
						></fv-text-box>
						<fv-button
							theme="dark"
							:background="'rgba(0, 90, 158, 1)'"
							borderRadius="6"
							icon="Add"
							:disabled="awardName && !lock.add"
							:is-box-shadow="true"
							style="width: 120px; height: 35px; margin-left: 5px"
							@click="addAward"
						>
							添加成果
						</fv-button>
					</div>
				</div>
				<div class="c-row">
					<p class="award-title">竞赛等级列表</p>
				</div>
				<div class="c-row main-table">
					<fv-Collapse
						v-for="(item, index) in levels"
						:key="index"
						:title="item.level"
						:content="item.id"
						:icon="'Package'"
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
								@click="removeLevel(item)"
								>删除</fv-button
							>
						</template>
					</fv-Collapse>
				</div>
				<div class="c-row">
					<p class="award-title" style="margin-top: 15px">
						添加成果等级
					</p>
					<div class="r-row">
						<fv-text-box
							v-model="levelName"
							underline
							:placeholder="'输入成果等级'"
							:border-width="2"
							:border-color="'transparent'"
							:focus-border-color="'rgba(0, 90, 158, 1)'"
							:is-box-shadow="true"
							:left-icon="'Package'"
							style="height: 35px; margin: 15px 0px"
							@keyup.enter="addLevel"
						></fv-text-box>
						<fv-button
							theme="dark"
							:background="'rgba(0, 90, 158, 1)'"
							borderRadius="6"
							icon="Add"
							:disabled="levelName && !lock.addLevel"
							:is-box-shadow="true"
							style="width: 120px; height: 35px; margin-left: 5px"
							@click="addLevel"
						>
							添加成果等级
						</fv-button>
					</div>
				</div>
			</div>
		</template>
		<template v-slot:footer>
			<fv-button
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
			levels: [],
			awardName: "",
			levelName: "",
			lock: {
				add: true,
				addLevel: true,
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
		this.getAwards();
		this.getLevels();
	},
	methods: {
		getAwards() {
			this.$axios({
				method: "get",
				url: "/get_award_items",
			})
				.then((data) => {
					data = data.data;
					if (data.status === "success") {
						let objs = data.data;
						objs.forEach((item) => {
							this.$set(item, "lock", true);
						});
						this.objs = objs;
					}
				})
				.catch((err) => {
					this.$barWarning(err, {
						status: "error",
					});
				});
		},
		addAward() {
			if (!this.awardName) return;
			if (!this.lock.add) return;
			this.lock.add = false;
			this.$axios
				.post("/add_award_item", { name: this.awardName })
				.then((data) => {
					data = data.data;
					console.log(data);
					if (data.status === "success") {
						this.$barWarning("添加成功", {
							status: "correct",
						});
						this.getAwards();
						this.awardName = "";
					}
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
		removeAward(item) {
			this.$infoBox(`你将移除${item.name}`, {
				title: "确定删除",
				status: "error",
				confirm: () => {
					if (!item.lock) return;
					this.$set(item, "lock", false);
					this.$axios
						.post("/remove_award_item", { id: item.id })
						.then((data) => {
							data = data.data;
							if (data.status === "success") {
								this.$barWarning("删除成功", {
									status: "correct",
								});
								this.getAwards();
							}
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
		getLevels() {
			this.$axios({
				method: "get",
				url: "/get_award_levels",
			})
				.then((data) => {
					data = data.data;
					if (data.status === "success") {
						let levels = data.data;
						levels.forEach((item) => {
							this.$set(item, "lock", true);
						});
						this.levels = levels;
					}
				})
				.catch((err) => {
					this.$barWarning(err, {
						status: "error",
					});
				});
		},
		addLevel() {
			if (!this.levelName) return;
			if (!this.lock.addLevel) return;
			this.lock.addLevel = false;
			this.$axios
				.post("/add_award_level", { level: this.levelName })
				.then((data) => {
					data = data.data;
					console.log(data);
					if (data.status === "success") {
						this.$barWarning("添加成功", {
							status: "correct",
						});
						this.getLevels();
						this.levelName = "";
					}
				})
				.catch((err) => {
					console.log(err);
					this.$barWarning(err, {
						status: "error",
					});
				})
				.finally(() => {
					this.lock.addLevel = true;
				});
		},
		removeLevel(item) {
			this.$infoBox(`你将移除${item.level}`, {
				title: "确定删除",
				status: "error",
				confirm: () => {
					if (!item.lock) return;
					this.$set(item, "lock", false);
					this.$axios
						.post("/remove_award_level", { id: item.id })
						.then((data) => {
							data = data.data;
							if (data.status === "success") {
								this.$barWarning("删除成功", {
									status: "correct",
								});
								this.getLevels();
							}
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
	overflow: overlay;

	&.dark {
	}

	.award-title {
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

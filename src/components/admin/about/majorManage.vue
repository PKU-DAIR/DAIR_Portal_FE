<template>
	<fv-panel
		v-model="thisValue"
		:title="'专业管理'"
		width="450px"
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
					<p class="major-title">专业列表</p>
				</div>
				<div class="c-row main-table">
					<fv-Collapse
						v-for="(item, index) in objs"
						:key="index"
						:title="item.name"
						:theme="theme"
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
								@click="removeMajor(item)"
								>删除</fv-button
							>
						</template>
					</fv-Collapse>
				</div>
				<div class="c-row">
					<p class="major-title" style="margin-top: 15px">添加专业</p>
					<div class="r-row">
						<fv-text-box
							v-model="majorName"
							underline
							:placeholder="'输入专业名称'"
							:theme="theme"
							:border-width="2"
							:border-color="'transparent'"
							:focus-border-color="'rgba(0, 90, 158, 1)'"
							:is-box-shadow="true"
							:left-icon="'Package'"
							style="height: 35px; margin: 15px 0px"
							@keyup.enter="addMajor"
						></fv-text-box>
						<fv-button
							theme="dark"
							:background="'rgba(0, 90, 158, 1)'"
							borderRadius="6"
							icon="Add"
							:disabled="majorName && !lock.add"
							:is-box-shadow="true"
							style="width: 120px; height: 35px; margin-left: 5px"
							@click="addMajor"
						>
							添加专业
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
			majorName: "",
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
		this.getMajors();
	},
	methods: {
		getMajors() {
			this.$axios({
				method: "get",
				url: "/get_majors",
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
		addMajor() {
			if (!this.majorName) return;
			if (!this.lock.add) return;
			this.lock.add = false;
			this.$axios
				.post("/add_major", {
					name: this.majorName,
				})
				.then((data) => {
					data = data.data;
					console.log(data);
					if (data.status === "success") {
						this.$barWarning("添加成功", {
							status: "correct",
						});
						this.getMajors();
						this.majorName = "";
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
		removeMajor(item) {
			this.$infoBox(`你将移除${item.name}`, {
				title: "确定删除",
				status: "error",
				confirm: () => {
					if (!item.lock) return;
					this.$set(item, "lock", false);
					this.$axios
						.post("/remove_major", { id: item.id })
						.then((data) => {
							data = data.data;
							if (data.status === "success") {
								this.$barWarning("删除成功", {
									status: "correct",
								});
								this.getMajors();
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

	&.dark {
		color: rgba(250, 250, 250, 1);

		.major-title {
			color: whitesmoke;
		}
	}

	.major-title {
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

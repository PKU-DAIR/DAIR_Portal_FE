<template>
	<fv-panel
		v-model="show"
		title="添加文章"
		width="600px"
		height="auto"
		:theme="theme"
		:title-size="13"
		:is-central-side="true"
		:is-acrylic="true"
		:is-footer="true"
	>
		<template v-slot:container>
			<div class="panel-container">
				<div>
					<p ref="name" class="panel-title">标题</p>
					<fv-text-box
						v-model="name"
						:theme="theme"
						placeholder="输入文章标题"
						:border-width="2"
						:reveal-border="true"
						style="width: 100%; height: 40px; margin-top: 15px"
						@keydown.enter="addNews"
					/>
				</div>
			</div>
		</template>
		<template v-slot:footer>
			<fv-button
				theme="dark"
				background="rgba(0, 98, 158, 1)"
				:disabled="!name || !lock"
				style="width: 120px"
				@click="addNews"
				>添加</fv-button
			>
			<fv-button
				:theme="theme"
				style="width: 120px; margin-left: 5px"
				@click="show = false"
				>取消</fv-button
			>
		</template>
	</fv-panel>
</template>

<script>
export default {
	name: "add-news",
	props: {
		value: {
			default: false,
		},
		theme: {
			default: "light",
		},
	},
	data() {
		return {
			name: "",
			show: this.value,
			lock: true,
		};
	},
	mounted() {},
	watch: {
		value() {
			this.show = this.value;
		},
		show() {
			this.$emit("input", this.show);
			this.name = "";
		},
	},
	methods: {
		async addNews() {
			if (this.name == "") {
				this.$swiftWarning(this.$refs.name, {
					replaceTitle: "标题不能为空",
				});
				return 0;
			}
			if (!this.lock) return;
			this.lock = false;
			await this.$axios
				.post("/news/update", {
					title: this.name,
					news_type: "draw",
				})
				.then((data) => {
					data = data.data;
					if (data.status === "success") {
						this.$barWarning("添加成功", {
							status: "correct",
						});
						this.$emit("finish");
						this.show = false;
					} else {
						this.$barWarning(data.message, {
							status: "error",
							autoClose: -1,
						});
					}
					this.lock = true;
				})
				.catch((err) => {
					this.lock = true;
					this.$barWarning(err, {
						status: "error",
						autoClose: -1,
					});
				});
		},
	},
};
</script>

<style lang="scss">
.panel-container {
	position: relative;
	width: 100%;
	height: 100%;
	padding: 15px;
	color: rgba(28, 30, 41, 1);
	font-family: Akkurat Std, -apple-system, BlinkMacSystemFont, Segoe UI,
		Roboto, Oxygen, Ubuntu, Cantarell, Helvetica Neue, sans-serif;
	font-weight: 400;

	.panel-title {
		font-size: 12px;
	}
}
</style>

<template>
	<div>
		<fv-panel
			v-model="show"
			:title="local('Edit or Publish Article')"
			width="600px"
			height="auto"
			:title-size="13"
			:theme="theme"
			:is-central-side="true"
			:is-acrylic="true"
			:is-footer="true"
		>
			<template v-slot:container>
				<div class="panel-container">
					<div class="content">
						<p ref="name" class="panel-title">{{ local("Title") }}</p>
						<fv-text-box
							v-model="news.title"
							:theme="theme"
							:placeholder="local('Input article title')"
							:border-width="2"
							:reveal-border="true"
							style="width: 100%; height: 40px; margin-top: 15px"
							@keydown.enter="reviseType"
						/>
					</div>
					<div style="margin-top: 15px">
						<p
							ref="name"
							class="panel-title"
							style="margin-bottom: 5px"
						>
							选择类型
						</p>
						<fv-combobox
							v-model="currentOption"
							:theme="theme"
							:options="typeList"
							:placeholder="local('Select type')"
						>
						</fv-combobox>
					</div>
					<div style="margin-top: 15px">
						<p
							ref="name"
							class="panel-title"
							style="margin-bottom: 5px"
						>
							选择类型
						</p>
						<fv-text-field
							v-model="news.description"
							:theme="theme"
							:placeholder="local('Input article description')"
							:border-width="2"
							:reveal-border="true"
							style="width: 100%; height: 80px; margin-top: 15px"
							@keydown.enter="reviseType"
						/>
					</div>
					<div style="margin-top: 15px">
						<p
							ref="name"
							class="panel-title"
							style="margin-bottom: 5px"
						>
							外部跳转
						</p>
						<fv-text-box
							v-model="news.external"
							:placeholder="local('Please input external URL (it will jump directly after specified)')"
							left-icon="Link"
							:theme="theme"
							underline
							:border-width="2"
							:border-color="'rgba(120, 120, 120, 0.1)'"
							:background="'rgba(60, 60, 60, 1)'"
							:focus-border-color="'rgba(0, 90, 158, 1)'"
							:is-box-shadow="true"
							style="width: 100%; margin-top: 15px"
						></fv-text-box>
					</div>
					<div style="margin-top: 15px">
						<p
							ref="name"
							class="panel-title"
							style="margin-bottom: 5px"
						>
							{{ local("Add Cover Image") }}
						</p>
						<fv-button
							:theme="thisBanner ? 'dark' : theme"
							:background="thisBanner ? color : ''"
							:is-box-shadow="true"
							:disabled="!lock.banner"
							style="width: 120px; height: 35px"
							@click="$refs.uploader.click()"
						>
							<p v-show="lock.banner">
								{{ thisBanner ? local("Change Cover Image") : local("Add Cover Image") }}
							</p>
							<fv-progress-ring
								v-model="coverUploadProgress"
								v-show="!lock.banner"
								:r="12"
								:border-width="2"
								color="rgba(255, 255, 255, 1)"
							></fv-progress-ring>
						</fv-button>
						<input
							v-show="false"
							type="file"
							ref="uploader"
							accept=".jpg,.jpeg,.svg,.png,.webp,.gif,.bmp,.tiff"
							@change="ChooseCover"
						/>
						<fv-img
							v-if="thisBanner"
							:src="thisBanner"
							style="width: 100%; height: 150px; margin-top: 15px"
						></fv-img>
					</div>
				</div>
			</template>
			<template v-slot:footer>
				<fv-button
					theme="dark"
					background="rgba(0, 90, 158, 1)"
					:disabled="!news.id || !lock.type || !lock.banner"
					style="width: 120px"
					@click="reviseType"
					>{{ local("Confirm Changes") }}</fv-button
				>
				<fv-button
					:theme="theme"
					style="width: 120px; margin-left: 5px"
					@click="show = false"
					>{{ local("Cancel") }}</fv-button
				>
			</template>
		</fv-panel>
	</div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useApp } from "@/stores/useApp";
import { useTheme } from "@/stores/useTheme";
import { useUser } from "@/stores/useUser";

export default {
	name: "revise-news-type",
	props: {
		modelValue: {
			default: true,
		},
		obj: {
			default: () => ({}),
		},
		banner: {
			default: "",
		},
	},
	data() {
		return {
			news: {
				title: "",
				description: "",
				external: "",
			},
			thisBanner: this.banner,
			show: this.modelValue,
			showResManager: false,
			cover: null,
			coverUploadProgress: 0,
			currentOption: { key: "draw", value: "draw", text: "草稿" },
			typeList: [
				{
					key: "news",
					value: "news",
					text: "News",
				},
				{
					key: "proj",
					value: "proj",
					text: "Project",
				},
				{
					key: "top_proj",
					value: "top_proj",
					text: "Top Project",
				},
				{
					key: "top_news",
					value: "top_news",
					text: "Top News",
				},
				{
					key: "draw",
					value: "draw",
					text: "草稿",
				},
			],
			lock: {
				type: true,
				banner: true,
			},
		};
	},
	watch: {
		modelValue(val) {
			this.show = val;
		},
		show(val) {
			this.$emit("update:modelValue", val);
			this.currentOption = this.typeList.find(
				(it) => it.value === this.obj.news_type,
			);
		},
		obj(val) {
			if (val && !val.external) val.external = "";
			this.news = val;
			this.currentOption = this.typeList.find(
				(it) => it.value === val.news_type,
			);
			this.getCover();
		},
		banner(val) {
			this.thisBanner = val;
		},
		thisBanner(val) {
			this.$emit("update:banner", val);
		},
	},
	computed: {
		...mapState(useTheme, ["color", "gradient", "theme"]),
	},
	mounted() {},
	methods: {
		async reviseType() {
			if (this.news.title == "") {
				this.$swiftWarning(this.$refs.name, {
					replaceTitle: this.local("Title cannot be empty"),
				});
				return 0;
			}
			if (!this.currentOption || !this.currentOption.value) {
				this.$barWarning(this.local("Please select publish type"), {
					status: "warning",
				});
				return 0;
			}
			if (!this.lock.type) return;
			this.lock.type = false;
			await this.$axios
				.post("/news/update/info", {
					id: this.news.id,
					title: this.news.title,
					news_type: this.currentOption.value,
					description: this.news.description
						? this.news.description
						: "",
					external: this.news.external,
				})
				.then((data) => {
					data = data.data;
					if (data.status === "success") {
						this.$barWarning(this.local("Add Success"), {
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
					this.lock.type = true;
				})
				.catch((err) => {
					this.lock.type = true;
					this.$barWarning(err, {
						status: "error",
						autoClose: -1,
					});
				});
		},
		ChooseCover() {
			if (this.$refs.uploader.files.length === 0) return;
			if (!this.lock.banner) return;
			this.lock.banner = false;
			this.coverUploadProgress = 0;
			let formData = new FormData();
			formData.append("id", this.news.id);
			formData.append("banner", this.$refs.uploader.files[0]);
			this.$axios
				.post("/upload_banner", formData, {
					onUploadProgress: (progressEvent) => {
						// 计算上传进度百分比
						const percentCompleted = Math.round(
							(progressEvent.loaded * 100) / progressEvent.total,
						);
						this.coverUploadProgress = percentCompleted;
					},
				})
				.then((data) => {
					data = data.data;
					if (data.status === "success") {
						this.$refs.uploader.value = "";
						this.getCover();
					} else {
						this.$barWarning(data.status, {
							status: "warning",
						});
					}
					this.lock.banner = true;
				})
				.catch((err) => {
					this.$barWarning(err, {
						status: "error",
					});
				});
		},
		getCover() {
			if (!this.news.id) {
				this.thisBanner = "";
				return;
			}
			this.$axios({
				method: "get",
				url: `/get_news_banner?id=${this.news.id}`,
			})
				.then((res) => {
					res = res.data;
					if (res.code === 200) {
						this.thisBanner = res.data;
					} else {
						this.thisBanner = "";
					}
				})
				.catch((err) => {
					console.log(err);
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
	padding: 15px 15px 55px 15px;
	color: rgba(28, 30, 41, 1);
	font-family:
		Akkurat Std,
		-apple-system,
		BlinkMacSystemFont,
		Segoe UI,
		Roboto,
		Oxygen,
		Ubuntu,
		Cantarell,
		Helvetica Neue,
		sans-serif;
	font-weight: 400;

	.panel-title {
		font-size: 12px;
	}

	.tags-list-container {
		@include Vcenter;

		position: relative;
		width: 100%;
		padding: 5px 0px;
		overflow-x: auto;
	}
}
</style>

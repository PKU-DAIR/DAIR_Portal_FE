<template>
	<div class="dair-news-main-block" :class="[{ dark: theme === 'dark' }]">
		<div class="dair-news-loading-block" v-show="loadingNews">
			<fv-progress-ring
				:loading="true"
				size="m"
				background="white"
				color="rgba(149, 141, 241, 1)"
			></fv-progress-ring>
		</div>
		<div class="dair-news-nav-block">
			<draw-list
				:loadingList="loadingList"
				:objs="objs"
				:search.sync="search"
				:currentNews="currentNews"
				:currentPage.sync="currentPage"
				:news_Total="news_Total"
				@add-finish="ShowFirst"
				@revise-finish="getNews"
				@item-choose="switchNews"
				@del-finish="
					() => {
						getNews(() => {
							firstOrDefault();
						});
					}
				"
				@load-more="getContinue"
			></draw-list>
		</div>
		<transition name="news-edit">
			<div
				v-show="screenSize <= 1000 ? mobileNewsEdit == true : true"
				class="dair-news-edit-block"
			>
				<div class="control-banner" @click="mobileNewsEdit = false">
					<i class="ms-Icon ms-Icon--Cancel"></i>
				</div>
				<div class="title-info" @click="show.newsType = true">
					<span class="title-content">{{ currentNews.title }}</span>
					<fv-button
						:theme="theme"
						background="transparent"
						reveal-border-color="rgba(149, 141, 241, 0.6)"
						style="width: 40px; height: 35px; margin-left: 8px"
					>
						<i class="ms-Icon ms-Icon--Upload"></i>
					</fv-button>
				</div>
				<power-editor
					v-if="currentNews.id != null"
					:value="currentContent"
					:placeholder="'写点什么吧...'"
					:editable="currentNews.id != null"
					:language="'cn'"
					:theme="theme"
					:editorOutSideBackground="'transparent'"
					:toolbarHeight="100"
					fontSize="16"
					ref="editor"
					style="
						position: relative;
						width: 100%;
						height: calc(100% - 15px);
						flex: 1;
						font-size: 16px;
					"
					@save-json="Save($event)"
				>
					<template v-slot:front-content>
						<fv-img
							v-if="currentBanner"
							:src="currentBanner"
							style="width: 100%; height: 250px; cursor: pointer"
							@click.native="show.newsType = true"
						></fv-img>
					</template>
					<template v-slot:custom-buttons>
						<fv-button
							:theme="theme"
							class="power-editor-cmd-btn"
							:isBoxShadow="true"
							title="发布"
							:disabled="!lock.save"
							@click="show.newsType = true"
						>
							<i class="ms-Icon ms-Icon--Upload"></i>
						</fv-button>
						<fv-button
							v-show="unsave"
							theme="dark"
							class="power-editor-cmd-btn"
							background="rgba(0, 204, 153, 1)"
							:isBoxShadow="true"
							:title="lock.save ? '未保存的编辑' : '保存中'"
						>
							<fv-progress-ring
								v-show="!lock.save"
								:loading="true"
								r="10"
								borderWidth="2"
								color="white"
								background="transparent"
							></fv-progress-ring>
						</fv-button>
					</template>
				</power-editor>
				<div
					v-show="currentNews.id == null"
					style="
						height: 100%;
						font-size: 12px;
						color: rgba(200, 200, 200, 1);
						line-height: 2;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
					"
				>
					<p class="p-icon" style="font-size: 72px">&#xF408;</p>
					<p>创建文章开始创作</p>
				</div>
			</div>
		</transition>
		<revise-news-type
			v-model="show.newsType"
			:theme="theme"
			:obj="currentNews"
			:banner.sync="currentBanner"
			@finish="getNews"
		></revise-news-type>
	</div>
</template>

<script>
import drawList from "@/components/admin/news/drawList.vue";
import reviseNewsType from "@/components/admin/news/reviseNewsTypeBlock.vue";

import { mapState, mapGetters } from "vuex";

export default {
	components: {
		drawList,
		reviseNewsType,
	},
	data: function () {
		return {
			objs: [],
			currentNews: {},
			currentContent: "",
			currentBanner: "",
			unsave: false,
			mobileNewsEdit: false,
			currentPage: 1,
			limit: 20,
			news_Total: 0,
			search: "",
			loadingList: false,
			loadingNews: false,
			carrier: {},
			lock: {
				save: true,
			},
			show: {
				newsType: false,
				resManager: false,
			},
		};
	},
	watch: {
		currentNews() {
			this.mobileNewsEdit = true;
			this.unsave = false;
			try {
				let content = JSON.parse(this.currentNews.content);
				this.currentContent = content;
			} catch (e) {
				this.currentContent = this.currentNews.content;
			}
		},
		currentPage() {
			this.getNews();
			this.getNewsCount();
		},
		search() {
			this.getNews();
			this.getNewsCount();
		},
	},
	computed: {
		...mapState({
			screenSize: (state) => state.screenWidth,
		}),
		...mapGetters("Theme", ["color", "gradient", "theme"]),
	},
	mounted() {
		this.getNews(() => {
			this.firstOrDefault();
		});
		this.getNewsCount();
		window.removeEventListener("keydown", this.shortCutEvent);
		window.addEventListener("keydown", this.shortCutEvent);
	},
	methods: {
		firstOrDefault() {
			if (this.objs.length <= 0) return 0;
			this.getCurrent(this.objs[0].id);
		},
		getNews(callback = null) {
			this.loadingList = true;
			this.$axios({
				method: "get",
				url: `/news/get_news?search=${this.search}&offset=${
					(this.currentPage - 1) * this.limit
				}&limit=${this.limit}`,
			})
				.then((res) => {
					res = res.data;
					if (res.code === 200) {
						this.objs = res.data.list;
						this.loadingList = false;
						if (callback != null) callback();
					}
				})
				.catch((err) => {
					console.log(err);
				});
		},
		getNewsCount() {
			this.$axios({
				method: "get",
				url: `/list_news_size?search=${this.search}&limit=${this.limit}`,
			})
				.then((res) => {
					res = res.data;
					if (res.code === 200) {
						this.news_Total = res.data;
					}
				})
				.catch((err) => {
					console.log(err);
				});
		},
		getContinue(callback = null) {
			if (this.loadingList) return 0;
			this.loadingList = true;
			this.$api.News.GetMyNewsList(
				this.objs[this.objs.length - 1].id
			).then((data) => {
				this.loadingList = false;
				if (data.length == 0) {
					this.$barWarning("已无更多数据", { status: "correct" });
					return 0;
				}
				this.objs = this.objs.concat(data);
				if (callback != null) callback();
			});
		},
		getCurrent(id) {
			if (this.currentNews.id == id) return 0;
			this.loadingNews = true;
			this.$axios({
				method: "get",
				url: `/get_news?id=${id}`,
			})
				.then((res) => {
					res = res.data;
					if (res.code === 200) {
						this.currentNews = res.data;
						this.loadingNews = false;
					}
				})
				.catch((err) => {
					console.log(err);
				});
		},
		shortCutEvent(event) {
			let ctrl = event.ctrlKey || event.metaKey;
			if (event.keyCode === 83 && ctrl && !event.shiftKey) {
				event.preventDefault();
				this.$refs.editor.save();
			} else {
				let filterKey = [16, 17, 18, 20];
				if (filterKey.indexOf(event.keyCode) < 0) {
					this.unsave = true;
				}
			}

			if (event.keyCode === 9) {
				event.preventDefault();
				if (
					this.getEditor().editor.isActive("bulletList") ||
					this.getEditor().editor.isActive("orderedList")
				)
					return;
				if (this.readonly) return;
				this.getEditor().editor.commands.insertContent("    ");
			}
		},
		getEditor() {
			return this.$refs.editor;
		},
		async Save(json) {
			if (!this.lock.save) return;
			this.lock.save = false;
			let content;
			if (!json) content = this.currentContent;
			else content = json;
			// content = await this.updateImgPerformance(content);
			if (this.currentNews.id == null) {
				this.$barWarning("当前没有绑定任何文章", { status: "warning" });
				return 0;
			}
			await this.$axios
				.post("/news/update", {
					id: this.currentNews.id,
					title: this.currentNews.title,
					content: JSON.stringify(content),
					type: this.currentNews.type,
				})
				.then((data) => {
					data = data.data;
					if (data.status === "success") {
						this.$barWarning("保存成功", {
							status: "correct",
						});
						this.unsave = false;
						return;
					} else {
						this.$barWarning(data.message, {
							status: "error",
							autoClose: -1,
						});
					}
					this.lock.save = true;
				})
				.catch((err) => {
					this.lock.save = true;
					this.$barWarning(err, {
						status: "error",
						autoClose: -1,
					});
				});
		},
		Send() {
			this.$refs.editor.save();
			this.show.newsType = true;
		},
		ShowFirst() {
			//语法糖//
			this.getNews(() => {
				this.firstOrDefault();
				this.getNewsCount();
			});
		},
		ShowRevise() {
			this.$refs.reviseNews.show = true;
		},
		ShowReviseType() {
			this.$refs.editor.save();
			this.show.newsType = true;
		},
		async updateImgPerformance(content) {
			this.loadingList = true;
			let arr = [content];
			for (let i = 0; i < arr.length; i++) {
				if (arr[i].content) arr = arr.concat(arr[i].content);
				if (arr[i].type === "imageblock") {
					let src = arr[i].attrs.src;
					if (src.startsWith("data:")) {
						let blobItem = this.base64toBlob(src);
						let url = await this.$api.News.AddImagesWithOutId(
							undefined,
							blobItem
						);
						if (url && url.length) url = url[0];
						arr[i].attrs.src = url;
					}
				}
			}
			this.loadingList = false;
			return content;
		},
		base64toBlob(dataurl) {
			//base64转blob
			var arr = dataurl.split(","),
				mime = arr[0].match(/:(.*?);/)[1],
				bstr = atob(arr[1]),
				n = bstr.length,
				u8arr = new Uint8Array(n);
			while (n--) {
				u8arr[n] = bstr.charCodeAt(n);
			}
			return new Blob([u8arr], { type: mime });
		},
		switchNews($event) {
			this.mobileNewsEdit = true;
			if (this.unsave) {
				this.$infoBox("确定放弃已编辑的内容吗?", {
					status: "warning",
					title: "即将离开",
					confirmTitle: "确定",
					cancelTitle: "取消",
					confirm: () => {
						this.getCurrent($event.id);
					},
					cancel: () => {},
				});
			} else {
				this.getCurrent($event.id);
			}
		},
	},
	beforeDestroy() {
		window.removeEventListener("keydown", this.shortCutEvent);
	},
};
</script>

<style lang="scss">
.dair-news-main-block {
	position: relative;
	width: 100%;
	height: 100%;
	background: white;
	grid-template-columns: 300px calc(100% - 300px);
	grid-template-rows: 100%;
	display: grid;
	overflow: hidden;

	&.dark {
		background: rgba(36, 36, 36, 1);
		.dair-news-edit-block {
			border: rgba(36, 36, 36, 1) solid thin;
			color: whitesmoke;

			.control-banner {
				background: rgba(36, 36, 36, 1);
			}
		}
	}

	.dair-news-loading-block {
		position: absolute;
		left: 0px;
		top: 0px;
		width: 100%;
		height: 100%;
		background: rgba(255, 255, 255, 0.3);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 10;
	}

	.dair-news-nav-block {
		position: relative;
		width: 100%;
		height: 100%;
		background: whitesmoke;
		display: flex;
	}

	.dair-news-edit-block {
		position: relative;
		width: 100%;
		height: 100%;
		line-height: 2;
		overscroll-behavior: contain;

		.title-info {
			@include Vcenter;

			position: absolute;
			left: 10px;
			top: 15px;
			z-index: 30;

			.title-content {
				padding-left: 5px;
				min-width: 120px;
				font-weight: bold;
				color: whitesmoke;
				border-radius: 6px;
				cursor: default;

				&:hover {
					background: rgba(120, 120, 120, 0.3);
				}

				&:active {
					background: rgba(120, 120, 120, 0.1);
				}
			}
		}

		.control-banner {
			position: relative;
			width: 100%;
			height: 30px;
			padding: 15px 8px;
			background: white;
			box-sizing: border-box;
			display: none;
			justify-content: flex-end;
			align-items: center;
		}
	}
}

@media screen and (max-width: 1000px) {
	.dair-news-main-block {
		grid-template-columns: 100%;

		.dair-news-edit-block {
			position: fixed;
			left: 0px;
			top: 20px;
			width: 100%;
			height: calc(100% - 20px);
			border: rgba(0, 0, 0, 0.05) solid thin;
			border-top-left-radius: 5px;
			border-top-right-radius: 5px;
			box-shadow: 0px -8px 10px rgba(0, 0, 0, 0.1);
			overflow: hidden;

			.title-info {
				top: 40px;
			}

			.control-banner {
				display: flex;
			}
		}
	}
}
</style>

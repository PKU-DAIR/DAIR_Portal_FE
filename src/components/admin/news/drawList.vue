<template>
	<div class="draw-list-container" :class="[{ dark: theme === 'dark' }]">
		<div class="draw-banner-block">
			<fv-text-box
				:value="thisSearch"
				:theme="theme"
				placeholder="搜索"
				:border-width="2"
				:background="
					theme === 'dark'
						? 'rgba(50, 50, 50, 1)'
						: 'rgba(255, 255, 255, 1)'
				"
				border-color="rgba(0, 0, 0, 0.1)"
				focus-border-color="rgba(149, 141, 241, 1)"
				icon="Search"
				underline
				style="width: 100%; height: 35px"
				@debounce-input="thisSearch = $event"
			></fv-text-box>
			<fv-button
				:theme="theme"
				background="transparent"
				reveal-border-color="rgba(149, 141, 241, 0.6)"
				style="width: 40px; height: 35px; margin-left: 8px"
				@click="show.addNews = true"
			>
				<i class="ms-Icon ms-Icon--ExploreContent"></i>
			</fv-button>
			<fv-progress-bar
				v-show="loadingList"
				:loading="true"
				foreground="rgba(149, 141, 241, 1)"
				style="position: absolute; width: 100%; bottom: 0px"
			></fv-progress-bar>
		</div>
		<transition-group
			name="draw-item"
			tag="div"
			class="draw-list-block"
			ref="newsList"
		>
			<div
				v-for="(item, index) in objs"
				class="draw-item"
				:class="{ choose: currentNews.id == item.id }"
				:style="{ 'z-index': item.rightClick ? '20' : '' }"
				@click="$emit('item-choose', item)"
				@contextmenu="rightClick($event, item)"
				:key="item.id + index"
			>
				<span class="content-block">
					<i
						class="ms-Icon"
						:class="[`ms-Icon--${newsIcon(item)}`]"
					></i>
					<p
						style="margin-left: 5px; font-weight: bold"
						:title="item.title"
					>
						{{ item.title }}
					</p>
				</span>
				<div class="info-block">
					<time-rounder
						:value="new Date(item.update_time)"
						foreground="rgba(149, 141, 241, 0.6)"
						style="width: auto; flex: 1"
					></time-rounder>
					<time-rounder
						:value="new Date(item.publish_time)"
						foreground="rgba(120, 120, 120, 0.6)"
						style="width: auto; flex: 1"
					></time-rounder>
					<i
						class="ms-Icon ms-Icon--More"
						@click="
							($event) => {
								$event.stopPropagation();
								rightClick($event, item);
							}
						"
					></i>
				</div>
			</div>
		</transition-group>
		<add-news
			v-model="show.addNews"
			:theme="theme"
			@finish="$emit('add-finish')"
		></add-news>
		<revise-news-type
			v-model="show.reviseNewsType"
			:theme="theme"
			:obj="contextMenuItem"
			@finish="$emit('revise-finish')"
		></revise-news-type>
		<fv-right-menu :theme="theme" ref="rightMenu">
			<div>
				<span @click="show.addNews = true">
					<i
						class="ms-Icon ms-Icon--Add"
						style="color: rgba(149, 141, 241, 1)"
					></i>
					<p>添加文章</p>
				</span>
				<span @click="show.reviseNewsType = true">
					<i
						class="ms-Icon ms-Icon--Edit"
						style="color: rgba(149, 141, 241, 1)"
					></i>
					<p>修改标题</p>
				</span>
				<span @click="delNews($event, contextMenuItem)">
					<i
						class="ms-Icon ms-Icon--Delete"
						style="color: rgba(173, 38, 45, 1)"
					></i>
					<p>删除文章</p>
				</span>
				<hr
					style="
						margin: 8px 15px;
						border: thin;
						border-bottom: rgba(0, 0, 0, 0.1) solid thin;
					"
				/>
				<span @click="show.reviseNewsType = true">
					<i
						class="ms-Icon ms-Icon--Upload"
						style="color: rgba(149, 141, 241, 1)"
					></i>
					<p>发布文章</p>
				</span>
			</div>
		</fv-right-menu>
		<fv-Pagination
			v-model="thisCurrentPage"
			:theme="theme"
			:total="news_Total"
			:background="
				theme === 'dark' ? 'rgba(50, 50, 50, 1)' : 'whitesmoke'
			"
			:foreground="color"
			:disabled="loadingList"
			:maxVisual="4"
			:shadow="true"
			style="margin: 5px 0px"
		>
		</fv-Pagination>
	</div>
</template>

<script>
import { mapGetters } from "vuex";

import addNews from "@/components/admin/news/addNews.vue";
import reviseNewsType from "@/components/admin/news/reviseNewsTypeBlock.vue";
import timeRounder from "@/components/general/timeRounder.vue";

export default {
	components: {
		addNews,
		reviseNewsType,
		timeRounder,
	},
	props: {
		objs: {
			type: Array,
			default: () => [],
		},
		currentNews: {
			type: Object,
			default: () => ({}),
		},
		loadingList: {
			type: Boolean,
			default: false,
		},
		currentPage: {
			default: 1,
		},
		news_Total: {
			default: 2,
		},
		search: {
			default: "",
		},
	},
	data() {
		return {
			thisCurrentPage: 1,
			thisSearch: this.search,
			contextMenuItem: {},
			show: {
				addNews: false,
				reviseNewsType: false,
			},
		};
	},
	watch: {
		currentPage(val) {
			this.thisCurrentPage = val;
		},
		thisCurrentPage(val) {
			this.$emit("update:currentPage", val);
		},
		search(val) {
			this.thisSearch = val;
		},
		thisSearch(val) {
			this.$emit("update:search", val);
		},
	},
	computed: {
		...mapGetters("Theme", ["color", "gradient", "theme"]),
		newsIcon() {
			return (item) => {
				switch (item.news_type) {
					case "news":
						return "News";
					case "video":
						return "Video";
					case "res":
						return "Download";
					case "draw":
						return "Draw";
					default:
						return "Draw";
				}
			};
		},
	},
	mounted() {},
	methods: {
		delNews(event, item) {
			event.stopPropagation();
			this.$infoBox(`你将移除${item.title}文章`, {
				title: "三思而后行",
				status: "error",
				theme: this.theme,
				confirm: () => {
					this.$axios({
						method: "get",
						url: `/remove_news?id=${item.id}`,
					})
						.then((res) => {
							res = res.data;
							if (res.code === 200) {
								this.$barWarning("删除成功", {
									status: "correct",
								});
								this.$emit("del-finish");
							}
						})
						.catch((err) => {
							console.log(err);
						});
				},
			});
		},
		rightClick($event, item) {
			this.contextMenuItem = item;
			$event.preventDefault();
			this.$refs.rightMenu.rightClick($event, this.$el);
		},
	},
};
</script>

<style lang="scss">
.draw-list-container {
	position: relative;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	overflow: hidden;

	&.dark {
		background: rgba(36, 36, 36, 1);

		.draw-list-block {
			.draw-item {
				background: rgba(30, 30, 30, 0.9);
				color: whitesmoke;

				.content-block {
					color: rgba(200, 200, 200, 1);
				}

				&:hover {
					background: rgba(50, 50, 50, 0.9);
					border: rgba(0, 0, 0, 0.05) solid 1px;
				}

				&.choose {
					background: rgba(50, 50, 50, 1);
					border: rgba(149, 141, 241, 0.3) solid 1px;
					box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
				}
			}
		}
	}

	.draw-banner-block {
		position: relative;
		padding: 15px;
		height: 65px;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.draw-list-block {
		position: relative;
		width: 100%;
		flex: 1;
		padding: 3px;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow: auto;
		overflow-x: hidden;
		-ms-overflow-style: -ms-autohiding-scrollbar;

		.draw-item {
			position: relative;
			width: calc(100% - 10px);
			min-height: 120px;
			height: auto;
			margin: 1px 0px;
			flex-shrink: 0;
			font-size: 12px;
			background: rgba(250, 250, 250, 1);
			border: rgba(120, 120, 120, 0.1) solid thin;
			border-radius: 6px;
			box-sizing: border-box;
			cursor: default;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			transition: all 0.1s;
			-webkit-transition: all 0.1s;
			user-select: none;
			-webkit-user-select: none;

			&:hover {
				background: rgba(255, 255, 255, 0.9);
				border: rgba(0, 0, 0, 0.05) solid 1px;
			}

			&.choose {
				background: rgba(255, 255, 255, 1);
				border: rgba(149, 141, 241, 0.3) solid 1px;
				box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
			}

			.content-block {
				position: relative;
				width: 100%;
				flex: 1;
				padding: 0px 5px;
				font-size: 16px;
				color: rgba(95, 95, 95, 1);
				box-sizing: border-box;
				display: flex;
				align-items: center;
				user-select: text;

				&:hover {
					color: rgba(149, 141, 241, 1);
				}

				i {
					width: 30px;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}

			.info-block {
				position: relative;
				width: 100%;
				height: 30px;
				padding: 0px 5px;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
		}
	}
}

.draw-item-move {
	transition: all 0.2s;
	-webkit-transition: all 0.2s;
}

.draw-item-enter-active {
	transition: all 0.2s;
}

.draw-item-enter {
	opacity: 0;
	transform: translateX(-75px);
}

.draw-item-enter-to {
	opacity: 1;
	transform: translateX(0px);
}

.draw-item-leave-active {
	opacity: 1;
	transform: translateX(0px);
	transition: all 0.2s;
}

.draw-item-leave {
	opacity: 1;
	transform: translateX(0px);
}

.draw-item-leave-to {
	opacity: 0;
	transform: translateX(-75px);
}
</style>

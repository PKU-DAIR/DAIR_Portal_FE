<template>
	<div class="dair-news-list-block">
		<div
			v-for="(item, index) in objs"
			class="dair-news-item"
			:key="index"
			@click="viewDetail(item)"
		>
			<div class="news-pic-container">
				<news-banner :id="item.id"></news-banner>
			</div>

			<div class="news-content">
				<fv-reveal-container
					class="reveal-container"
					backgroundGradientSize="150"
					background-color="rgba(0, 0, 0, 0.8)"
					border-radius="0"
				></fv-reveal-container>
				<div class="dair-news-info">
					<span class="title">
						<p class="content" :title="item.title">
							{{ item.title }}
						</p>
						<i class="ms-Icon ms-Icon--ChevronRight"></i>
					</span>
				</div>
				<div class="dair-news-info">
					<div class="info">
						<time-rounder
							:value="new Date(item.update_time)"
							foreground="rgba(149, 141, 241, 0.6)"
							style="width: auto"
						></time-rounder>
						<span
							style="
								margin-left: 15px;
								padding: 0px 5px;
								display: flex;
								align-items: center;
							"
						>
							<i class="ms-Icon ms-Icon--People"></i>
							<p style="margin-left: 5px">
								{{ item.publisher_id }}
							</p>
						</span>
					</div>
				</div>
			</div>
		</div>
		<div
			v-show="objs.length == 0"
			v-for="i in 6"
			:key="`shimmer: ${i}`"
			class="dair-news-item"
			style="overflow: hidden"
		>
			<fv-Shimmer :theme="theme" style="width: 100%; height: 100%">
				<div class="sample" style="width: 100%; height: 200px"></div>
				<div
					class="sample"
					style="width: 100%; height: 30px; margin-top: 5px"
				></div>
				<div style="width: 100%; margin-top: 5px; display: flex">
					<div
						class="sample"
						style="width: 50px; height: 25px; margin-left: 5px"
					></div>
					<div
						class="sample"
						style="width: 50px; height: 25px; margin-left: 5px"
					></div>
					<div
						class="sample"
						style="width: 50px; height: 25px; margin-left: 5px"
					></div>
					<div
						class="sample"
						style="width: 50px; height: 25px; margin-left: 5px"
					></div>
					<div
						class="sample"
						style="width: 50px; height: 25px; margin-left: 5px"
					></div>
				</div>
			</fv-Shimmer>
		</div>
	</div>
</template>

<script>
import timeRounder from "@/components/general/timeRounder.vue";
import newsBanner from "./newsBanner.vue";

export default {
	components: {
		timeRounder,
		newsBanner,
	},
	props: {
		objs: {
			type: Array,
			default: () => {
				return [];
			},
		},
		showFavorCancel: {
			default: false,
		},
		theme: {
			default: "light",
		},
	},
	data: function () {
		return {
			loading: false,
			timer: null,
		};
	},
	watch: {},
	computed: {
		imgUrl() {
			return (item) => item.title;
		},
	},
	mounted() {},
	methods: {
		NameFormat(item) {
			return item.publisher;
		},
		viewDetail(item) {
			this.$Go(`/news/d/${item.id}`);
		},
		pCancelFavor(item) {
			this.$emit("cancelFavor", item);
		},
	},
};
</script>

<style lang="scss">
.dair-news-list-block {
	position: relative;
	width: 100%;
	height: 100%;
	padding: 2px;
	grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
	grid-auto-rows: repeat(auto-fit, auto);
	grid-gap: 15px;
	box-sizing: border-box;
	display: grid;
	overflow: auto;
	overflow-x: hidden;
	-ms-overflow-style: -ms-autohiding-scrollbar;

	.dair-news-item {
		position: relative;
		width: 100%;
		height: 280px;
		margin: 0px;
		background: rgba(0, 0, 0, 1);
		border: rgba(120, 120, 120, 0.2) solid thin;
		border-radius: 5px;
		box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
		box-sizing: border-box;
		display: flex;
		align-items: flex-end;
		transition: all 0.5s;
		user-select: none;
		overflow: hidden;
		cursor: pointer;

		&:hover {
			box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
			z-index: 10;
		}

		&:first-child {
			margin-top: 0px;
		}

		.news-content {
			position: relative;
			width: 100%;
			height: 100px;
			max-height: 100px;
			background: rgba(0, 0, 0, 0.8);
			flex: 1;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			backdrop-filter: blur(15px);
			-webkit-backdrop-filter: blur(15px);
			z-index: 2;

			.reveal-container {
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
			}

			.dair-news-info {
				position: relative;
				width: 100%;
				flex: 1;
				padding: 10px;
				color: whitesmoke;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				overflow: hidden;

				.title {
					width: 100%;
					flex: 1;
					font-size: 16px;
					display: flex;
					justify-content: space-between;
					align-items: center;
					cursor: pointer;
					transition: all 0.3s;

					.content {
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
					}

					&:hover {
						color: rgba(45, 80, 125, 1);
					}
				}

				.info {
					position: relative;
					width: 100%;
					flex: 1;
					font-size: 12px;
					color: rgba(200, 200, 200, 1);
					display: flex;
					justify-content: flex-start;
					align-items: center;
				}
			}
		}

		.news-pic-container {
			position: absolute;
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			overflow: hidden;
			z-index: 0;

			.news-pic {
				position: relative;
				width: 100%;
				height: auto;
				transition: all 0.3s;
			}
		}
	}
}

@media screen and (max-width: 750px) {
	.news-list-block {
		grid-template-columns: 100%;
	}

	.news-pic {
		width: 100%;
		transition: all 0.3s;
	}
}
</style>

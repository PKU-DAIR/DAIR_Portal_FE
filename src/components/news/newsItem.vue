<template>
	<div class="dair-news-item" @click="$emit('view-detail', item)">
		<div class="news-pic-container">
			<news-banner :id="item.id"></news-banner>
		</div>

		<div class="news-content">
			<fv-reveal-container
				class="reveal-container"
				backgroundGradientSize="150"
				background-color="rgba(0, 0, 0, 0.3)"
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
						:model-value="new Date(item.update_time)"
						foreground="rgba(232, 222, 247, 1)"
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
						<i class="ms-Icon ms-Icon--Contact"></i>
						<p style="margin-left: 5px">
							{{ item.publisher_id }}
						</p>
					</span>
				</div>
			</div>
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
		item: {
			type: Object,
			default: () => {
				return {};
			},
		},
	},
	emits: ["view-detail"],
};
</script>

<style lang="scss">
.dair-news-item {
	position: relative;
	width: 100%;
	height: 280px;
	margin: 0px;
	background: rgba(36, 36, 36, 1);
	border: rgba(120, 120, 120, 0.2) solid thin;
	border-radius: 12px;
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
		background: rgba(36, 36, 36, 0.8);
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
					color: rgba(232, 222, 247, 1);
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

@media screen and (max-width: 750px) {
	.dair-news-item {
		width: calc(100% - 2px);
	}

	.news-pic {
		width: 100%;
		transition: all 0.3s;
	}
}
</style>

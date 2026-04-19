<template>
	<div class="dair-proj-item" @click="$emit('view-detail', item)">
		<div class="news-pic-container">
			<news-banner :id="item.id"></news-banner>
		</div>
		<fv-reveal-container
			class="reveal-container"
			backgroundGradientSize="150"
			background-color="rgba(0, 0, 0, 0.1)"
			border-radius="0"
		></fv-reveal-container>
		<div class="dair-news-info">
			<span class="title">
				{{ item.title }}
			</span>
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
.dair-proj-item {
	position: relative;
	min-width: 300px;
	width: 100%;
	height: 120px;
	margin: 0px;
	padding: 10px;
	background: rgba(36, 36, 36, 1);
	border: rgba(120, 120, 120, 0.2) solid thin;
	border-radius: 5px;
	border-top-left-radius: 30px;
	border-bottom-right-radius: 30px;
	box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
	align-items: center;
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
		justify-content: center;
		overflow: hidden;

		.title {
            @include nowrap;
            
			width: 100%;
			flex: 1;
			font-size: 28px;
			font-style: italic;
			display: flex;
			justify-content: center;
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

	.news-pic-container {
		position: relative;
		width: auto;
		height: 90%;
		display: flex;
		align-items: center;
		overflow: hidden;
		z-index: 0;

		.news-pic {
			position: relative;
			width: auto;
			height: 100%;
			border-radius: 3px;
			transition: all 0.3s;
		}
	}
}

@media screen and (max-width: 750px) {
	.dair-proj-item {
		width: calc(100% - 2px);
		height: 80px;
		gap: 10px;

		.news-pic-container {
			width: auto;
			max-width: 50%;
			height: auto;
		}

		.dair-news-info {
			.title {
				font-size: 20px;
			}
		}
	}
}
</style>

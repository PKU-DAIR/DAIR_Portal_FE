<template>
	<div class="pub-wrap" :class="[{ dark: theme === 'dark' }]">
		<div class="title-block">
			<p class="big-title">News</p>
			<p class="title-line"></p>
		</div>
		<div class="pub-contain-list">
			<news-list :theme="theme" :objs="objs"></news-list>
		</div>
		<bottom-block
			:background="'rgba(245, 245, 245, 1)'"
			:isDarkFont="true"
		></bottom-block>
	</div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

import newsList from "@/components/news/newsList.vue";
import bottomBlock from "@/views/client/home/bottomBlock.vue";

export default {
	name: "about",
	components: {
		newsList,
		bottomBlock,
	},
	data() {
		return {
			objs: [],
			total: 1,
			screenWidth: 99999999999,
			show: {
				add: false,
			},
			timer: {
				sizeTimer: null,
			},
		};
	},
	watch: {},
	computed: {
		...mapState("user", {
			info: (state) => state.info,
		}),
		...mapGetters("Theme", ["color", "gradient", "theme"]),
	},
	mounted() {
		this.getClientNews();
		this.timerInit();
	},
	methods: {
		timerInit() {
			clearInterval(this.timer.sizeTimer);
			this.timer.sizeTimer = setInterval(() => {
				this.screenWidth = window.innerWidth;
			}, 80);
		},
		getClientNews() {
			this.$axios({
				method: "get",
				url: `/news/client/news?offset=0&limit=99999`,
			})
				.then((res) => {
					res = res.data;
					if (res.code === 200) {
						this.objs = res.data.list;
						this.total =
							res.data.total % this.limit == 0
								? parseInt(res.data.total / this.limit)
								: parseInt(res.data.total / this.limit) + 1;
					}
				})
				.catch((err) => {
					console.log(err);
				});
		},
	},
	beforeDestroy() {
		for (let key in this.timer) {
			clearInterval(this.timer[key]);
		}
	},
};
</script>

<style lang="scss">
.pub-wrap {
	position: fixed;
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	align-items: center;
	overflow: overlay;
	overflow-x: hidden;

	&.dark {
		background: rgba(23, 17, 24, 1);

		.big-title {
			color: whitesmoke;

			&.sec {
				color: rgba(199, 212, 231, 1);
			}
		}

		.sec-title {
			color: rgba(199, 212, 231, 1);
		}

		.title-line {
			width: 200px;
			height: 3px;
			margin-top: 15px;
			border-radius: 3px;
			background: rgba(0, 90, 158, 1);
		}
	}

	.title-block {
		@include HcenterVcenterC;

		position: relative;
		width: 100%;
		padding: 35px 0px;
		padding-top: 135px;
		line-height: 1.5;
		user-select: none;

		.big-title {
			font-size: 42px;
			font-weight: bold;

			&.sec {
				color: rgba(99, 112, 131, 1);
			}
		}

		.sec-title {
			font-size: 16px;
		}
	}

	.pub-contain-list {
		position: relative;
		width: 100%;
		max-width: 1368px;
		height: auto;

		.pub-group-list {
			position: relative;
			width: 100%;
			height: auto;
			color: whitesmoke;
			display: flex;
			flex-direction: column;

			.year-title {
				font-weight: bold;
				user-select: none;
			}

			.pub-item {
				@include HbetweenVcenter;

				position: relative;
				width: 100%;
				min-height: 120px;
				height: auto;
				line-height: 2;

				.left-block {
					position: relative;
					flex: 1;

					.pub-title {
						font-size: 16px;
						font-weight: bold;
					}

					.pub-info {
						font-family: "Times New Roman", Times, serif;
						font-size: 13.8px;
						font-style: italic;
						color: rgba(200, 200, 200, 1);
					}
				}

				.right-block {
					@include HcenterVcenter;

					position: relative;
					width: 80px;
					height: 100%;
				}
			}
		}
	}

	.line,
	.bottom-line {
		width: 100%;
		height: 60px;
		line-height: 60px;
		background-image: linear-gradient(to left, #7474bf, #348ac7);
		text-align: center;
		color: #ffffff;
		font-weight: bold;
		font-size: 24px;
	}

	.bottom-line {
		margin-top: 50px;
		height: 40px;
	}
}

@media screen and (max-width: 985px) {
	.logoBg1,
	.logoBg2 {
		display: none;
	}
}
</style>

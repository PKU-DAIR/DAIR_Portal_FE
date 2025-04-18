<template>
	<div class="pub-wrap" :class="[{ dark: theme === 'dark' }]">
		<div class="title-block">
			<p class="big-title">Publications</p>
			<p class="title-line"></p>
		</div>
		<div class="pub-contain-list">
			<div v-for="(group, i) in groups" :key="i" class="pub-group-list">
				<p class="year-title">{{ group.year }}</p>
				<div
					v-for="(pub, j) in group.data"
					:key="`${i}, ${j}`"
					class="pub-item"
				>
					<div class="left-block">
						<p class="pub-title">{{ pub.title }}</p>
						<p class="pub-info">
							{{ pub.author }}. {{ pub.booktitle }}.
							{{ pub.year }}
						</p>
					</div>
					<div class="right-block">
						<fv-button
							theme="dark"
							background="rgba(36, 36, 36, 0.6)"
							:is-box-shadow="true"
							:disabled="!pub.bib || pub.bib == ''"
							style="width: 35px; height: 35px"
							title="Copy BibTex"
							@click="CopyBibtex(pub.bib)"
						>
							<i class="ms-Icon ms-Icon--SemiboldWeight"></i>
						</fv-button>
						<fv-button
							theme="dark"
							background="rgba(36, 36, 36, 0.6)"
							:is-box-shadow="true"
							:disabled="!pub.url || pub.url == ''"
							style="width: 35px; height: 35px; margin-left: 3px"
							title="URL"
							@click="$Jump(pub.url)"
						>
							<i class="ms-Icon ms-Icon--Link"></i>
						</fv-button>
					</div>
				</div>
			</div>
		</div>
		<div class="ret-top-div" @click="retop">
			<span
				class="ms-Icon ms-Icon--ChevronUp"
				style="color: rgba(242, 242, 242, 1)"
			></span>
		</div>
		<bottom-block
			:background="'rgba(245, 245, 245, 1)'"
			:isDarkFont="true"
		></bottom-block>
	</div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import gsap from "gsap";

import bottomBlock from "@/views/client/home/bottomBlock.vue";

export default {
	name: "about",
	components: {
		bottomBlock,
	},
	data() {
		return {
			objs: [],
			groups: [],
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
	watch: {
		objs() {
			this.formatGroup();
		},
	},
	computed: {
		...mapState("user", {
			info: (state) => state.info,
		}),
		...mapGetters("Theme", ["color", "gradient", "theme"]),
	},
	mounted() {
		this.getClientPubs();
		this.timerInit();
	},
	methods: {
		timerInit() {
			clearInterval(this.timer.sizeTimer);
			this.timer.sizeTimer = setInterval(() => {
				this.screenWidth = window.innerWidth;
			}, 80);
		},
		getClientPubs() {
			this.$axios({
				method: "get",
				url: `/publications/get_publications?offset=0&limit=99999`,
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
		formatGroup() {
			let groups = [];
			let groupDict = {};
			this.objs.forEach((item) => {
				if (!item.year) item.year = "Earlier";
				if (!groupDict[item.year]) groupDict[item.year] = [];
				groupDict[item.year].push(item);
			});
			for (let key in groupDict) {
				groups.push({
					year: key,
					data: groupDict[key],
				});
			}
			groups.sort((a, b) => b.year - a.year);
			this.groups = groups;
		},
		CopyBibtex(bib) {
			if (!bib) {
				this.$barWarning("No BibTex Infomation", {
					status: "warning",
				});
				return;
			}
			if (navigator.clipboard) {
				navigator.clipboard
					.writeText(bib)
					.then(() => {
						this.$barWarning("Successfully Copied", {
							status: "correct",
						});
					})
					.catch((err) => {
						this.$barWarning(err, {
							status: "error",
						});
					});
			} else {
				// 回退到 document.execCommand
				const input = document.createElement("input");
				input.value = bib;
				document.body.appendChild(input);
				input.select();
				document.execCommand("copy");
				document.body.removeChild(input);
				this.$barWarning("Successfully Copied", {
					status: "correct",
				});
			}
		},
		retop() {
			gsap.to(document.querySelector(".pub-wrap"), {
				scrollTop: 0,
				duration: 0.5,
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
		max-width: 1300px;
		height: auto;

		.pub-group-list {
			position: relative;
			width: 100%;
			height: auto;
			color: whitesmoke;
			display: flex;
			flex-direction: column;
			align-items: center;

			.year-title {
				position: relative;
				width: calc(100% - 20px);
				font-weight: bold;
				user-select: none;
			}

			.pub-item {
				@include HbetweenVcenter;

				position: relative;
				width: calc(100% - 20px);
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

	.ret-top-div {
		@include retop;

		z-index: 3;
	}
}

@media screen and (max-width: 985px) {
	.pub-wrap {
		.pub-contain-list {
			.year-title {
				text-align: center;
			}

			.pub-group-list {
				.pub-item {
					width: calc(100% - 20px);
					margin-bottom: 25px;
					flex-direction: column;

					.right-block {
						width: 100%;
						margin-top: 3px;
						justify-content: flex-start;
					}
				}
			}
		}
	}
}
</style>

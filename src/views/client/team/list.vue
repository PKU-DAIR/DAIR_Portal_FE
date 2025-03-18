<template>
	<div class="about-wrap" :class="[{ dark: theme === 'dark' }]">
		<div class="about-title-block">
			<p class="big-title">About us</p>
			<p class="big-title sec">PKU-DAIR</p>
			<p class="sec-title">ML System ● Data-Centric ● Database ● AutoML</p>
		</div>
		<fv-button
			v-show="info.userid"
			background="#3271ba"
			border-radius="10"
			theme="dark"
			font-size="18"
			font-weight="600"
			style="width: 250px; height: 45px; flex-shrink: 0"
			@click="show.add = true"
			>{{ !memberInfo.id ? "添加我的简历" : "更新我的简历" }}</fv-button
		>
		<group-member
			v-for="(team, index) in clientTeams"
			:key="index + team.name"
			:avatarDict="avatarDict"
			:teamName="team.name"
			:groups="team.groups"
			:members="objs"
			:theme="theme"
			:size="screenWidth > 1024 ? 120 : 80"
		></group-member>
		<bottom-block
			:background="'rgba(245, 245, 245, 1)'"
			:isDarkFont="true"
		></bottom-block>
		<add-member
			v-model="show.add"
			:isManager="false"
			:theme="theme"
			:updateMemberInfo="memberInfo"
		></add-member>
		<div class="ret-top-div" @click="retop">
			<span
				class="ms-Icon ms-Icon--ChevronUp"
				style="color: rgba(242, 242, 242, 1)"
			></span>
		</div>
	</div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import gsap from "gsap";

import groupMember from "@/components/team/groupMember.vue";
import bottomBlock from "@/views/client/home/bottomBlock.vue";

import addMember from "@/components/admin/about/addMember.vue";

export default {
	name: "about",
	components: {
		groupMember,
		bottomBlock,
		addMember,
	},
	data() {
		return {
			objs: [],
			memberInfo: {},
			avatarDict: {},
			clientTeams: [],
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
		"info.userid"() {
			this.getMyMemberInfo();
		},
	},
	computed: {
		...mapState("user", {
			info: (state) => state.info,
		}),
		...mapGetters("Theme", ["color", "gradient", "theme"]),
	},
	mounted() {
		this.getClientTeams();
		this.getMembers();
		this.getMyMemberInfo();
		this.timerInit();
	},
	methods: {
		timerInit() {
			clearInterval(this.timer.sizeTimer);
			this.timer.sizeTimer = setInterval(() => {
				this.screenWidth = window.innerWidth;
			}, 80);
		},
		getClientTeams() {
			this.$axios({
				method: "get",
				url: "/get_client_teams",
			})
				.then((data) => {
					data = data.data;
					if (data.status === "success") {
						this.clientTeams = data.data;
					}
				})
				.catch((err) => {
					this.$barWarning(err, {
						status: "error",
					});
				});
		},
		getMembers() {
			this.$axios({
				method: "get",
				url: "/list_members_client",
			}).then((data) => {
				data = data.data;
				if (data.code === 200) {
					this.objs = data.data.list;
				}
			});
		},
		getMyMemberInfo() {
			if (!this.info || !this.info.userid) return;
			this.$axios({
				method: "get",
				url: `/get_my_cv`,
			})
				.then((res) => {
					res = res.data;
					if (res.code === 200) this.memberInfo = res.data;
					this.memberInfo.userid = this.info.userid;
				})
				.catch(() => {
					this.memberInfo.userid = null;
				});
		},
		retop() {
			gsap.to(document.querySelector(".about-wrap"), {
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
.about-wrap {
	position: fixed;
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	align-items: center;
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
	}

	.about-title-block {
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

	.logoBg1 {
		position: absolute;
		left: 0;
		top: 900px;
		z-index: -1;
	}

	.logoBg2 {
		position: absolute;
		right: 0;
		top: 2400px;
		z-index: -1;
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
	}
}

@media screen and (max-width: 985px) {
	.logoBg1,
	.logoBg2 {
		display: none;
	}
}
</style>

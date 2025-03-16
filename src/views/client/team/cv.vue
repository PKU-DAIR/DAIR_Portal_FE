<template>
	<div class="sosd-cv-container" :class="[{ dark: theme === 'dark' }]">
		<fv-persona
			:src="avatar"
			:theme="theme"
			size="120"
			background="rgba(245, 245, 245, 1)"
			class="sosd-persona"
		>
		</fv-persona>
		<p class="mu-name">{{ member.name }}</p>
		<p class="mu-info">{{ member.grade }} {{ edu }}</p>
		<p class="mu-info">{{ member.major }}</p>
		<div class="wise-info-block">
			<div class="left-block">
				<p
					v-for="(item, index) in member.teams"
					:key="`team: ${index}`"
					class="mu-wise-info team"
				>
					{{ item.name }}
				</p>
				<p
					v-for="(item, index) in member.groups"
					:key="`group: ${index}`"
					class="mu-wise-info"
				>
					{{ item.name }}
				</p>
			</div>
			<div class="right-block">
				<span v-show="member.session" class="mu-wise-icon-info">
					<i class="ms-Icon ms-Icon--Calendar"></i>
					<p>{{ member.session }}'s</p>
				</span>
				<span v-show="member.toWhere" class="mu-wise-icon-info">
					<i class="ms-Icon ms-Icon--Education"></i>
					<p>{{ member.toWhere }}</p>
				</span>
				<span v-show="member.title" class="mu-wise-icon-info">
					<i class="ms-Icon ms-Icon--GuestUser"></i>
					<p>{{ member.title }}</p>
				</span>
				<span v-show="member.userId" class="mu-wise-icon-info">
					<span>@</span>
					<p>{{ member.userId }}</p>
				</span>
			</div>
		</div>
		<div
			v-if="member.awards && member.awards.length > 0"
			v-show="member.awards.length > 0"
			class="award-info-block"
		>
			<div class="award-info-title">
				<p class="p-content">Awards</p>
			</div>
			<div
				v-for="(item, index) in member.awards"
				:key="index"
				class="award-item"
			>
				<div class="left-block">
					<img
						class="award-img"
						draggable="false"
						:src="computedAwardImg(item)"
						alt=""
					/>
					<i class="session-title"
						>{{ computedSession(item).content
						}}<sub style="font-size: 16px">{{
							computedSession(item).sub
						}}</sub></i
					>
					<p class="competition-title">{{ item.competitionName }}</p>
				</div>
				<div class="right-block">
					<p
						v-show="item.level"
						class="sec-title info-title"
						:class="[computedAwardLevel(item)]"
					>
						{{ item.level }}
					</p>
					<span v-show="item.region" class="sec-title info-title">
						<i class="ms-Icon ms-Icon--Location"></i>
						<p style="margin-left: 5px">{{ item.region }}</p>
					</span>
					<p v-show="computedDate(item)" class="sec-title">
						{{ computedDate(item) }}
					</p>
				</div>
			</div>
		</div>
		<div class="wise-cv-block" style="z-index: 1">
			<power-editor
				:value="computeContent(member.introduction)"
				:placeholder="'填写你的简历...'"
				:editable="false"
				:theme="theme"
				contentMaxWidth="1200px"
				class="wise-cv-editor"
				ref="editor"
				:editorOutSideBackground="'transparent'"
				editorBackground="transparent"
				:showControlOnReadonly="false"
			>
			</power-editor>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import one from "@/assets/cv_award/one.svg";
import two from "@/assets/cv_award/two.svg";
import three from "@/assets/cv_award/three.svg";
import se from "@/assets/cv_award/se.svg";
import other from "@/assets/cv_award/other.svg";

export default {
	props: {},
	data() {
		return {
			id: "",
			member: {
				educations: [],
				teams: [],
				groups: [],
			},
			avatar: null,
			img: {
				one,
				two,
				three,
				se,
				other,
			},
		};
	},
	watch: {
		id() {
			if (this.id) this.getMember();
		},
	},
	computed: {
		...mapGetters("Theme", ["color", "gradient", "theme"]),
		edu() {
			if (
				Array.isArray(this.member.educations) &&
				this.member.educations.length > 0
			)
				return this.member.educations[0].name;
			return "";
		},
		computedAwardImg() {
			return (item) => {
				if (!item.level) return this.img.other;
				let level = item.level;
				if (["First", "金"].includes(level)) return this.img.one;
				if (["Second", "银"].includes(level)) return this.img.two;
				if (["Third", "铜"].includes(level)) return this.img.three;
				if (["Special", "全球"].includes(level)) return this.img.se;
				return this.img.other;
			};
		},
		computedAwardLevel() {
			return (item) => {
				if (!item.level) return "other";
				let level = item.level;
				if (["First", "金"].includes(level)) return "one";
				if (["Second", "银"].includes(level)) return "two";
				if (["Third", "铜"].includes(level)) return "three";
				if (["Special", "全球"].includes(level)) return "se";
				return "other";
			};
		},
		computedSession() {
			return (item) => {
				if (!item.session) return "";
				let suffix = item.session % 10;
				if (suffix === 1) return { content: item.session, sub: "st" };
				if (suffix === 2) return { content: item.session, sub: "nd" };
				if (suffix === 3) return { content: item.session, sub: "rd" };
				return { content: item.session, sub: "th" };
			};
		},
		computedDate() {
			return (item) => {
				if (!item.date) return "";
				let date = new Date(item.date);
				return date.getFullYear() + "." + date.getMonth();
			};
		},
		computeContent() {
			return (content) => {
				try {
					let jsonContent = JSON.parse(content);
					if (!jsonContent.content)
						jsonContent = {
							type: "doc",
							content: [],
						};
					return jsonContent;
				} catch (e) {
					return content;
				}
			};
		},
	},
	mounted() {
		this.getId();
	},
	methods: {
		getId() {
			if (this.$route.params.id) this.id = this.$route.params.id;
		},
		getMember() {
			this.$axios({
				method: "get",
				url: `/get_member_client?id=${this.id}`,
			}).then(async (res) => {
				res = res.data;
				this.member = res.data;
				let photo = await this.getMemberPhoto(res.data.photo);
				this.avatar = photo;
			});
		},
		blobToBase64(blob, callback) {
			var reader = new FileReader();
			reader.readAsDataURL(blob);
			reader.onload = () => {
				var dataUrl = reader.result;
				callback(dataUrl);
			};
		},
		async getMemberPhoto(id) {
			let photo = "";
			await await this.$axios({
				method: "get",
				url: `/get_member_avatar?id=${id}`,
			})
				.then((data) => {
					data = data.data;
					photo = data.data;
				})
				.catch((err) => {
					this.$barWarning(err, {
						status: "error",
					});
				});
			return photo;
		},
	},
};
</script>

<style lang="scss">
.sosd-cv-container {
	position: relative;
	width: 100%;
	height: auto;

	padding-top: 125px;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	align-items: center;

	&.dark {
		background: rgba(23, 17, 24, 1);

		.sosd-persona {
			.persona-avatar {
				border: rgba(120, 120, 120, 1) solid 3px;
			}
		}

		.mu-info {
			color: rgba(209, 220, 238, 1);
		}

		.mu-name {
			color: whitesmoke;
		}

		.wise-info-block {
			border-bottom: rgba(200, 200, 200, 0.1) solid thin;

			.mu-wise-icon-info {
				color: rgba(209, 220, 238, 1);
			}
		}

		.award-info-block {
			.award-info-title {
				.p-title {
					color: rgba(126, 15, 164, 1);
				}
			}

			.award-item {
				background: rgba(12, 12, 12, 1);
				color: whitesmoke;
				border: rgba(120, 120, 120, 0.1) solid thin;

				&:hover {
					background: rgba(20, 20, 20, 1);
				}

				.session-title {
					color: rgba(111, 176, 226, 1);
				}
			}
		}
	}

	.sosd-persona {
		position: relative;
		width: 100%;
		display: flex;
		justify-content: center;

		.persona-avatar {
			border: rgba(255, 255, 255, 1) solid 3px;
			border-radius: 50%;
			box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.1);
		}
	}

	.mu-name {
		position: relative;
		width: 100%;
		height: auto;
		margin-top: 15px;
		font-size: 28px;
		font-weight: bold;
		display: flex;
		justify-content: center;
	}

	.mu-info {
		position: relative;
		width: 100%;
		height: auto;
		margin-top: 5px;
		font-size: 15px;
		color: rgba(109, 120, 138, 1);
		display: flex;
		justify-content: center;
	}

	.wise-info-block {
		position: relative;
		width: 100%;
		max-width: 1200px;
		height: auto;
		margin-top: 25px;
		padding: 15px 0px;
		border-bottom: rgba(120, 120, 120, 0.1) solid thin;
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		overflow: overlay;

		.left-block,
		.right-block {
			position: relative;
			width: auto;
			flex-shrink: 0;
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			gap: 10px;
		}

		.mu-wise-icon-info {
			position: relative;
			width: auto;
			height: 35px;
			font-size: 13.8px;
			color: rgba(109, 120, 138, 1);
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: default;

			p {
				margin-left: 5px;
			}
		}

		.mu-wise-info {
			position: relative;
			width: auto;
			height: 35px;
			flex-shrink: 0;
			padding: 0px 15px;
			background: rgba(71, 119, 255, 1);
			font-size: 15px;
			border-radius: 20px;
			color: whitesmoke;
			display: flex;
			justify-content: center;
			align-items: center;
			box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.1),
				0px 0px 3px rgba(71, 119, 255, 0.2);
			cursor: default;
			user-select: none;

			&.team {
				background: rgba(255, 180, 81, 1);
				color: rgba(36, 36, 36, 1);
				font-weight: bold;
				box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.1),
					0px 0px 3px rgba(255, 180, 81, 0.2);
			}
		}
	}

	.award-info-block {
		position: relative;
		width: 100%;
		max-width: 1200px;
		height: auto;
		margin-top: 10px;
		box-sizing: border-box;
		user-select: none;

		.award-info-title {
			position: relative;
			width: 200px;
			height: 35px;
			margin: 15px 0px;
			background: linear-gradient(125deg, #ffffff 0%, #000000 100%),
				linear-gradient(
					200deg,
					#ffd9e8 0%,
					#ffd9e8 50%,
					#de95ba calc(50% + 1px),
					#de95ba 60%,
					#7f4a88 calc(60% + 1px),
					#7f4a88 75%,
					#4a266a calc(75% + 1px),
					#4a266a 100%
				),
				linear-gradient(
					113deg,
					#ffd9e8 0%,
					#ffd9e8 40%,
					#de95ba calc(40% + 1px),
					#de95ba 50%,
					#7f4a88 calc(50% + 1px),
					#7f4a88 70%,
					#4a266a calc(70% + 1px),
					#4a266a 100%
				);
			background-blend-mode: overlay, overlay, normal;
			border-radius: 8px;
			display: flex;
			justify-content: space-around;
			align-items: center;
			box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.1),
				0px 0px 3px rgba(235, 96, 147, 0.2);

			.p-title {
				width: 100px;
				font-size: 12px;
				font-weight: bold;
				color: rgba(26, 5, 64, 1);
				display: flex;
				justify-content: center;
			}

			.p-content {
				flex: 1;
				color: rgba(255, 255, 255, 1);
				font-weight: bold;
				text-shadow: 0px 3px 8px rgba(0, 0, 0, 0.6);
				display: flex;
				justify-content: center;
			}
		}

		.award-img {
			width: auto;
			height: 35px;
		}

		.award-item {
			position: relative;
			width: 100%;
			height: 60px;
			margin-bottom: 3px;
			padding: 0px 10px;
			background: white;
			border: rgba(120, 120, 120, 0.1) solid thin;
			border-radius: 6px;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;
			gap: 10px;
			user-select: none;
			transition: all 0.3s;

			&:hover {
				background: rgba(250, 250, 250, 1);
			}

			.left-block,
			.right-block {
				position: relative;
				width: auto;
				max-width: 100%;
				flex-shrink: 0;
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				gap: 10px;
			}

			.session-title {
				min-width: 60px;
				font-size: 24px;
				font-weight: bold;
				color: rgba(0, 90, 158, 1);
			}

			.competition-title {
				@include nowrap;

				max-width: 100%;
				font-size: 18px;
				font-weight: bold;
				text-overflow: ellipsis;
				overflow: hidden;
			}

			.sec-title {
				font-size: 12px;
			}

			.info-title {
				position: relative;
				width: auto;
				height: auto;
				flex-shrink: 0;
				padding: 5px 15px;
				background: rgba(235, 96, 147, 1);
				border-radius: 20px;
				color: whitesmoke;
				display: flex;
				justify-content: center;
				align-items: center;
				box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.1),
					0px 0px 3px rgba(235, 96, 147, 0.2);
				cursor: default;
				user-select: none;

				&.one,
				&.se {
					background: rgba(255, 180, 81, 1);
					color: rgba(36, 36, 36, 1);
					font-weight: bold;
					box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.1),
						0px 0px 3px rgba(255, 180, 81, 0.2);
				}

				&.two,
				&.other {
					background: rgba(200, 200, 200, 1);
					color: rgba(36, 36, 36, 1);
					font-weight: bold;
					box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.1),
						0px 0px 3px rgba(200, 200, 200, 0.2);
				}

				&.three {
					background: rgba(167, 128, 48, 1);
					font-weight: bold;
					box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.1),
						0px 0px 3px rgba(167, 128, 48, 0.2);
				}
			}
		}
	}

	.wise-cv-block {
		position: relative;
		width: 100%;
		max-width: 1200px;
		margin-top: 15px;
		height: auto;
		box-sizing: border-box;
		display: flex;
		line-height: 2;

		.wise-cv-editor {
			width: 100%;
			height: auto;
			background: transparent;
			overflow: hidden;
		}
	}
}

@media screen and (max-width: 1200px) {
	.sosd-cv-container {
		.wise-info-block {
			max-width: none;
			padding: 0px 15px;
			flex-direction: column;
		}

		.wise-cv-block {
			max-width: none;
		}

		.award-info-block {
			.award-item {
				height: auto;
				padding: 15px;
				flex-direction: column;
			}
		}
	}
}
</style>

<template>
	<div
		v-if="render"
		class="member-unit-container"
		:class="[{ dark: theme === 'dark' }]"
	>
		<fv-persona
			:src="avatar"
			:size="size"
			:theme="theme"
			background="rgba(245, 245, 245, 1)"
		>
		</fv-persona>
		<p class="mu-name">{{ member.name }}</p>
		<p v-show="computeStaff" class="mu-title">
			{{ computedTitle }}
		</p>
		<p v-show="showGrade && !computeStaff" class="mu-info">
			{{ computedGrade }}
		</p>
		<p v-show="showMajor" class="mu-info">{{ member.major }}</p>
		<p
			v-show="true"
			class="mu-info email"
			@click="sendEmail($event, member.email)"
		>
			{{ member.email }}
		</p>
		<p v-show="member.postAddress" class="mu-info">
			{{ member.postAddress }}
		</p>
	</div>
</template>

<script>
export default {
	props: {
		value: {
			type: Object,
			default: () => {},
		},
		avatarDict: {
			default: () => ({}),
		},
		groupFilter: {
			default: "",
		},
		showTitle: {
			default: false,
		},
		showGrade: {
			default: true,
		},
		showMajor: {
			default: false,
		},
		render: {
			default: true,
		},
		size: {
			default: 120,
		},
		theme: {
			default: "light",
		},
	},
	data() {
		return {
			member: {
				id: "",
				name: "",
				email: "",
				grade: "",
				major: "",
				teams: [],
				groups: [],
				educations: [],
				introduction: "",
				photo: "",
				title: "",
			},
			avatar: null,
			img: {},
			timer: {
				avatar: null,
			},
		};
	},
	watch: {
		async "value.id"() {
			this.refreshInfo();
		},
	},
	computed: {
		computedShow() {
			if (!this.groupFilter) return true;
			for (let i = 0; i < this.member.groups.length; i++) {
				if (
					this.member.groups[i].name
						.toLowerCase()
						.indexOf(this.groupFilter.toLowerCase()) >= 0
				) {
					return true;
				}
			}
			return false;
		},
		computedTitle() {
			let title =
				this.member.educations.length > 0
					? [this.member.educations[0].name]
					: [];
			if (this.member.title) title.push(this.member.title);
			return title.join(", ");
		},
		computedGrade() {
			let grade =
				this.member.educations.length > 0
					? [this.member.educations[0].name]
					: [];
			if (this.member.grade && !this.computeStaff)
				grade.unshift(this.member.grade);
			return grade.join(" ");
		},
		computeStaff() {
			let groups = this.member.groups;
			if (!groups) return false;
			if (!Array.isArray(groups)) return false;
			for (let item of groups)
				if (item.name.indexOf("Staff") >= 0) return true;
			return false;
		},
	},
	mounted() {
		this.refreshInfo();
		this.timerInit();
	},
	methods: {
		timerInit() {
			clearInterval(this.timer.avatar);
			this.timer.avatar = setInterval(() => {
				if (!this.avatar) {
					if (!this.member.photo) return;
					if (!this.avatarDict[this.member.photo]) {
						this.$set(this.avatarDict, this.member.photo, {
							status: "lock",
							data: "",
						});
						this.getMemberPhoto(this.member.photo);
					} else if (
						this.avatarDict[this.member.photo].status === "finished"
					)
						this.avatar = this.avatarDict[this.member.photo].data;
				}
			}, 300);
		},
		async refreshInfo() {
			this.avatar = null;
			for (let key in this.member) {
				if (this.value[key]) {
					this.$set(this.member, key, this.value[key]);
				}
			}
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
			await this.$axios({
				method: "get",
				url: `/get_member_avatar?id=${id}`,
			})
				.then((data) => {
					data = data.data;
					if (data.code === 200) {
						photo = data.data;
						// this.blobToBase64(photo, (base64) => {
						// 	this.avatar = base64;
						// 	this.$set(this.avatarDict, id, {
						// 		status: "finished",
						// 		data: base64,
						// 	});
						// });
						this.avatar = photo;
						this.$set(this.avatarDict, id, {
							status: "finished",
							data: photo,
						});
					}
				})
				.catch((err) => {
					this.$barWarning(err, {
						status: "error",
					});
				});
			return photo;
		},
		sendEmail(event, email) {
			event.stopPropagation();
			const recipient = email; // 收件人
			const subject = ""; // 邮件主题
			const body = "From the PKU-DAIR Protal Site."; // 邮件正文

			// 构建 mailto 链接
			const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(
				subject
			)}&body=${encodeURIComponent(body)}`;

			// 打开默认邮件客户端
			window.location.href = mailtoLink;
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
.member-unit-container {
	position: relative;
	width: 200px;
	height: 280px;
	display: flex;
	flex-direction: column;
	align-items: center;
	overflow: hidden;
	user-select: none;
	cursor: pointer;

	&.dark {
		.mu-name,
		.mu-title {
			color: whitesmoke;
		}

		.mu-info {
			color: rgba(200, 200, 200, 0.6);
		}
	}

	.mu-name {
		position: relative;
		width: 100%;
		height: auto;
		margin-top: 15px;
		font-weight: bold;
		display: flex;
		justify-content: center;
		text-align: center;
	}

	.mu-title {
		position: relative;
		width: 100%;
		height: auto;
		margin-top: 5px;
		font-size: 12.8px;
		font-weight: bold;
		display: flex;
		justify-content: center;
		text-align: center;
	}

	.mu-info {
		position: relative;
		width: 100%;
		height: auto;
		margin-top: 5px;
		font-size: 13.8px;
		color: rgba(109, 120, 138, 1);
        white-space: nowrap;
        text-overflow: ellipsis;
		display: flex;
		justify-content: center;
		text-align: center;
        overflow: hidden;

		&.email {
			&:hover {
				text-decoration: underline;
			}
		}
	}
}

@media screen and (max-width: 985px) {
	.member-unit-container {
        .mu-name {
            font-size: 12px;
        }

		.mu-info {
			font-size: 8px;
		}
	}
}
</style>

<template>
	<fv-panel
		v-model="thisValue"
		:title="'成员信息'"
		width="calc(100% - 30px)"
		height="1200px"
		:theme="theme"
		background="rgba(30, 30, 30, 0.6)"
		title-size="13.8"
		:is-central-side="true"
		:is-acrylic="true"
		:is-footer="true"
	>
		<template v-slot:container>
			<div
				class="model-panel-container"
				:class="[{ dark: theme === 'dark' }]"
			>
				<div class="panel-row" style="margin-top: 15px">
					<p class="panel-title">ID</p>
				</div>
				<div class="panel-row">
					<fv-text-box
						v-model="member.id"
						:theme="theme"
						:placeholder="'请输入ID'"
						underline
						disabled
						:border-width="2"
						:border-color="'rgba(120, 120, 120, 0.1)'"
						:background="'rgba(60, 60, 60, 1)'"
						:focus-border-color="'rgba(0, 90, 158, 1)'"
						:is-box-shadow="true"
					></fv-text-box>
				</div>
				<div class="panel-row" style="margin-top: 15px">
					<p class="panel-title">* 姓名</p>
				</div>
				<div class="panel-row">
					<fv-text-box
						v-model="member.name"
						:theme="theme"
						:placeholder="'请输入姓名'"
						underline
						:border-width="2"
						:border-color="'rgba(120, 120, 120, 0.1)'"
						:background="'rgba(60, 60, 60, 1)'"
						:focus-border-color="'rgba(0, 90, 158, 1)'"
						:is-box-shadow="true"
					></fv-text-box>
				</div>
				<div class="panel-row" style="margin-top: 15px">
					<p class="panel-title">* 成员头像</p>
				</div>
				<div class="panel-row">
					<div
						style="
							width: 100%;
							display: flex;
							flex-direction: column;
						"
					>
						<fv-persona
							:src="avatar"
							size="60"
							background="rgba(245, 245, 245, 1)"
							@click.native="show.avatar ^= true"
						>
						</fv-persona>
					</div>
				</div>
				<transition
					:name="
						show.avatar
							? 'rotate-fold-top-to-bottom'
							: 'rotate-fold-bottom-to-top'
					"
				>
					<div v-show="show.avatar" class="panel-row">
						<choose-avatar
							ref="avatar"
							@update-base64="avatar = $event"
							@update-img="avatarBlob = $event"
						>
						</choose-avatar>
					</div>
				</transition>
				<div
					v-show="show.avatar"
					class="panel-row"
					style="justify-content: center"
				>
					<fv-button
						:theme="theme"
						:is-box-shadow="true"
						style="width: 120px; margin-left: 5px"
						@click="show.avatar = false"
						>关闭</fv-button
					>
				</div>
				<div class="panel-row" style="margin-top: 15px">
					<p class="panel-title">* 入学年份</p>
				</div>
				<div class="panel-row">
					<fv-text-box
						v-model="member.grade"
						:placeholder="'请输入入学年份'"
						:theme="theme"
						type="number"
						underline
						:border-width="2"
						:border-color="'rgba(120, 120, 120, 0.1)'"
						:background="'rgba(60, 60, 60, 1)'"
						:focus-border-color="'rgba(0, 90, 158, 1)'"
						:is-box-shadow="true"
					></fv-text-box>
				</div>
				<div class="panel-row" style="margin-top: 15px">
					<p class="panel-title">* 邮箱</p>
				</div>
				<div class="panel-row">
					<fv-text-box
						v-model="member.email"
						:placeholder="'dair@pku.edu.cn'"
						:theme="theme"
						underline
						:border-width="2"
						:border-color="'rgba(120, 120, 120, 0.1)'"
						:background="'rgba(60, 60, 60, 1)'"
						:focus-border-color="'rgba(0, 90, 158, 1)'"
						:is-box-shadow="true"
					></fv-text-box>
				</div>
				<div class="panel-row" style="margin-top: 15px">
					<p class="panel-title">* 电话 (不公开展示)</p>
				</div>
				<div class="panel-row">
					<fv-text-box
						v-model="member.mobile"
						:placeholder="'请输入电话号码'"
						:theme="theme"
						type="tel"
						underline
						:border-width="2"
						:border-color="'rgba(120, 120, 120, 0.1)'"
						:background="'rgba(60, 60, 60, 1)'"
						:focus-border-color="'rgba(0, 90, 158, 1)'"
						:is-box-shadow="true"
					></fv-text-box>
				</div>
				<div class="panel-row" style="margin-top: 15px">
					<p class="panel-title">* 毕业年份</p>
				</div>
				<div class="panel-row">
					<fv-text-box
						v-model="member.session"
						:placeholder="'请输入毕业年份'"
						type="number"
						:theme="theme"
						underline
						:border-width="2"
						:border-color="'rgba(120, 120, 120, 0.1)'"
						:background="'rgba(60, 60, 60, 1)'"
						:focus-border-color="'rgba(0, 90, 158, 1)'"
						:is-box-shadow="true"
					></fv-text-box>
				</div>
				<div class="panel-row" style="margin-top: 15px">
					<p class="panel-title">* 学历</p>
				</div>
				<div
					class="panel-row"
					:style="{ 'z-index': 12 + member.awards.length * 2 }"
				>
					<fv-DropDown
						placeholder="请选择学历"
						:theme="theme"
						v-model="member.educations"
						:options="eduList"
					>
					</fv-DropDown>
				</div>
				<div class="panel-row" style="margin-top: 15px">
					<p class="panel-title">* 专业</p>
				</div>
				<div
					class="panel-row"
					:style="{ 'z-index': 10 + member.awards.length * 2 }"
				>
					<fv-Combobox
						placeholder="请选择专业"
						:theme="theme"
						v-model="member.major"
						:options="majorList"
					>
					</fv-Combobox>
				</div>
				<div class="panel-row" style="margin-top: 15px">
					<p class="panel-title">* 团队</p>
				</div>
				<div
					class="panel-row"
					:style="{ 'z-index': 8 + member.awards.length * 2 }"
				>
					<fv-DropDown
						placeholder="请选择团队"
						v-model="member.teams"
						:theme="theme"
						:options="teamList"
						:multiple="true"
					>
					</fv-DropDown>
				</div>
				<div class="panel-row" style="margin-top: 15px">
					<p class="panel-title">* 分组</p>
				</div>
				<div
					class="panel-row"
					:style="{ 'z-index': 6 + member.awards.length * 2 }"
				>
					<fv-DropDown
						placeholder="请选择分组"
						v-model="member.groups"
						:theme="theme"
						:options="groupList"
						:multiple="true"
					>
					</fv-DropDown>
				</div>
				<div class="panel-row" style="margin-top: 15px">
					<p class="panel-title">* 去向类型</p>
				</div>
				<div
					class="panel-row"
					:style="{ 'z-index': 4 + member.awards.length * 2 }"
				>
					<fv-Combobox
						placeholder="请选择去向"
						:theme="theme"
						v-model="member.toWhere"
						:options="toWhereList"
					>
					</fv-Combobox>
				</div>
				<div class="panel-row" style="margin-top: 15px">
					<p class="panel-title">毕业去向</p>
				</div>
				<div
					class="panel-row"
					:style="{ 'z-index': 2 + member.awards.length * 2 }"
				>
					<fv-text-box
						v-model="member.postAddress"
						:placeholder="'请输入毕业去向'"
						:theme="theme"
						underline
						:border-width="2"
						:border-color="'rgba(120, 120, 120, 0.1)'"
						:background="'rgba(60, 60, 60, 1)'"
						:focus-border-color="'rgba(0, 90, 158, 1)'"
						:is-box-shadow="true"
					></fv-text-box>
				</div>
				<div class="panel-row" style="margin-top: 15px">
					<p class="panel-title">职级/职称</p>
				</div>
				<div class="panel-row">
					<fv-text-box
						v-model="member.title"
						:placeholder="'请输入职级和职称'"
						:theme="theme"
						underline
						:border-width="2"
						:border-color="'rgba(120, 120, 120, 0.1)'"
						:background="'rgba(60, 60, 60, 1)'"
						:focus-border-color="'rgba(0, 90, 158, 1)'"
						:is-box-shadow="true"
					></fv-text-box>
				</div>
				<div
					v-if="isManager"
					class="panel-row"
					style="margin-top: 15px"
				>
					<p class="panel-title">关联用户 (若用户未注册可忽略)</p>
				</div>
				<div v-if="isManager" class="panel-row">
					<fv-text-box
						:placeholder="'请输入用户ID'"
						underline
						:theme="theme"
						:icon="'Search'"
						:border-width="2"
						:border-color="'rgba(120, 120, 120, 0.1)'"
						:background="'rgba(60, 60, 60, 1)'"
						:focus-border-color="'rgba(0, 90, 158, 1)'"
						:is-box-shadow="true"
						@debounce-input="userIdFilter = $event"
					></fv-text-box>
				</div>
				<div class="panel-row">
					<p class="sec-title">
						{{
							member.userid
								? "已绑定: " + member.userid
								: "未绑定用户 (请在下方选择单个用户后点击确认按钮)"
						}}
					</p>
					<fv-button
						v-show="member.userid"
						theme="dark"
						background="rgba(173, 38, 45, 1)"
						:border-radius="50"
						:font-size="8"
						style="width: 20px; height: 20px; margin-left: 5px"
						@click="member.userid = ''"
					>
						<i class="ms-Icon ms-Icon--Delete"></i>
					</fv-button>
				</div>
				<user-table
					v-if="isManager"
					:showAvatar="false"
					:pageSize="5"
					:theme="theme"
					:showRole="false"
					:isMultiple="true"
					:search="useridFilter"
					style="
						position: relative;
						width: 90%;
						height: 250px;
						box-sizing: border-box;
					"
					@choose-items="userChoosen = $event"
				></user-table>
				<fv-button
					v-if="isManager"
					theme="dark"
					:background="'rgba(0, 90, 158, 1)'"
					:disabled="userChoosen.length !== 1"
					:is-box-shadow="true"
					style="width: 120px; margin-left: 5px"
					@click="selectUser"
					>确认用户ID</fv-button
				>
				<div class="panel-row" style="margin-top: 15px">
					<p class="panel-title">成果登记</p>
					<fv-button
						theme="dark"
						background="rgba(0, 204, 153, 1)"
						:border-radius="50"
						:font-size="8"
						style="width: 20px; height: 20px; margin-left: 5px"
						@click="pushAward()"
					>
						<i class="ms-Icon ms-Icon--Add"></i>
					</fv-button>
					<fv-button
						v-show="member.awards.length != 0"
						theme="dark"
						background="rgba(173, 38, 45, 1)"
						:border-radius="50"
						:font-size="8"
						style="width: 20px; height: 20px; margin-left: 5px"
						@click="removeAward()"
					>
						<i class="ms-Icon ms-Icon--Delete"></i>
					</fv-button>
				</div>
				<div
					v-for="(item, index) in member.awards"
					:key="index"
					class="panel-row award-item"
					:style="{ 'z-index': 2 * member.awards.length - index }"
				>
					<fv-button
						v-show="member.awards.length != 0"
						theme="dark"
						background="rgba(173, 38, 45, 1)"
						:border-radius="50"
						:font-size="8"
						style="width: 20px; height: 20px; margin-left: 5px"
						@click="removeAward(index)"
					>
						<i class="ms-Icon ms-Icon--Delete"></i>
					</fv-button>
					<fv-text-box
						v-model="item.session"
						:placeholder="'20届'"
						type="number"
						underline
						:theme="theme"
						:prefix="'届次'"
						:border-width="2"
						:border-color="'rgba(120, 120, 120, 0.1)'"
						:background="'rgba(60, 60, 60, 1)'"
						:focus-border-color="'rgba(0, 90, 158, 1)'"
						:is-box-shadow="true"
						style="width: 120px; height: 35px"
					></fv-text-box>
					<fv-Combobox
						v-model="item.competitionName"
						placeholder="请选择成果"
						:theme="theme"
						:options="awardList"
						:is-box-shadow="true"
						style="width: 250px"
					>
					</fv-Combobox>
					<fv-Combobox
						v-model="item.level"
						placeholder="请选择获奖等级"
						:theme="theme"
						:options="awardLevelList"
						:is-box-shadow="true"
						style="width: 80px"
					>
					</fv-Combobox>
					<fv-text-box
						v-model="item.region"
						:placeholder="'福州大学·福州'"
						:theme="theme"
						underline
						:prefix="'地点'"
						:border-width="2"
						:border-color="'rgba(120, 120, 120, 0.1)'"
						:background="'rgba(60, 60, 60, 1)'"
						:focus-border-color="'rgba(0, 90, 158, 1)'"
						:is-box-shadow="true"
						style="width: 160px; height: 35px"
					></fv-text-box>
					<fv-DatePicker
						v-model="item.date"
						:months="[
							'一月',
							'二月',
							'三月',
							'四月',
							'五月',
							'六月',
							'七月',
							'八月',
							'九月',
							'十月',
							'十一月',
							'十二月',
						]"
						:theme="theme"
						style="width: 150px; height: 35px"
					></fv-DatePicker>
					<fv-button
						theme="dark"
						background="rgba(0, 204, 153, 1)"
						:border-radius="50"
						:font-size="8"
						style="width: 20px; height: 20px; margin-left: 5px"
						@click="pushAward(index)"
					>
						<i class="ms-Icon ms-Icon--Add"></i>
					</fv-button>
					<fv-button
						theme="dark"
						background="rgba(0, 90, 158, 1)"
						:border-radius="50"
						:font-size="8"
						:disabled="index === 0"
						style="width: 20px; height: 20px; margin-left: 1px"
						title="上移"
						@click="pushTop(index)"
					>
						<i class="ms-Icon ms-Icon--ChevronUp"></i>
					</fv-button>
					<fv-button
						theme="dark"
						background="rgba(0, 90, 158, 1)"
						:border-radius="50"
						:font-size="8"
						:disabled="index === member.awards.length - 1"
						style="width: 20px; height: 20px; margin-left: 1px"
						title="下移"
						@click="pushBottom(index)"
					>
						<i class="ms-Icon ms-Icon--ChevronDown"></i>
					</fv-button>
				</div>
				<div class="panel-row" style="margin-top: 15px">
					<p class="panel-title">简历</p>
				</div>
				<fv-button
					theme="dark"
					:background="'rgba(0, 90, 158, 1)'"
					:icon="'GiftboxOpen'"
					:is-box-shadow="true"
					style="width: 120px; margin-left: 5px"
					@click="markdownTemplate"
					>快速模板</fv-button
				>
				<div class="panel-row" style="z-index: 1">
					<power-editor
						:placeholder="'填写你的简历...'"
						class="intro-power-editor"
						ref="editor"
						:theme="theme"
						:editorOutSideBackground="'transparent'"
						:editorBackground="
							theme === 'dark'
								? 'rgba(36, 36, 36, 1)'
								: 'rgba(255, 255, 255, 1)'
						"
					>
						<template v-slot:custom-buttons-front="x">
							<fv-button
								:foreground="
									theme === 'dark'
										? 'rgba(200, 200, 200, 1)'
										: ''
								"
								:background="
									theme === 'dark'
										? 'rgba(36, 36, 36, 1)'
										: 'rgba(255, 255, 255, 1)'
								"
								:class="[x.defaultClass]"
								:isBoxShadow="true"
								:title="'导入Markdown'"
								@click="$refs.md_input.click()"
							>
								<img
									draggable="false"
									:src="img.markdown"
									alt=""
									style="
										width: 16px;
										height: 16px;
										object-fit: contain;
									"
								/>
							</fv-button>
						</template>
					</power-editor>
				</div>
				<input
					v-show="false"
					type="file"
					accept=".md"
					ref="md_input"
					@change="openMarkdown"
				/>
			</div>
		</template>
		<template v-slot:footer>
			<fv-button
				v-if="!updateMemberInfo.id"
				theme="dark"
				:background="'rgba(0, 90, 158, 1)'"
				:disabled="!lock.add || disabledAdd"
				style="width: 120px; margin-left: 5px"
				@click="addMember"
				>添加信息</fv-button
			>
			<fv-button
				v-else
				theme="dark"
				:background="'rgba(0, 90, 158, 1)'"
				:disabled="!lock.update || disabledAdd"
				style="width: 120px; margin-left: 5px"
				@click="updateMember"
				>更新信息</fv-button
			>
			<fv-button
				:theme="theme"
				style="width: 120px; margin-left: 5px"
				@click="thisValue = false"
				>取消</fv-button
			>
		</template>
	</fv-panel>
</template>

<script>
import chooseAvatar from "./chooseAvatar.vue";
import userTable from "@/components/admin/about/table.vue";

import logo from "@/assets/logo/pku_dair.svg";
import markdown from "@/assets/open_md.svg";

import cv_template from "@/js/template/cv_template.js";

export default {
	components: {
		chooseAvatar,
		userTable,
	},
	props: {
		value: {
			default: false,
		},
		updateMemberInfo: {
			default: () => ({}),
		},
		isManager: {
			default: true,
		},
		theme: {
			default: "light",
		},
	},
	data() {
		return {
			thisValue: this.value,
			member: {
				id: "",
				name: "",
				grade: "",
				session: "",
				major: "",
				title: "",
				toWhere: "",
				postAddress: "",
				educations: [],
				teams: [],
				groups: [],
				introduction: "",
				photo: "",
				userid: "",
				awards: [],
				email: "",
				mobile: "",
			},
			avatar: null,
			avatarBlob: null,
			background: null,
			useridFilter: "",
			userChoosen: [],
			majorList: [],
			eduList: [],
			teamList: [],
			groupList: [],
			toWhereList: [],
			awardList: [],
			awardLevelList: [],
			img: {
				logo,
				markdown,
				cuttingAvatar: null,
			},
			show: {
				avatar: false,
			},
			lock: {
				add: true,
				update: true,
			},
		};
	},
	watch: {
		value(val) {
			this.thisValue = val;
			if (val) {
				this.getMajors();
				this.getTeams();
				this.getGroups();
				this.getEdu();
				this.getAwards();
				this.getAwardLevels();
				this.getToWhere();
				this.clearInfo();
				this.refreshMemberInfo();
				console.log(this.member);
			}
		},
		thisValue(val) {
			this.$emit("input", val);
		},
		async "updateMemberInfo.id"() {
			this.refreshMemberInfo();
		},
	},
	computed: {
		disabledAdd() {
			return (
				!this.member.name ||
				!this.member.grade ||
				!this.member.session ||
				!this.member.email ||
				!this.member.mobile ||
				!this.member.major ||
				!this.member.major.id ||
				!this.member.toWhere ||
				!this.member.toWhere.id ||
				!this.member.educations.length > 0 ||
				!this.member.teams.length > 0 ||
				!this.member.groups.length > 0 ||
				!this.avatar
			);
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
	mounted() {},
	methods: {
		getMajors() {
			this.$axios({
				method: "get",
				url: "/get_majors",
			})
				.then((data) => {
					data = data.data;
					if (data.status === "success") {
						let majorList = data.data;
						majorList.forEach((item) => {
							item.text = item.name;
							item.key = item.id;
						});
						this.majorList = majorList;
					}
				})
				.catch((err) => {
					this.$barWarning(err, {
						status: "error",
					});
				});
		},
		getTeams() {
			this.$axios({
				method: "get",
				url: "/get_teams",
			})
				.then((data) => {
					data = data.data;
					if (data.status === "success") {
						let teamList = data.data;
						teamList.forEach((item) => {
							item.text = item.name;
							item.key = item.id;
						});
						this.teamList = teamList;
					}
				})
				.catch((err) => {
					this.$barWarning(err, {
						status: "error",
					});
				});
		},
		getGroups() {
			this.$axios({
				method: "get",
				url: "/get_groups",
			})
				.then((data) => {
					data = data.data;
					if (data.status === "success") {
						let groupList = data.data;
						groupList.forEach((item) => {
							item.text = item.name;
							item.key = item.id;
						});
						this.groupList = groupList;
					}
				})
				.catch((err) => {
					this.$barWarning(err, {
						status: "error",
					});
				});
		},
		getEdu() {
			this.$axios({
				method: "get",
				url: "/get_edus",
			})
				.then((data) => {
					data = data.data;
					if (data.status === "success") {
						let eduList = data.data;
						eduList.forEach((item) => {
							item.text = item.name;
							item.key = item.id;
						});
						this.eduList = eduList;
					}
				})
				.catch((err) => {
					this.$barWarning(err, {
						status: "error",
					});
				});
		},
		getToWhere() {
			this.$axios({
				method: "get",
				url: "/get_towheres",
			})
				.then((data) => {
					data = data.data;
					if (data.status === "success") {
						let toWhereList = data.data;
						toWhereList.forEach((item) => {
							item.text = item.name;
							item.key = item.id;
						});
						this.toWhereList = toWhereList;
					}
				})
				.catch((err) => {
					this.$barWarning(err, {
						status: "error",
					});
				});
		},
		getAwards() {
			this.$axios({
				method: "get",
				url: "/get_award_items",
			})
				.then((data) => {
					data = data.data;
					if (data.status === "success") {
						let awardList = data.data;
						awardList.forEach((item) => {
							item.text = item.name;
							item.key = item.id;
						});
						this.awardList = awardList;
					}
				})
				.catch((err) => {
					this.$barWarning(err, {
						status: "error",
					});
				});
		},
		getAwardLevels() {
			this.$axios({
				method: "get",
				url: "/get_award_levels",
			})
				.then((data) => {
					data = data.data;
					if (data.status === "success") {
						let awardLevelList = data.data;
						awardLevelList.forEach((item) => {
							item.text = item.level;
							item.key = item.id;
						});
						this.awardLevelList = awardLevelList;
					}
				})
				.catch((err) => {
					this.$barWarning(err, {
						status: "error",
					});
				});
		},
		async refreshMemberInfo() {
			if (this.updateMemberInfo.id) {
				await this.getMemberDetailInfo();
				let photo = await this.getMemberPhoto(this.member.photo);
				this.avatar = photo;
				// this.blobToBase64(photo, (base64) => {
				// 	this.avatar = base64;
				// });
			} else {
				this.clearInfo();
			}
			if (this.updateMemberInfo.userid)
				this.member.userid = this.updateMemberInfo.userid;
		},
		async getMemberDetailInfo() {
			await this.$axios({
				method: "get",
				url: `/get_member?id=${this.updateMemberInfo.id}`,
			})
				.then((res) => {
					res = res.data;
					if (res.status === "success") {
						let data = res.data;
						let majorObj = this.majorList.find(
							(it) => it.text === data.major
						);
						if (majorObj) data.major = majorObj;
						let toWhereObj = this.toWhereList.find(
							(it) => it.text === data.toWhere
						);
						if (toWhereObj) data.toWhere = toWhereObj;
						data.grade = data.grade ? data.grade.toString() : "";
						data.session = data.session
							? data.session.toString()
							: "";
						for (let key in data) {
							if (data[key]) {
								if (
									["educations", "teams", "groups"].includes(
										key
									) &&
									Array.isArray(data[key])
								) {
									data[key].forEach((it) => {
										it.key = it.id;
										it.text = it.name
											? it.name
											: it.competitionName;
									});
								}
								this.member[key] = data[key];
							}
							if (key === "awards") {
								data[key].forEach((el) => {
									let competitionNameObj =
										this.awardList.find(
											(it) =>
												it.text === el.competitionName
										);
									if (competitionNameObj)
										el.competitionName = competitionNameObj;
									let levelObj = this.awardLevelList.find(
										(it) => it.text === el.level
									);
									if (levelObj) el.level = levelObj;
									el.date = new Date(el.date);
								});
							}
						}
						this.$refs.editor.editor.commands.setContent(
							this.computeContent(this.member.introduction)
						);
					} else {
						this.$barWarning(res.status, {
							status: "warning",
						});
					}
				})
				.catch((err) => {
					this.$barWarning(err, {
						status: "error",
					});
				});
		},
		async getMemberPhoto(id) {
			let photo = "";
			await this.$axios({
				method: "get",
				url: `get_member_avatar?id=${id}`,
			})
				.then((res) => {
					res = res.data;
					if (res.code === 200) photo = res.data;
				})
				.catch((err) => {
					this.$barWarning(err, {
						status: "error",
					});
				});
			return photo;
		},
		async uploadMemberPhoto(id) {
			if (!this.avatarBlob) return;
			let formData = new FormData();
			formData.append("id", id);
			formData.append("member_avatar", this.avatarBlob);
			this.$axios
				.post("/upload_member_avatar", formData)
				.then((data) => {
					data = data.data;
					if (data.status === "success") {
						id = data.data;
					} else {
						this.$barWarning(data.status, {
							status: "warning",
						});
					}
				})
				.catch((err) => {
					this.$barWarning(err, {
						status: "error",
					});
				});
			return id;
		},
		blobToBase64(blob, callback) {
			var reader = new FileReader();
			reader.readAsDataURL(blob);
			reader.onload = () => {
				var dataUrl = reader.result;
				callback(dataUrl);
			};
		},
		binaryToBlob(binaryData, mimeType) {
			// 将二进制数据转换为 Uint8Array
			let byteArray = new Uint8Array(binaryData);

			// 创建 Blob 对象
			let blob = new Blob([byteArray], { type: mimeType });

			return blob;
		},
		formatAwardsPost() {
			let awards = [];
			this.member.awards.forEach((it) => {
				awards.push({
					competitionName: it.competitionName
						? it.competitionName.text
						: "",
					level: it.level ? it.level.text : "",
					session: it.session,
					date: it.date,
					region: it.region,
				});
			});
			return awards;
		},
		async addMember() {
			if (this.disabledAdd) return;
			if (!this.lock.add) return;
			this.lock.add = false;
			let res_id = "";
			await this.$axios
				.post("/add_member", {
					name: this.member.name,
					grade: this.member.grade,
					session: this.member.session,
					major: this.member.major.name,
					introduction: JSON.stringify(
						this.$refs.editor.editor.getJSON()
					),
					photo: "",
					title: this.member.title,
					educations: this.member.educations.map((it) => {
						return { id: it.id, name: it.name };
					}),
					groups: this.member.groups.map((it) => {
						return { id: it.id, name: it.name };
					}),
					teams: this.member.teams.map((it) => {
						return { id: it.id, name: it.name };
					}),
					email: this.member.email,
					mobile: this.member.mobile,
					toWhere: this.member.toWhere.name,
					postAddress: this.member.postAddress,
					awards: this.formatAwardsPost(),
					userid: this.member.userid ? this.member.userid : null,
				})
				.then((data) => {
					data = data.data;
					if (data.status === "success") {
						this.$barWarning("添加成功", {
							status: "correct",
						});
						this.thisValue = false;
						res_id = data.data.id;
						this.$emit("finished");
					} else {
						this.$barWarning(data.message, {
							status: "warning",
						});
					}
					this.lock.add = true;
				})
				.catch((err) => {
					this.$barWarning(err, {
						status: "error",
					});
					this.lock.add = true;
				});
			if (res_id) {
				await this.uploadMemberPhoto(res_id).then(() => {
					this.avatar = null;
					this.avatarBlob = null;
				});
			}
		},
		async updateMember() {
			if (this.disabledAdd) return;
			if (!this.lock.update) return;
			this.lock.update = false;
			await this.uploadMemberPhoto(this.member.id);
			this.$axios
				.post("/update_member", {
					id: this.member.id,
					name: this.member.name,
					grade: this.member.grade,
					session: this.member.session,
					major: this.member.major.name,
					introduction: JSON.stringify(
						this.$refs.editor.editor.getJSON()
					),
					photo: this.member.photo,
					title: this.member.title,
					educations: this.member.educations.map((it) => {
						return { id: it.id, name: it.name };
					}),
					groups: this.member.groups.map((it) => {
						return { id: it.id, name: it.name };
					}),
					teams: this.member.teams.map((it) => {
						return { id: it.id, name: it.name };
					}),
					email: this.member.email,
					mobile: this.member.mobile,
					toWhere: this.member.toWhere.name,
					postAddress: this.member.postAddress,
					awards: this.formatAwardsPost(),
					userid: this.member.userid ? this.member.userid : null,
				})
				.then((data) => {
					data = data.data;
					if (data.status === "success") {
						this.$barWarning("更新成功", {
							status: "correct",
						});
						this.thisValue = false;
						this.clearInfo();
						this.$emit("finished");
					} else {
						this.$barWarning(data.status, {
							status: "warning",
						});
					}
					this.lock.update = true;
				})
				.catch((err) => {
					this.$barWarning(err, {
						status: "error",
					});
					this.lock.update = true;
				});
		},
		openMarkdown() {
			let files = this.$refs.md_input.files;
			if (files.length > 0) {
				let file = files[0];
				let reader = new FileReader();
				reader.onload = (e) => {
					let mdContent = e.target.result;
					let obj = this.$refs.editor.computeMarkdown(mdContent);
					this.$refs.editor.editor.commands.setContent(obj);
					this.$refs.md_input.value = "";
				};
				reader.readAsText(file);
			}
		},
		markdownTemplate() {
			let mdContent = cv_template.content;
			let obj = this.$refs.editor.computeMarkdown(mdContent);
			this.$refs.editor.editor.commands.setContent(obj);
		},
		selectUser() {
			if (this.userChoosen.length !== 1) return;
			this.member.userid = this.userChoosen[0].userid;
		},
		pushAward(index = -1) {
			let item = {
				id: "",
				competitionName: "",
				level: "",
				session: "",
				date: new Date(),
				region: "",
			};
			if (index === -1) this.member.awards.push(item);
			else this.member.awards.splice(index + 1, 0, item);
		},
		pushTop(index) {
			if (index === 0) return;
			let aItem = this.member.awards[index - 1];
			let bItem = this.member.awards[index];
			this.member.awards.splice(index, 1, aItem);
			this.member.awards.splice(index - 1, 1, bItem);
		},
		pushBottom(index) {
			if (index === this.member.awards.length - 1) return;
			let aItem = this.member.awards[index + 1];
			let bItem = this.member.awards[index];
			this.member.awards.splice(index, 1, aItem);
			this.member.awards.splice(index + 1, 1, bItem);
		},
		removeAward(index = -1) {
			if (index === -1) index = this.member.awards.length - 1;
			this.member.awards.splice(index, 1);
		},
		clearInfo() {
			for (let key in this.member) {
				if (Array.isArray(this.member[key])) this.member[key] = [];
				else this.member[key] = "";
			}
			this.$refs.editor.editor.commands.clearContent();
			this.avatar = null;
			this.avatarBlob = null;
		},
	},
};
</script>

<style lang="scss">
.fv-dark-Panel .fv-panel-container * {
	color: inherit;
}

.model-panel-container {
	position: relative;
	width: 100%;
	height: 100%;
	padding: 15px 15px 55px 15px;
	color: rgba(28, 30, 41, 1);
	font-family: Akkurat Std, -apple-system, BlinkMacSystemFont, Segoe UI,
		Roboto, Oxygen, Ubuntu, Cantarell, Helvetica Neue, sans-serif;
	font-weight: 400;
	line-height: 2;
	box-sizing: border-box;
	overflow: overlay;

	&.dark {
		color: whitesmoke;
	}

	.panel-title {
		font-size: 12px;
	}

	.sec-title {
		font-size: 12px;
	}

	.panel-row {
		position: relative;
		margin: 5px 0px;
		padding: 0px 5px;
		display: flex;
		align-items: center;

		.panel-title {
			font-size: 15px;
			font-weight: bold;
		}

		.panel-info-content {
			font-size: 15px;
			font-weight: 400;
		}

		.panel-text-field {
			position: relative;
			width: 100%;
			height: 80px;
		}

		&.award-item {
			gap: 5px;
			flex-wrap: wrap;
		}
	}

	.background-panel-row {
		position: relative;
		width: 100%;
		height: 150px;
		border-radius: 6px;
		transition: all 0.1s;
		overflow: hidden;

		&:hover {
			opacity: 0.6;
		}

		&:active {
			opacity: 0.9;
		}

		img {
			width: 100%;
			height: 100%;
			border: none;
			outline: none;
			object-fit: cover;
		}
	}

	.intro-power-editor {
		width: 100%;
		height: auto;
		border: rgba(200, 200, 200, 0.1) solid thin;
		box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.1);
		overflow: hidden;
	}
}
</style>

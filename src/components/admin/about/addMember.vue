<template>
	<fv-panel
		v-model="thisValue"
		:title="local('Member Information')"
		width="calc(100% - 30px)"
		height="1200px"
		:theme="theme"
		background="rgba(70, 70, 70, 0.6)"
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
					<p class="panel-title">{{ local("ID") }}</p>
				</div>
				<div class="panel-row">
					<fv-text-box
						v-model="member.id"
						:theme="theme"
						:placeholder="local('No CV ID')"
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
					<p class="panel-title">* {{ local("Name") }}</p>
				</div>
				<div class="panel-row">
					<fv-text-box
						v-model="member.name"
						:theme="theme"
						:placeholder="local('Please input name')"
						underline
						:border-width="2"
						:border-color="'rgba(120, 120, 120, 0.1)'"
						:background="'rgba(60, 60, 60, 1)'"
						:focus-border-color="'rgba(0, 90, 158, 1)'"
						:is-box-shadow="true"
					></fv-text-box>
				</div>
				<div class="panel-row" style="margin-top: 15px">
					<p class="panel-title">* {{ local("Member Avatar") }}</p>
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
							@click="show.avatar ^= true"
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
					<div
						v-show="show.avatar"
						class="panel-row"
						style="width: 350px"
					>
						<choose-avatar
							ref="avatar"
							:theme="theme"
							@update-base64="avatar = $event"
							@update-img="avatarBlob = $event"
						>
						</choose-avatar>
					</div>
				</transition>
				<div
					v-show="show.avatar"
					class="panel-row"
					style="width: 350px; justify-content: center"
				>
					<fv-button
						:theme="theme"
						icon="ChevronUp"
						:is-box-shadow="true"
						style="width: 120px; margin-left: 5px"
						@click="show.avatar = false"
						>{{ local("Collapse") }}</fv-button
					>
				</div>
				<div class="panel-row" style="margin-top: 15px">
					<p class="panel-title">* {{ local("Admission Year") }}</p>
				</div>
				<div class="panel-row">
					<fv-text-box
						v-model="member.grade"
						:placeholder="local('Please input admission year')"
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
					<p class="panel-title">* {{ local("Email") }}</p>
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
					<p class="panel-title">
						* {{ local("Phone (not publicly displayed)") }}
					</p>
				</div>
				<div class="panel-row">
					<fv-text-box
						v-model="member.mobile"
						:placeholder="local('Please input phone number')"
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
					<p class="panel-title">* {{ local("Graduation Year") }}</p>
				</div>
				<div class="panel-row">
					<fv-text-box
						v-model="member.session"
						:placeholder="local('Please input graduation year')"
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
					<p class="panel-title">* {{ local("Education") }}</p>
				</div>
				<div
					class="panel-row"
					:style="{ 'z-index': 12 + member.awards.length * 2 }"
				>
					<fv-DropDown
						:placeholder="local('Please select education')"
						:theme="theme"
						v-model="member.educations"
						:options="eduList"
					>
					</fv-DropDown>
				</div>
				<div class="panel-row" style="margin-top: 15px">
					<p class="panel-title">* {{ local("Major") }}</p>
				</div>
				<div
					class="panel-row"
					:style="{ 'z-index': 10 + member.awards.length * 2 }"
				>
					<fv-Combobox
						:placeholder="local('Please select major')"
						:theme="theme"
						v-model="member.major"
						:options="majorList"
					>
					</fv-Combobox>
				</div>
				<div class="panel-row" style="margin-top: 15px">
					<p class="panel-title">* {{ local("Team") }}</p>
				</div>
				<div
					class="panel-row"
					:style="{ 'z-index': 8 + member.awards.length * 2 }"
				>
					<fv-DropDown
						:placeholder="local('Please select team')"
						v-model="member.teams"
						:theme="theme"
						:options="teamList"
						:multiple="true"
					>
					</fv-DropDown>
				</div>
				<div class="panel-row" style="margin-top: 15px">
					<p class="panel-title">* {{ local("Group") }}</p>
				</div>
				<div
					class="panel-row"
					:style="{ 'z-index': 6 + member.awards.length * 2 }"
				>
					<fv-DropDown
						:placeholder="local('Please select group')"
						v-model="member.groups"
						:theme="theme"
						:options="groupList"
						:multiple="true"
					>
					</fv-DropDown>
				</div>
				<div class="panel-row" style="margin-top: 15px">
					<p class="panel-title">* {{ local("Destination Type") }}</p>
				</div>
				<div
					class="panel-row"
					:style="{ 'z-index': 4 + member.awards.length * 2 }"
				>
					<fv-Combobox
						:placeholder="local('Please select destination')"
						:theme="theme"
						v-model="member.toWhere"
						:options="toWhereList"
					>
					</fv-Combobox>
				</div>
				<div class="panel-row" style="margin-top: 15px">
					<p class="panel-title">
						{{ local("Graduation Destination") }}
					</p>
				</div>
				<div
					class="panel-row"
					:style="{ 'z-index': 2 + member.awards.length * 2 }"
				>
					<fv-text-box
						v-model="member.postAddress"
						:placeholder="
							local('Please input graduation destination')
						"
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
					<p class="panel-title">{{ local("External Link") }}</p>
				</div>
				<div class="panel-row">
					<fv-text-box
						v-model="member.external"
						:placeholder="local('Please input external CV URL')"
						left-icon="Link"
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
					<p class="panel-title">{{ local("Position/Title") }}</p>
				</div>
				<div class="panel-row">
					<fv-text-box
						v-model="member.title"
						:placeholder="local('Please input position and title')"
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
					<p class="panel-title">
						{{
							local(
								"Linked User (ignore if the user is not registered)",
							)
						}}
					</p>
				</div>
				<div v-if="isManager" class="panel-row">
					<fv-text-box
						:placeholder="local('Please input user ID')"
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
								? this.local("Linked User: ") + member.userid
								: this.local(
										"Unlinked User (Please select a single user below and click confirm button.)",
									)
						}}
					</p>
					<fv-button
						v-if="isManager"
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
					ref="table"
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
					>{{ local("Confirm User ID") }}</fv-button
				>
				<div class="panel-row" style="margin-top: 15px">
					<p class="panel-title">{{ local("Award Registration") }}</p>
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
						:placeholder="local('20th')"
						type="number"
						underline
						:theme="theme"
						:prefix="local('Session')"
						:border-width="2"
						:border-color="'rgba(120, 120, 120, 0.1)'"
						:background="'rgba(60, 60, 60, 1)'"
						:focus-border-color="'rgba(0, 90, 158, 1)'"
						:is-box-shadow="true"
						style="width: 150px; height: 35px"
					></fv-text-box>
					<fv-search-box
						v-model="item.competitionName"
						:placeholder="local('Please select award')"
						:theme="theme"
						:options="awardList"
						:is-box-shadow="true"
						style="width: 250px; flex: 1"
					>
					</fv-search-box>
					<fv-Combobox
						v-model="item.level"
						:placeholder="local('Please select award level')"
						:theme="theme"
						:options="awardLevelList"
						:is-box-shadow="true"
						style="width: 80px"
					>
					</fv-Combobox>
					<fv-text-box
						v-model="item.region"
						:placeholder="local('Peking University · Beijing')"
						:theme="theme"
						underline
						:prefix="local('Location')"
						:border-width="2"
						:border-color="'rgba(120, 120, 120, 0.1)'"
						:background="'rgba(60, 60, 60, 1)'"
						:focus-border-color="'rgba(0, 90, 158, 1)'"
						:is-box-shadow="true"
						style="width: 160px; height: 35px"
					></fv-text-box>
					<fv-DatePicker
						v-model="item.date"
						class="date-picker"
						:months="[
							local('January'),
							local('February'),
							local('March'),
							local('April'),
							local('May'),
							local('June'),
							local('July'),
							local('August'),
							local('September'),
							local('October'),
							local('November'),
							local('December'),
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
						:title="local('Move Up')"
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
						:title="local('Move Down')"
						@click="pushBottom(index)"
					>
						<i class="ms-Icon ms-Icon--ChevronDown"></i>
					</fv-button>
				</div>
				<div class="panel-row" style="margin-top: 15px">
					<p class="panel-title">{{ local("CV") }}</p>
				</div>
				<fv-button
					theme="dark"
					:background="'rgba(0, 90, 158, 1)'"
					:icon="'GiftboxOpen'"
					:is-box-shadow="true"
					style="width: 120px; margin-left: 5px"
					@click="markdownTemplate"
					>{{ local("Quick Template") }}</fv-button
				>
				<div class="panel-row" style="z-index: 1">
					<power-editor
						:placeholder="local('Fill in your CV...')"
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
										? 'rgba(48, 52, 55, 1)'
										: 'rgba(255, 255, 255, 1)'
								"
								:class="[x.defaultClass]"
								:isBoxShadow="true"
								:title="local('Import Markdown')"
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
										filter: invert(1);
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
				style="width: 150px; margin-left: 5px"
				@click="addMember"
				>{{ local("Add Information") }}</fv-button
			>
			<fv-button
				v-else
				theme="dark"
				:background="'rgba(0, 90, 158, 1)'"
				:disabled="!lock.update || disabledAdd"
				style="width: 150px; margin-left: 5px"
				@click="updateMember"
				>{{ local("Update Information") }}</fv-button
			>
			<fv-button
				:theme="theme"
				style="width: 120px; margin-left: 5px"
				@click="thisValue = false"
				>{{ local("Cancel") }}</fv-button
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
		modelValue: {
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
			thisValue: this.modelValue,
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
				external: "",
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
		modelValue(val) {
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
				if (this.$refs.table) {
					this.$refs.table.headInit();
				}
				console.log(this.member);
			}
		},
		thisValue(val) {
			this.$emit("update:modelValue", val);
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
			const updateInfo = (res) => {
				if (res.status === "success") {
					let data = res.data;
					let majorObj = this.majorList.find(
						(it) => it.text === data.major,
					);
					if (majorObj) data.major = majorObj;
					let toWhereObj = this.toWhereList.find(
						(it) => it.text === data.toWhere,
					);
					if (toWhereObj) data.toWhere = toWhereObj;
					data.grade = data.grade ? data.grade.toString() : "";
					data.session = data.session ? data.session.toString() : "";
					for (let key in data) {
						if (data[key]) {
							if (
								["educations", "teams", "groups"].includes(
									key,
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
								let levelObj = this.awardLevelList.find(
									(it) => it.text === el.level,
								);
								if (levelObj) el.level = levelObj;
								el.date = new Date(el.date);
							});
						}
					}
					this.$refs.editor
						.editor()
						.commands.setContent(
							this.computeContent(this.member.introduction),
						);
				} else {
					this.$barWarning(res.status, {
						status: "warning",
					});
				}
			};
			if (this.isManager) {
				await this.$api.Member.GetMember(this.updateMemberInfo.id)
					.then((res) => {
						updateInfo(res);
					})
					.catch((err) => {
						this.$barWarning(err, {
							status: "error",
						});
					});
			} else {
				await this.$api.Member.GetMyCv()
					.then((res) => {
						updateInfo(res);
					})
					.catch((err) => {
						this.$barWarning(err, {
							status: "error",
						});
					});
			}
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
						? it.competitionName
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
						this.$refs.editor.editor().getJSON(),
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
					external: this.member.external ? this.member.external : "",
				})
				.then((data) => {
					data = data.data;
					if (data.status === "success") {
						this.$barWarning(this.local("Add Success"), {
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
						this.$refs.editor.editor().getJSON(),
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
					external: this.member.external ? this.member.external : "",
				})
				.then((data) => {
					data = data.data;
					if (data.status === "success") {
						this.$barWarning(this.local("Update Success"), {
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
					this.$refs.editor.editor().commands.setContent(obj);
					this.$refs.md_input.value = "";
				};
				reader.readAsText(file);
			}
		},
		markdownTemplate() {
			let mdContent = cv_template.content;
			let obj = this.$refs.editor.computeMarkdown(mdContent);
			this.$refs.editor.editor().commands.setContent(obj);
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
			this.$refs.editor.editor().commands.clearContent();
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
	font-family:
		Akkurat Std,
		-apple-system,
		BlinkMacSystemFont,
		Segoe UI,
		Roboto,
		Oxygen,
		Ubuntu,
		Cantarell,
		Helvetica Neue,
		sans-serif;
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

	.date-picker {
		input {
			color: whitesmoke;
		}

		.fv-date-picker-options-bar-accept,
		.fv-date-picker-options-bar-cancel {
			color: whitesmoke;
		}
	}

	.intro-power-editor {
		width: 100%;
		height: auto;
		background: rgba(36, 36, 36, 1);
		border: rgba(200, 200, 200, 0.1) solid thin;
		box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.1);
		overflow: hidden;
	}
}
</style>

<template>
	<div class="m-laws-block">
		<div class="row between">
			<h1 class="main-title">{{ local("Team Introduction Management") }}</h1>
			<fv-text-box
				:theme="theme"
				v-model="currentSearch"
				:placeholder="local('Filter in the Result')"
				icon="Filter"
				borderWidth="2"
				:revealBorder="true"
				:is-box-shadow="true"
			></fv-text-box>
		</div>
		<div class="row command-bar">
			<fv-command-bar
				:theme="theme"
				:options="cmd"
				style="flex: 1"
			></fv-command-bar>
		</div>
		<div class="row main-table">
			<fv-details-list
				v-model="objs"
				:theme="theme"
				:head="head"
				:filter="currentSearch"
				style="width: 100%; height: 100%"
				:multiSelection="true"
				@rightclick="currentItem = $event"
				@choose-items="currentChoosen = $event"
			>
				<template v-slot:column_0="x">
					<p class="sec">{{ x.row_index + 1 }}</p>
				</template>
				<template v-slot:column_1="x">
					<p
						:title="x.item.id"
						class="highlight sec"
						@click="ShowRevise(x.item)"
					>
						{{ x.item.id }}
					</p>
				</template>
				<template v-slot:column_2="x">
					<p class="highlight sec" @click="ShowRevise(x.item)">
						{{ x.item.name }}
					</p>
				</template>
				<template v-slot:column_3="x">
					<p class="sec">{{ x.item.grade }}</p>
				</template>
				<template v-slot:column_4="x">
					<p class="sec">{{ x.item.session }}</p>
				</template>
				<template v-slot:column_5="x">
					<p class="sec">{{ x.item.major }}</p>
				</template>
				<template v-slot:menu>
					<div>
						<span @click="show.majorManage = true"
							><i
								class="ms-Icon ms-Icon--Add"
								style="color: rgba(0, 90, 158, 1)"
							></i>
							<p>{{ local("Add Member") }}</p>
						</span>
						<span @click="ShowRevise(currentItem)"
							><i
								class="ms-Icon ms-Icon--Edit"
								style="color: rgba(0, 90, 158, 1)"
							></i>
							<p>{{ local("Edit Information") }}</p>
						</span>
						<span @click="delMember(currentItem)"
							><i
								class="ms-Icon ms-Icon--Delete"
								style="color: rgba(173, 38, 45, 1)"
							></i>
							<p>{{ local("Delete Member") }}</p>
						</span>
					</div>
				</template>
			</fv-details-list>
		</div>
		<major-manage v-model="show.majorManage" :theme="theme"></major-manage>
		<team-manage v-model="show.teamManage" :theme="theme"></team-manage>
		<group-manage v-model="show.groupManage" :theme="theme"></group-manage>
		<to-where-manage
			v-model="show.toWhere"
			:theme="theme"
		></to-where-manage>
		<edu-manage v-model="show.eduManage" :theme="theme"></edu-manage>
		<award-manage v-model="show.awardManage" :theme="theme"></award-manage>
		<add-member
			v-model="show.addMember"
			:updateMemberInfo="currentItem"
			:theme="theme"
			@finished="getMembers()"
		></add-member>
	</div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useApp } from "@/stores/useApp";
import { useTheme } from "@/stores/useTheme";
import { useUser } from "@/stores/useUser";
import majorManage from "@/components/admin/about/majorManage.vue";
import addMember from "@/components/admin/about/addMember.vue";
import teamManage from "@/components/admin/about/teamManage.vue";
import groupManage from "@/components/admin/about/groupManage.vue";
import toWhereManage from "@/components/admin/about/toWhereManage.vue";
import awardManage from "@/components/admin/about/awardManage.vue";
import eduManage from "@/components/admin/about/eduManage.vue";

export default {
	components: {
		majorManage,
		teamManage,
		groupManage,
		toWhereManage,
		eduManage,
		awardManage,
		addMember,
	},
	data() {
		return {
			cmd: [
				{
					name: () => this.local("Add Member"),
					icon: "Contact",
					iconColor: "rgba(0, 90, 158, 1)",
					func: () => {
						this.currentItem = {};
						this.show.addMember = true;
					},
				},
				{
					name: () => this.local("Major Management"),
					icon: "Package",
					iconColor: "rgba(0, 90, 158, 1)",
					func: () => {
						this.show.majorManage = true;
					},
				},
				{
					name: () => this.local("Team Management"),
					icon: "People",
					iconColor: "rgba(0, 90, 158, 1)",
					func: () => {
						this.show.teamManage = true;
					},
				},
				{
					name: () => this.local("Group Management"),
					icon: "Group",
					iconColor: "rgba(0, 90, 158, 1)",
					func: () => {
						this.show.groupManage = true;
					},
				},
				{
					name: () => this.local("Destination Management"),
					icon: "GuestUser",
					iconColor: "rgba(0, 90, 158, 1)",
					func: () => {
						this.show.toWhere = true;
					},
				},
				{
					name: () => this.local("Education Management"),
					icon: "Education",
					iconColor: "rgba(0, 90, 158, 1)",
					func: () => {
						this.show.eduManage = true;
					},
				},
				{
					name: () => this.local("Award Management"),
					icon: "Certificate",
					iconColor: "rgba(0, 90, 158, 1)",
					func: () => {
						this.show.awardManage = true;
					},
				},
				{
					name: () => this.local("Delete Member"),
					icon: "Delete",
					iconColor: "rgba(173, 38, 45, 1)",
					disabled: () => this.currentChoosen.length <= 0,
					func: () => {
						this.delMembers();
					},
				},
			],
			head: [
				{ content: () => this.local("No."), width: 120 },
				{ content: "id", sortName: "id", width: 150 },
				{ content: () => this.local("Name"), sortName: "name", width: 250 },
				{ content: () => this.local("Admission Year"), sortName: "grade", width: 120 },
				{ content: () => this.local("Graduation Year"), sortName: "session", width: 120 },
				{ content: () => this.local("Major"), sortName: "major", width: 200 },
			],
			objs: [],
			currentSearch: "",
			currentItem: {},
			currentChoosen: [],
			show: {
				majorManage: false,
				teamManage: false,
				groupManage: false,
				toWhere: false,
				eduManage: false,
				awardManage: false,
				addMember: false,
			},
		};
	},
	computed: {
		...mapState(useApp, ["local"]),
		...mapState(useTheme, ["color", "gradient", "theme"]),
	},
	mounted() {
		this.getMembers();
	},
	methods: {
		getMembers() {
			this.$axios({
				method: "get",
				url: "/list_members?limit=9999999",
			}).then((res) => {
				res = res.data;
				this.objs = res.data.list;
			});
			this.show.majorManage = false;
			this.show.addMember = false;
		},
		delMember(item) {
			let el = this;
			this.$infoBox(`${this.local("You will remove")} ${item.name}`, {
				title: this.local("Confirm Delete"),
				status: "error",
				confirm: () => {
					this.$axios({
						method: "get",
						url: `/remove_member?id=${item.id}`,
					}).then((data) => {
						data = data.data;
						if (data.status == "success") {
							this.$barWarning(this.local("Delete Success"), {
								status: "correct",
							});
							el.getMembers();
						} else
							this.$barWarning(data.status, {
								status: "warning",
							});
					});
				},
			});
		},
		delMembers() {
			if (this.currentChoosen.length == 0) {
				this.$barWarning(this.local("No members selected."), { status: "warning" });
				return 0;
			}
			this.$infoBox(this.local("You will remove the selected members, but the system will keep their resources"), {
				title: this.local("Confirm Delete"),
				status: "error",
				confirm: () => {
					let promises = [];
					for (let item of this.currentChoosen) {
						promises.push(
							this.$axios({
								method: "get",
								url: `/remove_member?id=${item.id}`,
							})
						);
					}
					Promise.all(promises).then(() => {
						this.$barWarning(this.local("Delete Success"), {
							status: "correct",
						});
						this.getMembers();
					});
				},
			});
		},
		ShowRevise(item) {
			this.show.addMember = true;
			this.currentItem = item;
		},
	},
};
</script>

<style lang="scss">
.m-laws-block {
	position: relative;
	height: 100%;
	flex: 1;
	box-sizing: border-box;
	overflow: hidden;

	display: flex;
	flex-direction: column;

	.row {
		position: relative;
		width: 100%;
		height: auto;
		padding: 12px;
		box-sizing: border-box;

		&.between {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		&.command-bar {
			padding: 0px 12px;
			display: flex;
			align-items: center;
		}

		&.main-table {
			width: calc(100% - 24px);
			flex: 1;
			margin: 8px 12px;
			padding: 0px;
			background: rgba(50, 49, 48, 1);
			border-radius: 5px;
			box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.1);
			overflow: hidden;

			p.highlight {
				text-align: center;
				cursor: pointer;

				&:hover {
					color: rgba(0, 90, 158, 1);
					text-decoration: underline;
				}
			}
		}

		&.bottom-control {
			width: calc(100% - 24px);
			height: 45px;
			margin: 8px 12px;
			padding: 0px;
			border-radius: 5px;
			overflow: hidden;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.head-info {
			position: absolute;
			left: 0px;
			top: 100%;
			width: 100%;
			height: auto;
			background: whitesmoke;
			display: flex;
			flex-direction: column;
			box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.1);
			z-index: 20;

			.item {
				width: 100%;
				min-height: 35px;
				height: 35px;
				padding: 0px 15px;
				font-size: 12px;
				font-weight: 400;
				box-sizing: border-box;
				grid-template-columns: 80px 80px 80px 1fr;
				display: grid;
				align-items: center;
			}
		}
	}

	.main-title {
		@include nowrap;
		@include color-pku-dair;

		font-size: 18px;
		font-weight: 600;
		color: rgba(172, 89, 101, 0.9);
	}
}
</style>





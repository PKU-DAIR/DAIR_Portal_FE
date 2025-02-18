<template>
	<div class="m-laws-block">
		<div class="row between">
			<h1 class="main-title">{{ local("Users Management") }}</h1>
			<fv-text-box
				v-model="currentSearch"
				:theme="theme"
				:placeholder="local('Filter in the Result')"
				icon="Filter"
				borderWidth="2"
				:revealBorder="true"
				:is-box-shadow="true"
			></fv-text-box>
		</div>
		<div class="row command-bar">
			<fv-command-bar
				:options="cmd"
				:theme="theme"
				background="transparent"
				style="flex: 1"
			></fv-command-bar>
		</div>
		<div class="row main-table">
			<fv-details-list
				v-model="objs"
				:theme="theme"
				:head="head"
				:filter="currentSearch"
				:foreground="color"
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
						class="sec highlight"
						:title="x.item.id"
						@click="showUserRole(x.item)"
					>
						{{ x.item.userid }}
					</p>
				</template>
				<template v-slot:column_2="x">
					<p class="sec highlight" @click="showUserRole(x.item)">
						{{ x.item.name }}
					</p>
				</template>
				<template v-slot:column_3="x">
					<fv-tag
						:theme="theme"
						:value="x.item.gender ? [{ text: x.item.gender }] : []"
					></fv-tag>
				</template>
				<template v-slot:column_4="x">
					<fv-tag
						:theme="theme"
						:value="[{ text: x.item.email }]"
					></fv-tag>
				</template>
				<template v-slot:column_5="x">
					<fv-tag
						:theme="theme"
						:value="[{ text: x.item.invite_code }]"
					></fv-tag>
				</template>
				<template v-slot:column_6="x">
					<fv-tag
						:theme="theme"
						:value="[{ text: x.item.phone }]"
					></fv-tag>
				</template>
				<template v-slot:column_7="x">
					<p class="sec highlight" @click="showUserRole(x.item)">
						{{ x.item.role }}
					</p>
				</template>
				<template v-slot:menu>
					<div>
						<span @click="show.userRole = true"
							><i
								class="ms-Icon ms-Icon--GuestUser"
								:style="{ color: color }"
							></i>
							<p>{{ local("User Role") }}</p>
						</span>
					</div>
				</template>
			</fv-details-list>
		</div>
		<user-role v-model="show.userRole" :user="currentItem"></user-role>
	</div>
</template>

<script>
import { mapGetters } from "vuex";

import userRole from "@/components/admin/users/userRole.vue";

export default {
	components: {
		userRole,
	},
	data() {
		return {
			cmd: [
				{
					name: () =>
						this.local("User number") + " " + this.objs.length,
					icon: "Group",
					iconColor: "rgba(0, 90, 158, 1)",
					func: () => {},
				},
			],
			head: [
				{ content: () => this.local("No."), width: 120 },
				{ content: "ID", sortName: "userid", width: 120 },
				{
					content: () => this.local("Name"),
					sortName: "name",
					width: 120,
				},
				{
					content: () => this.local("Gender"),
					sortName: "gender",
					width: 120,
				},
				{
					content: () => this.local("Email"),
					sortName: "email",
					width: 250,
				},
				{
					content: () => this.local("Invite Code"),
					sortName: "invite_code",
					width: 100,
				},
				{
					content: () => this.local("Phone"),
					sortName: "phone",
					width: 200,
				},
				{
					content: () => this.local("Role"),
					sortName: "role",
					width: 100,
				},
			],
			objs: [],
			currentSearch: "",
			currentItem: {},
			currentChoosen: [],
			show: {
				userRole: false,
			},
		};
	},
	computed: {
		...mapGetters(["local"]),
		...mapGetters("Theme", ["color", "gradient", "theme"]),
		getDate() {
			return (item) => {
				if (typeof item !== "object") item = new Date(item * 1000);
				return this.$SDate.Format("YYYY-mm-dd HH:MM:SS", item);
			};
		},
	},
	mounted() {
		this.getUsers();
	},
	methods: {
		getUsers() {
			this.$axios({
				method: "get",
				url: "/user/get_users",
			})
				.then((res) => {
					res = res.data;
					if (res.code === 200) {
						this.objs = res.data;
					}
				})
				.catch((err) => {
					console.log(err);
				});
		},
		showUserRole(item) {
			this.currentItem = item;
			this.show.userRole = true;
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
			background: black;
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
		@include color-orange-pink;

		font-size: 18px;
		font-weight: 600;
		color: rgba(172, 89, 101, 0.9);
	}
}
</style>

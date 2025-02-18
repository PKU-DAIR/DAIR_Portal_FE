<template>
	<div class="sosd-admin__user-table">
		<fv-details-list
			class="sosd-admin__user-table-list"
			v-model="tableData"
			:head="header"
			:multi-selection="isMultiple"
			@choose-items="$emit('choose-items', $event)"
		>
			<template v-slot:head="x">
				<p class="default-title">
					{{ x.item.content }}
				</p>
			</template>
			<template v-slot:column_0="x">
				<p class="sec highlight">
					{{ x.item.id
					}}{{
						x.item.nickname != null ? `(${x.item.nickname})` : ""
					}}
				</p>
			</template>
			<template v-slot:column_2="x">
				<user-role v-if="showRole" :user="x.item"></user-role>
			</template>
			<template v-slot:column_1="x">
				<div style="display: flex; align-items: center">
					<avatar v-if="showAvatar" class="avatar" :xId="x.item.id" />
					<p
						class="sec"
						:style="{ 'margin-left': showAvatar ? '5px' : '' }"
					>
						{{ x.item.name }}
					</p>
				</div>
			</template>
			<template v-slot:column_3="x">
				<p class="sec">{{ x.item.gender == 0 ? "男" : "女" }}</p>
			</template>
			<template v-slot:column_4="x">
				<p class="sec">{{ x.item.qq }}</p>
			</template>
			<template v-slot:column_5="x">
				<p class="sec">{{ x.item.email }}</p>
			</template>
		</fv-details-list>
		<div class="page-block">
			<fv-Pagination
				:total="config.pages"
				:value="config.currentPage"
				@page-click="handleClickPage"
				@next-click="handleClickPage"
				@prev-click="handleClickPage"
			>
			</fv-Pagination>
		</div>
		<div
			v-show="config.loading"
			class="sosd-admin__user-table-loading-mask"
		>
			<fv-progress-bar :loading="true"></fv-progress-bar>
		</div>
	</div>
</template>

<script>
import avatar from "@/components/general/avatar.vue";
import userRole from "@/components/admin/users/userRole.vue";

export default {
	name: "UserTable",
	components: { avatar, userRole },
	props: {
		search: {
			type: String,
			default: "",
		},
		isMultiple: {
			default: false,
		},
		pageSize: {
			default: 20,
		},
		showAvatar: {
			default: true,
		},
		showRole: {
			default: true,
		},
	},
	data() {
		return {
			header: [
				{
					content: "用户名",
					width: 180,
				},
				{
					content: "姓名",
					width: 120,
				},
				{
					content: "角色",
					width: 120,
					visible: () => this.showRole,
				},
				{
					content: "性别",
					width: 120,
				},
				{
					content: "QQ",
					width: 120,
				},
				{
					content: "邮箱",
					width: 120,
				},
			],
			tableData: [],
			multipleSelection: [],
			info: {},
			config: {
				pageSize: this.pageSize,
				currentPage: 1,
				total: 0,
				pages: 0,
				loading: false,
			},
		};
	},
	watch: {
		search() {
			this.updateTable();
		},
		pageSize(val) {
			this.config.pageSize = val;
		},
	},
	mounted() {
		this.init();
	},
	methods: {
		async init() {
			await this.updatePages();
			await this.getData();
		},
		async getData() {
			if (this.config.loading) return;
			this.config.loading = true;
			// 获取当前页的用户
			let offset = (this.config.currentPage - 1) * this.config.pageSize;
			await this.$api.User.ListUser(
				this.search,
				offset,
				this.config.pageSize
			).then(async (data) => {
				this.tableData = data.list;
				this.config.loading = false;
			});
		},
		async updatePages() {
			if (this.config.loading) return;
			this.config.loading = true;
			// 初始化导航栏，获取用户数
			await this.$api.User.ListUserSize(this.search).then((data) => {
				// update total
				this.config.currentPage = 1;
				this.config.total = data.size;
				this.config.pages = Math.ceil(
					this.config.total / this.config.pageSize
				);
				this.config.loading = false;
			});
		},
		async handleClickPage(page) {
			this.config.currentPage = page;
			this.getData();
		},
		async updateTable() {
			await this.updatePages();
			await this.getData();
		},
	},
};
</script>
<style lang="scss" scoped>
.sosd-admin__user-table {
	position: relative;
	width: 100%;
	margin: 0 10px;
	.sosd-admin__user-table-loading-mask {
		cursor: not-allowed;
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background: rgba(255, 255, 255, 0.8);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	height: 100%;
	.sosd-admin__user-table-list {
		.avatar {
			height: 25px;
			width: 25px;
		}
		width: 100%;
		overflow-y: auto;
		height: calc(100% - 110px);
		margin-bottom: 10px;
	}

	.page-block {
		position: relative;
		width: 100%;
        display: flex;
		overflow-x: overlay;
	}
}
</style>

<template>
	<div class="m-laws-block">
		<div class="row between">
			<h1 class="main-title">{{ local("Publications Management") }}</h1>
			<fv-text-box
				:value="currentSearch"
				:theme="theme"
				:placeholder="local('Filter in the Result')"
				icon="Filter"
				borderWidth="2"
				@debounce-input="currentSearch = $event"
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
						@click="showPub(x.item)"
					>
						{{ x.item.id }}
					</p>
				</template>
				<template v-slot:column_2="x">
					<p
						class="sec highlight"
						@click="showPub(x.item)"
						:title="x.item.title"
					>
						{{ x.item.title }}
					</p>
				</template>
				<template v-slot:column_3="x">
					<fv-tag
						:theme="theme"
						:value="x.item.author ? [{ text: x.item.author }] : []"
						:title="x.item.author"
					></fv-tag>
				</template>
				<template v-slot:column_4="x">
					<fv-tag
						:theme="theme"
						:value="[{ text: x.item.year }]"
					></fv-tag>
				</template>
				<template v-slot:menu>
					<div>
						<span @click="showPub(currentItem)"
							><i
								class="ms-Icon ms-Icon--View"
								:style="{ color: color }"
							></i>
							<p>{{ local("View Pub") }}</p>
						</span>
						<span @click="delPub(currentItem)"
							><i
								class="ms-Icon ms-Icon--Delete"
								style="color: rgba(173, 38, 45, 1)"
							></i>
							<p>{{ local("Remove Pub") }}</p>
						</span>
					</div>
				</template>
			</fv-details-list>
		</div>
		<fv-Pagination
			v-model="page"
			:theme="theme"
			:total="total"
			:background="
				theme === 'dark' ? 'rgba(50, 50, 50, 1)' : 'whitesmoke'
			"
			:foreground="color"
			:shadow="true"
			style="margin: 5px 0px"
		>
		</fv-Pagination>
		<metadata-panel
			v-model="show.pubHub"
			:item="currentItem"
            :theme="theme"
			@finished="getPubs"
		></metadata-panel>
	</div>
</template>

<script>
import { mapGetters } from "vuex";

import metadataPanel from "@/components/admin/pub/metadataPanel.vue";

export default {
	components: {
		metadataPanel,
	},
	data() {
		return {
			cmd: [
				{
					name: () => this.local("Add"),
					icon: "Add",
					iconColor: "rgba(0, 90, 158, 1)",
					func: () => {
						this.currentItem = {};
						this.show.pubHub = true;
					},
				},
				{
					name: () => this.local("Remove Pubs"),
					icon: "Delete",
					iconColor: "rgba(173, 38, 45, 1)",
					disabled: () => this.currentChoosen.length <= 0,
					func: () => {
						this.delPubs();
					},
				},
			],
			head: [
				{ content: () => this.local("No."), width: 120 },
				{ content: "ID", sortName: "userid", width: 80 },
				{
					content: () => this.local("Title"),
					sortName: "title",
					width: 450,
				},
				{
					content: () => this.local("Authors"),
					sortName: "author",
					width: 120,
				},
				{
					content: () => this.local("Year"),
					sortName: "year",
					width: 80,
				},
			],
			objs: [],
			currentSearch: "",
			page: 1,
			limit: 50,
			total: 1,
			currentPage: 1,
			currentItem: {},
			currentChoosen: [],
			show: {
				pubHub: false,
			},
		};
	},
	watch: {
		currentSearch() {
			this.getPubs();
		},
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
		this.getPubs();
	},
	methods: {
		getPubs() {
			this.$axios({
				method: "get",
				url: `/publications/get_publications?search=${
					this.currentSearch
				}&offset=${(this.page - 1) * this.limit}&limit=${this.limit}`,
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
		delPub(item) {
			let el = this;
			this.$infoBox(`Delete ${item.title}`, {
				title: "Confirm",
				theme: this.theme,
				status: "error",
				confirm: () => {
					this.$axios({
						method: "delete",
						url: `/publications/remove?id=${item.id}`,
					}).then((data) => {
						data = data.data;
						if (data.status == "success") {
							this.$barWarning("Success", {
								status: "correct",
							});
							el.getPubs();
						} else
							this.$barWarning(data.status, {
								status: "warning",
							});
					});
				},
			});
		},
		delPubs() {
			if (this.currentChoosen.length == 0) {
				this.$barWarning("Not selected any publications.", {
					status: "warning",
				});
				return 0;
			}
			this.$infoBox(this.local("Remove these publications ?"), {
				title: "Confirm",
				theme: this.theme,
				status: "error",
				confirm: () => {
					let promises = [];
					for (let item of this.currentChoosen) {
						promises.push(
							this.$axios({
								method: "delete",
								url: `/publications/remove?id=${item.id}`,
							})
						);
					}
					Promise.all(promises).then(() => {
						this.$barWarning("Success", {
							status: "correct",
						});
						this.getPubs();
					});
				},
			});
		},
		showPub(item) {
			this.currentItem = item;
			this.show.pubHub = true;
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
		@include color-pku-dair;

		font-size: 18px;
		font-weight: 600;
		color: rgba(172, 89, 101, 0.9);
	}
}
</style>

<template>
	<div class="m-laws-block">
		<div class="row between">
			<h1 class="main-title">{{ local("Product Attributes Management") }}</h1>
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
					<p class="sec">{{ (page - 1) * limit + x.row_index + 1 }}</p>
				</template>
				<template v-slot:column_1="x">
					<p class="sec highlight" @click="showAttribute(x.item)">
						{{ x.item.id }}
					</p>
				</template>
				<template v-slot:column_2="x">
					<p class="sec highlight" @click="showAttribute(x.item)">
						{{ x.item.name }}
					</p>
				</template>
				<template v-slot:column_3="x">
					<fv-tag
						:theme="theme"
						:model-value="x.item.attribute_type ? [{ text: x.item.attribute_type }] : []"
					></fv-tag>
				</template>
				<template v-slot:column_4="x">
					<p class="sec">{{ getDate(x.item.create_time) }}</p>
				</template>
				<template v-slot:column_5="x">
					<p class="sec">{{ getDate(x.item.update_time) }}</p>
				</template>
				<template v-slot:menu>
					<div>
						<span @click="showAttribute(currentItem)">
							<i
								class="ms-Icon ms-Icon--Edit"
								:style="{ color: color }"
							></i>
							<p>{{ local("Edit Attribute") }}</p>
						</span>
						<span @click="delAttribute(currentItem)">
							<i
								class="ms-Icon ms-Icon--Delete"
								style="color: rgba(173, 38, 45, 1)"
							></i>
							<p>{{ local("Remove Attribute") }}</p>
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
			style="margin: 5px 12px"
		>
		</fv-Pagination>
		<attribute-panel
			v-model="show.attributePanel"
			:item="currentItem"
			@finished="getAttributes"
		></attribute-panel>
	</div>
</template>

<script>
import { mapState } from "pinia";
import { useApp } from "@/stores/useApp";
import { useTheme } from "@/stores/useTheme";

import attributePanel from "@/components/admin/products/attributePanel.vue";

export default {
	components: {
		attributePanel,
	},
	data() {
		return {
			cmd: [
				{
					name: () => this.local("Add Attribute"),
					icon: "Add",
					iconColor: "rgba(0, 90, 158, 1)",
					func: () => {
						this.currentItem = {};
						this.show.attributePanel = true;
					},
				},
				{
					name: () => this.local("Back to Products"),
					icon: "Package",
					iconColor: "rgba(0, 90, 158, 1)",
					func: () => {
						this.$Go("/a/products");
					},
				},
				{
					name: () => this.local("Remove Attributes"),
					icon: "Delete",
					iconColor: "rgba(173, 38, 45, 1)",
					disabled: () => this.currentChoosen.length <= 0,
					func: () => {
						this.delAttributes();
					},
				},
			],
			head: [
				{ content: () => this.local("No."), width: 90 },
				{ content: "ID", sortName: "id", width: 120 },
				{ content: () => this.local("Name"), sortName: "name", width: 240 },
				{ content: () => this.local("Attribute Type"), sortName: "attribute_type", width: 180 },
				{ content: () => this.local("Create Time"), sortName: "create_time", width: 180 },
				{ content: () => this.local("Update Time"), sortName: "update_time", width: 180 },
			],
			objs: [],
			currentSearch: "",
			page: 1,
			limit: 20,
			total: 1,
			currentItem: {},
			currentChoosen: [],
			show: {
				attributePanel: false,
			},
		};
	},
	watch: {
		currentSearch() {
			if (this.page !== 1) {
				this.page = 1;
				return;
			}
			this.getAttributes();
		},
		page() {
			this.getAttributes();
		},
	},
	computed: {
		...mapState(useApp, ["local"]),
		...mapState(useTheme, ["color", "theme"]),
	},
	mounted() {
		this.getAttributes();
	},
	methods: {
		getDate(item) {
			if (!item) return "-";
			try {
				if (typeof item !== "object") item = new Date(item);
				if (Number.isNaN(item.getTime())) return "-";
				return this.$SDate.Format("YYYY-mm-dd HH:MM:SS", item);
			} catch (e) {
				return item;
			}
		},
		normalizePagedResponse(res, limit) {
			const payload = res?.data ?? res ?? {};
			const list = Array.isArray(payload)
				? payload
				: Array.isArray(payload.list)
					? payload.list
					: [];
			const totalCount =
				payload.total ??
				payload.count ??
				payload.size ??
				list.length;
			return {
				list,
				total:
					totalCount <= 0
						? 1
						: Math.ceil(totalCount / limit),
			};
		},
		async getAttributes() {
			try {
				const res = await this.$api.Product.ListProductAttributes(
					this.currentSearch || undefined,
					(this.page - 1) * this.limit,
					this.limit,
				);
				if (res.code === 200 || res.status === "success" || !res.code) {
					const { list, total } = this.normalizePagedResponse(
						res,
						this.limit,
					);
					this.objs = list;
					this.total = total;
				}
			} catch (err) {
				console.log(err);
				this.$barWarning(this.local("Get attributes failed"), {
					status: "error",
				});
			}
		},
		showAttribute(item) {
			if (!item) return;
			this.currentItem = Object.assign({}, item);
			this.show.attributePanel = true;
		},
		delAttribute(item) {
			if (!item?.id) return;
			this.$infoBox(`${this.local("Delete")} ${item.name}?`, {
				title: this.local("Confirm"),
				theme: this.theme,
				status: "error",
				confirm: async () => {
					try {
						const res =
							await this.$api.Product.DeleteProductAttribute(
								item.id,
							);
						if (
							res.code === 200 ||
							res.status === "success" ||
							!res.code
						) {
							this.$barWarning(this.local("Success"), {
								status: "correct",
							});
							this.getAttributes();
						}
					} catch (err) {
						console.log(err);
						this.$barWarning(this.local("Delete attribute failed"), {
							status: "error",
						});
					}
				},
			});
		},
		delAttributes() {
			if (!this.currentChoosen.length) return;
			this.$infoBox(this.local("Remove these attributes ?"), {
				title: this.local("Confirm"),
				theme: this.theme,
				status: "error",
				confirm: async () => {
					try {
						await Promise.all(
							this.currentChoosen.map((item) =>
								this.$api.Product.DeleteProductAttribute(
									item.id,
								),
							),
						);
						this.$barWarning(this.local("Success"), {
							status: "correct",
						});
						this.getAttributes();
					} catch (err) {
						console.log(err);
						this.$barWarning(
							this.local("Delete attributes failed"),
							{
								status: "error",
							},
						);
					}
				},
			});
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
			gap: 12px;
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
	}

	.main-title {
		@include nowrap;
		@include color-pku-dair;

		font-size: 18px;
		font-weight: 600;
		color: rgba(172, 89, 101, 0.9);
	}
}

@media screen and (max-width: 900px) {
	.m-laws-block .row.between {
		flex-direction: column;
		align-items: stretch;
	}
}
</style>

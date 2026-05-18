<template>
	<div class="m-laws-block">
		<div class="row between">
			<h1 class="main-title">{{ local("Products Management") }}</h1>
			<div class="filter-group">
				<fv-text-box
					v-model="currentToolType"
					:theme="theme"
					:placeholder="local('Filter tool type')"
					icon="ProductList"
					borderWidth="2"
					:revealBorder="true"
					:is-box-shadow="true"
				></fv-text-box>
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
					<p class="sec highlight" @click="showProduct(x.item)">
						{{ x.item.id }}
					</p>
				</template>
				<template v-slot:column_2="x">
					<p class="sec highlight" @click="showProduct(x.item)">
						{{ x.item.tool_name }}
					</p>
				</template>
				<template v-slot:column_3="x">
					<fv-tag
						:theme="theme"
						:model-value="getTag(x.item.tool_type)"
					></fv-tag>
				</template>
				<template v-slot:column_4="x">
					<p class="sec" :title="x.item.organization">
						{{ x.item.organization }}
					</p>
				</template>
				<template v-slot:column_5="x">
					<fv-tag
						:theme="theme"
						:model-value="getStatusTag(x.item.audit_status)"
					></fv-tag>
				</template>
				<template v-slot:column_6="x">
					<p class="sec">{{ x.item.publisher_id }}</p>
				</template>
				<template v-slot:column_7="x">
					<p class="sec">{{ getDate(x.item.update_time) }}</p>
				</template>
				<template v-slot:menu>
					<div>
						<span @click="showProduct(currentItem)">
							<i
								class="ms-Icon ms-Icon--View"
								:style="{ color: color }"
							></i>
							<p>{{ local("View Product") }}</p>
						</span>
						<span @click="editProduct(currentItem)">
							<i
								class="ms-Icon ms-Icon--Edit"
								:style="{ color: color }"
							></i>
							<p>{{ local("Edit Product") }}</p>
						</span>
						<span @click="delProduct(currentItem)">
							<i
								class="ms-Icon ms-Icon--Delete"
								style="color: rgba(173, 38, 45, 1)"
							></i>
							<p>{{ local("Remove Product") }}</p>
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
		<product-panel
			v-model="show.productPanel"
			:item="currentItem"
			:attributes="attributes"
			@finished="handlePanelFinished"
		></product-panel>
	</div>
</template>

<script>
import { mapState } from "pinia";
import { useApp } from "@/stores/useApp";
import { useTheme } from "@/stores/useTheme";

import productPanel from "@/components/admin/products/productPanel/index.vue";

export default {
	components: {
		productPanel,
	},
	data() {
		return {
			cmd: [
				{
					name: () => this.local("Add Product"),
					icon: "Add",
					iconColor: "rgba(0, 90, 158, 1)",
					func: () => {
						this.currentItem = {};
						this.show.productPanel = true;
					},
				},
				{
					name: () => this.local("Attribute Management"),
					icon: "BulletedList",
					iconColor: "rgba(0, 90, 158, 1)",
					func: () => {
						this.$Go("/a/product-attributes");
					},
				},
				{
					name: () => this.local("Remove Products"),
					icon: "Delete",
					iconColor: "rgba(173, 38, 45, 1)",
					disabled: () => this.currentChoosen.length <= 0,
					func: () => {
						this.delProducts();
					},
				},
			],
			head: [
				{ content: () => this.local("No."), width: 90 },
				{ content: "ID", sortName: "id", width: 120 },
				{ content: () => this.local("Tool Name"), sortName: "tool_name", width: 220 },
				{ content: () => this.local("Tool Type"), sortName: "tool_type", width: 160 },
				{ content: () => this.local("Organization"), sortName: "organization", width: 220 },
				{ content: () => this.local("Audit Status"), sortName: "audit_status", width: 140 },
				{ content: () => this.local("Publisher"), sortName: "publisher_id", width: 140 },
				{ content: () => this.local("Update Time"), sortName: "update_time", width: 180 },
			],
			objs: [],
			attributes: [],
			currentSearch: "",
			currentToolType: "",
			page: 1,
			limit: 20,
			total: 1,
			currentItem: {},
			currentChoosen: [],
			show: {
				productPanel: false,
			},
		};
	},
	watch: {
		currentSearch() {
			if (this.page !== 1) {
				this.page = 1;
				return;
			}
			this.getProducts();
		},
		currentToolType() {
			if (this.page !== 1) {
				this.page = 1;
				return;
			}
			this.getProducts();
		},
		page() {
			this.getProducts();
		},
	},
	computed: {
		...mapState(useApp, ["local"]),
		...mapState(useTheme, ["color", "theme"]),
	},
	mounted() {
		this.getProducts();
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
		getTag(text) {
			return text ? [{ text }] : [];
		},
		getStatusTag(text) {
			if (!text) return [];
			const type =
				String(text).toLowerCase() === "approved"
					? "success"
					: String(text).toLowerCase() === "rejected"
						? "error"
						: "warning";
			return [{ text, type }];
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
		async getProducts() {
			try {
				const res = await this.$api.Product.ListProducts(
					this.currentSearch || undefined,
					this.currentToolType || undefined,
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
				this.$barWarning(this.local("Get products failed"), {
					status: "error",
				});
			}
		},
		async getAttributes() {
			try {
				const res = await this.$api.Product.ListProductAttributes(
					undefined,
					0,
					9999,
				);
				if (res.code === 200 || res.status === "success" || !res.code) {
					const payload = res?.data ?? res ?? {};
					this.attributes = Array.isArray(payload)
						? payload
						: payload.list || [];
				}
			} catch (err) {
				console.log(err);
			}
		},
		showProduct(item) {
			if (!item?.id) return;
			this.currentItem = Object.assign({}, item);
			this.show.productPanel = true;
		},
		editProduct(item) {
			if (!item?.id) return;
			this.currentItem = Object.assign({}, item);
			this.show.productPanel = true;
		},
		delProduct(item) {
			if (!item?.id) return;
			this.$infoBox(`${this.local("Delete")} ${item.tool_name}?`, {
				title: this.local("Confirm"),
				theme: this.theme,
				status: "error",
				confirm: async () => {
					try {
						const res = await this.$api.Product.DeleteProduct(item.id);
						if (
							res.code === 200 ||
							res.status === "success" ||
							!res.code
						) {
							this.$barWarning(this.local("Success"), {
								status: "correct",
							});
							this.getProducts();
						}
					} catch (err) {
						console.log(err);
						this.$barWarning(this.local("Delete product failed"), {
							status: "error",
						});
					}
				},
			});
		},
		delProducts() {
			if (!this.currentChoosen.length) return;
			this.$infoBox(this.local("Remove these products ?"), {
				title: this.local("Confirm"),
				theme: this.theme,
				status: "error",
				confirm: async () => {
					try {
						await Promise.all(
							this.currentChoosen.map((item) =>
								this.$api.Product.DeleteProduct(item.id),
							),
						);
						this.$barWarning(this.local("Success"), {
							status: "correct",
						});
						this.getProducts();
					} catch (err) {
						console.log(err);
						this.$barWarning(this.local("Delete products failed"), {
							status: "error",
						});
					}
				},
			});
		},
		handlePanelFinished() {
			this.getProducts();
			this.getAttributes();
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

	.filter-group {
		display: flex;
		gap: 10px;
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
	.m-laws-block {
		.filter-group {
			width: 100%;
			flex-direction: column;
		}

		.row.between {
			flex-direction: column;
			align-items: stretch;
		}
	}
}
</style>

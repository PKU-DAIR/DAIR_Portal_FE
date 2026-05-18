<template>
	<div class="panel-section data-section">
		<div class="section-head">
			<p class="panel-subtitle">{{ local("Attribute Values") }}</p>
			<fv-button
				:theme="theme"
				style="width: 110px; height: 32px"
				@click="$emit('refresh')"
			>
				{{ local("Refresh") }}
			</fv-button>
		</div>
		<div class="inner-table">
			<fv-details-list
				ref="table"
				:model-value="items"
				:theme="theme"
				:head="valueHead"
				:group="attributeValueGroups"
				:show-group="true"
				:foreground="color"
				style="width: 100%; height: 100%"
			>
				<template v-slot:column_0="x">
					<p class="sec">{{ valueOffset + x.row_index + 1 }}</p>
				</template>
				<template v-slot:column_1="x">
					<p class="sec">{{ x.item.attribute_group_name || "-" }}</p>
				</template>
				<template v-slot:column_2="x">
					<p class="sec">{{ x.item.value }}</p>
				</template>
				<template v-slot:column_3="x">
					<fv-tag
						:theme="theme"
						:model-value="getSingleTag(x.item.publisher_id)"
					></fv-tag>
				</template>
				<template v-slot:column_4="x">
					<p class="sec">{{ getDate(x.item.publish_time) }}</p>
				</template>
				<template v-slot:column_5="x">
					<fv-button
						theme="dark"
						background="rgba(173, 38, 45, 1)"
						style="width: 72px; height: 28px"
						@click="$emit('remove', x.item)"
					>
						{{ local("Delete") }}
					</fv-button>
				</template>
			</fv-details-list>
		</div>
		<fv-Pagination
			:model-value="page"
			:theme="theme"
			:total="total"
			:background="
				theme === 'dark'
					? 'rgba(50, 50, 50, 1)'
					: 'whitesmoke'
			"
			:foreground="color"
			:shadow="true"
			style="margin-top: 10px"
			@update:modelValue="$emit('update:page', $event)"
		>
		</fv-Pagination>
	</div>
</template>

<script>
import { mapState } from "pinia";
import { useApp } from "@/stores/useApp";

export default {
	name: "ProductAttributeValueSection",
	props: {
		items: {
			type: Array,
			default: () => [],
		},
		page: {
			type: Number,
			default: 1,
		},
		limit: {
			type: Number,
			default: 10,
		},
		total: {
			type: Number,
			default: 1,
		},
		theme: {
			type: String,
			default: "light",
		},
		color: {
			type: String,
			default: "",
		},
	},
	emits: ["refresh", "remove", "update:page"],
	data() {
		return {
			valueHead: [
				{ content: "#", width: 60 },
				{ content: "Attribute", width: 180 },
				{ content: "Value", width: 180 },
				{ content: "Publisher", width: 160 },
				{ content: "Publish Time", width: 170 },
				{ content: "Action", width: 100 },
			],
		};
	},
	computed: {
		...mapState(useApp, ["local"]),
		valueOffset() {
			return (this.page - 1) * this.limit;
		},
		attributeValueGroups() {
			const groups = [];
			const existed = new Set();
			for (const item of this.items) {
				const value = item.attribute_group_name || this.local("Unknown");
				if (existed.has(value)) continue;
				existed.add(value);
				groups.push({
					key: "attribute_group_name",
					value,
					name: value,
				});
			}
			return groups;
		},
	},
	methods: {
		refreshHead() {
			this.$refs.table?.headInit?.();
		},
		getSingleTag(text) {
			return text ? [{ text }] : [];
		},
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
	},
};
</script>

<style lang="scss">
.panel-section.data-section {
	padding-top: 8px;
	border-top: rgba(120, 120, 120, 0.15) solid 1px;
	margin-bottom: 16px;

	.section-head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10px;
	}

	.panel-subtitle {
		margin-bottom: 6px;
		font-size: 13px;
		font-weight: 600;
	}

	.inner-table {
		height: 260px;
		background: rgba(0, 0, 0, 0.02);
		border-radius: 8px;
		overflow: hidden;
	}
}

.product-panel-container.dark .panel-section.data-section .inner-table {
	background: rgba(36, 36, 36, 1);
	color: whitesmoke;
}
</style>

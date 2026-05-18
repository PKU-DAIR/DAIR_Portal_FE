<template>
	<div class="panel-section data-section">
		<div class="section-head">
			<p class="panel-subtitle">{{ local("User Reviews") }}</p>
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
				:head="reviewHead"
				:foreground="color"
				style="width: 100%; height: 100%"
			>
				<template v-slot:column_0="x">
					<p class="sec">{{ reviewOffset + x.row_index + 1 }}</p>
				</template>
				<template v-slot:column_1="x">
					<fv-tag
						:theme="theme"
						:model-value="getSingleTag(x.item.reviewer_id)"
					></fv-tag>
				</template>
				<template v-slot:column_2="x">
					<p class="sec long-text">{{ x.item.review }}</p>
				</template>
				<template v-slot:column_3="x">
					<p class="sec">{{ getDate(x.item.review_time) }}</p>
				</template>
				<template v-slot:column_4="x">
					<p class="sec">{{ getDate(x.item.update_time) }}</p>
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
	name: "ProductReviewSection",
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
			reviewHead: [
				{ content: "#", width: 60 },
				{ content: "Reviewer", width: 150 },
				{ content: "Review", width: 250 },
				{ content: "Review Time", width: 170 },
				{ content: "Update Time", width: 170 },
				{ content: "Action", width: 100 },
			],
		};
	},
	computed: {
		...mapState(useApp, ["local"]),
		reviewOffset() {
			return (this.page - 1) * this.limit;
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

	.long-text {
		line-height: 1.6;
		word-break: break-all;
		white-space: normal;
	}
}

.product-panel-container.dark .panel-section.data-section .inner-table {
	background: rgba(36, 36, 36, 1);
	color: whitesmoke;
}
</style>

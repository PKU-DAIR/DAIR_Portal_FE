<template>
	<div class="product-attr-card">
		<p class="attr-card-name">{{ attribute.name }}</p>
		<div class="attr-card-value">
			<p class="plain-value">{{ displayValue ?? "-" }}</p>
		</div>
		<p class="attr-card-meta">
			{{ local("Average") }}: {{ displayMeta }}
		</p>
	</div>
</template>

<script>
import { mapState } from "pinia";
import { useApp } from "@/stores/useApp";

export default {
	props: {
		item: {
			type: Object,
			required: true,
		},
		attribute: {
			type: Object,
			required: true,
		},
	},
	computed: {
		...mapState(useApp, ["local"]),
		record() {
			return this.item.attribute_value_list?.find(
				(value) => value.attribute_id === this.attribute.id,
			);
		},
		displayValue() {
			if (this.record && this.record.avg_value !== undefined) {
				return this.record.avg_value;
			}
			return this.item.attribute_values?.[this.attribute.id];
		},
		displayMeta() {
			return this.displayValue ?? "-";
		},
	},
};
</script>

<style lang="scss">
.product-attr-card {
	width: 170px;
	flex-shrink: 0;
	padding: 14px 14px 12px 14px;
	border-radius: 18px;
	background: linear-gradient(
		180deg,
		rgba(31, 35, 53, 0.92) 0%,
		rgba(22, 24, 37, 0.98) 100%
	);
	box-shadow:
		inset 0 1px 0 rgba(255, 255, 255, 0.04),
		0 10px 24px rgba(0, 0, 0, 0.18);

	.attr-card-name {
		font-size: 12px;
		font-weight: 700;
		color: rgba(225, 230, 248, 0.88);
	}

	.attr-card-value {
		min-height: 40px;
		margin-top: 12px;
		display: flex;
		align-items: center;
	}

	.plain-value {
		font-size: 22px;
		font-weight: 700;
		color: rgba(255, 255, 255, 0.96);
	}

	.attr-card-meta {
		margin-top: 10px;
		font-size: 10px;
		color: rgba(177, 184, 208, 0.68);
	}
}

@media screen and (max-width: 1200px) {
	.product-attr-card {
		width: 156px;
	}
}
</style>

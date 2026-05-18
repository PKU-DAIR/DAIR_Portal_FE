<template>
	<div class="product-attr-card">
		<p class="attr-card-name">{{ local(attribute.name) }}</p>
		<div class="attr-card-value">
			<fv-toggle-switch
				v-if="isBinary"
				:model-value="Boolean(displayValue)"
				:theme="theme"
				:disabled="true"
				:width="68"
				:height="28"
				:on="local('Yes')"
				:off="local('No')"
				:inside-content="true"
				:switch-on-background="'rgba(91, 192, 139, 1)'"
			></fv-toggle-switch>
			<div v-else class="bool-unknown" :title="unknownHint">
				<i class="ms-Icon ms-Icon--Unknown"></i>
			</div>
		</div>
		<p class="attr-card-meta" :title="displayMeta">
			{{ displayMeta }}
		</p>
	</div>
</template>

<script>
import { mapState } from "pinia";
import { useApp } from "@/stores/useApp";
import { useTheme } from "@/stores/useTheme";

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
		...mapState(useTheme, ["theme"]),
		record() {
			return this.item.attribute_value_list?.find(
				(value) => value.attribute_id === this.attribute.id,
			);
		},
		displayValue() {
			if (this.record && this.record.avg_value !== undefined) {
				return Number(this.record.avg_value);
			}
			return Number(this.item.attribute_values?.[this.attribute.id]);
		},
		isBinary() {
			return this.displayValue === 0 || this.displayValue === 1;
		},
		displayMeta() {
			if (Number.isNaN(this.displayValue)) return "-";
			if (this.displayValue > 0 && this.displayValue < 1) {
				return `${Math.round(this.displayValue * 100)}% ${this.local("users think it is free")}`;
			}
			return this.displayValue === 1
				? this.local("Yes")
				: this.local("No");
		},
		unknownHint() {
			if (Number.isNaN(this.displayValue)) return this.local("Unknown");
			return `${this.local("May require payment")}; ${Math.round(this.displayValue * 100)}% ${this.local("users think it is free")}`;
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

	.attr-card-meta {
		@include nowrap;

		margin-top: 10px;
		font-size: 10px;
		color: rgba(177, 184, 208, 0.68);
	}

	.bool-unknown {
		width: 30px;
		height: 30px;
		padding: 0px;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgba(255, 196, 61, 0.14);
		color: rgba(255, 196, 61, 1);
		font-size: 18px;
		box-shadow: inset 0 0 0 1px rgba(255, 196, 61, 0.2);
		cursor: help;
	}
}

@media screen and (max-width: 1200px) {
	.product-attr-card {
		width: 156px;
	}
}
</style>

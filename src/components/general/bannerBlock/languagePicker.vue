<template>
	<div class="language-picker-block">
		<fv-button
			theme="dark"
			background="transparent"
			icon="LocaleLanguage"
			style="width: 50px; height: 30px"
		>
			<i class="ms-Icon ms-Icon--ChevronDown"></i>
		</fv-button>
		<div class="language-menu">
			<button
				v-for="item in languageOptions"
				:key="item.value"
				class="language-item"
				:class="{ active: config.language === item.value }"
				type="button"
				@click="setLanguage(item.value)"
			>
				<span>{{ item.label }}</span>
				<i
					v-show="config.language === item.value"
					class="ms-Icon ms-Icon--CheckMark"
				></i>
			</button>
		</div>
	</div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useApp } from "@/stores/useApp";

export default {
	data() {
		return {
			languageOptions: [
				{ label: "English", value: "en" },
				{ label: "中文", value: "cn" },
			],
		};
	},
	computed: {
		...mapState(useApp, ["config"]),
	},
	methods: {
		...mapActions(useApp, ["setLanguage"]),
	},
};
</script>

<style lang="scss" scoped>
.language-picker-block {
	position: relative;
	width: 50px;
	height: 54px;
	margin-right: 15px;
	display: flex;
	justify-content: center;
	align-items: center;

	.language-menu {
		position: absolute;
		top: 44px;
		right: 0;
		width: 130px;
		padding: 6px;
		border: rgba(255, 255, 255, 0.12) solid 1px;
		border-radius: 8px;
		background: rgba(20, 20, 24, 0.92);
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.28);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		opacity: 0;
		pointer-events: none;
		transform: translateY(-6px);
		transition: all 0.2s;
	}

	&:hover .language-menu,
	&:focus-within .language-menu {
		opacity: 1;
		pointer-events: auto;
		transform: translateY(0);
	}

	.language-item {
		width: 100%;
		height: 34px;
		padding: 0 9px;
		border: none;
		border-radius: 6px;
		background: transparent;
		color: rgba(234, 233, 238, 0.82);
		font-size: 13px;
		font-family: inherit;
		display: flex;
		justify-content: space-between;
		align-items: center;
		cursor: pointer;
		transition: all 0.2s;

		&:hover,
		&.active {
			background: rgba(255, 255, 255, 0.12);
			color: rgba(255, 255, 255, 1);
		}
	}
}
</style>

<template>
	<fv-panel
		v-model="show"
		:theme="theme"
		:title="local(`Profile`)"
		width="600px"
		height="80%"
		:background="
			theme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.6)'
		"
		title-size="13.8"
		:is-central-side="true"
		:is-acrylic="true"
		:is-footer="true"
	>
		<template v-slot:container>
			<div class="panel-container" :class="[{ dark: theme === 'dark' }]">
				<profile :refresh="show"></profile>
			</div>
		</template>
		<template v-slot:footer>
			<div style="width: 100%; display: flex; justify-content: center">
				<fv-button
					theme="dark"
					background="rgba(173, 38, 45, 1)"
					:border-radius="6"
					:is-box-shadow="true"
					style="width: 150px"
					@click="logout"
					>{{ local(`Log out`) }}</fv-button
				>
			</div>
		</template>
	</fv-panel>
</template>

<script>
import profile from "@/components/general/profile/profile.vue";

import { mapGetters, mapMutations } from "vuex";

export default {
	name: "Profile",
	components: {
		profile,
	},
	props: {
		value: {
			default: false,
		},
	},
	data() {
		return {
			show: this.value,
		};
	},
	watch: {
		value() {
			this.show = this.value;
		},
		show() {
			this.$emit("input", this.show);
		},
	},
	computed: {
		...mapGetters(["local"]),
		...mapGetters("Theme", ["color", "gradient", "theme"]),
	},
	mounted() {},
	methods: {
		...mapMutations("user", {
			clearInfo: "clearInfo",
		}),
		logout() {
			localStorage.removeItem("ApiToken");
			this.clearInfo();
			this.$Go("/login");
		},
	},
};
</script>

<style lang="scss">
.panel-container {
	position: relative;
	width: 100%;
	height: 100%;
	padding: 15px 15px 55px 15px;
	color: rgba(28, 30, 41, 1);
	font-family: Akkurat Std, -apple-system, BlinkMacSystemFont, Segoe UI,
		Roboto, Oxygen, Ubuntu, Cantarell, Helvetica Neue, sans-serif;
	font-weight: 400;

	.panel-title {
		font-size: 12px;
	}

	&.dark {
		color: whitesmoke;
	}
}
</style>

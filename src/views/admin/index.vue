<template>
	<div class="manage-container">
		<div class="manage-content-block">
			<fv-navigation-view
				v-model="currentNav"
                theme="dark"
				:title="local(`Management`)"
				:options="navList"
				:expand.sync="isExpand"
				:foreground="color"
				:flyout-display="1368"
				:mobile-display="1024"
				class="navigation-view"
				:show-setting="false"
				@item-click="handleItemClick"
				@back="$Back()"
			></fv-navigation-view>
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	data() {
		return {
			currentNav: {
				key: 0,
				name: () => this.local("Users"),
				icon: "User",
				route: "user",
			},
			isExpand: true,
			navList: [
				{
					key: 0,
					name: () => this.local("Users"),
					icon: "GuestUser",
					route: "",
				},
				{
					key: 1,
					name: () => this.local("About"),
					icon: "Feedback",
					route: "about",
				},
				{
					key: 2,
					name: () => this.local("Playground"),
					icon: "CommandPrompt",
					route: "playground",
				},
				{
					key: 3,
					name: () => this.local("Models"),
					icon: "DialShape3",
					route: "models",
				},
				{
					key: 4,
					name: () => this.local("Quick Instruction"),
					icon: "LightningBolt",
					route: "quick",
				},
				{
					key: 5,
					name: () => this.local("Laws"),
					icon: "DuplexPortraitTwoSidedLongEdge",
					route: "law",
					disabled: true,
				},
			],
		};
	},
	watch: {
		$route() {
			this.routeFormat();
		},
	},
	computed: {
		...mapGetters(["local"]),
		...mapGetters("Theme", ["color", "gradient", "theme"]),
	},
	mounted() {
		this.routeFormat();
	},
	methods: {
		handleItemClick(item) {
			this.$Go(`/a/${item.route}`);
		},
		routeFormat() {
			let path = this.$route.path;
			for (let item of this.navList) {
				if (item.route === "") continue;
				let targetPath = `/a/${item.route}`;
				if (path.startsWith(targetPath)) {
					this.currentNav = item;
					break;
				}
			}
		},
	},
};
</script>

<style lang="scss">
.manage-container {
	@include app;

    background: rgba(23, 17, 24, 1);
	display: flex;
	flex-direction: column;

	.manage-content-block {
		position: relative;
		width: 100%;
		flex: 1;
		box-sizing: border-box;
		display: flex;
		overflow: hidden;

		.navigation-view {
			z-index: 2;
		}
	}
}
</style>

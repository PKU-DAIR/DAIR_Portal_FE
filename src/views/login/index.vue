<template>
	<div class="login-container">
		<banner-block></banner-block>
		<router-view></router-view>
	</div>
</template>

<script>
import bannerBlock from "@/components/general/bannerBlock.vue";

export default {
	components: {
		bannerBlock,
	},
	data() {
		return {};
	},
};
</script>

<style lang="scss" scoped>
.login-container {
	@include app;
	@include HcenterC;

    background: rgba(23, 17, 24, 1);

	.login-bg {
		position: absolute;
		width: 100%;
		height: 100%;
		object-fit: cover;
		z-index: 0;
		opacity: 0.6;
	}
}
</style>

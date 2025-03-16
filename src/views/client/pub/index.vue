<template>
	<div class="news-container">
		<banner-block></banner-block>
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
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

<style lang="scss">
.news-container {
	position: fixed;
	width: 100%;
	height: 100%;
	overflow: overlay;
	overflow-x: hidden;
}
</style>

<template>
	<div class="projs-container">
		<banner-block></banner-block>
		<keep-alive>
			<router-view :title="'Projects'" url="/news/client/projs"></router-view>
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
.projs-container {
	position: fixed;
	width: 100%;
	height: 100%;
    background: rgba(23, 17, 24, 1);
	overflow: overlay;
	overflow-x: hidden;
}
</style>

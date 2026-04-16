<template>
	<div class="news-container">
		<banner-block></banner-block>
		<router-view v-slot="{ Component }">
			<keep-alive>
				<component :is="Component"></component>
			</keep-alive>
		</router-view>
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





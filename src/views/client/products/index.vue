<template>
	<div class="products-container">
		<banner-block></banner-block>
		<router-view v-slot="{ Component }">
			<keep-alive>
				<component :is="Component"></component>
			</keep-alive>
		</router-view>
	</div>
</template>

<script>
import bannerBlock from "@/components/general/bannerBlock/index.vue";

export default {
	components: {
		bannerBlock,
	},
};
</script>

<style lang="scss">
.products-container {
	position: fixed;
	width: 100%;
	height: 100%;
	background: rgba(23, 17, 24, 1);
	overflow: overlay;
	overflow-x: hidden;
}
</style>

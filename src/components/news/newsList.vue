<template>
	<div class="dair-news-list-block">
		<component
			:is="itemComponent(item)"
			v-for="(item, index) in objs"
			:key="index"
			:item="item"
			@view-detail="viewDetail"
		></component>
		<template v-if="objs.length == 0">
			<div
				v-for="i in 6"
				:key="`shimmer: ${i}`"
				class="dair-news-item"
				style="overflow: hidden"
			>
				<fv-Shimmer :theme="theme" style="width: 100%; height: 100%">
					<div
						class="sample"
						style="width: 100%; height: 200px"
					></div>
					<div
						class="sample"
						style="width: 100%; height: 30px; margin-top: 5px"
					></div>
					<div style="width: 100%; margin-top: 5px; display: flex">
						<div
							class="sample"
							style="width: 50px; height: 25px; margin-left: 5px"
						></div>
						<div
							class="sample"
							style="width: 50px; height: 25px; margin-left: 5px"
						></div>
						<div
							class="sample"
							style="width: 50px; height: 25px; margin-left: 5px"
						></div>
						<div
							class="sample"
							style="width: 50px; height: 25px; margin-left: 5px"
						></div>
						<div
							class="sample"
							style="width: 50px; height: 25px; margin-left: 5px"
						></div>
					</div>
				</fv-Shimmer>
			</div>
		</template>
	</div>
</template>

<script>
import newsItem from "./newsItem.vue";
import projItem from "./projItem.vue";

export default {
	components: {
		newsItem,
		projItem,
	},
	props: {
		objs: {
			type: Array,
			default: () => {
				return [];
			},
		},
		theme: {
			default: "light",
		},
	},
	data: function () {
		return {
			loading: false,
			timer: null,
		};
	},
	watch: {},
	computed: {
		imgUrl() {
			return (item) => item.title;
		},
		itemComponent() {
			return (item) => {
				const type = item && (item.news_type || item.new_type);

				if (type && type.includes("proj")) return projItem;
				return newsItem;
			};
		},
	},
	mounted() {},
	methods: {
		NameFormat(item) {
			return item.publisher;
		},
		viewDetail(item) {
			if (item.external) {
				this.$Jump(item.external);
				return;
			}
			this.$Go(`/news/d/${item.id}`);
		},
		pCancelFavor(item) {
			this.$emit("cancelFavor", item);
		},
	},
};
</script>

<style lang="scss">
.dair-news-list-block {
	position: relative;
	width: 100%;
	height: 100%;
	padding: 2px;
	grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
	grid-auto-rows: repeat(auto-fit, auto);
	grid-gap: 15px;
	box-sizing: border-box;
	display: grid;
	overflow: auto;
	overflow-x: hidden;
	-ms-overflow-style: -ms-autohiding-scrollbar;
}

@media screen and (max-width: 750px) {
	.dair-news-list-block {
		grid-template-columns: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
}
</style>

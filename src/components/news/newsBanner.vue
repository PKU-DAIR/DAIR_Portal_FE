<template>
	<fv-img :src="thisBanner" onlazy="true" class="news-pic"></fv-img>
</template>

<script>
export default {
	props: {
		id: {
			default: "",
		},
	},
	data() {
		return {
			thisBanner: "",
		};
	},
	watch: {
		id() {
			this.getCover();
		},
	},
	mounted() {
		this.getCover();
	},
	methods: {
		getCover() {
			if (!this.id) {
				this.thisBanner = "";
				return;
			}
			this.$axios({
				method: "get",
				url: `/get_news_banner?id=${this.id}`,
			})
				.then((res) => {
					res = res.data;
					if (res.code === 200) {
						this.thisBanner = res.data;
					} else {
						this.thisBanner = "";
					}
				})
				.catch((err) => {
					console.log(err);
				});
		},
	},
};
</script>

<style lang="scss">
.news-pic {
	position: relative;
	width: 100%;
	height: auto;
	transition: all 0.3s;
}
</style>

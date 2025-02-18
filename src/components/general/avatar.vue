<template>
	<div class="sosd-avatar-container" :class="{ circle: circle }">
		<fv-img :key="xId" :src="avatar" />
	</div>
</template>

<style lang="scss" scoped>
.sosd-avatar-container {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	user-select: none;
	height: 100%;
	overflow: hidden;

	&.circle {
		border-radius: 50%;
	}
}
</style>

<script>
export default {
	name: "Avatar",
	props: {
		xId: {
			type: String,
			default: "",
		},
		circle: {
			type: Boolean,
			default: true,
		},
	},
	data() {
		return {
			avatar: null,
		};
	},
	mounted() {
		this.init();
	},
	watch: {
		xId() {
			this.init();
		},
	},
	methods: {
		async init() {
			this.$axios({
				method: "get",
				url: `/user/avatar?id=${this.user.userid}`,
			})
				.then((res) => {
					res = res.data;
					if (res.code === 200) this.avatar = res.data;
				})
				.catch((err) => {
					console.log(err);
				});
		},
	},
};
</script>

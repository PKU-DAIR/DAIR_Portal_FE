<template>
	<div class="dair-cv-container" :class="[{ dark: theme === 'dark' }]">
		<div class="dair-banner">
			<news-banner :id="news.id"></news-banner>
		</div>
		<div class="wise-cv-block" style="z-index: 1">
			<power-editor
				:value="computeContent(news.content)"
				:placeholder="'News Content...'"
				:editable="false"
				:theme="theme"
				contentMaxWidth="1200px"
				class="wise-cv-editor"
				ref="editor"
				:editorOutSideBackground="'transparent'"
				editorBackground="transparent"
				:showControlOnReadonly="false"
			>
			</power-editor>
		</div>
		<div class="other-info">
			<time-rounder
				:value="new Date(news.publish_time)"
				foreground="rgba(149, 141, 241, 0.6)"
				style="width: auto"
			></time-rounder>
			<span class="info">
				<i class="ms-Icon ms-Icon--Contact"></i>
				<p style="margin-left: 5px">{{ news.publisher_id }}</p>
			</span>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import timeRounder from "@/components/general/timeRounder.vue";
import newsBanner from "@/components/news/newsBanner.vue";

export default {
	components: {
		timeRounder,
		newsBanner,
	},
	props: {},
	data() {
		return {
			id: "",
			news: {
				id: "",
				content: "",
			},
		};
	},
	watch: {
		id() {
			if (this.id) this.getNews();
		},
		$route() {
			this.getId();
		},
	},
	computed: {
		...mapGetters("Theme", ["color", "gradient", "theme"]),
		computeContent() {
			return (content) => {
				try {
					let jsonContent = JSON.parse(content);
					if (!jsonContent.content)
						jsonContent = {
							type: "doc",
							content: [],
						};
					return jsonContent;
				} catch (e) {
					return content;
				}
			};
		},
	},
	mounted() {
		this.getId();
	},
	methods: {
		getId() {
			if (this.$route.params.id) this.id = this.$route.params.id;
		},
		getNews() {
			this.$axios({
				method: "get",
				url: `/client/get_news?id=${this.id}`,
			}).then(async (res) => {
				res = res.data;
				this.news = res.data;
			});
		},
	},
};
</script>

<style lang="scss">
.dair-cv-container {
	position: relative;
	width: 100%;
	height: auto;

	padding-top: 125px;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	align-items: center;

	&.dark {
		background: rgba(23, 17, 24, 1);
	}

	.dair-banner {
		width: 100%;
		max-width: 1200px;
		height: auto;
		overflow: hidden;
	}

	.wise-cv-block {
		position: relative;
		width: 100%;
		max-width: 1200px;
		margin-top: 15px;
		height: auto;
		box-sizing: border-box;
		display: flex;
		line-height: 2;

		.wise-cv-editor {
			width: 100%;
			height: auto;
			background: transparent;
			overflow: hidden;
		}
	}

	.other-info {
		@include HbetweenVcenter;

		position: relative;
		width: 100%;
		max-width: 1200px;
		margin: 25px 0px;

		.info {
			position: relative;
			width: 200px;
			font-size: 12px;
			color: rgba(200, 200, 200, 1);
			display: flex;
			justify-content: flex-start;
			align-items: center;
			user-select: none;
		}
	}
}

@media screen and (max-width: 1200px) {
	.dair-cv-container {
		.wise-info-block {
			max-width: none;
			padding: 0px 15px;
			flex-direction: column;
		}

		.wise-cv-block {
			max-width: none;
		}

		.award-info-block {
			.award-item {
				height: auto;
				padding: 15px;
				flex-direction: column;
			}
		}

		.other-info {
			@include HstartC;

			width: calc(100% - 30px);
			box-sizing: border-box;
            line-height: 2;
		}
	}
}
</style>

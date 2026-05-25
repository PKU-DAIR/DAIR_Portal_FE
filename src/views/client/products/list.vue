<template>
	<div class="products-wrap" :class="[{ dark: theme === 'dark' }]">
		<div class="hero-block">
			<p class="hero-title">{{ local("Research Ladder") }}</p>
			<p class="hero-subtitle">
				{{
					local(
						"Explore approved AI and research tools ranked by community feedback.",
					)
				}}
			</p>
			<p v-if="updatedAt" class="hero-update">
				{{ local("Updated At") }}: {{ getDate(updatedAt) }}
			</p>
		</div>

		<div class="filter-block">
			<div class="filter-item tool-type-filter">
				<fv-drop-down
					v-model="selectedToolTypes"
					:theme="theme"
					:options="toolTypeOptions"
					:multiple="true"
					:placeholder="local('Filter tool type')"
					:checkBoxBackground="color"
				>
				</fv-drop-down>
			</div>
			<div class="filter-item keyword-filter">
				<fv-text-box
					:model-value="keywordInput"
					:theme="theme"
					:placeholder="local('Please input tool name')"
					icon="Search"
					background="rgba(20, 31, 35, 1)"
					@debounce-input="handleKeywordDebounce"
					:revealBorder="true"
					border-radius="6"
					style="height: 35px"
				></fv-text-box>
			</div>
		</div>

		<div
			v-for="group in filteredGroups"
			:key="group.type"
			class="type-section"
		>
			<div class="section-head">
				<div class="section-head-main" @click="goToToolType(group.type)">
					<p class="section-title">{{ group.type }}</p>
					<p class="section-desc">
						{{ group.count }} {{ local("tools") }}
					</p>
				</div>
				<fv-button
					theme="dark"
					background="rgba(36, 42, 64, 0.95)"
					:border-radius="999"
					:is-box-shadow="true"
					style="height: 38px; min-width: 120px"
					@click="goToToolType(group.type)"
				>
					{{ local("View All") }}
				</fv-button>
			</div>

			<div class="product-table">
				<div class="table-head">
					<div class="cell no-cell">#</div>
					<div class="cell product-cell">
						{{ local("Product") }}
					</div>
					<div class="attr-scroll">
						<div class="attr-track">
							<div
								v-for="attribute in attributes"
								:key="attribute.id"
								class="attr-head"
							>
								{{ local(attribute.name) }}
							</div>
						</div>
					</div>
					<div class="cell action-cell">
						{{ local("Action") }}
					</div>
				</div>

				<div
					v-for="(item, index) in group.items"
					:key="item.id"
					class="table-row"
				>
					<div class="cell no-cell">
						{{ index + 1 }}
					</div>
					<div class="cell product-cell">
						<div
							class="product-main"
							:class="{ clickable: !!item.homepage_url }"
							@click="openProductHomepage(item)"
						>
							<div class="logo-shell">
								<fv-img
									v-if="item.has_logo"
									:src="getLogoUrl(item)"
									style="width: auto; height: 46px; max-width: 120px"
								></fv-img>
								<div v-else class="logo-placeholder">
									{{ item.tool_name?.slice(0, 1) || "P" }}
								</div>
							</div>
							<div class="product-info">
								<p class="product-name">{{ item.tool_name }}</p>
								<p class="product-org">
									{{ item.organization }}
								</p>
								<p class="product-intro">
									{{
										item.introduction ||
										local("No introduction yet.")
									}}
								</p>
							</div>
						</div>
					</div>
					<div class="attr-scroll">
						<div class="attr-track">
							<div
								v-for="attribute in attributes"
								:key="`${item.id}-${attribute.id}`"
							>
								<component
									:is="resolveAttributeComponent(attribute)"
									:item="item"
									:attribute="attribute"
								></component>
							</div>
						</div>
					</div>
					<div class="cell action-cell">
						<fv-button
							theme="dark"
							background="linear-gradient(135deg, rgba(76, 110, 245, 1) 0%, rgba(52, 164, 219, 1) 100%)"
							:border-radius="8"
							:is-box-shadow="true"
							style="width: 110px; height: 38px"
							@click="openReviewPanel(item)"
						>
							{{ local("Review") }}
						</fv-button>
					</div>
				</div>
			</div>
		</div>

		<div v-if="loading" class="loading-block">
			<fv-progress-ring
				:loading="true"
				r="12"
				border-width="3"
				color="rgba(247, 191, 20, 1)"
				background="transparent"
			></fv-progress-ring>
		</div>

		<div v-if="!loading && filteredGroups.length === 0" class="empty-block">
			{{ local("No products yet.") }}
		</div>

		<review-panel
			v-model="show.review"
			:product="currentProduct"
			:attributes="attributes"
			@finished="getProducts"
		></review-panel>

		<bottom-block></bottom-block>
	</div>
</template>

<script>
import { mapState } from "pinia";
import { useApp } from "@/stores/useApp";
import { useTheme } from "@/stores/useTheme";
import { useUser } from "@/stores/useUser";

import bottomBlock from "@/views/client/home/bottomBlock.vue";
import reviewPanel from "@/components/client/products/reviewPanel.vue";
import attributeScoreCard from "@/components/client/products/attributeScoreCard.vue";
import attributeBoolCard from "@/components/client/products/attributeBoolCard.vue";
import attributeGenericCard from "@/components/client/products/attributeGenericCard.vue";

export default {
	components: {
		bottomBlock,
		reviewPanel,
		attributeScoreCard,
		attributeBoolCard,
		attributeGenericCard,
	},
	data() {
		return {
			loading: false,
			attributes: [],
			groups: [],
			selectedToolTypes: [],
			keyword: "",
			keywordInput: "",
			updatedAt: "",
			currentProduct: {},
			show: {
				review: false,
			},
		};
	},
	computed: {
		...mapState(useApp, ["local"]),
		...mapState(useTheme, ["theme", "color"]),
		...mapState(useUser, {
			userInfo: "info",
		}),
		toolTypeOptions() {
			return this.groups.map((group) => ({
				key: group.type,
				text: group.type,
			}));
		},
		selectedToolTypeNames() {
			return this.selectedToolTypes.map((item) =>
				typeof item === "object"
					? item.key || item.text || item.value
					: item,
			);
		},
		filteredGroups() {
			const selectedTypes = new Set(this.selectedToolTypeNames);
			return this.groups
				.filter((group) =>
					selectedTypes.size === 0
						? true
						: selectedTypes.has(group.type),
				)
				.filter((group) => group.items.length > 0);
		},
	},
	mounted() {
		this.getProducts();
	},
	methods: {
		getDate(item) {
			if (!item) return "-";
			try {
				if (typeof item !== "object") item = new Date(item);
				if (Number.isNaN(item.getTime())) return "-";
				return this.$SDate.Format("YYYY-mm-dd HH:MM:SS", item);
			} catch (e) {
				return item;
			}
		},
		getLogoUrl(item) {
			return `${this.$server}${this.$api.Product.GetProductLogo.path}?id=${encodeURIComponent(item.id)}&t=${item.update_time || Date.now()}`;
		},
		normalizeHomepageUrl(url) {
			if (!url) return "";
			const trimmed = String(url).trim();
			if (!trimmed) return "";
			if (/^https?:\/\//i.test(trimmed)) return trimmed;
			return `https://${trimmed}`;
		},
		openProductHomepage(item) {
			const url = this.normalizeHomepageUrl(item?.homepage_url);
			if (!url) return;
			window.open(url, "_blank", "noopener,noreferrer");
		},
		resolveAttributeComponent(attribute) {
			if (attribute.attribute_type === "score") {
				return "attributeScoreCard";
			}
			if (attribute.attribute_type === "bool") {
				return "attributeBoolCard";
			}
			return "attributeGenericCard";
		},
		sortToolTypes(toolTypes) {
			return [...toolTypes].sort((a, b) =>
				String(a).localeCompare(String(b), "zh-CN"),
			);
		},
		goToToolType(toolType) {
			this.$Go(`/products/type/${encodeURIComponent(toolType)}`);
		},
		handleKeywordDebounce(value) {
			this.keyword = value || "";
			this.keywordInput = value || "";
			this.getProducts();
		},
		async getProducts() {
			this.loading = true;
			try {
				const res = await this.$api.Product.ListClientProducts(
					this.keyword || undefined,
					undefined,
					0,
					9999,
				);
				if (res.code === 200 || res.status === "success" || !res.code) {
					const payload = res?.data ?? res ?? {};
					const list = payload.list || [];
					this.attributes = payload.attributes || [];
					this.updatedAt = payload.updated_at || "";

					const counts = {};
					for (const item of list) {
						const key = item.tool_type || this.local("Other");
						counts[key] = (counts[key] || 0) + 1;
					}

					const types = this.sortToolTypes(Object.keys(counts));
					const previewResults = await Promise.all(
						types.map(async (type) => {
							const previewRes = await this.$api.Product.ListClientProducts(
								this.keyword || undefined,
								type,
								0,
								5,
							);
							const previewPayload =
								previewRes?.data ?? previewRes ?? {};
							return {
								type,
								count: counts[type] || 0,
								items: previewPayload.list || [],
							};
						}),
					);
					this.groups = previewResults;
				}
			} catch (err) {
				console.log(err);
				this.$barWarning(this.local("Get products failed"), {
					status: "error",
				});
			} finally {
				this.loading = false;
			}
		},
		openReviewPanel(item) {
			if (!this.userInfo?.status) {
				this.$infoBox(
					this.local("Please login first to review this product."),
					{
						title: this.local("Login Required"),
						theme: this.theme,
						status: "warning",
						confirm: () => {
							this.$Go("/login");
						},
					},
				);
				return;
			}
			this.currentProduct = item;
			this.show.review = true;
		},
	},
};
</script>

<style lang="scss">
.products-wrap {
	position: relative;
	width: 100%;
	min-height: 100%;
	padding: 120px 0 0 0;
	box-sizing: border-box;
	background:
		radial-gradient(
			circle at top right,
			rgba(65, 99, 205, 0.16),
			transparent 26%
		),
		radial-gradient(
			circle at top left,
			rgba(64, 185, 210, 0.12),
			transparent 24%
		),
		linear-gradient(
			180deg,
			rgba(17, 18, 24, 1) 0%,
			rgba(23, 17, 24, 1) 100%
		);
	color: whitesmoke;

	.hero-block,
	.filter-block,
	.type-section {
		width: calc(100% - 48px);
		max-width: 1360px;
		margin-left: auto;
		margin-right: auto;
	}

	.hero-block {
		margin-bottom: 26px;
		padding: 28px 30px;
		border-radius: 28px;
		background:
			radial-gradient(
				circle at top right,
				rgba(96, 152, 255, 0.18),
				transparent 28%
			),
			linear-gradient(
				135deg,
				rgba(35, 39, 57, 0.92) 0%,
				rgba(19, 22, 34, 0.96) 100%
			);
		box-shadow:
			0 26px 60px rgba(0, 0, 0, 0.28),
			inset 0 1px 0 rgba(255, 255, 255, 0.06);
	}

	.hero-title {
		font-size: 44px;
		font-weight: 800;
		letter-spacing: 0.02em;
		line-height: 1.08;
	}

	.hero-subtitle {
		margin-top: 10px;
		font-size: 15px;
		max-width: 760px;
		line-height: 1.8;
		color: rgba(220, 225, 242, 0.76);
	}

	.hero-update {
		margin-top: 14px;
		font-size: 12px;
		color: rgba(187, 194, 220, 0.62);
	}

	.filter-block {
		margin-bottom: 20px;
		display: grid;
		grid-template-columns: minmax(260px, 360px) minmax(280px, 1fr);
		gap: 12px;
		align-items: start;
	}

	.filter-item {
		position: relative;
		min-width: 0;
		z-index: 4;
	}

	.type-section {
		margin-bottom: 28px;
	}

	.section-head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 16px;
		margin-bottom: 12px;
	}

	.section-head-main {
		cursor: pointer;
		min-width: 0;
	}

	.section-title {
		font-size: 24px;
		font-weight: 700;
		line-height: 1.2;
	}

	.section-desc {
		margin-top: 4px;
		font-size: 13px;
		color: rgba(198, 203, 224, 0.6);
	}

	.product-table {
		border-radius: 16px;
		background: rgba(15, 17, 26, 0.82);
		border: rgba(255, 255, 255, 0.06) solid 1px;
		overflow: hidden;
		backdrop-filter: blur(14px);
	}

	.table-head,
	.table-row {
		display: grid;
		grid-template-columns: 78px 320px 1fr 144px;
		align-items: stretch;
	}

	.table-head {
		min-height: 62px;
		background: linear-gradient(
			180deg,
			rgba(41, 45, 66, 0.96) 0%,
			rgba(26, 29, 43, 0.96) 100%
		);
		border-bottom: rgba(255, 255, 255, 0.06) solid 1px;
		font-size: 13px;
		font-weight: 700;
		color: rgba(219, 224, 246, 0.82);
	}

	.table-row {
		min-height: 142px;
		border-bottom: rgba(255, 255, 255, 0.05) solid 1px;
	}

	.table-row:last-child {
		border-bottom: none;
	}

	.cell {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 16px;
		box-sizing: border-box;
	}

	.no-cell {
		font-size: 18px;
		font-weight: 700;
		color: rgba(255, 196, 61, 1);
	}

	.product-cell {
		justify-content: flex-start;
		border-left: rgba(255, 255, 255, 0.05) solid 1px;
		border-right: rgba(255, 255, 255, 0.05) solid 1px;
	}

	.product-main {
		display: flex;
		align-items: center;
		gap: 16px;
		width: 100%;

		&.clickable {
			cursor: pointer;
		}
	}

	.logo-shell {
		width: 116px;
		min-width: 116px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.logo-placeholder {
		width: 58px;
		height: 58px;
		border-radius: 18px;
		background: linear-gradient(
			135deg,
			rgba(75, 95, 211, 0.42) 0%,
			rgba(69, 174, 221, 0.32) 100%
		);
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 26px;
		font-weight: 800;
	}

	.product-info {
		flex: 1;
		min-width: 0;
	}

	.product-name {
		font-size: 20px;
		font-weight: 700;
		line-height: 1.3;
	}

	.product-org {
		margin-top: 4px;
		font-size: 13px;
		color: rgba(176, 184, 210, 0.72);
	}

	.product-intro {
		margin-top: 8px;
		font-size: 13px;
		line-height: 1.7;
		color: rgba(219, 224, 246, 0.76);
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.attr-scroll {
		@include Vcenter;

		min-width: 0;
		overflow-x: auto;
		overflow-y: hidden;
		padding: 12px 0;
	}

	.attr-track {
		display: flex;
		align-items: stretch;
		gap: 12px;
		min-width: max-content;
		padding: 0 14px;
		box-sizing: border-box;
	}

	.attr-head {
		width: 170px;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 12px;
		font-weight: 700;
		color: rgba(195, 204, 236, 0.78);
	}

	.action-cell {
		border-left: rgba(255, 255, 255, 0.05) solid 1px;
	}

	.loading-block,
	.empty-block {
		width: 100%;
		padding: 40px 0 80px 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.empty-block {
		font-size: 15px;
		color: rgba(210, 214, 232, 0.68);
	}
}

@media screen and (max-width: 1200px) {
	.products-wrap {
		.table-head,
		.table-row {
			grid-template-columns: 60px 260px 1fr 124px;
		}

		.attr-head {
			width: 156px;
		}

		.product-main {
			gap: 12px;
		}

		.logo-shell {
			width: 92px;
			min-width: 92px;
		}
	}
}

@media screen and (max-width: 900px) {
	.products-wrap {
		padding-top: 92px;

		.hero-block,
		.filter-block,
		.type-section {
			width: calc(100% - 24px);
		}

		.hero-block {
			padding: 20px 18px;
			border-radius: 20px;
		}

		.hero-title {
			font-size: 30px;
		}

		.hero-subtitle {
			font-size: 14px;
			line-height: 1.65;
		}

		.hero-update {
			margin-top: 10px;
		}

		.filter-block {
			grid-template-columns: 1fr;
			gap: 10px;
		}

		.section-head {
			flex-direction: column;
			align-items: stretch;
			gap: 10px;
		}

		.product-table {
			background: transparent;
			border: none;
			backdrop-filter: none;
			overflow: visible;
		}

		.table-head {
			display: none;
		}

		.table-row {
			position: relative;
			display: flex;
			flex-direction: column;
			min-height: 0;
			margin-bottom: 14px;
			border: rgba(255, 255, 255, 0.08) solid 1px;
			border-radius: 18px;
			background:
				linear-gradient(
					180deg,
					rgba(28, 31, 46, 0.98) 0%,
					rgba(16, 18, 29, 0.98) 100%
				);
			box-shadow:
				0 14px 34px rgba(0, 0, 0, 0.22),
				inset 0 1px 0 rgba(255, 255, 255, 0.04);
		}

		.table-row:last-child {
			margin-bottom: 0;
		}

		.cell {
			width: 100%;
			justify-content: flex-start;
			padding: 14px 16px;
		}

		.no-cell {
            @include HcenterVcenter;

            width: 35px;
            height: 35px;
            margin: 5px;
			padding: 0px;
			border-radius: 999px;
			background: rgba(255, 196, 61, 0.14);
			font-size: 13px;
			line-height: 1;
			z-index: 1;
		}

		.product-cell,
		.action-cell {
			border: none;
		}

		.product-cell {
			padding-top: 20px;
			padding-right: 54px;
		}

		.product-main {
			align-items: flex-start;
			gap: 14px;
		}

		.logo-shell {
			width: 72px;
			min-width: 72px;
			justify-content: flex-start;
		}

		.logo-placeholder {
			width: 52px;
			height: 52px;
			border-radius: 16px;
			font-size: 24px;
		}

		.product-name {
			font-size: 18px;
		}

		.product-org,
		.product-intro {
			font-size: 12px;
		}

		.product-intro {
			-webkit-line-clamp: 4;
		}

		.attr-scroll {
			padding: 0 16px 14px 16px;
		}

		.attr-track {
			padding: 0;
		}

		.action-cell {
			padding-top: 0;
		}

		.action-cell > * {
			width: 100% !important;
		}

		.loading-block,
		.empty-block {
			padding: 20px 0 72px 0;
		}
	}
}

@media screen and (max-width: 560px) {
	.products-wrap {
		padding-top: 84px;

		.hero-block {
			padding: 18px 16px;
		}

		.hero-title {
			font-size: 26px;
		}

		.section-title {
			font-size: 20px;
		}

		.product-cell {
			padding-right: 16px;
		}

		.product-main {
			flex-direction: column;
		}

		.logo-shell {
			width: 100%;
		}

		.attr-head {
			width: 142px;
		}
	}
}
</style>

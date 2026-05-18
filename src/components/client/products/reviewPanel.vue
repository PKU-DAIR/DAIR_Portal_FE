<template>
	<fv-panel
		v-model="thisValue"
		:theme="theme"
		width="760px"
		height="auto"
		:title="panelTitle"
		:is-central-side="true"
		:is-acrylic="true"
		:is-footer="true"
	>
		<template v-slot:container>
			<div
				class="product-review-panel"
				:class="[{ dark: theme === 'dark' }]"
			>
				<div class="product-head">
					<div class="logo-block">
						<fv-img
							v-if="product.has_logo"
							:src="logoUrl"
							style="width: auto; height: 58px; max-width: 128px"
						></fv-img>
						<div v-else class="logo-placeholder">
							{{ product.tool_name?.slice(0, 1) || "P" }}
						</div>
					</div>
					<div class="head-info">
						<p class="tool-name">{{ product.tool_name }}</p>
						<p class="tool-meta">
							{{ product.organization || "-" }} ·
							{{ product.tool_type || "-" }}
						</p>
					</div>
				</div>

				<div class="panel-section">
					<p class="section-title">{{ local("My Ratings") }}</p>
					<div
						v-for="attribute in attributes"
						:key="attribute.id"
						class="attribute-editor"
					>
						<div class="attr-info">
							<p class="attr-name">{{ attribute.name }}</p>
							<p class="attr-type">{{ attribute.attribute_type }}</p>
						</div>
						<div
							v-if="attributeForms[attribute.id]"
							class="attr-editor"
						>
							<fv-rating-control
								v-if="attribute.attribute_type === 'score'"
								v-model="attributeForms[attribute.id].value"
								:theme="theme"
								:max-rate="5"
								:selected-color="'rgba(255, 196, 61, 1)'"
								:is-clear="true"
							></fv-rating-control>
							<fv-text-box
								v-else-if="attribute.attribute_type === 'number'"
								v-model="attributeForms[attribute.id].value"
								:theme="theme"
								placeholder="Please input number"
							></fv-text-box>
							<fv-toggle-switch
								v-else-if="attribute.attribute_type === 'bool'"
								v-model="attributeForms[attribute.id].boolValue"
								:theme="theme"
								:width="76"
								:height="30"
								:on="local('Yes')"
								:off="local('No')"
								:inside-content="true"
								:switch-on-background="'rgba(91, 192, 139, 1)'"
							></fv-toggle-switch>
							<fv-text-box
								v-else
								v-model="attributeForms[attribute.id].value"
								:theme="theme"
								placeholder="Please input value"
							></fv-text-box>
						</div>
					</div>
				</div>

				<div class="panel-section">
					<p class="section-title">{{ local("My Review") }}</p>
					<textarea
						v-model="reviewForm.review"
						class="review-textarea"
						:class="{ dark: theme === 'dark' }"
						:placeholder="local('Write your review here...')"
					></textarea>
				</div>
			</div>
		</template>
		<template v-slot:footer>
			<fv-button
				theme="dark"
				background="linear-gradient(135deg, rgba(50, 116, 255, 1) 0%, rgba(69, 179, 224, 1) 100%)"
				:disabled="!lock.save"
				style="width: 130px"
				@click="submitReview"
			>
				{{ local("Submit Review") }}
			</fv-button>
			<fv-button
				:theme="theme"
				style="width: 120px; margin-left: 8px"
				@click="thisValue = false"
			>
				{{ local("Cancel") }}
			</fv-button>
		</template>
	</fv-panel>
</template>

<script>
import { mapState } from "pinia";
import { useApp } from "@/stores/useApp";
import { useTheme } from "@/stores/useTheme";

export default {
	props: {
		modelValue: {
			default: false,
		},
		product: {
			default: () => ({}),
		},
		attributes: {
			default: () => [],
		},
	},
	data() {
		return {
			thisValue: this.modelValue,
			reviewForm: {
				id: "",
				review: "",
			},
			attributeForms: {},
			lock: {
				save: true,
			},
		};
	},
	watch: {
		modelValue(val) {
			this.thisValue = val;
		},
		product: {
			immediate: true,
			handler() {
				this.prepareForms();
				if (this.product?.id && this.thisValue) {
					this.loadMyReviewData();
				}
			},
		},
		attributes: {
			deep: true,
			handler() {
				this.prepareForms();
				if (this.product?.id && this.thisValue) {
					this.loadMyReviewData();
				}
			},
		},
		thisValue(val) {
			this.$emit("update:modelValue", val);
			if (val) {
				this.prepareForms();
				if (this.product?.id) {
					this.loadMyReviewData();
				}
			}
		},
	},
	computed: {
		...mapState(useApp, ["local"]),
		...mapState(useTheme, ["theme"]),
		panelTitle() {
			return `${this.local("Review")} ${this.product.tool_name || ""}`;
		},
		logoUrl() {
			if (!this.product?.id) return "";
			return `${this.$server}${this.$api.Product.GetProductLogo.path}?id=${encodeURIComponent(this.product.id)}&t=${this.product.update_time || Date.now()}`;
		},
	},
	methods: {
		prepareForms() {
			this.reviewForm = {
				id: "",
				review: "",
			};
			const forms = {};
			for (const attribute of this.attributes) {
				forms[attribute.id] = {
					id: "",
					value: attribute.attribute_type === "score" ? 0 : "",
					boolValue: false,
				};
			}
			this.attributeForms = forms;
		},
		normalizeReviewResponse(res) {
			const payload = res?.data ?? res ?? {};
			if (payload.review && typeof payload.review === "object") {
				return payload.review;
			}
			if (
				payload.data &&
				payload.data.review &&
				typeof payload.data.review === "object"
			) {
				return payload.data.review;
			}
			if (Array.isArray(payload)) return payload[0] || {};
			if (Array.isArray(payload.list)) return payload.list[0] || {};
			return payload;
		},
		normalizeAttributeResponse(res) {
			const payload = res?.data ?? res ?? {};
			if (Array.isArray(payload)) return payload;
			if (Array.isArray(payload.list)) return payload.list;
			return payload ? [payload].filter((item) => item?.attribute_id) : [];
		},
		fillAttributeValue(item) {
			const form = this.attributeForms[item.attribute_id];
			if (!form) return;
			form.id = item.id || "";
			if (item.value === undefined || item.value === null) return;
			const attribute = this.attributes.find(
				(attr) => attr.id === item.attribute_id,
			);
			if (!attribute) return;
			if (attribute.attribute_type === "bool") {
				form.boolValue =
					item.value === 1 ||
					item.value === "1" ||
					item.value === true;
				form.value = form.boolValue ? 1 : 0;
				return;
			}
			form.value = item.value;
		},
		async loadMyReviewData() {
			try {
				const [reviewRes, attrRes] = await Promise.all([
					this.$api.Product.GetMyProductReview(this.product.id, null),
					this.$api.Product.GetMyProductAttributeValues(
						this.product.id,
						undefined,
						null,
					),
				]);
				const myReview = this.normalizeReviewResponse(reviewRes);
				this.reviewForm.id = myReview?.id || "";
				this.reviewForm.review = myReview?.review || "";
				const myValues = this.normalizeAttributeResponse(attrRes);
				for (const item of myValues) {
					this.fillAttributeValue(item);
				}
			} catch (err) {
				console.log(err);
			}
		},
		getSubmitValue(attribute, form) {
			if (attribute.attribute_type === "bool") {
				return form.boolValue ? 1 : 0;
			}
			if (attribute.attribute_type === "number") {
				if (form.value === "" || form.value === null) return "";
				return Number(form.value);
			}
			if (attribute.attribute_type === "score") {
				return Number(form.value || 0);
			}
			return form.value;
		},
		async submitReview() {
			if (!this.product?.id || !this.lock.save) return;
			this.lock.save = false;
			try {
				const tasks = [];
				tasks.push(
					this.$api.Product.AddOrUpdateProductReview(null, {
						id: this.reviewForm.id || undefined,
						product_id: this.product.id,
						review: this.reviewForm.review || "",
					}),
				);
				for (const attribute of this.attributes) {
					const form = this.attributeForms[attribute.id];
					if (!form) continue;
					const submitValue = this.getSubmitValue(attribute, form);
					const shouldSkip =
						(attribute.attribute_type === "number" &&
							(submitValue === "" || Number.isNaN(submitValue))) ||
						(attribute.attribute_type !== "bool" &&
							attribute.attribute_type !== "score" &&
							(submitValue === "" || submitValue == null));
					if (shouldSkip) continue;
					tasks.push(
						this.$api.Product.AddOrUpdateProductAttributeValue(
							null,
							{
								id: form.id || undefined,
								product_id: this.product.id,
								attribute_id: attribute.id,
								value: submitValue,
							},
						),
					);
				}
				await Promise.all(tasks);
				this.$barWarning(this.local("Submit Success"), {
					status: "correct",
				});
				this.$emit("finished");
				this.thisValue = false;
			} catch (err) {
				console.log(err);
				this.$barWarning(
					err?.message || this.local("Submit review failed"),
					{
						status: "error",
					},
				);
			} finally {
				this.lock.save = true;
			}
		},
	},
};
</script>

<style lang="scss">
.product-review-panel {
	padding: 18px 20px 24px 20px;
	box-sizing: border-box;
	max-height: 78vh;
	overflow: auto;
	color: rgba(24, 24, 28, 1);

	&.dark {
		color: whitesmoke;

		.review-textarea,
		.logo-placeholder,
		.attribute-editor {
			background: rgba(30, 30, 38, 1);
			color: whitesmoke;
		}
	}

	.product-head {
		display: flex;
		align-items: center;
		gap: 18px;
		padding: 0 0 18px 0;
		border-bottom: rgba(140, 140, 160, 0.16) solid 1px;
	}

	.logo-block {
		width: 126px;
		min-height: 64px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.logo-placeholder {
		width: 64px;
		height: 64px;
		border-radius: 18px;
		background: rgba(65, 92, 180, 0.2);
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 28px;
		font-weight: 700;
	}

	.tool-name {
		font-size: 24px;
		font-weight: 700;
	}

	.tool-meta {
		margin-top: 5px;
		font-size: 13px;
		opacity: 0.75;
	}

	.panel-section {
		margin-top: 18px;
	}

	.section-title {
		margin-bottom: 10px;
		font-size: 14px;
		font-weight: 700;
	}

	.attribute-editor {
		display: grid;
		grid-template-columns: 180px 1fr;
		gap: 14px;
		align-items: center;
		padding: 14px;
		margin-bottom: 10px;
		border-radius: 16px;
		background: rgba(245, 247, 252, 1);
	}

	.attr-name {
		font-size: 14px;
		font-weight: 600;
	}

	.attr-type {
		margin-top: 4px;
		font-size: 12px;
		opacity: 0.65;
		text-transform: uppercase;
	}

	.review-textarea {
		width: 100%;
		min-height: 140px;
		padding: 14px;
		box-sizing: border-box;
		border-radius: 16px;
		border: rgba(110, 110, 130, 0.18) solid 1px;
		outline: none;
		background: rgba(245, 247, 252, 1);
		font-family: inherit;
		font-size: 14px;
		line-height: 1.7;
		resize: vertical;
	}
}

@media screen and (max-width: 900px) {
	.product-review-panel {
		.product-head {
			flex-direction: column;
			align-items: flex-start;
		}

		.attribute-editor {
			grid-template-columns: 1fr;
		}
	}
}
</style>

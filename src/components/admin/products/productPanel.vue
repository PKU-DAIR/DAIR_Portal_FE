<template>
	<fv-panel
		v-model="thisValue"
		:theme="theme"
		width="960px"
		height="auto"
		:title="panelTitle"
        :is-central-side="true"
		:is-acrylic="true"
		:is-footer="true"
	>
		<template v-slot:container>
			<div
				class="product-panel-container"
				:class="[{ dark: theme === 'dark' }]"
			>
				<div class="panel-grid">
					<div class="panel-section">
						<p class="panel-title">ID</p>
						<fv-text-box
							:model-value="form.id || ''"
							:theme="theme"
							:readonly="true"
							placeholder="Auto Generated"
						></fv-text-box>
					</div>
					<div class="panel-section">
						<p class="panel-title">* {{ local("Tool Name") }}</p>
						<fv-text-box
							v-model="form.tool_name"
							:theme="theme"
							placeholder="Please input tool name"
						></fv-text-box>
					</div>
					<div class="panel-section">
						<p class="panel-title">{{ local("Tool Type") }}</p>
						<fv-text-box
							v-model="form.tool_type"
							:theme="theme"
							placeholder="Please input tool type"
						></fv-text-box>
					</div>
					<div class="panel-section">
						<p class="panel-title">{{ local("Organization") }}</p>
						<fv-text-box
							v-model="form.organization"
							:theme="theme"
							placeholder="Please input organization"
						></fv-text-box>
					</div>
					<div class="panel-section">
						<p class="panel-title">{{ local("Audit Status") }}</p>
						<fv-combobox
							v-model="currentAuditStatus"
							:theme="theme"
							:options="auditStatusOptions"
							:placeholder="local('Select audit status')"
						>
						</fv-combobox>
					</div>
				</div>
				<div class="panel-section">
					<p class="panel-title">{{ local("Introduction") }}</p>
					<textarea
						v-model="form.introduction"
						class="panel-textarea"
						:class="{ dark: theme === 'dark' }"
						placeholder="Please input introduction"
					></textarea>
				</div>
				<div class="panel-section">
					<div class="row between">
						<p class="panel-title">{{ local("Logo") }}</p>
						<fv-button
							:theme="logoPreview ? 'dark' : theme"
							:background="logoPreview ? color : ''"
							:is-box-shadow="true"
							:disabled="!lock.logo"
							style="width: 140px; height: 35px"
							@click="$refs.uploader.click()"
						>
							<p v-show="lock.logo">
								{{ logoPreview ? local("Change Logo") : local("Upload Logo") }}
							</p>
							<fv-progress-ring
								v-show="!lock.logo"
								:loading="true"
								r="10"
								borderWidth="2"
								color="white"
								background="transparent"
							></fv-progress-ring>
						</fv-button>
					</div>
					<input
						v-show="false"
						ref="uploader"
						type="file"
						accept=".jpg,.jpeg,.svg,.png,.webp,.gif,.bmp,.tiff"
						@change="chooseLogo"
					/>
					<div class="logo-preview-block">
						<fv-img
							v-if="logoPreview"
							:src="logoPreview"
							style="width: 140px; height: 140px; border-radius: 12px"
						></fv-img>
						<div v-else class="logo-placeholder">
							{{ local("No Logo") }}
						</div>
						<div class="logo-info">
							<p v-if="form.publisher_id">
								{{ local("Publisher") }}: {{ form.publisher_id }}
							</p>
							<p>{{ local("Created") }}: {{ getDate(form.publish_time) }}</p>
							<p>{{ local("Updated") }}: {{ getDate(form.update_time) }}</p>
						</div>
					</div>
				</div>
				<div v-if="form.id" class="panel-section data-section">
					<div class="section-head">
						<p class="panel-subtitle">
							{{ local("User Reviews") }}
						</p>
						<fv-button
							:theme="theme"
							style="width: 110px; height: 32px"
							@click="getReviews"
						>
							{{ local("Refresh") }}
						</fv-button>
					</div>
					<div class="inner-table">
						<fv-details-list
							v-model="reviews"
							:theme="theme"
							:head="reviewHead"
							:foreground="color"
							style="width: 100%; height: 100%"
						>
							<template v-slot:column_0="x">
								<p class="sec">{{ reviewOffset + x.row_index + 1 }}</p>
							</template>
							<template v-slot:column_1="x">
								<p class="sec">{{ x.item.reviewer_id }}</p>
							</template>
							<template v-slot:column_2="x">
								<p class="sec long-text">{{ x.item.review }}</p>
							</template>
							<template v-slot:column_3="x">
								<p class="sec">{{ getDate(x.item.review_time) }}</p>
							</template>
							<template v-slot:column_4="x">
								<p class="sec">{{ getDate(x.item.update_time) }}</p>
							</template>
							<template v-slot:column_5="x">
								<fv-button
									theme="dark"
									background="rgba(173, 38, 45, 1)"
									style="width: 72px; height: 28px"
									@click="removeReview(x.item)"
								>
									{{ local("Delete") }}
								</fv-button>
							</template>
						</fv-details-list>
					</div>
					<fv-Pagination
						v-model="reviewPage"
						:theme="theme"
						:total="reviewTotal"
						:background="
							theme === 'dark'
								? 'rgba(50, 50, 50, 1)'
								: 'whitesmoke'
						"
						:foreground="color"
						:shadow="true"
						style="margin-top: 10px"
					>
					</fv-Pagination>
				</div>
				<div v-if="form.id" class="panel-section data-section">
					<div class="section-head">
						<p class="panel-subtitle">
							{{ local("Attribute Values") }}
						</p>
						<fv-button
							:theme="theme"
							style="width: 110px; height: 32px"
							@click="getAttributeValues"
						>
							{{ local("Refresh") }}
						</fv-button>
					</div>
					<div class="inner-table">
						<fv-details-list
							v-model="attributeValues"
							:theme="theme"
							:head="valueHead"
							:foreground="color"
							style="width: 100%; height: 100%"
						>
							<template v-slot:column_0="x">
								<p class="sec">{{ valueOffset + x.row_index + 1 }}</p>
							</template>
							<template v-slot:column_1="x">
								<p class="sec">{{ getAttributeName(x.item.attribute_id) }}</p>
							</template>
							<template v-slot:column_2="x">
								<p class="sec">{{ x.item.value }}</p>
							</template>
							<template v-slot:column_3="x">
								<p class="sec">{{ x.item.publisher_id }}</p>
							</template>
							<template v-slot:column_4="x">
								<p class="sec">{{ getDate(x.item.publish_time) }}</p>
							</template>
							<template v-slot:column_5="x">
								<fv-button
									theme="dark"
									background="rgba(173, 38, 45, 1)"
									style="width: 72px; height: 28px"
									@click="removeValue(x.item)"
								>
									{{ local("Delete") }}
								</fv-button>
							</template>
						</fv-details-list>
					</div>
					<fv-Pagination
						v-model="valuePage"
						:theme="theme"
						:total="valueTotal"
						:background="
							theme === 'dark'
								? 'rgba(50, 50, 50, 1)'
								: 'whitesmoke'
						"
						:foreground="color"
						:shadow="true"
						style="margin-top: 10px"
					>
					</fv-Pagination>
				</div>
			</div>
		</template>
		<template v-slot:footer>
			<fv-button
				theme="dark"
				background="rgba(0, 90, 158, 1)"
				:disabled="!lock.save || !form.tool_name"
				style="width: 120px"
				@click="saveProduct"
			>
				{{ local("Confirm") }}
			</fv-button>
			<fv-button
				:theme="theme"
				style="width: 120px; margin-left: 5px"
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

const createForm = () => ({
	id: "",
	tool_name: "",
	tool_type: "",
	organization: "",
	introduction: "",
	audit_status: "",
	publish_time: "",
	update_time: "",
	publisher_id: "",
});

export default {
	props: {
		modelValue: {
			default: false,
		},
		item: {
			default: () => ({}),
		},
		attributes: {
			default: () => [],
		},
	},
	data() {
		return {
			thisValue: this.modelValue,
			form: createForm(),
			logoPreview: "",
			logoPreviewObjectUrl: "",
			logoFile: null,
			logoVersion: Date.now(),
			reviews: [],
			reviewPage: 1,
			reviewLimit: 10,
			reviewTotal: 1,
			attributeValues: [],
			valuePage: 1,
			valueLimit: 10,
			valueTotal: 1,
			lock: {
				save: true,
				logo: true,
			},
			currentAuditStatus: null,
			auditStatusOptions: [
				{ key: "pending", value: "pending", text: "pending" },
				{ key: "approved", value: "approved", text: "approved" },
				{ key: "rejected", value: "rejected", text: "rejected" },
			],
			reviewHead: [
				{ content: "#", width: 60 },
				{ content: "Reviewer", width: 150 },
				{ content: "Review", width: 360 },
				{ content: "Review Time", width: 170 },
				{ content: "Update Time", width: 170 },
				{ content: "Action", width: 100 },
			],
			valueHead: [
				{ content: "#", width: 60 },
				{ content: "Attribute", width: 180 },
				{ content: "Value", width: 180 },
				{ content: "Publisher", width: 160 },
				{ content: "Publish Time", width: 170 },
				{ content: "Action", width: 100 },
			],
		};
	},
	watch: {
		modelValue(val) {
			this.thisValue = val;
		},
		thisValue(val) {
			this.$emit("update:modelValue", val);
		},
		item: {
			immediate: true,
			handler(val) {
				this.syncItem(val);
			},
		},
		reviewPage() {
			if (this.form.id && this.thisValue) this.getReviews();
		},
		valuePage() {
			if (this.form.id && this.thisValue) this.getAttributeValues();
		},
	},
	computed: {
		...mapState(useApp, ["local"]),
		...mapState(useTheme, ["color", "theme"]),
		panelTitle() {
			return this.form.id
				? this.local("Product Detail")
				: this.local("Add Product");
		},
		reviewOffset() {
			return (this.reviewPage - 1) * this.reviewLimit;
		},
		valueOffset() {
			return (this.valuePage - 1) * this.valueLimit;
		},
	},
	methods: {
		syncAuditStatus(value) {
			const status = value || "pending";
			const matched = this.auditStatusOptions.find(
				(item) => item.value === status,
			);
			this.currentAuditStatus =
				matched || this.auditStatusOptions[0];
			this.form.audit_status = this.currentAuditStatus.value;
		},
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
		syncItem(item = {}) {
			this.form = Object.assign(createForm(), item || {});
			this.clearTempLogoPreview();
			this.syncAuditStatus(this.form.audit_status);
			this.logoFile = null;
			this.reviewPage = 1;
			this.valuePage = 1;
			this.reviews = [];
			this.attributeValues = [];
			this.logoVersion = Date.now();
			this.setLogoPreview();
			if (this.form.id) {
				this.getProductDetail();
				this.getReviews();
				this.getAttributeValues();
			}
		},
		async getProductDetail() {
			try {
				const res = await this.$api.Product.GetProduct(this.form.id);
				if (res.code === 200 || res.status === "success" || !res.code) {
					const detail = res?.data ?? res;
					this.form = Object.assign(createForm(), detail || this.form);
					this.syncAuditStatus(this.form.audit_status);
					this.setLogoPreview();
				}
			} catch (err) {
				console.log(err);
			}
		},
		setLogoPreview() {
			if (this.logoFile) return;
			if (!this.form.id) {
				this.logoPreview = "";
				return;
			}
			this.logoPreview = `${this.$server}${this.$api.Product.GetAdminProductLogo.path}?id=${encodeURIComponent(this.form.id)}&t=${this.logoVersion}`;
		},
		clearTempLogoPreview() {
			if (this.logoPreviewObjectUrl) {
				URL.revokeObjectURL(this.logoPreviewObjectUrl);
				this.logoPreviewObjectUrl = "";
			}
		},
		async chooseLogo(event) {
			const file = event.target.files && event.target.files[0];
			if (!file) return;
			this.clearTempLogoPreview();
			this.logoFile = file;
			this.logoPreviewObjectUrl = URL.createObjectURL(file);
			this.logoPreview = this.logoPreviewObjectUrl;
			if (this.$refs.uploader) {
				this.$refs.uploader.value = "";
			}
			if (this.form.id) {
				await this.uploadLogo(this.form.id);
			}
		},
		normalizePagedResponse(res, limit) {
			const payload = res?.data ?? res ?? {};
			const list = Array.isArray(payload)
				? payload
				: Array.isArray(payload.list)
					? payload.list
					: [];
			const totalCount =
				payload.total ??
				payload.count ??
				payload.size ??
				list.length;
			return {
				list,
				total:
					totalCount <= 0
						? 1
						: Math.ceil(totalCount / limit),
			};
		},
		async getReviews() {
			try {
				const res = await this.$api.Product.ListProductReviews(
					this.form.id,
					this.reviewOffset,
					this.reviewLimit,
				);
				if (res.code === 200 || res.status === "success" || !res.code) {
					const { list, total } = this.normalizePagedResponse(
						res,
						this.reviewLimit,
					);
					this.reviews = list;
					this.reviewTotal = total;
				}
			} catch (err) {
				console.log(err);
				this.$barWarning(this.local("Get product reviews failed"), {
					status: "error",
				});
			}
		},
		async getAttributeValues() {
			try {
				const res = await this.$api.Product.ListProductAttributeValues(
					this.form.id,
					undefined,
					this.valueOffset,
					this.valueLimit,
				);
				if (res.code === 200 || res.status === "success" || !res.code) {
					const { list, total } = this.normalizePagedResponse(
						res,
						this.valueLimit,
					);
					this.attributeValues = list;
					this.valueTotal = total;
				}
			} catch (err) {
				console.log(err);
				this.$barWarning(this.local("Get attribute values failed"), {
					status: "error",
				});
			}
		},
		getAttributeName(attributeId) {
			if (!attributeId) return "-";
			const target = this.attributes.find((it) => it.id === attributeId);
			return target ? target.name : attributeId;
		},
		async saveProduct() {
			if (!this.form.tool_name) {
				this.$barWarning(this.local("Please input tool name"), {
					status: "warning",
				});
				return;
			}
			if (!this.lock.save) return;
			this.lock.save = false;
			try {
				const payload = {
					id: this.form.id || undefined,
					tool_name: this.form.tool_name,
					tool_type: this.form.tool_type,
					organization: this.form.organization,
					introduction: this.form.introduction,
					audit_status:
						this.currentAuditStatus?.value || this.form.audit_status,
				};
				const res = await this.$api.Product.AddOrUpdateProduct(
					null,
					payload,
				);
				if (res.code === 200 || res.status === "success" || !res.code) {
					const savedId =
						res?.data?.id || res?.id || this.form.id || "";
					if (this.logoFile && savedId) {
						await this.uploadLogo(savedId, true);
					} else if (this.logoFile && !savedId) {
						this.$barWarning(
							this.local("Product saved, but logo upload needs product id"),
							{
								status: "warning",
							},
						);
					}
					this.$barWarning(this.local("Save Success"), {
						status: "correct",
					});
					this.$emit("finished");
					this.thisValue = false;
				} else {
					this.$barWarning(
						res.message || this.local("Save product failed"),
						{
							status: "warning",
						},
					);
				}
			} catch (err) {
				console.log(err);
				this.$barWarning(
					err?.message || this.local("Save product failed"),
					{
						status: "error",
					},
				);
			} finally {
				this.lock.save = true;
			}
		},
		async uploadLogo(productId, silent = false) {
			if (!this.logoFile) return;
			if (!this.lock.logo) return;
			this.lock.logo = false;
			try {
				const formData = new FormData();
				formData.append("logo", this.logoFile);
				const res = await this.$api.Product.UploadProductLogo(
					productId,
					null,
					formData,
				);
				if (res.code === 200 || res.status === "success" || !res.code) {
					this.logoVersion = Date.now();
					this.clearTempLogoPreview();
					this.logoFile = null;
					this.setLogoPreview();
					if (!silent) {
						this.$barWarning(this.local("Upload logo success"), {
							status: "correct",
						});
					}
				}
			} catch (err) {
				console.log(err);
				this.$barWarning(
					err?.message || this.local("Upload logo failed"),
					{
						status: "error",
					},
				);
				if (!this.form.id) {
					this.setLogoPreview();
				}
			} finally {
				this.lock.logo = true;
			}
		},
		removeReview(item) {
			if (!item?.id) return;
			this.$infoBox(this.local("Delete this review?"), {
				title: this.local("Confirm"),
				theme: this.theme,
				status: "error",
				confirm: async () => {
					try {
						const res = await this.$api.Product.DeleteProductReview(
							item.id,
						);
						if (
							res.code === 200 ||
							res.status === "success" ||
							!res.code
						) {
							this.$barWarning(this.local("Success"), {
								status: "correct",
							});
							this.getReviews();
						}
					} catch (err) {
						console.log(err);
						this.$barWarning(
							this.local("Delete review failed"),
							{
								status: "error",
							},
						);
					}
				},
			});
		},
		removeValue(item) {
			if (!item?.id) return;
			this.$infoBox(this.local("Delete this attribute value?"), {
				title: this.local("Confirm"),
				theme: this.theme,
				status: "error",
				confirm: async () => {
					try {
						const res =
							await this.$api.Product.DeleteProductAttributeValue(
								item.id,
							);
						if (
							res.code === 200 ||
							res.status === "success" ||
							!res.code
						) {
							this.$barWarning(this.local("Success"), {
								status: "correct",
							});
							this.getAttributeValues();
						}
					} catch (err) {
						console.log(err);
						this.$barWarning(
							this.local("Delete attribute value failed"),
							{
								status: "error",
							},
						);
					}
				},
			});
		},
	},
	beforeUnmount() {
		this.clearTempLogoPreview();
	},
};
</script>

<style lang="scss">
.product-panel-container {
	position: relative;
	width: 100%;
	max-height: 78vh;
	padding: 16px 18px 24px 18px;
	box-sizing: border-box;
	overflow: auto;
	color: rgba(28, 30, 41, 1);

	&.dark {
		color: whitesmoke;

		.panel-textarea,
		.logo-placeholder,
		.inner-table {
			background: rgba(36, 36, 36, 1);
			color: whitesmoke;
		}
	}

	.panel-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 14px;
	}

	.panel-section {
		margin-bottom: 16px;
	}

	.panel-title,
	.panel-subtitle {
		margin-bottom: 6px;
		font-size: 13px;
		font-weight: 600;
	}

	.panel-textarea {
		width: 100%;
		min-height: 120px;
		padding: 12px;
		box-sizing: border-box;
		border: rgba(120, 120, 120, 0.2) solid 1px;
		border-radius: 8px;
		outline: none;
		resize: vertical;
		font-size: 14px;
		font-family: inherit;
		background: white;

		&.dark {
			background: rgba(36, 36, 36, 1);
			color: whitesmoke;
		}
	}

	.row.between {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.logo-preview-block {
		display: flex;
		align-items: center;
		margin-top: 12px;
		gap: 16px;
	}

	.logo-placeholder {
		width: 140px;
		height: 140px;
		border-radius: 12px;
		border: rgba(120, 120, 120, 0.2) dashed 1px;
		display: flex;
		justify-content: center;
		align-items: center;
		background: whitesmoke;
	}

	.logo-info {
		font-size: 12px;
		line-height: 1.9;
	}

	.data-section {
		padding-top: 8px;
		border-top: rgba(120, 120, 120, 0.15) solid 1px;
	}

	.section-head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10px;
	}

	.inner-table {
		height: 260px;
		background: rgba(0, 0, 0, 0.02);
		border-radius: 8px;
		overflow: hidden;
	}

	.long-text {
		line-height: 1.6;
		word-break: break-all;
		white-space: normal;
	}
}

@media screen and (max-width: 900px) {
	.product-panel-container {
		.panel-grid {
			grid-template-columns: 1fr;
		}

		.logo-preview-block {
			flex-direction: column;
			align-items: flex-start;
		}
	}
}
</style>

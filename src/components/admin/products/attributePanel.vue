<template>
	<fv-panel
		v-model="thisValue"
		:theme="theme"
		width="480px"
		height="auto"
		:title="panelTitle"
        :is-central-side="true"
		:is-acrylic="true"
		:is-footer="true"
	>
		<template v-slot:container>
			<div
				class="attribute-panel-container"
				:class="[{ dark: theme === 'dark' }]"
			>
				<div class="panel-row">
					<p class="panel-title">ID</p>
					<fv-text-box
						:model-value="form.id || ''"
						:theme="theme"
						:readonly="true"
						placeholder="Auto Generated"
					></fv-text-box>
				</div>
				<div class="panel-row">
					<p class="panel-title">* {{ local("Attribute Name") }}</p>
					<fv-text-box
						v-model="form.name"
						:theme="theme"
						placeholder="Please input attribute name"
						@keyup.enter="saveAttribute"
					></fv-text-box>
				</div>
				<div class="panel-row">
					<p class="panel-title">* {{ local("Attribute Type") }}</p>
					<fv-text-box
						v-model="form.attribute_type"
						:theme="theme"
						placeholder="score / number / bool"
						@keyup.enter="saveAttribute"
					></fv-text-box>
				</div>
				<div class="panel-row info-row">
					<p>{{ local("Created") }}: {{ getDate(form.create_time) }}</p>
					<p>{{ local("Updated") }}: {{ getDate(form.update_time) }}</p>
				</div>
			</div>
		</template>
		<template v-slot:footer>
			<fv-button
				theme="dark"
				background="rgba(0, 90, 158, 1)"
				:disabled="!lock.save || !form.name || !form.attribute_type"
				style="width: 120px"
				@click="saveAttribute"
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
	name: "",
	attribute_type: "",
	create_time: "",
	update_time: "",
});

export default {
	props: {
		modelValue: {
			default: false,
		},
		item: {
			default: () => ({}),
		},
	},
	data() {
		return {
			thisValue: this.modelValue,
			form: createForm(),
			lock: {
				save: true,
			},
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
				this.form = Object.assign(createForm(), val || {});
			},
		},
	},
	computed: {
		...mapState(useApp, ["local"]),
		...mapState(useTheme, ["theme"]),
		panelTitle() {
			return this.form.id
				? this.local("Edit Attribute")
				: this.local("Add Attribute");
		},
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
		async saveAttribute() {
			if (!this.form.name || !this.form.attribute_type) return;
			if (!this.lock.save) return;
			this.lock.save = false;
			try {
				const res = await this.$api.Product.AddOrUpdateProductAttribute({
					id: this.form.id || undefined,
					name: this.form.name,
					attribute_type: this.form.attribute_type,
				});
				if (res.code === 200 || res.status === "success" || !res.code) {
					this.$barWarning(this.local("Save Success"), {
						status: "correct",
					});
					this.$emit("finished");
					this.thisValue = false;
				} else {
					this.$barWarning(
						res.message || this.local("Save attribute failed"),
						{
							status: "warning",
						},
					);
				}
			} catch (err) {
				console.log(err);
				this.$barWarning(
					err?.message || this.local("Save attribute failed"),
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
.attribute-panel-container {
	padding: 16px 18px 20px 18px;
	box-sizing: border-box;
	color: rgba(28, 30, 41, 1);

	&.dark {
		color: whitesmoke;
	}

	.panel-row {
		margin-bottom: 16px;
	}

	.panel-title {
		margin-bottom: 6px;
		font-size: 13px;
		font-weight: 600;
	}

	.info-row {
		font-size: 12px;
		line-height: 1.9;
	}
}
</style>

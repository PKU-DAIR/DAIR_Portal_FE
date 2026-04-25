<template>
	<fv-panel
		v-model="show"
		:title="local('Fetch Publications')"
		width="680px"
		height="auto"
		:theme="theme"
		:title-size="13"
		:is-central-side="true"
		:is-acrylic="true"
		:is-footer="true"
	>
		<template v-slot:container>
			<div class="fetch-pub-panel-container">
				<div class="form-block">
					<p ref="startUrlTitle" class="panel-title">
						{{ local("Start URL") }}
					</p>
					<fv-text-box
						v-model="form.start_url"
						:theme="theme"
						:placeholder="local('Input start url')"
						:border-width="2"
						:reveal-border="true"
						style="width: 100%; height: 40px; margin-top: 12px"
						@keydown.enter="fetchPublications"
					/>
				</div>
				<div class="form-block">
					<p class="panel-title">{{ local("Max Blocks") }}</p>
					<fv-text-box
						v-model="form.max_blocks"
						:theme="theme"
						:placeholder="local('Optional, e.g. 5')"
						:border-width="2"
						:reveal-border="true"
						style="width: 100%; height: 40px; margin-top: 12px"
						@keydown.enter="fetchPublications"
					/>
				</div>
				<div class="status-block">
					<p class="status-text">
						{{ local("Current Status") }}:
						<span :class="['status-value', statusClass]">
							{{ currentStatusText }}
						</span>
					</p>
					<p v-if="task.message" class="status-message">
						{{ task.message }}
					</p>
				</div>
				<div class="logs-block">
					<div class="logs-head">
						<p>{{ local("Logs") }}</p>
						<fv-button
							:theme="theme"
							background="transparent"
							reveal-border-color="rgba(212, 175, 55, 0.28)"
							style="width: 86px; height: 30px"
							@click="getStatus"
						>
							{{ local("Refresh") }}
						</fv-button>
					</div>
					<div class="logs-container">
						<p v-if="logs.length === 0" class="log-empty">
							{{ local("No logs yet") }}
						</p>
						<div
							v-for="(log, index) in logs"
							:key="`log-${index}`"
							class="log-item"
						>
							{{ formatLog(log) }}
						</div>
					</div>
				</div>
			</div>
		</template>
		<template v-slot:footer>
			<fv-button
				theme="dark"
				background="linear-gradient(135deg, #101010 0%, #2a2418 45%, #8f6b2e 100%)"
				:disabled="!canFetch || !lock.fetch"
				style="width: 180px; color: #f3e7c2"
				@click="fetchPublications"
			>
				{{ local("Fetch Publications") }}
			</fv-button>
			<fv-button
				:theme="theme"
				style="width: 120px; margin-left: 5px"
				@click="show = false"
			>
				{{ local("Close") }}
			</fv-button>
		</template>
	</fv-panel>
</template>

<script>
export default {
	name: "fetch-publications",
	props: {
		modelValue: {
			default: false,
		},
		theme: {
			default: "light",
		},
	},
	data() {
		return {
			show: this.modelValue,
			form: {
				start_url: "",
				max_blocks: "",
			},
			lock: {
				fetch: true,
				status: true,
			},
			task: {
				status: "",
				message: "",
				logs: [],
				params: {},
			},
			timer: null,
			pendingRefresh: false,
		};
	},
	computed: {
		currentStatusText() {
			return this.task.status || this.local("idle");
		},
		statusClass() {
			if (["running", "loading", "pending"].includes(this.task.status)) {
				return "running";
			}
			if (this.task.status === "success") {
				return "success";
			}
			if (["failed", "error"].includes(this.task.status)) {
				return "error";
			}
			return "idle";
		},
		logs() {
			if (Array.isArray(this.task.logs)) return this.task.logs;
			return [];
		},
		canFetch() {
			return !["running", "loading", "pending"].includes(
				this.task.status,
			);
		},
	},
	watch: {
		modelValue(val) {
			this.show = val;
		},
		show(val) {
			this.$emit("update:modelValue", val);
			if (val) {
				this.onOpen();
			} else {
				this.clearTimer();
				this.pendingRefresh = false;
			}
		},
		"task.status"(val) {
			if (["running", "loading", "pending"].includes(val)) {
				this.pendingRefresh = true;
				this.ensurePolling();
				return;
			}
			if (val === "success" && this.pendingRefresh) {
				this.pendingRefresh = false;
				this.$emit("finished");
			}
			if (["failed", "error"].includes(val)) {
				this.pendingRefresh = false;
			}
			this.clearTimer();
		},
	},
	methods: {
		onOpen() {
			this.getStatus();
		},
		setTask(data = {}) {
			this.task = {
				status: data?.status || "",
				message: data?.message || "",
				logs: Array.isArray(data?.logs) ? data.logs : [],
				params: data?.params || {},
				created_at: data?.created_at || null,
				updated_at: data?.updated_at || null,
				finished_at: data?.finished_at || null,
				result: data?.result || null,
				error: data?.error || null,
			};
			if (!this.form.start_url && this.task.params?.start_url) {
				this.form.start_url = this.task.params.start_url;
			}
			if (
				(this.form.max_blocks === "" || this.form.max_blocks == null) &&
				this.task.params?.max_blocks != null
			) {
				this.form.max_blocks = `${this.task.params.max_blocks}`;
			}
		},
		async fetchPublications() {
			if (!this.form.start_url) {
				this.$swiftWarning(this.$refs.startUrlTitle, {
					replaceTitle: this.local("Start URL cannot be empty"),
				});
				return;
			}
			if (!this.canFetch || !this.lock.fetch) return;
			this.lock.fetch = false;
			const maxBlocks =
				this.form.max_blocks === "" || this.form.max_blocks == null
					? undefined
					: Number(this.form.max_blocks);
			if (
				maxBlocks !== undefined &&
				(!Number.isFinite(maxBlocks) || maxBlocks <= 0)
			) {
				this.lock.fetch = true;
				this.$barWarning(
					this.local("Max Blocks must be a positive number"),
					{
						status: "warning",
					},
				);
				return;
			}
			try {
				const res = await this.$api.Publication.FetchPublications(
					this.form.start_url,
					maxBlocks,
				);
				if (res.code === 200 || res.status === "success") {
					this.setTask(res.data || {});
					this.pendingRefresh = true;
					this.ensurePolling();
					this.$barWarning(
						(res.data && res.data.message) ||
							this.local("Fetch task started"),
						{
							status: "correct",
						},
					);
				} else {
					this.$barWarning(res.message || this.local("Fetch task failed"), {
						status: "error",
						autoClose: -1,
					});
				}
			} catch (err) {
				this.$barWarning(
					err?.message || err?.status || this.local("Fetch task failed"),
					{
						status: "error",
						autoClose: -1,
					},
				);
			} finally {
				this.lock.fetch = true;
			}
		},
		async getStatus() {
			if (!this.lock.status) return;
			this.lock.status = false;
			try {
				const res = await this.$api.Publication.GetFetchPublicationsStatus();
				if (res.code === 200 || res.status === "success") {
					this.setTask(res.data || {});
				} else {
					this.$barWarning(
						res.message || this.local("Failed to get fetch status"),
						{
							status: "warning",
						},
					);
				}
			} catch (err) {
				this.$barWarning(
					err?.message ||
						err?.status ||
						this.local("Failed to get fetch status"),
					{
						status: "warning",
					},
				);
			} finally {
				this.lock.status = true;
			}
		},
		ensurePolling() {
			if (this.timer) return;
			this.timer = setInterval(() => {
				if (!this.show) {
					this.clearTimer();
					return;
				}
				this.getStatus();
			}, 3000);
		},
		clearTimer() {
			if (this.timer) {
				clearInterval(this.timer);
				this.timer = null;
			}
		},
		formatLog(log) {
			if (typeof log === "string") return log;
			try {
				return JSON.stringify(log);
			} catch (e) {
				return `${log}`;
			}
		},
	},
	beforeUnmount() {
		this.clearTimer();
	},
};
</script>

<style lang="scss">
.fetch-pub-panel-container {
	position: relative;
	width: 100%;
	height: 100%;
	padding: 15px;
	color: rgba(223, 222, 243, 1);
	font-family:
		Akkurat Std,
		-apple-system,
		BlinkMacSystemFont,
		Segoe UI,
		Roboto,
		Oxygen,
		Ubuntu,
		Cantarell,
		Helvetica Neue,
		sans-serif;
	font-weight: 400;

	.form-block + .form-block {
		margin-top: 15px;
	}

	.panel-title {
		font-size: 12px;
		color: rgba(223, 222, 243, 1);
	}

	.status-block {
		margin-top: 18px;
		padding: 14px 16px;
		border: 1px solid rgba(212, 175, 55, 0.12);
		border-radius: 10px;
		background: linear-gradient(
			135deg,
			rgba(17, 17, 17, 0.96) 0%,
			rgba(28, 24, 18, 0.96) 100%
		);

		.status-text {
			font-size: 13px;
			color: rgba(245, 245, 245, 0.92);
		}

		.status-message {
			margin-top: 6px;
			font-size: 12px;
			color: rgba(214, 214, 214, 0.78);
		}

		.status-value {
			font-weight: bold;

			&.idle {
				color: rgba(189, 189, 189, 0.9);
			}

			&.running {
				color: rgba(255, 196, 77, 1);
			}

			&.success {
				color: rgba(102, 224, 173, 1);
			}

			&.error {
				color: rgba(255, 120, 120, 1);
			}
		}
	}

	.logs-block {
		margin-top: 18px;
	}

	.logs-head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10px;

		p {
			font-size: 12px;
			color: rgba(223, 222, 243, 1);
		}
	}

	.logs-container {
		max-height: 260px;
		padding: 12px 14px;
		border-radius: 12px;
		background: linear-gradient(
			180deg,
			rgba(10, 10, 10, 0.98) 0%,
			rgba(20, 20, 20, 0.98) 100%
		);
		border: 1px solid rgba(255, 215, 120, 0.08);
		box-shadow:
			inset 0 1px 0 rgba(255, 245, 200, 0.05),
			0 8px 24px rgba(0, 0, 0, 0.28);
		overflow: auto;
	}

	.log-empty {
		color: rgba(148, 148, 148, 0.88);
		font-size: 12px;
	}

	.log-item {
		padding: 8px 0;
		color: rgba(233, 233, 233, 0.92);
		font-size: 12px;
		line-height: 1.65;
		word-break: break-word;
		border-bottom: 1px solid rgba(255, 255, 255, 0.05);

		&:last-child {
			border-bottom: none;
		}
	}
}
</style>

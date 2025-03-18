<template>
	<fv-panel
		v-model="thisValue"
		:theme="theme"
		width="500"
		:title="local(`Metadata`)"
		:is-light-dismiss="true"
		:isAcrylic="true"
		:isFooter="true"
	>
		<template v-slot:container>
			<div class="metadata-container">
				<div class="metadata-item">
					<p class="title">BibTex</p>
					<textarea
						v-model="metadata.bib"
						class="text-area"
						:class="{ dark: theme == 'dark' }"
						:placeholder="local(`Paste the Bibtex...`)"
					></textarea>
					<fv-button
						:theme="theme"
						:isBoxShadow="true"
						icon="SemiboldWeight"
						style="width: 135px; height: 35px; margin-top: 5px"
						@click="parseBibTex"
					>
						{{ local("Parse BibTex") }}
					</fv-button>
				</div>
				<div class="metadata-item">
					<p class="title">Title</p>
					<div class="row-block">
						<fv-text-box
							v-model="metadata.title"
							:theme="theme"
							:placeholder="local(`Please Input title...`)"
							:underline="true"
							style="height: 45px; font-size: 20px; flex: 1"
						></fv-text-box>
						<fv-button
							:theme="theme"
							:disabled="!metadata.bib"
							:isBoxShadow="true"
							icon="Copy"
							style="
								width: 135px;
								height: 35px;
								margin-left: 15px;
							"
							@click="CopyBibtex"
						>
							{{ local("Copy BibTex") }}
						</fv-button>
					</div>
				</div>
				<div class="metadata-item">
					<p class="title">Publisher</p>
					<fv-text-box
						v-model="metadata.publisher"
						:theme="theme"
						:placeholder="local(`Please Input publisher...`)"
					></fv-text-box>
				</div>
				<div class="metadata-item">
					<p class="title">Year</p>
					<fv-text-box
						v-model="metadata.year"
						:theme="theme"
						:placeholder="local(`Please Input year...`)"
					></fv-text-box>
				</div>
				<div class="metadata-item">
					<p class="title">DOI</p>
					<fv-text-box
						v-model="metadata.DOI"
						:theme="theme"
						:placeholder="local(`Please Input DOI...`)"
					></fv-text-box>
				</div>
				<div class="metadata-item">
					<p class="title">CreateDate</p>
					<fv-text-box
						v-model="metadata.createDate"
						:theme="theme"
						:placeholder="local(`Please Input createDate...`)"
					></fv-text-box>
				</div>
				<div class="metadata-item">
					<p class="title">Source</p>
					<fv-text-box
						v-model="metadata.source"
						:theme="theme"
						:placeholder="local(`Please Input source...`)"
					></fv-text-box>
				</div>
				<div class="metadata-item">
					<p class="title">Url</p>
					<fv-text-box
						v-model="metadata.url"
						:theme="theme"
						:placeholder="local(`Please Input url...`)"
					></fv-text-box>
				</div>
				<div class="metadata-item">
					<p class="title">Booktitle</p>
					<fv-text-box
						v-model="metadata.booktitle"
						:theme="theme"
						:placeholder="local(`Please Input Booktitle...`)"
					></fv-text-box>
				</div>
				<div class="metadata-item">
					<p class="title">Abstract</p>
					<textarea
						v-model="metadata.abstract"
						class="text-area"
						:class="{ dark: theme == 'dark' }"
						:placeholder="local(`Please Input abstract...`)"
					></textarea>
				</div>
				<div class="metadata-item">
					<p class="title">ISSN</p>
					<fv-text-box
						v-model="metadata.ISSN"
						:theme="theme"
						:placeholder="local(`Please Input ISSN...`)"
					></fv-text-box>
				</div>
				<div class="metadata-item">
					<p class="title">Language</p>
					<fv-text-box
						v-model="metadata.language"
						:theme="theme"
						:placeholder="local(`Please Input language...`)"
					></fv-text-box>
				</div>
				<div class="metadata-item">
					<p class="title">Chapter</p>
					<fv-text-box
						v-model="metadata.chapter"
						:theme="theme"
						:placeholder="local(`Please Input chapter...`)"
					></fv-text-box>
				</div>
				<div class="metadata-item">
					<p class="title">Volume</p>
					<fv-text-box
						v-model="metadata.volume"
						:theme="theme"
						:placeholder="local(`Please Input volume...`)"
					></fv-text-box>
				</div>
				<div class="metadata-item">
					<p class="title">Number</p>
					<fv-text-box
						v-model="metadata.number"
						:theme="theme"
						:placeholder="local(`Please Input number...`)"
					></fv-text-box>
				</div>
				<div class="metadata-item">
					<p class="title">Pages</p>
					<fv-text-box
						v-model="metadata.pages"
						:theme="theme"
						:placeholder="local(`Please Input pages...`)"
					></fv-text-box>
				</div>
				<div class="metadata-item">
					<p class="title">Note</p>
					<fv-text-box
						v-model="metadata.note"
						:theme="theme"
						:placeholder="local(`Please Input note...`)"
					></fv-text-box>
				</div>
				<div class="metadata-item">
					<p class="title">School</p>
					<fv-text-box
						v-model="metadata.school"
						:theme="theme"
						:placeholder="local(`Please Input school...`)"
					></fv-text-box>
				</div>
				<div class="metadata-item">
					<p class="title">Author</p>
					<fv-text-box
						v-model="metadata.author"
						:theme="theme"
						:placeholder="local(`Please Input author...`)"
					></fv-text-box>
				</div>
			</div>
		</template>
		<template v-slot:footer>
			<fv-button
				theme="dark"
				background="rgba(0, 90, 158, 1)"
				:disabled="!lock.metaInfo || !metadata.title"
				@click="addPub"
				>{{ local("Confirm") }}</fv-button
			>
			<fv-button
				:theme="theme"
				style="margin-left: 5px"
				@click="thisValue = false"
				>{{ local("Cancel") }}</fv-button
			>
		</template>
	</fv-panel>
</template>

<script>
import { mapGetters } from "vuex";
var parse = require("bibtex-parser");

export default {
	props: {
		value: {
			default: false,
		},
		item: {
			default: null,
		},
		theme: {
			default: "light",
		},
	},
	data() {
		return {
			thisValue: this.value,
			metaInfoList: [],
			metadata: {
				id: "",
				publisher: "",
				DOI: "",
				year: "",
				createDate: "",
				source: "",
				title: "",
				url: "",
				booktitle: "", //一般是会议名称
				abstract: "",
				ISSN: "",
				language: "",
				chapter: "",
				volume: "",
				number: "",
				pages: "",
				school: "",
				note: "",
				author: "",
				bib: "",
				entry_type: "",
			},
			lock: {
				metaInfo: true,
			},
		};
	},
	watch: {
		value(val) {
			this.thisValue = val;
		},
		thisValue(val) {
			this.$emit("input", val);
		},
		item() {
			this.metadata.id = "";
			for (let key in this.metadata) {
				if (this.item[key]) {
					this.metadata[key] = this.item[key];
				}
				if (!this.item.id) this.metadata[key] = "";
			}
		},
	},
	computed: {
		...mapGetters(["local"]),
	},
	mounted() {},
	methods: {
		CopyBibtex() {
			if (!this.metadata.bib) {
				this.$barWarning("No BibTex Infomation", {
					status: "warning",
				});
				return;
			}
			if (navigator.clipboard) {
				navigator.clipboard
					.writeText(this.metadata.bib)
					.then(() => {
						this.$barWarning("Successfully Copied", {
							status: "correct",
						});
					})
					.catch((err) => {
						this.$barWarning(err, {
							status: "error",
						});
					});
			} else {
				// 回退到 document.execCommand
				const input = document.createElement("input");
				input.value = this.metadata.bib;
				document.body.appendChild(input);
				input.select();
				document.execCommand("copy");
				document.body.removeChild(input);
				this.$barWarning("Successfully Copied", {
					status: "correct",
				});
			}
		},
		async addPub() {
			if (this.metadata == "") {
				this.$barWarning(this.local("Empty title"), {
					status: "error",
					autoClose: -1,
				});
				return 0;
			}
			if (!this.lock.metaInfo) return;
			this.lock.metaInfo = false;
			await this.$axios
				.post("/publications/update", {
					id: this.metadata.id,
					publisher: this.metadata.publisher,
					DOI: this.metadata.DOI,
					year: this.metadata.year,
					createDate: this.metadata.createDate,
					source: this.metadata.source,
					title: this.metadata.title,
					url: this.metadata.url,
					booktitle: this.metadata.booktitle, //一般是会议名称
					abstract: this.metadata.abstract,
					ISSN: this.metadata.ISSN,
					language: this.metadata.language,
					chapter: this.metadata.chapter,
					pages: this.metadata.pages,
					volume: this.metadata.volume,
					number: this.metadata.number,
					school: this.metadata.school,
					note: this.metadata.note,
					author: this.metadata.author,
					bib: this.metadata.bib,
				})
				.then((data) => {
					data = data.data;
					if (data.status === "success") {
						this.$barWarning("Success", {
							status: "correct",
						});
						this.$emit("finish");
						this.show = false;
					} else {
						this.$barWarning(data.message, {
							status: "error",
							autoClose: -1,
						});
					}
					this.lock.metaInfo = true;
					this.thisValue = false;
					this.$emit("finished");
				})
				.catch((err) => {
					this.lock = true;
					this.$barWarning(err, {
						status: "error",
						autoClose: -1,
					});
				});
		},
		parseBibTex() {
			const parsedBibtex = parse(this.metadata.bib);
			for (let itemKey in parsedBibtex) {
				for (let key in this.metadata) {
					let item = parsedBibtex[itemKey];
					if (item[key.toUpperCase()]) {
						this.metadata[key] = item[key.toUpperCase()];
						if (key === "title") {
							this.metadata[key] = this.metadata[key].replace(
								/[\\{\\}]/g,
								""
							);
						}
					}
				}
			}
		},
	},
};
</script>

<style lang="scss">
.metadata-container {
	position: relative;
	width: 100%;
	height: 100%;
	overflow: auto;

	.metadata-item {
		@include HstartC;

		position: relative;
		width: 100%;
		padding: 5px 20px;
		box-sizing: border-box;
		line-height: 2;

		.title {
			margin: 5px 0px;
			font-size: 12px;
			font-weight: bold;
		}

		.row-block {
			@include Vcenter;

			width: 100%;

			&.between {
				justify-content: space-between;
			}
		}

		.circle {
			animation: circle 1s infinite linear;
		}

		@keyframes circle {
			from {
				transform: rotate(0);
			}
			to {
				transform: rotate(360deg);
			}
		}

		.meta-item {
			width: 100%;
			min-height: 55px;
			height: auto;
			padding: 0px 15px;
			font-size: 13.8px;
			font-weight: 600;
			border: rgba(200, 200, 200, 0.1) solid thin;
			border-radius: 8px;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			align-items: center;
			cursor: pointer;
			user-select: none;

			&.choosen {
				background: rgba(200, 200, 200, 0.6);

				&:hover {
					background: rgba(200, 200, 200, 0.6);
				}
			}

			&:hover {
				background: rgba(200, 200, 200, 0.1);
			}

			&:active {
				background: rgba(200, 200, 200, 0.3);
			}

			.title-block {
				@include Vcenter;

				width: 100%;
				margin: 8px 0px;
				overflow: hidden;

				i {
					font-size: 36px;
				}

				p {
					margin: 0px 12px;
					font-size: 13px;
				}
			}

			.label-block {
				@include Vcenter;

				width: 100%;
				margin: 8px 0px;
				overflow-x: auto;

				p {
					@include nowrap;
				}
			}

			.extension-block {
				@include HbetweenVcenter;

				width: 100%;
				margin: 8px 0px;

				p {
					font-size: 12px;
					font-weight: normal;
					color: rgba(75, 75, 75, 0.8);
				}
			}

			.abstract-block {
				width: 100%;
				margin: 8px 0px;
				font-size: 16px;
				font-family: "Times New Roman", Times, serif;
			}

			p {
				&.sec {
					font-size: 12px;
					font-weight: normal;
				}

				&.highlight {
					text-align: left;
					cursor: pointer;

					&:hover {
						color: rgba(0, 120, 212, 1);
						text-decoration: underline;
					}
				}
			}
		}

		.text-area {
			position: relative;
			width: 300px;
			height: 250px;
			padding: 5px;
			font-size: 16px;
			font-family: "Times New Roman", Times, serif;
			box-sizing: border-box;
			border: 1px solid rgba(36, 36, 36, 0.1);
			border-radius: 5px;
			resize: none;
			outline: none;
			line-height: 1.5;

			&.dark {
				background: transparent;
				border: 1px solid rgba(75, 75, 75, 0.8);
			}
		}

		.author-block {
			@include HcenterVcenter;

			position: relative;
			width: 100%;
			margin: 5px 0px;

			.control-btn {
				width: 30px;
				height: 30px;
				flex-shrink: 0;
			}
		}
	}
}
</style>

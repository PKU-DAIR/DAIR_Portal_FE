<template>
	<div class="choose-avatar-container">
		<div ref="shower" class="shower-container"></div>
		<div class="wrapper-container">
			<img
				id="img-container"
				alt=""
				ref="cropperImg"
				class="img-avatar"
			/>
		</div>
		<input
			type="file"
			accept=".jpg,.jpeg,.png,.svg"
			@change="changeImg"
			ref="uploader"
			style="display: none"
		/>
		<fv-button
			theme="dark"
			:background="themeColor"
			:border-radius="6"
			reveal-border-color="rgba(0, 0, 0, 0.1)"
			:is-box-shadow="true"
			@click="$refs.uploader.click()"
			style="width: 120px; height: 30px"
			>选择图片</fv-button
		>
	</div>
</template>

<script>
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";

export default {
	name: "cutting_tool",
	props: {
		themeColor: {
			default: "rgba(149, 141, 241, 1)",
		},
	},
	data() {
		return {
			oCanvas: "",
			cropper: {},
			timer: {
				debounceImg: null,
				debounceBase64: null,
			},
		};
	},
	watch: {
		oCanvas() {
			this.$refs.shower.innerHTML = "";
			this.$refs.shower.appendChild(this.oCanvas);
			this.canvasToBlob();
		},
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			this.cropper = new Cropper(this.$refs.cropperImg, {
				aspectRatio: 1 / 1,
				viewMode: 1,
				minCropBoxWidth: 200,
				minCropBoxHeight: 200,
				crop: () => {
					let oCanvas = this.cropper.getCroppedCanvas();
					oCanvas.style.width = "100%";
					oCanvas.style.height = "100%";
					this.oCanvas = oCanvas;
				},
				built: () => {
					let oCanvas = this.cropper.getCroppedCanvas();
					oCanvas.style.width = "100%";
					oCanvas.style.height = "100%";
					this.oCanvas = oCanvas;
				},
			});
		},
		changeImg() {
			var img = this.$refs.uploader.files[0];
			var reader = new FileReader();
			reader.readAsDataURL(img);
			reader.onload = (event) => {
				this.cropper.replace(event.target.result);
			};
		},
		getCanvas() {
			if (this.oCanvas == null) return -1;
			else return this.oCanvas;
		},
		async canvasToBlob() {
			let blob = await new Promise((resolve) => {
				this.oCanvas.toBlob(
					(Img) => {
						resolve(Img);
					},
					"image/jpeg",
					0.9
				);
			});
			this.blobToBase64(blob, (base64) => {
				clearTimeout(this.timer.debounceBase64);
				this.timer.debounceBase64 = setTimeout(() => {
					this.$emit("update-base64", base64);
				}, 500);
			});
			clearTimeout(this.timer.debounceImg);
			this.timer.debounceImg = setTimeout(() => {
				this.$emit("update-img", blob);
			}, 500);
			return blob;
		},
		blobToBase64(blob, callback) {
			var reader = new FileReader();
			reader.readAsDataURL(blob);
			reader.onload = function () {
				var dataUrl = reader.result;
				callback(dataUrl);
			};
		},
	},
};
</script>

<style lang="scss">
.choose-avatar-container {
	position: relative;
	width: 100%;
	height: auto;
	padding: 15px;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;

	.shower-container {
		position: relative;
		width: 85px;
		height: 85px;
		background: rgba(245, 245, 245, 0.9);
		border: rgba(250, 250, 250, 0.3) solid 3px;
		border-radius: 50%;
		overflow: hidden;
	}

	.wrapper-container {
		position: relative;
		width: 100%;
		max-width: 500px;
		height: auto;
		margin: 25px;
		background: rgba(245, 245, 245, 0.9);
		border-radius: 6px;
		overflow: hidden;

		.img-avatar {
			width: 100%;
			height: auto;
		}
	}
}
</style>

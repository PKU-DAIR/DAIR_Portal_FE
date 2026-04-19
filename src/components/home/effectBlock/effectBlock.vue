<template>
	<div ref="containerRef" class="home-effect-block" />
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import renderImg from "@/assets/logo/pku_dair.svg";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const props = defineProps({
	effect: {
		type: String,
		default: "explode",
	},
	effectMode: {
		type: Number,
		default: 2,
	},
	particleSize: {
		type: Number,
		default: 200,
	},
	particleCount: {
		type: Number,
		default: 90000,
	},
	uploadedImage: {
		type: String,
		default: renderImg,
	},
	uploadedModel: {
		type: String,
		default: null,
	},
	shape: {
		type: String,
		default: "default",
	},
	interactionMode: {
		type: String,
		default: "auto",
	},
	manualControlTarget: {
		type: String,
		default: "camera",
	},
});

const vertexShader =
	"uniform float uTime;uniform float uMorph;uniform float uPointSize;uniform int uEffectMode;uniform float uEffectIntensity;uniform float uExplosionTime;attribute vec3 targetPosition;attribute vec3 targetColor;attribute vec3 color;attribute vec3 randomOffset;varying vec3 vColor;varying float vDistance;vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}vec2 mod289(vec2 x){return x-floor(x*(1.0/289.0))*289.0;}vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}float snoise(vec2 v){const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);vec2 i=floor(v+dot(v,C.yy));vec2 x0=v-i+dot(i,C.xx);vec2 i1=(x0.x>x0.y)?vec2(1.0,0.0):vec2(0.0,1.0);vec4 x12=x0.xyxy+C.xxzz;x12.xy-=i1;i=mod289(i);vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0)) + i.x + vec3(0.0,i1.x,1.0));vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);m=m*m;m=m*m;vec3 x=2.0*fract(p*C.www)-1.0;vec3 h=abs(x)-0.5;vec3 ox=floor(x+0.5);vec3 a0=x-ox;m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);vec3 g;g.x=a0.x*x0.x+h.x*x0.y;g.yz=a0.yz*x12.xz+h.yz*x12.yw;return 130.0*dot(m,g);}void main(){vColor=mix(color,targetColor,uMorph);vec3 pos=mix(position,targetPosition,uMorph);vec3 originalPos=pos;float effectMix=uEffectIntensity;if(uEffectMode==0){float noise=sin(uTime*1.5+position.x*0.3)*cos(uTime*1.5+position.y*0.3);pos+=normalize(pos)*noise*(0.2*(1.0-uMorph));pos.x+=sin(uTime*0.3+position.z)*0.1;pos.y+=cos(uTime*0.3+position.x)*0.1;}else if(uEffectMode==1){vec3 scatterDir=normalize(pos+randomOffset*0.5);float scatterDist=length(pos)*0.5+randomOffset.x*3.0;vec3 scattered=pos+scatterDir*scatterDist*effectMix*2.5;float turb=snoise(pos.xy*0.3+uTime*0.5);scattered+=vec3(turb,turb*0.5,turb*0.3)*effectMix*1.5;pos=mix(originalPos,scattered,effectMix);}else if(uEffectMode==2){float explodeProgress=min(uExplosionTime*2.0,1.0);float returnProgress=max(0.0,(uExplosionTime-0.5)*2.0);vec3 explodeDir=normalize(pos+randomOffset);float explodeDist=(5.0+randomOffset.x*8.0)*sin(explodeProgress*3.14159);vec3 exploded=originalPos+explodeDir*explodeDist*effectMix;float spin=explodeProgress*6.28318*(0.5+randomOffset.y);exploded.x+=cos(spin)*explodeDist*0.3;exploded.z+=sin(spin)*explodeDist*0.3;pos=mix(originalPos,exploded,effectMix*(1.0-returnProgress*0.7));}else if(uEffectMode==3){float angle=atan(pos.z,pos.x);float radius=length(pos.xz);float height=pos.y;float spiralSpeed=uTime*2.0+height*0.3;float newAngle=angle+spiralSpeed*effectMix;float vortexPull=(1.0-abs(height)/20.0)*effectMix;float newRadius=radius*(1.0-vortexPull*0.5)+sin(uTime*3.0+height)*effectMix;float lift=effectMix*5.0*(1.0-radius/20.0);pos.x=cos(newAngle)*newRadius;pos.z=sin(newAngle)*newRadius;pos.y=height+lift*sin(uTime+radius);}else if(uEffectMode==4){float pulsePhase=uTime*2.5;float pulseFactor=1.0+sin(pulsePhase)*0.4*effectMix;float waveFactor=sin(pulsePhase+length(pos)*0.3)*0.3*effectMix;vec3 pulsed=pos*pulseFactor;pulsed+=normalize(pos)*waveFactor*3.0;float colorPulse=sin(pulsePhase*0.5)*0.5+0.5;vColor=mix(vColor,vec3(1.0,0.4,0.8),colorPulse*effectMix*0.3);pos=pulsed;}else if(uEffectMode==5){float waveX=sin(pos.x*0.5+uTime*2.0)*effectMix*3.0;float waveZ=cos(pos.z*0.5+uTime*1.5)*effectMix*2.0;float waveY=sin(pos.x*0.3+pos.z*0.3+uTime*2.5)*effectMix*4.0;waveY+=sin(pos.x*0.8-uTime*1.8)*effectMix*1.5;waveY+=cos(pos.z*0.6+uTime*1.2)*effectMix*1.0;pos.x+=waveX*0.3;pos.y+=waveY;pos.z+=waveZ*0.3;}vec4 mvPosition=modelViewMatrix*vec4(pos,1.0);float dist=length(pos);vDistance=dist;float sizeMultiplier=1.0;if(uEffectMode==2&&effectMix>0.1)sizeMultiplier=1.0+sin(uExplosionTime*10.0)*0.3;if(uEffectMode==4)sizeMultiplier=1.0+sin(uTime*2.5)*0.2*effectMix;gl_PointSize=(uPointSize/-mvPosition.z)*(1.2+sin(uTime*3.0+dist*0.15)*0.5)*sizeMultiplier;gl_Position=projectionMatrix*mvPosition;}";

const fragmentShader =
	"uniform float uTime;varying vec3 vColor;varying float vDistance;void main(){float dist=distance(gl_PointCoord,vec2(0.5));if(dist>0.5)discard;float strength=pow(1.0-dist*2.0,1.6);vec3 finalColor=vColor*2.0;float alpha=strength*(0.8+sin(vDistance*0.3+uTime)*0.2);gl_FragColor=vec4(finalColor,alpha);}";

const containerRef = ref(null);
const textureDataCache = new Map();

let sceneData = null;
let animationId = 0;
let uploadedImage = props.uploadedImage;
let currentEffect = props.effect;
let interactionMode = props.interactionMode;
let manualControlTarget = props.manualControlTarget;
let effectIntensity = 1;
let targetEffectIntensity = 1;
let explosionTime = 0;

const cameraControlState = {
	target: null,
	yaw: 0,
	pitch: 0,
	distance: 45,
	minDistance: 20,
	maxDistance: 100,
	isLeftDragging: false,
	isRightDragging: false,
	previousX: 0,
	previousY: 0,
};

const mouseState = {
	isDragging: false,
	previousX: 0,
	previousY: 0,
};

function getTextureData(texture) {
	const image = texture.image;
	if (!image || !image.width || !image.height) return null;

	const cacheKey = image.src || image.id || texture.uuid;
	if (textureDataCache.has(cacheKey)) return textureDataCache.get(cacheKey);

	const canvas = document.createElement("canvas");
	canvas.width = image.width;
	canvas.height = image.height;
	const ctx = canvas.getContext("2d");
	if (!ctx) return null;

	ctx.drawImage(image, 0, 0);
	const data = ctx.getImageData(0, 0, image.width, image.height);
	textureDataCache.set(cacheKey, data);
	return data;
}

function updateCameraFromState(camera) {
	const cp = Math.cos(cameraControlState.pitch);
	const sp = Math.sin(cameraControlState.pitch);
	const cy = Math.cos(cameraControlState.yaw);
	const sy = Math.sin(cameraControlState.yaw);

	camera.position.set(
		cameraControlState.target.x + cameraControlState.distance * sy * cp,
		cameraControlState.target.y + cameraControlState.distance * sp,
		cameraControlState.target.z + cameraControlState.distance * cy * cp,
	);
	camera.lookAt(cameraControlState.target);
}

function getViewportSize() {
	const container = containerRef.value;
	return {
		width: container?.clientWidth || window.innerWidth,
		height: container?.clientHeight || window.innerHeight,
	};
}

function processImage(imageUrl) {
	if (!imageUrl || !sceneData) return;

	const img = new Image();
	img.crossOrigin = "anonymous";
	img.src = imageUrl;
	img.onload = () => {
		if (!sceneData) return;

		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const resolution = 200;
		const aspect = img.width / img.height;
		const drawWidth = aspect > 1 ? resolution : resolution * aspect;
		const drawHeight = aspect > 1 ? resolution / aspect : resolution;

		canvas.width = resolution;
		canvas.height = resolution;
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, resolution, resolution);
		ctx.drawImage(
			img,
			(resolution - drawWidth) / 2,
			(resolution - drawHeight) / 2,
			drawWidth,
			drawHeight,
		);

		const imgData = ctx.getImageData(0, 0, resolution, resolution).data;
		const validPoints = [];

		for (let y = 0; y < resolution; y += 1) {
			for (let x = 0; x < resolution; x += 1) {
				const idx = (y * resolution + x) * 4;
				const r = imgData[idx];
				const g = imgData[idx + 1];
				const b = imgData[idx + 2];
				if ((r + g + b) / 3 > 15) {
					validPoints.push({
						pos: [
							(x / resolution - 0.5) * 38,
							(0.5 - y / resolution) * 38,
							((r + g + b) / 765 - 0.5) * 12,
						],
						col: [r / 255, g / 255, b / 255],
					});
				}
			}
		}

		if (!validPoints.length) return;

		const { targetPositions, targetColors, geometry } = sceneData;
		for (let i = 0; i < props.particleCount; i += 1) {
			const i3 = i * 3;
			const point = validPoints[i % validPoints.length];
			targetPositions[i3] = point.pos[0] + (Math.random() - 0.5) * 0.4;
			targetPositions[i3 + 1] =
				point.pos[1] + (Math.random() - 0.5) * 0.4;
			targetPositions[i3 + 2] =
				point.pos[2] + (Math.random() - 0.5) * 1.5;
			targetColors[i3] = point.col[0];
			targetColors[i3 + 1] = point.col[1];
			targetColors[i3 + 2] = point.col[2];
		}

		geometry.attributes.targetPosition.needsUpdate = true;
		geometry.attributes.targetColor.needsUpdate = true;
	};
}

function processModel(modelUrl) {
	if (!modelUrl || !sceneData) return;

	const loader = new GLTFLoader();
	loader.load(modelUrl, (gltf) => {
		if (!sceneData) return;

		const positions = [];
		const colors = [];
		gltf.scene.updateMatrixWorld(true);
		gltf.scene.traverse((child) => {
			if (!child.isMesh) return;

			const geo = child.geometry;
			const posAttr = geo.attributes.position;
			const uvAttr = geo.attributes.uv;
			const colorAttr = geo.attributes.color;
			const material = Array.isArray(child.material)
				? child.material[0]
				: child.material;
			const texture = material?.map;
			const imageData = texture ? getTextureData(texture) : null;
			const meshColor = material?.color || new THREE.Color(0xffffff);

			for (let i = 0; i < posAttr.count; i += 1) {
				const vertex = new THREE.Vector3().fromBufferAttribute(
					posAttr,
					i,
				);
				vertex.applyMatrix4(child.matrixWorld);
				positions.push(vertex.x, vertex.y, vertex.z);

				const col = new THREE.Color(1, 1, 1);
				if (imageData && uvAttr) {
					const u = ((uvAttr.getX(i) % 1) + 1) % 1;
					const v = ((uvAttr.getY(i) % 1) + 1) % 1;
					const x = Math.floor(u * (imageData.width - 1));
					const y = Math.floor((1 - v) * (imageData.height - 1));
					const idx = (y * imageData.width + x) * 4;
					col.setRGB(
						imageData.data[idx] / 255,
						imageData.data[idx + 1] / 255,
						imageData.data[idx + 2] / 255,
					);
					col.multiply(meshColor);
				} else if (colorAttr) {
					col.fromBufferAttribute(colorAttr, i);
				} else {
					col.copy(meshColor);
				}
				colors.push(col.r, col.g, col.b);
			}
		});

		if (!positions.length) return;

		const { targetPositions, targetColors, geometry } = sceneData;
		const box = new THREE.Box3().setFromObject(gltf.scene);
		const center = box.getCenter(new THREE.Vector3());
		const size = box.getSize(new THREE.Vector3());
		const maxDim = Math.max(size.x, size.y, size.z);
		const scale = 30 / maxDim;

		for (let i = 0; i < props.particleCount; i += 1) {
			const i3 = i * 3;
			const pIndex =
				Math.floor(Math.random() * (positions.length / 3)) * 3;
			const jitter = 0.15;
			targetPositions[i3] =
				(positions[pIndex] - center.x) * scale +
				(Math.random() - 0.5) * jitter;
			targetPositions[i3 + 1] =
				(positions[pIndex + 1] - center.y) * scale +
				(Math.random() - 0.5) * jitter;
			targetPositions[i3 + 2] =
				(positions[pIndex + 2] - center.z) * scale +
				(Math.random() - 0.5) * jitter;
			targetColors[i3] = colors[pIndex];
			targetColors[i3 + 1] = colors[pIndex + 1];
			targetColors[i3 + 2] = colors[pIndex + 2];
		}

		geometry.attributes.targetPosition.needsUpdate = true;
		geometry.attributes.targetColor.needsUpdate = true;
	});
}

function generateShape(shapeName) {
	if (!sceneData) return;

	const { targetPositions, targetColors, geometry } = sceneData;
	const points = [];
	const shapeGreen = new THREE.Color(0x00ff66);
	const shapeWhite = new THREE.Color(0xffffff);

	for (let i = 0; i < props.particleCount; i += 1) {
		const color = Math.random() > 0.7 ? shapeGreen : shapeWhite;
		let point;

		if (shapeName === "sphere") {
			const theta = Math.random() * Math.PI * 2;
			const phi = Math.acos(2 * Math.random() - 1);
			const r = 16;
			point = [
				r * Math.sin(phi) * Math.cos(theta),
				r * Math.sin(phi) * Math.sin(theta),
				r * Math.cos(phi),
			];
		} else if (shapeName === "cube") {
			const cubeSize = 18;
			const face = Math.floor(Math.random() * 6);
			const a = (Math.random() - 0.5) * cubeSize;
			const b = (Math.random() - 0.5) * cubeSize;
			point =
				face === 0
					? [cubeSize / 2, a, b]
					: face === 1
						? [-cubeSize / 2, a, b]
						: face === 2
							? [a, cubeSize / 2, b]
							: face === 3
								? [a, -cubeSize / 2, b]
								: face === 4
									? [a, b, cubeSize / 2]
									: [a, b, -cubeSize / 2];
		} else {
			const t = (i / props.particleCount) * Math.PI * 10;
			const radius = 10 + Math.sin(t * 3) * 4;
			point = [
				radius * Math.cos(t),
				(i / props.particleCount - 0.5) * 40,
				radius * Math.sin(t),
			];
		}

		points.push({
			pos: [
				point[0] + (Math.random() - 0.5) * 2.5,
				point[1] + (Math.random() - 0.5) * 2.5,
				point[2] + (Math.random() - 0.5) * 2.5,
			],
			col: [color.r, color.g, color.b],
		});
	}

	for (let i = 0; i < props.particleCount; i += 1) {
		const i3 = i * 3;
		const point = points[i % points.length];
		targetPositions[i3] = point.pos[0];
		targetPositions[i3 + 1] = point.pos[1];
		targetPositions[i3 + 2] = point.pos[2];
		targetColors[i3] = point.col[0];
		targetColors[i3 + 1] = point.col[1];
		targetColors[i3 + 2] = point.col[2];
	}

	geometry.attributes.targetPosition.needsUpdate = true;
	geometry.attributes.targetColor.needsUpdate = true;
	uploadedImage = "shape";
}

function onResize() {
	if (!sceneData) return;

	const { width, height } = getViewportSize();
	sceneData.camera.aspect = width / height;
	sceneData.camera.updateProjectionMatrix();
	sceneData.renderer.setSize(width, height);
}

function onMouseDown(e) {
	if (interactionMode === "manual" && manualControlTarget === "camera") {
		if (e.button === 0) {
			cameraControlState.isLeftDragging = true;
		} else if (e.button === 2) {
			cameraControlState.isRightDragging = true;
		}
		cameraControlState.previousX = e.clientX;
		cameraControlState.previousY = e.clientY;
	}

	if (interactionMode === "manual" && manualControlTarget === "object") {
		mouseState.isDragging = true;
		mouseState.previousX = e.clientX;
		mouseState.previousY = e.clientY;
	}
}

function onMouseMove(e) {
	if (!sceneData) return;

	if (interactionMode === "manual" && manualControlTarget === "camera") {
		const deltaX = e.clientX - cameraControlState.previousX;
		const deltaY = e.clientY - cameraControlState.previousY;

		if (cameraControlState.isLeftDragging) {
			cameraControlState.yaw -= deltaX * 0.005;
			cameraControlState.pitch -= deltaY * 0.005;
			const maxPitch = Math.PI * 0.499;
			cameraControlState.pitch = Math.max(
				-maxPitch,
				Math.min(maxPitch, cameraControlState.pitch),
			);
		} else if (cameraControlState.isRightDragging) {
			const panScale = cameraControlState.distance * 0.002;
			const forward = new THREE.Vector3();
			sceneData.camera.getWorldDirection(forward);
			const right = new THREE.Vector3()
				.crossVectors(forward, sceneData.camera.up)
				.normalize();
			const up = new THREE.Vector3()
				.copy(sceneData.camera.up)
				.normalize();
			cameraControlState.target.addScaledVector(
				right,
				-deltaX * panScale,
			);
			cameraControlState.target.addScaledVector(up, deltaY * panScale);
		}

		cameraControlState.previousX = e.clientX;
		cameraControlState.previousY = e.clientY;
	}

	if (
		interactionMode === "manual" &&
		manualControlTarget === "object" &&
		mouseState.isDragging
	) {
		const deltaX = e.clientX - mouseState.previousX;
		const deltaY = e.clientY - mouseState.previousY;
		sceneData.points.rotation.y += deltaX * 0.005;
		sceneData.points.rotation.x += deltaY * 0.005;
		mouseState.previousX = e.clientX;
		mouseState.previousY = e.clientY;
	}
}

function onMouseUp() {
	mouseState.isDragging = false;
	cameraControlState.isLeftDragging = false;
	cameraControlState.isRightDragging = false;
}

function onWheel(e) {
	if (interactionMode !== "manual" || manualControlTarget !== "camera")
		return;

	e.preventDefault();
	cameraControlState.distance += e.deltaY * 0.03;
	cameraControlState.distance = Math.max(
		cameraControlState.minDistance,
		Math.min(cameraControlState.maxDistance, cameraControlState.distance),
	);
}

function onContextMenu(e) {
	e.preventDefault();
}

function onKeyDown(e) {
	if (e.code !== "Space" || e.repeat) return;

	e.preventDefault();
	interactionMode = interactionMode === "auto" ? "manual" : "auto";
}

function animate() {
	animationId = requestAnimationFrame(animate);
	if (!sceneData) return;

	const { renderer, scene, camera, points, material } = sceneData;
	sceneData.time += 0.008;

	if (interactionMode === "manual") {
		if (manualControlTarget === "camera") updateCameraFromState(camera);
	} else {
		let rotationSpeed = 0.0025;
		if (currentEffect === "vortex")
			rotationSpeed = 0.008 * (0.5 + effectIntensity);
		else if (currentEffect === "explode") rotationSpeed = 0.001;
		points.rotation.y += rotationSpeed;
		points.rotation.z += 0.001;
		points.rotation.x = Math.sin(sceneData.time * 0.15) * 0.12;
	}

	material.uniforms.uTime.value = sceneData.time;
	const targetMorph = uploadedImage || props.uploadedModel ? 1.0 : 0.0;
	sceneData.morphFactor += (targetMorph - sceneData.morphFactor) * 0.05;
	material.uniforms.uMorph.value = sceneData.morphFactor;
	effectIntensity += (targetEffectIntensity - effectIntensity) * 0.08;
	material.uniforms.uEffectIntensity.value = effectIntensity;
	material.uniforms.uEffectMode.value =
		{
			default: 0,
			scatter: 1,
			explode: 2,
			vortex: 3,
			pulse: 4,
			wave: 5,
		}[currentEffect] ?? props.effectMode;

	explosionTime += 0.016;
	if (explosionTime > 2.0) explosionTime = 0;
	material.uniforms.uExplosionTime.value = explosionTime;

	renderer.render(scene, camera);
}

function initParticleCanvas() {
	const container = containerRef.value;
	if (!container) return;

	const { width, height } = getViewportSize();
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 1000);
	camera.position.z = 45;
	cameraControlState.target = new THREE.Vector3(0, 0, 0);
	updateCameraFromState(camera);

	const renderer = new THREE.WebGLRenderer({
		antialias: true,
		alpha: true,
		powerPreference: "high-performance",
	});
	renderer.setSize(width, height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	renderer.setClearColor(0x000000, 0);
	container.appendChild(renderer.domElement);

	const geometry = new THREE.BufferGeometry();
	const positions = new Float32Array(props.particleCount * 3);
	const targetPositions = new Float32Array(props.particleCount * 3);
	const colors = new Float32Array(props.particleCount * 3);
	const targetColors = new Float32Array(props.particleCount * 3);
	const randomOffsets = new Float32Array(props.particleCount * 3);
	const greenColor = new THREE.Color(0x00ff66);
	const brightWhite = new THREE.Color(0xffffff);

	for (let i = 0; i < props.particleCount; i += 1) {
		const i3 = i * 3;
		const t = (Math.random() - 0.5) * 5.0;
		const angle = Math.random() * Math.PI * 2;
		const radiusBase = 0.4 + Math.abs(t) ** 2.4;
		const radius = radiusBase * (0.75 + Math.random() * 0.55);
		const x = radius * Math.cos(angle) * 2.9;
		const z = radius * Math.sin(angle) * 2.9;
		const y = t * 7.5;

		positions[i3] = x;
		positions[i3 + 1] = y;
		positions[i3 + 2] = z;
		targetPositions[i3] = x;
		targetPositions[i3 + 1] = y;
		targetPositions[i3 + 2] = z;
		randomOffsets[i3] = (Math.random() - 0.5) * 2;
		randomOffsets[i3 + 1] = (Math.random() - 0.5) * 2;
		randomOffsets[i3 + 2] = (Math.random() - 0.5) * 2;

		const color = Math.random() > 0.7 ? greenColor : brightWhite;
		colors[i3] = color.r;
		colors[i3 + 1] = color.g;
		colors[i3 + 2] = color.b;
		targetColors[i3] = color.r;
		targetColors[i3 + 1] = color.g;
		targetColors[i3 + 2] = color.b;
	}

	geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
	geometry.setAttribute(
		"targetPosition",
		new THREE.BufferAttribute(targetPositions, 3),
	);
	geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
	geometry.setAttribute(
		"targetColor",
		new THREE.BufferAttribute(targetColors, 3),
	);
	geometry.setAttribute(
		"randomOffset",
		new THREE.BufferAttribute(randomOffsets, 3),
	);

	const material = new THREE.ShaderMaterial({
		vertexShader,
		fragmentShader,
		transparent: true,
		uniforms: {
			uTime: { value: 0 },
			uMorph: { value: 0 },
			uPointSize: { value: props.particleSize },
			uEffectMode: { value: props.effectMode },
			uEffectIntensity: { value: 1 },
			uExplosionTime: { value: 0 },
		},
		depthWrite: false,
		blending: THREE.AdditiveBlending,
	});

	const points = new THREE.Points(geometry, material);
	scene.add(points);
	sceneData = {
		scene,
		camera,
		renderer,
		points,
		geometry,
		material,
		targetPositions,
		targetColors,
		time: 0,
		morphFactor: 0,
	};

	if (props.uploadedModel) processModel(props.uploadedModel);
	else if (uploadedImage && uploadedImage !== "3d-model-placeholder")
		processImage(uploadedImage);
	else if (props.shape && props.shape !== "default")
		generateShape(props.shape);

	renderer.domElement.addEventListener("mousedown", onMouseDown);
	renderer.domElement.addEventListener("wheel", onWheel, { passive: false });
	renderer.domElement.addEventListener("contextmenu", onContextMenu);
	window.addEventListener("resize", onResize);
	window.addEventListener("mousemove", onMouseMove);
	window.addEventListener("mouseup", onMouseUp);
	window.addEventListener("keydown", onKeyDown);
	animate();
}

function cleanup() {
	if (animationId) cancelAnimationFrame(animationId);

	window.removeEventListener("resize", onResize);
	window.removeEventListener("mousemove", onMouseMove);
	window.removeEventListener("mouseup", onMouseUp);
	window.removeEventListener("keydown", onKeyDown);

	if (!sceneData) return;

	sceneData.renderer.domElement.removeEventListener("mousedown", onMouseDown);
	sceneData.renderer.domElement.removeEventListener("wheel", onWheel);
	sceneData.renderer.domElement.removeEventListener(
		"contextmenu",
		onContextMenu,
	);
	sceneData.geometry.dispose();
	sceneData.material.dispose();
	sceneData.renderer.dispose();
	sceneData.renderer.domElement.remove();
	sceneData = null;
}

onMounted(initParticleCanvas);
onBeforeUnmount(cleanup);
</script>

<style lang="scss">
.home-effect-block {
	width: 100%;
	height: 100vh;
	flex-shrink: 0;
	overflow: hidden;
	background: transparent;

	:deep(canvas) {
		display: block;
	}
}
</style>

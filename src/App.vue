<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
export default {
	name: "App"
};
</script>

<style lang="scss">
* {
	margin: 0px;
	padding: 0px;
	box-sizing: border-box;
}
/*定义滚动条高宽及背景
 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
	width: 5px;
	height: 5px;
	&:hover {
		width: 10px;
	}
}
/*定义滚动条轨道
 内阴影+圆角*/
::-webkit-scrollbar-track {
	border-radius: 10px;
}
/*定义滑块
 内阴影+圆角*/
::-webkit-scrollbar-thumb {
	border-radius: 10px;
	background-color: #bfbebd;
	cursor: pointer;
	&:hover {
		width: 16px;
	}
}
</style>

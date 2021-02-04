<template>
	<view class="arrow" v-show="show">
		<view class="text"></view>
		<image src="/static/ui/sz.png">
	</view>
</template>

<script>
	export default {
		props: ['show']
	}
</script>

<style scoped lang="scss">
	.arrow {
		width: 100px;
		color: #fff;
		text-align: center;
		animation: move 800ms infinite forwards;
		position: fixed;
		bottom: 30%;
		right: 11%;
		image {
			width: 125px;
			height: 125px;
			transform: rotate(-130deg);
		}
	}
	
	@keyframes move {
		0% {
			bottom: 30%;
		}
		50% {
			bottom: 22%;
		}
		100% {
			bottom: 30%;
			display: none;
		}
	}
</style>

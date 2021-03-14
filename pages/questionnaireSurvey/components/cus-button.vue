<template>
	<view class="custom-button" @tap="$emit('click')" :class="[type]">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		props: ['type']
	}
</script>

<style>
	.custom-button {
		display: inline-block;
		width: 146rpx;
		height: 70rpx;
		line-height: 70rpx;
		text-align: center;
		background-color: transparent!important;
		font-size: 24rpx;
		font-weight: 700;
	}
	.c-purple {
		background: url(../../../static/ui/growth/purple-btn.png) no-repeat;
		background-size: 100%;
	}
	.c-blue {
		background: url(../../../static/ui/growth/blue-btn.png) no-repeat;
		background-size: 100%;
	}
</style>

<template>
	<view class="nothing">
		<image src="/static/ui/nothing.png" mode="widthFix"></image>
		<view class="base-color">
			<slot></slot>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.nothing {
		text-align: center;
		margin-top: 160rpx;
		image {
			width: 150rpx;
			height: 150rpx;
		}
	}
</style>

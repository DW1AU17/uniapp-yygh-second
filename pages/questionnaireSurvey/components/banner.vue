<template>
	<view class="banner answer-box">
		<image src="../../../static/ui/growth/title1.png" mode="aspectFit"/>
		<text class="fc666 title">预约专家 获取生长建议</text>
		<text class="btn" @tap="goDoctorPage">立即预约</text>
	</view>
</template>

<script>
	export default {
		methods: {
			// 跳转到医生选择界面
			goDoctorPage() {
				this.$emit('go')
			}
		}
	}
</script>

<style lang="scss">
	.banner {
		margin: 60rpx 30rpx 24rpx;
		position: relative;
		&:after, &:before {
			content: '';
			position: absolute;
			width: 11rpx;
			height: 77rpx;
			left: 180rpx;
			bottom: -54rpx;
			background: url(../../../static/ui/growth/connect.png) no-repeat;
			background-size: 11rpx 77rpx;
			z-index: 999;
		}
		&:after {
			left: auto;
			right: 180rpx;
		}
		image {
			width: 597rpx;
			height: 54rpx;
		}
		.title {
			font-size: 30rpx;
			font-weight: 700;
		}
		.btn {
			display: inline-block;
			font-size: 28rpx;
			line-height: 46rpx;
			padding: 0 26rpx;
			color: #fff;
			background-color: #f17a05;
			border-radius: 23rpx;
			margin-left: 30rpx;
		}
	}
</style>

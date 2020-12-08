<template>
	<view class="single-item" @tap="goSourcePage">
		<view class="pic">
			<img src="/static/doctor.png">
		</view>
		<view class="right">
			<view>
				<text class="doc-name">蔡徐坤</text>
				<text class="post">国家级男技师</text>
			</view>
			<view class="introduce">
				<text class="text-line2">针灸高手针灸高手针灸高, 手针灸高手针灸高手针灸高手针灸高手针灸高手针灸高手针灸高手针灸高手针灸高手针灸高手针灸高手针灸高手针灸高手针灸高手针灸高手针灸高手针灸高手针灸高手针灸高手针灸高手针灸高手针灸高手针灸高手针灸高手针灸高手</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		methods: {
			goSourcePage(data) {
				console.log('跳转号源页面')
				uni.navigateTo({
					url: '/pages/source/source'
				})
				// let that = this
				// uni.navigateTo({
				//     url: `/pages/source/source`,
				// 	success(res) {
				// 		res.eventChannel.emit('acceptDataFromOpenerPage', { data: { ...data, depName: that.depName } })
				// 	}
				// });
			},
		}
	}
</script>

<style lang="scss">
	.single-item {
		border-bottom: 1px solid $bc-color;
		display: flex;
		padding: 20rpx;
		background-color: #fff;
		.pic {
			width: 90rpx;
			height: 90rpx;
			margin: 20rpx 20rpx 20rpx 0;
			img {
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}
		}
		.right {
			flex: 1;
			padding: 10rpx;
			.doc-name {
				font-size: $fs-30;
				margin-right: 20rpx;
				font-weight: 700;
				color: $base-color;
			}
			.post {
				font-size: $fs-26;
				color: $base-color;
			}
			.introduce {
				color: $color-shallow;
				line-height: 1.4;
				font-size: $fs-24;
				margin-top: 4rpx;
				text {
					line-height: 1.3;
				}
			}
		}
		&:last-child {
			border-bottom: none;
		}
	}
</style>

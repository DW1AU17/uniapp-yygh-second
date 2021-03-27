<template>
	<view class="pavilion-page">
		<view class="main border-box">
			<view class="border-box-inner">
				<pav-panel :list="pavList" @jump="goSubscribePage"/>
			</view>
		</view>
		
		<view class="remind">
			<view class="title">预约挂号须知</view>
			<view class="single">
				<view>1. 预约号源的统一放号时间为提前一周下午2点整</view>
				<view>2. 预约成功后的记录, 可在"个人中心"下"挂号记录"中查询</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { pavList } from '@/common/utils/index'
	import pavPanel from './components/pav-panel'
	export default {
		components: {
			pavPanel
		},
		data() {
			return {
				pavList
			}
		},
		methods: {
			goSubscribePage(data) {
				let { id, orgCode } = data
				uni.navigateTo({
					url: `/pages/subscribe/subscribe?orgCode=${orgCode}&hospitalId=${id}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.pavilion-page {
		padding: 30rpx;
		height: calc(100% - 60rpx);
		.remind {
			font-size: 26rpx;
			margin-top: 10rpx;
			.title {
				color: #666;
			}
			.single {
				color: #999;
			}
		}
	}
	
</style>

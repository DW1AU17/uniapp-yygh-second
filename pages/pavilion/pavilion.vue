<template>
	<view class="pavilion-page">
		<view class="main">
			<pav-panel :data="pavList" @jump="goSubscribePage"/>
		</view>
		
		<view class="remind">
			<view class="title">预约挂号须知</view>
			<view class="single">
				<view>1. 预约号源的统一放号时间为提前一周下午3点整</view>
				<view>2. 预约成功后的记录, 可在"个人中心"下"挂号记录"中查询</view>
			</view>
		</view>
	</view>
</template>

<script>
	let pavList = [
		{ id: 330003, sffName: '东新馆 (暂未开放)', sffSummary: '位于东新路737号', img: '/static/pav/dxg.jpg'},
		{ id: 330004, sffName: '环西馆', sffSummary: '位于环城西路92号', img: '/static/pav/hxg.jpg'},
		{ id: 330005, sffName: '城站馆 (暂未开放)', sffSummary: '位于郭东园巷2号', img: '/static/pav/czg.jpg'},
		{ id: 330002, sffName: '武林馆 (暂未开放)', sffSummary: '位于体育路474号', img: '/static/pav/wlg.jpg'},
		{ id: 330001, sffName: '城西馆 (暂未开放)', sffSummary: '位于古墩路632号同人精华', img: '/static/pav/cxg.jpg'},
	]
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
			goSubscribePage() {
				uni.navigateTo({
					url: '/pages/subscribe/subscribe'
				})
			}
		}
	}
</script>

<style lang="scss">
	.pavilion-page {
		background-color: $bgc-base;
		.main {
			background-color: #fff;
		}
		.remind {
			padding: 20rpx;
			font-size: 26rpx;
			.title {
				color: $title-color;
			}
			.single {
				color: $grey-color;
			}
		}
	}
	
</style>

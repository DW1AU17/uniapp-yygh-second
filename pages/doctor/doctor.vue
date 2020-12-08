<template>
	<view class="doctor-page">
		<view class="top">
			<view class="date">
				<view class="all">
					<view>
						<view class="lh1">全部</view>
						<view class="lh1">日期</view>
					</view>
				</view>
				<view class="right">
					<date-panel @tap="getDoctorList" />
					<date-panel />
					<date-panel class="active" />
					<date-panel />
					<date-panel />
					<date-panel />
					<date-panel />
					<date-panel />
					<date-panel />
					<date-panel />
					<date-panel />
				</view>
			</view>
			<search placeholder="请输入医生姓名" :mask="true"/>
		</view>
		<view class="doctor-list">
			<doctor-panel />
			<doctor-panel />
			<doctor-panel />
			<doctor-panel />
			<doctor-panel />
			<doctor-panel />
		</view>
	</view>
</template>

<script>
	import { getDoctorList } from '@/common/api/register.js'
	import search from '@/components/uni-search-bar/uni-search-bar'
	import doctorPanel from '@/components/doctor-panel/doctor-panel'
	import datePanel from './components/date-panel'
	export default {
		components: {
			search,
			doctorPanel,
			datePanel
		},
		data() {
			return {
				
			}
		},
		methods: {
			// 获取医生
			async getDoctorList(deptId = 6, depName = '中医儿科') {
				console.log('获取医生')
				// this.currentDep = deptId
				// this.depName = depName
				// let data = { deptId, specialMode: 2 }
				// this.showLoging()
				// let res = await getDoctorList(data)
				// this.doctorList = res.code === 0 ? res.data : []
				// uni.hideLoading()
			}
		}
	}
</script>

<style lang="scss">
	@mixin base-flex {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.lh1 {
		line-height: 1.2;
		color: $color-primary;
	}
	.doctor-page {
		background-color: $bgc-base;
		.top {
			/* 日期 */
			.date {
				display: flex;
				padding: 10px 0;
				border-bottom: 8px solid $bgc-base;
				height: 100px;
				background-color: #fff;
				.all {
					width: 50px;
					@include base-flex;
					border-right: 1px solid $bc-color;
				}
				.right {
					flex: 1;
					display: flex;
					align-items: center;
					overflow-x: auto;
					width: 0;
					margin: 0 10px;
					
				}
			}
		}
		/* 医生列表 */
		.doctor-list {
			height: calc(100% - 152px);
			overflow-y: auto;
			padding: 0 20rpx;
			background-color: #fff;
		}
	}
</style>

<template>
	<view>
		<search placeholder="请输入医生姓名" :mask="true"/>
		<view class="sub-page">
			<view class="dep-first-left">
				<view class="item">针灸推拿科</view>
				<view class="item">针灸推拿科</view>
				<view class="item active">
					<uni-icons color="#00a0d0" size="18" type="arrowright" />
					针灸推拿科
				</view>
				<view class="item">针灸推拿科</view>
				<view class="item">针灸推拿科</view>
				<view class="item">针灸推拿科</view>
			</view>
			<view class="dep-seconf-right">
				<view class="item" @tap="goDoctorPage">针灸推拿科</view>
				<view class="item">针灸推拿科</view>
				<view class="item">针灸推拿科</view>
				<view class="item">针灸推拿科</view>
				<view class="item">针灸推拿科</view>
				<view class="item">针灸推拿科</view>
				<view class="item">针灸推拿科</view>
				<view class="item">针灸推拿科</view>
				<view class="item">针灸推拿科</view>
				<view class="item">针灸推拿科</view>
				<view class="item">针灸推拿科</view>
				<view class="item">针灸推拿科</view>
				<view class="item">针灸推拿科</view>
				<view class="item">针灸推拿科</view>
				<view class="item">针灸推拿科</view>
				<view class="item">针灸推拿科</view>
				<view class="item">针灸推拿科</view>
				<view class="item">针灸推拿科</view>
			</view>
		</view>
	</view>
</template>
<script>
	import { getDepartmentList } from '@/common/api/register.js'
	import search from '@/components/uni-search-bar/uni-search-bar'
	import uniIcons from "@/components/uni-icons/uni-icons"
	export default {
		components: {
			search,
			uniIcons
		},
		data() {
			return {
				depList: [],
				depSecondList: [], // 二级
				currentDep: 6,
				depName: '中医儿科'
			}
		},
		onLoad() {
			// this.getDepList()
		},
		onShow() {
			// this.getDepList()
		},
		methods: {
			// 获取科室
			async getDepList() {
				// let res = await getDepartmentList()
				// if (res.code === 0) {
				// 	this.depList = res.data
				// }
			},
			goDoctorPage() {
				uni.navigateTo({
					url: '/pages/doctor/doctor'
				})
			}
		}
	}
</script>
<style lang="scss">
	@mixin hofs {
		height: 100%;
		overflow-y: auto;
	}
	.sub-page {
		display: flex;
		font-size: $fs-28;
		color: $base-color;
		height: calc(100% - 52px);
		background-color: #fff;
		.dep-first-left {
			width: 300rpx;
			@include hofs;
			.item {
				border-bottom: 1rpx solid $bgc-base;
				&.active {
					background-color: $bgc-base;
					color: $color-primary;
					font-weight: 700;
				}
			}
		}
		.dep-seconf-right {
			@include hofs;
			flex: 1;
			background-color: $bgc-base;
		}
		.item {
			height: 88rpx;
			line-height: 88rpx;
			padding-left: 20rpx;
		}
	}
</style>
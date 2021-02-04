<template>
	<!-- <view class="date-item" v-bind="$attrs" v-on="$listeners"> -->
	<view class="date-item" :class="[customClass]" @tap="getDoctor(date)">
		<view>
			<view class="day">{{date.week}}</view>
			<view class="num num1">{{date.month}}</view>
			<view class="num num2">{{date.day}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			customClass: {
				default: ''
			},
			date: {
				type: Object,
				default: {}
			}
		},
		methods: {
			getDoctor({ searchDate, id }) {
				this.$emit('getDoc', {searchDate, id})
			}
		}
	}
</script>

<style lang="scss">
	.date-item {
		height: 100%;
		width: 86rpx;
		text-align: center;
		flex-shrink:0;
		border-radius: $br-base;
		display: flex;
		align-items: center;
		justify-content: center;
		line-height: 1.4;
		padding: 10rpx 0;
		&.active {
			background-color: $color-primary;
			box-shadow: 4rpx 0px 8rpx -4rpx $bs-color;
			view {
				color: #fff;
			}
		}
		.day {
			color: #666;
			font-size: 20rpx;
		}
		.num1 {
			color: #999;
			font-size: 24rpx;
			margin: 6rpx 0;
		}
		.num2 {
			font-size: 30rpx;
			font-weight: 700;
		}
	}
</style>

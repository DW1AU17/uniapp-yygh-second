<template>
	<view class="date-item" v-bind="$attrs" v-on="$listeners">
		<view>
			<view class="day">今日</view>
			<view class="num num1">12</view>
			<view class="num">02</view>
		</view>
	</view>
</template>

<script>
	export default {

	}
</script>

<style lang="scss">
	.date-item {
		height: 100%;
		width: 43px;
		text-align: center;
		flex-shrink:0;
		border-radius: $br-base;
		font-size: 14px;
		display: flex;
		align-items: center;
		justify-content: center;
		line-height: 1.4;
		&.active {
			background-color: $color-primary;
			box-shadow: 2px 0px 4px -2px $bs-color;
			view {
				color: #fff;
			}
		}
		.day {
			color: $color-shallow;
		}
		.num1 {
			margin: 3px 0;
		}
		.num {
			color: $color-deep;
			font-weight: 700;
		}
	}
</style>

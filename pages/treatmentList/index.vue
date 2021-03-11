<template>
	<view class="coupons-page">
		<div class="coupons" :class="item > 2 ? 'overdue' : ''" v-for="item in [1,2,3,4,5]" :key="item">
			<div class="left">
				<div class="title">桐君堂(环西馆)</div>
				<div class="coupons-name">针灸治疗卡</div>
				<div class="limited-period">有限期: 2021-05-31</div>
			</div>
			<div class="right">
				<div>剩余5次</div>
			</div>
		</div>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	$base-coupons-color: #9f9795;
	.coupons-page {
		padding: 20rpx;
		background-color: #fff;
		.coupons {
			width: 100%;
			display: flex;
			border-radius: 5px;
			background: #ffd9a0;
			box-shadow: 3px 3px 4px -3px #888;
			margin-bottom: 15px;
			&.overdue {
				color: $base-coupons-color;
				background-color: #fff;
				border: 1px solid #eee;
				.right {
					border-color: #ccc;
					color: $base-coupons-color;
				}
			}
			.left {
				padding: 6px 16px;
				flex: 1;
				.title {
					font-size: 14px;
					color: $base-coupons-color;
				}
				.coupons-name {
					font-size: 16px;
					font-weight: 700;
				}
				.limited-period {
					font-size: 13px;
					color: $base-coupons-color;
					margin-top: 6px;
				}
			}
			.right {
				padding: 6px 8px;
				width: 25%;
				text-align: center;
				display: flex;
				align-items: center;
				justify-content: center;
				border-left: 1px dashed #f7c22e;
				position: relative;
				color: #f04c46;
				font-size: 18px;
				font-weight: 700;
				&::after,
				&::before {
					content: '';
					position: absolute;
					width: 15px;
					height: 15px;
					border-radius: 50%;
					left: -8px;
					background: #fff;
				}
				&::after {
					top: -7px;
				}
				&::before {
					bottom: -7px;
				}
			}
		}
	}
	

	
</style>

<template>
	<view class="cus-form-item" :class="{'flex': type === '3'}">
		<view class="label">{{ label }}</view>
		<view class="item">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			label: {
				type: String,
				required: true
			},
			placeholder: {
				type: String,
				default: ''
			},
			type: {
				default: ''
			}
		}
	}
</script>

<style lang="scss">
	.cus-form-item {
		margin-top: 20rpx;
		.item {
			flex: 1;
			padding-left: 20rpx;
			margin-top: 20rpx;
		}
		.label {
			font-size: 30rpx;
			font-weight: 700;
		}
		&.flex {
			display: flex;
			.label {
				width: 120rpx;
			}
			.item {
				margin-top: 0;
			}
		}
	}
</style>

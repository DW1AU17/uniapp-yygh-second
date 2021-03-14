<template>
	<view class="cus-form-item">
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
			}
		}
	}
</script>

<style lang="scss">
	.cus-form-item {
		display: flex;
		margin-bottom: 20rpx;
		.label {
			width: 80px;
			line-height: 1.5;
		}
		.item {
			flex: 1;
			padding-left: 20rpx;
		}
	}
</style>

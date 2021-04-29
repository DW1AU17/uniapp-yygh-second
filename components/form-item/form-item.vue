<template>
	<view class="cus-form-item">
		<view class="cus-title" :style="labelWidth">
			<text>{{ label }}</text>
			<text v-if="require" class="red">*</text>
		</view>
		<slot></slot>
		<slot name="right"></slot>
	</view>
</template>

<script>
	export default {
		props: {
			// 左边文字
			label: {
				required: true,
				default: ''
			},
			width: {
				default: '170rpx'
			},
			// 必填项
			require: {
				default: false
			}
		},
		computed: {
			labelWidth() {
				return `width: ${this.width}`
			}
		}
	}
</script>

<style lang="scss">
	.cus-form-item {
		display: flex;
		align-items: center;
		font-size: 26rpx;
		padding: 0 20rpx;
		line-height: 70rpx;
		color: #444;
		border-bottom: 1px solid #e5e5e5;
		input {
			flex: 1;
		}
		.cus-title {
			width: 170rpx;
		}
	}
</style>

<template>
	<view class="cus-form-item" :class="{'flex': type === '3'}">
		<view class="label">
			<text>{{ label }}</text>
			<text class="red" v-if="notRequire">*</text>
		</view>
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
		},
		computed: {
			unit() {
				if (this.label === '孩子体重') return '(斤)'
				else if (this.label.includes('身高') && this.label.length === 4) return '(厘米)'
				return '' 
			},
			notRequire() {
				return this.label === '孩子骨龄' ? false : true
			}
		}
	}
</script>

<style lang="scss">
	.cus-form-item {
		margin-top: 20rpx;
		font-size: 32rpx;
		.item {
			flex: 1;
			padding-left: 20rpx;
			margin-top: 20rpx;
		}
		.label {
			font-weight: 700;
		}
		.unit {
			width: 160rpx;
			// text-align: center;
			margin-left: 10rpx;
		}
		&.flex {
			display: flex;
			align-items: center;

			.label {
				width: 150rpx;
			}
			.item {
				margin-top: 0;
			}
		}
	}
</style>

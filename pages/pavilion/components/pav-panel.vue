<template>
	<view>
		<view class="pav-panel" v-for="item in data" :key="item.id" @tap="handleClick">
			<view class="img">
				<img :src="item.img">
			</view>
			<view class="text">
				<view class="name fwb">{{ item.sffName }}</view>
				<view class="introduce">地址: {{ item.sffSummary }}</view>
			</view>
		</view>		
	</view>
</template>

<script>
	export default {
		props: {
			data: {
				type: Array
			}
		},
		methods: {
			handleClick() {
				this.$emit('jump', {})
			}
		}
	}
</script>

<style lang="scss">
	/* 馆面板样式css */
	.pav-panel {
		display: flex;
		align-items: center;
		padding: 20rpx 0;
		border-bottom: 1rpx solid $bc-color;
		margin: 0 20rpx;
		.img {
			width: 144rpx;
			height: 108rpx;
			margin-right: 20rpx;
			img {
				border-radius: 6rpx;
				width: 100%;
				height: 100%;
			}
		}
		.text {
			height: 108rpx;
			.name {
				font-size: $fs-30;
				color: $color-deep;
				// line-height: 1;
				margin-bottom: 14rpx;
			}
			.introduce {
				color: $grey-color;
				font-size: $fs-24;
			}
		}
		&:last-child {
			border-bottom: none;
		}
	}	
</style>

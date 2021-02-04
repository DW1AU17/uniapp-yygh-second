<template>
	<view>
		<view 
			class="pav-panel gradient" 
			:class="{'disabled': item.state }"
			v-for="item in list" 
			:key="item.id" 
			@tap="handleClick(item)"
		>
			<view class="img">
				<image :src="item.img" mode="heightFix">
			</view>
			<view class="text">
				<view class="name fwb">
					<image src="/static/ui/tjt.png" mode="">
					<text> · {{ item.sffName }}</text>
				</view>
				<view class="introduce">
					<text>{{ item.sffSummary }}</text>
				</view>
				<view class="introduce">
					<text>{{ item.phone }}</text>
				</view>
			</view>
		</view>		
	</view>
</template>

<script>
	import { mapMutations } from 'vuex'
	export default {
		props: {
			list: {
				type: Array
			}
		},
		methods: {
			...mapMutations(['setPavilion']),
			handleClick(item) {
				if (item.state) {
					this.errorAlert('暂未开放')
				} else {
					this.setPavilion(item)
					this.$emit('jump', item)
				}
			}
		}
	}
</script>

<style lang="scss">
	/* 馆面板样式css */
	.pav-panel {
		display: flex;
		align-items: center;
		padding: 20rpx 30rpx;
		&.disabled {
			.img, .name, .icon {
				opacity: 0.3;
			}
			.introduce {
				color: #999!important;
			}
		}
		.img {
			width: 240rpx;
			height: 150rpx;
			margin-right: 20rpx;
			image {
				border-radius: 12rpx;
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}
		.text {
			flex: 1;
			text-align: center;
			.name {
				font-size: 30rpx;
				color: $s-color;
				// line-height: 1;
				margin-bottom: 10rpx;
				image {
					width: 108rpx;
					height: 34rpx;
					vertical-align: middle;
					margin-right: 10rpx;
				}
			}
			.introduce {
				line-height: 1.5;
				font-size: 24rpx;
				.icon {
					margin-right: 5rpx;
				}
			}
		}
		&:last-child {
			border-bottom: none;
		}
	}	
</style>

<template>
	<view class="video-page">
		<view class="border-box">
			<view class="border-box-inner">
				<scroll-view class="list" :scroll-y="true">
					<view class="item-out-box">					
						<view 
							class="item" 
							v-for="item in list" 
							:key="item"
							@tap="goVideoPage(item)"
							>
							<view class="item-inner">
								<view class="img">
									<image :src="'https://www.zjgoshine.com:9001/video/'+item+'.jpg'" mode="widthFix" lazy-load></image>
								</view>
								<view v-if="!item.includes('桐君堂')" class="text">福到健康到, {{item}}医师送好礼啦！</view>							
								<view v-else class="text">福到健康到, {{item}}送祝福啦！</view>							
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	let list = ['周国汉', '许晓哲', '龙惠珍', '毛小华', '钟良玉', '张跃琴', '黄丽华', '孔繁慧', '李静益', '彭丹', '翟海龙', '杜相宇', '桐君堂', '桐君堂武林馆', '桐君堂环西馆']
	export default {
		data() {
			return {
				list
			}
		},
		onShareAppMessage() {
			return {
				title: '专家送福',
				path: `/pages/videoList/videoList`,
			}
		},
		onShareTimeline() {
			return {
				title: '专家送福',
				path: `/pages/videoList/videoList`,
			}
		},
		methods: {
			goVideoPage(name) {
				uni.navigateTo({
					url: `/pages/video/video?name=${name}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.video-page {
		padding: 20rpx;
		height: calc(100% - 40rpx);
		.border-box {
			height: 100%;
			background-color: #eee;
			.border-box-inner {
				height: 100%;
				scroll-view {
					height: 100%;
				}
				.item-out-box {
					height: 100%;
					overflow-y: auto;
					display: flex;
					flex-wrap: wrap;
					.item {
						width: 50%;
						&:nth-child(2n) {
							.item-inner {
								margin: 20rpx 20rpx 0 10rpx;	
							}
						}
						&:nth-last-child(-n+2) {
							.item-inner {
								margin-bottom: 20rpx;	
							}
						}
						.item-inner {
							margin-bottom: 0;
							border-radius: 10rpx;
							background-color: #fff;
							overflow: hidden;
							margin: 20rpx 10rpx 0 20rpx;
							box-shadow: 0px 0px 6px 0px #ccc;
							.img {
								width: 100%;
								image {
									width: 100%;
									height: auto;
									vertical-align: bottom;
								}
							}
							.text {
								flex: 1;
								line-height: 1.4;
								padding: 15rpx 10rpx;
							}
						}
					}
				}
			}
		}
	}
	
</style>

<template>
	<view class="border-box">
		<view class="single-item border-box-inner gradient" @tap="goSourcePage">
			<view class="pic">
				<!-- <image src="/static/ui/0007.jpg" lazy-load/> -->
				<image :src="'https://www.zjgoshine.com:9001/resource/'+source.img+'.jpg'" @error="handleError" mode="aspectFill" lazy-load/>
			</view>
			<view class="right">
				<view>
					<text class="doc-name">{{source.name}}</text>
					<text class="post">{{source.title}}</text>
				</view>
				<view class="introduce">
					<text class="text-line2">{{source.introduce}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		props: {
			source: {
				type: Object,
				default: {}
			},
			orgCode: {
				required: true
			},
			hospitalId: {
				required: true
			}
		},
		computed: {
			// ...mapGetters(['orgCode', 'hospitalId'])
		},
		methods: {
			goSourcePage() {
				let url = `?orgCode=${this.orgCode}&hospitalId=${this.hospitalId}&id=${this.source.id}&name=${this.source.name}`
				uni.navigateTo({
					url: `/pages/source/source${url}`
					// success(res) {
					// 	res.eventChannel.emit('doctorInfoFromDocPanel', { data: that.source })
					// }
				})
			},
			handleError(e) {
				console.log(123)
				this.$emit('editImgUrl', { url: '0000', name: this.source.name, id: this.source.id })
			}
		}
	}
</script>

<style lang="scss">
	.border-box {
		margin-bottom: 20rpx;
		.single-item {
			border-bottom: 1px solid $bc-color;
			display: flex;
			padding: 30rpx 20px 20px 20px;
			background-color: #fff;
			// align-items: center;
			.pic {
				width: 130rpx;
				height: 130rpx;
				line-height: 100rpx;
				text-align: center;
				margin-right: 20rpx;
				border: 1px solid $s-color;
				border-radius: 50%;
				overflow: hidden;
				margin-top: 10rpx;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.right {
				flex: 1;
				padding: 10rpx;
				.doc-name {
					font-size: 34rpx;
					margin-right: 24rpx;
					font-weight: 700;
					color: #000;
				}
				.post {
					font-size: 26rpx;
					font-weight: 700;
					color: #666;
				}
				.introduce {
					color: #999;
					margin-top: 10rpx;
					line-height: 1.5;
					font-size: 24rpx;
					text {
						line-height: 1.3;
					}
				}
			}
			&:last-child {
				border-bottom: none;
			}
		}
	}
</style>

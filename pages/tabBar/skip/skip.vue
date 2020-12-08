<template>
	<view class="skip-page">
		<!-- 轮播图 -->
		<view class="swiper-list">
			<view class="swiper-item">
				
			</view>
		</view>
		<!-- 操作栏 -->
		<view class="operate">
			<view @tap="goIndexPage">
				<img src="/static/yygh.png" alt="">
				<view class="text">预约挂号</view>
			</view>
			<view>
				<img src="/static/drgh.png" alt="">
				<view class="text">当日挂号</view>
			</view>
			<view>
				<img src="/static/jycx.png" alt="">
				<view class="text">煎药查询</view>
			</view>
			<view>
				<img src="/static/kfrx.png" alt="">
				<view class="text">报告单查询</view>
			</view>
			<view>
				<img src="/static/yygh.png" alt="">
				<view class="text">收费明细查询</view>
			</view>
			<view>
				<img src="/static/drgh.png" alt="">
				<view class="text">健康养生</view>
			</view>
			<view>
				<img src="/static/jycx.png" alt="">
				<view class="text">医馆介绍</view>
			</view>
			<view>
				<img src="/static/kfrx.png" alt="">
				<view class="text">客服热线</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {
			goIndexPage() {
				uni.navigateTo({
					url: '/pages/index/index'
				})
			}
		}
	}
</script>

<style lang="scss">
	.skip-page {
		background-color: #eee;
		.swiper-list {
			height: 150px;
			// background-image: linear-gradient(141deg, #8de8e8 0%, #1fc8db 51%, #2cb5e8 81%);
		}
		.operate {
			padding: 10px 0;
			display: flex;	
			flex-wrap: wrap;
			width: 100%;
			background-color: #fff;
			>view {
				width: 25%;
				text-align: center;
				img {
					width: 50px;
					height: 50px;
				}
				.text {
					font-size: $fs-26;
					color: $title-color;
				}
			}
		}
	}
</style>

<template>
	<view class="news-page">
		<view class="news">
			<view class="content">
				<view class="item" v-for="item in news" :key="item.id" @tap="goNewsPage(item.id)">
					<view class="left">
						<image :src="'/static/ui/growth/news'+item.id+'.jpg'" mode="aspectFill"></image>
					</view>
					<view class="right">
						<!-- <view class="fs26 text-line">{{item.title}}</view> -->
						<view class="fs28 text-line2">{{item.title}}</view>
					</view>
				</view>									
			</view>
		</view>		
	</view>
</template>

<script>
	let news = [
		{ id: 1, title: '成长没有后悔药！错过两个关键期，打10多万的生长激素都没用'},
		{ id: 2, title: '送义诊号！长高的四大『坑』，90%的家长都不知道……'},
		{ id: 3, title: '“2个多月长高了3厘米！”用了他的生长组合技，这位7岁男孩的爸爸乐开了花！'},
		{ id: 4, title: '这些坏习惯，正成为孩子矮小和性早熟的帮凶！对付它，何赛萍教授团队有一个耳穴贴'},
		{ id: 5, title: '9岁娃矮了同学半个头，一年后却窜高6.5厘米！孩子发育好不好？看看这张生长曲线图'},
		{ id: 6, title: '初潮后头两年很关键，个子还能窜一窜！推荐一套助长操，助力孩子长高高'},
		{ id: 7, title: '最新小学生体育测试达标标准出台！你家娃儿达标了么？'},
	]
	export default {
		data() {
			return {
				news
			}
		},
		methods: {
			goNewsPage(index) {
				uni.navigateTo({ 
					url: `/pages/news/news?index=${index-1}&type=growth`
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.news-page {
		height: 100%;
		overflow: hidden;
		.news {
			margin: 30rpx;
			max-height: calc(100% - 60rpx);
			box-sizing: border-box;
			border-radius: 28rpx;
			background-color: #fff;
			box-shadow: 1px 0px 3px 0px #ccc;
			overflow-y: auto;
			.content {
				.item {
					display: flex;
					margin: 0 30rpx;
					align-items: center;
					height: 180rpx;
					border-bottom: 1rpx solid #eee;
					&:last-child {
						border-bottom: none;
					}
					.left {
						width: 140rpx;
						height: 130rpx;
						overflow: hidden;
						image {
							width: 100%;
							height: 100%;
							border-radius: 10rpx;
						}
					}
					.right {
						flex: 1;
						line-height: 1.4;
						margin-left: 24rpx;
					}
				}				
			}
		}
	}
</style>

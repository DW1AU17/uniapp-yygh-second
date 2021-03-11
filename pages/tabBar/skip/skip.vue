<template>
	<view class="skip-page">
		<!-- 轮播图 -->
		<view class="swiper-list">
			<view class="swiper-item">
				<image src="/static/ui/swiper3.png" mode="widthFix">
			</view>
		</view>
		<!-- 操作栏 -->
		<view class="operate">
			<view @tap="goPage('pavilion')">
				<image src="/static/ui/gh.png" mode="widthFix">
				<view class="text">预约挂号</view>
			</view>
			<view @tap="goPage('about')">
				<image src="/static/ui/yg.png" mode="widthFix">
				<view class="text">关于我们</view>
			</view>
			<view v-if="inActive" @tap="goPage('videoList')">
				<image class="rotate" src="/static/ui/fu.png" mode="widthFix">
				<view class="text">专家送福</view>
			</view>
			<view v-else @tap="showError">
				<image src="/static/ui/zl.png" mode="widthFix">
				<view class="text">针灸诊疗卡</view>
			</view>
			<view @tap="goOtherPrograme">
				<image src="/static/ui/jhfj.png" mode="widthFix">
				<view class="text">久和福记</view>
			</view>
		</view>
		<!-- 新闻栏 -->
		<view class="news">
			<view class="title">新闻资讯</view>
			<view class="item" v-for="item in news" :key="item.id" @tap="goNewsPage(item.id)">
				<view class="left">
					<image :src="'/static/ui/news'+item.id+'.jpg'" mode="aspectFill"></image>
				</view>
				<view class="right">
					<view class="fs26 text-line">{{item.title}}</view>
					<view class="fs24 text-line2 fc999">{{item.content}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	let news = [
		{ id: 1, img: '', title: '中医学博士后每年都吃TA！有人吃了流鼻血，专家说：“好东西得吃对！”', content: '杭州的天气可真怪！明明上周还是零下，出不出门都得裹紧大棉袄，这周就直线飙到了20度，听说周末又要降到几度……'},
		{ id: 2, img: '', title: '88岁的奶奶一晚起夜7次，医生说问题出在这…', content: '人到晚年，睡眠也变得不安稳起来，睡眠时间短、难入眠、易早醒、夜梦多、频繁起夜如厕……夜里睡得不好，白天自然打不起精神'},
		{ id: 3, img: '', title: '秋膘冬补那些事', content: '秋未远去冬已来，秋膘冬补又一年。现今社会，随着人们生活水平大幅度提高，温饱问题已经是过去式。杭州的大街小巷里，人们开始谈论起养生的话题，贴秋膘和冬令进补就成了热门话题'},
		{ id: 4, img: '', title: '得了TA怀不上孩子？关于多囊，你想知道的都在这里！', content: '大自然里存在着隐秘而必然的联系，人体亦如是。从医三十年，临案无数，桐君堂国医馆妇科专家潘秀群主任医师，对人体的“内外”联系，早已了熟于心。临诊的她，就像一面“照妖镜”，能将潜藏着的“小恶魔”揪出来。'},
		{ id: 5, img: '', title: '这个1000多年前的杭州“市长”，是这么养生的…', content: '离任时，他给杭州留下了一湖碧水、六眼清井、百首诗词。回首时，他叹：“日出江花红胜火，春来江水绿如蓝。能不忆江南？江南忆，最忆是杭州。”'},
	]
	// 活动日期
	const activeDateList = ['2021-02-07', '2021-02-08', '2021-02-09', '2021-02-10', '2021-02-11', '2021-02-12', '2021-02-13', '2021-02-14', '2021-02-15', '2021-02-16', '2021-02-17']
	
	import { mapState, mapMutations } from "vuex"
	import customMap from '@/components/map/map'
	import { getDates } from '@/common/utils/index'
	export default {
		components: {
			customMap
		},
		data() {
			return {
				news,
				markers: [{
					latitude: '',
					longitude: ''
				}],
				hidden: true,
				inActive: false,
				day: ''
			}
		},
		created() {
			let today = getDates(1)[0].searchDate
			this.day = today
			this.inActive = activeDateList.includes(today)
		},
		/**
		 * 分享页面
		 */
		onShareAppMessage() {
			return {
				title: '桐君堂国医馆-预约挂号',
				path: `/pages/tabBar/skip/skip`,
				imageUrl: '/static/logo.jpg'
			}
		},
		computed: {
			...mapState(['hasLogin'])
		},
		methods: {
			...mapMutations(['setWechatUserInfo', 'setPavilion']),
			/**
			 * 获取用户信息
			 */
			// mpGetUserInfo(result) {
			// 	if (result.detail.errMsg !== 'getUserInfo:ok') { 
			// 		this.errorAlert('取消操作')
			// 	} else {
			// 		// 保存小程序授权用户信息到store
			// 		this.setWechatUserInfo(result.detail.userInfo)
			// 		// 跳转到手机号登录页
			// 		uni.navigateTo({
			// 			url: '/pages/auth/auth?type=skip',
			// 			success(res) {
			// 				res.eventChannel.emit('loginDataFromMine', { data: result.detail })
			// 			}
			// 		})
			// 	}
			// },
			// callPhone(phoneNumber) {
			// 	uni.makePhoneCall({ phoneNumber })
			// },
			goPage(type) {
				if (type === 'pavilion' && activeDateList.includes(this.day)) {
					this.errorAlert('系统升级维护中')
				} else {
					uni.navigateTo({ url: `/pages/${type}/${type}` })
				}
			},
			goNewsPage(index) {
				uni.navigateTo({ 
					url: `/pages/news/news?index=${index-1}`
				})
			},
			goOtherPrograme() {
				// #ifdef H5
				this.errorAlert('H5端暂未开放')
				// #endif
				// #ifdef MP-WEIXIN
				uni.navigateToMiniProgram({
				    appId: 'wx692f2eeb703106f0',
					path: ''
				})
				// #endif
			},
			showError() {
				this.errorAlert('暂未开放')
			},
		}
	}
</script>

<style lang="scss">
	.skip-page {
		// #ifdef H5
		overflow: auto;
		// #endif
		.swiper-list {
			// #ifdef MP-WEIXIN
			padding-top: 45px;
			// #endif
			background-color: #fff;
			.swiper-item {
				width: 100%;
				image {
					width: 100%;
					vertical-align: top;
				}
			}
		}
		.operate {
			padding: 26rpx 0;
			display: flex;	
			flex-wrap: wrap;
			position: relative;
			margin: 30rpx;
			border-radius: 28rpx;
			background: #fff;
			margin-top: -34rpx;
			box-shadow: 1px 0px 3px 0px #ccc;
			// border: 1px solid $s-color;
			>view, >button {
				width: 25%;
				text-align: center;
				background: transparent;
				line-height: 1.3;
				image {
					width: 80rpx;
					height: 80rpx;
					&.rotate {
						animation: rotate 1s infinite forwards;
					}
				
				}
				.text {
					font-size: 24rpx;
					color: #333;
				}
			}
			>button:after {
				border: none;
			}
		}
		.news {
			margin: 0 30rpx 30rpx 30rpx;
			border-radius: 28rpx;
			background-color: #fff;
			box-shadow: 1px 0px 3px 0px #ccc;

			// border: 1px solid $s-color;
			.title {
				padding-left: 16px;
				height: 30px;
				line-height: 42px;
				font-size: 15px;
				position: relative;
				&:after {
					content: '';
					height: 3px;
					width: 36px;
					background: #bb8d4c;
					position: absolute;
					top: 32px;
					left: 27px;
					border-radius: 3px;
				}
			}
				
			.item {
				display: flex;
				padding: 0 30rpx;
				align-items: center;
				height: 180rpx;
				.left {
					width: 140rpx;
					height: 130rpx;
					margin-top: 20rpx;
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
					>view:nth-child(1) {
						margin-bottom: 18rpx;
					}
				}
			}
		}
	}
	@keyframes rotate {
		0% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.1);
		}
		100% {
			transform: scale(1);
		}
	}
</style>

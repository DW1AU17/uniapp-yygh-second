<template>
	<view class="mine-page">
		<view class="mine-header">
			<view class="head-portrait">
				<!-- #ifdef MP-WEIXIN -->
				<image v-if="wechatUserInfo.avatarUrl" class="wechat" :src="wechatUserInfo.avatarUrl" mode="">
				<button v-else class="head-pic" open-type="getUserInfo" @getuserinfo="mpGetUserInfo"></button>
				<!-- #endif -->
				<!-- #ifdef H5 -->
				<image src="/static/ui/head.png" mode="">
				<!-- #endif -->
				<!-- <image src="/static/ui/head.png" mode=""> -->
			</view>
			<!-- #ifdef MP-WEIXIN -->
				<button v-if="!hasLogin" class="login" open-type="getUserInfo" @getuserinfo="mpGetUserInfo">点击登录</button>
				<view class="fs32 name" v-else>{{patientInfo.username || wechatUserInfo.nickName}}</view>
			<!-- #endif -->
			<!-- #ifdef H5 -->
				<view v-if="!hasLogin" class="login" @tap="goNextPage('login')">点击登录</view>
				<view class="fs32 name" v-else>{{patientInfo.username}}</view>
			<!-- #endif -->
		</view>
		<view class="btn-box border-box">
			<view class="border-box-inner">
				<view v-for="item in menu" :key="item.id" class="gradient" @tap="goNextPage(item.page)">
					<text>{{item.name}}</text>
					<image src="/static/ui/arrow-right.png">
				</view>
				<!-- <view class="login-out" @tap="loginOut" hidden>
					<text>退出当前登录</text>
				</view> -->	
				<!-- #ifdef MP-WEIXIN -->
					<button v-if="!hasLogin" class="logout" open-type="getUserInfo" @getuserinfo="mpGetUserInfo"></button>
				<!-- #endif -->
				<!-- #ifdef H5 -->
					<view v-if="!hasLogin" @tap="goNextPage('login')" class="logout"></view>
				<!-- #endif -->
			</view>		
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	import { wechatLogin } from '@/common/api/wechat'
	import { judgeSessionKeyExpired, getOpenIdAndSessionKey } from '@/common/utils/wechat'
	let pageMap = new Map([
		['login', '/pages/login/login'],
		['regRecord', '/pages/registerRecord/index'],
		['patManage', '/pages/patientManage/index?type=mine'],
		['invoice', '/pages/invoice/index'],
	])
	let menu = [
		{ id: 1, name: '预约记录', page: 'regRecord' },
		{ id: 2, name: '就诊人管理', page: 'patManage' },
		{ id: 3, name: '申请开票', page: 'invoice' },
	]
	export default {
		data() {
			return {
				result: {},
				source: 'wechat', // 来源
				menu,
			}
		},
		computed: {
			...mapState(['hasLogin', 'patientInfo', 'wechatUserInfo'])
		},
		methods: {
			...mapMutations(['logout', 'setWeChatToken', 'setWechatUserInfo']),
			/**
			 * 获取用户信息
			 */
			mpGetUserInfo(result) {
				if (result.detail.errMsg !== 'getUserInfo:ok') { 
					this.errorAlert('获取用户信息失败')
				} else {
					this.result = result.detail
					// 保存小程序授权用户信息到store
					this.setWechatUserInfo(result.detail.userInfo)
					// 执行登录
					if (!this.patientInfo.username) this.performLogin()
				}
			},
			/**
			 * 执行登录 (这边执行登录的都是未使用微信登录过的新用户)
			 */
			async performLogin() {
				let that = this
				// 判断sessionKey是否过期
				let res = await judgeSessionKeyExpired()
				if (res.code === 1) {
					// 已过期, 重新调uni.login
					let { data: { openId, sessionKey } } = await getOpenIdAndSessionKey()
					let obj = { openId, sessionKey }
					// 存到store中, 设置小程序token
					this.setWeChatToken(obj)
				}
				let { phoneNumber, idCard, id} = this.patientInfo
				if (phoneNumber && !idCard) {
					// 完善信息
					uni.navigateTo({
						url: `/pages/complateInfo/index?p=${phoneNumber}&id=${id}&type=mine`
					})
				} else {
					// 跳转到手机号登录页
					uni.navigateTo({
						url: '/pages/auth/auth?type=mine',
						success(res) {
							res.eventChannel.emit('loginDataFromMine', { data: that.result })
						}
					})
				}
			},
			/**
			 * 退出登录
			 */
			loginOut() {
				let that = this
				uni.showModal({
					title: '确定要退出当前登录?',
					async success(res) {
						if (res.confirm) {
							that.logout()
						}
					}
				})
			},
			goNextPage(type) {
				uni.navigateTo({
					url: pageMap.get(type) || '/pages/skip/skip'
				})
			}
		}
	}
</script>

<style lang="scss">
	$base-color: #bf9356;
	.mine-page {
		padding: 0 30rpx;
		overflow: hidden;
		.mine-header {
			// #ifdef H5
			margin-top: 30px;
			// #endif
			// #ifdef MP-WEIXIN
			margin-top: 75px;
			// #endif
			display: flex;
			align-items: center;
			padding: 26rpx 14rpx;
			.head-portrait {
				image, .head-pic {
					width: 69rpx;
					height: 77rpx;
					margin-right: 14rpx;
					transform: scale(1.3);
				}
				image {
					&.wechat {
						width: 77rpx;
						border: 1px solid $s-color;
					}
				}
				.head-pic {
					background: url('/static/ui/head.png') no-repeat;
					background-size: 100%;
					&:after {
						border: none;
					}
				}
			}
			.login {
				color: $base-color;
				border: 1px solid $base-color;
				border-radius: 14rpx;
				padding: 4rpx 12rpx;
				line-height: 1.2;
				font-size: 24rpx;
				margin: -20rpx 0 0 20rpx;
				background: transparent;
				&.name {
					
				}
			}
			.name {
				margin: -8rpx 0 0 18rpx;
			}
		}
		.btn-box {
			position: relative;
			.border-box-inner {
				>view {
					font-size: 32rpx;
					color: #000;
					padding: 0 46rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					line-height: 100rpx;
					image {
						width: 13rpx;
						height: 22rpx;
					}
					&:last-child {
						padding-bottom: 0;
					}
				}
				.logout {
					position: absolute;
					top: 0;
					right: 0;
					left: 0;
					bottom: 0;
					background-color: transparent;
					z-index: 9;
				}
			}
		}
	}
</style>

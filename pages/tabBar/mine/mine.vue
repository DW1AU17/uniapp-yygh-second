<template>
	<view class="mine-page">
		<view class="mine-header">
			<view class="head-portrait">
				<img src="@/static/tab/mine.png">
			</view>
			<view v-if="hasLogin">{{patientInfo.username}}</view>
			<view class="login" v-else @tap="goLoginPage">登录/注册</view>
		</view>
		<view class="btn-box">
			<view class="my-bookings" @tap="goRegRecordPage">
				<img src="@/static/record.png">
				<text>预约记录</text>
			</view>
			<view class="patient-manage" @tap="goPatManagePage">
				<img src="@/static/manage.png">
				<text>就诊人管理</text> 
			</view>			
			<view class="login-out" @tap="loginOut">
				<img src="@/static/loginout.png">
				<text>退出当前登录</text>
			</view>						
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	export default {
		data() {
			return {
				patInfo: {},
				isLogin: false
			}
		},
		onShow() {
			// 没登录先登录
			// if (!this.hasLogin) this.goLoginPage()
		},
		computed: {
			...mapState(['hasLogin', 'patientInfo'])
		},
		methods: {
			...mapMutations(['logout']),
			loginOut() {
				this.logout()
			},
			goLoginPage() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			},
			goRegRecordPage() {
				uni.navigateTo({
					url: '/pages/registerRecord/index'
				})
			},
			goPatManagePage() {
				uni.navigateTo({
					url: '/pages/patientManage/index?type=mine'
				})
			}
		}
	}
</script>

<style lang="scss">
	@mixin bgcfff {
		background-color: #fff;
	}
	.mine-page {
		background-color: $bgc-base;
		font-size: 18px;
		.mine-header {
			display: flex;
			align-items: center;
			padding: 10px;
			@include bgcfff;
			.head-portrait {
				border: 2px solid #18c2d4;
				width: 66px;
				height: 66px;
				border-radius: 10px;
				text-align: center;
				line-height: 60px;
				margin-right: 10px;
				color: #fff;
				img {
					width: 70%;
					height: 78%;
				}
			}
		}
		.btn-box {
			padding: 0px 10px;
			@include bgcfff;
			>view {
				border-bottom: 1px solid #eee;
				font-size: 16px;
				padding: 10px 0;
				img {
					height: 22px;
					width: 22px;
					margin-right: 10px;
					vertical-align: text-top;
				}
				text {
					color: $title-color;
				}
			}
			>view:last-child {
				border-bottom: none;
			}
		}
	}
</style>

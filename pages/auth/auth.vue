<template>
	<view class="auth-page">
		<view class="img">
			<image src="@/static/ui/logo.png" mode="aspectFit" />
		</view>
		<button type="primary" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
			<image src="@/static/ui/wechat.png"/>
			微信手机号授权登录
		</button>
		<view class="fc666 fs24 title">· 绑定手机号后才能正常享受预约服务</view>
	</view>
</template>

<script>
	import { mapMutations, mapState } from 'vuex'
	import { wechatHandleUserInfo } from '@/common/api/wechat'
	import { getPatientList } from '@/common/api/patient'
	import { judgeSessionKeyExpired, getOpenIdAndSessionKey } from "@/common/utils/wechat"
	export default {
		data() {
			return {
				sourceData: {},
				type: '',
				page: '', // 跳转的页面路径
				skip: '', // 是否跳过完善信息
			}
		},
		onLoad({ type, page, skip }) {
			this.type = type
			this.page = page
			this.skip = skip
			const eventChannel = this.getOpenerEventChannel()
			eventChannel.on('loginDataFromMine', (data) => {
				let { rawData, signature } = data.data
				this.sourceData = { userInfo: '123', rawData, signature }
			})
		},
		computed: {
			...mapState(['wechatToken'])
		},
		methods: {
			...mapMutations(['login', 'setWeChatToken', 'setPatientInfo', 'setPatientList']),
			/**
			 * 获取手机号
			 */
			async getPhoneNumber(e) {
				this.showLoging()
				await this.checkSessionKey()
				let { detail: { encryptedData, iv, errMsg } } = e
				if (errMsg === 'getPhoneNumber:ok') {
					let { openId, sessionKey } = this.wechatToken
					let params = { ...this.sourceData, encryptedData, iv, openId, sessionKey }
					// 处理小程序授权用户信息
					let res = await wechatHandleUserInfo(params)
					if (res.code === 0) {
						let { needRegisterFlag, pubUser } = res.data
						if (needRegisterFlag === '0') {							
							// 活动页不需要完善个人信息
							if (this.skip) { 
								this.setPatientInfo(pubUser)
								uni.navigateBack()
							} else {
								if (pubUser) {
									let { username, idCard, phoneNumber, id } = pubUser
									// 存到store中
									this.setPatientInfo(pubUser)
									if (username && idCard) {
										// 否 登录成功 (保存用户信息, token携带在其中)
										this.login()
										/* 获取/设置就诊人列表 */
										let patRes = await getPatientList({ userId: pubUser.id })
										this.setPatientList(patRes.data)
										this.successAlert('登录成功')
										// 登录成功
										if (this.type) {
											uni.switchTab({
												url: `/pages/tabBar/${this.type}/${this.type}`
											})
										} else {
											uni.navigateBack()
										}
									} else {
										// 完善信息
										uni.redirectTo({
											url: `/pages/complateInfo/index?p=${phoneNumber}&id=${id}&type=${this.type}`
										})
									}
								} else {
									// 完善信息
									uni.redirectTo({
										url: `/pages/complateInfo/index?p=${phoneNumber}&id=${id}&type=${this.type}`
									})
								}
							}
						} else {
							this.errorAlert(needRegisterFlag)
						}
					} else {
						this.errorAlert(res.message)
					}
				} else {
					this.errorAlert('取消操作')
				}
				this.hideLoading()
			},
			/**
			 * 判断sessionKey是否已经过期
			 */
			async checkSessionKey() {
				// 获取 session 状态
				let res = await judgeSessionKeyExpired()
				console.log(res)
				if (res.code === 1 || Object.keys(this.wechatToken).length === 0) {
					// 已过期
					this.weChatLogin()
				}
			},
			async weChatLogin() {
				let res = await getOpenIdAndSessionKey()
				if (res.code === 0) {
					let { openId, sessionKey } = res.data
					let obj = { openId, sessionKey }
					// 存到store中, 设置小程序token
					this.setWeChatToken(obj)
				}
			}
		}
	}
</script>

<style lang="scss">
	.auth-page {
		text-align: center;
		padding: 10px;
		.img {
			margin-top: 190rpx;
			margin-bottom: 178rpx;
			image {
				width: 343rpx;
				height: 333rpx;
			}
		}
		.title {
			margin: 10px 0;
		}
		button {
			font-size: 28rpx;
			width: 464rpx;
			height: 60rpx;
			line-height: 60rpx;
			background-color: #bb8d4c;
			border-radius: 30rpx;
			image {
				width: 44rpx;
				height: 36rpx;
				vertical-align: sub;
				margin-right: 18rpx;
			}
			&.button-hover {
				background-color: #bb8d4c;
			}
		}
	}
</style>

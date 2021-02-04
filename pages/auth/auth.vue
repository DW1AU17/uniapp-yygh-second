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
	export default {
		data() {
			return {
				sourceData: {},
				type: ''
			}
		},
		onLoad({ type }) {
			this.type = type
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
			...mapMutations(['login', 'setPatientInfo', 'setPatientList']),
			/**
			 * 获取手机号
			 */
			async getPhoneNumber(e) {
				console.log(e)
				let { detail: { encryptedData, iv, errMsg } } = e
				if (errMsg === 'getPhoneNumber:ok') {
					let { openId, sessionKey } = this.wechatToken
					let params = { ...this.sourceData, encryptedData, iv, openId, sessionKey }
					// 处理小程序授权用户信息
					let res = await wechatHandleUserInfo(params)
					if (res.code === 0) {
						let { needRegisterFlag, pubUser } = res.data
						if (needRegisterFlag === '0') {
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
									uni.switchTab({
										url: `/pages/tabBar/${this.type}/${this.type}`
									})
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
					}
				} else {
					this.errorAlert('取消操作')
				}
			},
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

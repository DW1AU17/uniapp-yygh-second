<script>
	import {
		judgeSessionKeyExpired,
		getOpenIdAndSessionKey
	} from "@/common/utils/wechat"
	import {
		mapState,
		mapMutations
	} from "vuex"
	import {
		getPatientList
	} from '@/common/api/patient'
	export default {
		onLaunch: async function() {
			// #ifdef MP-WEIXIN
				// 调用微信登录
				await this.checkSessionKey()
				// 判断小程序是否有更新
				this.checkUpdateMessage()
			// #endif
			
			// uni.connectSocket({
			// 	url: "ws://192.168.1.190:8085/app/api/websocket/%7Buid%7D",
			// 	success(res) {
			// 		console.log(res)
			// 	},
			// 	fail(err) {
			// 		console.log(err)
			// 	}
			// })
			
			// uni.onSocketMessage((res) => {
			// 	console.log('新消息', res)
			// })
			
		},
		onShow: async function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
			uni.removeStorageSync('indexPageChecked')
			uni.removeStorageSync('checkSession')
		},
		computed: {
			...mapState(['wechatToken'])
		},
		methods: {
			...mapMutations(['setWeChatToken', 'login', 'setPatientList', 'setPatientInfo']),
			/**
			 * 判断sessionKey是否已经过期
			 */
			async checkSessionKey() {
				// 获取 session 状态
				let res = await judgeSessionKeyExpired()
				if (res.code === 1 || Object.keys(this.wechatToken).length === 0) {
					// 已过期
					this.weChatLogin()
				}
			},
			/**
			 * 小程序登录
			 */
			async weChatLogin() {
				this.showLoging()
				let res = await getOpenIdAndSessionKey()
				if (res.code === 0) {
					let {
						openId,
						sessionKey,
						needRegisterFlag,
						pubUser
					} = res.data
					let obj = {
						openId,
						sessionKey
					}
					// 存到store中, 设置小程序token
					this.setWeChatToken(obj)

					if (needRegisterFlag === '0' && pubUser) {
						// 存到store中
						this.setPatientInfo(pubUser)
						let {
							username,
							idCard
						} = pubUser
						if (username && idCard) {
							// 老用户 -> 登录成功 -> 保存用户信息(token携带在其中)
							this.login()
							// 获取/设置就诊人列表
							let patRes = await getPatientList({
								userId: pubUser.id
							})
							this.setPatientList(patRes.data)
						}
					} else {
						// 新用户, 不处理 (需要手动点击授权)
					}
				}
				uni.hideLoading()
			},
			/**
			 * 检测小程序更新
			 */
			checkUpdateMessage() {
				const updateManager = uni.getUpdateManager()
				updateManager.onCheckForUpdate(function(res) {
					// 请求完新版本信息的回调
					if (res.hasUpdate) next()
				})
				function next() {
					updateManager.onUpdateReady(function() {
						// 新版本下载成功的回调
						uni.showModal({
							title: '更新提示',
							content: '新版本已经准备好，是否马上重启小程序？',
							success: function(res) {
								if (res.confirm) {
									// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
									updateManager.applyUpdate()
								}
							}
						})
					})
					updateManager.onUpdateFailed(function() {
						// 新版本下载失败的回调
						console.log('失败')
					})
				}
			}
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "@/common/common.css";

	page {
		background-color: #F4F5F6;
		height: 100%;
		font-size: 28rpx;
		line-height: 1.8;
	}
</style>

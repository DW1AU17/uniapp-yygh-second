<script>
	import { judgeSessionKeyExpired, getOpenIdAndSessionKey } from "@/common/utils/wechat"
	import { mapState, mapMutations } from "vuex"
	import { getPatientList } from '@/common/api/patient'
	export default {
		onLaunch: function() {
			// #ifdef MP-WEIXIN
				// 调用微信登录
				if (!uni.getStorageSync('checkSession')) {
					this.checkSessionKey()
				}
			// #endif
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
				// 设置
				uni.setStorageSync('checkSession', true)
				
				// 获取 session 状态
				let res = await judgeSessionKeyExpired()
				console.log(res)
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
					let { openId, sessionKey, needRegisterFlag, pubUser } = res.data
					let obj = { openId, sessionKey }
					// 存到store中, 设置小程序token
					this.setWeChatToken(obj)
					
					if (needRegisterFlag === '0' && pubUser) {
						// 存到store中
						this.setPatientInfo(pubUser)
						let { username, idCard } = pubUser
						if (username && idCard) {
							// 老用户 -> 登录成功 -> 保存用户信息(token携带在其中)
							this.login()
							// 获取/设置就诊人列表
							let patRes = await getPatientList({ userId: pubUser.id })
							this.setPatientList(patRes.data)
						}
					} else {
						// 新用户, 不处理 (需要手动点击授权)
					}
				}
				uni.hideLoading()
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

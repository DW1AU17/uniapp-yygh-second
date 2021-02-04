import { showLoging } from './prompt.js'
import { wechatLogin } from '@/common/api/wechat'
/**
 * 判断session_key是否过期
 */
export function judgeSessionKeyExpired() {
	showLoging()
	return new Promise((resolve) => {
		uni.checkSession({
		  success () {
		    //session_key 未过期，并且在本生命周期一直有效
			uni.hideLoading()
			resolve({ code: 0, msg: '未过期' })
		  },
		  fail (e) {
		    // session_key 已经失效，需要重新获取sessionKey
			uni.hideLoading()
		    resolve({ code: 1, msg: '已过期' })
		  }
		})
	})
}

/**
 * 获取openId和sessionKey
 */
export function getOpenIdAndSessionKey() {
	return new Promise((resolve) => {
		uni.login({
			provider: 'weixin',
			success: async res => {
				// 获取 openId 和 sessionKey
				let data = await wechatLogin({ jsCode: res.code })
				resolve(data)
			}
		})
	})
}
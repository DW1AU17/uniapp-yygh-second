import jweixin from 'jweixin-module'
import axios from './request'

export default {
	// 判断是否在微信中
	isWechat() {
		let ua = window.navigator.userAgent.toLowerCase()
		if(ua.match(/micromessenger/i) == 'micromessenger') {  
			return true  
		} else {  
			return false
		}  
	},
	// 初始化 sdk 配置
	async initJsSdk(callback, url) {
		// 服务端获取签字
		let res = await axios('', { url })
		if (res.data.code === 0) {
			let { appId, timestamp, nonceStr, signature } = res.data
			jweixin.config({
				debug: false, // 测试时, 将debug设置为true, 可看到日志信息
				appId,
				timestamp,
				nonceStr,
				signature,
				jsApiList: [
					'checkJsApi',
					'onMenuShareTimeLine',
					'onMenuShareAppMessage'
				]
			})
			callback && callback()
		}
	},
	// 在需要分享的页面中调用
	share(data, url) {
		let link = url || window.location.href
		if (!this.isWechat()) return
		
		// 每次都需要重新初始化配置, 才可以进行分享
		this.initJsSdk(function(signData) {
			let { site_name, site_description, site_logo } = signData
			jweixin.ready(function() {
				let shareData = {
					title: data && data.title ? data.title : site_name,
					desc: data && data.desc ? data.desc : site_description,
					imgUrl: data && data.img ? data.img : site_logo, 
					link,
					success() {
						// 分享成功的回调
					},
					cancel(e) {
						
					}
				}
				 //分享给朋友接口  
				 jweixin.onMenuShareAppMessage(shareData)
				 //分享到朋友圈接口  
				 jweixin.onMenuShareTimeline(shareData)
			})
		}, url)
	}
}
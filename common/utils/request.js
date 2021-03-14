import { errorAlert } from './prompt.js'
import store from '@/store/index'
// import { getUrlParam } from './index.js'

// 三种情况
/**
 * 1. 地址
 * 2. 地址，对象
 * 3. 对象
 * */
// 导出方法
export default function axios(url, data = {}, prefix = 'app/register/') {
	// 公共路径部分
	// if (process.env.NODE_ENV === 'development') {
	//     console.log('开发环境')
	// } else {
	//     console.log('生产环境')
	// }
	
	// const BASE_URl = 'https://www.zjgoshine.com:9001/' + prefix;
	// const BASE_URl = 'https://www.zjgoshine.com:9001/' + prefix;
	const BASE_URl = 'http://192.168.1.190:8085/' + prefix;
	let white = ['app/wechat', 'app/login']
	if (!prefix.includes('app/login') && !data.length) {
		let { orgCode, id: hospitalId } = store.state.pavilion
		data = {
			...data,
			orgCode,
			hospitalId
		}
	}
	let method = "post"
	if (data.length) {
		method = "post"
	} else if (Object.keys(data).length === 0) {
		method = "get"
	}
	// 非登录页添加请求头
	let needToken = BASE_URl.includes('app/login')
	let header = !needToken ? getHeaderInfo(BASE_URl) : {}
	
	// 返回一个小程序的请求方式  （wx.request）
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URl + url,
			header,
			method,
			data,
			success(res) {
				let { code, message } = res.data
				// 异常提示
				errorHandle(code, message)
				resolve(res.data)
			},
			fail(err) {
				// errorAlert('请先登录')
				// uni.reLaunch({
				// 	url: '/pages/login/login'
				// })
				reject(err)
			}
		})
	})
}

// 获取请求头数据
function getHeaderInfo(url) {
	let patInfo = store.state.patientInfo
	let { authToken, loginTime, phoneNumber } = patInfo
	let headObject = { authToken, loginTime, phoneNumber, headObject: 'h5' }
	// #ifdef MP-WEIXIN
		headObject.source = 'wechat'
	// #endif
	return headObject
}

// 异常提示
function errorHandle(code, message) {
	if (code === 1) {
		errorAlert(message)
		// #ifdef MP-WEIXIN
		if (message && message.includes('登录信息已过期')) {
			store.commit('logout')
			setTimeout(() => {
				uni.navigateTo({
					url: '/pages/auth/auth'
				})					
			}, 500)
		}
		// #endif
		// #ifdef H5
		if (message && message.includes('请重新登录')) {
			uni.navigateTo({
				url: '/pages/login/login'
			})
		}
		// #endif
	}
}

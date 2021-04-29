import { errorAlert } from './prompt.js'
import store from '@/store/index'
import { refreshToken as getToken } from '@/common/api/login.js'

let index = 0

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

	// 正式
	// const BASE_URl = 'https://www.zjgoshine.com:9001/' + prefix;
	// 测试
	const BASE_URl = 'http://192.168.1.253:8085/' + prefix;
	// 发票相关
	// const BASE_URl = 'http://192.168.1.37:8002/' + prefix;

	let white = ['app/wechat', 'app/login']
	if (!['app/login', 'charges/'].includes(prefix) && !data.length) {
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
			async success(res) {
				let { code, message } = res.data
				// 异常提示
				if (code === 1) errorHandle(code, message)
				else if (code === 401 && index < 2) {
					await getTokenAgain()
					index++
					let newRes = await axios(url, data, prefix)
					resolve(newRes)
					return
				}
				resolve(res.data)
			},
			fail(err) {
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

async function getTokenAgain() {
	let { refreshToken } = store.state.patientInfo
	// 重新获取token
	let res = await getToken({ refreshToken })
	let { token } = res.data
	store.state.patientInfo.authToken = token
}

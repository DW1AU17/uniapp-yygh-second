import { errorAlert } from './prompt.js'

// 三种情况
/**
 * 1. 地址
 * 2. 地址，对象
 * 3. 对象
 * */
// 导出方法
export default function axios(url, data = {}, prefix = 'app/register/') {
	// 公共路径部分
	// const BASE_URl = 'https://ezhenmai.com:7011/app/register/';
	// if (process.env.NODE_ENV === 'development') {
	//     console.log('开发环境')
	// } else {
	//     console.log('生产环境')
	// }
	
	// const BASE_URl = 'http://192.168.1.190:8085/' + prefix;
	const BASE_URl = 'http://www.ezhenmai.cn:59001/' + prefix;
	let method = "post"
	if (Object.keys(data).length === 0) {
		method = "get"
	}
	// 非登录页添加请求头
	let needToken = BASE_URl.includes('app/login')
	let header = !needToken ? getHeaderInfo() : {}
	
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
function getHeaderInfo() {
	let patInfo = uni.getStorageSync('patient_info')
	let { authToken, loginTime, phoneNumber } = patInfo
	return { authToken, loginTime, phoneNumber }
}

// 异常提示
function errorHandle(code, message) {
	if (code === 1) {
		errorAlert(message)
		if (message && message.includes('请重新登录')) {
			uni.navigateTo({
				url: '/pages/login/login'
			})
		}
	}
}

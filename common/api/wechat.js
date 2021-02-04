import axios from '../utils/request.js'

let BASE_SUFFIX = 'app/wechat/'

/**
 * 处理小程序授权用户信息
 */
export function wechatHandleUserInfo(data) {
	return axios('handlerWeChatUserinfo', data, BASE_SUFFIX)
}

/**
 * 登录
 */
export function wechatLogin(data) {
	return axios('wxLogin', data, BASE_SUFFIX)
}

/**
 * 分享
 */
export function wechatShare() {
	return axios('wxShare', {}, BASE_SUFFIX)
}

/**
 * 分享
 */
export function h5Share(data) {
	return axios('h5Share', data, BASE_SUFFIX)
}
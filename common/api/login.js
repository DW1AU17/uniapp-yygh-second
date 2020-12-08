import axios from '../utils/request.js'

/** 登录相关 **/ 
const BASE_SUFFIX = 'app/login/'

/**
 * 获取验证码 
 * @param {Object} data
 * 		phoneNumber
 * @return {Promise}
 */ 
export function getVerificationCode(data) {
	return axios('getCheckCode', data, BASE_SUFFIX)
}

/**
 * 登录
 * @param {Object} data
 * 		phoneNumber
 * 		verificationCode
 * 		password
 * 		loginType 1密码 2验证码
 * @return {Promise}
 */
export function login(data) {
	return axios('loginFromApp', data, BASE_SUFFIX)
}


import axios from '../utils/request.js'

/** 预约挂号相关 **/

/**
 * 获取科室
 * @param specialMode 2特殊
 * @return {Promise}
 */
export function getDepartmentList(specialMode = 2) {
	return axios(`getDeptJson?specialMode=${specialMode}`)
}

/**
 * 获取医生
 * @param {Object} data
 * 		deptId
 * 		specialMode 2特殊
 * @return {Promise}
 */
export function getDoctorList(data) {
	return axios('getDoctorJson', data)
}

/**
 * 获取排班
 * @param {Object} data
 * 		docId
 * 		docName
 * 		orgCode 机构码
 * @return {Promise}
 */
export function getSchedulingList(data) {
	return axios('getSchedulingJson', data)
}

/**
 * 获取号源
 * @param {Object} data
 * 		ampm
 * 		schId
 * 		orgCode 机构码
 * @return {Promise}
 */
export function getSourceList(data) {
	return axios('getSchedulingSourceJson', data)
}

/**
 * 提交预约信息
 * @param {Object} data
 * 		ampm
 * 		schId
 * 		numId
 * 		regId
 * 		patId
 * 		visitDate
 * 		orgCode 机构码
 * @return {Promise}
 */
export function commitRegisterInfo(data) {
	return axios('registered', data)
}

/**
 * 获取预约记录
 * @param {Object} data
 * 		idCard
 * 		patientId
 * @return {Promise}
 */
export function getRegisterList(data) {
	return axios('getAllRegistered', data)
}

/**
 * 取消预约
 * @param {Object} data
 * 		regId
 * 		visitDate
 * 		pass
 * 		orgCode
 * @return {Promise}
 */
export function cancelRegister(data) {
	return axios('cancelRegistered', data)
}
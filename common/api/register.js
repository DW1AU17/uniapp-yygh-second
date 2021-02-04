import axios from '../utils/request.js'

/** 预约挂号相关 **/

/**
 * 获取科室(含一级, 二级)
 * - @param 医馆的id 
 * @return {Promise}
 */
export function getDepartmentList(specialMode = 2) {
	return axios(`getAllDeptJson`, {})
}

/**
 * 获取医生
 * @param {Object} data
 * 		deptId
 * 		searchDate
 * 		hospitalId
 * @return {Promise}
 */
export function getDoctorList(data) {
	return axios('getDoctorByDateJson', data)
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
	// return axios(`getSchedulingJson/${orgCode}/${hospitalId}/${docId}`)
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
 * 搜索医生
 * @param {Object} data
 * 		orgCode
 *      searchKey
 * @return {Promise}
 */
export function searchDoctor(data) {
	return axios('searchDoctorAndDeptInfo', data)
}

/**
 * 获取医生
 * @param {Object} data
 *		doctorId
 * 		hospitalId
 * @return {Promise} 
 */
export function getDoctorInfo(data) {
	return axios('getSingleDoctorJson', data)
}


/**
 * 提交预约信息
 * @param {Object} data
 * 		patId
 * 		sourceDetailId
 * 		schedulingId
 * 		timeState
 * 		visitDate
 * 		orgCode
 * @return {Promise}
 */
export function commitRegisterInfo(data) {
	return axios('selfRegistered', data)
}

/**
 * 获取预约记录
 * @param {Object} data
 * 		cardType
 * 		cardCode
 * @return {Promise}
 */
export function getRegisterList(data) {
	return axios('getSelfAllRegistered', data)
}

/**
 * 取消预约
 * @param {Object} data
 * 		patId
 * 		sourceDetailId
 * 		schedulingId
 * 		timeState
 * 		appointmentId（预约记录返回id）
 * 		visitDate
 * 		orgCode
 * @return {Promise}
 */
export function cancelRegister(data) {
	return axios('selfCancelRegistered', data)
}
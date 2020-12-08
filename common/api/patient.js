import axios from '../utils/request.js'

/** 就诊人相关 **/ 
const BASE_SUFFIX = 'app/user/'

/**
 * 新增就诊人 
 * @param {Object} data
 *      patName
 *		phoneNumber
 *		idCard
 *		userId	登录人员的id
 * @return {Promise}
 */ 
export function addPatient(data) {
	return axios('addPatient', data, BASE_SUFFIX)
}

/**
 * 完善登录人员信息
 * @param {Object} data
 * 		username
 *		phoneNumber
 *		idCard
 *		id	当前登录人员的id
 * @return {Promise}
 */
export function updatePatient(data) {
	return axios('updateInfo', data, BASE_SUFFIX)
}

/**
 * 获取就诊人列表
 * @param {Object} data 
 * 		userId 	当前登录人员的id
 * @return {Promise}
 */
export function getPatientList(data) {
	return axios('displayUserAndPatientRelation', data, BASE_SUFFIX)
}

/**
 * 删除就诊人
 * @param {Object} data 
 * 		userId 
 * 		patientId
 * 		handlerType 2
 * @return {Promise}
 */
export function removePatient(data) {
	return axios('removerUserAndPatientRelation', data, BASE_SUFFIX)
}
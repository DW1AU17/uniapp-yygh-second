import axios from '../utils/request.js'

/** 就诊人相关 **/ 
const BASE_SUFFIX = 'app/user/'

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

/** ++++++++++++++++++++++++++++++++++++++++++
 * 获取就诊人列表
 * @param {Object} data 
 * 		userId 	当前登录人员的id
 * @return {Promise}
 */
export function getPatientList(data) {
	return axios('displayUserAndCardRelation', data, BASE_SUFFIX)
}


/**
 * 新增就诊人 
 * @param {Object} data
 *      username
 *		phoneNumber
 *		cardCode 卡号
 * 		cardType 卡类型
 *		userId	登录人员的id
 * @return {Promise}
 */ 
export function addPatient(data) {
	return axios('addUserAndCardRelation', data, BASE_SUFFIX)
}

/**
 * 删除就诊人
 * @param {Object} data 
 * 		id
 * @return {Promise}
 */
export function removePatient(data) {
	return axios('removerUserAndCardRelation', data, BASE_SUFFIX)
}

/**
 * 设置默认接诊人
 * @param {Object} data 
 * 		userId 登录人id 
 * 		relationId 当前选择人id                    
 * @return {Promise}
 */
export function setDefaultPatient(data) {
	return axios('assignDefaultVisitor', data, BASE_SUFFIX)
}

/**
 * 获取患者信息(挂号前调用，获取返回的用户信息patId)
 * @param {Object} data
 * 		cardType
 * 		cardCode
 * 		userName
 */
export function getCurrentPatientInfo(data) {
	return axios(`addOrUpdatePatInfo`, data)
}	
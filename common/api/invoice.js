import axios from '../utils/request.js'

const BASE_SUFFIX = 'charges/'

/**
 * 获取收费记录
 * @param {Object} data
 */
export function getChargeListApi(data) {
	return axios('selectChargeList', data, BASE_SUFFIX) 
}

/**
 * 提交记录
 * @param {Object} data
 */
export function makeInvoiceApi(data) {
	return axios('personInvoiceToApply', data, BASE_SUFFIX) 
}
import axios from '../utils/request.js'

const BASE_SUFFIX = 'app/'

/**
 * 保存问卷
 */
export function saveAnswer(data) {
	return axios('survey/answer/record/completeSurvey', data, BASE_SUFFIX)
}

/**
 * 获取活动医生
 * @param activityId 活动id
 */
export function getActiveDoctorList(data) {
	return axios('group/register/getDoctorActivityInfo', data, BASE_SUFFIX)
}

/**
 * 获取活动医生排班
 * @param doctorPubId 医生id
 */
export function getActiveDoctorSchedule(data) {
	return axios('group/register/getDoctorAllHospitalScheduling', data, BASE_SUFFIX)
}
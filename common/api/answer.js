import axios from '../utils/request.js'

const BASE_SUFFIX = 'app/'

/**
 * 保存问卷
 */
export function saveAnswer(data) {
	return axios('survey/answer/record/completeSurvey', data, BASE_SUFFIX)
}
import RegExp from './regexp'
/**
 * 验证form表单 
 * @param {Object} data  
 * @param {Array} rule 规则
 * @return {Object} 
 * 		ret 验证结果
 *      msg 错误信息
 */
export default function validateForm(data, rule) {
	function errorHandler(msg) {
		return { ret: false, msg }
	}
	for (let i = 0; i < rule.length; i++) {
		let roleName = rule[i].prop
		if (roleName === 'userName' || roleName === 'username') {
			if (!data[roleName]) {
				return errorHandler('姓名不能为空')
			} else if (data[roleName].length < 2) {
				return errorHandler('姓名必须大于等于2位')
			}
		} else if (roleName === 'patName') {
			if (!data.patName) {
				return errorHandler('姓名不能为空')
			} else if (data.patName.length < 2) {
				return errorHandler('姓名必须大于等于2位')
			}
		} else if (roleName === 'phoneNumber') {
			if (!data.phoneNumber) {
				return errorHandler('手机号不能为空')
			} else if (!RegExp.phoneNumber.test(data.phoneNumber)) {
				return errorHandler('手机号格式不正确')
			}
		} else if (roleName === 'cardCode' || roleName === 'idCard') {
			if (!data[roleName]) {
				return errorHandler('身份证不能为空')
			} else if (!RegExp.cardCode.test(data[roleName])) {
				return errorHandler('身份证格式不正确')
			}
		}
	}
	return { ret: true, msg: '操作成功' }
}

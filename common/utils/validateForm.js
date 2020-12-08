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
		switch (rule[i].prop) {
			case 'username':
				if (!data.username) {
					return errorHandler('姓名不能为空')
				} else if (data.username.length < 2) {
					return errorHandler('姓名必须大于等于2位')
				}
				break
			case 'patName':
				if (!data.patName) {
					return errorHandler('姓名不能为空')
				} else if (data.patName.length < 2) {
					return errorHandler('姓名必须大于等于2位')
				}
				break
			case 'mobilePhone':
				if (!data.mobilePhone) {
					return errorHandler('手机号不能为空')
				} else if (!RegExp.mobilePhone.test(data.mobilePhone)) {
					return errorHandler('手机号格式不正确')
				}
				break
			case 'idCard':
				if (!data.idCard) {
					return errorHandler('身份证不能为空')
				} else if (!RegExp.idCard.test(data.idCard)) {
					return errorHandler('身份证格式不正确')
				}
				break
			default: 
				break
		}
	}
	return { ret: true, msg: '操作成功' }
}

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
		if (['userName', 'username', 'patName'].includes(roleName)) {
			if (!data[roleName]) {
				return errorHandler('姓名不能为空')
			} else if (data[roleName].length < 2) {
				return errorHandler('姓名必须大于等于2位')
			}
		} else if (roleName === 'phoneNumber') {
			if (!data[roleName]) {
				return errorHandler('手机号不能为空')
			} else if (!RegExp[roleName].test(data[roleName])) {
				return errorHandler('手机号格式不正确')
			}
		} else if (['idCard', 'cardCode'].includes(roleName)) {
			if (!data[roleName]) {
				return errorHandler('身份证不能为空')
			} else if (!RegExp.cardCode.test(data[roleName])) {
				return errorHandler('身份证格式不正确')
			}
		}
	}
	return { ret: true, msg: '操作成功' }
}


// let rules = {
// 	aaa: [
// 		{ required: true, message: '不能为空aaa' },
// 		{ min: 3, max: 5, message: 'aaa长度在3-5个字符串' },
// 		{ regexp: /^[0-9]*$/, message: 'bbb格式不正确' }
// 	]
// }

/**
 * form 表单验证
 * @param data 源数据
 * @param rules 规则对象
 *           规则说明: 一个类型对应一个message
 *              required -> message
 *              min / max -> message
 *              regexp -> message
 * @return <Boolean> 成功
 * 		   <String> 失败
 */

function validForm(data, rules) {
	let index = 0
	function error(message, resolve) {
		resolve(message)
		index++
	}
	return new Promise((resolve, reject) => {
		Object.keys(rules).forEach(item => {
			let value = data[item]
			rules[item].forEach(rule => {
				if (index > 0) return
				let { required, message, regexp, min, max } = rule
				if (required && !value) {
					error(message, resolve)
				}
				if (regexp && !regexp.test(value)) {
					error(message, resolve)
				}
				if (min || max) {
				   if ((min && value.length < min) || (max && value.length > max)) {
					   error(message, resolve)
				   }
				}
			})
		})
		resolve(true)
	})
}
import RegExp from './regexp'
/**
 * 验证form表单 
 * @param {Object} data  
 * @param {Array} rule 规则
 * @return {Object} 
 * 		ret 验证结果
 *      msg 错误信息
 */
export function validateForm(data, rule) {
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
			} else if (!validIdCard(data[roleName])) {
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

export function validForm(data, rules) {
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
				if (!required) index++
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


/**
 * 验证身份证 
 * @param identityNumber 身份证号
 */
function validIdCard(identityNumber) {
	if (!identityNumber.length || identityNumber.length !== 18) {
		return false
	}
	// 区位码校验
	// 出生年月日校验   前正则限制起始年份为1900;
	let year = identityNumber.substr(6, 4), //身份证年
		month = identityNumber.substr(10, 2), //身份证月
		date = identityNumber.substr(12, 2), //身份证日
		time = Date.parse(month + "-" + date + "-" + year), //身份证日期时间戳date
		now_time = Date.parse(new Date()), //当前时间戳
		dates = new Date(year, month, 0).getDate(); //身份证当月天数
	if (time > now_time || date > dates) {
		return false
	}
	//校验码判断
	var c = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); //系数
	var b = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"); //校验码对照表
	var id_array = identityNumber.split("");
	var sum = 0;
	for (var k = 0; k < 17; k++) {
		sum += parseInt(id_array[k]) * parseInt(c[k]);
	}
	if (id_array[17].toUpperCase() != b[sum % 11].toUpperCase()) {
		return false
	}
	return true
}
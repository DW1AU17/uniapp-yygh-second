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
			let identityNumber =  data[roleName]
			if (!identityNumber) {
				return errorHandler('身份证不能为空')
			} else if (!RegExp.cardCode.test(identityNumber)) {
				return errorHandler('身份证格式不正确')
			}
			//区位码校验
			//出生年月日校验   前正则限制起始年份为1900;
			let year = identityNumber.substr(6, 4), //身份证年
			  month = identityNumber.substr(10, 2), //身份证月
			  date = identityNumber.substr(12, 2), //身份证日
			  time = Date.parse(month + "-" + date + "-" + year), //身份证日期时间戳date
			  now_time = Date.parse(new Date()), //当前时间戳
			  dates = new Date(year, month, 0).getDate(); //身份证当月天数
			if (time > now_time || date > dates) {
			  return errorHandler("出生日期不合规");
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
			  return errorHandler("身份证校验码不合规");
			}
		}
	}
	return { ret: true, msg: '操作成功' }
}

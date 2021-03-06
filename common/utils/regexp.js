export default {
    // 邮箱
    email: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    // 手机号 (严谨版)
    phoneNumber: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[\d])|(?:9[1|8|9]))\d{8}$/,
    // 身份证 (15/18位)
    cardCode: /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/,
    // 纯汉字 (不含空格)
    chinese: /^(?:[\u4E00-\u9FA5])+$/,
    // 纯英文
    english: /^[a-zA-Z]+$/,
    // 纯数字 (非负数, 不含小数)
    pureNumber: /^[0-9]*$/,
    // 浮点数 (含小数, 含负数)
    pointNumber: /^(-?\d+)(\.\d+)?$/,
    // 正浮点数 (含小数, 不含负数)
    pointPNumber: /^(\d+)(\.\d+)?$/,
    // 数字加字母 (4-23位)
    engNum: /^[A-Za-z0-9]{4,23}$/,
	// 企业税号
	taxNumber: /^[A-Z0-9]{15}$|^[A-Z0-9]{17}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/
}
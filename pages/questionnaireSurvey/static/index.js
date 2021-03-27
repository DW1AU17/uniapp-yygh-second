// 问卷问题选项
export const list = {
	// 性别
	sexList: [
		{ value: 'boy', label: '男' },
		{ value: 'girl', label: '女' },
	],
	// 贫血
	anemiaList: [
		{ value: '0', label: '有' },
		{ value: '1', label: '无' },
		{ value: '2', label: '不知' },
	],
	// 甲状腺功能
	thyroidList: [
		{ value: '0', label: '正常' },
		{ value: '1', label: '低下' },
		{ value: '2', label: '不知' },
	],
	// 血糖
	bloodSugarList: [
		{ value: '0', label: '正常' },
		{ value: '1', label: '偏高' },
		{ value: '2', label: '偏低' },
		{ value: '3', label: '不知' },
	],
	// 肝肾功能
	LiverKidneyList: [
		{ value: '0', label: '正常' },
		{ value: '1', label: '有损伤' },
		{ value: '2', label: '不知' }
	],
	// 孩 子 每 年 身 高增长情况
	heightGrowthList: [
		{ value: '0', label: '≥5 厘米' },
		{ value: '1', label: '<5 厘米' },
	],
	// 是否干预治疗 过孩子身高
	interveneHeightList: [
		{ value: '0', label: '打生长激素' },
		{ value: '1', label: '吃中药' },
		{ value: '2', label: '未用药' },
	],
	// 平时是否多病
	sickList: [
		{ value: '0', label: '不常生病' },
		{ value: '1', label: '经常感冒, 发烧' },
		{ value: '2', label: '有鼻炎哮喘' },
	],
	// 用药情况
	drugUsageList: [
		{ value: '0', label: '不常吃药' },
		{ value: '1', label: '经常挂抗 生素' },
		{ value: '2', label: '经常吃中药' },
	],
	// 食欲
	appetiteList: [
		{ value: '0', label: '食欲好' },
		{ value: '1', label: '食欲差' },
		{ value: '2', label: '经常吃零食' },
		{ value: '3', label: '喂饭才肯吃' },
		{ value: '4', label: '临睡前喝奶' },
	],
	// 偏食
	piddleList: [
		{ value: '0', label: '营养均衡' },
		{ value: '1', label: '偏食肉类' },
		{ value: '2', label: '只吃蔬菜' },
		{ value: '3', label: '只吃主食' },
	],
	// 口腔及舌苔
	oralList: [
		{ value: '0', label: '健康' },
		{ value: '1', label: '口臭' },
		{ value: '2', label: '舌苔厚' },
	],
	// 大便情况
	excrementList: [
		{ value: '0', label: '大便 1-2 天 1 次' },
		{ value: '1', label: '大便 3-5 天 1 次' },
		{ value: '2', label: '大便很臭或酸' },
	],
	// 入睡时间
	sleepTimeList: [
		{ value: '0', label: '21:30 之前睡' },
		{ value: '1', label: '22:00 睡' },
		{ value: '2', label: '23:00 或更晚时间睡' },
	],
	// 起床是阿金
	getUpTimeList: [
		{ value: '3', label: '7:00 之前' },
		{ value: '0', label: '7:00-7:30 起床' },
		{ value: '1', label: '8:00-8:30 起床' },
		{ value: '2', label: '9:00-9:30 起床' },
	],
	// 睡眠状况
	sleepStatusList: [
		{ value: '0', label: '睡眠中翻来覆去' },
		{ value: '1', label: '经常哭闹或夜醒' },
		{ value: '2', label: '睡眠质量好' },
		{ value: '3', label: '不知' },
	],
	// 课外剧烈运动时间
	movementTimeList: [
		{ value: '0', label: '不足半小时' }, 
		{ value: '1', label: '1 小时以上' },
		{ value: '2', label: '2 小时以上' },
	],
	// 运动
	movementList: [
		{ value: '0', label: '爱跑爱动' }, 
		{ value: '1', label: '稍运动后疲乏无力' },
		{ value: '2', label: '不爱活动' },
	],
	// 出汗情况
	sweatingList: [
		{ value: '0', label: '出汗不太多' },
		{ value: '1', label: '出汗很多' },
		{ value: '2', label: '夜间出汗能湿透内衣' },
		{ value: '3', label: '稍微活动就能' },
	],
	// 四肢寒凉
	coldLimbsList: [
		{ value: '0', label: '手脚不凉' },
		{ value: '1', label: '手足容易凉' },
		{ value: '2', label: '手足冰凉' },
	],
	// 怕冷情况
	afraidColdList: [
		{ value: '0', label: '平时不怕冷' },
		{ value: '1', label: '稍怕冷' },
		{ value: '2', label: '十分怕冷' },
	],
	// 遇冷易打喷嚏，流鼻涕，感冒等
	inColdList: [
		{ value: '0', label: '有' },
		{ value: '1', label: '无' },
	],
	// 踢被子
	kickAQuiltList: [
		{ value: '0', label: '夜间不踢被子' },
		{ value: '1', label: '经常踢被子' },
		{ value: '2', label: '基本不盖被子' },
	]
}


// 问题列表
export const questionList = [
	{ qContent: '孩子姓名', qType: '3', field: 'name' },
	{ qContent: '出生年月', qType: '3', field: 'birthday', picker: true },
	{ qContent: '爸爸身高', qType: '3', field: 'fatherHeight' },
	{ qContent: '妈妈身高', qType: '3', field: 'motherHeight' },
	{ qContent: '孩子身高', qType: '3', field: 'height' },
	{ qContent: '孩子体重', qType: '3', field: 'weight' },
	{ qContent: '孩子骨龄', qType: '3', field: 'boneAge' },
	{ qContent: '性别', qType: '1', field: 'sex' },
	{ qContent: '1. 贫血', qType: '1', field: 'anemia' },
	{ qContent: '2. 甲状腺功能', qType: '1', field: 'thyroid' },
	{ qContent: '3. 血糖', qType: '1', field: 'bloodSugar' },
	{ qContent: '4. 肝肾功能', qType: '1', field: 'LiverKidney' },
	{ qContent: '5. 孩子每年身高增长情况', qType: '1', field: 'heightGrowth' },
	{ qContent: '6. 是否干预治疗过孩子身高', qType: '2', field: 'interveneHeight' },
	{ qContent: '7. 平时是否多病', qType: '2', field: 'sick' },
	{ qContent: '8. 用药情况', qType: '1', field: 'drugUsage' },
	{ qContent: '9. 食欲', qType: '2', field: 'appetite' },
	{ qContent: '10. 偏食', qType: '1', field: 'piddle' },
	{ qContent: '11. 口腔及舌苔', qType: '1', field: 'oral' },
	{ qContent: '12. 大便情况', qType: '2', field: 'excrement' },
	{ qContent: '13. 入睡时间', qType: '1', field: 'sleepTime' },
	{ qContent: '14. 起床时间', qType: '1', field: 'getUpTime' },
	{ qContent: '15. 睡眠状况', qType: '1', field: 'sleepStatus' },
	{ qContent: '16. 课外剧烈运动时间', qType: '1', field: 'movementTime' },
	{ qContent: '17. 运动', qType: '1', field: 'movement' },
	{ qContent: '18. 出汗情况', qType: '1', field: 'sweating' },
	{ qContent: '19. 四肢寒凉', qType: '1', field: 'coldLimbs' },
	{ qContent: '20. 怕冷情况', qType: '1', field: 'afraidCold' },
	{ qContent: '21. 遇冷易打喷嚏', qType: '1', field: 'inCold' },
	{ qContent: '22. 踢被子', qType: '1', field: 'kickAQuilt' },
]

/**
 * 儿童生长对照表
 * <年龄, 身高>
 * @type {{girl: Map<string, number>, boy: Map<string, number>}}
 */
const growthTable = {
	girl: new Map([
		[ '3.0', 95.6 ],
		[ '3.5', 99.4 ],
		[ '4.0', 103.1 ],
		[ '4.5', 106.7 ],
		[ '5.0', 110.2 ],
		[ '5.5', 113.5 ],
		[ '6.0', 116.6 ],
		[ '6.5', 119.4 ],
		[ '7.0', 122.5 ],
		[ '7.5', 125.6 ],
		[ '8.0', 128.5 ],
		[ '8.5', 131.3 ],
		[ '9.0', 134.1 ],
		[ '9.5', 137.0 ],
		[ '10.0', 140.1 ],
		[ '10.5', 143.3 ],
		[ '11.0', 146.6 ],
		[ '11.5', 149.7 ],
		[ '12.0', 152.4 ],
		[ '12.5', 154.6 ],
		[ '13.0', 156.3 ],
		[ '13.5', 157.6 ],
		[ '14.0', 158.6 ],
		[ '14.5', 159.4 ],
		[ '15.0', 159.8 ],
		[ '15.5', 160.1 ],
		[ '16.0', 160.1 ],
	]),
	boy: new Map([
		[ '3.0', 96.8 ],
		[ '3.5', 100.6 ],
		[ '4.0', 104.1 ],
		[ '4.5', 107.7 ],
		[ '5.0', 111.3 ],
		[ '5.5', 114.7 ],
		[ '6.0', 117.7 ],
		[ '6.5', 120.7 ],
		[ '7.0', 124.0 ],
		[ '7.5', 127.1 ],
		[ '8.0', 130.0 ],
		[ '8.5', 132.7 ],
		[ '9.0', 135.4 ],
		[ '9.5', 137.9 ],
		[ '10.0', 140.2 ],
		[ '10.5', 142.6 ],
		[ '11.0', 145.3 ],
		[ '11.5', 148.4 ],
		[ '12.0', 151.9 ],
		[ '12.5', 155.6 ],
		[ '13.0', 159.5 ],
		[ '13.5', 163.0 ],
		[ '14.0', 165.9 ],
		[ '14.5', 168.2 ],
		[ '15.0', 169.8 ],
		[ '15.5', 171.0 ],
		[ '16.0', 171.6 ],
	])
}

/**
 * 获取对应年龄/身高数组
 */
function getSexDifferentiateArr(type) {
	return {
		ageArray: [ ...growthTable[type].keys() ],
		heightArray: [ ...growthTable[type].values() ],
	}
}

/**
 * 获取相差的绝对值
 * @param cur 当前项的高度
 * @param height 传入的高度
 */
function getDiffValue(cur, height) {
	return Math.abs(cur - height)
}

/**
 * 获取骨龄
 * @param height 当前身高
 * @param type boy/girl
 * @returns {number}
 */
export function getTheClosestAge(height, type) {
	let { ageArray, heightArray } = getSexDifferentiateArr(type)
	let diff = null
	heightArray.forEach((item, index) => {
		if (index === 0) {
			diff = { index, value: getDiffValue(item, height) }
		} else {
			let { value } = diff
			let curDif = getDiffValue(item, height)
			if (curDif < value) {
				diff = { index, value: curDif }
			}
		}
	})
	return +ageArray[diff.index]
}

/**
 * 获取周岁
 * @param birthday 列: 2020-06
 * @returns {number}
 */
export function getAge(birthday) {
	let currentYear = new Date().getFullYear()
	let [ birthYear, birthMonth ] = birthday.split('-')
	let year = (currentYear - birthYear) 
	return year
}

// 报告评估
const factorAssess = [
  { field: 'heightGrowth', value: ['1'], content: '身高增长不达标' },
  { field: 'sick', value: ['1', '2'], content: '孩子体质较差' },
  { field: 'appetite', value: ['2', '3', '4'], content: '饮食习惯不良' },
  { field: 'piddle', value: ['1', '2', '3'], content: '明显偏食' },
  { field: 'oral', value: ['1', '2'], content: '食积' },
  { field: 'excrement', value: ['2'], content: '食积' },
  { field: 'excrement', value: ['1'], content: '便秘' },
  { field: 'sleepTime', value: ['1', '2'], content: '睡眠习惯欠佳' },
  { field: 'getUpTime', value: ['1', '2'], content: '睡眠习惯欠佳' },
  { field: 'sleepStatus', value: ['0', '1'], content: '睡眠质量差' },
  { field: 'movementTime', value: ['0'], content: '运动量不足' },
  { field: 'sweating', value: ['2', '3'], content: '出汗多' },
  { field: 'kickAQuilt', value: ['1', '2'], content: '有内热' },
  { field: 'anemia', value: ['0'], content: '有贫血' },
  { field: 'thyroid', value: ['1'], content: '甲状腺功能低下' },
  { field: 'bloodSugar', value: ['2'], content: '血糖偏低' },
  { field: 'LiverKidney', value: ['1'], content: '肝肾功能损伤' },
]

// 获取报告结果
export function getFactorAssess(ruleForm) {
  let resultRes = []
  Object.keys(ruleForm).forEach(field => {
	if (ruleForm[field] instanceof Array) {
	  ruleForm[field].forEach(i => {
		resultRes = [...resultRes, ...traverse(field, i)]
	  })
	} else {
	  resultRes = [...resultRes, ...traverse(field, ruleForm[field])]
	}
  })
  let end = Array.from(new Set(resultRes))
  return end.length ? '孩子' + end.join(', ') : '您的孩子棒棒的!'
}

function traverse(field, value) {
  let resultRes = []
  let factor = factorAssess.filter(i => i.field === field)
  if (factor.length) {
	factor.forEach(item => {
	  if (item.value.includes(value)) {
		resultRes.push(item.content)
	  }
	})
  }
  return resultRes
}

	
// 显示的医生
export const doctorList = [
	{
		depId: "62",
		id: "200000161",
		img: "2182",
		name: "丛丽",
		title: "主任中医师",
		introduce: "如预约已满，可拨打桐君堂武林馆电话：13600514546，0571-85214761 主任中医师、教授，医学博士，硕士生导师从事儿科专业20余年，师承全国名老中医王烈、张士卿、汪受传教授。主攻病种：反复呼吸道感染、哮喘、慢性咳嗽、腹泻、便秘等研究。个人特长：擅长调理体质。对小儿反复感冒及咳喘等体弱患儿，采用分期治疗方式，早期以止咳平喘治疗为主，后期以调整体质为主，疗效较为显著。在顽固性腹泻及便秘的治疗中，采用纯中药治疗，取得良好疗效。桐君堂武林馆老馆：体育场路474号. 桐君堂武林馆：体育场路474号，咨询热线：0571-85216577 。",
		orgCode: '057168',
		hospitalId: '330002'
	}
]
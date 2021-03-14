export const list = {
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
		{ value: '0', label: '7:00-7:30 起床' },
		{ value: '1', label: '8:00-8:30 起床' },
		{ value: '2', label: '9:00-9:30 起床' },
	],
	// 睡眠状况
	sleepStatusList: [
		{ value: '0', label: '睡眠中翻来覆去' },
		{ value: '1', label: '经常哭闹或夜醒' },
		{ value: '2', label: '不知' },
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

export const questionList = [
	{ qContent: '孩子姓名', qType: '3', field: 'name' },
	{ qContent: '出生年月', qType: '3', field: 'birthday' },
	{ qContent: '爸爸身高', qType: '3', field: 'fatherHeight' },
	{ qContent: '妈妈身高', qType: '3', field: 'motherHeight' },
	{ qContent: '孩子身高', qType: '3', field: 'height' },
	{ qContent: '孩子体重', qType: '3', field: 'weight' },
	{ qContent: '孩子骨龄', qType: '3', field: 'boneAge' },
	{ qContent: '贫血', qType: '1', field: 'anemia' },
	{ qContent: '甲状腺功能', qType: '1', field: 'thyroid' },
	{ qContent: '血糖', qType: '1', field: 'bloodSugar' },
	{ qContent: '肝肾功能', qType: '1', field: 'LiverKidney' },
	{ qContent: '孩子每年身高增长情况', qType: '1', field: 'heightGrowth' },
	{ qContent: '是否干预治疗过孩子身高', qType: '2', field: 'interveneHeight' },
	{ qContent: '平时是否多病', qType: '2', field: 'sick' },
	{ qContent: '用药情况', qType: '1', field: 'drugUsage' },
	{ qContent: '食欲', qType: '1', field: 'appetite' },
	{ qContent: '偏食', qType: '1', field: 'piddle' },
	{ qContent: '口腔及舌苔', qType: '1', field: 'oral' },
	{ qContent: '大便情况', qType: '2', field: 'excrement' },
	{ qContent: '入睡时间', qType: '1', field: 'sleepTime' },
	{ qContent: '起床时间', qType: '1', field: 'getUpTime' },
	{ qContent: '睡眠状况', qType: '1', field: 'sleepStatus' },
	{ qContent: '课外剧烈运动时间', qType: '1', field: 'movementTime' },
	{ qContent: '运动', qType: '1', field: 'movement' },
	{ qContent: '出汗情况', qType: '1', field: 'sweating' },
	{ qContent: '四肢寒凉', qType: '1', field: 'coldLimbs' },
	{ qContent: '怕冷情况', qType: '1', field: 'afraidCold' },
	{ qContent: '遇冷易打喷嚏', qType: '1', field: 'inCold' },
	{ qContent: '踢被子', qType: '1', field: 'kickAQuilt' },
]
	
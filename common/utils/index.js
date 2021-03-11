let pavList = [
	{ id: '330003', orgCode: '057196', state: 0, sffName: '东新馆', phone: '0571-56095619', sffSummary: '杭州市东新路737号', img: '/static/pav/dxg.jpg'},
	{ id: '330006', orgCode: '0571C2', state: 0, sffName: '环西馆', phone: '0571-87099390', sffSummary: '杭州市环城西路92号', img: '/static/pav/hxg.jpg'},
	{ id: '330005', orgCode: '057173', state: 0, sffName: '城站馆', phone: '0571-86072747', sffSummary: '杭州市郭东园巷2号', img: '/static/pav/czg.jpg'},
	{ id: '330002', orgCode: '057168', state: 0, sffName: '武林馆', phone: '0571-85216577', sffSummary: '杭州市体育路474号', img: '/static/pav/wlg.jpg'},
	{ id: '330001', orgCode: '057197', state: 0, sffName: '城西馆', phone: '0571-88080029', sffSummary: '杭州市古墩路632号同人精华', img: '/static/pav/cxg.jpg'},
]

export { pavList }

/**
 * 获取日期和周几
 */
export function getDates(days) {
	let todate = formatDate(new Date())
	let dateArry = [];
	for (let i = 0; i < days; i++) {
		let dateObj = dateLater(todate, i);
		dateArry.push(dateObj)
	}
	return dateArry;
}
const formatNumber = n => {
	n = n.toString()
	return n[1] ? n : '0' + n
}
const formatDate = date => {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	return [year, month, day].map(formatNumber).join('-')
}
let id = 0;

function dateLater(dates, later) {
	let dateObj = {
		id: id++
	};
	let show_day = new Array('周日', '周一', '周二', '周三', '周四', '周五', '周六');
	let date = new Date(dates);
	date.setDate(date.getDate() + later);
	let day = date.getDay();
	let yearDate = date.getFullYear();
	let month = ((date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : date.getMonth() + 1);
	let dayFormate = (date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate());
	dateObj.month = month;
	dateObj.day = dayFormate;
	dateObj.week = show_day[day];
	dateObj.searchDate = yearDate + '-' + month + '-' + dayFormate;
	return dateObj;
}

/**
 * 通过日期获取周
 */
export function getWeekFromDate(date) {
	let dt = new Date(date.replace(/-/g, '/'));
	let weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
	return weeks[dt.getDay()];
}

/**
 * 获取馆名
 */
export function getPavName(number) {
	let obj = {
		'330001': '城西馆',
		'330002': '武林馆',
		'330003': '东新馆',
		'330005': '城站馆',
		'330006': '环西馆',
	}
	return obj[number]
}

/**
 * 判断图片是否存在
 */
export function CheckImgExists(imgurl) {
	return new Promise(function(resolve, reject) {
		let ImgObj = new Image(); 
		ImgObj.src = imgurl;
		ImgObj.onload = function(res) {
			resolve(res);
		}
		ImgObj.onerror = function(err) {
			reject(err)
		}
	})
}

/**
 * 获取路由参数
 */
// export function getUrlParam(string) {
// 	let paramString = location.href.split('?')[1]
// 	if (paramString) {
// 		let paramArray = paramString.split('&')
// 		let handleResultObject = {}
// 		paramArray.filter(item => {
// 			let arr = item.split('=')
// 			let key = arr[0]
// 			let value = arr[1]
// 			handleResultObject[key] = value
// 		})
// 		return handleResultObject[string]
// 	}
// 	return ''
// }

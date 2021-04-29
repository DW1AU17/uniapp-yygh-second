/**
 * 普通的错误提示
 * @param {String} title 提示信息
 * @param {Number} duration 显示时长
 */
export function errorAlert(title, duration = 2000) {
	uni.showToast({
	    title,
		icon: 'none',
	    duration
	})
}

/**
 * 普通的成功提示
 * @param {String} title 提示信息
 * @param {Number} duration 显示时长
 */
export function successAlert(title, duration = 2000) {
	uni.showToast({
	    title,
	    duration
	})
}

/**
 * 显示加载中
 * @param {String} title 提示信息
 */
export function showLoging(title = '加载中') {
	uni.showLoading({ title })
}

export function hideLoading() {
	uni.hideLoading()
}


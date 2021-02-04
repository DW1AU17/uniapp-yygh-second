export function isAuth() {
	let patient = uni.getStorageSync('patInfo') || {}
	if (patient.authToken && patient.username && patient.idCard) return true
	return false
}
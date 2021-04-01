import Vue from 'vue'
import Vuex from 'vuex'
import { isAuth } from '@/common/utils/auth'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: isAuth(), // 登录状态
		patientInfo: uni.getStorageSync('patInfo') || {}, // 患者信息  (缓存)
		patientList: uni.getStorageSync('patList') || [], // 就诊人列表 (缺一个当前就诊人字段) (缓存)
		pavilion: {}, // 当前选择的馆区
		wechatToken: uni.getStorageSync('wechatToken') || {}, // 微信小程序登录状态 openId, sessionKey
		wechatUserInfo: uni.getStorageSync('wechatUserInfo') || {}, // 微信登录的用户信息存到local中
	},
	mutations: {
		login(state) {
			state.hasLogin = true
		},
		logout(state) {
			state.hasLogin = false
			// 清楚缓存
			state.patientInfo = {}
			state.patientList = []
		},
		/**
		 * 设置小程序登录token
		 */
		setWeChatToken(state, obj) {
			state.wechatToken = obj
			// #ifdef MP-WEIXIN
			uni.setStorageSync('wechatToken', obj)
			// #endif
		},
		/**
		 * 设置小程序登录用户信息
		 */
		setWechatUserInfo(state, obj) {
			state.wechatUserInfo = obj
			// #ifdef MP-WEIXIN
			uni.setStorageSync('wechatUserInfo', obj)
			// #endif
		},
		/**
		 * 设置当前选择医馆
		 */
		setPavilion(state, obj) {
			state.pavilion = obj
		},
		/**
		 * 设置当前登录人员信息
		 */
		setPatientInfo(state, obj) {
			state.patientInfo = obj
			// #ifdef MP-WEIXIN
			uni.setStorageSync('patInfo', obj)
			// #endif
		},
		/**
		 * 设置就诊人列表
		 */
		setPatientList(state, obj) {
			state.patientList = obj
			// #ifdef MP-WEIXIN
			uni.setStorageSync('patList', obj)
			// #endif
		},
		/**
		 * 删除某个就诊人
		 */
		deletePatient(state, { id }) {
			state.patientList = state.patientList.filter(item => item.id != id)
			// #ifdef MP-WEIXIN
			uni.setStorageSync('patList', state.patientList)
			// #endif
		},
		/**
		 * 添加就诊人
		 */
		addPatient(state, { obj, type = 'add' }) {
			console.log(123)
			if (type === 'edit') {
				state.patientList = state.patientList.filter(item => item.userName != obj.userName)
			}
			state.patientList.push(obj)
			
			// #ifdef MP-WEIXIN
			uni.setStorageSync('patList', state.patientList)
			// #endif
		},
		/**
		 * 设置默认就诊人
		 */
		setDefaultPatToList(state, obj) {
			let { prevId, currId } = obj
			if (prevId) {
				let prevIndex = state.patientList.findIndex(item => item.id == prevId)
				state.patientList[prevIndex].defaultSign = null
			}
			let index = state.patientList.findIndex(item => item.id == currId)
			state.patientList[index].defaultSign = '1'
			// #ifdef MP-WEIXIN
			uni.setStorageSync('patList', state.patientList)
			// #endif
		}
	},
    getters: {
		// 代替一下监听事件
		setPatInfoToStorage: state => {
			console.log('保存')
			uni.setStorageSync('patInfo', state.patientInfo)
			return ''
		},
		setPatListToStorage: state => {
			uni.setStorageSync('patList', state.patientList)
			return ''
		},
		setWechatToken: state => {
			console.log('setToken')
			uni.setStorageSync('wechatToken', state.wechatToken)
			return ''
		},
		orgCode: state => { // 平台id
			return state.pavilion.orgCode
		},
		hospitalId: state => { // 机构id
			return state.pavilion.id
		}
	},
	actions: {
		// 不直接修改 state 数据
		// 通过提交 mutation 修改数据 
		// increment(context) {
		//     context.commit('ADD', obj)  
		// } 
	}
})

export default store

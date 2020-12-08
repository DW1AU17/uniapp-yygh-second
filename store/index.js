import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false, // 登录状态
		orgCode: '',     // 平台id
		patientInfo: {}, // 患者信息  (缓存)
		patientList: [], // 就诊人列表 (缺一个当前就诊人字段) (缓存)
	},
	mutations: {
		login(state) {
			state.hasLogin = true
		},
		logout(state) {
			state.hasLogin = false
			// 清楚缓存
			
		},
		/**
		 * 设置患者信息
		 */
		setPatientInfo(state, obj) {
			state.patientInfo = obj
		},
		/**
		 * 设置就诊人列表
		 */
		setPatientList(state, obj) {
			state.patientList = obj
		},
		/**
		 * 删除某个就诊人
		 */
		deletePatient(state, { userId }) {
			state.patientList = state.patientList.filter(item => item.userId != userId)
		},
		/**
		 * 添加就诊人
		 */
		addPatient(state, obj) {
			state.patientList.push(obj)
		}
	},
    getters: {},
	actions: {
		// 不直接修改 state 数据
		// 通过提交 mutation 修改数据 
		// increment(context) {
		//     context.commit('ADD', obj)  
		// } 
	}
})

export default store

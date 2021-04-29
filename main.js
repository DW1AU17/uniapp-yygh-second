import Vue from 'vue'
import App from './App'
import axios from '@/common/utils/request.js'
import { errorAlert, successAlert, showLoging, hideLoading } from '@/common/utils/prompt.js'
import store from '@/store/index.js'

Vue.config.productionTip = false
Vue.prototype.axios = axios
Vue.prototype.errorAlert = errorAlert
Vue.prototype.successAlert = successAlert
Vue.prototype.showLoging = showLoging
Vue.prototype.hideLoading = hideLoading

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()

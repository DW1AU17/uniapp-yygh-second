<template>
	<view class="login-page">
		<view class="login-header">
			<img src="@/static/pic.jpg" mode="aspectFill" class="cus-image"></img>
		</view>
		<view class="cus-form">
			<form>
				<view class="cus-form-item">
					<view class="cus-title">手机号</view>
					<input class="cus-input" v-model="ruleForm.phoneNumber" placeholder="请输入手机号" />
				</view>
				<view class="cus-form-item">
					<view class="cus-title">验证码</view>
					<input class="cus-input flex1" v-model="ruleForm.verificationCode" placeholder="请输入" />
					<view class="verification">
						<span v-if="vcDisabled" class="orange-thin">获取验证码</span>
						<span v-else>
							<span v-if="vcBtnChange" class="orange" @tap="countDown">获取验证码</span>
							<span v-else class="dsb-color">{{countdown}}</span>
						</span>
					</view>
				</view>
			</form>
		</view>
		<view class="cus-footer">
			<button type="default" class="cus-button" @tap="formSubmit">确认</button>
		</view>
	</view>
</template>

<script>
	import regExp from '@/common/utils/regexp.js'
	import { getVerificationCode, login } from '@/common/api/login.js'
	import { getPatientList } from '@/common/api/patient.js'
	import { mapMutations } from 'vuex'
	export default {
		data() {
			return {
				ruleForm: {
					phoneNumber: '',
					verificationCode: '',
					loginType: '2', // 1密码 2验证码
					password: ''
				},
				countdown: '重新获取(60s)',
				vcBtnChange: true, // 更改验证码文字
				vcDisabled: true, // 验证码是否禁用
				realVerificationCode: '', // 后台返回的验证码
				alreadyGetCode: false, // 是否获取验证码
				type: ''
			}
		},
		onShow({ type }) {
			this.type = type
		},
		methods: {
			...mapMutations(['login', 'setPatientInfo', 'setPatientList']),
			/**
			 * 登录
			 */
			async formSubmit() {
				if (!this.ruleForm.verificationCode) {
					this.errorAlert('验证码不能为空')
				} else if (!this.alreadyGetCode) {
					this.errorAlert('请先获取验证码')
				} else {					
					let data = this.ruleForm
					/* 登录接口 */
					let res = await login(data)
					let { code, message, data: { idCard, phoneNumber, id } } = res
					if (code == 0) {
						this.login()
						/* 设置患者信息 */
						this.setPatientInfo(res.data)
						/* 获取/设置就诊人列表 */
						let patRes = getPatientList({ userId: res.data.id })
						setPatientList(patRes.data)
						if (!idCard) {
							uni.navigateTo({
								url: `/pages/complateInfo/index?p=${phoneNumber}&id=${id}&type=${this.type}`
							})
						} else {
							if (this.type) {
								uni.switchTab({
									url: '/pages/tabBar/subscribe/subscribe'
								})
							} else {
								uni.navigateBack()
							}
						}
					}
				}
			},
			/**
			 * 倒计时
			 */
			countDown() {
				this.successAlert('已发送')
				this.vcBtnChange = false
				let index = 60
				let timer = setInterval(() => {
					index--
					this.countdown = `重新获取(${index}s)`
					if (index === 0) {
						clearInterval(timer)
						this.vcBtnChange = true
					}
				}, 1000)
				// 获取验证码
				this.getVerification()
			},
			/**
			 * 获取验证码
			 */
			async getVerification() {
				let { phoneNumber } = this.ruleForm
				let data = { phoneNumber }
				// 调接口
				let res = await getVerificationCode(data)
				this.alreadyGetCode = true
				// if (res.code == 0) {
				// 	this.realVerificationCode = res.data
				// }
			},
		},
		watch: {
			'ruleForm.phoneNumber'(val) {
				this.vcDisabled = !regExp.phoneNumber.test(val)
			}
		}
	}
</script>

<style lang="scss">
	@mixin bt-1 {
		border-bottom: 1px solid #ccc; 
	}
	.flex1 {
		flex: 1;
	}
	.dsb-color {
		color: #ffd180;
	}
	.orange {
		color: orange;
	}
	.orange-thin {
		color: #ffcda0;
	}
	.login-page {
		height: 100%;
		background-color: #eee;
		.login-header {
			height: 100px;
			.cus-image {
				width: 100%;
				height: 100%;
				vertical-align: bottom;
			}
		}
		.cus-form {
			background-color: #fff;
			padding-left: 10px;
			@include bt-1
			.verification {
				border-left: 1px solid #ccc;
				padding: 0 5px 0 15px;
			}	
		}
		.cus-footer {
			padding: 10px;
		}
	}
	.cus-form-item {
		display: flex;
		align-items: center;
		padding: 10px;
		@include bt-1
		&:last-child {
			border-bottom: none;
		}
		.cus-title {
			min-width: 90px;
			font-size: 16px;
		}
		.cus-input {
			
		}
	}
</style>

<template>
	<view class="login-page">
		<view class="login-header">
			<img src="../../static/ui/safe.png" alt="">
			<view>绑定手机号登录</view>
		</view>
		<view class="cus-form border-box">
			<view class="border-box-inner gradient">
				<form>
					<view class="cus-form-item">
						<input class="cus-input" v-model="ruleForm.phoneNumber" placeholder="请输入您的手机号" />
					</view>
					<view class="cus-form-item">
						<input class="cus-input flex1" v-model="ruleForm.verificationCode" placeholder="请输入验证码" />
						<text class="vertical-bar"></text>
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
		</view>
		<view class="cus-footer">
			<button type="default" class="btn-footer" @tap="formSubmit">确认</button>
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
		onLoad(option) {
			if (Object.keys(option).length) {
				this.type = option.type
			}
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
						let patRes = await getPatientList({ userId: res.data.id })
						this.setPatientList(patRes.data)
						if (!idCard) {
							// 补全信息
							uni.redirectTo({
								url: `/pages/complateInfo/index?p=${phoneNumber}&id=${id}&type=${this.type}`
							})
						} else {
							
							if (this.type) {
								uni.switchTab({
									url: `/pages/tabBar/mine/mine`
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
	.login-page {
		height: 100%;
		padding: 30rpx;
		.login-header {
			text-align: center;
			img {
				height: 71rpx;
				width: 64rpx;		
				margin-top: 60rpx;
			}
			view {
				color: $s-color;
				font-size: 24rpx;
				margin: 30rpx 0;
			}
		}
		.cus-form {
			background-color: #fff;
			>view {
				padding: 20rpx 0 40rpx 0;
			}
			.cus-form-item {
				display: flex;
				align-items: center;
				margin: 0 38rpx;
				padding: 13rpx 0;
				font-size: 28rpx;
				height: 80rpx;
				line-height: 80rpx;
				border-bottom: 1px solid #eeedea;
				.cus-input {
					flex: 1;
				}
				// 竖线
				.vertical-bar {
					height: 100%;
					width: 1px;
					background-color: #eeedea;
					margin-right: 20rpx;
				}
				.verification {
					color: #666;
					width: 180rpx;
					text-align: center;
					.orange-thin {
						color: #999;
					}
				}
			}
		}
		.cus-footer {
			margin-top: 46rpx;
		}
	}
	.uni-input-placeholder {
		font-size: 28rpx;
		color: #ccc;
	}
	
</style>

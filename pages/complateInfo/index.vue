<template>
	<view class="complate-page">
		<view class="cus-form border-box">
			<view class="border-box-inner gradient">
				<form>
					<view class="cus-form-item">
						<view class="cus-title">姓名</view>
						<input class="cus-input" v-model="ruleForm.username" focus placeholder="请输入姓名" />
					</view>
					<view class="cus-form-item">
						<view class="cus-title">手机号</view>
						<input class="cus-input" v-model="ruleForm.phoneNumber" placeholder="请输入手机号" disabled/>
					</view>
					<view class="cus-form-item">
						<view class="cus-title">证件类型</view>
						<picker @change="bindPickerChange" :value="ruleForm.cardType" :range="array" range-key="name">
							<view class="uni-input">{{array[ruleForm.cardType].name}}</view>
						</picker>
					</view>
					<view class="cus-form-item">
						<view class="cus-title">身份证</view>
						<input class="cus-input" v-model="ruleForm.idCard" placeholder="请输入身份证" />
					</view>
				</form>
			</view>
		</view>
		<view class="remind">
			<view class="title">预约实名制</view>
			<view class="single">
				<view>预约挂号需要您提供真实姓名, 有效身份证件号码</view>
			</view>
		</view>
		
		<view class="cus-footer">
			<button type="default" class="btn-footer" @tap="formSubmit">保存</button>
		</view>
		
	</view>
</template>

<script>
	import validateForm from '@/common/utils/validateForm.js'
	import { updatePatient, getPatientList } from '@/common/api/patient.js'
	import { mapState, mapMutations } from 'vuex'
 	let rules = [
		{ prop: 'username' },
		{ prop: 'idCard' },
	]
	export default {
		data() {
			return {
				ruleForm: {
					username: '',
					phoneNumber: '',
					cardType: '0',
					idCard: '',
					id: ''
				},
				type: '',
				array: [
					{ dicCode: "0", name: "身份证" },
					{ dicCode: "3", name: "其他（护照，港澳证，台胞证）" },
				]
			}
		},
		onLoad({ p, id, type }) {
			this.ruleForm.phoneNumber = p
			this.ruleForm.id = id
			this.type = type
			this.errorAlert('请完善信息')
		},
		computed: {
			...mapState(['patientInfo'])
		},
		methods: {
			...mapMutations(['login', 'setPatientInfo', 'setPatientList']),
			async formSubmit() {
				let data = this.ruleForm
				if (data.certifiNum != 0) { // 其他证件类型不校验
					rules = rules.slice(0,1)
				}
				let { ret, msg } = validateForm(data, rules)
				if (ret) {
					this.showLoging()
					// 调接口
					let { code } = await updatePatient(data)
					if (code == 0) {
						/* 初始化就诊人接口 */
						let patRes = await getPatientList({ userId: this.ruleForm.id })
						/* 当前用户信息存在store中 */
						let patientInfo = this.patientInfo
						let { idCard, username } = data
						patientInfo = { ...patientInfo, idCard, username }
						this.login()
						this.setPatientInfo(patientInfo)
						this.setPatientList(patRes.data || [])
						this.successAlert('登录成功')
						if (this.type) {
							uni.switchTab({
								url: `/pages/tabBar/${this.type}/${this.type}`
							})
						} else {
							uni.navigateBack({ delta: 1 })
						}
					}
					uni.hideLoading()
				} else {
					this.errorAlert(msg)
				}
			},
			bindPickerChange(e) {
				this.ruleForm.cardType = e.target.value
			}
		}
	}
</script>

<style lang="scss">
	.complate-page {
		height: 100%;
		padding: 30rpx;
		.cus-form {
			background-color: #fff;
			>view {
				padding: 20rpx 0;
			}
			.cus-form-item {
				display: flex;
				align-items: center;
				font-size: 28rpx;
				padding: 0 50rpx;
				line-height: 62rpx;
				&:last-child {
					border-bottom: none;
				}
				.cus-title {
					color: #666;
					width: 170rpx;
				}
				.cus-input {
					
				}
			}
		}
		.remind {
			padding: 20rpx 0;
			font-size: 24rpx;
			.title {
				color: #666;
			}
			.single {
				color: #999;
			}
		}
		// 底部按钮
	}
	.uni-input-placeholder {
		font-size: 28rpx;
		color: #ccc;
	}
</style>

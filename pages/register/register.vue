<template>
	<view class="reg-page">
		<view class="cus-form border-box">
			<view class="border-box-inner gradient">
				<form>
					<view class="cus-form-item">
						<view class="cus-title">姓名</view>
						<input class="cus-input" v-model="ruleForm.userName" focus placeholder="请输入姓名" />
					</view>
					<view class="cus-form-item">
						<view class="cus-title">手机号</view>
						<input class="cus-input" v-model="ruleForm.phoneNumber" placeholder="请输入手机号" />
					</view>
					<view class="cus-form-item">
						<view class="cus-title">证件类型</view>
						<picker @change="bindPickerChange" :value="ruleForm.cardType" :range="array" range-key="name">
							<view class="uni-input">{{array[ruleForm.cardType].name}}</view>
						</picker>
					</view>
					<view class="cus-form-item">
						<view class="cus-title">身份证</view>
						<input class="cus-input" v-model="ruleForm.cardCode" placeholder="请输入身份证" />
					</view>
				</form>
				<view 
					class="btn-delete" 
					@tap="delPatient" 
					v-show="type === 'edit' && patientInfo.idCard != ruleForm.cardCode">
					解绑
				</view>
			</view>
		</view>
		<view class="remind">
			<view class="title">温馨提示</view>
			<view class="single">
				<view>1. 就诊人姓名, 证件号码将用于医馆建档信息匹配, 请输入正确的个人信息; 手机号将用于短信(电话)通知, 请输入正确的手机号</view>
				<view>2. 最多可添加5位就诊人</view>
			</view>
		</view>
		<view class="cus-footer">
			<button type="default" class="btn-footer" @tap="formSubmit">保存</button>
			<button type='primary' class="btn-footer" @tap="testData">测试数据</button>
		</view>
		
	</view>
</template>

<script>
	import validateForm from '@/common/utils/validateForm.js'
	import { addPatient, removePatient } from '@/common/api/patient.js'
	import {ChineseIDCardNumberGenerator,ChineseMobileGenerator,ChineseNameGenerator} from '@/common/utils/testdata.js'
	import { mapState, mapMutations } from 'vuex'
	let rules = [
		{ prop: 'userName' },
		{ prop: 'phoneNumber' },
		{ prop: 'cardCode' },
	]
	export default {
		data() {
			return {
				ruleForm: {
					userName: '',
					phoneNumber: '',
					cardCode: '',
					cardType: '0',
					userId: '',
					id: ''
				},
				type: 'add',
				array: [
					{ dicCode: "0", name: "身份证" },
					{ dicCode: "3", name: "其他（护照，港澳证，台胞证）" },
				]
			}
		},
		onLoad() {
			this.ruleForm.userId = this.patientInfo.id
			// 事件通道
			let eventChannel = this.getOpenerEventChannel()
			// 修改信息
			eventChannel.on('editPatientInfoFromManagePage', data => {
				if (data) {
					console.log(data)
					let { userName, phoneNumber, cardCode, cardType, userId, id } = data
					this.type = 'edit'
					this.ruleForm = { userName, phoneNumber, cardCode, cardType, userId, id }
					uni.setNavigationBarTitle({
					    title: '修改就诊人信息'
					});
				}
			})
		},
		computed: {
			...mapState(['patientInfo'])
		},
		methods: {
			...mapMutations(['addPatient', 'deletePatient']),
			async formSubmit() {
				let formRules = JSON.parse(JSON.stringify(rules))
				let data = this.ruleForm
				if (data.cardType != 0) { // 其他证件类型不校验
					formRules = rules.slice(0,2)
					if (!data.cardCode) {
						return this.errorAlert('证件号码不能为空')
					}
				}
				
				let { ret, msg } = validateForm(data, formRules)
				
				if (ret) {
					let res = await addPatient(data)
					if (res.code == 0) {
						/* 添加信息到store中 */
						this.addPatient({ obj: data, type: this.type })
						this.successAlert('添加成功')
						setTimeout(() => {
							uni.navigateBack({ delta: 1 })
						}, 500)
					} 
				} else {
					this.errorAlert(msg)
				}
			},
			delPatient() {
				let { id } = this.ruleForm
				let that = this
				uni.showModal({
					title: '确定要解绑就诊人?',
					async success(res) {
						if (res.confirm) {
							let data = { id }
							let res = await removePatient(data)
							if (res.code == 0) {
								that.successAlert('删除成功')
								/* 删除store中的记录 */
								that.deletePatient({ id })
								uni.navigateBack()
							} 
						}
					}
				})
			},
			bindPickerChange(e) {
				this.ruleForm.cardType = e.target.value
			},
			testData: function (){
			      this.ruleForm.userName = ChineseNameGenerator();
			      this.ruleForm.phoneNumber   = ChineseMobileGenerator();
			      this.ruleForm.cardCode = ChineseIDCardNumberGenerator();
			    },
		}
	}
</script>

<style lang="scss">
	.reg-page {
		height: 100%;
		padding: 30rpx;
		.cus-form {
			position: relative;
			>view {
				padding: 20rpx 0;
			}
			.btn-delete {
				position: absolute;
				top: 30rpx;
				right: 32rpx;
				padding: 0 10rpx;
				border-radius: 3px;
				border: 1px solid $s-color;
				line-height: 1.6;

			}
			.cus-form-item {
				display: flex;
				align-items: center;
				font-size: 30rpx;
				padding: 0 50rpx;
				line-height: 70rpx;
				&:last-child {
					border-bottom: none;
				}
				.cus-title {
					color: #666;
					width: 170rpx;
					font-weight: 700;
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

<template>
	<view class="complate-page">
		<view class="complate-header">
			<img src="@/static/pic.jpg" mode="aspectFill" class="cus-image"></img>
		</view>
		<view class="cus-form">
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
					<view class="cus-title">身份证</view>
					<input class="cus-input" v-model="ruleForm.idCard" placeholder="请输入身份证" />
				</view>
			</form>
		</view>
		<view class="cus-footer">
			<button type="default" class="cus-button" @tap="formSubmit">确认</button>
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
					idCard: '',
					id: ''
				},
				type: ''
			}
		},
		onLoad({ p, id, type }) {
			this.ruleForm.phoneNumber = p
			this.ruleForm.id = id
			this.type = type
		},
		computed: {
			...mapState('patientInfo')
		},
		methods: {
			...mapMutations(['setPatientInfo']),
			async formSubmit() {
				let { ret, msg } = validateForm(this.ruleForm, rules)
				if (ret) {
					let data = this.ruleForm
					// 调接口
					let { code, message } = await updatePatient(data)
					if (code == 0) {
						let patient = this.patientInfo
						/* 初始化就诊人接口 */
						let patRes = await getPatientList({ userId: patient.id })
						/* 当前用户信息存在store中 */
						this.setPatientInfo({ ...patient, ...data })
						if (this.type) {
							uni.switchTab({
								url: '/pages/tabBar/mine/mine'
							})
						} else {
							uni.navigateBack({ delta: 2 })
						}
					}
				} else {
					this.errorAlert(message)
				}
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
	.complate-page {
		height: 100%;
		background-color: #eee;
		.complate-header {
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
		}
		.cus-input {
			
		}
	}
</style>

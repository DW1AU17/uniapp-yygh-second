<template>
	<view class="reg-page">
		<view class="reg-header">
			<img src="@/static/pic.jpg" class="cus-image"></img>
		</view>
		<view class="cus-form">
			<form>
				<view class="cus-form-item">
					<view class="cus-title">姓名</view>
					<input class="cus-input" v-model="ruleForm.patName" focus placeholder="请输入姓名" />
				</view>
				<view class="cus-form-item">
					<view class="cus-title">手机号</view>
					<input class="cus-input" v-model="ruleForm.phoneNumber" placeholder="请输入手机号" />
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
		<view class="remind">
			<view class="title">温馨提示</view>
			<view class="single">
				<view>1. 就诊人姓名, 证件号码将用于医馆建档信息匹配, 请输入正确的个人信息</view>
				<view>2. 手机号将用于短信(电话)通知, 请输入正确的手机号</view>
				<view>3. 最多可添加5位就诊人</view>
			</view>
		</view>
	</view>
</template>

<script>
	import validateForm from '@/common/utils/validateForm.js'
	import { addPatient } from '@/common/api/patient.js'
	import { mapState, mapMutations } from 'vuex'
	let rules = [
		{ prop: 'patName' },
		{ prop: 'phoneNumber' },
		{ prop: 'idCard' },
	]
	export default {
		data() {
			return {
				ruleForm: {
					patName: '',
					phoneNumber: '',
					idCard: '',
					userId: ''
				}
			}
		},
		onLoad() {
			this.ruleForm.userId = this.patientInfo.id
		},
		computed: {
			...mapState(['patientInfo'])
		},
		methods: {
			...mapMutations(['addPatient']),
			async formSubmit() {
				let { ret, msg } = validateForm(this.ruleForm, rules)
				let data = this.ruleForm
				if (ret) {
					let res = await addPatient(data)
					if (res.code == 0) {
						/* 添加信息到store中 */
						addPatient(data)
						this.successAlert('添加成功')
						uni.navigateBack({ delta: 1 })
					} 
				} else {
					this.errorAlert(msg)
				}
			},
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
	.reg-page {
		height: 100%;
		background-color: #eee;
		.reg-header {
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
	.remind {
		padding: 20rpx;
		font-size: 26rpx;
		.title {
			color: $title-color;
		}
		.single {
			color: $grey-color;
		}
	}
</style>

<template>
	<view class="invoice-page">
		<view class="header flex">
			<!-- <view :class="{'active': type === 'company'}" @tap="type = 'company'">企业</view> -->
			<view :class="{'active': type === 'person'}" @tap="type = 'person'">个人</view>
		</view>
		<form-item :label="item.name" v-for="item in ruleForm" :key="item.name" class="form-item" :require="item.require">
			<input 
				v-model="form[item.model]" 
				:placeholder="item.placeholder" 
				:disabled="item.disabled" 
				@focus="item.focus ? handleFocusBlur() : null" 
				@blur="item.focus ? handleFocusBlur() : null" 
				/>
			<template v-slot:right>
				<view v-if="item.right" class="flex">
					<image v-if="clear" @tap="reset" src="../../static/ui/clear.png" mode="aspectFill" class="icon" />
					<text class="choose" @tap="getWechatInvoice">选择</text>					
				</view>
			</template>
		</form-item>
		<view class="cus-footer">
			<button class="lh2" type="primary" @tap="formSubmit">提交申请</button>
		</view>
	</view>
</template>

<script>
	import formItem from '@/components/form-item/form-item.vue'
	import regexp from '@/common/utils/regexp.js'
	import { validForm } from '@//common/utils/validateForm.js'
	import { makeInvoiceApi } from '@/common/api/invoice.js'
	
	export default {
		components: {
			formItem
		},
		data() {
			return {
				type: 'person',  // 企业company / 个人person
				nameFocus: false, // 用于重置按钮的显示
				copyForm: {},     // 用于重置表单的数据
				form: {
					chargeId:'',      // 收费id
					hospitalId: '',
					aplayType: '0',   // 申请类型 0个人 1企业
					invoiceType: '0',
					informType: '0',  // 发送类型 0手机 1邮箱 
					KpName: "管理员",
					buyerName: '',
					taxNumber: '',
					address: '',
					bankAccount: '',
					email: '',
					phone: '',
				}
			}
		},
		onLoad(option) {
			this.copyForm = JSON.parse(JSON.stringify(this.form))
			let { hospitalId, chargeId, patName: buyerName } = option
			this.form = { ...this.form, buyerName, hospitalId, chargeId }
		},
		methods: {
			getWechatInvoice() {
				let that = this
				uni.chooseInvoiceTitle({
				    success(res) {
						if (res.errMsg === "chooseInvoiceTitle:ok") {
							let { bankAccount, bankName, companyAddress: address, taxNumber, telephone: phone, title: buyerName } = res
							that.form = { ...that.form, bankAccount, bankName, address, taxNumber, phone, buyerName }
						}
				    }
				})
			},
			handleFocusBlur() {
				this.nameFocus = !this.nameFocus
			},
			reset() {
				this.form = this.copyForm
			},
			formSubmit() {
				console.log('提交申请')
				validForm(this.form, this.rules).then(async res => {
					console.log(res)
					if (typeof res === 'string') {
						this.errorAlert(res)
					} else {
						if (this.form.email) {
							this.form.informType = '1'
						}
						
						// 验证成功. 调接口
						let res = await makeInvoiceApi(this.form)
						
						// 返回上一页
						// uni.navigateBack();
					}
				})
			}
		},
		computed: {
			clear() {
				return this.nameFocus && this.form.buyerName.length
			},
			ruleForm() {
				/**
				 * require 必填项
				 * right 右侧插槽
				 * focus 聚焦失焦事件
				 * disabled 禁用
				 */ 
				return [
					{ name: '名称', placeholder: '个人', model: 'buyerName' },
					// { name: '名称', placeholder: '企业名称/个人', model: 'buyerName', right: true, focus: true, require: true },
					// { name: '税号', placeholder: '纳税人识别号', model: 'taxNumber', require: this.type == 'company' ? true : false },
					// { name: '单位地址', placeholder: '单位地址信息', model: 'address' },
					// { name: '银行账户', placeholder: '银行账户号码', model: 'bankAccount' },
					{ name: '邮箱', placeholder: '邮箱(选填)', model: 'email' },
					{ name: '手机', placeholder: '手机号码(选填)', model: 'phone' },
				]
			},
			rules() {
				return {
					buyerName: [
						{ required: true, message: '名称不能为空' },
					],
					taxNumber: [
						{ required: this.type == 'company' ? true : false, message: '税号不能为空' },
						// { regexp: regexp.taxNumber, message: '税号格式不正确' }
					]
				}
			}
		}
	}
</script>

<style lang="scss">
.invoice-page {
	padding: 20rpx 40rpx;
	background-color: #fff;
	.header {
		view {
			margin: 20rpx 80rpx;
			width: 100rpx;
			text-align: center;
			border-bottom: 4rpx solid transparent;
			&.active {
				color: #46b033;
				border-bottom: 4rpx solid #46b033;
			}
		}
	}
	.flex {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.form-item {
		border-bottom: 1px solid #ccc;
		.choose {
			margin-left: 10rpx;
		}
		&:last-child {
			border-bottom: none;
		}
	}
	.cus-footer {
		margin-top: 40rpx;
	}
}
.icon {
	width: 36rpx;
	height: 36rpx;
}

</style>

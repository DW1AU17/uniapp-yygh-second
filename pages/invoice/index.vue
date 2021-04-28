<template>
	<view class="invoice-page">
		<form-item :label="item.name" v-for="item in ruleForm" :key="item.name" class="form-item">
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
	</view>
</template>

<script>
	import formItem from '@/components/form-item/form-item.vue'
	let ruleForm = [
		{ name: '收费记录', placeholder: '请选择一条收费记录', model: 'charge', disabled: true },
		{ name: '名称', placeholder: '企业名称/个人', model: 'buyerName', right: true, focus: true },
		{ name: '税号', placeholder: '纳税人识别号', model: 'taxNumber' },
		{ name: '单位地址', placeholder: '单位地址信息', model: 'companyAddress' },
		{ name: '银行账户', placeholder: '银行账户号码', model: 'bankAccount' },
		{ name: '邮箱', placeholder: '邮箱(选填)', model: 'email' },
		{ name: '手机', placeholder: '手机号码(选填)', model: 'telephone' },
	]
	
	export default {
		components: {
			formItem
		},
		data() {
			return {
				ruleForm,
				nameFocus: false,
				copyForm: {},
				form: {
					charge:'',
					buyerName: '',
					taxNumber: '',
					companyAddress: '',
					bankAccount: '',
					email: '',
					telephone: '',
				}
			}
		},
		onLoad() {
			this.copyForm = JSON.parse(JSON.stringify(this.form))
		},
		methods: {
			getWechatInvoice() {
				let that = this
				uni.chooseInvoiceTitle({
				    success(res) {
				        console.log(res)
						if (res.errMsg === "chooseInvoiceTitle:ok") {
							let { bankAccount, bankName, companyAddress, taxNumber, telephone, title: buyerName } = res
							that.form = { ...that.form, bankAccount, bankName, companyAddress, taxNumber, telephone, buyerName }
						}
				    }
				})
			},
			handleFocusBlur() {
				this.nameFocus = !this.nameFocus
			},
			reset() {
				this.form = this.copyForm
			}
		},
		computed: {
			clear() {
				return this.nameFocus && this.form?.buyerName.length
			}
		}
	}
</script>

<style lang="scss">
.invoice-page {
	padding: 20rpx 40rpx;
	background-color: #fff;

	.form-item {
		border-bottom: 1px solid #ccc;
		.choose {
			margin-left: 10rpx;
		}
		.flex {
			display: flex;
			align-items: center;
		}
		&:last-child {
			border-bottom: none;
		}
	}
}
.icon {
	width: 36rpx;
	height: 36rpx;
}

</style>

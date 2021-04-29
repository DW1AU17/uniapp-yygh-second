<template>
	<view class="charge-list-page">
		<formItem label="门诊号" width="140rpx">
			<input type="text" v-model="form.patId">
			<button type="primary" size="mini" @tap="search">查询</button>
		</formItem>
		<picker @change="bindPickerChange" :value="index" :range-key="'sffName'" :range="array">
			<view class="picker">
			    <text class="mr30">医馆选择</text>
			    <text class="fwb">{{array[index].sffName}}</text>
			</view>
		</picker>
		<cus-table class="table" :table="table" :field="tableField" @rowClick="rowClick"/>
	</view>
</template>

<script>
	import { pavList } from '@/common/utils/index'
	import cusTable from '@/components/table/table.vue'
	import formItem from '@/components/form-item/form-item.vue'
	import selectModal from '@/components/select-modal/select-modal'
	import { getChargeListApi } from '@/common/api/invoice.js'
	
	let pavHandleList = pavList.filter(item => item.state === 0)
	export default {
		components: {
			cusTable,
			formItem,
			selectModal
		},
		data() {
			return {
				index: 3,
				array: pavHandleList,
				current: {}, // 当前选择馆
				form: {
					hospitalId: '',
					// stateDate: '2021-02-01',
					// endDate: '2021-02-31',
					patId: '651994',
				},
				table: [],
				tableField: [ // 表头
					{ field: '日期' }, { field: '姓名' }, { field: '金额' }, { field: '状态' }, { field: '操作' },
				]
			}
		},
		onLoad() {
			this.current = pavHandleList[this.index]
			this.form.hospitalId = pavHandleList[this.index].id
		},
		methods: {
			bindPickerChange(e) {
				this.index = e.detail.value
				this.current = this.array[this.index]
				this.form.hospitalId = this.current.id
			},
			async search() {
				if (!this.form.patId) {
					return this.errorAlert('请输入门诊号')
				}
				let res = await getChargeListApi(this.form)
				if (res.state === 0 && res.data.length) {
					this.table = res.data
				} else {
					this.errorAlert(res.msg || '无收费记录')
				}
			},
			rowClick(row) {
				let { id, hospitalId, patName } = row
				uni.navigateTo({
					url: `/pages/invoice/index?hospitalId=${hospitalId}&chargeId=${id}&patName=${patName}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.charge-list-page {
		background-color: #fff;
		padding: 20rpx;
		input {
			border: 1px solid #ccc;
			border-radius: 8rpx;
			padding-left: 10rpx;
			margin-right: 20rpx;
		}
		button {
			line-height: 1.9;
		}
		.table {
			margin-top: 20rpx;
		}
		.picker {
			font-size: 26rpx;
			color: #444;
			border-bottom: 1rpx solid #e5e5e5;
			line-height: 70rpx;
			padding: 0 20rpx;
		}
	}
</style>

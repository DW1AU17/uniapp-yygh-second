<template>
	<view class="table">
		<view class="tr thead">
			<view class="td" v-for="item in field" :key="item.field">{{ item.field }}</view>
		</view>
		<block class="tbody" v-if="table.length">
			<view class="tr" v-for="item in table" :key="item.id">
				<view class="td">{{ item['billDate'].slice(0,10) }}</view>
				<view class="td">{{ item['patName'] }}</view>
				<view class="td">{{ item['billTotalFee'] }}</view>
				<view class="td">{{ ['未开票', '已开票', '已冲票'][item['applyState']] }}</view>
				<view class="td">
					<text 
						class="blue"
						v-if="item['applyState'] === 0" 
						@tap="$emit('rowClick', item)"
						>开票</text>
					<text
						class="blue"
						v-if="item['applyState'] === 1" 
						@tap="$emit('rowClick', item)"
						>下载</text>
					<text
						class="blue"
						v-if="item['applyState'] === 1" 
						@tap="$emit('rowClick', item)"
						>查询</text>
				</view>
			</view>
		</block>
		<view v-else>
			
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			table: {
				type: Array
			},
			field: {
				type: Array
			}
		}
	}
</script>

<style lang="scss">
	.table {
		.thead {
			font-weight: 700;
		}
		.tr {
			display: grid;
			width: 100%;
			grid-template-columns: 26% 20% 18% 18% 18%;
			border-bottom: 1rpx solid #e5e5e5;
			color: #606266;
			font-size: 24rpx;
			.td {
				line-height: 60rpx;
				text-align: center;
			}
		}
	}
</style>

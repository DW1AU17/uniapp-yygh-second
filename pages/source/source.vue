<template>
	<view>
		<view class="source-top">
			<view class="head-portrait">
				<img src="@/static/doctor.png"> 
			</view>
			<view class="right">
				<view class="introduction">
					<text class="doc-name">蔡徐坤</text>
					<text class="post fs14">国家级男技师</text>
		<!-- 			<text class="doc-name">{{doctorInfo.sffName}}</text>
					<text class="post fs16">{{doctorInfo.sffProfessionalWrapper}}</text> -->
				</view>
				<view class="pavilion fs14">桐君堂 (环西馆) - 针灸推拿科</view>
			</view>
		</view>
		<view class="specialty fc666">
			<text class="fwb mr5 fc444">擅长: </text>
			<view :class="{'text-line2': summary}" @tap="changeStatus">{{doctorInfo.sffSummary || ''}}</view>
		</view>
		
		<view class="source-list">
			<view class="title fs15 fwb">排班列表</view>
			<table>
				<thead>
					<tr>
						<th></th>
						<th>上午</th>
						<th>下午</th>
						<th>夜门诊</th>						
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="ta-left">
							<view class="week">周三</view>
							<view class="date">12-25</view>
						</td>						
						<td>
							<text class="btn">总14剩14</text>
						</td>						
						<td>
							<text class="btn">总14剩14</text>
						</td>						
						<td>
							
						</td>						
					</tr>
					<tr>
						<td class="ta-left">
							<view class="week">周三</view>
							<view class="date">12-25</view>
						</td>						
						<td>
							<text class="btn">总14剩14</text>
						</td>						
						<td>
							
						</td>						
						<td>
							<text class="btn">总14剩14</text>
						</td>						
					</tr>
					<tr>
						<td class="ta-left">
							<view class="week">周三</view>
							<view class="date">12-25</view>
						</td>						
						<td>
							
						</td>						
						<td>
							<text class="btn">总14剩14</text>
						</td>						
						<td>
							<text class="btn">总14剩14</text>
						</td>						
					</tr>
				</tbody>
			</table>
			<!-- <view v-if="sourceList.length">
				<view v-for="item in sourceList" :key="item.schid" class="source-item">
					<view class="left fs16">
						<view>{{item.schdate}} {{item.week}} {{item.ampm == 2 ? "下午" : (item.ampm > 2 ? '夜门诊' : '上午')}}</view>
						<view class="fc666">桐君堂 (环西馆)</view>
					</view>
					<view class="right">
						<text class="money red fs14">{{item.totalFee + '.00'}}元</text>
						<button class="fs13" type="default" @tap="appointment(item)">预约</button>
					</view>
				</view>
			</view>
			<view v-else>
				当前医生暂无排班
			</view> -->
		</view>
		<view class="remind">
			<view class="title">预约挂号须知</view>
			<view class="single">
				<view>1. 预约号源的统一放号时间为提前一周下午3点整</view>
				<view>2. 预约成功后的记录, 可在"个人中心"下"挂号记录"中查询</view>
			</view>
		</view>
		<uni-popup ref="popupShare" type="share">
			<uni-popup-share title="号源列表" :numList="getNumList" @getOrderInfo="getOrderInfo"></uni-popup-share>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopupShare from '@/components/uni-popup-share/uni-popup-share.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import { getSchedulingList, getSourceList } from '@/common/api/register.js'
	export default {
		components: {
			uniPopupShare,
			uniPopup
		},
		data() {
			return {
				doctorInfo: {},
				summary: true,
				sourceList: [], // 排班信息
				getNumList: [], // 号源信息
				totalFee: '', // 挂号费
			}
		},
	    onLoad() {
			const eventChannel = this.getOpenerEventChannel()
			eventChannel.on('acceptDataFromOpenerPage', (data) => {
				this.doctorInfo = data.data
			})
			this.init()
		},
		methods: {
			changeStatus() {
				this.summary = !this.summary
			},
			// 获取排班
			async init() {
				let { sffId, sffName } = this.doctorInfo
				let data = {
					docId: sffId,
					docName: sffName,
					orgCode: "0571C2"
				}
				let res = await getSchedulingList(data)
				if (res.code == 0) {
					let resData = this.format(res.data)
					this.sourceList = resData
				}
			},
			// 获取号源信息
			getOrderInfo(data) {
				data = { ...data, totalFee: this.totalFee }
				uni.navigateTo({
					url: '/pages/order/order',
					success: res => {
						res.eventChannel.emit('orderPageAcceptData', { data })
					}
				})
			},
			// 点击预约
			async appointment(item) {
				let { schid: schId, orgId: orgCode, ampm } = item
				this.totalFee = item.totalFee
				let data = { ampm, orgCode, schId }
				let res = await getSourceList(data)
				this.getNumList = res.data
				this.$refs.popupShare.open()
			},
			format(data) {
				let resData = data.map(item => {
					item.schdate = this.formatDate(item.schdate)
					item.week = this.getWhatDay(item.schdate)
					return item
				})
				return resData
			},
			formatDate(a) {
				return a.substr(0, 4) + "-" + a.substr(4, 2) + "-" + a.substr(6, 2)
			},
			// 获取星期几
			getWhatDay(date) {
				date = new Date(date)
				switch(date.getDay()) {
					case 0: return '周日'
					case 1: return '周一'
					case 2: return '周二'
					case 3: return '周三'
					case 4: return '周四'
					case 5: return '周五'
					case 6: return '周六'
					default: return ''
				}
			}
		}
	}
</script>

<style lang="scss">
	$color-level2: #666;

	.source-top {
		background-color: #52627c;
		padding: 10px;
		display: flex;
		color: #fff;
		.head-portrait {
			width: 66px;
			height: 66px;
			border-radius: 10px;
			text-align: center;
			margin-right: 10px;
			background-color: #fff;
			img {
				width: 70%;
				height: 78%;
				margin-top: 6px;
			}
		}
		.right {
			flex: 1;
			.introduction {
				.doc-name {
					font-size: 17px;
					margin-right: 10px;
				}
				.post {
					color: #97a7bd;
					line-height: 1;
				}
			}
			.pavilion {
				color: #97a7bd;
			}
		}
	}
	.specialty {
		line-height: 1.3;
		padding: 10px;
		font-size: 14px;
		border-top: 1px solid #ccc;
		border-bottom: 1px solid #ccc;
	}
	
	.source-list {
		height: auto;
		padding: 5px 10px 0 10px;
		background-color: #fff;
		.title {
			margin-top: 10px;
		}
		table {
			width: 100%;
			font-size: 13px;
			text-align: center;
			color: $color-shallow;
			tbody {
				.date {
					color: $title-color;
				}
				.week {
					color: $base-color;
					font-size: 14px;
				}
				.btn {
					border: 1px solid #3986df;
					color: #3986df;
					border-radius: 4px;
					display: inline-block;
					padding: 0 20rpx;
				}
			}
		}
		.source-item{
			display: flex;
			padding: 10px 0;
			border-bottom: 1px solid #ccc;
			.left {
				line-height: 1.5;
			}
			.right {
				flex: 1;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				button {
					margin: 0 0 0 22px;
					padding: 2px 13px;
					line-height: 2;
					background-color: tomato;
					color: #fff;
				}
				.money {}
			}
		}
	}
	.remind {
		padding: 20rpx;
		font-size: 13px;
		.title {
			color: $title-color;
		}
		.single {
			color: $grey-color;
		}
	}
</style>

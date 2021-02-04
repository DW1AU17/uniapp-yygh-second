<template>
	<view class="source-page">
		<view class="border-box">
			<view class="border-box-inner">
				<view class="main">
					<view class="source-top gradient">
						<view class="head-portrait" v-if="!isInit">
							<view>
								<image v-if="doctorInfo.sffLoginNum == 0" src="/static/ui/0000.jpg" lazy-load/>
								<image 
									v-else
									:src="'https://www.zjgoshine.com:59001/resource/'+doctorInfo.sffLoginNum+'.jpg'"
									@error="handleError"
								>
							</view>
							<view class="doc-name">{{doctorInfo.sffName}}</view>
							<view class="pavilion">桐君堂 ({{doctorInfo.pavName}}) - {{doctorInfo.sffProfessionalWrapper}}</view>
							<view class="specialty">
								<view :class="{'text-line2': summary}" @tap="summary = !summary">{{doctorInfo.sffSummary || ''}}</view>
							</view>
						</view>
					</view>
					<!-- 排班列表 -->
					<view class="source-list gradient">
						<view class="tab" v-if="sourceTab.length">
							<view 
								v-for="item in sourceTab" 
								:key="item.depId" 
								:class="{'active': item.depId === currentTabIndex }"
								@tap="setCurrentInfo(item)"
							>
								{{item.depName}}
							</view>
						</view>
						<view class="table">
							<view class="thead">
								<view class="tr">
									<view class="left"></view>
									<view class="right">
										<view>上午</view>
										<view>下午</view>
										<view>夜门诊</view>	
									</view>				
								</view>
							</view>
							<view class="tbody" v-if="sourceListDate.length">
								<view class="tr" v-for="(dateItem) in sourceListDate" :key="dateItem">
									<view class="left">
										<view class="week">{{formatWeek(dateItem)}}</view>
										<view class="date">{{formatDate(dateItem)}}</view>
									</view>		
									<view class="right">
										<view v-for="(item, index) in sourceListDetail[dateItem]" :key="index">
											<text 
												class="btn" 
												v-if="item.state !== 1 && item.numremain != 0 && !item.numberReleasedFlag"
												@tap="appointment(dateItem, index)"
												>总{{item.numcount}}剩{{item.numremain}}</text>
											</text>
											<text v-if="item.state !== 1 && item.numremain != 0 && item.numberReleasedFlag">即将放号</text>
											<text class="btn disabled" v-else-if="item.state !== 1 && item.numremain == 0">已无号源</text>
											
										</view>	
									</view>
								</view>
							</view>
							<view v-else class="nothing">{{nothing}}</view>
						</view>
					</view>
					<view class="remind">
						<view class="title">温馨提示</view>
						<view class="single">
							<!-- <view>1. 预约号源的统一放号时间为提前一周下午3点整</view> -->
							<view> 预约成功后的记录, 可在"个人中心"下"挂号记录"中查询</view>
						</view>
					</view>
				</view>
				<view class="custom-picker" v-if="visible">
					<view class="mask" @tap="visible = false"></view>
					<view class="footer">
						<view class="btn">
							<text class="fc999" @tap="visible = false">取消</text>
							<text class="base-color" @tap="goOrderPage">确定</text>
						</view>
						<picker-view @change="chooseSource">
							<picker-view-column>
								<view class="item" v-for="item in getNumList" :key="item.id">
									<text class="mr30">{{item.visitTime}}</text>
									<text>{{item.serialNumber}}号</text>
								</view>
							</picker-view-column>
						</picker-view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { getSchedulingList, getSourceList, getDoctorInfo } from '@/common/api/register.js'
	import { getWeekFromDate, getPavName } from '@/common/utils/index'
	import { mapState, mapGetters } from 'vuex'
	export default {
		data() {
			return {
				visible: false,
				doctorInfo: {
					id: '',
					name: '',
					pavName: '',
					title: '',
					sffProfessionalWrapper: '',
					sffSummary: ''
				},
				summary: true,
				isInit: true,
				sourceTab: [],
				currentTabIndex: '',
				sourceListDate: [], // 排班日期 ['20200808', '20200808']
				sourceListDetail: {}, // 具体明细 { '20200808': [], ''20200808'': [] }
				getNumList: [], // 号源信息
				totalFee: '', // 挂号费
				nothing: '',
				option: {},
				currentIndex: 0, // 当前号源序号
			}
		},
	    onLoad(option) {
			if (option.q != undefined) {
				let resultObject = this.handleSourceOption(option.q)
				this.doctorInfo = resultObject
				this.option = resultObject
			} else {
				this.doctorInfo = option
				this.option = option
			}
			// const eventChannel = this.getOpenerEventChannel()
			// eventChannel.on('doctorInfoFromDocPanel', (data) => {
			// 	this.doctorInfo = data.data
			// })
			this.getDoctorInfo()
		},
		/**
		 * 分享页面
		 */
		onShareAppMessage() {
			let title = `${this.doctorInfo.sffName} - 桐君堂(${this.doctorInfo.pavName})`
			let that = this
			function handleUrl() {
				return Object.keys(that.option).reduce((prev, item, index) => {
					let symbol = index == 0 ? '' : '&'
					return prev + symbol + item + '=' + that.option[item]
				}, '')
			}
			return {
				title: title,
				path: `/pages/source/source?${handleUrl()}`,
				// imageUrl: '/static/logo.jpg'
			}
		},
		computed: {
			...mapState(['hasLogin'])
		},
		methods: {
			/**
			 * 获取排班
			 */
			async init() {
				this.showLoging()
				let { sffId: docId, sffName: docName, orgCode, hospitalId } = this.doctorInfo
				let data = { docId, docName, orgCode, hospitalId }
				let res = await getSchedulingList(data)
				if (res.code == 0 && Object.keys(res.data).length) {
					this.handleSourceListData(res.data)
				} else {
					this.nothing = '近一周都无号源'
				}
				uni.hideLoading()
			},
			/**
			 * 获取医生信息
			 */
			async getDoctorInfo() {
				if (this.doctorInfo != undefined) {
					let { hospitalId, id: doctorId, orgCode } = this.doctorInfo
					let data = { hospitalId, doctorId }
					let res = await getDoctorInfo(data)
					let obj = res.data || {}
					obj.orgCode = orgCode
					obj.pavName = getPavName(hospitalId)
					this.doctorInfo = { ...this.doctorInfo, ...obj }
					this.isInit = false
					this.init()
				}
			},
			/**
			 * 处理排班科室tab
			 */
			handleSourceListData(data) {
				let tab = []
				Object.keys(data).forEach(item => {
					tab.push({ 
						depName: item.split('-')[1], 
						depId: item.split('-')[0], 
						list: this.handleSouceItemList(data[item])
					})
				})
				this.sourceTab = tab
				this.setCurrentInfo(tab[0])
			},
			/**
			 * 设置当前显示信息
			 */
			setCurrentInfo(data) {
				this.currentTabIndex = data.depId
				this.sourceListDetail = data.list
				this.sourceListDate = Object.keys(data.list)
			},
			/**
			 * 处理具体排班数据
			 */
			handleSouceItemList(data) {
				let baseArray = ['1', '2', '3']
				Object.keys(data).forEach(item => {
					let newArr = []
					let ampmArray = data[item].map(innerItem => innerItem.ampm)
					baseArray.forEach((baseItem) => {
						if (!ampmArray.includes(baseItem)) {
							newArr[baseItem - 1] = { ampm: baseItem, state: 1 }
						} else {
							newArr[baseItem - 1] = { ...data[item].filter(ii => ii.ampm == baseItem)[0] }
						}
					})
					data[item] = newArr
				})
				return data
			},
			// 点击预约
			async appointment(a,b) {
				if (!this.hasLogin) {
					// #ifdef H5
						uni.navigateTo({
							url: '/pages/login/login'
						})
					// #endif
					// #ifdef MP-WEIXIN
						uni.navigateTo({
							url: '/pages/auth/auth?type='
						})
					// #endif
				} else {
					this.visible = true
					let item = this.sourceListDetail[a][b]
					this.showLoging()
					let { schid: schId, orgId: orgCode, ampm } = item
					this.totalFee = item.totalFee
					let data = { ampm, orgCode, schId }
					// 获取号源
					let res = await getSourceList(data)
					let arr = res.data || []
					this.getNumList = arr.map(item => {
						item.visitTime = item.visitTime.slice(0,5)
						return item
					})
					uni.hideLoading()
				}
			},
			/**
			 * 处理url数据
			 */
			handleSourceOption(obj) {
				let sourceString = decodeURIComponent(obj).split('?')[1]
				let optionArray = sourceString.split('&')
				let resultObject = {}
				optionArray.forEach(item => {
					let arr = item.split('=')
					resultObject[arr[0]] = arr[1]
				})
				return resultObject
			},
			chooseSource(e) {
				this.currentIndex = e.detail.value
			},	
			goOrderPage() {
				let data = { ...this.getNumList[this.currentIndex], totalFee: this.totalFee, orgCode: this.doctorInfo.orgCode }
				uni.navigateTo({
					url: '/pages/order/order',
					success: res => {
						res.eventChannel.emit('orderPageAcceptData', { data })
					}
				})
				this.visible = false
			},
			formatDate(a) {
				return a.substr(4, 2) + "-" + a.substr(6, 2)
			},
			formatWeek(a) {
				a = a.substr(0, 4) + "-" + a.substr(4, 2) + "-" + a.substr(6, 2)
				return getWeekFromDate(a)
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
			},
			handleError(e) {
				this.doctorInfo.sffLoginNum = '0000'
			}
		}
	}
</script>

<style lang="scss">
	$color-level2: #666;
	.source-page {
		padding: 20rpx 30rpx;
		height: calc(100% - 40rpx);
		overflow: auto;
		.border-box {
			background-color: #fff;
			.border-box-inner {
				.main {
					height: 100%;
					overflow: auto;
				}
			}
		}
	}

	.source-top {
		display: flex;
		.head-portrait {
			text-align: center;
			width: 100%;
			padding: 20rpx 34rpx;
			image {
				width: 160rpx;
				height: 160rpx;
				border-radius: 50%;
				border: 1px solid $s-color;
			}
			.doc-name {
				font-size: 36rpx;
			}
			.pavilion {
				color: #666;
				font-size: 26rpx;
			}
			.specialty {
				margin-top: 24rpx;
				line-height: 1.6;
				font-size: 24rpx;
				text-indent: 52rpx;
				text-align: left;
			}
		}
	}
	
	.source-list {
		height: auto;
		padding: 15rpx 34rpx 0 34rpx;
		.tab {
			display: flex;
			flex-shrink:0;
			line-height: 46rpx;
			overflow-x: auto;
			>view {
				margin-right: 15px;
				color: #999;
				white-space: nowrap;
				font-size: 24rpx;
				font-weight: 700;
				&.active {
					color: $s-color;
					border-bottom: 4rpx solid $s-color;
					font-size: 30rpx;
				}
			}
		}
		.table {
			width: 100%;
			font-size: 15px;
			color: $color-shallow;
			position: relative;
			.model {
				position: absolute;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
				background-color: yellow;
				z-index: 9;
			}
			.thead {
				color: #999;
			}
			.tbody {
				.tr {
					padding: 10rpx 0;
				}
			}
			.thead,
			.tbody {
				.tr {
					display: flex;
					border-bottom: 1px solid #eeedeb;
					.left {
						width: 90rpx;
						line-height: 1.5;
						font-size: 26rpx;
						color: #999;
					}
					.right {
						display: flex;
						align-items: center;
						flex: 1;
						line-height: 78rpx;
						>view {
							text-align: center;
							width: 33%;
						}
						.btn {
							border: 1px solid $s-color;
							color: $s-color;
							border-radius: 20rpx;
							display: inline-block;
							line-height: 40rpx;
							font-size: 26rpx;
							padding: 0 20rpx;
							&.disabled {
								border: none;
								color: #ccc;
							}
						}
					}
				}
			}
			.nothing {
				text-align: center;
				font-size: 36rpx;
				font-weight: 700;
				color: $title-color;
			}
		}
		.source-item {
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
		padding: 20rpx 34rpx;
		font-size: 26rpx;
		.title {
			color: $title-color;
		}
		.single {
			color: $grey-color;
		}
	}
	.custom-picker {
		position: fixed!important;
		bottom: 0;
		z-index: 999;
		right: 0;
		left: 0;
		top: 0;
		.mask {
			height: 100%;
			width: 100%;
			background-color: rgba(0,0,0,0.3);
		}
		.footer {
			position: absolute;
			height: 550rpx;
			width: 100%;
			bottom: 0;
			background-color: #fff;
			.btn {
				height: 80rpx;
				line-height: 80rpx;
				padding: 0 30rpx;
				display: flex;
				justify-content: space-between;
			}
			picker-view {
				height: 470rpx;
				.item {
				    line-height: 70rpx;
				    text-align: center;
					color: #000;
					.mr30 {
						margin-right: 60rpx;
					}
				}
			}
		}
	}
	
</style>

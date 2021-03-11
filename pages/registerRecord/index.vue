<template>
	<view class="reg-record-page">
		<selectModal @confirm="confirm">
			<view class="header gradient" @tap="goPatientManagePage">
				<view class="left">
					<text class="mr10">{{patInfo.userName}}</text>	
				</view>
				<view class="right"></view>
			</view>
		</selectModal>
		<view class="main" v-if="regList.length">
			<view class="border-box" v-for="item in regList" :key="item.id">
				<view class="border-box"> 
					<view class="reg-item border-box-inner gradient">
						<view class="top">
							<text>{{item.userName}}</text>
							<text>{{item.spName}}</text>
						</view>
						<view class="bottom">
							<view>
								<view class="item"><text>预约医生</text> {{item.doctorName}}</view>
								<view class="item"><text>预约科室</text> {{item.depName}}</view>
								<view class="item"><text>预约时间</text> {{item.visitDate}} {{item.visitTime}} / {{item.serialNumber}}号</view>
								<view class="item"><text>挂号类型</text> {{item.binName}}</view>
								<view class="item"><text>就诊地址</text> 桐君堂 · {{item.pavName}}</view>
							</view>
						</view>
						<view class="footer">
							<text v-if="item.appStatus == 0" @tap="cancelReg(item)">取消预约</text>
							<text @tap="orderAgain(item)">再次预约</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<nothing v-else>
			<template>无预约记录</template>
		</nothing>
	</view>
</template>

<script>
	import { getRegisterList, cancelRegister } from '@/common/api/register.js'
	import { getPavName } from '@/common/utils/index'
	import { mapState } from 'vuex'
	import nothing from '@/components/nothing/nothing'
	import selectModal from '@/components/select-modal/select-modal'
	export default {
		components: {
			nothing,
			selectModal
		},
		data() {
			return {
				patInfo: {}, // 当前选中
				regList: [], // 预约记录
				nothing: ''
			}
		},
		onReady() {
			this.initPatientInfo()
		},
		computed: {
			/**
			 * patientList 就诊人列表
			 */ 
			...mapState(['patientList', 'pavilion'])
		},
		methods: {
			confirm() {
				this.initPatientInfo()
			},
			// handleClick(item) {
			// 	this.patInfo = item
			// 	// 获取预约记录
			// 	this.getRegList() 
			// },
			/**
			 * 初始化默认就诊人
			 */ 
			async initPatientInfo() {
				let patInfo = this.patientList.filter(item => item.defaultSign == '1')
				this.patInfo = patInfo.length ? patInfo[0] : this.patientList[0]
				// 获取预约记录
				this.getRegList() 
				this.isLoading = true
			},
			/**
			 * 获取预约记录
			 */
			async getRegList() {
				this.showLoging()
				if (this.patInfo && this.patInfo.cardCode != undefined) {
					let { cardType, cardCode } = this.patInfo
					/* 获取预约记录接口 */
					let res = await getRegisterList({ cardType, cardCode })
					if (res.data) {
						let data = res.data.map(item => {
							item.pavName = getPavName(item.hospitalId)
							return item
						})
						// 倒序
						this.regList = res.data.reverse()
					} else {
						this.regList = []
						this.nothing = '暂无预约记录'
					}
				}
				uni.hideLoading()
			},
			/**
			 * 取消预约
			 * @param {Object} item 当前预约记录信息
			 */
			cancelReg(item) {
				let that = this
				uni.showModal({
					title: '确定要取消预约?',
					async success(res) {
						if (res.confirm) {
							let { patId, sourceDetailId, schedulingId, timeState, id: appointmentId, visitDate, orgId: orgCode } = item
							let data = { patId, sourceDetailId, schedulingId, timeState, appointmentId, visitDate, orgCode }
							/* 取消预约接口 */ 
							let res = await cancelRegister(data)
							if (res.code == 0) {
								that.successAlert('取消成功')
								let index = that.regList.findIndex(rItem => rItem.id === item.id)
								that.regList[index].appStatus = 1
								that.regList[index].spName = '患者取消'
							}
						}
					}
				})
			},
			/**
			 * 跳转到设置默认就诊人
			 */
			goPatientManagePage() {
				let that = this
				uni.navigateTo({
					url: '/pages/patientManage/index',
					events: {
						// 接受打开页面返回的数据
						getChoosePatientFromPatientManagePage: data => {
							that.patInfo = data
							that.getRegList()
						}
					} 
				})
			},
			/**
			 * 再次预约
			 */
			orderAgain({ doctorId, doctorName }) {
				console.log()
				let { id: hospitalId, orgCode } = this.pavilion
				uni.navigateTo({
					url: `/pages/source/source?orgCode=${orgCode}&hospitalId=${hospitalId}&id=${doctorId}&name=${doctorName}`
				})
			}
		}
	}
</script>

<style lang="scss">
	$base-color: #c49d6a;
	.reg-record-page {
		padding: 0 30rpx;
		.header {
			padding: 0 38rpx;
			height: 45px;
			color: #000;
			display: flex;
			justify-content: center;
			flex: 1;
			.left {
				flex: 1;
				line-height: 45px;
			}
			.right {
				width: 20px;
				height: 20px;
				background: url(../../static/ui/arrow-right.png) no-repeat;
				background-size: 20rpx 32rpx;
				margin-top: 30rpx;
			}
		}
		.main {
			font-size: 24rpx;
			color: #999;
			padding: 30rpx 0;
			.border-box {
				margin-bottom: 20rpx;
				.reg-item {
					padding: 10rpx 30rpx;
					.top {
						font-size: 34rpx;
						color: #000;
						text:nth-child(2) {
							float: right;
							color: $base-color;
							font-size: 30rpx;
						}
					}
					.bottom {
						font-size: 30rpx;
						>view {
							padding-top: 8rpx;
							.item {
								line-height: 1.7;
								
								text {
									margin-right: 32rpx;
								}
							}
						}
					}
					.footer {
						text-align: center;
						padding: 5rpx 0;
						text {
							font-size: 26rpx;
							line-height: 1.5;
							display: inline-block;
							padding: 2px 10px;
							border-radius: 3px;
							margin: 0 10rpx;
							margin-top: 5px;
							background-color: $base-color;
							color: #fff;
						}
					}
				}
				&:last-child {
					margin-bottom: 0;
				}
			}
		}
	}
</style>

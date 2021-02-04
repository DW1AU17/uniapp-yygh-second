<template>
	<view class="order-page">
		<view class="common-detail border-box">
			<view class="border-box-inner gradient">
				<view class="item">
					<text class="left">就诊地址</text>
					<text class="right">桐君堂 · 环西馆</text>
				</view>
				<view class="item">
					<text class="left">科室</text>
					<text class="right">{{orderInfo.depName}}</text>
				</view>
				<view class="item">
					<text class="left">医生</text>
					<text class="right">{{orderInfo.doctorName}}</text>
				</view>
				<view class="item">
					<text class="left">就诊时间</text>
					<text class="right base-color">{{orderInfo.schedulingDate}} {{orderInfo.visitTime}}</text>
				</view>
				<view class="item">
					<text class="left">就诊序号</text>
					<text class="right">{{orderInfo.serialNumber}}号</text>
				</view>
				<view class="item">
					<text class="left">挂号费用</text>
					<text class="right">{{orderInfo.totalFee}}.00元</text>
				</view>
			</view>
		</view>
		<view class="middle border-box">
			<view class="border-box-inner gradient">
				<view class="title">就诊人</view>
				<view class="patient common-detail" @tap="goPatManagePage">
					<view v-if="choosePat">选择就诊人</view>
					<view v-else>
						<view class="item">
							<text class="left">姓名</text>
							<text class="right">{{patientInfo.patName}}</text>
						</view>
						<view class="item">
							<text class="left">手机号</text>
							<text class="right">{{formatPhone(patientInfo.phoneNumber)}}</text>
						</view>
						<view class="item">
							<text class="left">身份证</text>
							<text class="right">{{formatIDCard(patientInfo.idCard)}}</text>
						</view>
					</view>
					<view class="arrow" :class="{'none': choosePat}"></view>
				</view>
			</view>
		</view>
		<view class="footer">
			<button type="primary" class="foot-button" @tap="commit">提交预约</button>
			<view class="read">
				<radio :checked="checked" color="#d09c5b" @tap="toggleCheck" />
				<view>我已阅读<text class="blue" @tap="goIndexPage">《预约须知》</text></view>
			</view>
		</view>
	</view>
</template>

<script>
	import { commitRegisterInfo } from '@/common/api/register.js'
	import { mapState, mapGetters } from 'vuex'
	export default {
		data() {
			return {
				orderInfo: {},
				patientInfo: {},
				choosePat: true, // 选择就诊人
				telephone: '0571-87099390',
				isloding: true,
				checked: false
			}
		},
		onLoad() {
			// 接受source页面传递的数据
			const eventChannel = this.getOpenerEventChannel()
			eventChannel.on('orderPageAcceptData', (data) => {
				this.orderInfo = data.data
			})
			this.getDefaultPatient()
		},
		computed: {
			/**
			 * patientList 患者列表
			 */
			...mapState(['patientList', 'hasLogin']),
			...mapGetters(['orgCode'])
		},
		methods: {
			goIndexPage() {
				this.checked = true
				uni.navigateTo({
					url: '/pages/index/index'
				})
			},
			toggleCheck() {
				this.checked = !this.checked
			},
			/**
			 * 获取默认就诊人
			 */
			getDefaultPatient() {
				this.showLoging()
				if (this.patientList.length) {
					this.choosePat = false
					let patInfo = this.patientList.filter(item => item.defaultSign === '1')
					this.patientInfo = patInfo.length ? patInfo[0] : this.patientList[0]
				}
				this.isloding = false
				uni.hideLoading()
			},
			/**
			 * 提交预约信息
			 */
			async commit() {
				if (!this.checked) {
					return this.errorAlert('请先阅读并勾上预约须知')
				}
				if (this.isLogin()) {
					let { timeState: ampm, id: regId, schedulingId: schId, schedulingDate: visitDate } = this.orderInfo
					let { platfromId: patId, idCard } = this.patientInfo
					if (!Object.keys(this.patientInfo).length) {
						return this.errorAlert('请选择就诊人')
					} else if (!patId) {
						return this.errorAlert('患者信息有误请联系馆里人员')
					}
					let orgCode = this.orderInfo.orgCode || this.orgCode
					let data = { numId: regId, orgCode, ampm, regId, patId, schId, visitDate, idCard }
					/* 提交预约信息 */ 
					let res = await commitRegisterInfo(data)
					if (res.code == 0) {
						this.successAlert('预约成功')
						setTimeout(() => {
							uni.switchTab({
								url: '/pages/tabBar/mine/mine'
							})
						}, 1000)
					}
				}
			},
			/**
			 * 打电话
			 */
			callPhone() {
				uni.makePhoneCall({
				    phoneNumber: this.telephone
				});
			},
			/**
			 * 选择就诊人页面
			 */
			goPatManagePage() {
				let that = this
				if (this.isLogin()) {
					uni.navigateTo({
						url: '/pages/patientManage/index?type=order',
						events: {
							// 接受打开页面返回的数据
							getChoosePatientFromPatientManagePage: data => {
								that.patientInfo = data
							}
						} 
					})
				}
			},
			/**
			 * 是否登录
			 */
			isLogin() {
				if (this.hasLogin) {
					return true
				} else {
					uni.navigateTo({
						url: '/pages/login/login'
					})
					return false
				}
			},
			formatIDCard(val) {
				return val ? `${val.slice(0,6)}********${val.slice(14)}` : ''
			},
			formatPhone(val) {
				return val ? `${val.slice(0,3)}****${val.slice(7)}` : ''
			}
		}
	}
</script>

<style lang="scss">
	.order-page {
		padding: 30rpx;
		height: calc(100% - 60rpx);
		color: #666;
		.border-box-inner {
			padding: 30rpx 0;
		}
		.common-detail {
			position: relative;
			.item {
				display: flex;
				padding: 0 30rpx;
				.left {
					width: 85px;
				}
				.right {
					flex: 1;
					text-align: right;
				}
			}	
			.arrow {
				width: 22rpx;
				height: 38rpx;
				background: url(../../static/ui/arrow-right.png) no-repeat;
				background-size: cover;
				position: absolute;
				top: 56rpx;
				right: 22rpx;
				&.none {
					right: 56rpx;
					top: 3rpx;
				}
			}
		}
		.middle {
			margin-top: 20rpx;
			.border-box-inner {
				>view {
					padding: 0 30rpx;
					.item {
						padding: 0;
						margin-right: 40rpx; 
					}
				}
			}
			.title {
				color: #000;
				font-size: 34rpx;
			}
		}
		
		.footer {
			// position: fixed;
			// bottom: 0;
			// left: 0;
			// right: 0;
			margin-top: 40rpx;
			height: 160rpx;
			.foot-button {
				width: 80%;
				height: 60rpx;
				line-height: 60rpx;
				border-radius: 30rpx;
				background-color: $s-color;
				font-size: 28rpx;
			}
			.read {
				text-align: center;
				margin-top: 10px;
				radio {
					transform: scale(0.9);
				}
				>view {
					display: inline-block;
					color: #666;
					.blue {
						color: #d09c5b;
					}
				}
			}			
		}
	}
</style>

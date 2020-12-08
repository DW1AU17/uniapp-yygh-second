<template>
	<view class="order-page">
		<view class="common-detail">
			<view class="item">
				<text class="left">就诊地址</text>
				<text class="right">桐君堂（环西馆）</text>
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
				<text class="right">{{orderInfo.schedulingDate}} {{orderInfo.visitTime}}</text>
			</view>
			<view class="item">
				<text class="left">就诊序号</text>
				<text class="right">{{orderInfo.serialNumber}}号</text>
			</view>
			<view class="item">
				<text class="left">挂号费用</text>
				<text class="right red">{{orderInfo.totalFee}}.00元</text>
			</view>
		</view>
		<view class="title">就诊人</view>
		<view class="patient common-detail">
			<view v-if="choosePat" @tap="goPatManagePage">选择就诊人</view>
			<view v-else>
				<view class="item">
					<text class="left">姓名</text>
					<text class="right">{{patientInfo.patName}}</text>
				</view>
			<!-- 	<view class="item">
					<text class="left">手机号</text>
					<text class="right">{{patientInfo.phoneNumber}}</text>
				</view> -->
				<view class="item">
					<text class="left">身份证</text>
					<text class="right">{{patientInfo.idCard}}</text>
				</view>
				<view class="arrow">
					<img src="@/static/jt.png" @tap="goPatManagePage"></img>
				</view>
			</view>
		</view>
		<view>
			<button type="primary" class="foot-button" @tap="commit">确定</button>
		</view>
		<view class="mind">挂号须知: 预约挂号就诊当日不能退号，如有疑问请拨打<text @tap="callPhone">telephone</text></view>
	</view>
</template>

<script>
	import { commitRegisterInfo } from '@/common/api/register.js'
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				orderInfo: {},
				patientInfo: {},
				choosePat: true, // 选择就诊人
				telephone: '0571-87099390'
			}
		},
		onLoad() {
			// 接受source页面传递的数据
			const eventChannel = this.getOpenerEventChannel()
			eventChannel.on('orderPageAcceptData', (data) => {
				this.orderInfo = data.data
			})
		},
		onShow() {
			this.getDefaultPatient()
		},
		computed: {
			/**
			 * patientList 患者列表
			 */
			...mapState(['orgCode', 'patientList'])
		},
		methods: {
			/**
			 * 获取默认就诊人
			 */
			getDefaultPatient() {
				if (patientList.length) {
					this.choosePat = false
					this.patientInfo = patientList[0] // 缺一个默认就诊人的字段
				}
			},
			/**
			 * 提交预约信息
			 */
			async commit() {
				let { timeState: ampm, id: regId, schedulingId: schId, schedulingDate: visitDate } = this.orderInfo
				let { patId } = this.patientInfo
				if (!Object.keys(this.patientInfo).length) {
					return this.errorAlert('请选择就诊人')
				} else if (!patId) {
					return this.errorAlert('患者信息有误请联系馆里人员')
				}
				let data = { numId: regId, orgCode: this.orgCode, ampm, regId, patId, schId, visitDate }
				/* 提交预约信息 */ 
				let res = await commitRegisterInfo(data)
				if (res.code == 0) {
					this.successAlert(res.message)
					setTimeout(() => {
						uni.switchTab({
							url: '/pages/tabBar/mine/mine'
						})
					}, 1000)
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
				uni.navigateTo({
					url: '/pages/patientManage/index?type=order',
					events: {
						// 接受打开页面返回的数据
						getChoosePatientFromPatientManagePage: data => {
							that.patientInfo = data
						}
					} 
				})
			},
		}
	}
</script>

<style lang="scss">
	.order-page {
		padding: 10px;
		font-size: 16px;
		.common-detail {
			border: 1px solid #ccc;
			background: #fff;
			padding: 10px;
			border-radius: 10px;
			position: relative;
			.item {
				display: flex;
				.left {
					width: 85px;
				}
				.right {
					flex: 1;
					
				}
			}	
			.arrow {
				position: absolute;
				top: 50%;
				right: 0;
				img {
					width: 25px;
					height: 18px;
					transform: rotate(-90deg) translateX(50%);
				}
			}
		}
		.title {
			text-align: center;
			margin-top: 10px;
			font-weight: 700;
		}
		.patient {}
		.mind {
			margin-top: 10px;
			line-height: 1.2;
			color: #444;
			padding: 10px 10px;
			font-size: 16px;
		}
		.foot-button {
			background-color: #7F8FEF;
			margin-top: 15px;
		}
	}
</style>

<template>
	<view class="reg-record-page">
		<view class="header">
			<view class="left">
				<text class="mr10 fs16">蔡徐坤</text>
				<text class="fs13">W591245678</text>				
			</view>
			<uni-icons class="right" color="#fff" size="18" type="arrowright" />
			
			<!-- <view v-for="item in patientList" :key="item.id" @tap="handleClick(item)">{{item.patName || item.username}}</view> -->
		</view>
		<view class="main">
			<view class="reg-item">
				<view class="top">
					<text class="fs18 fwb">蔡徐坤 00000008</text>
					<text class="fs18 fc666">已预约</text>
				</view>
				<view class="bottom fs16 fc666">
					<view>
						<view>预约医生: 谢广坤</view>
						<view>预约时间: 2020-02-02 08:30:00 / 3号</view>
						<view>挂号类型: 特需100</view>
						<view>就诊地址: 桐君堂（环西馆）</view>
					</view>
				</view>
				<view class="footer">
					<text @tap="cancelReg(item)">取消预约</text>
				</view>
			</view>
			<view v-if="regList.length">
				<view class="reg-item" v-for="item in regList" :key="item.id">
					<view class="top">
						<text class="fs18 fwb">{{patInfo.patName || patInfo.username}} {{item.patCardNum}}</text>
						<text class="fs18 fc666">{{formatAppStatus(item.appStatus)}}</text>
					</view>
					<view class="bottom fs16 fc666">
						<view>
							<view>预约医生: {{item.doctorName}}</view>
							<view>预约时间: {{item.visitDate}} {{item.visitTime}} / {{item.serialNumber}}号</view>
							<view>挂号类型: {{item.binName}}</view>
							<view>就诊地址: 桐君堂（环西馆）</view>
						</view>
					</view>
					<view class="footer" v-if="item.appStatus == 0">
						<text @tap="cancelReg(item)">取消预约</text>
					</view>
				</view>
			</view>
			<view v-else>
				无预约记录
			</view>
		</view>
	</view>
</template>

<script>
	import { getRegisterList, cancelRegister } from '@/common/api/register.js'
	import { mapState } from 'vuex'
	import uniIcons from "@/components/uni-icons/uni-icons"
	export default {
		components: {
			uniIcons
		},
		data() {
			return {
				patInfo: {}, // 当前选中
				regList: [], // 预约记录
			}
		},
		onLoad() {
			this.initPatientInfo()
		},
		computed: {
			/**
			 * patientList 就诊人列表
			 */ 
			...mapState(['patientList'])
		},
		methods: {
			handleClick(item) {
				this.patInfo = item
				// 获取预约记录
				this.getRegList() 
			},
			/**
			 * 初始化默认就诊人
			 */ 
			async initPatientInfo() {
				this.patInfo = this.patientList[0] // 缺少一个默认就诊人字段
				// 获取预约记录
				this.getRegList() 
			},
			/**
			 * 获取预约记录
			 */
			async getRegList() {
				if (this.patInfo.idCard) {
					let { idCard, patientId: patCardNum } = this.patInfo
					/* 获取预约记录接口 */
					let res = await getRegisterList({ idCard, patCardNum })
					this.regList = res.data
				}
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
							let { orgId: orgCode, appId: regId, visitDate, password: pass } = item
							let data = { orgCode, regId, visitDate, pass }
							/* 取消预约接口 */ 
							let res = await cancelRegister(data)
							if (res.code == 0) {
								that.successAlert(res.message)
								that.getRegList()
							}
						}
					}
				})
			},
			/**
			 * 格式化状态
			 */
			formatAppStatus(index) {
				let arr = ['已预约', '已过期', '已取号', '患者取消', '院内取消']
				return arr[index]
			}
		}
	}
</script>

<style lang="scss">
	.reg-record-page {
		.header {
			padding: 0 10px;
			border-bottom: 1px solid #ccc;
			margin-bottom: 10px;
			height: 45px;
			background-image: linear-gradient(141deg,#67b3b3 0%,#1fc8db 51%,#2cb5e8 81%);
			color: #fff;
			display: flex;
			justify-content: center;
			.left {
				flex: 1;
				line-height: 45px;
			}
			.right {
				line-height: 45px;
			}
		}
		.main {
			padding: 10px;
			.reg-item {
				padding: 10px;
				border: 1px solid #ccc;
				border-radius: 10px;
				margin-bottom: 10px;
				background-color: #fff;
				.top {
					text:nth-child(2) {
						float: right;
					}
				}
				.footer {
					border-top: 1px solid #ccc;
					margin-top: 5px;
					text-align: right;
					text {
						display: inline-block;
						// border: 1px solid #ccc;
						padding: 0px 10px;
						border-radius: 3px;
						margin-top: 5px;
						background-color: #d40909;
						color: #fff;
					}
				}
			}
		}
	}
</style>

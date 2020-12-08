<template>
	<view class="patient-page">
		<view>
			<view 
				class="common-detail" 
				v-for="item in patientList" 
				:key="item.id"
			>
				<view class="det-left" @tap="choosePatient(item)">
					<view class="item">
						<text class="left">姓名</text>
						<text class="right">{{item.patName}}</text>
					</view>
					<view class="item">
						<text class="left">身份证</text>
						<text class="right">{{item.idCard}}</text>
					</view>
				</view>
				<view class="det-right" v-if="item.idCard != idCard">
					<view @tap="delPatient(item)">解绑</view>
				</view>
			</view>
		</view>
		<view class="footer">
			<button type="default" @tap="goAddPage">添加就诊人</button>
		</view>
	</view>
	
</template>

<script>
	import { removePatient } from '@/common/api/patient.js'
	import { mapState, mapMutations } from 'vuex'
	export default {
		data() {
			return {
				patientList: [],
				type: '',  // 判断是从哪个页面过来的新建
				idCard: '',
				eventChannel: '', // 事件通道
			}
		},
		onLoad({ type }) {
			this.eventChannel = this.getOpenerEventChannel()
			let { idCard } = this.patientInfo
			this.idCard = idCard
			this.type = type
		},
		computed: {
			...mapState(['patientInfo', 'patientList'])
		},
		methods: {
			...mapMutations(['deletePatient']),
			/**
			 * 删除就诊人
			 */
			async delPatient({ userId, patientId }) {
				let data = { userId, patientId, handlerType: '2' }
				let res = await removePatient(data)
				if (res.code == 0) {
					this.successAlert('删除成功')
					/* 删除store中的记录 */
					this.deletePatient({ userId })
				} 
			},
			/**
			 * 设置默认就诊人
			 */
			setDefaultPatient() {
				// 改变默认就诊人状态
				// 更新store中的就诊人列表信息
			},
			/**
			 * 选择就诊人
			 */
			choosePatient(item) {
				// 个人中心进来的点击就无效果
				if (this.type == 'mine') return  
				// order页面进来的返回当前点击就诊人的数据
				// 返回给(order page)上一页数据
				this.eventChannel.emit('getChoosePatientFromPatientManagePage', item)
				uni.navigateBack()
			},
			/**
			 * 添加就诊人
			 */
			goAddPage() {
				uni.navigateTo({
					url: '/pages/register/register'
				})
			}
		}
	}
</script>

<style lang="scss">
	.patient-page {
		padding: 10px;
		.common-detail {
			border: 1px solid #ccc;
			background: #fff;
			padding: 10px;
			border-radius: 10px;
			margin-bottom: 10px;
			display: flex;
			align-items: center;
			&.active {
				border-color: red;
			}
			.det-left {
				flex: 1;
				.item {
					display: flex;
					.left {
						width: 70px;
					}
					.right {
						flex: 1;
					}
				}
			}
			.det-right {
				>view {
					background-color: red;
					border: 1px solid red;
					border-radius: 3px;
					padding: 0 10px;
					color: #fff;
				}
			}
		}
		.footer {
			button {
				background-color: #7F8FEF;
				color: #fff;
			}
		}
	}
</style>

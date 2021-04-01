<template>
	<view class="patient-page">
		<!-- <selectModal @confirm="confirm"></selectModal> -->
		<view class="page-top">
			<view 
				class="common-detail border-box" 
				v-for="(item, index) in patientList" 
				:key="item.id"
				v-if="item.state != 1 || (item.cardCode == patientInfo.idCard)"
			>
				<view class="border-box-inner gradient">
					<view class="top">
						<view class="det-left" @tap="choosePatient(item)">
							<view class="item">
								<!-- <text class="left">姓名</text> -->
								<text class="right fs36 fc000">{{item.userName}}</text>
							</view>
							<view class="item">
								<!-- <text class="left">身份证</text> -->
								<text class="right fc999 fs24">{{formatIDCard(item.cardCode)}}</text>
							</view>
							<view class="item">
								<!-- <text class="left">电话</text> -->
								<text class="right fc999 fs24">{{formatPhone(item.phoneNumber)}}</text>
							</view>
						</view>
					</view>
					<view class="bottom">
						<!-- <view class="btn" @tap="delPatient(item)" v-if="item.idCard != idCard">解绑</view> -->
						<image src="/static/ui/edit.png" @tap="editPatientInfo(item)"></image>
						<view class="switch">
							<radio 
								color="#bb8d4c"
								:checked="item.defaultSign === '1'" 
								@tap="item.defaultSign !== '1' ? setDefaultPatient(index) : ''" 
							/>
							<!-- <radio/> -->
							<!-- <switch/> -->
							<text class="fs15 fc999">默认就诊人</text>
						</view>
					</view>
				</view>
			</view>
			<button type="default" class="btn-footer" @tap="goAddPage">添加就诊人 <text class="fs16">(最多5位)</text></button>
		</view>
		<view class="footer"></view>
	</view>
	
</template>

<script>
	import { removePatient, setDefaultPatient, getPatientList } from '@/common/api/patient.js'
	import { mapState, mapMutations } from 'vuex'
	import { pavList } from '@/common/utils/index'
	// import selectModal from '@/components/select-modal/select-modal'
	export default {
		components: {
			// selectModal
		},
		data() {
			return {
				type: '',  // 判断是从哪个页面过来的新建
				idCard: '',
				eventChannel: '', // 事件通道
			}
		},
		async onLoad({ type }) {
			this.eventChannel = this.getOpenerEventChannel()
			let { idCard } = this.patientInfo
			this.idCard = idCard
			this.type = type
			this.initPavilion()
			this.getPatientList()
		},
		computed: {
			/**
			 * patientInfo 当前登录人
			 * patientList 就诊人列表
			 */
			...mapState(['patientInfo', 'patientList', 'pavilion'])
		},
		methods: {
			// confirm() {
			// 	this.getPatientList()
			// },
			/**
			 * deletePatient       // 删除就诊人
			 * setDefaultPatToList // 设置默认就诊人
			 * setPatientList      // 设置就诊人列表
			 * setPavilion         // 设置医馆
			 */
			...mapMutations(['deletePatient', 'setDefaultPatToList', 'setPatientList', 'setPavilion']),
			/**
			 * 初始化医馆选择 
			 */
			initPavilion() {
				// 如果store中不存在, 则默认取第一个
				if (!this.pavilion.orgCode) {
					this.setPavilion(pavList[3])
				}
			},
			/**
			 * 获取接诊人列表
			 */
			async getPatientList() {
				this.showLoging()
				let res = await getPatientList({ userId: this.patientInfo.id })
				if (res.code === 0) {
					this.setPatientList(res.data)
				}
				uni.hideLoading()
			},
			/**
			 * 删除就诊人
			 */
			async delPatient({ id }) {
				let that = this
				uni.showModal({
					title: '确定要解绑就诊人?',
					async success(res) {
						if (res.confirm) {
							let data = { id }
							let res = await removePatient(data)
							if (res.code == 0) {
								that.successAlert('删除成功')
								/* 删除store中的记录 */
								that.deletePatient({ id })
							} 
						}
					}
				})
			},
			/**
			 * 设置默认就诊人
			 */
			async setDefaultPatient(index) {
				let { id: relationId } = this.patientList[index]
				// 改变默认就诊人状态 
				let data = { userId: this.patientInfo.id, relationId }
				let res = await setDefaultPatient(data)
				
				if (res.code === 0) {
					this.showLoging()
					let prev = this.patientList.filter(item => item.defaultSign === '1')
					// 更新store中的就诊人列表信息
					this.setDefaultPatToList({ prevId: prev.length ? prev[0].id : '', currId: relationId })
					uni.hideLoading()
					this.successAlert('设置成功')
				}
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
				if (this.patientList.length === 5) {
					this.errorAlert('最多添加5位就诊人')
				} else {
					uni.navigateTo({
						url: '/pages/register/register'
					})
				}
			},
			/**
			 * 修改就诊人
			 */
			editPatientInfo(item) {
				uni.navigateTo({
					url: '/pages/register/register?type=edit',
					success: res => {
						res.eventChannel.emit('editPatientInfoFromManagePage', item)
					}
				})
			},
			formatIDCard(val) {
				let card = ''
				if (val) {
					if (val.length == 18) {
						card = `${val.slice(0,3)}********${val.slice(14)}`
					} else {
						card = `${val.slice(0,3)}********${val.slice(val.length-3)}`
					}
				}
				return card
			},
			formatPhone(val) {
				return val ? `${val.slice(0,3)}****${val.slice(7)}` : ''
			}
		}
	}
</script>

<style lang="scss">
	// 覆盖默认样式
	uni-radio {
		/deep/ .uni-radio-input {
			border: 1px solid $s-color;
			border-radius: 8%;
			margin-left: -20rpx;
			&.uni-radio-input-checked {
				background-color: $s-color!important;
				border-color: $s-color!important;
			}
		}
	}
	.patient-page {
		padding: 30rpx;
		height: calc(100% - 60rpx);
		.page-top {
			height: 100%;
			overflow: auto;
		}
		.common-detail {
			background: #fff;
			border-radius: 12rpx;
			margin-bottom: 20rpx;
			.border-box-inner {
				padding: 30rpx 50rpx;
			}
			.top {
				display: flex;
				align-items: center;
				.det-left {
					flex: 1;
					.item {
						display: flex;
						line-height: 50rpx;
						.left {
							color: #999;
							font-size: 26rpx;
							width: 100rpx;
							margin-right: 30rpx;
						}
						.right {
							flex: 1;
						}
					}
				}
				.det-right {}
			}
			.bottom {
				text-align: right;
				margin-bottom: 0;
				height: 40rpx;
				>view {
					display: inline-block;
				}
				image {
					width: 41rpx;
					height: 41rpx;
				}
				.btn {
					border: 1px solid $s-color;
					border-radius: 3px;
					padding: 0 10px;
					color: $s-color;
					// #ifdef H5
					margin-right: 10px;
					// #endif
				}
				.switch {
					float: left;
					switch {
						transform: scale(0.7);
					}
					radio {
						transform: scale(0.8);
						margin-left: -2rpx;
						// #ifdef H5
						margin-left: 14rpx;
						// #endif
					}
				}
			}
		}
		.footer {
			button {
				background-color: #d36e68;
				color: #fff;
				line-height: 2.2;
			}
		}
	}
</style>

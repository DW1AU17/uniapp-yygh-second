<template>
	<view class="doctor-page">
		<view class="top">
			<view class="date">
				<view class="all" :class="{'active': currentDate === ''}" @tap="getAllData">
					<view>
						<view class="lh1">全部</view>
						<view class="lh1">日期</view>
					</view>
				</view>
				<view class="right">
					<date-panel
						v-for="item in dateList"
						:key="item.id"
						:date="item"
						:custom-class="activeDate(item.id)" 
						@getDoc="getDoctorList"
					/>
					
				</view>
			</view>
			<search placeholder="请输入医生姓名" :mask="true" :orgcode="orgCode" :hospitalId="hospitalId"/>
		</view>
		
		<scroll-view class="doctor-list" :scroll-y="true">
			<view v-if="docList.length" class="doc-box">
				<doctor-panel 
					v-for="item in docList" 
					:key="item.id" 
					:source="item"
					:orgCode="orgCode"
					:hospitalId="hospitalId"
					@editImgUrl="editImgUrl"
					/>
			</view>
			<nothing v-else-if="isLoading">
				<template>暂无医生</template>
			</nothing>
		</scroll-view>
		
	</view>
</template>

<script>
	import { getDoctorList } from '@/common/api/register.js'
	import search from '@/components/uni-search-bar/uni-search-bar'
	import doctorPanel from '@/components/doctor-panel/doctor-panel'
	import datePanel from './components/date-panel'
	import nothing from '@/components/nothing/nothing'
	import { getDates, CheckImgExists } from '@/common/utils/index.js'
	import { mapGetters  } from 'vuex'
	export default {
		components: {
			search,
			doctorPanel,
			datePanel,
			nothing
		},
		data() {
			return {
				dateList: [], 
				docList: [],
				currentDate: '',
				deptId: '', // 科室id
				depName: '',  // 科室名
				orgCode: '', 
				hospitalId: '',
				isLoading: false
			}
		},
		async onLoad({ deptId, name, orgCode, hospitalId }) {
			this.deptId = deptId 
			this.depName = name
			this.hospitalId = hospitalId
			this.orgCode = orgCode
			this.initDates()
			this.getAllData()
		},
		// onReachBottom() {
		// 	console.log('触底了')
		// },
		computed: {
			// ...mapGetters(['orgCode', 'hospitalId'])
		},
		methods: {
			// 获取医生列表
			async getDoctorList({ searchDate, id }) {
				this.currentDate = id
				let data = { deptId: this.deptId, searchDate, hospitalId: this.hospitalId }
				this.showLoging()
				let res = await getDoctorList(data)
				if ((res.code === 0 && !res.data.length) || res.code === 1) {
					this.docList = []
					this.isLoading = true
				} else {
					this.docList = await this.handleDoctorItemData(res.data)
				}
				setTimeout(() => {
					uni.hideLoading()
				}, 500)
			},
			/**
			 * 获取所有数据 
			 */
			getAllData() {
				this.getDoctorList({ searchDate: '', id: '' })
			},
			/**
			 * 初始化日期
			 */
			initDates() {
				let dateList = getDates(15).slice(1)
				this.currentDate = dateList[0].id
				this.dateList = dateList
			},
			/**
			 * 处理医生项数据
			 */
			async handleDoctorItemData(data) {
				let resObj = []
				data.forEach(item => {
					let obj = {}		
					obj = {
						img: item.sffLoginNum,
						id: item.sffId,
						name: item.sffName, // 姓名
						title: item.sffProfessionalWrapper, // 职称
						introduce: item.sffSummary || '', // 介绍
						depName: this.depName
					}
					// CheckImgExists(`https://www.zjgoshine.com:9001/resource/${item.sffLoginNum}.jpg`)
					// 	.then(e => {obj.img = item.sffLoginNum})
					// 	.catch(e => {obj.img = '0000'})
					resObj.push(obj)
				})
				return resObj
			},
			activeDate(id) {
				return id === this.currentDate ? 'active' : ''
			},
			editImgUrl(data) {
				let index = this.docList.findIndex(item => item.name === data.name)
				this.docList[index].img = data.url
			}
		}
	}
</script>

<style lang="scss">
	@mixin base-flex {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.lh1 {
		line-height: 1.2;
	}
	.doctor-page {
		.top {
			// #ifdef MP-WEIXIN
			height: 270rpx;
			// #endif
			// #ifdef H5
			height: 240rpx;
			// #endif
			/* 日期 */
			.date {
				display: flex;
				padding: 18rpx 0;
				height: 156rpx;
				.all {
					width: 100rpx;
					@include base-flex;
					border-right: 1px solid $bc-color;
					color: #999;
					&.active {
						color: $color-primary;
					}
				}
				.right {
					flex: 1;
					display: flex;
					align-items: center;
					overflow-x: auto;
					width: 0;
					margin: 0 10px;
					
				}
			}
		}
		/* 医生列表 */
		.doctor-list {
			height: calc(100% - 290rpx);
			.doc-box {
				margin: 0 20rpx;
			}
			.nothing {
				color: $title-color;
				text-align: center;
				margin-top: 20px;
			}
		}
	}
</style>

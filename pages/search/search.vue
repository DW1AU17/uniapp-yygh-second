<template>
	<view class="search-page">
		<!-- <search @input="debounce(search, $event)" placeholder="请输入医生姓名"/> -->
		<search class="search" @confirm="search" :focus="true" placeholder="请输入医生姓名"/>
		<view class="history" v-if="historyList.length">
			<view class="title">
				<text>历史记录</text>
				<text class="delete" @tap="deleteSearchList"></text>
			</view>
			<view class="his-item">
				<text v-for="item in historyList" :key="item" @tap="search(item)">{{item}}</text> 
			</view>
		</view>
		<view v-if="isSource"></view>
		<view v-else class="search-result">
			<view class="sub-list" v-if="subList.length">
				<view class="title">- 科室 -</view>
				<view class="border-box">
					<view class="border-box-inner">	
						<view
							class="sub-item gradient" 
							v-for="item in subList" 
							:key="item.depName"
							@tap="goDoctorPage(item)"
						>
							{{item.depName}}
						</view>
					</view>
				</view>
			</view>
			<view class="doctor-list" v-if="doctorList.length">
				<view class="title">- 医生 -</view>
				<doctorPanel 
					v-for="item in doctorList" 
					:key="item.id" 
					:source="item"
					:orgCode="orgCode"
					:hospitalId="hospitalId"
					@editImgUrl="editImgUrl"
				/>
			</view>
		</view>
	</view>
</template>

<script>
	import search from '@/components/uni-search-bar/uni-search-bar'
	import doctorPanel from '@/components/doctor-panel/doctor-panel'
	import { searchDoctor } from '@/common/api/register.js'
	import { mapGetters } from 'vuex'
	export default {
		components: {
			search,
			doctorPanel
		},
		data() {
			return {
				isSource: true, // 初始状态
				doctorList: [], // 医生列表
				subList: [], // 科室列表
				historyList: [], // 历史记录列表
				orgCode: '',
				hospitalId: ''
			}
		},
		onLoad({orgCode, hospitalId}) {
			this.orgCode = orgCode
			this.hospitalId = hospitalId
			this.initSetSearchList()
		},
		methods: {
			/**
			 * 设置初始化数据
			 */
			initSetSearchList() {
				this.historyList = this.getHistorySearchList() || []
			},
			/**
			 * 获取历史搜索记录
			 */
			getHistorySearchList() {
				return uni.getStorageSync('searchHistory')
			},
			/**
			 * 设置历史记录
			 */
			setHistory(value) {
				let list = this.getHistorySearchList() || []
				value && list.push(value)
				list = Array.from(new Set(list.slice(0,10)))
				this.historyList = list
				uni.setStorageSync('searchHistory', list)
			},
			/**
			 * 删除历史记录
			 */
			deleteSearchList() {
				uni.showModal({
				    title: '提示',
				    content: '删除历史记录',
				    success: (res) => {
				        if (res.confirm) {
				            uni.setStorageSync('searchHistory', [])
				            this.historyList = []
				        } else if (res.cancel) {
				            
				        }
				    }
				})
			},
			/**
			 * 搜索
			 */
			async search(searchKey) {
				this.isSource = false
				let data = { orgCode: this.orgCode, searchKey }
				let res = await searchDoctor(data)
				if (res.code === 0) {
					// 处理数据
					this.handleData(res.data)
					this.setHistory(searchKey)
				} else {
					// 初始化
					this.doctorList = []
					this.subList = []
				}
			},
			/**
			 * 处理数据
			 */
			handleData(data) {
				let doctorList = data.filter(item => item.type === '1') 
				let subList = data.filter(item => item.type === '2')
				this.doctorList = this.handleDoctorItemData(doctorList)
				this.subList = subList
			},
			/**
			 * 处理医生项数据
			 */
			handleDoctorItemData(data) {
				return data.map(item => {
					return {
						img: item.sffLoginNum || '0000',
						id: item.sffId,
						name: item.sffName, // 姓名
						title: item.sffProfessionalWrapper, // 职称
						introduce: item.sffSummary || '', // 介绍
						depName: item.depName
					}
				})
			},
			/**
			 * 页面跳转
			 */
			goDoctorPage(item) {
				let { sffId: id, depName } = item
				uni.navigateTo({
					url: `/pages/doctor/doctor?deptId=${id}&name=${depName}&orgCode=${this.orgCode}&hospitalId=${this.hospitalId}`
				})
			},
			/**
			 * 防抖
			 */
			debounce(fn, $event) {
			    clearTimeout(this.timer) 
			    this.timer = setTimeout(() => {
			        $event && fn($event)   
			    }, 500)
			},
			editImgUrl(data) {
				let index = this.doctorList.findIndex(item => item.id === data.id)
				this.doctorList[index].img = data.url
			}
		},
		computed: {
			// ...mapGetters(['orgCode'])
		}
	}
</script>

<style lang="scss">
	.search-page {
		padding: 20rpx 30rpx;
		.search {
			.uni-searchbar {
				padding: 0;
			}
		}
		.history {
			>view {
				display: flex;
			}
			.title {
				color: #666;
				justify-content: space-between;
				margin: 10rpx 0;
				.delete {
					width: 40rpx;
					height: 40rpx;
					background: url(../../static/ui/delete.png) no-repeat;
					background-size: 100%;
				}
			}
			.his-item {
				flex-wrap: wrap;
				text {
					display: inline-block;
					height: 30px;
					line-height: 30px;
					padding: 0 12px;
					border-radius: 15px;
					margin-bottom: 5px;
					margin-right: 7px;
					font-size: 14px;
					color: $title-color;
					border: 1px solid $s-color;
					background-color: #fff;
				}
			}
		}
		.search-result {
			// height: calc(100% - 52px);
			padding-bottom: 30rpx;
			overflow-y: scroll;
			.title {
				text-align: center;
				color: #666;
			}
			.sub-list {
				.sub-item {
					padding: 8px 20rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					&:last-child {
						border-bottom: none;
					}
				}
			}
		}
	}
</style>

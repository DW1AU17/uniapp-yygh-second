<template>
	<view class="sub-page-out">
		<!-- <search placeholder="请输入医生姓名" :mask="true"/> -->
		<view class="border-box">
			<view class="sub-page border-box-inner">
				<view class="dep-first-left">
					<view 
						class="item gradient" 
						:class="{'active': isActive(activeOne, item.id)}" 
						v-for="item in depList" 
						:key="item.id"
						@tap="getSecondList(item)"
					>
						{{item.depName}}
					</view>
				</view>
				<view class="dep-seconf-right">
					<view class="item gradient" v-for="item in depSecondList" :key="item.id" @tap="goDoctorPage(item)">
						{{item.depName}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import { mapMutations } from 'vuex'
	import { getDepartmentList } from '@/common/api/register.js'
	import search from '@/components/uni-search-bar/uni-search-bar'
	export default {
		components: {
			search
		},
		data() {
			return {
				depList: [], // 一级
				activeOne: 0,
				depSecondList: [], // 二级
				currentDep: 6,
				depName: '中医儿科',
				orgCode: '',
				hospitalId: '',
			}
		},
		onLoad({orgCode, hospitalId}) {
			this.hospitalId = hospitalId
			this.orgCode = orgCode
			this.setPavilion({ orgCode, id: hospitalId })
			this.getDepList()
		},
		methods: {
			...mapMutations(['setPavilion']),
			/**
			 * 获取科室大类
			 */
			async getDepList() {
				this.showLoging()
				let res = await getDepartmentList()
				if (res.code === 0) {
					// 过滤对象
					this.depList = Object.freeze(this.filterOneData(res.data))
					this.depSecondList = this.depList[0].list
				}
				uni.hideLoading()
			},
			/**
			 * 过滤第一级数据
			 */
			filterOneData(data) {
				return data.map((item, index) => ({ depName: item.depName, list: this.filterSecondData(item.departmentsWrappers), id: index }))
			},
			/**
			 * 过滤第二级数据
			 */
			filterSecondData(data) {
				return data.map(item => ({ depName: item.depName, id: item.id }))
			},
			/**
			 * 获取二级科室
			 */
			getSecondList({ id, list }) {
				this.activeOne = id
				this.depSecondList = list
			},
			goDoctorPage({ id, depName }) {
				uni.navigateTo({
					url: `/pages/doctor/doctor?deptId=${id}&name=${depName}&hospitalId=${this.hospitalId}&orgCode=${this.orgCode}`
				})
			}
		},
		computed: {
			isActive: () => (activeOne, id) => {
				return activeOne === id
			}
		}
	}
</script>
<style lang="scss">
	@mixin hofs {
		height: 100%;
		overflow-y: auto;
	}
	.sub-page-out {
		padding: 30rpx;
		height: calc(100% - 60rpx);
		.border-box {
			height: 100%;
			background-color: #fff;
			.sub-page {
				height: 100%;
				display: flex;
				color: $base-color;
				// height: calc(100% - 52px);
				.dep-first-left {
					width: 276rpx;
					@include hofs;
					.item {
						padding-left: 30rpx;
						&.active {
							color: $s-color;
							font-weight: 700;
						}
					}
				}
				.dep-seconf-right {
					color: $bs-color;
					@include hofs;
					flex: 1;
				}
				.item {
					line-height: 90rpx;
					font-size: $fs-30;
					padding-left: 20rpx;
				}
			}
		}
		
	}
</style>
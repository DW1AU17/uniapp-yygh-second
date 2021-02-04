<template>
	<view class="modal-component">
		<view class="box border-box">
			<view class="top border-box-inner gradient">
			    <picker @change="bindPickerChange" :value="index" :range-key="'sffName'" :range="array">
					<view class="picker">
					    <text class="fc666">当前选择：</text>
					    <text class="fc000">{{array[index].sffName}}</text>
					</view>
			    </picker>
				<slot></slot>
			</view>
		</view>
	</view>
</template>

<script>
	import { pavList } from '@/common/utils/index'
	import { mapMutations, mapState } from 'vuex'
	let pavHandleList = pavList.filter(item => item.state === 0)
	export default {
		data() {
			return {
				index: 0,
				array: pavHandleList,
				current: {}
			}
		},
		created() {
			console.log('组件调用')
			this.setIndex()
		},
		methods: {
			...mapMutations(['setPavilion']),
			bindPickerChange(e) {
				this.index = e.detail.value
				this.current = this.array[this.index]
				this.setPavilion(this.current)
				this.$emit('confirm', {})
				// this.setNavTitle()
			},
			setIndex() {
				if (Object.keys(this.pavilion).length) {
					// 当前选择馆的id
					let currentId = this.pavilion.id
					let index = this.array.findIndex(item => item.id === currentId)
					this.index = index 
				} else {
					this.setPavilion(pavList[0])
				}
			}
			// setNavTitle() {
			// 	let title =  `就诊人(${this.array[this.index].sffName})`
			// 	uni.setNavigationBarTitle({ title })
			// }
		},
		computed: {
			...mapState(['pavilion'])
		}
	}
</script>

<style scoped lang="scss">
	.modal-component {
		.box {
			background-color: #fff;
			border-radius: 5px;
			margin-top: 20rpx;
			.top {
				padding: 0 25rpx;
				font-size: 16px;
				display: flex;
				width: 100%;
				color: #666;
				.section__title {
					text-align: center;
				}
				picker {
					line-height: 45px;
					width: 50%;
					position: relative;
					&::after {
						content: '';
						position: absolute;
						border-right: 1px solid $s-color;
						height: 40rpx;
						top: 26rpx;
						right: 24rpx;

					}
				}
			}
		}
	}
</style>

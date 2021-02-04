<template>
	<view class="modal-component" v-if="show">
		<view class="box">
			<view class="top">
			  <view class="section__title">请选择医馆</view>
			  <picker @change="bindPickerChange" :value="index" :range-key="'sffName'" :range="array">
				<view class="picker">
				  当前选择：<text class="fc000">{{array[index].sffName}}</text>
				</view>
			  </picker>
			</view>
			<view class="bottom-btn">
				<view @tap="confirm">确认</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { pavList } from '@/common/utils/index'
	import { mapMutations } from 'vuex'
	export default {
		data() {
			return {
				index: 0,
				array: pavList,
				current: {},
				show: true
			}
		},
		created() {
			this.setNavTitle()
		},
		methods: {
			...mapMutations(['setPavilion']),
			bindPickerChange(e) {
				this.index = e.detail.value
				this.setNavTitle()
			},
			confirm() {
				this.current = this.array[this.index]
				this.show = false
				this.setPavilion(this.current)
				this.$emit('confirm', {})
				
			},
			setNavTitle() {
				let title =  `就诊人(${this.array[this.index].sffName})`
				uni.setNavigationBarTitle({ title })
			}
		}
	}
</script>

<style scoped lang="scss">
	.modal-component {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(0,0,0,0.3);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 10;
		color: #666;
		.box {
			background-color: #fff;
			width: 80%;
			border-radius: 5px;
			.top {
				padding: 10px;
				font-size: 16px;
				.section__title {
					text-align: center;
				}
				.picker {
					line-height: 60px;
				}
			}
			.bottom-btn {
				height: 40px;
				line-height: 40px;
				border-top: 1px solid #ccc;
				>view {
					display: inline-block;
					width: 100%;
					text-align: center;
				}
			}
		}
	}
</style>

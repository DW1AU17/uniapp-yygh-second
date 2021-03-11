<template>
	<view class="qs-page">
		<view class="swiper-section">
			<progress :percent="percent" :stroke-width="4" active-mode="forwards" />
			<swiper class="swiper" @change="swiperChange" :current="currentIndex">
				<!-- 第一页 -->
				<swiper-item class="page-one">
					<view class="title">
						<view>你知道</view>
						<view>你的还子能长多高吗? TA的发育正常吗? </view>
					</view>
					<view class="content">
						<view v-for="(item, index) in pageOne" :key="index">{{ item }}</view>
					</view>
					<view class="footer">
						<button size="mini" @tap="currentIndex = 1">开始评估</button>
					</view>
				</swiper-item>
				<!-- 第二到七页 -->
				<swiper-item>
					<form-item label="左边">
						<cus-radio v-model="ruleForm.radio" :list="radioList" />
					</form-item>
					<form-item label="左边">
						<cus-checkbox v-model="ruleForm.checkbox" :list="checkboxList" />
					</form-item>
					
					
				</swiper-item>
				<!-- 第八页: 报告生成中 -->
				<!-- 第九页: 评估报告 -->
			</swiper>
			<view class="footer-btn" v-show="currentIndex > 0">
				<view @tap="currentIndex = 0" v-if="currentIndex === 1">首页</view>
				<view @tap="currentIndex--" v-else>上一题</view>
				
				<view v-if="currentIndex === questionList.length - 1">
					<text v-if="!isAnswer" :class="{'disabled': !isAnswer}">提交问卷</text>
					<text @tap="" v-else>提交问卷1</text>
				</view>
				<view v-else>
					<text v-if="!isAnswer" :class="{'disabled': !isAnswer}">下一题</text>
					<text @tap="currentIndex++" v-else>下一题1</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import CusFormItem from './components/cus-form-item'
	import CusRadio from './components/cus-radio'
	import CusCheckbox from './components/cus-checkbox'
	import { pageOne } from './static/index'
	let questionList = [
		{ title: '问题?', options: [ '1. 答案1', '2. 答案2', '3. 答案3' ] },
		{ title: '问题?', options: [ '1. 答案1', '2. 答案2', '3. 答案3' ] },
		{ title: '问题?', options: [ '1. 答案1', '2. 答案2', '3. 答案3' ] },
		{ title: '问题?', options: [ '1. 答案1', '2. 答案2', '3. 答案3' ] },
		{ title: '问题?', options: [ '1. 答案1', '2. 答案2', '3. 答案3' ] },
		{ title: '问题?', options: [ '1. 答案1', '2. 答案2', '3. 答案3' ] },
		{ title: '问题?', options: [ '1. 答案1', '2. 答案2', '3. 答案3' ] },
	]
	let radioList = [
		{ value: '1', label: '111' },
		{ value: '2', label: '222' },
		{ value: '3', label: '333' },
	]
	let checkboxList = [
		{ value: '1', label: '111' },
		{ value: '2', label: '222' },
		{ value: '3', label: '333' },
	]
	export default {
		components: {
			'form-item': CusFormItem,
			CusRadio,
			CusCheckbox
		},
		data() {
			return {
				pageOne,
				questionList,
				currentIndex: 1, // 轮播图当前页
				radioList,
				checkboxList,
				ruleForm: {
					radio: '2',
					checkbox: ['1', '2'] 
				},
				isAnswer: false
			}
		},
		methods: {
			radioChange(event) {
				let { value } = event.detail
				this.answerList[this.currentIndex] = value
			},
			swiperChange(event) {
				let { current } = event.detail
				this.currentIndex = current
			}
		},
		computed: {
			percent() {
				return +(this.currentIndex / this.questionList.length * 100).toFixed()
			}
		},
		watch: {
			answerList: {
				handler() {
					this.isAnswer = !!this.answerList[this.currentIndex]
				},
				deep: true
			}
		}
	}
</script>

<style lang="scss">
	.qs-page, 
	.swiper-section,
	.swiper,
	swiper-item {
		height: 100%;
		width: 100%;
	}
	.qs-page {
		background-color: pink;
		.page-one {
			padding: 10px;
			.title {
				font-weight: 700;
			}
			.content {
				margin: 10px 0;
			}
			.footer {
				text-align: center;
			}
		}
		.swiper-section {
			.swiper {
				swiper-item {
					padding: 10px;
				}
			}
			.footer-btn {
				position: fixed;
				width: 100%;
				bottom: 100px;
				text-align: center;
				view {
					display: inline-block;
					margin: 0 10px;
					border-radius: 3px;
					background-color: #eee;
					padding: 0 10px;
					text.disabled {
						color: #888;
					}
				}
			}
		}
		/deep/ .uni-progress {
			position: fixed;
			top: 44px;
			left: 0;
			right: 0;
			.uni-progress-bar {
				background-color: transparent!important;
			}
			.uni-progress-inner-bar {
				transition: width 300ms;
			}
		}
	}
</style>

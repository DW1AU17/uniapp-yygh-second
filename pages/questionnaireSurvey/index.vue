<template>
	<view class="questionnaire-page">
		<view class="swiper-outer-layer">
			<!-- <progress :percent="percent" :stroke-width="4" active-mode="forwards" /> -->
			<swiper class="swiper-container" @change="swiperChange" :current="currentIndex">
				<!-- 第一页 -->
				<swiper-item class="page-one">
					<image class="bgc" src="/static/ui/growth/page-one.jpg" mode="aspectFill" />
					<view class="footer-btn-one" @tap="toNext"></view>
				</swiper-item>
				<!-- 问卷页面 -->
				<swiper-item>
					<cus-swiper-page title="生长发育评估表">
						<form-item :label="item.qContent" v-for="item in questionList.slice(0, 15)" :key="item.field" :type="item.qType">
							<cus-radio v-if="item.qType === '1'" v-model="ruleForm[item.field]" :list="list[item.field + 'List']" />
							<cus-checkbox v-else-if="item.qType === '2'" v-model="ruleForm[item.field]" :list="list[item.field + 'List']" />
							<input v-else-if="item.qType === '3' && !item.picker" type="text" v-model="ruleForm[item.field]" :placeholder="'请输入' + item.qContent">
							<picker v-else mode="date" fields="month" @change="bindDateChange">{{ ruleForm.birthday }}</picker>
						</form-item>
						<view class="footer-btn">
							<cus-button type="c-blue" @tap="currentIndex = 0">上一页</cus-button>
							<cus-button type="c-purple">下一页</cus-button>
						</view>
					</cus-swiper-page>
				</swiper-item>
				<swiper-item>
					<cus-swiper-page title="生长发育评估表">
						<form-item :label="item.qContent" v-for="item in questionList.slice(15)" :key="item.field" :type="item.field">
							<cus-radio v-if="item.qType === '1'" v-model="ruleForm[item.field]" :list="list[item.field + 'List']" />
							<cus-checkbox v-else-if="item.qType === '2'" v-model="ruleForm[item.field]" :list="list[item.field + 'List']" />
						</form-item>
						<view class="footer-btn">
							<cus-button type="c-blue" @tap="currentIndex = 1">上一页</cus-button>
							<cus-button type="c-purple" @tap="generateReport">生成报告</cus-button>
						</view>
					</cus-swiper-page>
				</swiper-item>
				<!-- 最后页: 评估报告 -->
				<swiper-item class="page-last">
					<cus-swiper-page title="生长发育评估报告" :banner-show="false">
						<view class="content">
							<form-item label="遗传身高">
								
							</form-item>
							<form-item label="目前身高情况">
								
							</form-item>
							<form-item label="健康情况评估">
								
							</form-item>
						</view>
						<view class="footer">
							<view class="remind">特别提醒</view>
							<view class="paragraph fwb">
								<view>影响身高体重的主要因素有饮食，睡眠，运动等；有相关疾病也有可能影响生长发育，比如食积， 便秘，腹泻，睡眠障碍，多病，阳虚，内热，体力差等。</view>
								<view>预约专家获取详细生长建议</view>
							</view>
							<view class="footer-btn">
								<cus-button type="c-blue">更多资讯</cus-button>
								<cus-button type="c-purple">预约专家</cus-button>
							</view>
						</view>
					</cus-swiper-page>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	// import { CusButton, CusFormItem, CusRadio, CusCheckbox } from './index'
	import CusFormItem from './components/cus-form-item'
	import CusRadio from './components/cus-radio'
	import CusCheckbox from './components/cus-checkbox'
	import CusButton from './components/cus-button'
	import CusSwiperPage from './components/cus-swiper-page'
	
	import { list, questionList } from './static/index'
	import { mapState } from 'vuex'
	import { saveAnswer } from '@/common/api/answer'
	
	export default {
		components: {
			'form-item': CusFormItem,
			CusRadio,
			CusCheckbox,
			CusButton,
			CusSwiperPage
		},
		data() {
			return {
				list,
				questionList,
				currentIndex: 0, // 轮播图当前页
				ruleForm: {
					name: '',
					birthday: '2000-01-01',
					fatherHeight: '',
					motherHeight: '',
					height: '',
					weight: '',
					boneAge: '',
					anemia: '',
					thyroid: '',
					bloodSugar: '',
					LiverKidney: '',
					heightGrowth: '',
					interveneHeight: [],
					sick: [],
					drugUsage: '',
					appetite: '',
					piddle: '',
					oral: '',
					excrement: [],
					sleepTime: '',
					getUpTime: '',
					sleepStatus: '',
					movementTime: '',
					movement: '',
					sweating: '',
					coldLimbs: '',
					afraidCold: '',
					inCold: '',
					kickAQuilt: '',
				},
				isAnswer: false
			}
		},
		methods: {
			swiperChange(event) {
				let { current } = event.detail
				this.currentIndex = current
			},
			bindDateChange(event) {
				let { value } = event.detail
				this.ruleForm.birthday = value
			},
			toNext() {
				if (!this.hasLogin) {
					// #ifdef H5
						uni.navigateTo({
							url: '/pages/login/login'
						})
					// #endif
					// #ifdef MP-WEIXIN
						uni.navigateTo({
							url: '/pages/auth/auth?type='
						})
					// #endif
				} else {
					this.currentIndex = 1
				}
			},
			// 生成问卷
			async generateReport() {
				let data = []
				questionList.forEach((item, qId) => {
					let { qContent, qType, field } = item
					let baseObj = { surveyId: 1, surveyName: '生长发育', userId: '1', createTime: +new Date }
					let aOptions = this.getOptions(qType, field)
					data.push({ ...baseObj, qContent, qType, qId: qId + 1, aOptions })
				})
				console.log(data)
				return 
				let res = await saveAnswer(data)
			},
			/**
			 * 获取选项
			 * @param {Object} type 1单选 2多选 3其他
			 * @param {Object} field
			 */
			getOptions(type, field) {
				switch (type) {
					case '1': 
						let serialNumber = (+this.ruleForm[field] + 1) + '. '
						return serialNumber + list[`${field}List`].filter(item => item.value === this.ruleForm[field])[0].label
						break 
					case '2':
						return this.ruleForm[field].reduce((prev, item, index) => {
							let serialNumber = (index + 2) + '. '
							return prev + serialNumber + list[`${field}List`].filter(iItem => item === iItem.value)[0].label + '; '
						}, '')
						break
					case '3':
						return this.ruleForm[field]
						break
					default: 
						return ''
						break
				}
			}
		},
		computed: {
			...mapState(['hasLogin'])
		}
	}
</script>

<style lang="scss">
	$common-width: 675rpx;
	.questionnaire-page, 
	.swiper-outer-layer,
	.swiper-container,
	swiper-item {
		height: 100%;
		width: 100%;
	}
	
	.questionnaire-page {
		background-color: pink;
		.page-one {
			.footer-btn-one {
				position: fixed;
				top: 1145rpx;
				right: 62rpx;
				width: 360rpx;
				height: 140rpx;
				background: url(../../static/ui/growth/purple-btn.png) 100% no-repeat;
				background-size: 100% 100%;
				&:after {
					content: '';
					display: inline-block;
					width: 231rpx;
					height: 58rpx;
					background: url(../../static/ui/growth/kspg.png) no-repeat;
					background-size: 100% 100%;
					position: absolute;
					top: 42rpx;
					left: 65rpx;
				}
			}
		}
		.page-last {
			.footer {
				position: absolute;
				bottom: 0;
				right: 38rpx;
				left: 38rpx;
				border-top: 1rpx solid #f0e8d2;
				.remind {
					border: 1px solid #e662b1;
					line-height: 40rpx;
					border-radius: 20rpx;
					padding: 0 20rpx;
					color: #e662b1;
					display: inline-block;
					margin: 30rpx 0 20rpx 0;
				}
				.paragraph {
					line-height: 38rpx;
					font-size: 26rpx;
					text-indent: 40rpx;
					text-align: justify;
					margin-bottom: 20rpx;
				}
			}
		}
		// 公共部分
		/deep/ .bgc {
			width: 750rpx;
			height: 100%;
			min-height: 1568rpx;
			vertical-align: top;
			position: fixed;
			z-index: -1;
		}
		uni-input,
		uni-picker,
		input,
		picker {
			background-color: #fff;
			border: 1rpx solid #eee;
			border-radius: 10rpx;
			text-indent: 20rpx;
			height: 52rpx;
			font-size: 28rpx;
		}
		.footer-btn {
			text-align: center;
			padding: 10rpx 0 20rpx 0;
			cus-button, 
			.custom-button {
				margin: 20rpx;
			}
		}
	}
</style>

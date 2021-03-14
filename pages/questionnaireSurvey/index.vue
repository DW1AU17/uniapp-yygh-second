<template>
	<view class="qs-page">
		<view class="swiper-section">
			<!-- <progress :percent="percent" :stroke-width="4" active-mode="forwards" /> -->
			<swiper class="swiper" @change="swiperChange" :current="currentIndex">
				<!-- 第一页 -->
				<swiper-item class="page-one">
					<image class="bgc" src="/static/ui/growth/page-one.jpg" mode="aspectFill" />
					<view class="footer-btn-one" @tap="toNext"></view>
				</swiper-item>
				<!-- 第二到四页 -->
				<swiper-item class="page-content">
					<image class="bgc" src="/static/ui/growth/page-content.jpg" mode="aspectFill" />
					<banner />
					<view class="content-info answer-box">
						<table-header>生长发育评估表</table-header>
						<view class="form-content">
							<form-item label="孩子姓名">
								<input type="text" v-model="ruleForm.name">
							</form-item>
							<form-item label="出生年月">
								<picker mode="date" fields="month" @change="bindDateChange">{{ ruleForm.birthday }}</picker>
							</form-item>
							<form-item label="爸爸身高">
								<input type="text" v-model="ruleForm.fatherHeight">
							</form-item>
							<form-item label="妈妈身高">
								<input type="text" v-model="ruleForm.motherHeight">
							</form-item>
							<form-item label="孩子身高">
								<input type="text" v-model="ruleForm.height">
							</form-item>
							<form-item label="孩子体重">
								<input type="text" v-model="ruleForm.weight">
							</form-item>
							<form-item label="孩子骨龄">
								<input type="text" v-model="ruleForm.boneAge">
							</form-item>
							<form-item label="贫血">
								<cus-radio v-model="ruleForm.anemia" :list="list.anemiaList" />
							</form-item>
							<form-item label="甲状腺功能">
								<cus-radio v-model="ruleForm.thyroid" :list="list.thyroidList" />
							</form-item>
							<form-item label="血糖">
								<cus-radio v-model="ruleForm.bloodSugar" :list="list.bloodSugarList" />
							</form-item>
							<form-item label="肝肾功能">
								<cus-radio v-model="ruleForm.LiverKidney" :list="list.LiverKidneyList" />
							</form-item>
							<form-item label="孩子每年身高增长情况">
								<cus-radio v-model="ruleForm.heightGrowth" :list="list.heightGrowthList" />
							</form-item>
							<form-item label="是否干预治疗过孩子身高">
								<cus-checkbox v-model="ruleForm.interveneHeight" :list="list.interveneHeightList" />
							</form-item>
							<form-item label="平时是否多病">
								<cus-checkbox v-model="ruleForm.sick" :list="list.sickList" />
							</form-item>
							<form-item label="用药情况">
								<cus-radio v-model="ruleForm.drugUsage" :list="list.drugUsageList" />
							</form-item>
							<view class="footer-btn">
								<cus-button type="c-blue" @tap="currentIndex = 0">上一页</cus-button>
								<cus-button type="c-purple">下一页</cus-button>
							</view>
						</view>
					</view>
					<view class="empty-tag"></view>
				</swiper-item>
				<swiper-item class="page-content">
					<image class="bgc" src="/static/ui/growth/page-content.jpg" mode="aspectFill" />
					<banner />
					<view class="content-info answer-box">
						<table-header>生长发育评估表</table-header>
						<view class="form-content">
							<form-item label="食欲">
								<cus-radio v-model="ruleForm.appetite" :list="list.appetiteList" />
							</form-item>
							<form-item label="偏食">
								<cus-radio v-model="ruleForm.piddle" :list="list.piddleList" />
							</form-item>
							<form-item label="口腔及舌苔">
								<cus-radio v-model="ruleForm.oral" :list="list.oralList" />
							</form-item>
							<form-item label="大便情况">
								<cus-checkbox v-model="ruleForm.excrement" :list="list.excrementList" />
							</form-item>
							<form-item label="入睡时间">
								<cus-radio v-model="ruleForm.sleepTime" :list="list.sleepTimeList" />
							</form-item>
							<form-item label="起床时间">
								<cus-radio v-model="ruleForm.getUpTime" :list="list.getUpTimeList" />
							</form-item>
							<form-item label="睡眠状况">
								<cus-radio v-model="ruleForm.sleepStatus" :list="list.sleepStatusList" />
							</form-item>
							<form-item label="课外剧烈运动时间">
								<cus-radio v-model="ruleForm.movementTime" :list="list.movementTimeList" />
							</form-item>
							<form-item label="运动">
								<cus-radio v-model="ruleForm.movement" :list="list.movementList" />
							</form-item>
							<form-item label="出汗情况">
								<cus-radio v-model="ruleForm.sweating" :list="list.sweatingList" />
							</form-item>
							<form-item label="四肢寒凉">
								<cus-radio v-model="ruleForm.coldLimbs" :list="list.coldLimbsList" />
							</form-item>
							<form-item label="怕冷情况">
								<cus-radio v-model="ruleForm.afraidCold" :list="list.afraidColdList" />
							</form-item>
							<form-item label="遇冷易打喷嚏,流鼻涕,感冒等">
								<cus-radio v-model="ruleForm.inCold" :list="list.inColdList" />
							</form-item>
							<form-item label="踢被子">
								<cus-radio v-model="ruleForm.kickAQuilt" :list="list.kickAQuiltList" />
							</form-item>
							<view class="footer-btn">
								<cus-button type="c-blue" @tap="currentIndex = 1">上一页</cus-button>
								<cus-button type="c-purple" @tap="generateReport">生成报告</cus-button>
							</view>
						</view>
					</view>
				</swiper-item>
			
				<!-- 最后页: 评估报告 -->
				<swiper-item class="page-last">
					<image class="bgc" src="/static/ui/growth/page-content.jpg" mode="aspectFill" />
					<view class="content-info the-last answer-box">
						<table-header>生长发育评估报告</table-header>
						<view class="body-last">
							<view class="content-last">
								<form-item label="遗传身高">
									
								</form-item>
								<form-item label="目前身高情况">
									
								</form-item>
								<form-item label="健康情况评估">
									
								</form-item>
							</view>
							<view class="footer-last">
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
						</view>
					</view>
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
	import Banner from './components/banner'
	import TableHeader from './components/table-header'
	
	import { list, questionList } from './static/index'
	import { mapState } from 'vuex'
	import { saveAnswer } from '@/common/api/answer'
	
	export default {
		components: {
			'form-item': CusFormItem,
			CusRadio,
			CusCheckbox,
			CusButton,
			Banner,
			TableHeader
		},
		data() {
			return {
				list,
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
	.qs-page, 
	.swiper-section,
	.swiper,
	swiper-item {
		height: 100%;
		width: 100%;
	}
	// swiper-item {
	// 	display: flex;
	// 	flex-direction: row-reverse;
	// 	flex-wrap: wrap;
	// 	.empty-tag {
	// 		height: 150rpx;
	// 		width: 100%;
	// 	}
	// }
	.qs-page {
		background-color: pink;
		.bgc {
			width: 750rpx;
			height: 100%;
			min-height: 1568rpx;
			vertical-align: top;
			position: fixed;
			z-index: -1;
		}
		.swiper-section {
			.swiper {
				swiper-item {
					
				}
			}
		}
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
		.page-content,
		.page-last {
			.content-info {
				width: $common-width;
				height: 1300rpx;
				margin: 0 auto;
				padding: 0;
				position: relative;
				input {
					background-color: #fff;
					border: 1rpx solid #eee;
				}
				.form-content {
					padding: 20rpx 36rpx;
					height: calc(100% - 160rpx);
					overflow-y: auto;
				}
				&.the-last {
					height: 1426rpx;
					margin-top: 32rpx;
					.body-last {
						padding: 38rpx;
						.footer-last {
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
								font-size: 24rpx;
								text-indent: 40rpx;
								text-align: justify;
								margin-bottom: 20rpx;
							}
						}
					}
				}
			}
			.footer-btn {
				text-align: center;
				padding: 10rpx 0 20rpx 0;
				cus-button {
					margin: 20rpx;
				}
			}
		}
		// /deep/ progress {
		// 	position: fixed;
		// 	top: 0;
		// 	left: 0;
		// 	right: 0;
		// 	.uni-progress-bar {
		// 		background-color: transparent!important;
		// 	}
		// 	.uni-progress-inner-bar {
		// 		transition: width 300ms;
		// 	}
		// }
	}
</style>

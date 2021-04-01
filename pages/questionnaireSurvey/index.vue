<template>
	<view class="questionnaire-page">
		<view class="swiper-outer-layer">
			<!-- <progress :percent="percent" :stroke-width="4" active-mode="forwards" /> -->
			<!-- <swiper class="swiper-container" @change="swiperChange" :current="currentIndex" :duration="300" :disable-touch="true"> -->
			<view class="swiper-container">
				<!-- 第一页 -->
				<view class="swiper-item page-one" v-show="currentIndex === 0"> 
					<image class="bgc" src="/static/ui/growth/page-one.jpg" mode="aspectFill" />
					<image class="text-img" src="/static/ui/growth/text.png" mode="aspectFit" />
					<view class="footer-btn-one" @tap="beginAnswer"></view>
				</view>
				<!-- 问卷页面 -->
				<view class="swiper-item" v-show="currentIndex === 1">
					<cus-swiper-page title="生长发育评估表" @go="goDoctorPage">
						<form-item :label="item.qContent" v-for="(item, index) in questionList.slice(0, 15)" :key="index" :type="item.qType">
							<!-- h5下可正常用v-model绑定, 小程序有bug -->
							<cus-radio v-if="item.qType === '1'" :value="ruleForm[item.field]" :field="item.field"  @input="inputChange($event)" :list="list[item.field + 'List']" />
							<cus-checkbox v-else-if="item.qType === '2'" :value="ruleForm[item.field]" :field="item.field" @input="inputChange($event)" :list="list[item.field + 'List']" />
							<input v-else-if="item.qType === '3' && !item.picker" type="text" :value="ruleForm[item.field]" @input="inputChange(index, $event)" :placeholder="'请输入' + item.qContent + unit(item.qContent)">
							<picker v-else mode="date" fields="month" @change="bindDateChange">{{ ruleForm.birthday }}</picker>
						</form-item>
						<view class="footer-btn">
							<cus-button type="c-blue" @tap="currentIndex = 0">上一页</cus-button>
							<cus-button type="c-purple"  @tap="toNext(2)">下一页</cus-button>
						</view>
					</cus-swiper-page>
				</view>
				<view class="swiper-item" v-show="currentIndex === 2">
					<cus-swiper-page title="生长发育评估表" @go="goDoctorPage">
						<form-item :label="item.qContent" v-for="(item, index) in questionList.slice(15)" :key="index" :type="item.field">
							<cus-radio v-if="item.qType === '1'" :value="ruleForm[item.field]" :field="item.field"  @input="inputChange($event)" :list="list[item.field + 'List']" />
							<cus-checkbox v-else-if="item.qType === '2'" :value="ruleForm[item.field]" :field="item.field"  @input="inputChange($event)" :list="list[item.field + 'List']" />
						</form-item>
						<view :class="{'footer-btn-last': complete, 'footer-btn': !complete}">
							<cus-button type="c-blue" @tap="currentIndex = 1">上一页</cus-button>
							<cus-button type="c-purple" @tap="toNext(3)">{{ `${complete ? '重新生成' : '生成报告' }` }}</cus-button>
							<cus-button type="c-blue" v-if="complete" @tap="currentIndex = 3">查看结果</cus-button>
						</view>
					</cus-swiper-page>
				</view>
				<!-- 最后页: 评估报告 -->
				<view class="swiper-item page-last" v-show="currentIndex === 3">
					<cus-swiper-page title="生长发育评估报告" :banner-show="false" :flex1="false">
						<view class="content">
							<view class="item"><text class="fs36">{{ ruleForm.name }}</text>宝贝: </view>
							<view class="item">遗传身高: <text class="fs36 red">{{ reportResult.geneticHeight }}</text>厘米</view>
							<view class="item mb0">目前孩子年龄是 <text class="fs36 red">{{ reportResult.age }}</text> 周岁, 身高年龄是 <text class="fs36 red">{{ reportResult.boneAge }}</text> 岁 </view>
							<view class="item">
								<view class="remind">影响身高因素评估</view>
								<view class="answer">
									<text :class="{'keep-out': hide}">{{ reportResult.assess }}</text>
								</view>
							</view>
						</view>
						<view class="footer">
							<view class="remind">医师建议</view>
							<view class="paragraph">
								<view :class="{'keep-out': hide}">
									<view v-if="reportResult.ageDiff === 0.5">身高年龄与实际年龄<text class="fs36 fwb">相差半岁</text>，建议就诊。</view>
									<view v-else-if="reportResult.ageDiff >= 1">身高年龄与实际年龄<text class="fs36 fwb">相差1岁以上</text>，必须就诊，做全面检查，并采取相关治疗。</view>
									
									<view class="mt10">≥6岁的孩子，建议每年做一次<text class="fs36 fwb">骨龄检测</text>。</view>
									<view class="fs36 fwb">预约专家获取详细生长建议</view>
								</view>
								<view class="model-keep-out" v-if="hide">
									<div class="default-flex">预约专家·获取详细生长发育评估</div> 
								</view>
							</view>
							<view class="footer-btn-last">
								<cus-button class="mr" type="c-blue" @tap="currentIndex = 2">返回</cus-button>
								<cus-button class="mr" type="c-purple" @tap="goDoctorPage">预约专家</cus-button>
								<cus-button class="mr" type="c-blue" @tap="moreNews">更多资讯</cus-button>
								<image v-if="hide" src="../../static/ui/growth/arrow.png" />
							</view>
						</view>
					</cus-swiper-page>
				</view>
				<view class="swiper-item page-doctor" v-show="currentIndex === 4">
					<image class="bgc" src="/static/ui/growth/page-content.jpg" mode="aspectFill" />
					<view class="title">生长发育儿科医生</view>
					<view class="content">	
						<doctor-panel
							v-for="item in doctorList" 
							:key="item.depId" 
							:source="item"
							:orgCode="item.orgCode"
							:hospitalId="item.hospitalId"
							/>
					</view>
				</view>
			</view>
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
	import doctorPanel from '@/components/doctor-panel/doctor-panel'
	
	import { list, questionList, doctorList, getAge, getTheClosestAge, getFactorAssess } from './static/index'
	import { mapState } from 'vuex'
	import { saveAnswer, getActiveDoctorList, getActiveDoctorSchedule } from '@/common/api/answer'
	
	export default {
		components: {
			'form-item': CusFormItem,
			CusRadio,
			CusCheckbox,
			CusButton,
			CusSwiperPage,
			doctorPanel
		},
		data() {
			return {
				list,
				questionList,
				doctorList,
				currentIndex: 0, // 轮播图当前页
				ruleForm: {
					name: '',
					birthday: '2000-01',
					fatherHeight: '',
					motherHeight: '',
					height: '',
					weight: '',
					boneAge: '',
					sex: '',
					anemia: '',
					thyroid: '',
					bloodSugar: '',
					LiverKidney: '',
					heightGrowth: '',
					interveneHeight: [],
					sick: [],
					drugUsage: '',
					appetite: [],
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
				isAnswer: false,
				reportResult: { 
					boneAge: '', // 骨龄
					age: '', // 周岁
					geneticHeight: '', // 遗传身高
					assess: '', // 评估
					ageDiff: 0, // 年龄差
				},
				hide: false, // 隐藏信息
				complete: false, // 是否完成
			}
		},
		onLoad({ hide }) {
			this.hide = hide ? true : false
		},
		/**
		 * 分享到微信好友
		 */
		onShareAppMessage() {
			return {
				title: '你的孩子能长多高? TA的生长发育正常吗?',
				path: `/pages/questionnaireSurvey/index`,
				imageUrl: '/static/ui/growth/测54.png'
			}
		},
		// onLoad() {
		// 	this.getDoctorList()
		// },
		onShareTimeline() {
			return {
				title: '你的孩子能长多高? TA的生长发育正常吗?',
				path: `/pages/questionnaireSurvey/index`,
				imageUrl: '/static/ui/growth/测.png'
			}
		},
		methods: {
			unit(value) {
				if (value === '孩子体重') return ' (斤)'
				else if (value.includes('身高')) return ' (厘米)'
				return ''
			},
			// 处理双向绑定
			inputChange(event, $event) {
				if (!$event) {
					let { value, field } = event
					this.ruleForm[field] = value
				} else {
					let key = Object.keys(this.ruleForm)[event]
					let { detail: { value } } = $event
					this.ruleForm[key] = value
				}
			},
			swiperChange(event) {
				let { current } = event.detail
				this.currentIndex = current
			},
			bindDateChange(event) {
				let { value } = event.detail
				this.ruleForm.birthday = value
			},
			beginAnswer() {
				if (!(Object.keys(this.patientInfo).length)) {
					// #ifdef H5
						uni.navigateTo({
							url: '/pages/login/login'
						})
					// #endif
					// #ifdef MP-WEIXIN
						uni.navigateTo({
							url: '/pages/auth/auth?type=&skip=true'
						})
					// #endif
				} else {
					this.currentIndex = 1
				}
			},
			async toNext(pageIndex) {
				let valid = this.validationRequired(pageIndex)
				if (valid) {
					// 验证必填项
					if (pageIndex === 2) {
						this.currentIndex = 2
					} else {
						this.showLoging('正在生成报告单')
						// 生成报告, 延迟 3s
						// 2. 生成遗传身高
						let geneticHeight = this.getGeneticHeight()
						// 3. 生成身体年龄, 周岁
						let age = getAge(this.ruleForm.birthday)
						let boneAge = getTheClosestAge(this.ruleForm.height, this.ruleForm.sex)
						// 4. 生成评估 
						let assess = getFactorAssess(this.ruleForm)
						// 1. 记录
						await this.generateReport(assess)
						let ageDiff = age - boneAge
						this.reportResult = { geneticHeight, age, boneAge, assess, ageDiff }
						
						setTimeout(() => {
							this.currentIndex = 3
							this.complete = true
							uni.hideLoading()
						}, 1000)
					}					
				}
			},
			// 获取遗传身高
			getGeneticHeight() {
				let { fatherHeight, motherHeight } = this.ruleForm
				
				let geneticHeight = this.ruleForm.sex === 'boy' ? (+fatherHeight + +motherHeight + 13) / 2 : (+fatherHeight + +motherHeight - 13) / 2
				return `${geneticHeight - 5} ~ ${geneticHeight + 5}`
			},
			// 生成问卷
			async generateReport(assess) {
				let data = []
				questionList.forEach((item, qId) => {
					let { qContent, qType, field } = item
					let baseObj = { surveyId: 1, surveyName: '生长发育', userId: this.patientInfo.id, createTime: +new Date }
					let aOptions = this.getOptions(qType, field)
					data.push({ ...baseObj, qContent, qType, qId: qId + 1, aOptions })
				})
				data.push({aOptions: assess, createTime: +new Date, qContent: '问卷结果', qId: 100, qType: "9", surveyId: 1, surveyName: "生长发育", userId: this.patientInfo.id })
				let res = await saveAnswer(data)
			},
			// 验证必填项 
			validationRequired(index) {
				let keys = Object.keys(this.ruleForm)
				let form = index === 2 ? keys.slice(0, 15) : keys.slice(15)
				let valid = true
				let whiteList = ['boneAge']
				for (let i = 0; i < form.length; i++) {
					let value = this.ruleForm[form[i]]
					if (value instanceof Array) {
						if (!value.length) {
							this.remindError(form[i])
							valid = false
							break
						}
					} else {
						if (!value && !whiteList.includes(form[i])) {
							this.remindError(form[i])
							valid = false
							break
						}
					}
				}
				return valid
			},
			// 必填提示
			remindError(key) {
				let questionItem = questionList.filter(item => item.field === key)[0]
				let { qContent, qType } = questionItem
				let text = qType === '3' ? '请输入' + qContent  : qContent + '为必选项'
				this.errorAlert(text)
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
			},
			// 跳转到医生选择界面
			goDoctorPage() {
				if (this.hide) {
					uni.navigateToMiniProgram({
					    appId: 'wx34b0738d0eef5f78',
						path: 'pages/forms/publish?token=WpeXgZ'
					})
				} else {
					this.currentIndex = 4
				}
			},
			moreNews() {
				uni.navigateTo({
					url: '/pages/news/growth-new'
				})
			},
			// async getDoctorList() {
			// 	let res = await getActiveDoctorList({activityId: 1})
			// 	let docRes = await getActiveDoctorSchedule({ doctorPubId: res.data[0].id  })
			// 	console.log(res, docRes)
			// }
		},
		computed: {
			...mapState(['hasLogin', 'patientInfo'])
		}
	}
</script>

<style lang="scss">
	::-webkit-scrollbar {
	    width: 16rpx;
	}
	::-webkit-scrollbar-thumb {
	    background-color: rgba(0,0,0,.2);
	    border-radius: 8rpx;
		width: 16rpx;
	}
	::-webkit-scrollbar-track {
	    background-color: transparent;
	}
	$common-width: 675rpx;
	.questionnaire-page, 
	.swiper-outer-layer,
	.swiper-container,
	.swiper-item {
		height: 100%;
		width: 100%;
	}
	.swiper-item {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}
	
	.questionnaire-page {
		.page-one {
			display: flex;
			flex-direction: column;
			flex-wrap: wrap;
			align-items: center;
			justify-content: center;
			.text-img {
				width: 625rpx;
				height: 747rpx;
			}
			.footer-btn-one {
				position: relative;
				margin-top: 100rpx;
				width: 360rpx;
				height: 140rpx;
				left: 130rpx;
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
			.model-keep-out {
				position: absolute;
				top: 0;
				left: 0;
				bottom: 0;
				right: 0;
				font-weight: 700;
				font-size: 36rpx;
			}
			.keep-out {
				filter: blur(4px);
				color: #ccc;
			}
			.remind {
				border: 1px solid #e662b1;
				line-height: 40rpx;
				border-radius: 20rpx;
				padding: 0 20rpx;
				color: #e662b1;
				display: inline-block;
				margin: 30rpx 0 20rpx 0;
			}
			.content {
				padding: 30rpx 0;
				.fs36 {
					font-weight: 700;
					margin: 0 10rpx;
					display: inline-block;
				}
				.item {
					margin-bottom: 30rpx;
					color: #383838;
					.title {
						font-size: 32rpx;
						font-weight: 700;
						text-align: center;
					}
					.answer {
						margin-top: 8rpx;
						font-size: 30rpx;
						text-indent: 60rpx;
						text-align: justify;
						line-height: 1.6;
						position: relative;
					}
				}
			}
			.footer {
				// position: absolute;
				// bottom: 0;
				// right: 38rpx;
				// left: 38rpx;
				border-top: 1rpx solid #f0e8d2;
				.paragraph {
					position: relative;
					line-height: 38rpx;
					font-size: 30rpx;
					text-align: justify;
					color: #383838;
					.fs36 {
						// color: #000;
						// margin: 0 10rpx;
						margin-top: 48rpx;
						text-align: center;

					}
					.keep-out {
						>view {
							margin-bottom: 30rpx;
							&:last-child {
								margin-top: 60rpx;
								margin-bottom: 0px;
								text-align: center;
							}
						}	
					}					
				}
			}
		}
		.page-doctor {
			.title {
				margin-top: 58rpx;
				font-size: 38rpx;
				text-align: center;
				font-weight: 700;
				color: #fff;
			}
			.content {
				padding: 20rpx 38rpx;
			}
		}
		// 公共部分
		/deep/ .bgc {
			width: 750rpx;
			height: 100%;
			// min-height: 1568rpx;
			vertical-align: top;
			position: fixed;
			z-index: -1;
			display: block;
		}
		uni-input,
		uni-picker,
		input,
		picker {
			background-color: #fff;
			border: 1rpx solid #eee;
			border-radius: 10rpx;
			padding-left: 20rpx;
			height: 70rpx;
			line-height: 70rpx;
			font-size: 34rpx;
		}
		.footer-btn {
			text-align: center;
			padding: 10rpx 0 20rpx 0;
			cus-button, 
			.custom-button {
				margin: 20rpx 30rpx;
			}
		}
		.footer-btn-last {
			text-align: center;
			position: relative;
			padding: 10rpx 0 20rpx 0;
			.custom-button {
				margin: 20rpx;
			}
			image {
				width: 60rpx;
				height: 60rpx;
				position: absolute;
				animation: move 500ms infinite forwards;
				bottom: 86rpx;
				left: 50%;
				transform: translateX(-50%);
			}
			@keyframes move {
				0% {
					bottom: 86rpx;
				}
				50% {
					bottom: 110rpx;
				}
				100% {
					bottom: 86rpx;
				}
			}
		}
	}
</style>

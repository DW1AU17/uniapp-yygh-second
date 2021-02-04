<template>
	<view class="index-page">
		<view class="main border-box">
			<view class="border-box-inner gradient">
				<view>
					<view class="p">
						<view>各位病友：</view>
						<view>感谢您选择本院就诊，为保证您能顺利完成预约挂号及当日就诊，请认真阅读挂号规则，充分理解以下条款，并选择同意接受或不同意接受。</view>
					</view>
					
					<view class="p">
						<view class="fwb">一.预约挂号范围：</view>
						<view>1.预约实名制：<br/></view>
						<view>本馆需要您提供真实姓名、有效身份证件号码、有效手机号码等信息，并确保以上信息的正确性。预约不收取任何费用。<br/></view>
						<view>2.预约时间：<br/></view>
						<view>①.预约提前1周开放（提前7天14:00开始预约），支持24小时挂号（注：法定节假日请具体咨询馆内）。个别医生放号时间详情电话咨询：87099390<br/></view>
						<view>②.就诊日凌晨0点停止预约，若忘记预约的，请在当日就诊电话咨询：0571-87099390<br/></view>
						<view>例：小敏想预约7月10日的黄丽华医生，那么她在7月3日14:00——7月9日23:59分可预约。如7月10日当天挂号，需先拨打0571-87099390进行咨询，确认是否有号，并直接电话预约。<br/></view>
						<view>③.若就诊人员提供的信息有误，会导致线下无法正常取号，视为预约无效。<br/></view>
					</view>
					<view class="p">
						<view class="fwb">二、预约取号：</view>
						<view>1.预约成功后，请患者于就诊当日，凭“健康码绿码+体温正常”入馆，(本馆不接受发热和腹泻病人，发热和腹泻请到发热门诊、腹泻门诊就诊)。并携带本人有效证件和就诊卡（医保患者携带医保本、医保卡）到挂号收费窗口取号。</view>
						<view>2.取号时间：按照预约时间提前半小时至馆内取号。</view>
					</view>
					<view class="p">
						<view class="fwb">三、医生停诊：</view>
						<view>如遇特殊情况医生停诊，给您造成的不便敬请谅解。医生临时停诊，门诊部工作人员将会用电话或短信方式及时通知您，请配合更改就诊日期或更换其他医生，请您保持电话畅通。</view>
					</view>
					<view class="p">
						<view class="fwb">四、取消预约：</view>
						<view>预约成功后，若不能按时就诊，请至少提前24小时取消预约。</view>
					</view>
					<view class="p">
						<view class="fwb">五、爽约处理：</view>
						<view>1.预约成功后，患者没有按时就诊且没有取消预约，视为爽约</view>
						<view>2.无故爽约累计达2次将进入系统爽约名单，此后3个月内将无法享受预约挂号服务，但不影响到院现场挂号。</view>
					</view>
					<view class="p">
						<view class="fwb">六、预约限制：</view>
						<view>1.同一患者实名（有效证件号）在同一就诊日、在同一个科室只能预约一次。</view>
						<view>2.同一患者实名（有效证件号）同一就诊日的预约总量不可超过2次，7日内预约总量不可超过3次。</view>
					</view>
				</view>
			</view>
		</view>
		<view class="footer">
			<!-- <label @tap="changeStatus(checked)">
				<checkbox :checked="checked"/>我已阅读并同意挂号规则
			</label>
			<button class="btn" @tap="goPavilionPage">预约挂号</button> -->
			<button class="btn sure" @tap="goBack">确认</button>
		</view>
	</view>
</template>

<script>
	// #ifdef H5
	import jweixin from 'jweixin-module'
	// #endif
	import { h5Share } from '@/common/api/wechat'
	export default {
		data() {
			return {
				checked: uni.getStorageSync('indexPageChecked') || false,
				telephone: '0571-87099390'
			}
		},
		onLoad() {
			// #ifdef H5
			this.share()
			// #endif
		},
		methods: {
			async share() {
				return 
				let res = await h5Share({url: location.href.split('#')[0]})
				let { appId, nonceStr, signature, timestamp } = res.data
				jweixin.config({
					debug: true,  //测试时候用true 能看见wx.config的状态是否是config:ok
					appId, // 必填，公众号的唯一标识（公众号的APPid）
					timestamp, // 必填，生成签名的时间戳
					nonceStr, // 必填，生成签名的随机串
					signature, // 必填，签名
					jsApiList: [
						'onMenuShareTimeline', // 分享给好友
						'onMenuShareAppMessage', // 分享到朋友圈
					], // 必填，需要使用的JS接口列表
				});
				return
				jweixin.ready(function() {
					console.log('通过')
					var shareData = {
						title: '测试的标题', // 分享标题
						desc: '测试的描述', // 分享描述
						link: 'www.baidu.com', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						imgUrl: '@/static/naruto.png', // 分享图标
						success: function(res) {}
					};
					//自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
					jweixin.updateTimelineShareData(shareData);
					//自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
					jweixin.updateAppMessageShareData(shareData);
				})
			},
			goPavilionPage() {
				if (!this.checked) {
					this.errorAlert('请阅读并同意挂号须知')
				} else {
					uni.navigateTo({
						url: '/pages/pavilion/pavilion'
					})
				}
			},
			changeStatus(checked) {
				uni.setStorageSync('indexPageChecked', !checked)
				this.checked = !checked
			},
			goBack() {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss">
	.index-page {
		padding: 30rpx;
		height: calc(100% - 60px);
		.main {
			height: calc(100% - 20px);
			font-size: 26rpx;
			.border-box-inner {
				height: 100%;
				padding: 0 30rpx;
				>view {
					height: 100%;
					overflow-y: auto;
				}
				.p {
					margin-bottom: 34rpx;
					>view {
						text-indent: 46rpx;
					}
					&:nth-child(1) {
						margin-top: 20rpx;
					}
				}
			}
		}
		.footer {
			padding: 0 10px;
			position: fixed;
			bottom: 0;
			right: 0;
			left: 0;
			height: 65px;
			display: flex;
			align-items: center;
			label {
				flex: 1;
			}
			.btn {
				background-color: $s-color;
			    color: #fff;
				width: 464rpx;
				border-radius: 30rpx;
				font-size: 26rpx;
			}
		}
	}
</style>

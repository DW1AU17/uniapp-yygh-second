<template>
	<view class="index-page">
		<view class="main">
			<view><view class="blod">1.实名制预约：</view>本馆需要您提供真实姓名、有效身份证件号码、有效手机号码等信息，<text class="red">并确保以上信息的正确性，后果自负</text>。预约不收取任何费用。</view>
			<view><view class="blod">2.预约无效：</view>若就诊人提供的信息有误，<text class="red">会导致线下无法正常取号，视为预约无效。若就诊人未按时取号，同样视为预约无效。</text></view>
			<view><view class="blod">3.预约时间：</view>预约提前<text class="red">1</text>周开放（个别医生除外），支持24小时挂号，就诊日凌晨0点停止预约，当日就诊可电话咨询：<text @tap="callPhone" class="blue">{{telephone}}</text></view>
			<!-- <view class="red">举例：小敏想预约7月10日的黄丽华医生，那么她从7月3日14:00起可开始预约，预约通道7月10日0点起关闭。若她想在7月10日当天挂号就诊，需要先拨打{{telephone}}进行咨询，确认是否有号。</view> -->
			<view><view class="blod">4.预约取消：</view>预约成功后，若不能按时就诊，请至少提前<text class="red">24小时</text>取消预约，<text class="red">过时无法取消预约，如未在预约时间前往就诊，将计为爽约。</text></view>
			<view><view class="blod">5.预约取号：</view>预约成功后，请患者于就诊当日，<text class="red">凭“健康码绿码+体温正常”入馆</text>，并携带本人有效证件和就诊卡（医保患者携带医保本、医保卡）到挂号收费窗口取号。</view>
			<view><view class="blod">6.取号时间：</view><text class="red bgc-yellow">比预约时间至少提前半小时至线下取号</text></view>
			<view><view class="blod">7.医生停诊：</view>如遇特殊情况医生停诊，给您造成的不便敬请谅解。医生临时停诊，门诊部工作人员将会用电话或短信方式及时通知您，请配合更改就诊日期或更换其他医生，请您保持电话畅通。</view>
			<view><view class="blod">8.爽约处理：</view><text class="red">如预约成功后患者未能按时就诊且不办理取消预约视为取消。无故爽约累计达2次将进入系统爽约名单，此后3个月内将无法享受预约挂号服务。</text></view>
			<view><view class="blod">9.温馨提示：</view>同一患者实名（有效证件号）在同一就诊日、同一时间段只能预约一名医生。</view>
			<!-- <view class="red">举例：小敏不能同时预约7月10日上午10:00的黄丽华医生和10:00的蔡宛如医生，但可以为自己预约10:00的黄丽华医生，为自己的老公预约10:00的蔡宛如医生。</view> -->	  
		</view>
		<view class="footer">
			<label @tap="changeStatus(checked)">
				<checkbox value="123" :checked="checked" color="#FFCC33" />我已阅读并同意挂号规则
			</label>
			<button class="btn" @tap="goPavilionPage">预约挂号</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				checked: false,
				telephone: '0571-87099390'
			}
		},
		methods: {
			goPavilionPage() {
				if (!this.checked) {
					this.errorAlert('请阅读并同意挂号须知')
				} else {
					uni.navigateTo({
						url: '/pages/pavilion/pavilion'
					})
				}
			},
			callPhone() {
				uni.makePhoneCall({
				    phoneNumber: this.telephone 
				});
			},
			changeStatus(checked) {
				this.checked = !checked
			}
		}
	}
</script>

<style lang="scss">
	.orange {
		color: #F00;
	}
	.index-page {
		padding: 10px;
		background-color: #fff;
		.main {
			padding-bottom: 50px;
			font-size: 14px;
			>view {
				margin-bottom: 10px;
				.blod {
					font-weight: 700;
					font-size: 15px;
				}
				.bgc-yellow {
					background-color: yellow;
				}
			}
		}
		.footer {
			padding: 10px;
			position: fixed;
			bottom: 0;
			right: 0;
			left: 0;
			height: 50px;
			display: flex;
			align-items: center;
			box-shadow: 0px 2px 4px 1px #444;
			background-color: #fff;
			label {
				flex: 1;
			}
			.btn {
				background: orange;
			    color: #fff;
			    padding: 2px 26px;
			    line-height: 1.5;
			}
		}
	}
</style>

<template>
	<view class="index-page">
		<view class="main border-box">
			<view class="border-box-inner gradient">
				<view>
					<view class="p">
						<image src="../../static/ui/cyl.jpg" mode="widthFix"></image>
					</view>
					<view class="p">
						<view>桐君堂品牌始创于明•洪武十七年，历经600余年，是浙江省传统中医药文化的代表之一。以桐君堂品牌为代表的传统医药项目已被越来越多百姓认可和赞誉，在浙江省内乃至全国逐步普及。</view>
					</view>
					
					<view class="p">
						<view class="fwb">桐君堂中药饮片厂</view>
						<view>通过桐君堂中药饮片厂，不仅能够很好地从源头把关药材采购，同时也能对中药饮片的检验检测、加工炮制、仓储物流进行把控，确保药品质量达到优质。</view>
					</view>
					<view class="p">
						<view class="fwb">桐君堂国医馆•地铁口的名医馆</view>
						<view>在杭州地区，桐君堂国医馆拥有武林馆、环西馆、城站馆、东新馆、城西馆等五家分馆，总营业面积超过10000平方米。汇集了400余位各领域的名医专家，包括数十位国家级、省市级名中医、学科带头人等。</view>
						<view>现开设中医内科、外科、妇科、儿科、肿瘤科、骨伤科、神经科、耳鼻喉科、眼科、皮肤科、针灸科、推拿科等，年门诊量超过700000人次，是杭城规模最大的连锁国医馆之一。</view>
						<view>汇集杭城众多著名祖传中医流派：何氏妇科、裘氏妇科、宋氏妇科、许氏妇科、李氏眼科、严氏喉科、马氏眼科、叶氏心内科、袁氏内科等。</view>
					</view>
					<view class="p">
						<view class="fwb">久和福记健康馆</view>
						<view>提供多元化的健康及保健产品，线上线下多渠道的消费体验。</view>
					</view>
					<view class="p">
						<view class="fwb">华颜会养生馆</view>
						<view>将中医药理念融入美容养生，并面向企事业单位及个人提供专业的中医健康管理服务。</view>
					</view>
					<view class="p center">
						<img src="/static/ui/QrCode.png" alt="">
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
	}
</script>

<style lang="scss">
	.index-page {
		overflow: hidden;
		.main {
			height: calc(100% - 60rpx);
			font-size: 26rpx;
			margin: 30rpx;
			.border-box-inner {
				height: 100%;
				padding: 0 30rpx;
				>view {
					height: 100%;
					overflow-y: auto;
				}
				.p {
					margin-bottom: 34rpx;
					&.center {
						text-align: center;
					}
					>view {
						text-indent: 46rpx;
					}
					image {
						width: 100%;
						margin: 0 auto;
					}
					&:nth-child(1) {
						margin-top: 34rpx;
					}
				}
			}
		}
	}
</style>

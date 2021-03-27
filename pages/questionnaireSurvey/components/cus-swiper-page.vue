<template>
	<view class="page-content">
		<image class="bgc" src="/static/ui/growth/page-content.jpg" mode="aspectFill" />
		<banner v-if="bannerShow" @go="$emit('go')" />
		<view class="content-info answer-box" :class="{'mr-top': !bannerShow, 'flex1': flex1 }">
			<table-header>
				<view class="title">{{ title }}</view>
				<view v-if="title === '生长发育评估表'" class="fs24 subtitle">建议2~12周岁孩子填写</view>
			</table-header>
			<view class="form-content">
				<slot></slot>
			</view>
		</view>
		<view class="empty-tag"></view>
	</view>
</template>

<script>
	import TableHeader from './table-header'
	import Banner from './banner'
	export default {
		components: {
			TableHeader,
			Banner
		},
		props: {
			title: {
				required: true,
				type: String
			},
			bannerShow: {
				default: true
			},
			flex1: {
				default: true
			}
		}
	}
</script>

<style lang="scss">
	.page-content {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		// min-height: 1568rpx;
		height: 100%;
		width: 100%;
		.content-info {
			margin: 0 30rpx;
			padding: 0 30rpx 0 30rpx!important;
			overflow: hidden;
			position: relative;
			&.flex1 {
				flex: 1;
			}
			.form-content {
				height: calc(100% - 100rpx);
				overflow-y: scroll;
			}
			&.mr-top {
				margin-top: 60rpx;
			}
		}
		.empty-tag {
			height: 150rpx;
		}
	}
	.title {
		margin-top: 10rpx;
	}
	.subtitle {
		margin-top: -10rpx;
	}
</style>

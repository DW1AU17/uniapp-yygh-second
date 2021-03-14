<template>
	<view class="page-content">
		<image class="bgc" src="/static/ui/growth/page-content.jpg" mode="aspectFill" />
		<banner v-if="bannerShow" />
		<view class="content-info answer-box" :class="{'mr-top': !bannerShow }">
			<table-header>{{ title }}</table-header>
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
			}
		}
	}
</script>

<style lang="scss">
	.page-content {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		min-height: 1568rpx;
		height: 100%;
		width: 100%;
		.content-info {
			flex: 1;
			margin: 0 38rpx;
			padding: 0 40rpx!important;
			overflow: hidden;
			position: relative;
			.form-content {
				height: calc(100% - 100rpx);
				overflow-y: scroll;
			}
			&.mr-top {
				margin-top: 38rpx;
			}
		}
		.empty-tag {
			height: 150rpx;
		}
	}
</style>

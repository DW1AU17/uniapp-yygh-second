<template>
    <view class="video-page">
        <view class="video-box">
			<video
				:src="'https://www.zjgoshine.com:59001/video/20210203.mp4'"
				:autoplay="true"
				:show-fullscreen-btn="false"
				@error="videoErrorCallback" 
				@timeupdate="getProgress"
				controls
			></video>
			<!-- <image class="img" src="/static/ui/123.jpg"></image> -->
        </view>
		<arrow :show="show"></arrow>
		<view v-show="show" class="box" @tap="toNextPage"></view>
    </view>
</template>

<script>
	import Arrow from '@/components/arrow/arrow'
	import { getDates } from '@/common/utils/index'
	export default {
		components: {
			arrow: Arrow
		},
	    data() {
	        return {
	            src: '',
				doctorName: '',
				show: false,    // 指示是否显示
				isToday: false, // 判断是否是当天
				title: '小周'
	        }
	    },
	    onLoad({ date, name }) {
			let today = getDates(1)[0].searchDate
			this.src = date
			this.doctorName = name
			console.log(date, today)
			if (date == today) {
				this.isToday = true
			}
		},
		/**
		 * 分享到微信好友
		 */
		onShareAppMessage() {
			return {
				title: this.title,
				path: `/pages/video/video`
			}
		},
		onShareTimeline() {
			return {
				title: this.title,
			}
		},
	    methods: {
			getProgress(e) {
				let { currentTime, duration } = e.detail
				let scale = Math.ceil(duration - currentTime)
				// scale 秒
				// isToday 是否是今天
				if (scale <= 4 && !this.show && this.isToday) {
					this.show = true
				}
			},
	        videoErrorCallback(e) {
				console.log(e.target)
				this.errorAlert('当前视频加载失败')
	        },
			toNextPage() {
				// TODO 判断是否是当日视频
				this.errorAlert('即将跳转至福袋页面', 1000, 'none')
				// #ifdef MP-WEIXIN
				uni.navigateToMiniProgram({
				    appId: 'wx692f2eeb703106f0',
				    path: 'packages/ump/new-lottery/casino/index?alias=aq7i4g3w0kvo&shopAutoEnter=1',
				})
				// #endif
				
				// setTimeout(() => {
				// 	uni.navigateTo({
				// 		url: `/pages/webView/index`
				// 	})
				// }, 1000)
			},
	    }
	}
</script>

<style lang="scss" scoped>
	.video-page {
		.video-box, video, .img {
			width:100%;
			height: 100%;
		}
		.box {
			width: 100px;
			height: 100px;
			background-color: transparent;
			z-index: 9;
			position: fixed;
			right: 16%;
			bottom: 13%;
		}
	}
</style>

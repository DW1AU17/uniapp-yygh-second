<template>
    <view class="video-page">
        <view class="video-box">
			<video
				v-if="name"
				:src="'https://www.zjgoshine.com:9001/video/'+ name +'.mp4'"
				:autoplay="true"
				:show-fullscreen-btn="false"
				@error="videoErrorCallback" 
				@timeupdate="getProgress"
				controls
			></video>
			<!-- <image class="img" src="/static/ui/123.jpg"></image> -->
        </view>
		<arrow :show="show"></arrow>
		<view v-if="!name.includes('桐君堂')" class="box" @tap="toNextPage"></view>
    </view>
</template>

<script>
	import Arrow from '@/components/arrow/arrow'
	import { getDates } from '@/common/utils/index'
	
	const activeDateList = ['2021-02-11', '2021-02-12', '2021-02-13', '2021-02-14', '2021-02-15', '2021-02-16', '2021-02-17']
	export default {
		components: {
			arrow: Arrow
		},
	    data() {
	        return {
	            src: '',
				show: false,    // 指示是否显示
				title: '',      // 分享时的介绍
				today: '', 
				name: ''
	        }
	    },
	    onLoad({ name }) {
			this.showLoging()
			uni.hideLoading()
			let today = getDates(1)[0].searchDate
			this.name = name
			this.today = today
			if (!name.includes('桐君堂')) {
				this.title = `福到健康到，${name}医师送好礼啦！`
			} else {
				this.title = `福到健康到，${name}送祝福啦！`
			}
		},
		/**
		 * 分享到微信好友
		 */
		onShareAppMessage() {
			const img = uni.getSystemInfoSync().platform == 'ios' ? encodeURIComponent(this.name) : this.name
			return {
				title: this.title,
				path: `/pages/video/video?name=${this.name}`,
				imageUrl: `https://www.zjgoshine.com:9001/video/${img}1.jpg`
			}
		},
		onShareTimeline() {
			return {
				title: this.title,
				path: `/pages/video/video?name=${this.name}`,
				imageUrl: `https://www.zjgoshine.com:9001/video/${this.name}.jpg`
			}
		},
	    methods: {
			getProgress(e) {
				let { currentTime, duration } = e.detail
				let scale = Math.ceil(duration - currentTime)
				// scale 秒
				if (scale <= 6 && scale !== 0 && !this.name.includes('桐君堂')) {
					this.show = true
				}
			},
	        videoErrorCallback(e) {
				console.log(e.target)
				// this.errorAlert('当前视频加载失败')
	        },
			toNextPage() {
				// TODO 判断是否是当日视频
				this.errorAlert('即将跳转至福袋页面', 1000, 'none')
				// #ifdef MP-WEIXIN
				uni.navigateToMiniProgram({
				    appId: 'wx692f2eeb703106f0',
				    path: 'packages/ump/new-lottery/casino/index?alias=aq7i4g3w0kvo&shopAutoEnter=1'
				})
				// #endif
				
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

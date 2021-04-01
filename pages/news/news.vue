<template>
	<view>
		<web-view :src="news[index]"></web-view>
	</view>
</template>

<script>
	let news = [
		'https://mp.weixin.qq.com/s/0HJKU_jtAfFaEJ2-pPHd_g',
		'https://mp.weixin.qq.com/s/AWiebbHYbtOeFa01jg2MuQ',
		'https://mp.weixin.qq.com/s/pz30pAMyxzupFZW3l4C3ig',
		'https://mp.weixin.qq.com/s/qAZa8bjdH_bb-LAasjzgvA',
		'https://mp.weixin.qq.com/s/lr3bNw4uSpfkKpzg9cifdQ',
		// 'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MjM5ODgxNjg0Mw==&action=getalbum&album_id=1777367310370914306#wechat_redirect'
	]
	
	// 生长发育文章
	let growthNews = [
		'https://mp.weixin.qq.com/s?__biz=MjM5ODgxNjg0Mw==&mid=2651090610&idx=1&sn=fc6a930f951f2270d9b066325d3cbaf8&chksm=bd3433968a43ba80b112bcdc8f37b7cdb43a8c56e3568893fb054b116dac147a57a772b389c9&scene=178&cur_album_id=1777367310370914306#rd',
		'https://mp.weixin.qq.com/s?__biz=MjM5ODgxNjg0Mw==&mid=2651090369&idx=1&sn=c4760a4102e94464f114ce8527491f49&chksm=bd3430e58a43b9f373f111ffd4ae046994d3654f9a5d12c21f6a7d1965d2925ea7ec2ff3ffc6&scene=178&cur_album_id=1777367310370914306#rd',
		'https://mp.weixin.qq.com/s?__biz=MjM5ODgxNjg0Mw==&mid=2651090298&idx=1&sn=c0d5d6032c4fef105132e9313a294d1a&chksm=bd34305e8a43b948d07bdeeeaf8e69a3438a5fd41adda4f28529427edf6af449f092d9c645ea&scene=178&cur_album_id=1777367310370914306#rd',
		'https://mp.weixin.qq.com/s?__biz=MjM5ODgxNjg0Mw==&mid=2651084436&idx=1&sn=01f21c44dd5889965bc3a0d184bedf36&chksm=bd340bb08a4382a6c19df85a9cf1d3d5df5d27f0f209d801cacc259d2d1afa0cd2bc6194e9db&scene=178&cur_album_id=1777367310370914306#rd',
		'https://mp.weixin.qq.com/s?__biz=MjM5ODgxNjg0Mw==&mid=2651080499&idx=1&sn=dd5f14ce1f681d945040ec1bf4d61b3a&chksm=bd341a178a439301dfad8e70781e21138e963be551241559825527796ed53ccdb9ebb31a6d87&scene=178&cur_album_id=1777367310370914306#rd',
		'https://mp.weixin.qq.com/s?__biz=MjM5ODgxNjg0Mw==&mid=2651076498&idx=1&sn=acb4d5a3a3de5d723afda4672935a46c&chksm=bd346ab68a43e3a09b7dfc1a27085c6abd033389de0337fc0bafac0cb3e5fd5d2ade5983c55b&scene=178&cur_album_id=1777367310370914306#rd',
		'https://mp.weixin.qq.com/s?__biz=MjM5ODgxNjg0Mw==&mid=2651076099&idx=1&sn=f5106a1bc95199a2b165f23909ca9437&chksm=bd346b278a43e231f1d98ab9a3f82a0a3e8ea7cdd8a359fb542aff15245db511ab94d3b997f6&scene=178&cur_album_id=1777367310370914306#rd',
	]
	
	export default {
		data() {
			return {
				news: null,
				index: 0
			}
		},
		onLoad({index, type}) {
			this.news = type ? growthNews : news
			this.index = index
		}
	}
</script>

<style>
</style>

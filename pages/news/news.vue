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
		'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MjM5ODgxNjg0Mw==&action=getalbum&album_id=1777367310370914306#wechat_redirect'
	]
	export default {
		data() {
			return {
				news,
				index: 0
			}
		},
		onLoad({index}) {
			this.index = index
		}
	}
</script>

<style>
</style>

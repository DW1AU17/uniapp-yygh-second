<template>
	<view class="search-page">
		<search @input="debounce(search, $event)" placeholder="请输入医生姓名"/>
		<view class="search-result">
			<doctorPanel />
			<doctorPanel />
			<doctorPanel />
			<doctorPanel />
		</view>
	</view>
</template>

<script>
	import search from '@/components/uni-search-bar/uni-search-bar'
	import doctorPanel from '@/components/doctor-panel/doctor-panel'
	export default {
		components: {
			search,
			doctorPanel
		},
		methods: {
			// 防抖
			debounce(fn, $event) {
			    clearTimeout(this.timer) 
			    this.timer = setTimeout(() => {
			        $event && fn($event)   
			    }, 500)
			},
			search(event) {
				console.log(event)
			}
		}
	}
</script>

<style lang="scss">
	.search-page {
		.search-result {
			height: calc(100% - 52px);
			overflow-y: scroll;
			background-color: $bgc-base;
		}
	}
</style>

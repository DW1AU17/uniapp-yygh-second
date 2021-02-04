<template>
	<view class="map-comp" :class="{'hidden': hidden}">
		<map
			:latitude="latitude" 
			:longitude="longitude" 
			:markers="markers"
			show-location="true"
			show-compass="true"
			@tap="getLocation"
		>
		</map>
		<view class="model" @tap="hideMap"></view>
	</view>
</template>

<script>
	export default {
		props: {
			latitude: {
				default: 30.2704256
			},
			longitude: {
				default: 120.1538363
			},
			markers: {
				default: []
			},
			hidden: {
				default: true,
				type: Boolean
			}
		},
		methods: {
			hideMap() {
				this.$emit('update:hidden', true)
			},
			getLocation(e) {
				console.log(e)
			}
		}
	}
</script>

<style lang="scss">
	@mixin full-up {
	    width: 100%;
	    height: 100%;
		top: 0;
	}
	
	.map-comp {
		@include full-up;
		position: fixed;
		display: flex;
		justify-content: center;
		align-items: center;
		top: 0;
		&.hidden {
			display: none;
		}
		map {
			z-index: 99;
			width: 80%;
			height: 70%;
			border: 3px solid #fff;
		}
		.model {
			@include full-up;
			background-color: rgba(0, 0, 0, 0.1);
			z-index: 9;
			position: absolute;
		}
	}
</style>

<template>
	<radio-group @change="$emit('input', $event.detail.value)">
		<label v-for="item in list" :key="item.value">
			<radio :value="item.value" :checked="value === item.value" />{{ item.label }}
		</label>
	</radio-group>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				required: true
			},
			value: {
				type: String
			}
		}
	}
</script>

<style lang="scss">
	radio-group {
		label {
			padding: 6rpx 0 12rpx 0;
			display: block;
			border-bottom: 1rpx solid #eee;
		}
		/deep/ .uni-radio-input {
			width: 38rpx;
			height: 38rpx;
			margin-bottom: 4rpx;
		}		
	}
</style>

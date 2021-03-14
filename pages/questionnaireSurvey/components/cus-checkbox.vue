<template>
	<checkbox-group @change="$emit('input', $event.target.value)">
		<label v-for="(item, index) in list" :key="index">
			<checkbox :value="item.value" :checked="value.includes(item.value)"/> {{ item.label }}
		</label>
	</checkbox-group>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				required: true
			},
			value: {
				type: Array
			}
		}
	}
</script>

<style lang="scss">
	checkbox-group {
		label {
			padding: 6rpx 0 12rpx 0;
			display: block;
			border-bottom: 1rpx solid #eee;
		}
		/deep/ .uni-checkbox-input {
			width: 38rpx;
			height: 38rpx;
			margin-bottom: 4rpx;
		}
	}
</style>

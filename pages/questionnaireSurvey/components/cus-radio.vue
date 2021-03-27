<template>
	<radio-group @change="handleChange">
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
			},
			field: {
				type: String
			}
		},
		methods: {
			handleChange($event) {
				this.$emit('input', { value: $event.detail.value, field: this.field })
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

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

<style>
	label {
		margin-bottom: 12rpx; 
		display: block;
	}
</style>

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

<style>
	label {
		margin-bottom: 12rpx; 
		display: block;
	}
</style>

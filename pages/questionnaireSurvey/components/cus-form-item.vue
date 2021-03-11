<template>
	<view class="cus-form-item">
		<view class="label">{{ label }}</view>
		<view class="item">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			label: {
				type: String,
				required: true
			},
			placeholder: {
				type: String,
				default: ''
			}
		}
	}
</script>

<style lang="scss">
	.cus-form-item {
		display: flex;
		.label {
			width: 80px;
		}
		.item {
			flex: 1;
		}
	}
</style>

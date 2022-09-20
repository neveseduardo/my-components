<template>
	<div class="g-tag">
		<el-tag
			:size="tagSize"
			:closable="closable"
			@click="onClick"
			@close="onClose"
			:type="tagType">
			<slot />
		</el-tag>
	</div>
</template>

<script>
export default {
	name: 'GTag',
	props: {
		type: {
			type: String,
			default: 'info',
			description: 'success/info/warning/danger',
		},
		size: {
			type: String,
			default: 'medium',
			description: 'medium / small / mini',
		},
		closable: {
			type: Boolean,
			default: false,
			description: 'É possível fechar a tag.',
		},
		disabled: {
			type: Boolean,
			default: false,
			description: 'Desabilita o componente.',
		},
	},
	computed: {
		tagType() {
			return this.isEmpty(this.type) ? '' : this.type;
		},
		tagSize() {
			return this.isEmpty(this.size) ? '' : this.size;
		},
	},
	methods: {
		onClick(event) {
			if (this.disabled) return;
			this.$emit('click', event);
		},
		onClose(event) {
			if (this.disabled) return;
			this.$emit('close', event);
		},
	},
};
</script>

<template>
	<div class="g-alert">
		<el-alert
			show-icon
			@close="onClose"
			:title="title"
			:type="type"></el-alert>
	</div>
</template>
<script>
export default {
	name: 'GAlert',
	props: {
		title: {
			type: String,
			default: '',
			description: 'Conteúdo do alerta.',
		},
		closable: {
			type: Boolean,
			default: false,
			description: 'Mostra um botão que fecha o alerta',
		},
		type: {
			type: String,
			default: 'info',
			description: 'success/warning/info/error',
		},
		effect: {
			type: String,
			default: 'light',
			description: 'O modo do alerta: light/dark',
		},
	},
	methods: {
		onClose(event) {
			this.$emit('close', event);
		},
	},
};
</script>

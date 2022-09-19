<template>
	<g-modal
		:name="name"
		:feedback="feedback"
		:custom_method_when_opening="downloadFile"
		:custom_method_when_closing="clearFeedback"
		:click_to_close="click_to_close">
		<h3 class="vm--modal-title">Baixando Arquivo</h3>
		<p class="vm--modal-subtitle">
			Por favor, aguarde enquanto baixamos o seu arquivo.
		</p>
		<g-spinner />
	</g-modal>
</template>

<script>
export default {
	name: 'GModalDownload',
	props: {
		feedback: { type: Object, required: true },
		click_to_close: { type: Boolean, default: true },
	},
	data: () => ({
		name: 'ModalDownload',
	}),
	methods: {
		downloadFile(val) {
			this.$emit('download-file', val);
		},
		clearFeedback() {
			const obj = {};
			this.$emit('update:feedback', obj);
		},
	},
};
</script>

<template>
	<vue-modal
		:name="name"
		class="g-modal vue-modal"
		@before-open="beforeOpen"
		@before-close="beforeClose"
		:width="width"
		height="auto"
		:click-to-close="click_to_close">
		<template v-if="is_processing">
			<g-spinner />
		</template>
		<template v-else>
			<template v-if="!feedbackLength">
				<slot :params="params" />
			</template>

			<template v-else-if="feedbackLength && feedback.success">
				<g-modal-success
					:modal_name="name"
					:message="feedback.message"/>
			</template>

			<template v-else-if="feedbackLength && !feedback.success">
				<g-modal-fail :modal_name="name" :feedback="feedback" />
			</template>
		</template>
	</vue-modal>
</template>

<script>
export default {
	name: 'GModal',
	props: {
		name: { type: String, default: '', description: 'O Nome do modal.' },
		width: {
			type: Number,
			default: 550,
			description: 'Largura fixa do modal',
		},
		is_processing: {
			type: Boolean,
			default: false,
			description: 'Esperando processamento.',
		},
		feedback: {
			type: Object,
			default: () => ({}),
			description: 'Objeto de configuração de notificação.',
		},
		custom_method_when_opening: {
			type: Function,
			default: undefined,
			description: 'Método é chamado antes de abrir o modal',
		},
		custom_method_when_closing: {
			type: Function,
			default: undefined,
			description: 'Método é chamado antes de fechar o modal',
		},
		click_to_close: {
			type: Boolean,
			default: true,
			description: 'Botão para fechar o modal',
		},
	},
	data: () => ({ params: {} }),
	computed: {
		feedbackLength() {
			return Object.keys(this.feedback).length;
		},
	},
	methods: {
		beforeOpen(event) {
			document.body.classList.add('modal-opened');
			this.handleAlertMessages();
			if (event.params) {
				this.params = event.params.data;
				if (this.custom_method_when_opening)
					this.custom_method_when_opening(this.params);
			}
		},
		beforeClose() {
			document.body.classList.remove('modal-opened');
			if (this.custom_method_when_closing)
				this.custom_method_when_closing();
		},
		handleAlertMessages() {
			this.$message.closeAll();
			this.$notify.closeAll();
		},
	},
};
</script>

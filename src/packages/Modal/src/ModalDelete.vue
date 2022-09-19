<template>
	<g-modal
		v-slot="{ params }"
		:name="name"
		:is_processing="is_processing"
		:feedback="feedback"
		:custom_method_when_closing="clearFeedbackOnClose">
		<g-icon
			class="vm--modal-icon vm--modal-icon-red"
			name="delete_outline"/>
		<h3 class="vm--modal-title">
			Excluir {{ params.titulo || params.nome }}
		</h3>
		<p class="vm--modal-text">
			Tem certeza que deseja excluir <strong>{{ params.nome }}</strong>? <br />
			Essa ação não poderá ser desfeita!
		</p>
		<slot />
		<div class="vm--modal-btns vm--modal-btns-vertical">
			<g-button
				id="botao-excluir"
				:disabled="btn_disabled"
				type="danger"
				@click="$emit('submit-delete', params)">
				Excluir
			</g-button>
			<g-button type="link" @click="$modal.hide(name)">
				Cancelar
			</g-button>
		</div>
	</g-modal>
</template>

<script>
export default {
	name: 'GModalDelete',
	props: {
		is_processing: { type: Boolean, required: true },
		feedback: { type: Object },
		btn_disabled: {
			type: Boolean,
			default: false,
		},
		name: {
			type: String,
			default: 'ModalDelete',
		},
	},
	methods: {
		clearFeedbackOnClose() {
			const feedbackClean = {};
			this.$emit('update:feedback', feedbackClean);
		},
	},
};
</script>

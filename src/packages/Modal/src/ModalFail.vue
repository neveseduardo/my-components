<template>
	<div class="d-flex flex-column align-items-center">
		<g-icon
			class="vm--modal-icon vm--modal-icon-red"
			name="priority_high"/>
		<h3 class="vm--modal-title">Falha!</h3>
		<p class="vm--modal-text">
			<strong>{{ feedback.message }}</strong>
		</p>
		<template v-if="feedback.data">
			<p
				:key="errosIndex"
				class="vm--modal-text-alert"
				v-for="(erros, errosIndex) in feedback.data">
				<strong :key="erroIndex" v-for="(erro, erroIndex) in erros">
					Erro: {{ erro }}
				</strong>
			</p>
		</template>
		<div class="vm--modal-btns d-flex justify-content-center">
			<button class="btn btn-cancelar" @click="$modal.hide(modal_name)">
				Fechar
			</button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'GModalFail',
	props: {
		modal_name: { type: String, required: true },
		feedback: { type: Object, required: true },
	},
};
</script>

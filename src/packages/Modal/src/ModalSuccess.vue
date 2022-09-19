<template>
	<div class="d-flex flex-column align-items-center">
		<g-icon class="vm--modal-icon vm--modal-icon-green" name="check" />
		<h3 class="vm--modal-title">{{ message }}</h3>
		<div class="vm--modal-btns d-flex justify-content-center">
			<button class="btn btn-cancelar" @click="$modal.hide(modal_name)">
				Fechar
			</button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'GModalSuccess',
	props: {
		modal_name: { type: String, required: true },
		message: { type: String, required: true },
	},
};
</script>

<style scoped></style>

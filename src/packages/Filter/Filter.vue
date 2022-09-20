<template>
	<div class="card g-filter">
		<div class="card-body">
			<form
				class="g-filter-container"
				@submit.prevent="submitForm"
				action>
				<div class="row justify-content-end">
					<slot />
					<div :class="btn_column">
						<g-button
							type="primary"
							icon="search"
							outlined
							:loading="loading"
							@click="submitForm">
							Buscar
						</g-button>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
export default {
	name: 'GFiltro',
	props: {
		loading: { type: Boolean, default: false },
		submit_filter: {
			type: Function,
			default: () => ({}),
			description: 'A função que será executada ao submeter o filtro.',
		},
		btn_column: {
			type: String,
			default: 'col-12 col-sm-3 col-md-2 col-lg-2',
			description: 'Classe de grid do botão do filtro.',
		},
	},
	methods: {
		submitForm() {
			this.$emit('filter-submitted');
			this.submit_filter();
		},
		watchScroll() {
			const observer = new IntersectionObserver(
				([e]) => {
					e.target.classList.toggle('stuck', e.intersectionRatio < 1);
				},
				{
					threshold: [1],
					rootMargin: '-6px 0px 0px 0px',
				}
			);
			observer.observe(document.querySelector('.g-filter'));
		},
	},
	mounted() {
		this.watchScroll();
	},
};
</script>

<template>
	<span
		@click="onClick"
		class="g-badge"
		:class="[
			type,
			{ outlined, small, large, disabled, isButton: is_button },
		]">
		<g-icon v-if="icon" :name="icon" />
		<slot />
	</span>
</template>

<script>
export default {
	name: 'GBadge',
	props: {
		outlined: {
			type: Boolean,
			default: false,
			description: 'Estilo outline para a badge.',
		},
		small: {
			type: Boolean,
			default: false,
			description: 'Tamanho pequeno para a badge.',
		},
		large: {
			type: Boolean,
			default: false,
			description: 'Tamanho grande para a badge.',
		},
		icon: {
			type: String,
			default: '',
			description: 'Exibe ícone antes do texto',
		},
		type: {
			type: String,
			default: 'default',
			description: 'O tipo da badge: primary/success/warning/danger/info',
		},
		disabled: {
			type: Boolean,
			default: false,
			description: 'Estado do botão',
		},
		is_button: {
			type: Boolean,
			default: false,
			description: 'Se for do tipo button, adiciona hover',
		},
	},
	methods: {
		onClick(event) {
			if (!this.disabled) this.$emit('click', event);
		},
	},
};
</script>

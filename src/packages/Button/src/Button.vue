<template>
	<button
		class="g-button"
		:class="[
			{ 'is-disabled': disabled || loading },
			{ outlined, rounded, circle, small, solid, justIcon },
			type,
		]"
		@click.stop.prevent="onClick"
		:disabled="disabled || loading">
		<span class="icon loading" v-show="loading">
			<g-icon name="refresh" />
		</span>

		<span class="icon prefix" v-show="showIcon && !suffix">
			<g-icon
				v-if="showIcon && !suffix"
				:provide="iconObj.provide"
				:type="iconObj.type"
				:name="iconObj.name"/>
		</span>

		<span class="g-button-content" v-if="!circle">
			<slot />
		</span>
		<span class="icon suffix" v-show="showIcon && suffix">
			<g-icon
				:provide="iconObj.provide"
				:type="iconObj.type"
				:name="iconObj.name"></g-icon>
		</span>
	</button>
</template>

<script>
export default {
	name: 'GButton',
	computed: {
		showIcon() {
			return !this.isEmpty(this.icon) && !this.loading;
		},
		iconObj() {
			return {
				name: this.icon.name ?? this.icon,
				provide: this.icon.provide ?? 'mi',
				type: this.icon.type ?? 'outlined',
			};
		},
	},
	props: {
		icon: {
			type: [String, Object],
			default: () => '',
			description: 'O parametro icon pode ser uma string ou um objeto.',
		},
		suffix: {
			type: Boolean,
			default: false,
			description: 'Determina se o icone vai ficar ao lado direito.',
		},
		disabled: {
			type: Boolean,
			default: false,
			description: 'Desabilita o botão para novos clicks.',
		},
		outlined: {
			type: Boolean,
			default: false,
			description: 'Estilo outlined.',
		},
		rounded: {
			type: Boolean,
			default: false,
			description: 'Estilo arredondado.',
		},
		small: {
			type: Boolean,
			default: false,
			description: 'O botão deve ser menor em relação ao normal.',
		},
		circle: {
			type: Boolean,
			default: false,
			description: 'O botão vai ser renderizado em formato de criculo.',
		},
		justIcon: {
			type: Boolean,
			default: false,
			description: 'Exibe apenas o ícone.',
		},
		type: {
			type: String,
			default: 'primary',
			description: 'primary/success/warning/info/link/default',
		},
		loading: {
			type: Boolean,
			default: false,
			description: 'Espera de carregamento.',
		},
		solid: { type: Boolean, default: true, description: '' },
	},
	methods: {
		onClick(e) {
			this.$emit('click', e);
		},
	},
};
</script>

<template>
	<div
		class="g-link g-button"
		:class="[
			{
				link: !is_button && !just_icon,
				justIcon: just_icon,
				outlined,
			},
			type,
		]">
		<el-link
			:disabled="disabled"
			:underline="underline"
			:href="href"
			:type="linkType">
			<template v-if="!sufix && icon !== ''">
				<g-icon :name="icon" />
			</template>
			<template v-if="!just_icon">
				<slot />
			</template>
			<template v-if="sufix"> <g-icon :name="icon" /> </template>
		</el-link>
	</div>
</template>

<script>
export default {
	name: 'GLink',
	props: {
		type: {
			type: String,
			default: 'primary',
			description: 'primary/success/warning/danger/info/secondary',
		},
		underline: {
			type: Boolean,
			default: false,
			description: 'Text decoration do link.',
		},
		disabled: {
			type: Boolean,
			default: false,
			description: 'Desabilita o componente.',
		},
		href: {
			type: String,
			default: '',
			description: 'Caminho de destino do link.',
		},
		is_button: {
			type: Boolean,
			default: false,
			description: 'Indica se o link tem estilo de botão',
		},
		icon: {
			type: String,
			default: '',
			description: 'Icone a ser exibido no link',
		},
		just_icon: {
			type: Boolean,
			default: false,
			description: 'Indica se o link exibe apenas o ícone',
		},
		sufix: {
			type: Boolean,
			default: false,
			description: 'Icone a Direita',
		},
		outlined: {
			type: Boolean,
			default: false,
			description: 'Exibe o link com borda',
		},
	},
	computed: {
		linkType() {
			return this.isEmpty(this.type) ? '' : this.type;
		},
	},
};
</script>

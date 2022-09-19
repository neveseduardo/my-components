<template>
	<i class="g-icon" :class="fawesome ? '' : iconClassName">
		<i v-if="provide === 'fa'" :class="iconClassName"></i>
		{{ material ? name : '' }}
	</i>
</template>

<script>
export default {
	name: 'GIcon',

	props: {
		name: {
			type: String,
			default: '',
			required: true,
			description: 'O nome do icone que vem da doc do mesmo.',
		},
		provide: {
			type: String,
			default: 'mi',
			description:
				'O Provedor do ícone, fa: fontawesome, mi:material-icons, el: element-ui',
		},
		type: {
			type: String,
			default: 'outlined',
			description:
				'filled, round, outlined, two-tone, sharp | fa, fas, fab, far',
		},
	},
	computed: {
		material() {
			return this.provide === 'mi';
		},
		fawesome() {
			return this.provide === 'fa';
		},
		iconClassName() {
			switch (this.provide) {
				case 'fa': {
					return `${this.type} fa-${this.name}`;
				}
				case 'mi': {
					return this.type === 'filled' ?
						'material-icons' :
						`material-icons-${this.type}`;
				}
				case 'el': {
					return `el-icon-${this.name}`;
				}
				default: {
					return '';
				}
			}
		},
	},
};
</script>

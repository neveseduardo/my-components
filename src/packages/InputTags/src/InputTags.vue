<template>
	<div class="g-input-tags">
		<g-input
			ref="input"
			v-model="newTag"
			:placeholder="loading ? 'Carregando...' : placeholder"
			:disabled="disabled"
			@keydown="addTag"
			:loading="loading"/>
		<div class="tags">
			<g-tag
				:type="validate(tag) ? 'secondary' : 'danger'"
				v-for="(tag, index) in mutable"
				:key="index"
				closable
				@close="removeTag(tag)"
				v-tooltip.top="!validate(tag) && 'Valor inválido'">
				{{ tag }}
			</g-tag>
		</div>
	</div>
</template>

<script>
export default {
	name: 'GInputTags',
	data() {
		return {
			newTag: '',
			triggerKeys: ['Comma', 'Enter', 'Space'],
		};
	},
	props: {
		value: {
			type: [Array],
			default: () => [],
			description: 'O valor v-model padrão',
		},
		disabled: {
			type: Boolean,
			default: false,
			description: 'Desabilita o input.',
		},
		placeholder: {
			type: String,
			default: '',
			description: 'String com o valor do placeholder',
		},
		loading: {
			type: Boolean,
			default: false,
			description: 'Estado de loading',
		},
		validate: {
			type: Function,
			default: () => true,
			description: 'Função que verifica se o valor inserido é válido',
		},
	},
	computed: {
		mutable: {
			get() {
				return this.value;
			},
		},
		hasValidateFunction() {
			return this.validate;
		},
	},
	methods: {
		addTag(e) {
			if (this.triggerKeys.includes(e.code)) {
				e.preventDefault();
				if (!this.isEmpty(this.newTag)) {
					const tempTags = [...this.mutable, ...this.setTags()];
					this.newTag = '';
					this.$emit('input', tempTags);
				}
			}
		},
		removeTag(tag) {
			const tempTags = this.mutable;
			tempTags.splice(tempTags.indexOf(tag), 1);
			this.$emit('input', tempTags);
		},
		setTags() {
			const arr = [];
			const newValues = this.newTag.split(/[ ,]+/).filter(Boolean);
			if (!Array.isArray(newValues)) [newValues];
			newValues.forEach((value) => arr.push(value));
			return arr;
		},
	},
};
</script>

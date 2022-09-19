<template>
	<div class="g-select" :class="{ focused, focus, is_invalid, is_disabled }">
		<el-select
			ref="select"
			v-model="mutable"
			popper-class="g-select-nested-popper"
			placeholder
			filterable
			clearable
			:disabled="disabled"
			size="large"
			collapse-tags
			@change="onChange"
			@focus="onFocus"
			@blur="onBlur"
			@clear="onClear"
			@visible-change="onVisibleChange">
			<template #empty>
				<ul class="nested-list" @click="handleFocus(true)">
					<li
						v-for="(option, index) in options"
						:key="index"
						class="nested-item nested-list-parent"
						@click.stop="onOptionClick(option)">
						<span v-show="isEmpty(selected)" class="fade-in">
							{{ option.label }}
						</span>

						<ul
							v-show="
								!isEmpty(selected) && selected === option.label
							"
							class="fade-in">
							<li
								class="nested-item nested-back"
								@click.stop="clearSelected">
								<span>
									<g-icon name="arrow_back" />
								</span>
							</li>
							<li
								v-for="(op, index2) in option.childrens"
								:key="index2 + 10"
								class="nested-item nested-list-child"
								@click.stop="handleSelect(op)">
								<span>{{ op.label }}</span>
							</li>
						</ul>
					</li>
				</ul>
			</template>
		</el-select>
		<span class="d-flex" @click="$refs.select.focus()">
			<template v-if="loading">Carregando opções...</template>
			<template v-else>{{ placeholder }}</template>
		</span>
	</div>
</template>

<script>
export default {
	name: 'g-select-nested',
	props: {
		value: {
			type: [Object, String],
			required: true,
			default: () => ({}),
			description: 'O valor para v-model',
		},
		options: {
			type: Array,
			default: () => [],
			description: 'Opções para rederização.',
		},
		placeholder: {
			type: String,
			default: '',
			description: 'O valor do placeholder (string)',
		},
		invalid: {
			type: Boolean,
			default: false,
			description: 'Adiciona a classe invalid para validação',
		},
		disabled: {
			type: Boolean,
			default: false,
			description: 'O Componente está desabilitado',
		},
		loading: {
			type: Boolean,
			default: false,
			description: 'Para o caregamento de dados.',
		},
	},
	data() {
		return {
			focus: false,
			focused: false,
			selected: null,
		};
	},
	computed: {
		mutable: {
			get() {
				const isValueEmpty = this.isEmpty(this.value);
				if (isValueEmpty) {
					if (this.$refs.select) this.$refs.select.blur();
					this.focus = !isValueEmpty;
				}
				return this.value;
			},
			set(value) {
				this.$emit('input', value);
			},
		},
		is_invalid() {
			return this.invalid && this.isEmpty(this.value);
		},
		is_disabled() {
			return this.disabled || this.loading;
		},
	},
	mounted() {
		this.$watch(
			() => this.$refs?.select?.$children[0]?.focused ?? false,
			(val) => (this.focused = val)
		);
		this.focus = !this.isEmpty(this.value);
		this.createEvent();

		if (!this.isEmpty(this.value)) {
			const { label } = this.value;
			this.$refs.select.selectedLabel = label ?? '';
		}
	},
	methods: {
		onVisibleChange(val) {
			if (!val) {
				const { label } = this.value;
				this.$refs.select.selectedLabel = label ?? '';
			}
		},
		onChange(value) {
			this.onBlur(value);
			this.$emit('change', value);
		},
		onFocus() {
			if (!this.is_disabled) this.focus = true;
		},
		onBlur(value = null) {
			this.$emit('blur', value);
			setTimeout(() => {
				if (!this.isEmpty(value) && !value.target)
					return (this.focus = true);
				this.focus = !this.isEmpty(this.mutable);
			}, 50);
			this.selected = '';
		},
		onClear() {
			this.onBlur();
		},
		onBlurEvent() {
			this.$emit('blur', this.mutable);
			this.focus = !this.isEmpty(this.mutable);
		},
		createEvent() {
			const inputSelect = document.querySelectorAll('.el-select__input');
			Array.from(inputSelect).map((item) =>
				item.addEventListener('blur', this.onBlurEvent, true)
			);
		},
		clearSelected() {
			this.selected = null;
		},
		onOptionClick(option) {
			if (option.childrens && option.childrens.length) {
				return (this.selected = option.label);
			}
			return this.handleSelect(option);
		},
		handleSelect({ value, label }) {
			this.$emit('input', { value, label });
			this.$refs.select.blur();
			this.handleFocus(false);
			this.onBlur(value);
			this.clearSelected();
		},
		handleFocus(value) {
			this.focus = value;
			this.focused = value;
		},
	},
};
</script>

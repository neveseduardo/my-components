<template>
	<div class="g-select" :class="{ focused, focus, is_invalid, is_disabled }">
		<el-select
			ref="select"
			popper-class="g-select-popper"
			@change="onChange"
			@focus="onFocus"
			@blur="onBlur"
			@clear="onClear"
			v-model="mutable"
			placeholder=""
			filterable
			clearable
			:disabled="disabled"
			:multiple="multiple"
			size="large"
			:collapse-tags="collapse_tags">
			<el-option
				v-for="(item, index) in options"
				:key="index"
				:label="item.label"
				:value="item.value"/>
		</el-select>
		<span @click="$refs.select.focus()" class="d-flex">
			<template v-if="is_loading">Carregando opções...</template>
			<template v-else>{{ placeholder }}</template>
		</span>
	</div>
</template>

<script>
export default {
	name: 'GSelect',
	data: () => ({
		focus: false,
		focused: false,
	}),
	props: {
		value: { required: true, default: null },
		options: { type: Array, default: () => [] },
		placeholder: { type: String, default: '' },
		multiple: { type: Boolean, default: false },
		invalid: { type: Boolean, default: false },
		disabled: { type: Boolean, default: false },
		is_loading: { type: Boolean, default: false },
		collapse_tags: { type: Boolean, default: true },
	},
	computed: {
		mutable: {
			get: function() {
				if (this.isEmpty(this.value)) {
					if (this.$refs.select) this.$refs.select.blur();
					this.focus = !this.isEmpty(this.value);
				}
				return this.value;
			},
			set: function(value) {
				this.$emit('input', value);
			},
		},
		is_invalid() {
			return this.invalid && this.isEmpty(this.value);
		},
		is_disabled() {
			return this.disabled || this.is_loading;
		},
	},
	methods: {
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
		},
		onClear() {
			this.onBlur();
		},
		onBlurEvent(event) {
			this.$emit('blur', this.mutable);
			this.focus = !this.isEmpty(this.mutable);
		},
		createEvent() {
			const inputSelect = document.querySelectorAll('.el-select__input');
			Array.from(inputSelect).map((item) =>
				item.addEventListener('blur', this.onBlurEvent, true)
			);
		},
	},
	mounted() {
		this.$watch(
			() => this.$refs?.select?.$children[0]?.focused ?? false,
			(val) => (this.focused = val)
		);
		this.focus = !this.isEmpty(this.value);
		this.createEvent();
	},
};
</script>

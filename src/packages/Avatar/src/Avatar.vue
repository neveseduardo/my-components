<template>
	<div class="g-avatar">
		<div class="g-avatar__item" v-for="(item, index) in list" :key="index">
			<div
				class="g-avatar__image"
				v-tooltip.bottom="index < 2 ? item.name : restOfList">
				<template v-if="moreThanThree(index)">
					<span class="more-than-three">
						{{ '+ ' + avatarsCount }}
					</span>
				</template>

				<template v-if="isEmpty(item.image)">
					<g-icon name="person" />
				</template>
				<template v-else>
					<img :src="item.image" alt="" />
				</template>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'GAvatar',
	props: {
		avatars: {
			type: Array,
			default: () => [],
			require: true,
			description:
				'Array de objetos, contendo url da imagem e nome do usuário',
			validator: (value) => {
				const check = value.every(
					(item) =>
						Object.keys(item).includes('image') &&
						Object.keys(item).includes('name')
				);
				if (!check)
					console.error(
						'Avatar: a propriedade avatars deve ser um array de objetos contendo as propriedades \'name\' e \'image\'.'
					);
				return true;
			},
		},
	},
	methods: {},
	computed: {
		moreThanThree() {
			return (index) =>
				this.avatars.length > 3 && index === this.list.length - 1;
		},
		avatarsCount() {
			return this.avatars.length - 3;
		},
		list() {
			const list = [...this.avatars];
			return list.reverse().slice(0, 3);
		},
		restOfList() {
			let list = [...this.avatars];
			list = list.reverse();
			let rest = [];
			if (this.avatars.length) {
				if (this.moreThanThree)
					rest = list.slice(2, this.avatars.length);
				else rest.push(list.slice(-1));
			}
			rest = rest.reduce((prev, curr) => {
				return (prev += `<p>${curr.name}</p>` + ',');
			}, '');
			rest = String(rest).slice(0, -1);
			if (!this.isEmpty(rest)) return rest.split(',').join('\n');
			return '';
		},
	},
};
</script>

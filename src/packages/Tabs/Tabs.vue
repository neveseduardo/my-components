<template>
	<div class="g-tabs">
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane
				v-for="(item, index) in items"
				:key="index"
				:label="item.title"
				:name="item.title">
				<slot :name="item.slot" />
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
export default {
	name: 'GTabs',
	props: {
		items: {
			type: Array,
			required: true,
			description: 'Array de itens.',
		},
	},
	created() {
		this.activeName = this.items?.[0]?.title ?? '';
	},
	data: () => ({
		activeName: '',
	}),
	methods: {
		handleClick(tab, event) {
			this.$emit('tab-click', tab);
		},
	},
};
</script>

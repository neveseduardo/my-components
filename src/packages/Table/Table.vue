<template>
	<div class="g-listagem card card-body">
		<div v-if="show_header" class="card-title">
			<h5>{{ list_title }}</h5>
			<slot name="card-title-actions" />
		</div>

		<template v-if="loading_data">
			<el-skeleton :rows="7" animated />
		</template>

		<template v-else>
			<table class="table fade-in">
				<thead>
					<tr>
						<th
							v-for="(th, thIndex) in table_th"
							:key="thIndex"
							:width="th.width"
							:class="th.class"
							:style="th.style">
							<template v-if="th.checkable && isEmpty(th.title)">
								<input
									type="checkbox"
									:checked="checked"
									@change="onCheck"/>
							</template>
							<template v-else>{{ th.title }}</template>
						</th>
					</tr>
				</thead>

				<tbody>
					<template v-if="!loading_data && !data_length">
						<tr class="no-data">
							<td colspan="100%">
								<div class="no-data-info">
									<p class="m-0">
										<strong>{{ no_data_msg }}</strong>
									</p>
									<template v-if="update_list_method">
										<g-button
											type="primary"
											small
											icon="undo"
											suffix
											@click="update_list_method">
											Tente novamente
										</g-button>
										<small>
											Essa ação resetará os filtros!
										</small>
									</template>
								</div>
							</td>
						</tr>
					</template>

					<template v-if="!loading_data && data_length">
						<slot name="tableList" />
					</template>
				</tbody>
			</table>

			<slot v-if="!loading_data && data_length" name="pagination" />
		</template>
	</div>
</template>

<script>
export default {
	name: 'GListagem',
	props: {
		list_title: {
			type: String,
			default: '',
			description: 'Título da tabela.',
		},
		show_header: {
			type: Boolean,
			default: true,
			description: 'Mostra o cabeçalho da tabela.',
		},
		table_th: {
			type: Array,
			required: true,
			description:
				'Array de dados do cabeçalho. Pode-se passar title, width, class, style e checkable.',
		},
		has_nested_tables: {
			type: Boolean,
			default: false,
			description: 'Se tem fila de itens dentro de uma linha da tabela.',
		},
		data_length: {
			type: Number,
			required: true,
			description: 'Quantidade de dados da tabela.',
		},
		loading_data: {
			type: Boolean,
			required: true,
			description: 'Deve esperar processamento.',
		},
		checked: {
			type: Boolean,
			default: false,
			description: 'Todos os itens possíveis estão selecionados.',
		},
		update_list_method: {
			type: Function,
			default: undefined,
			description: 'Função que recarrega os dados da tabela.',
		},
		no_data_msg: {
			type: String,
			default: 'Dados não encontrados!',
			description: 'Mensagem de exibição quando não há dados',
		},
	},
	methods: {
		onCheck(event) {
			const { checked } = event.target;
			this.$emit('check', checked);
		},
	},
};
</script>

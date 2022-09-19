<template>
	<div class="g-upload">
		<div class="body">
			<input
				class="input-file"
				:accept="accepted"
				ref="inputFile"
				@change="onChange"
				:multiple="multiple"
				type="file"/>

			<div
				class="select-area"
				:class="[
					{ active: dragover },
					{ 'with-files': Boolean(files.length) },
				]"
				@drop="onDrop"
				@dragenter="onDragenter"
				@dragover="onDragover"
				@dragleave="onDragleave"
				@click.stop.prevent="onSelect">
				<div class="without-files" v-if="!Boolean(files.length)">
					<p>Clique ou arraste e solte o arquivo aqui.</p>
					<g-icon provide="mi" type="outlined" name="upload" />
				</div>
				<div class="with-files" v-else>
					<template v-for="(item, index) in files" :key="index">
						<div class="with-files-item">
							<span>{{ item.name }}</span>
							<g-button
								:loading="loading"
								@click.stop.prevent="onRemove(index)"
								just-icon
								type="secondary"
								icon="close"/>
						</div>
					</template>
				</div>
			</div>
			<transition name="fade">
				<div
					v-if="Boolean(error.length)"
					class="error-area alert alert-danger">
					<small>
						<strong>{{ error }}</strong>
					</small>
				</div>
			</transition>
		</div>
	</div>
</template>

<script>
export default {
	name: 'g-upload',
	props: {
		multiple: {
			type: Boolean,
			default: false,
			description: 'Pode carregar vários arquivos',
		},
		maxNumberMultiple: {
			type: Number,
			default: 10,
			description:
				'Controla número de arquvos que podem ser selecionados',
		},
		maxSizeFile: {
			type: Number,
			default: 2,
			description: 'Controla o tamanho do arquivo em MB',
		},
		accept: {
			type: String,
			default: 'pdf',
			description:
				'img, pdf, xls, doc, ppt, txt, zip ou * com ; como separador',
		},
		disabled: {
			type: Boolean,
			default: false,
			description: 'Desabilita o componente',
		},
		loading: {
			type: Boolean,
			default: false,
			description: 'Loading do componente',
		},
	},
	data() {
		return {
			files: [],
			error: '',
			dragover: false,
			acceptModels: {
				img: 'image/*',
				pdf: '.pdf, .PDF',
				xls: '.xls,.xlsx, .XLS, .XLSX',
				doc: '.doc,.docx,.DOC,.DOCX',
				ppt: '.ppt, .pptx, .PPT, .PPTX',
				txt: 'text/plain',
				zip: '.zip, .ZIP',
			},
			errorDuration: 6000,
		};
	},
	watch: {
		files(newFiles) {
			if (newFiles.length && this.isEmpty(this.error)) {
				this.$emit('change', newFiles);
			}
		},
	},
	computed: {
		accepted() {
			if (String(this.accept).includes('*')) return '';
			const acceptArr = this.accept.split(';');
			const filterArr = [];
			acceptArr.map((item) => {
				if (this.acceptModels[item] !== undefined)
					filterArr.push(this.acceptModels[item]);
			});
			return filterArr.join(',');
		},
	},
	methods: {
		onChange(event) {
			let message = '';
			const files = event.target ?
				Array.from(event.target.files) :
				Array.from(event);

			if (Array.isArray(files) && files.length) {
				if (files.length > this.maxNumberMultiple) {
					message = `O limite (${this.maxNumberMultiple}) de arquivos selecionados foi atingido.`;
					return this.setError(message);
				} else this.setError('');

				if (!this.multiple) {
					this.files = [];
					this.appendFile(files[0]);
				} else {
					Object.entries(files).map(([, v]) => {
						const find =
							this.files.find((i) => i.name === v.name) ?? [];
						if (!find.length) this.appendFile(v);
					});
				}

				if (!this.validateSize()) return;

				if (!this.validateExtension()) {
					message =
						'Alguns arquivos selecionados não possuem formato válido';
					this.setError(message);
				}

				this.withoutDuplicates();

				if (!this.files.length) {
					message =
						'Nenhum dos arquivos selecionado possui formato válido';
					this.setError(message);
				}
			} else this.setError('');
		},
		appendFile(file) {
			const { NODE_TEST } = process.env;
			this.files.push(file);
			if (!NODE_TEST) this.$refs.inputFile.files = this.newFileList();
		},
		onDragenter(event) {
			event.preventDefault();
		},
		onDragover(event) {
			event.preventDefault();
			this.dragover = true;
		},
		onDragleave(event) {
			event.preventDefault();
			this.dragover = false;
		},
		onDrop(event) {
			const { files } = event.dataTransfer;
			let message = '';
			event.preventDefault();
			this.dragover = false;

			Object.entries(files).map(([, v]) => {
				const find = this.files.find((i) => i.name === v.name) ?? [];
				if (!find.length) this.appendFile(v);
			});

			if (!this.validateSize()) return;

			this.validateExtension();
			this.withoutDuplicates();

			if (!this.files.length) {
				message = 'Alguns arquivos selecionados não foram validados';
				this.setError(message);
			}
		},
		onClear() {
			this.files = [];
			this.$refs.inputFile.value = null;
		},
		validateSize() {
			let ret = true,
				message = '';
			this.files.map((file) => {
				if (this.isTooLarge(file.size)) {
					message = `Um dos itens selecionados ultrapassa o limite de ${this.maxSizeFile}MB`;
					ret = false;
					this.setError(message);
				}
			});
			return ret;
		},
		validateExtension() {
			if (this.isEmpty(this.accepted)) return true;
			const arr = this.accepted.split(',');
			const count = this.files.length;
			const filtered = this.files.filter((item) => {
				const ext = '.' + String(item.name).split('.').pop();
				const { type } = item;
				return arr.includes(ext) || arr.includes(type);
			});
			this.files = filtered;
			return Boolean(count === this.files.length);
		},
		classError(file) {
			return this.isTooLarge(file.size);
		},
		isTooLarge(size) {
			const ret = Number(size) / 1024 / 1024;
			return ret > this.maxSizeFile;
		},
		setError(message) {
			this.error = this.isEmpty(message) ? '' : `Erro: ${message}`;
			setTimeout(() => (this.error = ''), this.errorDuration);
		},
		withoutDuplicates() {
			this.files = this.files.filter(
				(v, i, a) => a.findIndex((t) => t.name === v.name) === i
			);
		},
		onSelect() {
			this.$refs.inputFile.click();
		},
		newFileList() {
			const list = new DataTransfer();
			this.files.map((file) => list.items.add(file));
			return list.files;
		},
		onRemove(index) {
			this.setError('');
			this.files.splice(index, 1);
			this.$refs.inputFile.value = null;
		},
		fileSize(file) {
			const ext = ['Bytes', 'KB', 'MB', 'GB'];
			let size = file.size,
				i = 0,
				ret = '';
			while (size > 900) {
				size /= 1024;
				i++;
			}
			ret += Math.round(size * 100) / 100;
			ret += ` ${ext[i]}`;
			return ret;
		},
	},
};
</script>

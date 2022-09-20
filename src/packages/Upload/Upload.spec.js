import Upload from './Upload.vue';
import Icon from '@/packages/Icon/Icon.vue';
import Button from '@/packages/Button/Button.vue';
import ElementUI from 'element-ui';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import * as methods from 'ot-helpers';

const doc = new File([''], 'documento.docx', {
	lastModified: 1449505890000,
	lastModifiedDate: new Date(1449505890000),
	name: 'documento.docx',
	size: 44320,
	type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
});
const img = new File([''], 'documento.png', {
	lastModified: 1449505890000,
	lastModifiedDate: new Date(1449505890000),
	name: 'documento.png',
	size: 44320,
	type: 'image/png',
});

let wrapper;
const localVue = createLocalVue();
localVue.use(ElementUI);
localVue.mixin({ methods });
const factory = () =>
	shallowMount(Upload, {
		propsData: {
			accept: 'doc',
		},
		localVue,
		stubs: {
			[Icon.name]: Icon,
			[Button.name]: Button,
		},
	});
beforeEach(() => (wrapper = factory()));

describe('Upload', () => {
	it('O Componente existe', () => {
		expect(wrapper.exists()).toBe(true);
	});

	it('Deve conter o nome no componente', () => {
		expect(['g-upload', 'GUpload']).toContain(wrapper.vm.$options.name);
	});

	it('Deve conter a classe g-upload', () => {
		const gUpload = wrapper.find('.g-upload');
		expect(gUpload.exists()).toBe(true);
	});

	it('Deve emitir evento change', async () => {
		await wrapper.setData({ files: [doc] });
		await wrapper.vm.$nextTick();
		expect(wrapper.emitted().change).toBeTruthy();
	});

	it('Deve lançar erro para arquivo inválido', async () => {
		await wrapper.vm.onChange([img, img, img]);
		await wrapper.vm.$nextTick();
		expect(wrapper.find('.error-area').exists()).toBe(true);
	});

	it('Não deve lançar erro para arquivo válido', async () => {
		await wrapper.vm.$nextTick();
		await wrapper.vm.onChange([doc]);
		await wrapper.vm.$nextTick();
		expect(wrapper.find('.error-area').exists()).toBe(false);
	});

	it('Deve limpar os arquivos', async () => {
		await wrapper.vm.onChange([doc]);
		await wrapper.vm.onRemove(0);
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.files.length).toBe(0);
	});

	it('Deve remover os arquivos duplicados', async () => {
		await wrapper.vm.onChange([doc, doc]);
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.files.length).toBe(1);
	});

	it('Deve validar o tamanho do arquivo', async () => {
		const mock = new File([''], 'documento.docx');
		Object.defineProperty(mock, 'size', { value: 22958080 });
		Object.defineProperty(mock, 'name', { value: 'documento.docx' });
		await wrapper.vm.onChange([mock]);
		await wrapper.vm.$nextTick();
		const error = wrapper.find('.error-area');
		expect(error.exists()).toBe(true);
		expect(error.text()).toBe(
			'Erro: Um dos itens selecionados ultrapassa o limite de 2MB'
		);
	});
});

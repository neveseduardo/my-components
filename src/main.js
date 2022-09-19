import * as components from '@/components'

export * from '@/components'
export default {
    install: (Vue) => {
        Object.entries({ ...components }).map(([, v]) => Vue.copmponet(v.name, v))
    }
}

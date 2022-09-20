# OT-Components

## Como usar?

```shell
yarn add --save bitbucket:fintools/ot-components#develop ou npm install -S bitbucket:fintools/ot-components#develop
```

```vue
import OTComponents from 'ot-components'
...
Vue.use(OTComponents)

```

```vue
<template>
   <g-icon provide="fa" type="fa" name="home" />
</template>

```

## Como configurar para desenvolvimento:
* Clonar repositÃ³rio
* Mudar p/ branch de desenvolvimento
* Instalar dependÃªncias: `npm i` ou `yarn install`
* Rodar comando para que os arquivos na pasta dev/ nÃ£o sejam assistidos pelo git: 
    * `git update-index --skip-worktree dev/main.js`
    * `git update-index --skip-worktree dev/App.vue`
* Rodar comando para inicializar sub-mÃ³dulo: `git submodule update --init`
* Configurar submÃ³dulo OT-Styles(dev/ot-styles)
    * Mudar p/ branch de desenvolvimento
    * Instalar dependÃªncias: `npm i` ou `yarn install`
    * Rodar o comando adequado(build ou watch) para compilaÃ§Ã£o do SASS(package.json dentro pasta dev/ot-styles)

## Rodar DocumentaÃ§Ã£o com Storybook
* `npm i`
* `npm run storybook` - p/ desenvolvimento
* `npm run build-storybook` - p/ build
* Criar alias p/ acessar o build (opcional)
    * Adicionar no hosts: `127.0.0.1 componentes.localhost`
    * Adicionar no `httpd.vhosts`:
        ```
        <VirtualHost *:80>
            DocumentRoot '...caminho/ot-components/storybook-static'
            ServerName componentes.localhost
            ServerAlias componentes.localhost
            <Directory '...caminho/ot-components/storybook-static'>
                AllowOverride All
                Require all Granted
            </Directory>
        </VirtualHost>
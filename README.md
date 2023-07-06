# project-react-ts

## 本地开发

- 必须使用 yarn

- 安装完依赖后，运行 `yarn vite`，启动项目

## 本地 mock

- 通过 yarn mock-dev 进行 mock 开发，可以在 mock 服务中增加接口

## 构建生产文件

- 运行 `yarn build`

## 环境和命令

目前分为四种环境，开发、测试、预发、线上

命令：

```json
"scripts": {
    "test": "jest", // 单元测试
    "dev": "yarn vite", // DEV环境
    "dev:pre":"yarn vite --mode pre", // 本地Dev连预发
    "build:test": "vite build --mode test", //部署测试环境
    "build": "cross-env NODE_ENV=production vite build", //部署预发环境
    "mock-dev": "yarn mock | cross-env MOCK=true vite", // 开发环境+mock
    "mock": "nodemon --watch ./mock/app.ts --exec \"ts-node\" ./mock/app.ts",
    "preview": "vite preview" // 本地预览
  }
```

## 构建环境与校验

- vite

- tailwindcss & postcss & css module

- eslint(@typescript-eslint)

  - eslint-config-airbnb
  - eslint-plugin-css-modules
  - eslint-config-prettier

- typescript

- commitlint

  - @commitlint/config-conventional
  - husky

- jest

- babel

  - babel-preset-react-app
  - babel-plugin-module-resolver

## 运行时环境

- antd 4 & @ant-design/icons & lodash

- react & react-dom & react-transition-group

- mobx & mobx-react-lite & mobx-value

- react-router-dom & @superwf/mobx-react-router

## 目录结构

```sh
src/
├── component 公共组件或抽象组件
│   ├── App
│   │   ├── emitter.ts
│   │   ├── Header
│   │   │   ├── index.tsx
│   │   │   ├── stepHelper.module.less
│   │   │   ├── store.ts
│   │   │   └── style.module.less
│   │   ├── index.tsx
│   │   ├── Layout.tsx
│   │   ├── logout.ts
│   │   ├── Menu
│   │   │   ├── helper.ts
│   │   │   ├── index.tsx
│   │   │   ├── Link.tsx
│   │   │   ├── store.ts
│   │   │   └── type.ts
│   │   └── store.ts
│   ├── Loading.tsx
│   ├── NoComponentMatchPathname.tsx
│   ├── TransitionRoute
│   │   ├── index.tsx
│   │   └── style.module.less
│   └── Watermark
│       ├── index.tsx
│       └── style.module.less
├── config.ts 一些项目公共全局配置
├── index.tsx 总入口
├── lib 公共的class
│   ├── Router.spec.ts
│   ├── Router.ts
│   ├── TypedEmitter.test.ts
│   └── TypedEmitter.ts
├── page 与菜单路径对应的页面文件
│   └── Home.tsx
├── router.ts 路由单例文件
├── routes.ts 路由配置文件
├── style
│   └── index.css
├── tool 公共纯函数
│   ├── compactQuery.ts
│   ├── getHostEnvPrefix.ts
│   └── getPopupContainer.ts
├── type.ts 公共的类型
└── vendor-module.d.ts 一些没有类型定义的第三方库的类型补丁
```

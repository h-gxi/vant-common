export default {
  name: 'vant-common',
  build: {
    css: {
      base: 'style/index.scss',
      preprocessor: 'sass',
      removeSourceFile: true,
    },
    site: {
      publicPath: '/vant-common/',
    },
    namedExport: false,
    packageManager: 'npm',
  },
  site: {
    title: 'vant-common',
    logo: 'https://unpkg.com/@vant/assets@1.0.8/logo.png',
    description:
      '基于vant3封装的自定义组件库，适用于H5开发迭代，降低开发维护成本。',
    versions: [],
    nav: [
      {
        title: '开发指南',
        items: [
          {
            path: 'home',
            title: '介绍',
          },
          {
            path: 'quickstart',
            title: '快速上手',
          },
          {
            path: 'changelog',
            title: '更新日志',
          },
        ],
      },
      {
        title: '自定义组件',
        items: [
          {
            path: 'header',
            title: 'Header 头部',
          },
          {
            path: 'navbar',
            title: 'Navbar 导航栏',
          },
          {
            path: 'noticebar',
            title: 'Noticebar 滚动通知栏',
          },
          {
            path: 'setps',
            title: 'Steps 步骤条',
          },
          {
            path: 'list',
            title: 'List 列表',
          },
          {
            path: 'list-card',
            title: 'ListCard 列表卡片',
          },
          {
            path: 'address',
            title: 'Address 通讯录',
          },
          {
            path: 'table',
            title: 'Table 表格',
          },
          {
            path: 'action-sheet',
            title: 'ActionSheet 动作面板',
          },
          {
            path: 'action-bar',
            title: 'ActionBar 底部动作栏',
          },
          {
            path: 'popup',
            title: 'Popup 弹出层',
          },
          {
            path: 'popup-radio',
            title: 'PopupRadio 弹出层单选项',
          },
        ],
      },
    ],
  },
};

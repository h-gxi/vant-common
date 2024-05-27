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
    logo: 'https://fastly.jsdelivr.net/npm/@vant/assets/logo.png',
    description: '基于vant3封装的自定义组件库，适用于H5开发迭代，降低开发维护成本。',
    versions: [
      {
        label: 'v1',
        link: '#',
      },
    ],
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
            path: 'noticebar-swipe',
            title: 'NoticebarSwipe 滚动通知栏',
          },
        ],
      },
    ],
  },
};

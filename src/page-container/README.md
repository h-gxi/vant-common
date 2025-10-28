# PageContainer 页面容器

### 介绍

应用页面容器。

### 引入

通过以下方式来全局注册组件，更多注册方式请参考[组件注册](#/quickstart)。

```js
import { createApp } from 'vue';
import { PageContainer } from 'vant-common';

const app = createApp();
app.use(PageContainer);
```

## 代码演示

### 基础用法

```html
 <m-page-container>
      
 </m-page-container>
```

### 自定义背景色
通过 `background` 属性背景颜色，默认背景色 `#f3f4f8`。

```html
 <m-page-container background="#fff">
      
 </m-page-container>
```

## API

### PageContainerProps

| 参数   | 说明     | 类型               | 默认值 |
| ------ | -------- | ------------------ | ------ |
| background | 自定义背景色 | string |    -    |
| min-height | 容器最小高度，默认值100% | string |    `100%`    |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称 | 默认值 | 描述 |
| --- | --- | --- |
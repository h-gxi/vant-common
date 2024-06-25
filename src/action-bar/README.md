# ActionBar 底部动作栏

### 介绍

应用页面底部动作栏。

### 引入

通过以下方式来全局注册组件，更多注册方式请参考[组件注册](#/quickstart)。

```js
import { createApp } from 'vue';
import { ActionBar, ActionBarIiem } from 'vant-common';

const app = createApp();
app.use(ActionBar);
app.use(ActionBarIiem);
```

## 代码演示

### 基础用法

```html
<m-action-bar>
  <m-action-bar-item type="button" text="保存修改" @click="onClick" />
</m-action-bar>
```

```js
import { ref } from 'vue';
import { Toast } from 'vant';

export default {
  setup() {
    const onClick = () => {
      Toast('点击了按钮');
    }

    return {
      onClick
    };
  },
};
```

### 朴素按钮
类型`button`按钮，通过 plain 属性将按钮设置为朴素按钮，朴素按钮的文字为按钮颜色，背景为白色。
支持`slot`默认插槽来显示底部额外内容。

```html
<m-action-bar>
  <m-action-bar-item type="button" text="取消回执" plain @click="onClick">
    <div class="foolter">
      05:00后无法取消
    </div>
  </m-action-bar-item>
</m-action-bar>
```

```css
.foolter {
  display: flex;
  justify-content: center;
  padding-top: 12px; 
  font-size: 12px;
  color: #4A4A4A;
}
```

### 不同类型按钮

动作栏分为两种按钮类型，通过`type`属性指定按钮类型 `icon` | `button`。

```html
<m-action-bar>
  <m-action-bar-item type="icon" icon="shop-o" text="草稿箱" @click="onClick" />
  <m-action-bar-item type="button" text="创建通知" @click="onClick" />
</m-action-bar>
```

### 通知公告案例

```html
<m-action-bar>
  <m-action-bar-item type="icon" icon="shop-o" text="草稿箱" to="/mobile/noticeDrafts" />
  <m-action-bar-item 
    type="button" 
    text="创建通知" 
    :to="{ name: 'noticeCreate', query: { action: 'create' }, params: { reload: true } }"
   />
  <m-action-bar-item type="icon" icon="envelop-o" text="收件箱" to="/mobile/noticeInbox" />
</m-action-bar>
```

## API

### ActionBarIiemProps

| 参数   | 说明     | 类型               | 默认值 |
| ------ | -------- | ------------------ | ------ |
| type | 按钮类型 `'icon'` | `'button'` | string |    `icon`    |
| icon | 图标 | string |    -    |
| class-prefix | 类名前缀，用于使用自定义图标 | string |    `van-icon`    |
| dot | 是否显示图标右上角小红点 | boolean |    `false`    |
| disabled | 是否禁止按钮 | boolean |    `false`    |
| plain | 是否为朴素按钮 | boolean |    `false`    |
| text | 按钮文字 | string |    -    |
| to | 点击后跳转的目标路由对象，等同于 vue-router 的 to 属性 | string \| object |    -    |

### Events

| 事件名    | 说明                 | 回调参数             |
| --------- | -------------------- | -------------------- |
| click | 点击按钮，且按钮状态不为加载或禁用时触发 | event: MouseEvent |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称 | 默认值 | 描述 |
| --- | --- | --- |
| --m-action-bar-background-color | _#fff_ | - |
| --m-action-bar-padding | _var(--van-padding-md)_ | - |
| --m-action-bar-padding-top | _var(--van-padding-xs)_ | - |
| --m-action-bar-padding-bottom | _var(--van-padding-xs)_ | - |
| --m-action-bar-icon-size | _22px_ | - |
| --m-action-bar-icon-width | _112px_ | - |
| --m-action-bar-icon-height | _100%_ | - |
| --m-action-bar-icon-text-color | _var(--van-gray-8)_ | - |
| --m-action-bar-icon-font-size | _var(--van-font-size-sm)_ | - |
| --m-action-bar-icon-background-color | _#fff_ | - |
| --m-action-bar-button-width | _151px_ | - |
| --m-action-bar-button-height | _42px_ | - |
| --m-action-bar-button-font-size | _var(--van-font-size-lg)_ | - |
| --m-action-bar-button-font-weight | _var(--van-font-weight-bold)_ | - |
| --m-action-bar-button-border-radius | _21px_ | - |
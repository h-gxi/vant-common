# ListCard 列表卡片

### 介绍

列表内容卡片风格展示，很多页面应用场景中被广泛使用。

### 引入

通过以下方式来全局注册组件，更多注册方式请参考[组件注册](#/quickstart)。

```js
import { createApp } from 'vue';
import { ListCard } from 'vant-common';

const app = createApp();
app.use(ListCard);
```

## 代码演示

### 基础用法
`m-list-card` 组件通过属性、插槽方式可灵活使用在不同场景之中，左边为头像区域，右边分为上中下三个区域布局。

```html
<div class="demo-list">
  <m-list-card 
    title="假期安全责任书，各位同学请查收" 
    label="发布于  2024-6-26 11:00" 
    content="尊敬的各位家长：假期将至，为使学生们过一个安全、健康而有意义的假期，切实保护学生的安全。"
    right-icon="share-o"
    right-text="分享"
    toolbar-right-color="#ffa000"
    @click="onClick"
    @header-icon="onHeaderIcon"
    @toolbar-right="onToolbarRight"
  >
    <template #avatar>
      <van-image
        width="18px"
        height="18px"
        src="/images/notification-horn@2x.png"
      />
    </template>
    <template #toolbar-left>
      <div><van-icon name="comment-circle-o" style="margin-right: 4px;" /><span>已读</span><span style="color: black;margin-left: 2px;">20</span></div>
      <div style="margin-left: 12px;"><span>未读</span><span style="color: black;margin-left: 2px;">12</span></div>
      <div style="margin-left: 12px;"><span>已确认</span><span style="color: black;margin-left: 2px;">12</span></div>
    </template>
    <template #toolbar-right>
      <div style="color: #FFA000;">
        <van-icon name="bullhorn-o" style="margin-right: 4px;" />
        提醒
      </div>
    </template>
  </m-list-card>
  <m-list-card 
    title="假期安全责任书，各位同学请查收" 
    content="尊敬的各位家长：假期将至"
    toolbar-left="2024-6-25 17:19"
  >
    <template #avatar>
      <van-image
        width="18px"
        height="18px"
        src="/images/notification-horn@2x.png"
      />
    </template>
    <template #right>
      <van-image
        width="58px"
        height="29px"
        src="images/notviewed-highlight@2x.png"
      />
    </template>
    <template #label>
      王老师 
      <span>
        <van-icon name="manager" color="#4587FA" />
        <van-tag color="#EBF3FF" text-color="#4587FA" style="font-size: 10px;border-radius: 2px;">班主任</van-tag>
      </span> 
    </template>
    <template #toolbar-right>
      <van-icon name="guide-o" style="margin-right: 4px;" />
      分享
    </template>
  </m-list-card>
  <m-list-card 
    title="假期安全责任书，各位同学请查收" 
    label="发布于  2024-6-26 11:00" 
    content="尊敬的各位家长：假期将至"
  >
    <template #avatar>
      <van-image
        width="18px"
        height="18px"
        src="/images/notification-horn@2x.png"
      />
    </template>
  </m-list-card>
</div>
```

```js
import { Toast } from 'vant';

const onClick = ()=> {
  Toast('点击了卡片');
}
const onHeaderIcon = ()=> {
  Toast('点击了分享按钮');
}
const onToolbarRight = ()=> {
  Toast('点击了提醒按钮');
}
```

### 使用LIST组件

`m-list-card` 组件可以搭配 `m-list` 组件使用。

```html
<m-list
  class="m-list"
  :offset="150"
  :query-method="queryMethod"
  :query-model="queryModel"
  image="images/mobile-nodata.png"
  @click="onClick"
>
  <m-list-cell class="m-item">
    <template #default="{item,index}">
      <div v-show="index != 0" class="gray-divider" />
      <m-list-card 
        title="假期安全责任书，各位同学请查收" 
        label="发布于  2024-6-26 11:00" 
        content="尊敬的各位家长：假期将至，为使学生们过一个安全、健康而有意义的假期，切实保护学生的安全。"
        right-icon="share-o"
        right-text="分享"
        toolbar-right-color="#ffa000"
        @click="onClick"
        @header-icon="onHeaderIcon"
        @toolbar-right="onToolbarRight"
      >
        <template #avatar>
          <van-image
            width="18px"
            height="18px"
            src="https://unpkg.com/@vant/assets@1.0.8/cat.jpeg"
          />
        </template>
        <template #toolbar-left>
          <div><van-icon name="comment-circle-o" style="margin-right: 4px;" /><span>已读</span><span style="color: black;margin-left: 2px;">20</span></div>
          <div style="margin-left: 16px;"><span>未读</span><span style="color: black;margin-left: 2px;">12</span></div>
          <div style="margin-left: 16px;"><span>已确认</span><span style="color: black;margin-left: 2px;">12</span></div>
        </template>
        <template #toolbar-right>
          <van-icon name="bullhorn-o" style="margin-right: 6px;" />
          <span class="m-margin-l-6">提醒</span>
        </template>
      </m-list-card>
    </template>
  </m-list-cell>
</m-list>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| right-icon | 右上角按钮图标 | string_ | - |
| right-text | 右上角按钮文字 | _string_ | - |
| class-prefix | 类名前缀，用于使用自定义图标 | _string_ | `van-icon` |
| title | 标题文字 | _string_ | - |
| label | 标签文字 | _string_ | - |
| content | 正文 | _string_ | - |
| toolbar-left | 底部左边文字 | _string_ | - |
| content-class | 正文样式，默认`van-multi-ellipsis--l2` 文字超出2行出现省略号表示 | _string_ | `van-multi-ellipsis--l2` |
| toolbar-right-color | 底部右边字体颜色 | _string_ | - |

### Events

| 事件名 | 说明                               | 回调参数 |
| ------ | ---------------------------------- | -------- |
| click   | 点击卡片时触发 | _event: MouseEvent_        |
| header-icon   | 点击右上角按钮时触发 | _event: MouseEvent_        |
| toolbar-right   | 点击右下角按钮时触发 | _event: MouseEvent_      |

### Slots

| 名称  | 说明               |
| ----- | ------------------ |
| avatar | 自定义左侧头像图标         |
| label  | 自定义header-label |
| right  | 自定义header-icon |
| toolbar-left  | 自定义toolbar-left |
| toolbar-right  | 自定义toolbar-right |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](#/zh-CN/config-provider)。

| 名称                         | 默认值                    | 描述 |
| ---------------------------- | ------------------------- | ---- |
| --m-list-card-background-color        | _#fff_ | -    |
| --m-list-card-margin-bottom        | _16px_ | -    |
| --m-list-card-box-shadow        | _0px 0px 10px 0px rgba(0,0,0,0.08)_ | -    |
| --m-list-card-border-radius        | _10px_ | -    |
| --m-list-card-padding-right        | _20px_ | -    |
| --m-list-card-left-padding-right        | _8px_ | -    |
| --m-list-card-left-padding-left        | _12px_ | -    |
| --m-list-card-left-padding-top        | _20px_ | -    |
| --m-list-card-header-title-color        | _var(--van-gray-8)_ | -    |
| --m-list-card-header-label-color        | _var(--van-gray-7)_ | -    |
| --m-list-card-header-title-font-size        | _16px_ | -    |
| --m-list-card-header-title-font-weight        | _600_ | -    |
| --m-list-card-label-font-size        | _14px_ | -    |
| --m-list-card-label-line-height        | _16px_ | -    |
| --m-list-card-content-font-size        | _14px_ | -    |
| --m-list-card-right-weight        | _70px_ | -    |

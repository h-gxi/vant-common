import { type PropType } from 'vue';
export type NoticebarValue = {
    title: string;
    [prop: string]: any;
};
export declare const noticebarProps: {
    /** 双向绑定列表 {title} */
    modelValue: {
        type: PropType<NoticebarValue[]>;
        default: null;
    };
    /** 列表数据 v-model/value 二选一，使用value时触发@remove事件*/
    value: {
        type: PropType<NoticebarValue[]>;
        default: null;
    };
    /** 文本颜色 */
    color: StringConstructor;
    /** 滚动条背景 */
    background: StringConstructor;
    /** 左侧图标名称或图片链接，可选值见 Icon 组件 */
    leftIcon: StringConstructor;
    /** 是否在长度溢出时滚动播放 */
    scrollable: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 自动轮播间隔，单位为 ms */
    autoplay: {
        type: NumberConstructor;
        default: number;
    };
};

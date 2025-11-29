import { type ExtractPropTypes } from 'vue';
declare const listCardProps: {
    /** 右上角图标 */
    rightIcon: StringConstructor;
    /** 右上角文字 */
    rightText: StringConstructor;
    /** 类名前缀，用于使用自定义图标 */
    classPrefix: StringConstructor;
    /** 标题文字 */
    title: StringConstructor;
    /** 标签文字 */
    label: StringConstructor;
    /** 正文 */
    content: StringConstructor;
    /** 底部左边文字 */
    toolbarLeft: StringConstructor;
    /** 正文样式 */
    contentClass: {
        type: StringConstructor;
        default: string;
    };
    /** 底部右边字体颜色 */
    toolbarRightColor: StringConstructor;
};
export type ListCardProps = ExtractPropTypes<typeof listCardProps>;
declare const __vue_sfc__: import("vue").DefineComponent<{
    /** 右上角图标 */
    rightIcon: StringConstructor;
    /** 右上角文字 */
    rightText: StringConstructor;
    /** 类名前缀，用于使用自定义图标 */
    classPrefix: StringConstructor;
    /** 标题文字 */
    title: StringConstructor;
    /** 标签文字 */
    label: StringConstructor;
    /** 正文 */
    content: StringConstructor;
    /** 底部左边文字 */
    toolbarLeft: StringConstructor;
    /** 正文样式 */
    contentClass: {
        type: StringConstructor;
        default: string;
    };
    /** 底部右边字体颜色 */
    toolbarRightColor: StringConstructor;
}, any, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("click" | "header-icon" | "toolbar-right")[], "click" | "header-icon" | "toolbar-right", import("vue").PublicProps, Readonly<ExtractPropTypes<{
    /** 右上角图标 */
    rightIcon: StringConstructor;
    /** 右上角文字 */
    rightText: StringConstructor;
    /** 类名前缀，用于使用自定义图标 */
    classPrefix: StringConstructor;
    /** 标题文字 */
    title: StringConstructor;
    /** 标签文字 */
    label: StringConstructor;
    /** 正文 */
    content: StringConstructor;
    /** 底部左边文字 */
    toolbarLeft: StringConstructor;
    /** 正文样式 */
    contentClass: {
        type: StringConstructor;
        default: string;
    };
    /** 底部右边字体颜色 */
    toolbarRightColor: StringConstructor;
}>> & {
    onClick?: ((...args: any[]) => any) | undefined;
    "onHeader-icon"?: ((...args: any[]) => any) | undefined;
    "onToolbar-right"?: ((...args: any[]) => any) | undefined;
}, {
    contentClass: string;
}, {}>;
export default __vue_sfc__;

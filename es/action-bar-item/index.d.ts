import type { PropType, ExtractPropTypes } from 'vue';
export type ActionType = 'icon' | 'button';
declare const actionBarIiemProps: {
    to: PropType<import("vue-router").RouteLocationRaw>;
    url: StringConstructor;
    replace: BooleanConstructor;
} & {
    /** 按钮类型 'icon' | 'button' */
    type: {
        type: PropType<ActionType>;
        default: ActionType;
    };
    /** 图标 */
    icon: StringConstructor;
    /** 类名前缀，用于使用自定义图标 */
    classPrefix: StringConstructor;
    /** 是否显示图标右上角小红点 */
    dot: BooleanConstructor;
    /** 按钮文字 */
    text: StringConstructor;
    /** 是否禁用按钮 */
    disabled: BooleanConstructor;
    /** 朴素按钮 */
    plain: BooleanConstructor;
    /** 行内元素 */
    inline: BooleanConstructor;
    /** 按钮颜色，支持传入 linear-gradient 渐变色 */
    color: StringConstructor;
    /** 按钮样式 */
    mClass: PropType<unknown>;
};
export type ActionBarIiemProps = ExtractPropTypes<typeof actionBarIiemProps>;
declare const __vue_sfc__: import("vue").DefineComponent<{
    to: PropType<import("vue-router").RouteLocationRaw>;
    url: StringConstructor;
    replace: BooleanConstructor;
} & {
    /** 按钮类型 'icon' | 'button' */
    type: {
        type: PropType<ActionType>;
        default: ActionType;
    };
    /** 图标 */
    icon: StringConstructor;
    /** 类名前缀，用于使用自定义图标 */
    classPrefix: StringConstructor;
    /** 是否显示图标右上角小红点 */
    dot: BooleanConstructor;
    /** 按钮文字 */
    text: StringConstructor;
    /** 是否禁用按钮 */
    disabled: BooleanConstructor;
    /** 朴素按钮 */
    plain: BooleanConstructor;
    /** 行内元素 */
    inline: BooleanConstructor;
    /** 按钮颜色，支持传入 linear-gradient 渐变色 */
    color: StringConstructor;
    /** 按钮样式 */
    mClass: PropType<unknown>;
}, any, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "click"[], "click", import("vue").PublicProps, Readonly<ExtractPropTypes<{
    to: PropType<import("vue-router").RouteLocationRaw>;
    url: StringConstructor;
    replace: BooleanConstructor;
} & {
    /** 按钮类型 'icon' | 'button' */
    type: {
        type: PropType<ActionType>;
        default: ActionType;
    };
    /** 图标 */
    icon: StringConstructor;
    /** 类名前缀，用于使用自定义图标 */
    classPrefix: StringConstructor;
    /** 是否显示图标右上角小红点 */
    dot: BooleanConstructor;
    /** 按钮文字 */
    text: StringConstructor;
    /** 是否禁用按钮 */
    disabled: BooleanConstructor;
    /** 朴素按钮 */
    plain: BooleanConstructor;
    /** 行内元素 */
    inline: BooleanConstructor;
    /** 按钮颜色，支持传入 linear-gradient 渐变色 */
    color: StringConstructor;
    /** 按钮样式 */
    mClass: PropType<unknown>;
}>> & {
    onClick?: ((...args: any[]) => any) | undefined;
}, {
    replace: boolean;
    type: ActionType;
    disabled: boolean;
    dot: boolean;
    plain: boolean;
    inline: boolean;
}, {}>;
export default __vue_sfc__;

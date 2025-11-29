import type { PropType, ExtractPropTypes } from 'vue';
export type ActionSheetAction = {
    name?: string;
    icon?: string;
};
export declare const actionSheetProps: {
    /** 面板选项列表 */
    actions: {
        type: PropType<ActionSheetAction[]>;
        default: never[];
    };
    /** 标题 */
    title: {
        type: StringConstructor;
        default: string;
    };
    /** 取消按钮文字 */
    cancelText: {
        type: StringConstructor;
        default: string;
    };
    /** 是否显示圆角 */
    round: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 左上角按钮图标  */
    leftIcon: {
        type: StringConstructor;
        default: string;
    };
    /** 是否在点击选项后关闭 */
    closeOnClickAction: {
        type: BooleanConstructor;
        default: boolean;
    };
};
export type ActionSheetProps = ExtractPropTypes<typeof actionSheetProps>;
declare const __vue_sfc__: import("vue").DefineComponent<{
    /** 面板选项列表 */
    actions: {
        type: PropType<ActionSheetAction[]>;
        default: never[];
    };
    /** 标题 */
    title: {
        type: StringConstructor;
        default: string;
    };
    /** 取消按钮文字 */
    cancelText: {
        type: StringConstructor;
        default: string;
    };
    /** 是否显示圆角 */
    round: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 左上角按钮图标  */
    leftIcon: {
        type: StringConstructor;
        default: string;
    };
    /** 是否在点击选项后关闭 */
    closeOnClickAction: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    visible: import("vue").Ref<boolean>;
    onclick: (item: ActionSheetAction, i: number) => void;
    onClose: () => void;
    open: () => void;
    close: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("select" | "cancel")[], "select" | "cancel", import("vue").PublicProps, Readonly<ExtractPropTypes<{
    /** 面板选项列表 */
    actions: {
        type: PropType<ActionSheetAction[]>;
        default: never[];
    };
    /** 标题 */
    title: {
        type: StringConstructor;
        default: string;
    };
    /** 取消按钮文字 */
    cancelText: {
        type: StringConstructor;
        default: string;
    };
    /** 是否显示圆角 */
    round: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 左上角按钮图标  */
    leftIcon: {
        type: StringConstructor;
        default: string;
    };
    /** 是否在点击选项后关闭 */
    closeOnClickAction: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    onSelect?: ((...args: any[]) => any) | undefined;
    onCancel?: ((...args: any[]) => any) | undefined;
}, {
    actions: ActionSheetAction[];
    round: boolean;
    title: string;
    cancelText: string;
    leftIcon: string;
    closeOnClickAction: boolean;
}, {}>;
export default __vue_sfc__;

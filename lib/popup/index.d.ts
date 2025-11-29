import type { ExtractPropTypes } from 'vue';
export declare const POPUP_KEY: unique symbol;
export declare const popupProps: {
    /** 标题 */
    title: {
        type: StringConstructor;
        default: string;
    };
    /** 是否显示圆角 */
    round: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 是否显示标题栏 */
    header: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 是否显示底部按钮 */
    footer: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 左上角按钮 可选值 arrow-left | cross  */
    leftIcon: {
        type: StringConstructor;
        default: string;
    };
    /** 底部左侧按钮  */
    cancelText: {
        type: StringConstructor;
        default: string;
    };
    /** 底部左侧按钮回调函数  */
    cancelFunc: {
        type: FunctionConstructor;
        default: null;
    };
    /** 底部右侧按钮  */
    confirmText: {
        type: StringConstructor;
        default: string;
    };
    /** 标题栏左侧按钮回调函数  */
    backFunc: {
        type: FunctionConstructor;
        default: null;
    };
    /** 底部右侧按钮回调函数  */
    confirmFunc: {
        type: FunctionConstructor;
        default: null;
    };
    /** 是否调用回调函数后自动关闭 */
    autoClose: {
        type: BooleanConstructor;
        default: boolean;
    };
};
export type PopupProps = ExtractPropTypes<typeof popupProps>;
declare const __vue_sfc__: import("vue").DefineComponent<{
    /** 标题 */
    title: {
        type: StringConstructor;
        default: string;
    };
    /** 是否显示圆角 */
    round: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 是否显示标题栏 */
    header: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 是否显示底部按钮 */
    footer: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 左上角按钮 可选值 arrow-left | cross  */
    leftIcon: {
        type: StringConstructor;
        default: string;
    };
    /** 底部左侧按钮  */
    cancelText: {
        type: StringConstructor;
        default: string;
    };
    /** 底部左侧按钮回调函数  */
    cancelFunc: {
        type: FunctionConstructor;
        default: null;
    };
    /** 底部右侧按钮  */
    confirmText: {
        type: StringConstructor;
        default: string;
    };
    /** 标题栏左侧按钮回调函数  */
    backFunc: {
        type: FunctionConstructor;
        default: null;
    };
    /** 底部右侧按钮回调函数  */
    confirmFunc: {
        type: FunctionConstructor;
        default: null;
    };
    /** 是否调用回调函数后自动关闭 */
    autoClose: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    visible: import("vue").Ref<boolean>;
    onBack: () => void;
    onConfirm: () => void;
    onCancel: () => void;
    setValue: (val: any) => void;
    open: () => void;
    close: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, never[], never, import("vue").PublicProps, Readonly<ExtractPropTypes<{
    /** 标题 */
    title: {
        type: StringConstructor;
        default: string;
    };
    /** 是否显示圆角 */
    round: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 是否显示标题栏 */
    header: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 是否显示底部按钮 */
    footer: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 左上角按钮 可选值 arrow-left | cross  */
    leftIcon: {
        type: StringConstructor;
        default: string;
    };
    /** 底部左侧按钮  */
    cancelText: {
        type: StringConstructor;
        default: string;
    };
    /** 底部左侧按钮回调函数  */
    cancelFunc: {
        type: FunctionConstructor;
        default: null;
    };
    /** 底部右侧按钮  */
    confirmText: {
        type: StringConstructor;
        default: string;
    };
    /** 标题栏左侧按钮回调函数  */
    backFunc: {
        type: FunctionConstructor;
        default: null;
    };
    /** 底部右侧按钮回调函数  */
    confirmFunc: {
        type: FunctionConstructor;
        default: null;
    };
    /** 是否调用回调函数后自动关闭 */
    autoClose: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {}, {
    round: boolean;
    title: string;
    cancelText: string;
    leftIcon: string;
    header: boolean;
    footer: boolean;
    cancelFunc: Function;
    confirmText: string;
    backFunc: Function;
    confirmFunc: Function;
    autoClose: boolean;
}, {}>;
export default __vue_sfc__;

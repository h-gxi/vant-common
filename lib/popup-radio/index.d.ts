import type { PropType } from 'vue';
export type RadioItem = {
    label: string;
    value: string;
};
export declare const popupRadioProps: {
    /** 选项列表数据 */
    columns: {
        type: PropType<RadioItem[]>;
        default: never[];
    };
    /** 默认选中项 */
    defaultValue: {
        type: StringConstructor;
        default: string;
    };
    /** 图标 */
    icon: {
        type: StringConstructor;
        default: string;
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    round: {
        type: BooleanConstructor;
        default: boolean;
    };
    header: {
        type: BooleanConstructor;
        default: boolean;
    };
    footer: {
        type: BooleanConstructor;
        default: boolean;
    };
    leftIcon: {
        type: StringConstructor;
        default: string;
    };
    cancelText: {
        type: StringConstructor;
        default: string;
    };
    cancelFunc: {
        type: FunctionConstructor;
        default: null;
    };
    confirmText: {
        type: StringConstructor;
        default: string;
    };
    backFunc: {
        type: FunctionConstructor;
        default: null;
    };
    confirmFunc: {
        type: FunctionConstructor;
        default: null;
    };
    autoClose: {
        type: BooleanConstructor;
        default: boolean;
    };
};
declare const __vue_sfc__: import("vue").DefineComponent<{
    /** 选项列表数据 */
    columns: {
        type: PropType<RadioItem[]>;
        default: never[];
    };
    /** 默认选中项 */
    defaultValue: {
        type: StringConstructor;
        default: string;
    };
    /** 图标 */
    icon: {
        type: StringConstructor;
        default: string;
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    round: {
        type: BooleanConstructor;
        default: boolean;
    };
    header: {
        type: BooleanConstructor;
        default: boolean;
    };
    footer: {
        type: BooleanConstructor;
        default: boolean;
    };
    leftIcon: {
        type: StringConstructor;
        default: string;
    };
    cancelText: {
        type: StringConstructor;
        default: string;
    };
    cancelFunc: {
        type: FunctionConstructor;
        default: null;
    };
    confirmText: {
        type: StringConstructor;
        default: string;
    };
    backFunc: {
        type: FunctionConstructor;
        default: null;
    };
    confirmFunc: {
        type: FunctionConstructor;
        default: null;
    };
    autoClose: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    popupRef: import("vue").Ref<any>;
    checked: import("vue").Ref<string>;
    onChange: (name: string) => void;
    open: () => void;
    close: () => any;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, never[], never, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    /** 选项列表数据 */
    columns: {
        type: PropType<RadioItem[]>;
        default: never[];
    };
    /** 默认选中项 */
    defaultValue: {
        type: StringConstructor;
        default: string;
    };
    /** 图标 */
    icon: {
        type: StringConstructor;
        default: string;
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    round: {
        type: BooleanConstructor;
        default: boolean;
    };
    header: {
        type: BooleanConstructor;
        default: boolean;
    };
    footer: {
        type: BooleanConstructor;
        default: boolean;
    };
    leftIcon: {
        type: StringConstructor;
        default: string;
    };
    cancelText: {
        type: StringConstructor;
        default: string;
    };
    cancelFunc: {
        type: FunctionConstructor;
        default: null;
    };
    confirmText: {
        type: StringConstructor;
        default: string;
    };
    backFunc: {
        type: FunctionConstructor;
        default: null;
    };
    confirmFunc: {
        type: FunctionConstructor;
        default: null;
    };
    autoClose: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {}, {
    round: boolean;
    icon: string;
    title: string;
    cancelText: string;
    leftIcon: string;
    columns: RadioItem[];
    defaultValue: string;
    header: boolean;
    footer: boolean;
    cancelFunc: Function;
    confirmText: string;
    backFunc: Function;
    confirmFunc: Function;
    autoClose: boolean;
}, {}>;
export default __vue_sfc__;

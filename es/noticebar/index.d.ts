import { type ExtractPropTypes } from 'vue';
import { noticebarProps } from './props';
export type NoticebarProps = ExtractPropTypes<typeof noticebarProps>;
declare const __vue_sfc__: import("vue").DefineComponent<{
    modelValue: {
        type: import("vue").PropType<import("./props").NoticebarValue[]>;
        default: null;
    };
    value: {
        type: import("vue").PropType<import("./props").NoticebarValue[]>;
        default: null;
    };
    color: StringConstructor;
    background: StringConstructor;
    leftIcon: StringConstructor;
    scrollable: {
        type: BooleanConstructor;
        default: boolean;
    };
    autoplay: {
        type: NumberConstructor;
        default: number;
    };
}, {
    visible: import("vue").ComputedRef<boolean>;
    swipeRef: any;
    swipeItems: import("vue").WritableComputedRef<import("./props").NoticebarValue[]>;
    swipeChage: (index: number) => void;
    onClose: () => void;
    onClick: (item: any, index: number) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("remove" | "click" | "update:modelValue")[], "remove" | "click" | "update:modelValue", import("vue").PublicProps, Readonly<ExtractPropTypes<{
    modelValue: {
        type: import("vue").PropType<import("./props").NoticebarValue[]>;
        default: null;
    };
    value: {
        type: import("vue").PropType<import("./props").NoticebarValue[]>;
        default: null;
    };
    color: StringConstructor;
    background: StringConstructor;
    leftIcon: StringConstructor;
    scrollable: {
        type: BooleanConstructor;
        default: boolean;
    };
    autoplay: {
        type: NumberConstructor;
        default: number;
    };
}>> & {
    onClick?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onRemove?: ((...args: any[]) => any) | undefined;
}, {
    modelValue: import("./props").NoticebarValue[];
    value: import("./props").NoticebarValue[];
    scrollable: boolean;
    autoplay: number;
}, {}>;
export default __vue_sfc__;

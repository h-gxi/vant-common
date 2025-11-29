import { type ExtractPropTypes } from 'vue';
import { navbarProps } from './props';
export type NavbarProps = ExtractPropTypes<typeof navbarProps>;
declare const __vue_sfc__: import("vue").DefineComponent<{
    show: {
        type: (StringConstructor | BooleanConstructor)[];
        default: string;
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    leftText: {
        type: StringConstructor;
        default: string;
    };
    rightText: {
        type: StringConstructor;
        default: string;
    };
    leftArrow: {
        type: BooleanConstructor;
        default: boolean;
    };
    border: {
        type: BooleanConstructor;
        default: boolean;
    };
    fixed: {
        type: BooleanConstructor;
        default: boolean;
    };
    placeholder: {
        type: BooleanConstructor;
        default: boolean;
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
    safeAreaInsetTop: {
        type: BooleanConstructor;
        default: boolean;
    };
    clickLeft: {
        type: FunctionConstructor;
        default: null;
    };
}, {
    isShow: import("vue").ComputedRef<boolean>;
    onClickLeft: () => void;
    onClickRight: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("click-left" | "click-right")[], "click-left" | "click-right", import("vue").PublicProps, Readonly<ExtractPropTypes<{
    show: {
        type: (StringConstructor | BooleanConstructor)[];
        default: string;
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    leftText: {
        type: StringConstructor;
        default: string;
    };
    rightText: {
        type: StringConstructor;
        default: string;
    };
    leftArrow: {
        type: BooleanConstructor;
        default: boolean;
    };
    border: {
        type: BooleanConstructor;
        default: boolean;
    };
    fixed: {
        type: BooleanConstructor;
        default: boolean;
    };
    placeholder: {
        type: BooleanConstructor;
        default: boolean;
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
    safeAreaInsetTop: {
        type: BooleanConstructor;
        default: boolean;
    };
    clickLeft: {
        type: FunctionConstructor;
        default: null;
    };
}>> & {
    "onClick-left"?: ((...args: any[]) => any) | undefined;
    "onClick-right"?: ((...args: any[]) => any) | undefined;
}, {
    fixed: boolean;
    placeholder: boolean;
    title: string;
    rightText: string;
    show: string | boolean;
    border: boolean;
    leftText: string;
    leftArrow: boolean;
    zIndex: number;
    safeAreaInsetTop: boolean;
    clickLeft: Function;
}, {}>;
export default __vue_sfc__;

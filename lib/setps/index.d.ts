import { type ExtractPropTypes } from 'vue';
import { stepsProps } from './props';
export declare const STEPS_KEY: unique symbol;
export type StepsProps = ExtractPropTypes<typeof stepsProps>;
declare const __vue_sfc__: import("vue").DefineComponent<{
    active: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    activeColor: {
        type: StringConstructor;
        default: string;
    };
    activeTextColor: {
        type: StringConstructor;
        default: null;
    };
    inactiveColor: {
        type: StringConstructor;
        default: string;
    };
    activeIcon: {
        type: StringConstructor;
        default: null;
    };
    inactiveIcon: {
        type: StringConstructor;
        default: null;
    };
    iconSize: {
        type: NumberConstructor;
        default: number;
    };
    direction: {
        type: StringConstructor;
        default: string;
    };
    type: {
        type: StringConstructor;
        default: null;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "clickStep"[], "clickStep", import("vue").PublicProps, Readonly<ExtractPropTypes<{
    active: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    activeColor: {
        type: StringConstructor;
        default: string;
    };
    activeTextColor: {
        type: StringConstructor;
        default: null;
    };
    inactiveColor: {
        type: StringConstructor;
        default: string;
    };
    activeIcon: {
        type: StringConstructor;
        default: null;
    };
    inactiveIcon: {
        type: StringConstructor;
        default: null;
    };
    iconSize: {
        type: NumberConstructor;
        default: number;
    };
    direction: {
        type: StringConstructor;
        default: string;
    };
    type: {
        type: StringConstructor;
        default: null;
    };
}>> & {
    onClickStep?: ((...args: any[]) => any) | undefined;
}, {
    type: string;
    direction: string;
    active: string | number;
    activeColor: string;
    activeTextColor: string;
    inactiveColor: string;
    activeIcon: string;
    inactiveIcon: string;
    iconSize: number;
}, {}>;
export default __vue_sfc__;

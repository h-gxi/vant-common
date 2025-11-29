import { type ExtractPropTypes } from 'vue';
export declare const HEADER_KEY: unique symbol;
declare const headerProps: {
    /** 指定header高度 */
    height: {
        type: (NumberConstructor | StringConstructor)[];
        default: null;
    };
};
export type HeaderProps = ExtractPropTypes<typeof headerProps>;
declare const __vue_sfc__: import("vue").DefineComponent<{
    /** 指定header高度 */
    height: {
        type: (NumberConstructor | StringConstructor)[];
        default: null;
    };
}, {
    isSlotsLoaded: import("vue").ComputedRef<boolean | undefined>;
    styleObj: import("vue").ComputedRef<string>;
    headerRef: import("vue").Ref<HTMLElement | undefined>;
    resize: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "onResize"[], "onResize", import("vue").PublicProps, Readonly<ExtractPropTypes<{
    /** 指定header高度 */
    height: {
        type: (NumberConstructor | StringConstructor)[];
        default: null;
    };
}>> & {
    onOnResize?: ((...args: any[]) => any) | undefined;
}, {
    height: string | number;
}, {}>;
export default __vue_sfc__;

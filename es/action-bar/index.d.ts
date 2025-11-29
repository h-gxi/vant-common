import { type PropType } from 'vue';
export declare const ACTIONBAR_KEY: unique symbol;
declare const __vue_sfc__: import("vue").DefineComponent<{
    sticky: BooleanConstructor;
    container: PropType<Element>;
    offsetBottom: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
}, {
    rootRef: import("vue").Ref<HTMLElement | undefined>;
    styleObj: import("vue").ComputedRef<string>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, never[], never, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    sticky: BooleanConstructor;
    container: PropType<Element>;
    offsetBottom: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
}>> & {}, {
    sticky: boolean;
    offsetBottom: string | number;
}, {}>;
export default __vue_sfc__;

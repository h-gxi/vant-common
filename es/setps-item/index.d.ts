import { type ExtractPropTypes } from 'vue';
import { stepsItemProps } from '../setps/props';
export type StepsItemProps = ExtractPropTypes<typeof stepsItemProps>;
declare const __vue_sfc__: import("vue").DefineComponent<{
    title: {
        type: StringConstructor;
        default: string;
    };
    error: {
        type: BooleanConstructor;
        default: boolean;
    };
}, any, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, never[], never, import("vue").PublicProps, Readonly<ExtractPropTypes<{
    title: {
        type: StringConstructor;
        default: string;
    };
    error: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {}, {
    title: string;
    error: boolean;
}, {}>;
export default __vue_sfc__;

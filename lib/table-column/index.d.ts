import { type ExtractPropTypes } from 'vue';
import { tableColumnProps } from '../table/props';
export type TableColumnProps = ExtractPropTypes<typeof tableColumnProps>;
declare const __vue_sfc__: import("vue").DefineComponent<{
    prop: {
        type: StringConstructor;
        default: string;
    };
    label: {
        type: StringConstructor;
        default: string;
    };
    fixed: {
        type: BooleanConstructor;
        default: boolean;
    };
    minWidth: {
        type: NumberConstructor;
        default: number;
    };
    sortable: {
        type: (StringConstructor | BooleanConstructor)[];
        default: string;
    };
    align: {
        type: StringConstructor;
        default: string;
    };
    formatter: {
        type: FunctionConstructor;
        default: null;
    };
    nowrap: {
        type: BooleanConstructor;
        default: boolean;
    };
}, any, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, never[], never, import("vue").PublicProps, Readonly<ExtractPropTypes<{
    prop: {
        type: StringConstructor;
        default: string;
    };
    label: {
        type: StringConstructor;
        default: string;
    };
    fixed: {
        type: BooleanConstructor;
        default: boolean;
    };
    minWidth: {
        type: NumberConstructor;
        default: number;
    };
    sortable: {
        type: (StringConstructor | BooleanConstructor)[];
        default: string;
    };
    align: {
        type: StringConstructor;
        default: string;
    };
    formatter: {
        type: FunctionConstructor;
        default: null;
    };
    nowrap: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {}, {
    fixed: boolean;
    label: string;
    formatter: Function;
    nowrap: boolean;
    prop: string;
    minWidth: number;
    sortable: string | boolean;
    align: string;
}, {}>;
export default __vue_sfc__;

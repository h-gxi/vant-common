import { type ExtractPropTypes } from 'vue';
import { tableProps } from './props';
export declare const TABLE_KEY: unique symbol;
export type TableProps = ExtractPropTypes<typeof tableProps>;
declare const __vue_sfc__: import("vue").DefineComponent<{
    data: {
        type: import("vue").PropType<import("./props").TableValue[]>;
        default: null;
    };
    headerBgColor: {
        type: StringConstructor;
        default: null;
    };
    border: {
        type: BooleanConstructor;
        default: boolean;
    };
}, any, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("sort-change" | "cell-click")[], "sort-change" | "cell-click", import("vue").PublicProps, Readonly<ExtractPropTypes<{
    data: {
        type: import("vue").PropType<import("./props").TableValue[]>;
        default: null;
    };
    headerBgColor: {
        type: StringConstructor;
        default: null;
    };
    border: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    "onSort-change"?: ((...args: any[]) => any) | undefined;
    "onCell-click"?: ((...args: any[]) => any) | undefined;
}, {
    data: import("./props").TableValue[];
    border: boolean;
    headerBgColor: string;
}, {}>;
export default __vue_sfc__;

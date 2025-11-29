import { type ExtractPropTypes } from 'vue';
import { listProps } from './props';
export declare const LIST_KEY: unique symbol;
export type ListProps = ExtractPropTypes<typeof listProps>;
export type State = {
    finished: boolean;
    refreshing: boolean;
    pageIndex: number;
    list: {
        [prop: string]: any;
    }[];
};
declare const __vue_sfc__: import("vue").DefineComponent<{
    offset: {
        type: NumberConstructor;
        default: number;
    };
    pullingText: {
        type: StringConstructor;
        default: string;
    };
    loosingText: {
        type: StringConstructor;
        default: string;
    };
    loadingText: {
        type: StringConstructor;
        default: string;
    };
    successText: {
        type: StringConstructor;
        default: string;
    };
    successDuration: {
        type: NumberConstructor;
        default: number;
    };
    emptyText: {
        type: StringConstructor;
        default: string;
    };
    nomoreText: {
        type: StringConstructor;
        default: string;
    };
    direction: {
        type: StringConstructor;
        default: string;
    };
    image: {
        type: StringConstructor;
        default: string;
    };
    imageSize: import("vue").PropType<import("../utils").Numeric | [import("../utils").Numeric, import("../utils").Numeric]>;
    pageSize: {
        type: NumberConstructor;
        default: number;
    };
    queryMethod: {
        type: FunctionConstructor;
        default: null;
    };
    queryModel: {
        type: ObjectConstructor;
        default: null;
    };
    formatter: {
        type: FunctionConstructor;
        default: null;
    };
    filter: {
        type: FunctionConstructor;
        default: null;
    };
    groupBy: {
        type: (StringConstructor | FunctionConstructor)[];
        default: string;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    onRefresh: () => void;
    onLoad: () => void;
    finished: import("vue").Ref<boolean>;
    refreshing: import("vue").Ref<boolean>;
    pageIndex: import("vue").Ref<number>;
    list: import("vue").Ref<{
        [prop: string]: any;
    }[]>;
    loading: import("vue").Ref<boolean>;
    offsetTop: import("vue").Ref<number>;
    finishedText: import("vue").ComputedRef<string>;
    showImage: import("vue").ComputedRef<boolean>;
    formatList: import("vue").ComputedRef<{
        [prop: string]: any;
    }[]>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "click"[], "click", import("vue").PublicProps, Readonly<ExtractPropTypes<{
    offset: {
        type: NumberConstructor;
        default: number;
    };
    pullingText: {
        type: StringConstructor;
        default: string;
    };
    loosingText: {
        type: StringConstructor;
        default: string;
    };
    loadingText: {
        type: StringConstructor;
        default: string;
    };
    successText: {
        type: StringConstructor;
        default: string;
    };
    successDuration: {
        type: NumberConstructor;
        default: number;
    };
    emptyText: {
        type: StringConstructor;
        default: string;
    };
    nomoreText: {
        type: StringConstructor;
        default: string;
    };
    direction: {
        type: StringConstructor;
        default: string;
    };
    image: {
        type: StringConstructor;
        default: string;
    };
    imageSize: import("vue").PropType<import("../utils").Numeric | [import("../utils").Numeric, import("../utils").Numeric]>;
    pageSize: {
        type: NumberConstructor;
        default: number;
    };
    queryMethod: {
        type: FunctionConstructor;
        default: null;
    };
    queryModel: {
        type: ObjectConstructor;
        default: null;
    };
    formatter: {
        type: FunctionConstructor;
        default: null;
    };
    filter: {
        type: FunctionConstructor;
        default: null;
    };
    groupBy: {
        type: (StringConstructor | FunctionConstructor)[];
        default: string;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    onClick?: ((...args: any[]) => any) | undefined;
}, {
    filter: Function;
    image: string;
    disabled: boolean;
    offset: number;
    pullingText: string;
    loosingText: string;
    loadingText: string;
    successText: string;
    successDuration: number;
    emptyText: string;
    nomoreText: string;
    direction: string;
    pageSize: number;
    queryMethod: Function;
    queryModel: Record<string, any>;
    formatter: Function;
    groupBy: string | Function;
}, {}>;
export default __vue_sfc__;

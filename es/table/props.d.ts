import { type PropType } from 'vue';
export type TableValue = {
    [prop: string]: any;
};
export declare const tableProps: {
    data: {
        type: PropType<TableValue[]>;
        default: null;
    };
    /** 表头背景颜色 */
    headerBgColor: {
        type: StringConstructor;
        default: null;
    };
    /** 显示边框 */
    border: {
        type: BooleanConstructor;
        default: boolean;
    };
};
export declare const tableColumnProps: {
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
    /** 对应列是否可以排序
     * 如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件
     */
    sortable: {
        type: (StringConstructor | BooleanConstructor)[];
        default: string;
    };
    /** 对齐方式 'left' | 'center' */
    align: {
        type: StringConstructor;
        default: string;
    };
    /** 用来格式化内容
     * (row: any, column: any, cellValue: any, index: number) => VNode | string
     */
    formatter: {
        type: FunctionConstructor;
        default: null;
    };
    /** 是否在一行内显示 */
    nowrap: {
        type: BooleanConstructor;
        default: boolean;
    };
};

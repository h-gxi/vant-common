import type { PropType } from 'vue';
export type CheckboxItem = {
    label: string;
    value: string;
};
export declare const formCheckboxProps: {
    /** 选项列表数据 */
    columns: {
        type: PropType<CheckboxItem[]>;
        default: never[];
    };
    /** 默认选中项 */
    defaultValue: {
        type: PropType<string[]>;
        default: never[];
    };
    /** 开启顶部工具栏 */
    toolbar: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 顶部工具栏标题 */
    toolbarTitle: {
        type: StringConstructor;
        default: string;
    };
};
declare const __vue_sfc__: import("vue").DefineComponent<{
    /** 选项列表数据 */
    columns: {
        type: PropType<CheckboxItem[]>;
        default: never[];
    };
    /** 默认选中项 */
    defaultValue: {
        type: PropType<string[]>;
        default: never[];
    };
    /** 开启顶部工具栏 */
    toolbar: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 顶部工具栏标题 */
    toolbarTitle: {
        type: StringConstructor;
        default: string;
    };
}, {
    checkedAll: import("vue").Ref<boolean>;
    checkedGroup: import("vue").Ref<string[]>;
    onChage: (arr: string[]) => void;
    onChageAll: (checked: boolean) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "change"[], "change", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    /** 选项列表数据 */
    columns: {
        type: PropType<CheckboxItem[]>;
        default: never[];
    };
    /** 默认选中项 */
    defaultValue: {
        type: PropType<string[]>;
        default: never[];
    };
    /** 开启顶部工具栏 */
    toolbar: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 顶部工具栏标题 */
    toolbarTitle: {
        type: StringConstructor;
        default: string;
    };
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
}, {
    columns: CheckboxItem[];
    defaultValue: string[];
    toolbar: boolean;
    toolbarTitle: string;
}, {}>;
export default __vue_sfc__;

export default __vue_sfc__;
declare const __vue_sfc__: {
    name: string;
} & {
    __name: string;
    props: {
        hideSelect: {
            type: BooleanConstructor;
            default: boolean;
        };
        sticky: {
            type: BooleanConstructor;
            default: boolean;
        };
        multiple: {
            type: BooleanConstructor;
            default: boolean;
        };
        icon: {
            type: StringConstructor;
            default: string;
        };
        leafIcon: {
            type: StringConstructor;
            default: string;
        };
        emptyMsg: {
            type: StringConstructor;
            default: string;
        };
        emptyImage: {
            type: StringConstructor;
            default: string;
        };
        imageSize: (NumberConstructor | ArrayConstructor | StringConstructor)[];
        filterMsg: {
            type: StringConstructor;
            default: string;
        };
        suffixText: {
            type: StringConstructor;
            default: string;
        };
    };
    emits: string[];
    setup(__props: any, { expose: __expose, emit: __emit }: {
        expose: any;
        emit: any;
    }): {
        addressStore: import("pinia").Store<"app.address", {
            apiAction: string;
            getImage: null;
            dataObj: never[];
            dataNode: never[];
            dataFilter: never[];
            filterText: string;
            selectNodeId: string;
            rootTitle: string;
            breadcrumb: never[];
            checkedMap: Map<any, any>;
            defaultCheckedKeys: never[];
        }, {
            getDataNode: (state: {
                apiAction: string;
                getImage: null;
                dataObj: never[];
                dataNode: never[];
                dataFilter: never[];
                filterText: string;
                selectNodeId: string;
                rootTitle: string;
                breadcrumb: never[];
                checkedMap: Map<any, any> & Omit<Map<any, any>, keyof Map<any, any>>;
                defaultCheckedKeys: never[];
            } & import("pinia").PiniaCustomStateProperties<{
                apiAction: string;
                getImage: null;
                dataObj: never[];
                dataNode: never[];
                dataFilter: never[];
                filterText: string;
                selectNodeId: string;
                rootTitle: string;
                breadcrumb: never[];
                checkedMap: Map<any, any>;
                defaultCheckedKeys: never[];
            }>) => any;
        }, {
            config(title: any, api: any, imageFunc: any): void;
            init(parms: any, data: any, checkedKeys: any): Promise<void>;
            selectNode(node: any): void;
            checked(node: any, multiple: any): void;
            filter(value: any): void;
            remove(node: any): void;
        }>;
        name: string;
        emit: any;
        props: any;
        hideSelect: any;
        sticky: any;
        multiple: any;
        icon: any;
        leafIcon: any;
        emptyMsg: any;
        emptyImage: any;
        imageSize: any;
        filterMsg: any;
        suffixText: any;
        filterText: import("vue").Ref<string>;
        emptyText: import("vue").ComputedRef<any>;
        disabled: import("vue").Ref<boolean>;
        loading: import("vue").Ref<boolean>;
        container: import("vue").Ref<null>;
        getImage: import("vue").ComputedRef<null>;
        initOptions: {
            rootTitle: string;
            actionFunc: string;
            actionParms: {};
            getImageFunc: string;
            data: null;
            defaultCheckedKeys: never[];
        };
        reload: (options: any) => void;
        dataNode: import("vue").ComputedRef<any>;
        breadcrumbNode: import("vue").ComputedRef<never[]>;
        checkedUsers: import("vue").ComputedRef<any[]>;
        onClick: (node: any) => void;
        onChangeChecked: (node: any) => void;
        onSave: () => void;
        readonly _: _.LoDashStatic;
        ref: typeof ref;
        computed: typeof import("@vue/reactivity").computed;
        watch: typeof watch;
        readonly useAddressStore: import("pinia").StoreDefinition<"app.address", {
            apiAction: string;
            getImage: null;
            dataObj: never[];
            dataNode: never[];
            dataFilter: never[];
            filterText: string;
            selectNodeId: string;
            rootTitle: string;
            breadcrumb: never[];
            checkedMap: Map<any, any>;
            defaultCheckedKeys: never[];
        }, {
            getDataNode: (state: {
                apiAction: string;
                getImage: null;
                dataObj: never[];
                dataNode: never[];
                dataFilter: never[];
                filterText: string;
                selectNodeId: string;
                rootTitle: string;
                breadcrumb: never[];
                checkedMap: Map<any, any> & Omit<Map<any, any>, keyof Map<any, any>>;
                defaultCheckedKeys: never[];
            } & import("pinia").PiniaCustomStateProperties<{
                apiAction: string;
                getImage: null;
                dataObj: never[];
                dataNode: never[];
                dataFilter: never[];
                filterText: string;
                selectNodeId: string;
                rootTitle: string;
                breadcrumb: never[];
                checkedMap: Map<any, any>;
                defaultCheckedKeys: never[];
            }>) => any;
        }, {
            config(title: any, api: any, imageFunc: any): void;
            init(parms: any, data: any, checkedKeys: any): Promise<void>;
            selectNode(node: any): void;
            checked(node: any, multiple: any): void;
            filter(value: any): void;
            remove(node: any): void;
        }>;
        readonly addressProps: {
            hideSelect: {
                type: BooleanConstructor;
                default: boolean;
            };
            sticky: {
                type: BooleanConstructor;
                default: boolean;
            };
            multiple: {
                type: BooleanConstructor;
                default: boolean;
            };
            icon: {
                type: StringConstructor;
                default: string;
            };
            leafIcon: {
                type: StringConstructor;
                default: string;
            };
            emptyMsg: {
                type: StringConstructor;
                default: string;
            };
            emptyImage: {
                type: StringConstructor;
                default: string;
            };
            imageSize: (NumberConstructor | ArrayConstructor | StringConstructor)[];
            filterMsg: {
                type: StringConstructor;
                default: string;
            };
            suffixText: {
                type: StringConstructor;
                default: string;
            };
        };
    };
};
import _ from 'lodash';
import { ref } from 'vue';
import { watch } from 'vue';

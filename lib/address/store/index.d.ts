export const useAddressStore: import("pinia").StoreDefinition<"app.address", {
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
    /** 获取当前节点数据 */
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

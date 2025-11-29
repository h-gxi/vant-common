export declare const stepsProps: {
    /** 当前步骤对应的索引值 */
    active: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /** 激活状态颜色 */
    activeColor: {
        type: StringConstructor;
        default: string;
    };
    /** 激活状态文字颜色 */
    activeTextColor: {
        type: StringConstructor;
        default: null;
    };
    /** 未激活状态颜色 */
    inactiveColor: {
        type: StringConstructor;
        default: string;
    };
    /** 激活状态的图标 */
    activeIcon: {
        type: StringConstructor;
        default: null;
    };
    /** 未激活状态图标 */
    inactiveIcon: {
        type: StringConstructor;
        default: null;
    };
    /** 图标大小 */
    iconSize: {
        type: NumberConstructor;
        default: number;
    };
    /** 步骤条方向，可选值为 vertical */
    direction: {
        type: StringConstructor;
        default: string;
    };
    /** 步骤条样式，可选值为 thickline */
    type: {
        type: StringConstructor;
        default: null;
    };
};
export declare const stepsItemProps: {
    /** 标题文字 */
    title: {
        type: StringConstructor;
        default: string;
    };
    /** 失败状态 */
    error: {
        type: BooleanConstructor;
        default: boolean;
    };
};

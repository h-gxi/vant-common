export declare const navbarProps: {
    /** 是否显示组件，默认auto微信小程序端隐藏显示 */
    show: {
        type: (StringConstructor | BooleanConstructor)[];
        default: string;
    };
    /** 标题 */
    title: {
        type: StringConstructor;
        default: string;
    };
    /** 左侧文案 */
    leftText: {
        type: StringConstructor;
        default: string;
    };
    /** 右侧文案 */
    rightText: {
        type: StringConstructor;
        default: string;
    };
    /** 是否显示左侧箭头 */
    leftArrow: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 是否显示下边框 */
    border: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 是否固定在顶部 */
    fixed: {
        type: BooleanConstructor;
        default: boolean;
    };
    placeholder: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 元素 z-index */
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
    /** 是否开启[顶部安全区适配] */
    safeAreaInsetTop: {
        type: BooleanConstructor;
        default: boolean;
    };
    /** 返回按钮绑定方法，return false 停止触发click-left事件 */
    clickLeft: {
        type: FunctionConstructor;
        default: null;
    };
};

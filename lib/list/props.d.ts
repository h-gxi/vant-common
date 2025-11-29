import { type PropType } from 'vue';
import { Numeric } from '../utils/index';
export declare const listProps: {
    /** 滚动条与底部距离小于 offset 时触发load事件 */
    offset: {
        type: NumberConstructor;
        default: number;
    };
    /** 下拉过程提示文案 */
    pullingText: {
        type: StringConstructor;
        default: string;
    };
    /** 释放过程提示文案 */
    loosingText: {
        type: StringConstructor;
        default: string;
    };
    /** 加载过程提示文案 */
    loadingText: {
        type: StringConstructor;
        default: string;
    };
    /** 刷新成功提示文案 */
    successText: {
        type: StringConstructor;
        default: string;
    };
    /** 刷新成功提示展示时长(ms) */
    successDuration: {
        type: NumberConstructor;
        default: number;
    };
    /** 暂无数据的提示文案 */
    emptyText: {
        type: StringConstructor;
        default: string;
    };
    /** 没有更多了的提示文案 */
    nomoreText: {
        type: StringConstructor;
        default: string;
    };
    /** 滚动触发加载的方向，可选值为up */
    direction: {
        type: StringConstructor;
        default: string;
    };
    /** 暂无数据时显示图片 */
    image: {
        type: StringConstructor;
        default: string;
    };
    /** 图片大小 */
    imageSize: PropType<Numeric | [Numeric, Numeric]>;
    /** 默认分页大小 */
    pageSize: {
        type: NumberConstructor;
        default: number;
    };
    /** 查询方法 */
    queryMethod: {
        type: FunctionConstructor;
        default: null;
    };
    /** 查询参数模型 */
    queryModel: {
        type: ObjectConstructor;
        default: null;
    };
    /** 格式化数据 */
    formatter: {
        type: FunctionConstructor;
        default: null;
    };
    /** 过滤显示数据 */
    filter: {
        type: FunctionConstructor;
        default: null;
    };
    /** 分组字段 */
    groupBy: {
        type: (StringConstructor | FunctionConstructor)[];
        default: string;
    };
    /** 是否禁用下拉刷新 */
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
};

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  listProps: () => listProps
});
module.exports = __toCommonJS(stdin_exports);
const listProps = {
  /** 滚动条与底部距离小于 offset 时触发load事件 */
  offset: { type: Number, default: 250 },
  /** 下拉过程提示文案 */
  pullingText: { type: String, default: "\u4E0B\u62C9\u5373\u53EF\u5237\u65B0..." },
  /** 释放过程提示文案 */
  loosingText: { type: String, default: "\u91CA\u653E\u5373\u53EF\u5237\u65B0..." },
  /** 加载过程提示文案 */
  loadingText: { type: String, default: "\u52A0\u8F7D\u4E2D..." },
  /** 刷新成功提示文案 */
  successText: { type: String, default: "\u5237\u65B0\u6210\u529F" },
  /** 刷新成功提示展示时长(ms) */
  successDuration: { type: Number, default: 1e3 },
  /** 暂无数据的提示文案 */
  emptyText: { type: String, default: "\u6682\u65E0\u6570\u636E" },
  /** 没有更多了的提示文案 */
  nomoreText: { type: String, default: "\u6CA1\u6709\u66F4\u591A\u4E86" },
  /** 滚动触发加载的方向，可选值为up */
  direction: { type: String, default: "down" },
  /** 暂无数据时显示图片 */
  image: { type: String, default: "" },
  /** 图片大小 */
  imageSize: [Number, String, Array],
  /** 默认分页大小 */
  pageSize: { type: Number, default: 10 },
  /** 查询方法 */
  queryMethod: { type: Function, default: null },
  /** 查询参数模型 */
  queryModel: { type: Object, default: null },
  /** 格式化数据 */
  formatter: { type: Function, default: null },
  /** 过滤显示数据 */
  filter: { type: Function, default: null },
  /** 分组字段 */
  groupBy: { type: [String, Function], default: "" },
  /** 是否禁用下拉刷新 */
  disabled: { type: Boolean, default: false }
};

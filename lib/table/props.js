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
  tableColumnProps: () => tableColumnProps,
  tableProps: () => tableProps
});
module.exports = __toCommonJS(stdin_exports);
const tableProps = {
  data: {
    type: Array,
    default: null
  },
  /** 表头背景颜色 */
  headerBgColor: {
    type: String,
    default: null
  },
  /** 显示边框 */
  border: {
    type: Boolean,
    default: false
  }
};
const tableColumnProps = {
  prop: {
    type: String,
    default: ""
  },
  label: {
    type: String,
    default: ""
  },
  fixed: {
    type: Boolean,
    default: false
  },
  minWidth: {
    type: Number,
    default: 80
  },
  /** 对应列是否可以排序
   * 如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件
   */
  sortable: {
    type: [String, Boolean],
    default: ""
  },
  /** 对齐方式 'left' | 'center' */
  align: {
    type: String,
    default: "left"
  },
  /** 用来格式化内容
   * (row: any, column: any, cellValue: any, index: number) => VNode | string
   */
  formatter: {
    type: Function,
    default: null
  },
  /** 是否在一行内显示 */
  nowrap: {
    type: Boolean,
    default: false
  }
};

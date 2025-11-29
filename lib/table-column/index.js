var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var import_lodash = __toESM(require("lodash"));
var import_vue = require("vue");
var import_use = require("@vant/use");
var import_props = require("../table/props");
var import_table = require("../table/index");
var import_vue2 = require("vue");
const name = "m-table-column";
const __vue_sfc__ = (0, import_vue.defineComponent)({
  name,
  props: import_props.tableColumnProps,
  emits: [],
  setup(props) {
    const { parent } = (0, import_use.useParent)(import_table.TABLE_KEY);
    if (!parent) {
      if (process.env.NODE_ENV !== "production") {
        console.error("[Vant] <m-table> must be a child component of <m-table>.");
      }
      return;
    }
    let left = 0;
    if (props.fixed) {
      const list = parent.columns.value.filter((m) => m.fixed);
      list.forEach((e) => {
        left = left + e.minWidth;
      });
    }
    parent.addColumn(__spreadProps(__spreadValues({}, props), { left, order: "" }));
    const order = (0, import_vue.computed)(() => {
      var _a;
      return ((_a = parent.columns.value.find((m) => m.prop === props.prop)) == null ? void 0 : _a.order) || "";
    });
    const isSticky = (0, import_vue.computed)(() => {
      const node = import_lodash.default.findLast(parent.columns.value, (m) => m.fixed);
      if (node) {
        return node.prop === props.prop;
      }
      return false;
    });
    const styleObj = (0, import_vue.computed)(() => {
      const style = {
        width: `${props.minWidth}px`,
        paddingLeft: "12px"
      };
      if (props.fixed) {
        style["left"] = `${left}px`;
      }
      if (props.align === "center") {
        style["justify-content"] = "center";
        style["padding-left"] = "0";
      }
      return style;
    });
    const onSortable = () => {
      let type = "";
      if (order.value === "") {
        type = "descending";
      } else if (order.value === "descending") {
        type = "ascending";
      }
      parent.setOrder(props.sortable, props.prop, type);
    };
    return {
      order,
      isSticky,
      styleObj,
      onSortable
    };
  }
});
const _withScopeId = (n) => ((0, import_vue2.pushScopeId)(""), n = n(), (0, import_vue2.popScopeId)(), n);
const _hoisted_1 = { class: "cell" };
const _hoisted_2 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ (0, import_vue2.createElementVNode)(
  "i",
  { class: "sort-caret ascending" },
  null,
  -1
  /* HOISTED */
));
const _hoisted_3 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ (0, import_vue2.createElementVNode)(
  "i",
  { class: "sort-caret descending" },
  null,
  -1
  /* HOISTED */
));
const _hoisted_4 = [
  _hoisted_2,
  _hoisted_3
];
function __vue_render__(_ctx, _cache, $props, $setup, $data, $options) {
  return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
    "div",
    {
      class: (0, import_vue2.normalizeClass)(["m-table__cell", [{ "is-sticky": _ctx.fixed, "is-last-column": _ctx.isSticky, "ascending": _ctx.order === "ascending", "descending": _ctx.order === "descending" }]]),
      style: (0, import_vue2.normalizeStyle)(_ctx.styleObj)
    },
    [
      (0, import_vue2.createElementVNode)("div", _hoisted_1, [
        (0, import_vue2.createTextVNode)(
          (0, import_vue2.toDisplayString)(_ctx.label) + " ",
          1
          /* TEXT */
        ),
        _ctx.sortable ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("span", {
          key: 0,
          class: "caret-wrapper",
          onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onSortable && _ctx.onSortable(...args))
        }, [..._hoisted_4])) : (0, import_vue2.createCommentVNode)("v-if", true)
      ])
    ],
    6
    /* CLASS, STYLE */
  );
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;

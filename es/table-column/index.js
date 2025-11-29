var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
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
import _ from "lodash";
import { computed, defineComponent } from "vue";
import { useParent } from "@vant/use";
import { tableColumnProps } from "../table/props";
import { TABLE_KEY } from "../table/index";
const name = "m-table-column";
const __vue_sfc__ = defineComponent({
  name,
  props: tableColumnProps,
  emits: [],
  setup(props) {
    const { parent } = useParent(TABLE_KEY);
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
    const order = computed(() => {
      var _a;
      return ((_a = parent.columns.value.find((m) => m.prop === props.prop)) == null ? void 0 : _a.order) || "";
    });
    const isSticky = computed(() => {
      const node = _.findLast(parent.columns.value, (m) => m.fixed);
      if (node) {
        return node.prop === props.prop;
      }
      return false;
    });
    const styleObj = computed(() => {
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
import { toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, createTextVNode as _createTextVNode, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "vue";
const _withScopeId = (n) => (_pushScopeId(""), n = n(), _popScopeId(), n);
const _hoisted_1 = { class: "cell" };
const _hoisted_2 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ _createElementVNode(
  "i",
  { class: "sort-caret ascending" },
  null,
  -1
  /* HOISTED */
));
const _hoisted_3 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ _createElementVNode(
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
  return _openBlock(), _createElementBlock(
    "div",
    {
      class: _normalizeClass(["m-table__cell", [{ "is-sticky": _ctx.fixed, "is-last-column": _ctx.isSticky, "ascending": _ctx.order === "ascending", "descending": _ctx.order === "descending" }]]),
      style: _normalizeStyle(_ctx.styleObj)
    },
    [
      _createElementVNode("div", _hoisted_1, [
        _createTextVNode(
          _toDisplayString(_ctx.label) + " ",
          1
          /* TEXT */
        ),
        _ctx.sortable ? (_openBlock(), _createElementBlock("span", {
          key: 0,
          class: "caret-wrapper",
          onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onSortable && _ctx.onSortable(...args))
        }, [..._hoisted_4])) : _createCommentVNode("v-if", true)
      ])
    ],
    6
    /* CLASS, STYLE */
  );
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
export {
  stdin_default as default
};

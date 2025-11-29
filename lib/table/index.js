var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
  TABLE_KEY: () => TABLE_KEY,
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var import_lodash = __toESM(require("lodash"));
var import_vue = require("vue");
var import_use = require("@vant/use");
var import_props = require("./props");
var import_vue2 = require("vue");
const name = "m-table";
const TABLE_KEY = Symbol(name);
const __vue_sfc__ = (0, import_vue.defineComponent)({
  name,
  props: import_props.tableProps,
  emits: ["sort-change", "cell-click"],
  setup(props, { emit }) {
    const state = (0, import_vue.reactive)({
      prop: "",
      order: ""
    });
    const tableData = (0, import_vue.computed)(() => {
      let array = import_lodash.default.cloneDeep(props.data || []);
      if (state.prop && state.order) {
        array = array.sort((a, b) => {
          const _a = a[state.prop] === "" ? -1 : a[state.prop];
          const _b = b[state.prop] === "" ? -1 : b[state.prop];
          if (_a < _b) {
            return state.order === "descending" ? 1 : -1;
          }
          if (_a > _b) {
            return state.order === "descending" ? -1 : 1;
          }
          return 0;
        });
      }
      return array;
    });
    const columns = (0, import_vue.ref)([]);
    const addColumn = (e) => {
      columns.value.push(e);
    };
    const clearColumn = () => {
      columns.value = [];
    };
    const setOrder = (sortable, prop, order) => {
      columns.value.forEach((e) => {
        if (e.prop === prop) {
          e.order = order;
        } else {
          e.order = "";
        }
      });
      if (sortable === "custom") {
        state.prop = "";
        state.order = "";
        emit("sort-change", { prop, order });
      } else {
        state.prop = prop;
        state.order = order;
      }
    };
    const isSticky = (item) => {
      const node = import_lodash.default.findLast(columns.value, (m) => m.fixed);
      if (node) {
        return node.prop === item.prop;
      }
      return false;
    };
    const styleObj = (item) => {
      const style = {
        width: `${item.minWidth}px`,
        paddingLeft: "12px"
      };
      if (item.fixed) {
        style["left"] = `${item.left}px`;
      }
      if (item.align === "center") {
        style["justify-content"] = "center";
        style["padding-left"] = "0";
      }
      return style;
    };
    const headerStyle = (0, import_vue.computed)(() => {
      if (props.headerBgColor) {
        return { backgroundColor: props.headerBgColor };
      }
      return "";
    });
    const getCellValue = (row, item, i) => {
      if (item.formatter) {
        return item.formatter(row, item, row[item.prop], i) || "";
      }
      return row[item.prop];
    };
    (0, import_vue.onActivated)(() => {
      columns.value = [];
    });
    const onClick = (row, item) => {
      emit("cell-click", row, item, item.prop);
    };
    const tableRef = (0, import_vue.ref)();
    const scrollParent = (0, import_use.useScrollParent)(tableRef);
    const scroller = (0, import_vue.computed)(() => scrollParent.value);
    const isScrolling = (0, import_vue.ref)(false);
    const check = () => {
      (0, import_vue.nextTick)(() => {
        isScrolling.value = scroller.value.scrollLeft > 0;
      });
    };
    (0, import_use.useEventListener)("scroll", check, {
      target: scroller,
      passive: true
    });
    const { linkChildren } = (0, import_use.useChildren)(TABLE_KEY);
    linkChildren({
      columns,
      addColumn,
      clearColumn,
      setOrder
    });
    return {
      tableRef,
      isScrolling,
      tableData,
      columns,
      isSticky,
      styleObj,
      headerStyle,
      getCellValue,
      onClick
    };
  }
});
const _withScopeId = (n) => ((0, import_vue2.pushScopeId)(""), n = n(), (0, import_vue2.popScopeId)(), n);
const _hoisted_1 = ["innerHTML", "onClick"];
function __vue_render__(_ctx, _cache, $props, $setup, $data, $options) {
  return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
    "div",
    {
      ref: "tableRef",
      key: _ctx.columns,
      class: (0, import_vue2.normalizeClass)(["m-table", [{ "is-scrolling": _ctx.isScrolling, "is-border": _ctx.border }]]),
      style: { "width": "100%" }
    },
    [
      (0, import_vue2.createElementVNode)(
        "div",
        {
          class: "m-table__header",
          style: (0, import_vue2.normalizeStyle)(_ctx.headerStyle)
        },
        [
          (0, import_vue2.renderSlot)(_ctx.$slots, "default")
        ],
        4
        /* STYLE */
      ),
      ((0, import_vue2.openBlock)(true), (0, import_vue2.createElementBlock)(
        import_vue2.Fragment,
        null,
        (0, import_vue2.renderList)(_ctx.tableData, (row, i) => {
          return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("div", {
            key: i,
            class: "m-table__row"
          }, [
            ((0, import_vue2.openBlock)(true), (0, import_vue2.createElementBlock)(
              import_vue2.Fragment,
              null,
              (0, import_vue2.renderList)(_ctx.columns, (item) => {
                return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
                  "div",
                  {
                    key: item.prop,
                    class: (0, import_vue2.normalizeClass)(["m-table__cell", [
                      {
                        "is-sticky": item.fixed,
                        "is-last-column": _ctx.isSticky(item),
                        "is-nowrap": item.nowrap
                      }
                    ]]),
                    style: (0, import_vue2.normalizeStyle)(_ctx.styleObj(item))
                  },
                  [
                    (0, import_vue2.createElementVNode)("span", {
                      class: "cell",
                      innerHTML: _ctx.getCellValue(row, item, i),
                      onClick: ($event) => _ctx.onClick(row, item)
                    }, null, 8, _hoisted_1)
                  ],
                  6
                  /* CLASS, STYLE */
                );
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ]);
        }),
        128
        /* KEYED_FRAGMENT */
      ))
    ],
    2
    /* CLASS */
  );
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;

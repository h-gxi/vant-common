import _ from "lodash";
import {
  ref,
  reactive,
  computed,
  defineComponent,
  nextTick,
  onActivated
} from "vue";
import { useChildren, useScrollParent, useEventListener } from "@vant/use";
import { tableProps } from "./props";
const name = "m-table";
const TABLE_KEY = Symbol(name);
const __vue_sfc__ = defineComponent({
  name,
  props: tableProps,
  emits: ["sort-change", "cell-click"],
  setup(props, { emit }) {
    const state = reactive({
      prop: "",
      order: ""
    });
    const tableData = computed(() => {
      let array = _.cloneDeep(props.data || []);
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
    const columns = ref([]);
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
      const node = _.findLast(columns.value, (m) => m.fixed);
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
    const headerStyle = computed(() => {
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
    onActivated(() => {
      columns.value = [];
    });
    const onClick = (row, item) => {
      emit("cell-click", row, item, item.prop);
    };
    const tableRef = ref();
    const scrollParent = useScrollParent(tableRef);
    const scroller = computed(() => scrollParent.value);
    const isScrolling = ref(false);
    const check = () => {
      nextTick(() => {
        isScrolling.value = scroller.value.scrollLeft > 0;
      });
    };
    useEventListener("scroll", check, {
      target: scroller,
      passive: true
    });
    const { linkChildren } = useChildren(TABLE_KEY);
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
import { renderSlot as _renderSlot, normalizeStyle as _normalizeStyle, createElementVNode as _createElementVNode, renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, normalizeClass as _normalizeClass, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "vue";
const _withScopeId = (n) => (_pushScopeId(""), n = n(), _popScopeId(), n);
const _hoisted_1 = ["innerHTML", "onClick"];
function __vue_render__(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock(), _createElementBlock(
    "div",
    {
      ref: "tableRef",
      key: _ctx.columns,
      class: _normalizeClass(["m-table", [{ "is-scrolling": _ctx.isScrolling, "is-border": _ctx.border }]]),
      style: { "width": "100%" }
    },
    [
      _createElementVNode(
        "div",
        {
          class: "m-table__header",
          style: _normalizeStyle(_ctx.headerStyle)
        },
        [
          _renderSlot(_ctx.$slots, "default")
        ],
        4
        /* STYLE */
      ),
      (_openBlock(true), _createElementBlock(
        _Fragment,
        null,
        _renderList(_ctx.tableData, (row, i) => {
          return _openBlock(), _createElementBlock("div", {
            key: i,
            class: "m-table__row"
          }, [
            (_openBlock(true), _createElementBlock(
              _Fragment,
              null,
              _renderList(_ctx.columns, (item) => {
                return _openBlock(), _createElementBlock(
                  "div",
                  {
                    key: item.prop,
                    class: _normalizeClass(["m-table__cell", [
                      {
                        "is-sticky": item.fixed,
                        "is-last-column": _ctx.isSticky(item),
                        "is-nowrap": item.nowrap
                      }
                    ]]),
                    style: _normalizeStyle(_ctx.styleObj(item))
                  },
                  [
                    _createElementVNode("span", {
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
export {
  TABLE_KEY,
  stdin_default as default
};

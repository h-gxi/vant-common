import { unref, inject, getCurrentInstance, onUnmounted, computed, ref, reactive, onDeactivated, isRef, watch, onMounted, provide, nextTick, onActivated, isVNode, defineComponent, openBlock, createElementBlock, normalizeStyle, createElementVNode, renderSlot, createCommentVNode, resolveComponent, createBlock, createSlots, withCtx, withDirectives, createVNode, Fragment, renderList, createTextVNode, toDisplayString, vShow, normalizeClass, resolveDirective, toRefs } from "vue";
import _ from "lodash";
import { defineStore } from "pinia";
var inBrowser = typeof window !== "undefined";
var isWindow = (val) => val === window;
var makeDOMRect = (width2, height2) => ({
  top: 0,
  left: 0,
  right: width2,
  bottom: height2,
  width: width2,
  height: height2
});
var useRect = (elementOrRef) => {
  const element = unref(elementOrRef);
  if (isWindow(element)) {
    const width2 = element.innerWidth;
    const height2 = element.innerHeight;
    return makeDOMRect(width2, height2);
  }
  if (element == null ? void 0 : element.getBoundingClientRect) {
    return element.getBoundingClientRect();
  }
  return makeDOMRect(0, 0);
};
function useParent(key) {
  const parent = inject(key, null);
  if (parent) {
    const instance = getCurrentInstance();
    const { link, unlink, internalChildren } = parent;
    link(instance);
    onUnmounted(() => unlink(instance));
    const index2 = computed(() => internalChildren.indexOf(instance));
    return {
      parent,
      index: index2
    };
  }
  return {
    parent: null,
    index: ref(-1)
  };
}
function flattenVNodes(children) {
  const result = [];
  const traverse = (children2) => {
    if (Array.isArray(children2)) {
      children2.forEach((child) => {
        var _a;
        if (isVNode(child)) {
          result.push(child);
          if ((_a = child.component) == null ? void 0 : _a.subTree) {
            result.push(child.component.subTree);
            traverse(child.component.subTree.children);
          }
          if (child.children) {
            traverse(child.children);
          }
        }
      });
    }
  };
  traverse(children);
  return result;
}
var findVNodeIndex = (vnodes, vnode) => {
  const index2 = vnodes.indexOf(vnode);
  if (index2 === -1) {
    return vnodes.findIndex(
      (item) => vnode.key !== void 0 && vnode.key !== null && item.type === vnode.type && item.key === vnode.key
    );
  }
  return index2;
};
function sortChildren(parent, publicChildren, internalChildren) {
  const vnodes = flattenVNodes(parent.subTree.children);
  internalChildren.sort(
    (a, b) => findVNodeIndex(vnodes, a.vnode) - findVNodeIndex(vnodes, b.vnode)
  );
  const orderedPublicChildren = internalChildren.map((item) => item.proxy);
  publicChildren.sort((a, b) => {
    const indexA = orderedPublicChildren.indexOf(a);
    const indexB = orderedPublicChildren.indexOf(b);
    return indexA - indexB;
  });
}
function useChildren(key) {
  const publicChildren = reactive([]);
  const internalChildren = reactive([]);
  const parent = getCurrentInstance();
  const linkChildren = (value) => {
    const link = (child) => {
      if (child.proxy) {
        internalChildren.push(child);
        publicChildren.push(child.proxy);
        sortChildren(parent, publicChildren, internalChildren);
      }
    };
    const unlink = (child) => {
      const index2 = internalChildren.indexOf(child);
      publicChildren.splice(index2, 1);
      internalChildren.splice(index2, 1);
    };
    provide(
      key,
      Object.assign(
        {
          link,
          unlink,
          children: publicChildren,
          internalChildren
        },
        value
      )
    );
  };
  return {
    children: publicChildren,
    linkChildren
  };
}
function onMountedOrActivated(hook) {
  let mounted;
  onMounted(() => {
    hook();
    nextTick(() => {
      mounted = true;
    });
  });
  onActivated(() => {
    if (mounted) {
      hook();
    }
  });
}
function useEventListener(type, listener, options = {}) {
  if (!inBrowser) {
    return;
  }
  const { target = window, passive = false, capture = false } = options;
  let cleaned = false;
  let attached;
  const add = (target2) => {
    if (cleaned) {
      return;
    }
    const element = unref(target2);
    if (element && !attached) {
      element.addEventListener(type, listener, {
        capture,
        passive
      });
      attached = true;
    }
  };
  const remove = (target2) => {
    if (cleaned) {
      return;
    }
    const element = unref(target2);
    if (element && attached) {
      element.removeEventListener(type, listener, capture);
      attached = false;
    }
  };
  onUnmounted(() => remove(target));
  onDeactivated(() => remove(target));
  onMountedOrActivated(() => add(target));
  let stopWatch;
  if (isRef(target)) {
    stopWatch = watch(target, (val, oldVal) => {
      remove(oldVal);
      add(val);
    });
  }
  return () => {
    stopWatch == null ? void 0 : stopWatch();
    remove(target);
    cleaned = true;
  };
}
var overflowScrollReg = /scroll|auto|overlay/i;
var defaultRoot = inBrowser ? window : void 0;
function isElement(node) {
  const ELEMENT_NODE_TYPE = 1;
  return node.tagName !== "HTML" && node.tagName !== "BODY" && node.nodeType === ELEMENT_NODE_TYPE;
}
function getScrollParent(el, root = defaultRoot) {
  let node = el;
  while (node && node !== root && isElement(node)) {
    const { overflowY } = window.getComputedStyle(node);
    if (overflowScrollReg.test(overflowY)) {
      return node;
    }
    node = node.parentNode;
  }
  return root;
}
function useScrollParent(el, root = defaultRoot) {
  const scrollParent = ref();
  onMounted(() => {
    if (el.value) {
      scrollParent.value = getScrollParent(el.value, root);
    }
  });
  return scrollParent;
}
const headerProps = {
  /** 指定header高度 */
  height: {
    type: [String, Number],
    default: null
  }
};
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const name$8 = "m-header";
const HEADER_KEY = Symbol(name$8);
const _sfc_main$a = defineComponent({
  name: name$8,
  props: headerProps,
  emits: ["onResize"],
  setup(props, { emit, slots }) {
    const { linkChildren } = useChildren(HEADER_KEY);
    const offsetHeight = ref(46);
    const headerRef = ref(null);
    const isSlotsLoaded = computed(() => slots.default().length > 0);
    const styleObj = computed(() => {
      let style = "";
      if (props.height) {
        if (typeof props.height === "number") {
          style = `height: ${props.height}px;`;
        } else {
          style = `height: ${props.height};`;
        }
      } else {
        if (offsetHeight.value > 0) {
          style = `height: ${offsetHeight.value}px;`;
        }
      }
      return style;
    });
    const resize = () => {
      nextTick(() => {
        var _a;
        offsetHeight.value = (_a = headerRef.value) == null ? void 0 : _a.offsetHeight;
        emit("onResize", offsetHeight.value);
      });
    };
    linkChildren({
      resize
    });
    onMounted(() => {
      if (!props.height) {
        nextTick(() => {
          setTimeout(() => {
            const rect = useRect(headerRef);
            offsetHeight.value = rect.height + 3;
          }, 50);
        });
      }
    });
    return {
      isSlotsLoaded,
      styleObj,
      headerRef
    };
  }
});
const _hoisted_1$5 = {
  ref: "headerRef",
  class: "m-header--fixed"
};
function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
  return _ctx.isSlotsLoaded ? (openBlock(), createElementBlock("div", {
    key: 0,
    class: "m-header",
    style: normalizeStyle(_ctx.styleObj)
  }, [
    createElementVNode("div", _hoisted_1$5, [
      renderSlot(_ctx.$slots, "default")
    ], 512)
  ], 4)) : createCommentVNode("", true);
}
const Header = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$8]]);
const navbarProps = {
  /** 是否显示组件，默认auto微信小程序端隐藏显示 */
  show: {
    type: [Boolean, String],
    default: "auto"
  },
  /** 标题 */
  title: {
    type: String,
    default: ""
  },
  /** 左侧文案 */
  leftText: {
    type: String,
    default: ""
  },
  /** 右侧文案 */
  rightText: {
    type: String,
    default: ""
  },
  /** 是否显示左侧箭头 */
  leftArrow: {
    type: Boolean,
    default: true
  },
  /** 是否显示下边框 */
  border: {
    type: Boolean,
    default: true
  },
  /** 是否固定在顶部 */
  fixed: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: Boolean,
    default: false
  },
  /** 元素 z-index */
  zIndex: {
    type: Number,
    default: 99
  },
  /** 是否开启[顶部安全区适配] */
  safeAreaInsetTop: {
    type: Boolean,
    default: true
  },
  /** 返回按钮绑定方法，return false 停止触发click-left事件 */
  clickLeft: {
    type: Function,
    default: null
  }
};
const name$7 = "m-nav-bar";
const _sfc_main$9 = defineComponent({
  name: name$7,
  props: navbarProps,
  emits: ["click-left", "click-right"],
  setup(props, { emit, slots }) {
    const isShow = computed(() => {
      if (props.show === "auto") {
        return !/MicroMessenger/i.test(navigator.userAgent);
      }
      return props.show;
    });
    const onClickLeft = () => {
      const { clickLeft } = props;
      if (clickLeft) {
        const res = props.clickLeft();
        if (res === false) {
          return;
        }
      }
      emit("click-left");
    };
    const onClickRight = () => {
      emit("click-right");
    };
    return {
      isShow,
      onClickLeft,
      onClickRight
    };
  }
});
function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_van_nav_bar = resolveComponent("van-nav-bar");
  return _ctx.isShow ? (openBlock(), createBlock(_component_van_nav_bar, {
    key: 0,
    class: "m-nav-bar",
    title: _ctx.title,
    "left-text": _ctx.leftText,
    "right-text": _ctx.rightText,
    "left-arrow": _ctx.leftArrow,
    border: _ctx.border,
    fixed: _ctx.fixed,
    placeholder: _ctx.placeholder,
    "z-index": _ctx.zIndex,
    "safe-area-inset-top": _ctx.safeAreaInsetTop,
    onClickLeft: _ctx.onClickLeft,
    onClickRight: _ctx.onClickRight
  }, createSlots({ _: 2 }, [
    _ctx.$slots.title ? {
      name: "title",
      fn: withCtx(() => [
        renderSlot(_ctx.$slots, "title")
      ]),
      key: "0"
    } : void 0,
    _ctx.$slots.left ? {
      name: "left",
      fn: withCtx(() => [
        renderSlot(_ctx.$slots, "left")
      ]),
      key: "1"
    } : void 0,
    _ctx.$slots.right ? {
      name: "right",
      fn: withCtx(() => [
        renderSlot(_ctx.$slots, "right")
      ]),
      key: "2"
    } : void 0
  ]), 1032, ["title", "left-text", "right-text", "left-arrow", "border", "fixed", "placeholder", "z-index", "safe-area-inset-top", "onClickLeft", "onClickRight"])) : createCommentVNode("", true);
}
const NavBar = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$7]]);
const BaseComponets = [
  { name: "header", component: Header },
  { name: "nav-bar", component: NavBar }
];
const noticebarSwipeProps = {
  /** 双向绑定列表 {title} */
  modelValue: {
    type: Array,
    default: null
  },
  /** 列表数据 v-model/value 二选一，使用value时触发@remove事件*/
  value: {
    type: Array,
    default: null
  },
  /** 文本颜色 */
  color: {
    type: String,
    default: "#1989fa"
  },
  /** 滚动条背景 */
  background: {
    type: String,
    default: "#ecf9ff"
  },
  /** 左侧图标名称或图片链接，可选值见 Icon 组件 */
  leftIcon: {
    type: String,
    default: "volume-o"
  },
  /** 是否在长度溢出时滚动播放 */
  scrollable: {
    type: Boolean,
    default: false
  },
  /** 自动轮播间隔，单位为 ms */
  autoplay: {
    type: Number,
    default: 4e3
  }
};
const name$6 = "m-noticebar-swipe";
const _sfc_main$8 = defineComponent({
  name: name$6,
  props: noticebarSwipeProps,
  emits: ["remove", "click", "update:modelValue"],
  setup(props, { emit, slots }) {
    const { parent, index: index2 } = useParent(HEADER_KEY);
    const swipeItems = computed({
      get() {
        if (props.value) {
          return props.value;
        }
        return props.modelValue || [];
      },
      set(value) {
        emit("update:modelValue", value);
      }
    });
    const visible = computed(() => swipeItems.value.length > 0);
    const swipeRef = ref(null);
    const swipeIndex = ref(0);
    const swipeChage = (index3) => {
      swipeIndex.value = index3;
    };
    const onClose = () => {
      if (props.value) {
        emit("remove", swipeIndex.value);
      } else {
        swipeItems.value.splice(swipeIndex.value, 1);
      }
      if (swipeIndex.value > 0) {
        swipeRef.value.swipeTo(swipeIndex.value--);
      }
      if (!visible.value) {
        parent == null ? void 0 : parent.resize();
      }
    };
    const onClick = (index3) => {
      emit("click", index3);
    };
    return {
      visible,
      swipeRef,
      swipeItems,
      swipeChage,
      onClose,
      onClick
    };
  }
});
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_van_icon = resolveComponent("van-icon");
  const _component_van_swipe_item = resolveComponent("van-swipe-item");
  const _component_van_swipe = resolveComponent("van-swipe");
  const _component_van_notice_bar = resolveComponent("van-notice-bar");
  return withDirectives((openBlock(), createBlock(_component_van_notice_bar, {
    class: "m-noticebar",
    scrollable: _ctx.scrollable,
    color: _ctx.color,
    background: _ctx.background,
    "left-icon": _ctx.leftIcon,
    onClose: _ctx.onClose
  }, {
    "right-icon": withCtx(() => [
      createVNode(_component_van_icon, {
        name: "cross",
        size: "16",
        onClick: _ctx.onClose
      }, null, 8, ["onClick"])
    ]),
    default: withCtx(() => [
      createVNode(_component_van_swipe, {
        ref: "swipeRef",
        vertical: "",
        class: "m-noticebar-swipe",
        autoplay: _ctx.autoplay,
        touchable: false,
        "show-indicators": false,
        onChange: _ctx.swipeChage
      }, {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.swipeItems, (item, index2) => {
            return openBlock(), createBlock(_component_van_swipe_item, {
              key: index2,
              onClick: ($event) => _ctx.onClick(index2)
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(item.title), 1)
              ]),
              _: 2
            }, 1032, ["onClick"]);
          }), 128))
        ]),
        _: 1
      }, 8, ["autoplay", "onChange"])
    ]),
    _: 1
  }, 8, ["scrollable", "color", "background", "left-icon", "onClose"])), [
    [vShow, _ctx.visible]
  ]);
}
const NoticebarSwipe = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$6]]);
const Advanced = [
  { name: "noticebar-swipe", component: NoticebarSwipe }
];
const tableProps = {
  data: {
    type: Array,
    default: null
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
  }
};
const name$5 = "m-table";
const TABLE_KEY = Symbol(name$5);
const _sfc_main$7 = defineComponent({
  name: name$5,
  props: tableProps,
  emits: ["sort-change"],
  setup(props, { emit, slots }) {
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
        if (item.sortable) {
          style.paddingLeft = `${(item.minWidth - 50) / 2}px`;
        } else {
          style.paddingLeft = `${item.minWidth / 2 - 15}px`;
        }
      }
      return style;
    };
    const getCellValue = (row, item, i) => {
      if (item.formatter) {
        return item.formatter(row, item, row[item.prop], i) || "";
      }
      return row[item.prop];
    };
    onActivated(() => {
      columns.value = [];
    });
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
      getCellValue
    };
  }
});
const _hoisted_1$4 = { class: "m-table__header" };
const _hoisted_2$3 = ["innerHTML"];
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    ref: "tableRef",
    class: normalizeClass(["m-table", [{ "is-scrolling": _ctx.isScrolling }]]),
    style: { "width": "100%" }
  }, [
    createElementVNode("div", _hoisted_1$4, [
      renderSlot(_ctx.$slots, "default")
    ]),
    (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.tableData, (row, i) => {
      return openBlock(), createElementBlock("div", {
        key: i,
        class: "m-table__row"
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.columns, (item) => {
          return openBlock(), createElementBlock("div", {
            key: item.prop,
            class: normalizeClass(["m-table__cell", [{ "is-sticky": item.fixed, "is-last-column": _ctx.isSticky(item) }]]),
            style: normalizeStyle(_ctx.styleObj(item))
          }, [
            createElementVNode("span", {
              class: "cell",
              innerHTML: _ctx.getCellValue(row, item, i)
            }, null, 8, _hoisted_2$3)
          ], 6);
        }), 128))
      ]);
    }), 128))
  ], 2);
}
const Table = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$5]]);
const name$4 = "m-table-column";
const _sfc_main$6 = defineComponent({
  name: name$4,
  props: tableColumnProps,
  emits: [],
  setup(props, { emit, slots }) {
    const { parent, index: index2 } = useParent(TABLE_KEY);
    if (!parent) {
      if (process.env.NODE_ENV !== "production") {
        console.error("[Vant] <m-table> must be a child component of <m-table>.");
      }
      return;
    }
    if (index2 === 0) {
      parent.clearColumn();
    }
    let left = 0;
    if (props.fixed) {
      const list = parent.columns.value.filter((m) => m.fixed);
      list.forEach((e, i) => {
        left = left + e.minWidth;
      });
    }
    parent.addColumn({ ...props, left, order: "" });
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
const _hoisted_1$3 = { class: "cell" };
const _hoisted_2$2 = /* @__PURE__ */ createElementVNode("i", { class: "sort-caret ascending" }, null, -1);
const _hoisted_3$2 = /* @__PURE__ */ createElementVNode("i", { class: "sort-caret descending" }, null, -1);
const _hoisted_4$2 = [
  _hoisted_2$2,
  _hoisted_3$2
];
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["m-table__cell", [{ "is-sticky": _ctx.fixed, "is-last-column": _ctx.isSticky, "ascending": _ctx.order === "ascending", "descending": _ctx.order === "descending" }]]),
    style: normalizeStyle(_ctx.styleObj)
  }, [
    createElementVNode("div", _hoisted_1$3, [
      createTextVNode(toDisplayString(_ctx.label) + " ", 1),
      _ctx.sortable ? (openBlock(), createElementBlock("span", {
        key: 0,
        class: "caret-wrapper",
        onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onSortable && _ctx.onSortable(...args))
      }, _hoisted_4$2)) : createCommentVNode("", true)
    ])
  ], 6);
}
const TableColumn = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$4]]);
const TableComponents = [
  { name: "table", component: Table },
  { name: "table-column", component: TableColumn }
];
const stepsProps = {
  /** 当前步骤对应的索引值 */
  active: {
    type: [String, Number],
    default: 0
  },
  /** 激活状态颜色 */
  activeColor: {
    type: String,
    default: "#3c9cff"
  },
  /** 未激活状态颜色 */
  inactiveColor: {
    type: String,
    default: "#969799"
  },
  /** 激活状态的图标 */
  activeIcon: {
    type: String,
    default: null
  },
  /** 未激活状态图标 */
  inactiveIcon: {
    type: String,
    default: null
  },
  /** 图标大小 */
  iconSize: {
    type: Number,
    default: 17
  },
  /** 步骤条方向，可选值为 vertical */
  direction: {
    type: String,
    default: "horizontal"
  }
};
const stepsItemProps = {
  /** 标题文字 */
  title: {
    type: String,
    default: ""
  },
  /** 失败状态 */
  error: {
    type: Boolean,
    default: false
  }
};
const name$3 = "m-setps";
const STEPS_KEY = Symbol(name$3);
const _sfc_main$5 = defineComponent({
  name: name$3,
  props: stepsProps,
  emits: ["clickStep"],
  setup(props, { emit, slots }) {
    const { linkChildren } = useChildren(STEPS_KEY);
    const onClickStep = (index2) => emit("clickStep", index2);
    linkChildren({
      props,
      onClickStep
    });
    return {};
  }
});
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["m-setps", [`m-setps--${_ctx.direction}`]])
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 2);
}
const Setps = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$3]]);
const name$2 = "m-setps-item";
const _sfc_main$4 = defineComponent({
  name: name$2,
  props: stepsItemProps,
  emits: [],
  setup(props, { emit, slots }) {
    const { parent, index: index2 } = useParent(STEPS_KEY);
    if (!parent) {
      if (process.env.NODE_ENV !== "production") {
        console.error("[Vant] <m-setps> must be a child component of <m-setps>.");
      }
      return;
    }
    const mSetpsItemRef = ref();
    const parentProps = parent.props;
    const size = ref({
      width: 0,
      height: 0
    });
    onMounted(() => {
      const rect = useRect(mSetpsItemRef);
      size.value.width = rect.width;
      size.value.height = rect.height;
    });
    const showLine = computed(() => index2.value + 1 < parent.children.length);
    const getStatus = () => {
      const active = +parentProps.active;
      if (index2.value < active) {
        return "finish";
      }
      return index2.value === active ? "process" : "waiting";
    };
    const isActive = computed(() => getStatus() === "process");
    const isFinish = computed(() => getStatus() === "finish");
    const lineStyle = computed(() => {
      const style = {
        background: isFinish.value ? parentProps.activeColor : parentProps.inactiveColor
      };
      if (parentProps.direction === "horizontal") {
        style.width = size.value.width + "px";
        style.left = size.value.width / 2 + "px";
      } else {
        style.height = size.value.height + "px";
      }
      return style;
    });
    const circleStyle = computed(() => ({
      backgroundColor: getStatus() === "process" ? parentProps.activeColor : "transparent",
      borderColor: getStatus() === "finish" ? parentProps.activeColor : getStatus() === "process" ? "transparent" : parentProps.inactiveColor
    }));
    const contentStyle = computed(() => ({
      color: getStatus() === "waiting" ? parentProps.inactiveColor : parentProps.activeColor
    }));
    const onClickStep = () => parent.onClickStep(index2.value);
    return {
      index: index2,
      mSetpsItemRef,
      parentProps,
      showLine,
      isActive,
      isFinish,
      lineStyle,
      circleStyle,
      contentStyle,
      onClickStep
    };
  }
});
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_van_icon = resolveComponent("van-icon");
  return openBlock(), createElementBlock("div", {
    ref: "mSetpsItemRef",
    class: normalizeClass(["m-setps-item", [`m-setps-item--${_ctx.parentProps.direction}`]]),
    onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onClickStep && _ctx.onClickStep(...args))
  }, [
    _ctx.showLine ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: normalizeClass(["m-setps-item--line", [`m-setps-item--line--${_ctx.parentProps.direction}`]]),
      style: normalizeStyle([_ctx.lineStyle])
    }, null, 6)) : createCommentVNode("", true),
    createElementVNode("div", {
      class: normalizeClass(["m-setps-item--wrapper", [`m-setps-item--wrapper--${_ctx.parentProps.direction}`]])
    }, [
      createElementVNode("div", {
        class: "m-setps-item--wrapper__circle",
        style: normalizeStyle([_ctx.circleStyle])
      }, [
        _ctx.isFinish ? (openBlock(), createBlock(_component_van_icon, {
          key: 0,
          name: "success",
          color: _ctx.parentProps.activeColor,
          size: "12"
        }, null, 8, ["color"])) : (openBlock(), createElementBlock("span", {
          key: 1,
          class: normalizeClass(["m-setps-item--wrapper__circle__text", [{ isActive: _ctx.isActive }]])
        }, toDisplayString(_ctx.index + 1), 3))
      ], 4)
    ], 2),
    createElementVNode("div", {
      class: normalizeClass(["m-setps-item--value", [`m-setps-item--value--${_ctx.parentProps.direction}`]]),
      style: normalizeStyle([_ctx.contentStyle])
    }, [
      renderSlot(_ctx.$slots, "default", {}, () => [
        createElementVNode("span", null, toDisplayString(_ctx.title), 1)
      ])
    ], 6)
  ], 2);
}
const SetpsItem = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$2]]);
const SetpsComponents = [
  { name: "setps", component: Setps },
  { name: "setps-item", component: SetpsItem }
];
const useAddressStore = defineStore("app.address", {
  state: () => {
    return {
      apiAction: "",
      // 部门人员树数据接口
      getImage: null,
      // 获取照片
      dataObj: [],
      // 树结构数据源
      dataNode: [],
      // 节点数据
      dataFilter: [],
      // 搜索过滤
      filterText: "",
      // 搜索关键字
      selectNodeId: "",
      // 当前节点id
      rootTitle: "全部",
      // 根节点标题
      breadcrumb: [],
      // 面包屑
      checkedMap: /* @__PURE__ */ new Map(),
      // 选中节点集合
      defaultCheckedKeys: []
      // 初始化默认选中ids
    };
  },
  getters: {
    /** 获取当前节点数据 */
    getDataNode: (state) => {
      if (state.selectNodeId) {
        const dataObj = state.dataNode.find((m) => m.id === state.selectNodeId);
        return dataObj.children;
      }
      if (state.filterText) {
        return state.dataFilter;
      }
      return state.dataObj;
    }
  },
  actions: {
    config(title, api, imageFunc) {
      this.rootTitle = title;
      this.apiAction = api;
      this.getImage = imageFunc;
    },
    async init(parms, data, checkedKeys) {
      if (this.dataObj.length === 0) {
        this.breadcrumb = [{ id: "", title: this.rootTitle }];
        if (data && typeof data === Array) {
          this.dataObj = data;
        } else if (this.apiAction) {
          const result = await this.apiAction(parms || {});
          this.dataObj = result || [];
        }
      }
      if (checkedKeys) {
        this.defaultCheckedKeys = Array.from(checkedKeys);
      }
      this.dataNode = [];
      resolveBreadcrumb(this, this.dataObj);
      resolveDefaultChecked(this);
    },
    selectNode(node) {
      if (node.type !== 1) {
        this.selectNodeId = node.id;
        if (!node.breadcrumb) {
          const obj = this.dataNode.find((m) => m.id === node.id);
          node.breadcrumb = (obj == null ? void 0 : obj.breadcrumb) || [];
        }
        this.breadcrumb = [{ id: "", title: this.rootTitle }, ...node.breadcrumb];
        if (this.breadcrumb.length === 1 && this.filterText) {
          this.breadcrumb = [{ id: "", title: this.rootTitle }, { id: "", title: `包含“${this.filterText}”的搜索结果` }];
        }
      }
    },
    checked(node, multiple) {
      if (multiple) {
        resolveChecked(this, node);
        resolveParentChecked(this, node.parentId, node.checked);
      } else {
        resolveChecked2(this, node);
      }
      console.log("checkedMap :>> ", this.checkedMap);
    },
    filter(value) {
      this.filterText = value;
      this.dataFilter = [];
      this.selectNodeId = "";
      this.selectNode({ id: "", title: this.rootTitle });
      if (!value)
        return;
      this.dataNode.forEach((node) => {
        if (node.name.indexOf(value) !== -1) {
          this.dataFilter.push(node);
        }
      });
    },
    remove(node) {
      if (this.checkedMap.has(node.id)) {
        this.checkedMap.delete(node.id);
        resolveRemoveChecked(this, node.id);
        console.log("node :>> ", node);
      }
    }
  }
});
const resolveBreadcrumb = (state, data, parent) => {
  data.forEach((m) => {
    m.breadcrumb = [];
    if (parent) {
      m.breadcrumb = m.breadcrumb.concat(parent.breadcrumb);
    }
    state.dataNode.push(m);
    if (m.type !== 1) {
      m.breadcrumb.push({
        id: m.id,
        title: m.name
      });
    }
    if (m.children) {
      resolveBreadcrumb(state, m.children, m);
    }
  });
};
const resolveChecked = (state, node) => {
  if (node.checked) {
    node.checkedAll = true;
    const { id, name: name2, type, photo, checked, checkedAll, breadcrumb } = node;
    const parent = breadcrumb.map((v) => {
      return { id: v.id, title: v.title };
    });
    state.checkedMap.set(node.id, { id, name: name2, type, photo, checked, checkedAll, parent });
    node.children.forEach((m) => {
      m.checked = true;
      resolveChecked(state, m);
    });
  } else {
    if (state.checkedMap.has(node.id)) {
      state.checkedMap.delete(node.id);
    }
    node.checkedAll = false;
    node.children.forEach((m) => {
      m.checked = false;
      resolveChecked(state, m);
    });
  }
};
const resolveChecked2 = (state, node) => {
  if (node.checked) {
    state.dataNode.forEach((node2) => {
      node2.checked = false;
    });
    state.checkedMap.clear();
    node.checked = true;
    const { id, name: name2, type, photo, checked, checkedAll, breadcrumb } = node;
    const parent = breadcrumb.map((v) => {
      return { id: v.id, title: v.title };
    });
    state.checkedMap.set(node.id, { id, name: name2, type, photo, checked, checkedAll, parent });
  } else {
    if (state.checkedMap.has(node.id)) {
      state.checkedMap.delete(node.id);
    }
  }
};
const resolveParentChecked = (state, parentId, isChecked) => {
  if (parentId) {
    const parentNode = state.dataNode.find((m) => m.id === parentId);
    if (parentNode) {
      if (isChecked) {
        parentNode.checked = true;
      } else {
        parentNode.checked = parentNode.children.some((v) => v.checked);
      }
      parentNode.checkedAll = !parentNode.children.some((v) => !v.checked || !v.checkedAll);
      const { id, name: name2, type, photo, checked, checkedAll, breadcrumb } = parentNode;
      const parent = breadcrumb.map((v) => {
        return { id: v.id, title: v.title };
      });
      state.checkedMap.set(parentNode.id, { id, name: name2, type, photo, checked, checkedAll, parent });
      resolveParentChecked(state, parentNode.parentId, isChecked);
    }
  }
};
const resolveDefaultChecked = (state) => {
  state.dataNode.forEach((node) => {
    node.checked = false;
    node.checkedAll = false;
  });
  state.checkedMap.clear();
  const filter = state.dataNode.filter((e) => e.type === 1 && state.defaultCheckedKeys.includes(e.id));
  filter.forEach((node) => {
    node.checked = true;
    node.checkedAll = true;
    const { id, name: name2, type, photo, checked, checkedAll, breadcrumb } = node;
    const parent = breadcrumb.map((v) => {
      return { id: v.id, title: v.title };
    });
    state.checkedMap.set(node.id, { id, name: name2, type, photo, checked, checkedAll, parent });
    resolveParentChecked(state, node.parentId, true);
  });
};
const resolveRemoveChecked = (state, nodeId) => {
  if (nodeId) {
    const node = state.dataNode.find((m) => m.id === nodeId);
    if (node) {
      node.checked = false;
      node.checkedAll = true;
      resolveParentChecked(state, node.parentId, false);
    }
  }
};
const addressProps = {
  /** 标题 */
  title: {
    type: String,
    default: ""
  },
  /** 隐藏左下角已选择区域 */
  hideSelect: {
    type: Boolean,
    default: false
  },
  /** 是否多选 */
  multiple: {
    type: Boolean,
    default: false
  },
  /** 叶子节点图标 */
  leafIcon: {
    type: String,
    default: "images/mobile-init-image.png"
  },
  /** 列表数据空文案 */
  emptyMsg: {
    type: String,
    default: "暂无成员"
  },
  /** 搜索列表空文案 */
  filterMsg: {
    type: String,
    default: "请输入部门名称/用户姓名搜索"
  },
  /** 已选择对象后缀 */
  suffixText: {
    type: String,
    default: "人"
  }
};
const _hoisted_1$2 = { class: "m-address" };
const _hoisted_2$1 = /* @__PURE__ */ createElementVNode("div", { class: "gray-divider" }, null, -1);
const _hoisted_3$1 = { class: "m-address-breadcrumb" };
const _hoisted_4$1 = ["onClick"];
const _hoisted_5$1 = /* @__PURE__ */ createElementVNode("i", null, ">", -1);
const _hoisted_6$1 = {
  key: 1,
  class: "m-address-breadcrumb__label"
};
const _hoisted_7$1 = { class: "m-address-list van-safe-area-bottom" };
const _hoisted_8$1 = { class: "label" };
const _hoisted_9$1 = /* @__PURE__ */ createElementVNode("div", { class: "right" }, null, -1);
const _hoisted_10 = ["onClick"];
const _hoisted_11 = ["onClick"];
const _hoisted_12 = {
  key: 0,
  class: "van-icon van-icon-arrow van-cell__right-icon"
};
const _hoisted_13 = { class: "m-address-action-bar" };
const _hoisted_14 = { class: "m-address-action-bar__fixed van-safe-area-bottom" };
const _hoisted_15 = {
  key: 0,
  class: "m-address-action-bar__select"
};
const _sfc_main$3 = /* @__PURE__ */ Object.assign({ name: "MAddress" }, {
  __name: "list",
  props: addressProps,
  emits: ["onSave"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const addressStore = useAddressStore();
    const emit = __emit;
    const props = __props;
    const { title, hideSelect, multiple, leafIcon, emptyMsg, filterMsg, suffixText } = props;
    const filterText = ref("");
    const emptyText = computed(() => {
      if (filterText.value)
        return filterMsg || "请输入部门名称/用户姓名搜索";
      return emptyMsg || "暂无成员";
    });
    const disabled = ref(false);
    const loading = ref(true);
    const getImage = computed(() => addressStore.getImage);
    watch(filterText, (val) => {
      addressStore.filter(val);
    });
    const initOptions = {
      rootTitle: "全部",
      actionFunc: "",
      actionParms: {},
      getImageFunc: "",
      data: null,
      defaultCheckedKeys: []
    };
    const reload = (options) => {
      Object.assign(initOptions, options);
      addressStore.config(initOptions.rootTitle, initOptions.actionFunc, initOptions.getImageFunc);
      loading.value = true;
      addressStore.init(initOptions.actionParms, initOptions.data, initOptions.defaultCheckedKeys).then(() => {
        loading.value = false;
      });
    };
    __expose({ reload });
    const dataNode = computed(() => addressStore.getDataNode);
    const breadcrumbNode = computed(() => addressStore.breadcrumb);
    const checkedUsers = computed(() => {
      const nodes = Array.from(addressStore.checkedMap.values());
      return nodes.filter((m) => m.type === 1);
    });
    const onClick = (node) => {
      addressStore.selectNode(node);
    };
    const onChangeChecked = (node) => {
      const { name: name2, checked, checkedAll } = node;
      console.log("onChangeChecked :>> ", JSON.stringify({ name: name2, checked, checkedAll }), node);
      addressStore.checked(node, multiple);
    };
    const onSave = () => {
      if (multiple) {
        emit("onSave", JSON.parse(JSON.stringify(checkedUsers.value)));
      } else {
        const first = _.findLast(checkedUsers.value, (m) => m.id);
        emit("onSave", first);
      }
    };
    return (_ctx, _cache) => {
      const _component_m_nav_bar = resolveComponent("m-nav-bar");
      const _component_van_search = resolveComponent("van-search");
      const _component_m_header = resolveComponent("m-header");
      const _component_van_icon = resolveComponent("van-icon");
      const _component_van_checkbox = resolveComponent("van-checkbox");
      const _component_lazy_component = resolveComponent("lazy-component");
      const _component_van_loading = resolveComponent("van-loading");
      const _component_van_empty = resolveComponent("van-empty");
      const _component_router_link = resolveComponent("router-link");
      const _component_van_button = resolveComponent("van-button");
      const _directive_lazy = resolveDirective("lazy");
      return openBlock(), createElementBlock("div", _hoisted_1$2, [
        createVNode(_component_m_header, null, {
          default: withCtx(() => [
            createVNode(_component_m_nav_bar, { title: unref(title) }, null, 8, ["title"]),
            createVNode(_component_van_search, {
              modelValue: filterText.value,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => filterText.value = $event),
              "show-action": filterText.value.length > 0,
              placeholder: "搜索",
              shape: "round"
            }, null, 8, ["modelValue", "show-action"]),
            _hoisted_2$1,
            createElementVNode("div", _hoisted_3$1, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(breadcrumbNode.value, (item, index2) => {
                return openBlock(), createElementBlock(Fragment, { key: index2 }, [
                  index2 < breadcrumbNode.value.length - 1 ? (openBlock(), createElementBlock("span", {
                    key: 0,
                    class: "m-address-breadcrumb__title",
                    onClick: ($event) => onClick(item)
                  }, [
                    createTextVNode(toDisplayString(item.title), 1),
                    _hoisted_5$1
                  ], 8, _hoisted_4$1)) : (openBlock(), createElementBlock("span", _hoisted_6$1, toDisplayString(item.title), 1))
                ], 64);
              }), 128))
            ])
          ]),
          _: 1
        }),
        createElementVNode("div", _hoisted_7$1, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(dataNode.value, (item, index2) => {
            return openBlock(), createBlock(_component_lazy_component, {
              key: index2,
              class: "m-address-cell"
            }, {
              default: withCtx(() => [
                item.type === 1 ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  createVNode(_component_van_checkbox, {
                    modelValue: item.checked,
                    "onUpdate:modelValue": ($event) => item.checked = $event,
                    name: item.id,
                    onClick: ($event) => onChangeChecked(item)
                  }, {
                    icon: withCtx(() => [
                      createVNode(_component_van_icon, {
                        class: normalizeClass({ checked: item.checked }),
                        name: "success"
                      }, null, 8, ["class"])
                    ]),
                    _: 2
                  }, 1032, ["modelValue", "onUpdate:modelValue", "name", "onClick"]),
                  createElementVNode("div", _hoisted_8$1, [
                    withDirectives(createElementVNode("img", null, null, 512), [
                      [_directive_lazy, item.photo ? getImage.value(item.photo) : unref(leafIcon)]
                    ]),
                    createElementVNode("span", null, toDisplayString(item.name), 1)
                  ]),
                  _hoisted_9$1
                ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  unref(multiple) ? (openBlock(), createBlock(_component_van_checkbox, {
                    key: 0,
                    modelValue: item.checked,
                    "onUpdate:modelValue": ($event) => item.checked = $event,
                    name: item.id,
                    onClick: ($event) => onChangeChecked(item)
                  }, {
                    icon: withCtx(() => [
                      createVNode(_component_van_icon, {
                        class: normalizeClass({ checked: item.checked }),
                        name: item.checkedAll ? "success" : "minus"
                      }, null, 8, ["class", "name"])
                    ]),
                    _: 2
                  }, 1032, ["modelValue", "onUpdate:modelValue", "name", "onClick"])) : createCommentVNode("", true),
                  withDirectives(createElementVNode("img", null, null, 512), [
                    [_directive_lazy, "images/mobile-school.png"]
                  ]),
                  createElementVNode("div", {
                    class: "label",
                    onClick: ($event) => onClick(item)
                  }, [
                    createElementVNode("span", null, toDisplayString(item.name), 1)
                  ], 8, _hoisted_10),
                  createElementVNode("div", {
                    class: "right",
                    onClick: ($event) => onClick(item)
                  }, [
                    item.breadcrumb ? (openBlock(), createElementBlock("i", _hoisted_12)) : createCommentVNode("", true)
                  ], 8, _hoisted_11)
                ], 64))
              ]),
              _: 2
            }, 1024);
          }), 128)),
          loading.value && dataNode.value.length === 0 ? (openBlock(), createBlock(_component_van_loading, {
            key: 0,
            size: "24px",
            vertical: ""
          }, {
            default: withCtx(() => [
              createTextVNode("加载中...")
            ]),
            _: 1
          })) : createCommentVNode("", true),
          !loading.value && dataNode.value.length === 0 ? (openBlock(), createBlock(_component_van_empty, {
            key: 1,
            image: "images/mobile-nodata.png",
            "image-size": "200",
            description: emptyText.value
          }, null, 8, ["description"])) : createCommentVNode("", true)
        ]),
        createElementVNode("div", _hoisted_13, [
          createElementVNode("div", _hoisted_14, [
            !unref(hideSelect) && unref(multiple) ? (openBlock(), createElementBlock("div", _hoisted_15, [
              createTextVNode(" 已选择： "),
              createVNode(_component_router_link, { to: "?page=select" }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(checkedUsers.value.length) + " " + toDisplayString(unref(suffixText)) + " ", 1),
                  createVNode(_component_van_icon, {
                    name: "arrow-up",
                    color: "#1989fa"
                  })
                ]),
                _: 1
              })
            ])) : createCommentVNode("", true),
            createVNode(_component_van_button, {
              class: "m-address-action-bar__btn",
              round: "",
              block: "",
              color: "#F29103",
              type: "primary",
              disabled: disabled.value,
              "native-type": "submit",
              onClick: onSave
            }, {
              default: withCtx(() => [
                createTextVNode(" 确定 ")
              ]),
              _: 1
            }, 8, ["disabled"])
          ])
        ])
      ]);
    };
  }
});
const _hoisted_1$1 = { class: "m-address" };
const _hoisted_2 = /* @__PURE__ */ createElementVNode("div", { class: "gray-divider" }, null, -1);
const _hoisted_3 = { class: "m-address-select-list" };
const _hoisted_4 = { class: "label" };
const _hoisted_5 = { class: "right" };
const _hoisted_6 = ["onClick"];
const _hoisted_7 = /* @__PURE__ */ createElementVNode("i", { class: "van-badge__wrapper van-icon van-icon-minus remove" }, null, -1);
const _hoisted_8 = [
  _hoisted_7
];
const _hoisted_9 = /* @__PURE__ */ createElementVNode("div", { class: "van-safe-area-bottom" }, null, -1);
const _sfc_main$2 = /* @__PURE__ */ Object.assign({ name: "MAddressSelect" }, {
  __name: "select",
  props: addressProps,
  setup(__props) {
    const addressStore = useAddressStore();
    const getImage = computed(() => addressStore.getImage);
    const checkedUsers = computed(() => {
      const nodes = Array.from(addressStore.checkedMap.values());
      return nodes.filter((m) => m.type === 1);
    });
    const onRemove = (node) => {
      addressStore.remove(node);
    };
    return (_ctx, _cache) => {
      const _component_m_nav_bar = resolveComponent("m-nav-bar");
      const _component_m_header = resolveComponent("m-header");
      const _component_lazy_component = resolveComponent("lazy-component");
      const _component_van_empty = resolveComponent("van-empty");
      const _directive_lazy = resolveDirective("lazy");
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        createVNode(_component_m_header, null, {
          default: withCtx(() => [
            createVNode(_component_m_nav_bar, { title: _ctx.title }, null, 8, ["title"]),
            _hoisted_2
          ]),
          _: 1
        }),
        createElementVNode("div", _hoisted_3, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(checkedUsers.value, (item, index2) => {
            return openBlock(), createBlock(_component_lazy_component, {
              key: index2,
              class: "m-address-cell"
            }, {
              default: withCtx(() => [
                createElementVNode("div", _hoisted_4, [
                  withDirectives(createElementVNode("img", null, null, 512), [
                    [_directive_lazy, item.photo ? getImage.value(item.photo) : _ctx.leafIcon]
                  ]),
                  createElementVNode("span", null, toDisplayString(item.name), 1)
                ]),
                createElementVNode("div", _hoisted_5, [
                  createElementVNode("div", {
                    class: "van-checkbox__icon van-checkbox__icon--round van-checkbox__icon--checked",
                    onClick: ($event) => onRemove(item)
                  }, _hoisted_8, 8, _hoisted_6)
                ])
              ]),
              _: 2
            }, 1024);
          }), 128)),
          checkedUsers.value.length === 0 ? (openBlock(), createBlock(_component_van_empty, {
            key: 0,
            image: "images/mobile-nodata.png",
            "image-size": "200",
            description: _ctx.emptyMsg
          }, null, 8, ["description"])) : createCommentVNode("", true)
        ]),
        _hoisted_9
      ]);
    };
  }
});
const AddressComponents = [
  { name: "address", component: _sfc_main$3 },
  { name: "address-select", component: _sfc_main$2 }
];
const listProps = {
  /** 滚动条与底部距离小于 offset 时触发load事件 */
  offset: { type: Number, default: 250 },
  /** 加载过程中的提示文案 */
  loadingText: { type: String, default: "加载中..." },
  /** 滚动触发加载的方向，可选值为up */
  direction: { type: String, default: "down" },
  /** 暂无数据时显示图片 */
  image: { type: String, default: "" },
  /** 图片大小 */
  imageSize: { type: Number, default: 200 },
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
  groupBy: { type: [String, Function], default: "" }
};
const name$1 = "m-list";
const LIST_KEY = Symbol(name$1);
const _sfc_main$1 = defineComponent({
  name: name$1,
  props: listProps,
  emits: ["click"],
  setup(props, { emit, slots }) {
    const { linkChildren } = useChildren(LIST_KEY);
    const loading = ref(false);
    const state = reactive({
      finished: false,
      refreshing: false,
      pageIndex: 1,
      list: []
    });
    const finishedText = computed(() => {
      if (formatList.value.length === 0 && state.finished) {
        return "暂无数据";
      }
      return "没有更多了";
    });
    const showImage = computed(() => {
      if (props.image && finishedText.value === "暂无数据") {
        return true;
      }
      return false;
    });
    const formatList = computed(() => {
      let _list = state.list;
      if (props.filter) {
        _list = props.filter(_list);
      }
      if (props.formatter) {
        _list = props.formatter(_list);
      }
      if (props.groupBy) {
        const groupArr = _list.reduce((result, currentItem) => {
          const groupKey = typeof props.groupBy === "function" ? props.groupBy(currentItem) : currentItem[props.groupBy];
          if (!result[groupKey]) {
            result[groupKey] = [];
            currentItem["group"] = groupKey;
          }
          result[groupKey].push(currentItem);
          return result;
        }, {});
        _list = Object.values(groupArr).reduce((acc, curr) => {
          return acc.concat(curr);
        }, []);
      }
      return _list;
    });
    const onLoad = () => {
      if (props.queryMethod) {
        const queryParams = Object.assign({}, props.queryModel);
        queryParams["pageIndex"] = state.pageIndex;
        queryParams["pageSize"] = props.pageSize;
        props.queryMethod(queryParams).then((res) => {
          console.log("res :>> ", res);
          state.pageIndex++;
          if (res.total === 0) {
            state.finished = true;
          }
          if (res.item) {
            if (res.item.length < props.pageSize) {
              state.finished = true;
            }
            state.list.push(...res.item);
          }
          if (state.refreshing) {
            state.refreshing = false;
          }
        }).catch(() => {
          if (state.refreshing) {
            state.refreshing = false;
          }
        }).finally(() => {
          loading.value = false;
        });
      }
    };
    const onRefresh = () => {
      state.list = [];
      state.pageIndex = 1;
      state.finished = false;
      loading.value = true;
      onLoad();
    };
    watch(() => props.queryModel, () => {
      onRefresh();
    });
    const onClick = (item) => emit("click", item);
    const getCellItem = (index2) => {
      return formatList.value[index2];
    };
    linkChildren({
      props,
      onClick,
      getCellItem
    });
    return {
      loading,
      finishedText,
      showImage,
      formatList,
      ...toRefs(state),
      onRefresh,
      onLoad,
      onClick
    };
  }
});
const _hoisted_1 = { class: "m-list" };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_van_empty = resolveComponent("van-empty");
  const _component_van_list = resolveComponent("van-list");
  const _component_van_pull_refresh = resolveComponent("van-pull-refresh");
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createVNode(_component_van_pull_refresh, {
      modelValue: _ctx.refreshing,
      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.refreshing = $event),
      onRefresh: _ctx.onRefresh
    }, {
      default: withCtx(() => [
        createVNode(_component_van_list, {
          loading: _ctx.loading,
          "onUpdate:loading": _cache[0] || (_cache[0] = ($event) => _ctx.loading = $event),
          finished: _ctx.finished,
          offset: _ctx.offset,
          "finished-text": _ctx.finishedText,
          "loading-text": _ctx.loadingText,
          onLoad: _ctx.onLoad
        }, {
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.formatList, (item, index2) => {
              return renderSlot(_ctx.$slots, "default", { key: index2 });
            }), 128)),
            _ctx.showImage ? (openBlock(), createBlock(_component_van_empty, {
              key: 0,
              image: _ctx.image,
              "image-size": _ctx.imageSize
            }, null, 8, ["image", "image-size"])) : createCommentVNode("", true)
          ]),
          _: 3
        }, 8, ["loading", "finished", "offset", "finished-text", "loading-text", "onLoad"])
      ]),
      _: 3
    }, 8, ["modelValue", "onRefresh"])
  ]);
}
const List = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
const name = "m-list-cell";
const _sfc_main = defineComponent({
  name,
  props: {},
  setup(props, { emit, slots }) {
    const { parent, index: index2 } = useParent(LIST_KEY);
    if (!parent) {
      if (process.env.NODE_ENV !== "production") {
        console.error("[Vant] <m-list> must be a child component of <m-list>.");
      }
      return;
    }
    const item = computed(() => parent.getCellItem(index2.value));
    const onClick = () => parent.onClick(item.value);
    return {
      index: index2,
      item,
      onClick
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: "m-list--item",
    onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onClick && _ctx.onClick(...args))
  }, [
    renderSlot(_ctx.$slots, "default", {
      item: _ctx.item,
      index: _ctx.index,
      group: _ctx.item.group
    })
  ]);
}
const ListCell = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
const ListComponents = [
  { name: "list", component: List },
  { name: "list-cell", component: ListCell }
];
const components = [
  ...BaseComponets,
  ...Advanced,
  ...TableComponents,
  ...SetpsComponents,
  ...AddressComponents,
  ...ListComponents
];
const componentNames = [];
const registerComponent = (app, name2, component) => {
  app.component(`m-${name2}`, component);
  componentNames.push(`m-${name2}`);
};
const Components = (app) => {
  components.forEach((m) => {
    registerComponent(app, m.name, m.component);
  });
  console.log("componentNames :>> ", componentNames);
};
const index = "";
const install = function(app) {
  app.use(Components);
};
const install$1 = {
  install
};
export {
  install$1 as default,
  useAddressStore
};
import './style.css';
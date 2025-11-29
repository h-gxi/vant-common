var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  actionSheetProps: () => actionSheetProps,
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
const name = "m-action-sheet";
const actionSheetProps = {
  /** 面板选项列表 */
  actions: {
    type: Array,
    default: []
  },
  /** 标题 */
  title: {
    type: String,
    default: ""
  },
  /** 取消按钮文字 */
  cancelText: {
    type: String,
    default: ""
  },
  /** 是否显示圆角 */
  round: {
    type: Boolean,
    default: false
  },
  /** 左上角按钮图标  */
  leftIcon: {
    type: String,
    default: "arrow-left"
  },
  /** 是否在点击选项后关闭 */
  closeOnClickAction: {
    type: Boolean,
    default: false
  }
};
const __vue_sfc__ = (0, import_vue.defineComponent)({
  name,
  props: actionSheetProps,
  emits: ["select", "cancel"],
  setup(props, { emit }) {
    const visible = (0, import_vue.ref)(false);
    const onclick = (item, i) => {
      if (props.closeOnClickAction) {
        close();
      }
      emit("select", item, i);
    };
    const onClose = () => {
      close();
      emit("cancel");
    };
    const open = () => {
      visible.value = true;
    };
    const close = () => {
      visible.value = false;
    };
    return {
      visible,
      onclick,
      onClose,
      open,
      close
    };
  }
});
const _withScopeId = (n) => ((0, import_vue2.pushScopeId)(""), n = n(), (0, import_vue2.popScopeId)(), n);
const _hoisted_1 = { class: "m-action-sheet" };
const _hoisted_2 = {
  key: 0,
  class: "m-popup-header"
};
const _hoisted_3 = {
  key: 0,
  class: "left"
};
const _hoisted_4 = { class: "title" };
const _hoisted_5 = { class: "right" };
const _hoisted_6 = { class: "m-action-sheet__content" };
const _hoisted_7 = ["onClick"];
const _hoisted_8 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ (0, import_vue2.createElementVNode)(
  "div",
  { class: "m-action-sheet__gap" },
  null,
  -1
  /* HOISTED */
));
const _hoisted_9 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ (0, import_vue2.createElementVNode)(
  "div",
  { class: "m-action-sheet__bottom" },
  null,
  -1
  /* HOISTED */
));
function __vue_render__(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_van_icon = (0, import_vue2.resolveComponent)("van-icon");
  const _component_van_popup = (0, import_vue2.resolveComponent)("van-popup");
  return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("div", _hoisted_1, [
    (0, import_vue2.createVNode)(_component_van_popup, {
      show: _ctx.visible,
      "onUpdate:show": _cache[1] || (_cache[1] = ($event) => _ctx.visible = $event),
      round: _ctx.round,
      "safe-area-inset-bottom": "",
      position: "bottom"
    }, {
      default: (0, import_vue2.withCtx)(() => [
        _ctx.title ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("div", _hoisted_2, [
          _ctx.leftIcon ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("div", _hoisted_3, [
            (0, import_vue2.createVNode)(_component_van_icon, {
              name: _ctx.leftIcon,
              onClick: _ctx.onClose
            }, null, 8, ["name", "onClick"])
          ])) : (0, import_vue2.createCommentVNode)("v-if", true),
          (0, import_vue2.createElementVNode)(
            "div",
            _hoisted_4,
            (0, import_vue2.toDisplayString)(_ctx.title),
            1
            /* TEXT */
          ),
          (0, import_vue2.createElementVNode)("div", _hoisted_5, [
            (0, import_vue2.renderSlot)(_ctx.$slots, "header-right", {}, () => [
              (0, import_vue2.createVNode)(_component_van_icon, {
                name: "cross",
                onClick: _ctx.onClose
              }, null, 8, ["onClick"])
            ])
          ])
        ])) : (0, import_vue2.createCommentVNode)("v-if", true),
        (0, import_vue2.createElementVNode)("div", _hoisted_6, [
          ((0, import_vue2.openBlock)(true), (0, import_vue2.createElementBlock)(
            import_vue2.Fragment,
            null,
            (0, import_vue2.renderList)(_ctx.actions, (item, i) => {
              return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("button", {
                type: "button",
                class: "m-action-sheet__item",
                onClick: ($event) => _ctx.onclick(item, i)
              }, [
                item.icon ? ((0, import_vue2.openBlock)(), (0, import_vue2.createBlock)(_component_van_icon, {
                  key: 0,
                  name: item.icon
                }, null, 8, ["name"])) : (0, import_vue2.createCommentVNode)("v-if", true),
                (0, import_vue2.createTextVNode)(
                  " " + (0, import_vue2.toDisplayString)(item.name),
                  1
                  /* TEXT */
                )
              ], 8, _hoisted_7);
            }),
            256
            /* UNKEYED_FRAGMENT */
          )),
          _ctx.cancelText ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
            import_vue2.Fragment,
            { key: 0 },
            [
              _hoisted_8,
              (0, import_vue2.createElementVNode)(
                "button",
                {
                  type: "button",
                  class: "m-action-sheet__cancel",
                  onClick: _cache[0] || (_cache[0] = ($event) => _ctx.onClose())
                },
                (0, import_vue2.toDisplayString)(_ctx.cancelText),
                1
                /* TEXT */
              ),
              _hoisted_9
            ],
            64
            /* STABLE_FRAGMENT */
          )) : (0, import_vue2.createCommentVNode)("v-if", true)
        ])
      ]),
      _: 3
      /* FORWARDED */
    }, 8, ["show", "round"])
  ]);
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;

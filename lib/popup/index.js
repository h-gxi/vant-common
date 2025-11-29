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
  POPUP_KEY: () => POPUP_KEY,
  default: () => stdin_default,
  popupProps: () => popupProps
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_use = require("@vant/use");
var import_vue2 = require("vue");
const name = "m-popup";
const POPUP_KEY = Symbol(name);
const popupProps = {
  /** 标题 */
  title: {
    type: String,
    default: ""
  },
  /** 是否显示圆角 */
  round: {
    type: Boolean,
    default: true
  },
  /** 是否显示标题栏 */
  header: {
    type: Boolean,
    default: true
  },
  /** 是否显示底部按钮 */
  footer: {
    type: Boolean,
    default: true
  },
  /** 左上角按钮 可选值 arrow-left | cross  */
  leftIcon: {
    type: String,
    default: "arrow-left"
  },
  /** 底部左侧按钮  */
  cancelText: {
    type: String,
    default: "\u53D6\u6D88"
  },
  /** 底部左侧按钮回调函数  */
  cancelFunc: {
    type: Function,
    default: null
  },
  /** 底部右侧按钮  */
  confirmText: {
    type: String,
    default: "\u786E\u8BA4"
  },
  /** 标题栏左侧按钮回调函数  */
  backFunc: {
    type: Function,
    default: null
  },
  /** 底部右侧按钮回调函数  */
  confirmFunc: {
    type: Function,
    default: null
  },
  /** 是否调用回调函数后自动关闭 */
  autoClose: {
    type: Boolean,
    default: false
  }
};
const __vue_sfc__ = (0, import_vue.defineComponent)({
  name,
  props: popupProps,
  emits: [],
  setup(props) {
    const { linkChildren } = (0, import_use.useChildren)(POPUP_KEY);
    const visible = (0, import_vue.ref)(false);
    const checked = (0, import_vue.ref)(null);
    const setValue = (val) => {
      checked.value = val;
    };
    const onBack = () => {
      if (props.backFunc) {
        props.backFunc();
        if (props.autoClose) {
          close();
        }
      } else {
        close();
      }
    };
    const onConfirm = () => {
      if (props.confirmFunc) {
        props.confirmFunc(checked.value);
        if (props.autoClose) {
          close();
        }
      } else {
        close();
      }
    };
    const onCancel = () => {
      if (props.cancelFunc) {
        props.cancelFunc();
        if (props.autoClose) {
          close();
        }
      } else {
        close();
      }
    };
    const open = () => {
      visible.value = true;
    };
    const close = () => {
      visible.value = false;
    };
    linkChildren({
      setValue,
      open,
      close
    });
    return {
      visible,
      onBack,
      onConfirm,
      onCancel,
      setValue,
      open,
      close
    };
  }
});
const _withScopeId = (n) => ((0, import_vue2.pushScopeId)(""), n = n(), (0, import_vue2.popScopeId)(), n);
const _hoisted_1 = { class: "m-popup" };
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
const _hoisted_6 = { class: "m-popup-content" };
const _hoisted_7 = {
  key: 1,
  class: "m-popup-footer"
};
function __vue_render__(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_van_icon = (0, import_vue2.resolveComponent)("van-icon");
  const _component_van_popup = (0, import_vue2.resolveComponent)("van-popup");
  return (0, import_vue2.openBlock)(), (0, import_vue2.createBlock)(_component_van_popup, {
    show: _ctx.visible,
    "onUpdate:show": _cache[2] || (_cache[2] = ($event) => _ctx.visible = $event),
    round: _ctx.round,
    "safe-area-inset-bottom": "",
    position: "bottom"
  }, {
    default: (0, import_vue2.withCtx)(() => [
      (0, import_vue2.createElementVNode)("div", _hoisted_1, [
        _ctx.header ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("div", _hoisted_2, [
          _ctx.leftIcon ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("div", _hoisted_3, [
            (0, import_vue2.createVNode)(_component_van_icon, {
              name: _ctx.leftIcon,
              onClick: _ctx.onBack
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
                onClick: _ctx.close
              }, null, 8, ["onClick"])
            ])
          ])
        ])) : (0, import_vue2.createCommentVNode)("v-if", true),
        (0, import_vue2.createElementVNode)("div", _hoisted_6, [
          (0, import_vue2.renderSlot)(_ctx.$slots, "default")
        ]),
        _ctx.footer ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("div", _hoisted_7, [
          (0, import_vue2.renderSlot)(_ctx.$slots, "footer", {}, () => [
            _ctx.cancelText ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
              "div",
              {
                key: 0,
                class: "btn cancel",
                onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onCancel && _ctx.onCancel(...args))
              },
              (0, import_vue2.toDisplayString)(_ctx.cancelText),
              1
              /* TEXT */
            )) : (0, import_vue2.createCommentVNode)("v-if", true),
            _ctx.confirmText ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
              "div",
              {
                key: 1,
                class: "btn confirm",
                onClick: _cache[1] || (_cache[1] = (...args) => _ctx.onConfirm && _ctx.onConfirm(...args))
              },
              (0, import_vue2.toDisplayString)(_ctx.confirmText),
              1
              /* TEXT */
            )) : (0, import_vue2.createCommentVNode)("v-if", true)
          ])
        ])) : (0, import_vue2.createCommentVNode)("v-if", true)
      ])
    ]),
    _: 3
    /* FORWARDED */
  }, 8, ["show", "round"]);
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;

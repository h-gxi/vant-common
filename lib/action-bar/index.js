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
  ACTIONBAR_KEY: () => ACTIONBAR_KEY,
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_use = require("@vant/use");
var import_utils = require("../utils/index");
var import_vue2 = require("vue");
const name = "m-action-bar";
const ACTIONBAR_KEY = Symbol(name);
const __vue_sfc__ = (0, import_vue.defineComponent)({
  name,
  props: {
    sticky: Boolean,
    container: Object,
    offsetBottom: (0, import_utils.makeNumericProp)(0)
  },
  emits: [],
  setup() {
    const { linkChildren } = (0, import_use.useChildren)(ACTIONBAR_KEY);
    const offsetHeight = (0, import_vue.ref)(55);
    const rootRef = (0, import_vue.ref)();
    const styleObj = (0, import_vue.computed)(() => {
      let style = "";
      if (offsetHeight.value > 0) {
        style = `height: ${offsetHeight.value}px;`;
      }
      return style;
    });
    (0, import_vue.onMounted)(() => {
      (0, import_vue.nextTick)(() => {
        setTimeout(() => {
          const rect = (0, import_use.useRect)(rootRef);
          offsetHeight.value = rect.height;
        }, 50);
      });
    });
    linkChildren();
    return {
      rootRef,
      styleObj
    };
  }
});
const _withScopeId = (n) => ((0, import_vue2.pushScopeId)(""), n = n(), (0, import_vue2.popScopeId)(), n);
const _hoisted_1 = { class: "m-action-bar" };
const _hoisted_2 = {
  ref: "rootRef",
  class: "m-action-bar fixed"
};
function __vue_render__(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_van_sticky = (0, import_vue2.resolveComponent)("van-sticky");
  return _ctx.sticky ? ((0, import_vue2.openBlock)(), (0, import_vue2.createBlock)(_component_van_sticky, {
    key: 0,
    container: _ctx.container,
    position: "bottom",
    "offset-bottom": _ctx.offsetBottom
  }, {
    default: (0, import_vue2.withCtx)(() => [
      (0, import_vue2.createElementVNode)("div", _hoisted_1, [
        (0, import_vue2.renderSlot)(_ctx.$slots, "default")
      ])
    ]),
    _: 3
    /* FORWARDED */
  }, 8, ["container", "offset-bottom"])) : ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
    "div",
    {
      key: 1,
      class: "m-action-bar__placeholder",
      style: (0, import_vue2.normalizeStyle)(_ctx.styleObj)
    },
    [
      (0, import_vue2.createElementVNode)(
        "div",
        _hoisted_2,
        [
          (0, import_vue2.renderSlot)(_ctx.$slots, "default")
        ],
        512
        /* NEED_PATCH */
      )
    ],
    4
    /* STYLE */
  ));
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;

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
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_props = require("./props");
var import_vue2 = require("vue");
const name = "m-nav-bar";
const __vue_sfc__ = (0, import_vue.defineComponent)({
  name,
  props: import_props.navbarProps,
  emits: ["click-left", "click-right"],
  setup(props, { emit }) {
    const isShow = (0, import_vue.computed)(() => {
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
function __vue_render__(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_van_nav_bar = (0, import_vue2.resolveComponent)("van-nav-bar");
  return _ctx.isShow ? ((0, import_vue2.openBlock)(), (0, import_vue2.createBlock)(_component_van_nav_bar, {
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
  }, (0, import_vue2.createSlots)({
    _: 2
    /* DYNAMIC */
  }, [
    _ctx.$slots.title ? {
      name: "title",
      fn: (0, import_vue2.withCtx)(() => [
        (0, import_vue2.renderSlot)(_ctx.$slots, "title")
      ]),
      key: "0"
    } : void 0,
    _ctx.$slots.left ? {
      name: "left",
      fn: (0, import_vue2.withCtx)(() => [
        (0, import_vue2.renderSlot)(_ctx.$slots, "left")
      ]),
      key: "1"
    } : void 0,
    _ctx.$slots.right ? {
      name: "right",
      fn: (0, import_vue2.withCtx)(() => [
        (0, import_vue2.renderSlot)(_ctx.$slots, "right")
      ]),
      key: "2"
    } : void 0
  ]), 1032, ["title", "left-text", "right-text", "left-arrow", "border", "fixed", "placeholder", "z-index", "safe-area-inset-top", "onClickLeft", "onClickRight"])) : (0, import_vue2.createCommentVNode)("v-if", true);
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;

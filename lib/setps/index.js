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
  STEPS_KEY: () => STEPS_KEY,
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_use = require("@vant/use");
var import_props = require("./props");
var import_vue2 = require("vue");
const name = "m-setps";
const STEPS_KEY = Symbol(name);
const __vue_sfc__ = (0, import_vue.defineComponent)({
  name,
  props: import_props.stepsProps,
  emits: ["clickStep"],
  setup(props, { emit }) {
    const { linkChildren } = (0, import_use.useChildren)(STEPS_KEY);
    const onClickStep = (index) => emit("clickStep", index);
    linkChildren({
      props,
      onClickStep
    });
    return {};
  }
});
function __vue_render__(_ctx, _cache, $props, $setup, $data, $options) {
  return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
    "div",
    {
      class: (0, import_vue2.normalizeClass)(["m-setps", [`m-setps--${_ctx.direction}`, _ctx.type]])
    },
    [
      (0, import_vue2.renderSlot)(_ctx.$slots, "default")
    ],
    2
    /* CLASS */
  );
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;

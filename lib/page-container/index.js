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
  PAGE_KEY: () => PAGE_KEY,
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_use = require("@vant/use");
var import_vue2 = require("vue");
const name = "m-page-container";
const PAGE_KEY = Symbol(name);
const __vue_sfc__ = (0, import_vue.defineComponent)({
  name,
  props: {
    background: String,
    minHeight: {
      type: String,
      default: "100%"
    }
  },
  emits: [],
  setup() {
    const rootRef = (0, import_vue.ref)();
    const { linkChildren } = (0, import_use.useChildren)(PAGE_KEY);
    const headerHeight = (0, import_vue.ref)(0);
    const setHeight = (value) => {
      headerHeight.value = value;
    };
    linkChildren({
      headerHeight,
      setHeight
    });
    return {
      rootRef
    };
  }
});
function __vue_render__(_ctx, _cache, $props, $setup, $data, $options) {
  return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
    "div",
    {
      ref: "rootRef",
      class: "m-page-container",
      style: (0, import_vue2.normalizeStyle)({ background: _ctx.background, minHeight: _ctx.minHeight })
    },
    [
      (0, import_vue2.renderSlot)(_ctx.$slots, "default")
    ],
    4
    /* STYLE */
  );
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;

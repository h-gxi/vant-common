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
var import_use = require("@vant/use");
var import_list = require("../list/index");
var import_vue2 = require("vue");
const name = "m-list-cell";
const __vue_sfc__ = (0, import_vue.defineComponent)({
  name,
  props: {},
  setup() {
    const { parent, index } = (0, import_use.useParent)(import_list.LIST_KEY);
    if (!parent) {
      if (process.env.NODE_ENV !== "production") {
        console.error("[Vant] <m-list> must be a child component of <m-list>.");
      }
      return;
    }
    const item = (0, import_vue.computed)(() => parent.getCellItem(index.value));
    const onClick = () => parent.onClick(item.value);
    return {
      index,
      item,
      onClick
    };
  }
});
function __vue_render__(_ctx, _cache, $props, $setup, $data, $options) {
  return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("div", {
    class: "m-list--item",
    onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onClick && _ctx.onClick(...args))
  }, [
    (0, import_vue2.renderSlot)(_ctx.$slots, "default", {
      item: _ctx.item,
      index: _ctx.index,
      group: _ctx.item.group
    })
  ]);
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;

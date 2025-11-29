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
var import_utils = require("../utils");
var import_use_route = require("../composables/use-route");
var import_action_bar = require("../action-bar/index");
var import_use = require("@vant/use");
var import_vue2 = require("vue");
const name = "m-action-bar-item";
const actionBarIiemProps = (0, import_utils.extend)({}, import_use_route.routeProps, {
  /** 按钮类型 'icon' | 'button' */
  type: (0, import_utils.makeStringProp)("icon"),
  /** 图标 */
  icon: String,
  /** 类名前缀，用于使用自定义图标 */
  classPrefix: String,
  /** 是否显示图标右上角小红点 */
  dot: Boolean,
  /** 按钮文字 */
  text: String,
  /** 是否禁用按钮 */
  disabled: Boolean,
  /** 朴素按钮 */
  plain: Boolean,
  /** 行内元素 */
  inline: Boolean,
  /** 按钮颜色，支持传入 linear-gradient 渐变色 */
  color: String,
  /** 按钮样式 */
  mClass: null
});
const __vue_sfc__ = (0, import_vue.defineComponent)({
  name,
  props: actionBarIiemProps,
  emits: ["click"],
  setup(props, { emit }) {
    const route = (0, import_use_route.useRoute)();
    const { parent } = (0, import_use.useParent)(import_action_bar.ACTIONBAR_KEY);
    if (!parent) {
      if (process.env.NODE_ENV !== "production") {
        console.error(
          "[Vant] <m-action-bar> must be a child component of <m-action-bar>."
        );
      }
      return;
    }
    const prefix = (0, import_vue.computed)(() => props.classPrefix || "van-icon");
    const onClick = (event) => {
      emit("click", event);
      route();
    };
    return {
      prefix,
      onClick
    };
  }
});
const _withScopeId = (n) => ((0, import_vue2.pushScopeId)(""), n = n(), (0, import_vue2.popScopeId)(), n);
const _hoisted_1 = { class: "m-action-bar-icon__text" };
function __vue_render__(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_van_icon = (0, import_vue2.resolveComponent)("van-icon");
  const _component_van_button = (0, import_vue2.resolveComponent)("van-button");
  return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
    import_vue2.Fragment,
    null,
    [
      _ctx.type === "icon" ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
        "div",
        {
          key: 0,
          class: (0, import_vue2.normalizeClass)(["m-action-bar-item m-action-bar-icon", [{ inline: _ctx.inline }, _ctx.mClass]]),
          onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onClick && _ctx.onClick(...args))
        },
        [
          (0, import_vue2.renderSlot)(_ctx.$slots, "icon", {}, () => [
            (0, import_vue2.createVNode)(_component_van_icon, {
              name: _ctx.icon,
              dot: _ctx.dot,
              color: _ctx.color,
              "class-prefix": _ctx.prefix,
              class: "m-action-bar-icon__icon"
            }, null, 8, ["name", "dot", "color", "class-prefix"])
          ]),
          (0, import_vue2.createElementVNode)("span", _hoisted_1, [
            (0, import_vue2.renderSlot)(_ctx.$slots, "text", {}, () => [
              (0, import_vue2.createTextVNode)(
                (0, import_vue2.toDisplayString)(_ctx.text),
                1
                /* TEXT */
              )
            ])
          ])
        ],
        2
        /* CLASS */
      )) : (0, import_vue2.createCommentVNode)("v-if", true),
      _ctx.type === "button" ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
        "div",
        {
          key: 1,
          class: (0, import_vue2.normalizeClass)(["m-action-bar-item m-action-bar-button", _ctx.mClass]),
          onClick: _cache[1] || (_cache[1] = (...args) => _ctx.onClick && _ctx.onClick(...args))
        },
        [
          (0, import_vue2.createVNode)(_component_van_button, {
            type: "primary",
            disabled: _ctx.disabled,
            plain: _ctx.plain,
            color: _ctx.color,
            block: "",
            round: ""
          }, {
            default: (0, import_vue2.withCtx)(() => [
              (0, import_vue2.createTextVNode)(
                (0, import_vue2.toDisplayString)(_ctx.text),
                1
                /* TEXT */
              )
            ]),
            _: 1
            /* STABLE */
          }, 8, ["disabled", "plain", "color"]),
          (0, import_vue2.renderSlot)(_ctx.$slots, "default")
        ],
        2
        /* CLASS */
      )) : (0, import_vue2.createCommentVNode)("v-if", true)
    ],
    64
    /* STABLE_FRAGMENT */
  );
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;

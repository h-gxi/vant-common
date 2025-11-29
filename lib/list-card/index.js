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
var import_vue2 = require("vue");
const name = "m-list-card";
const listCardProps = {
  /** 右上角图标 */
  rightIcon: String,
  /** 右上角文字 */
  rightText: String,
  /** 类名前缀，用于使用自定义图标 */
  classPrefix: String,
  /** 标题文字 */
  title: String,
  /** 标签文字 */
  label: String,
  /** 正文 */
  content: String,
  /** 底部左边文字 */
  toolbarLeft: String,
  /** 正文样式 */
  contentClass: {
    type: String,
    default: "van-multi-ellipsis--l2"
  },
  /** 底部右边字体颜色 */
  toolbarRightColor: String
};
const __vue_sfc__ = (0, import_vue.defineComponent)({
  name,
  props: listCardProps,
  emits: ["click", "header-icon", "toolbar-right"],
  setup(props, { emit, slots }) {
    const isShowToolbar = (0, import_vue.computed)(
      () => props.toolbarLeft || slots["toolbar-left"] || slots["toolbar-right"]
    );
    const toolbarRightStyle = (0, import_vue.computed)(() => {
      if (props.toolbarRightColor) {
        const style = {
          color: props.toolbarRightColor
        };
        return style;
      }
      return "";
    });
    const onClick = (event) => {
      emit("click", event);
    };
    const onHeaderIcon = (event) => {
      emit("header-icon", event);
    };
    const onToolbarRight = (event) => {
      emit("toolbar-right", event);
    };
    return {
      isShowToolbar,
      toolbarRightStyle,
      onClick,
      onHeaderIcon,
      onToolbarRight
    };
  }
});
const _withScopeId = (n) => ((0, import_vue2.pushScopeId)(""), n = n(), (0, import_vue2.popScopeId)(), n);
const _hoisted_1 = { class: "m-list--card__left" };
const _hoisted_2 = { class: "m-list--card__box" };
const _hoisted_3 = { class: "m-list--card__header" };
const _hoisted_4 = { class: "left" };
const _hoisted_5 = { class: "header-title van-ellipsis" };
const _hoisted_6 = { class: "header-label" };
const _hoisted_7 = { class: "right" };
const _hoisted_8 = { class: "label" };
const _hoisted_9 = {
  key: 0,
  class: "m-list--card__toolbar"
};
const _hoisted_10 = { class: "toolbar-left" };
const _hoisted_11 = { class: "toolbar-left__span" };
function __vue_render__(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_van_icon = (0, import_vue2.resolveComponent)("van-icon");
  return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
    "div",
    {
      class: (0, import_vue2.normalizeClass)(["m-list--card", [{ "show-toobar__line": _ctx.isShowToolbar }]]),
      onClick: _cache[2] || (_cache[2] = (...args) => _ctx.onClick && _ctx.onClick(...args))
    },
    [
      (0, import_vue2.createElementVNode)("div", _hoisted_1, [
        (0, import_vue2.renderSlot)(_ctx.$slots, "avatar")
      ]),
      (0, import_vue2.createElementVNode)("div", _hoisted_2, [
        (0, import_vue2.createElementVNode)("div", _hoisted_3, [
          (0, import_vue2.createElementVNode)("div", _hoisted_4, [
            (0, import_vue2.createElementVNode)(
              "div",
              _hoisted_5,
              (0, import_vue2.toDisplayString)(_ctx.title),
              1
              /* TEXT */
            ),
            (0, import_vue2.createElementVNode)("div", _hoisted_6, [
              (0, import_vue2.renderSlot)(_ctx.$slots, "label", {}, () => [
                (0, import_vue2.createTextVNode)(
                  (0, import_vue2.toDisplayString)(_ctx.label),
                  1
                  /* TEXT */
                )
              ])
            ])
          ]),
          (0, import_vue2.createElementVNode)("div", _hoisted_7, [
            (0, import_vue2.renderSlot)(_ctx.$slots, "right", {}, () => [
              (0, import_vue2.createElementVNode)("div", {
                class: "header-icon",
                onClick: _cache[0] || (_cache[0] = (0, import_vue2.withModifiers)((...args) => _ctx.onHeaderIcon && _ctx.onHeaderIcon(...args), ["stop"]))
              }, [
                (0, import_vue2.createVNode)(_component_van_icon, {
                  name: _ctx.rightIcon,
                  "class-prefix": _ctx.classPrefix
                }, null, 8, ["name", "class-prefix"]),
                (0, import_vue2.createElementVNode)(
                  "div",
                  _hoisted_8,
                  (0, import_vue2.toDisplayString)(_ctx.rightText),
                  1
                  /* TEXT */
                )
              ])
            ])
          ])
        ]),
        (0, import_vue2.createElementVNode)(
          "div",
          {
            class: (0, import_vue2.normalizeClass)(["m-list--card__content", [_ctx.contentClass, { "hide-toobar": !_ctx.isShowToolbar }]])
          },
          (0, import_vue2.toDisplayString)(_ctx.content),
          3
          /* TEXT, CLASS */
        ),
        _ctx.isShowToolbar ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("div", _hoisted_9, [
          (0, import_vue2.createElementVNode)("div", _hoisted_10, [
            (0, import_vue2.renderSlot)(_ctx.$slots, "toolbar-left", {}, () => [
              (0, import_vue2.createElementVNode)(
                "span",
                _hoisted_11,
                (0, import_vue2.toDisplayString)(_ctx.toolbarLeft),
                1
                /* TEXT */
              )
            ])
          ]),
          (0, import_vue2.createElementVNode)(
            "div",
            {
              class: "right",
              style: (0, import_vue2.normalizeStyle)(_ctx.toolbarRightStyle),
              onClick: _cache[1] || (_cache[1] = (0, import_vue2.withModifiers)((...args) => _ctx.onToolbarRight && _ctx.onToolbarRight(...args), ["stop"]))
            },
            [
              (0, import_vue2.renderSlot)(_ctx.$slots, "toolbar-right")
            ],
            4
            /* STYLE */
          )
        ])) : (0, import_vue2.createCommentVNode)("v-if", true)
      ])
    ],
    2
    /* CLASS */
  );
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;

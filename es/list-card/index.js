import {
  computed,
  defineComponent
} from "vue";
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
const __vue_sfc__ = defineComponent({
  name,
  props: listCardProps,
  emits: ["click", "header-icon", "toolbar-right"],
  setup(props, { emit, slots }) {
    const isShowToolbar = computed(
      () => props.toolbarLeft || slots["toolbar-left"] || slots["toolbar-right"]
    );
    const toolbarRightStyle = computed(() => {
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
import { renderSlot as _renderSlot, createElementVNode as _createElementVNode, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, resolveComponent as _resolveComponent, createVNode as _createVNode, withModifiers as _withModifiers, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "vue";
const _withScopeId = (n) => (_pushScopeId(""), n = n(), _popScopeId(), n);
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
  const _component_van_icon = _resolveComponent("van-icon");
  return _openBlock(), _createElementBlock(
    "div",
    {
      class: _normalizeClass(["m-list--card", [{ "show-toobar__line": _ctx.isShowToolbar }]]),
      onClick: _cache[2] || (_cache[2] = (...args) => _ctx.onClick && _ctx.onClick(...args))
    },
    [
      _createElementVNode("div", _hoisted_1, [
        _renderSlot(_ctx.$slots, "avatar")
      ]),
      _createElementVNode("div", _hoisted_2, [
        _createElementVNode("div", _hoisted_3, [
          _createElementVNode("div", _hoisted_4, [
            _createElementVNode(
              "div",
              _hoisted_5,
              _toDisplayString(_ctx.title),
              1
              /* TEXT */
            ),
            _createElementVNode("div", _hoisted_6, [
              _renderSlot(_ctx.$slots, "label", {}, () => [
                _createTextVNode(
                  _toDisplayString(_ctx.label),
                  1
                  /* TEXT */
                )
              ])
            ])
          ]),
          _createElementVNode("div", _hoisted_7, [
            _renderSlot(_ctx.$slots, "right", {}, () => [
              _createElementVNode("div", {
                class: "header-icon",
                onClick: _cache[0] || (_cache[0] = _withModifiers((...args) => _ctx.onHeaderIcon && _ctx.onHeaderIcon(...args), ["stop"]))
              }, [
                _createVNode(_component_van_icon, {
                  name: _ctx.rightIcon,
                  "class-prefix": _ctx.classPrefix
                }, null, 8, ["name", "class-prefix"]),
                _createElementVNode(
                  "div",
                  _hoisted_8,
                  _toDisplayString(_ctx.rightText),
                  1
                  /* TEXT */
                )
              ])
            ])
          ])
        ]),
        _createElementVNode(
          "div",
          {
            class: _normalizeClass(["m-list--card__content", [_ctx.contentClass, { "hide-toobar": !_ctx.isShowToolbar }]])
          },
          _toDisplayString(_ctx.content),
          3
          /* TEXT, CLASS */
        ),
        _ctx.isShowToolbar ? (_openBlock(), _createElementBlock("div", _hoisted_9, [
          _createElementVNode("div", _hoisted_10, [
            _renderSlot(_ctx.$slots, "toolbar-left", {}, () => [
              _createElementVNode(
                "span",
                _hoisted_11,
                _toDisplayString(_ctx.toolbarLeft),
                1
                /* TEXT */
              )
            ])
          ]),
          _createElementVNode(
            "div",
            {
              class: "right",
              style: _normalizeStyle(_ctx.toolbarRightStyle),
              onClick: _cache[1] || (_cache[1] = _withModifiers((...args) => _ctx.onToolbarRight && _ctx.onToolbarRight(...args), ["stop"]))
            },
            [
              _renderSlot(_ctx.$slots, "toolbar-right")
            ],
            4
            /* STYLE */
          )
        ])) : _createCommentVNode("v-if", true)
      ])
    ],
    2
    /* CLASS */
  );
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
export {
  stdin_default as default
};

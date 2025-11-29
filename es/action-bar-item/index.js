import { computed, defineComponent } from "vue";
import { makeStringProp, extend } from "../utils";
import { useRoute, routeProps } from "../composables/use-route";
import { ACTIONBAR_KEY } from "../action-bar/index";
import { useParent } from "@vant/use";
const name = "m-action-bar-item";
const actionBarIiemProps = extend({}, routeProps, {
  /** 按钮类型 'icon' | 'button' */
  type: makeStringProp("icon"),
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
const __vue_sfc__ = defineComponent({
  name,
  props: actionBarIiemProps,
  emits: ["click"],
  setup(props, { emit }) {
    const route = useRoute();
    const { parent } = useParent(ACTIONBAR_KEY);
    if (!parent) {
      if (process.env.NODE_ENV !== "production") {
        console.error(
          "[Vant] <m-action-bar> must be a child component of <m-action-bar>."
        );
      }
      return;
    }
    const prefix = computed(() => props.classPrefix || "van-icon");
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
import { renderSlot as _renderSlot, resolveComponent as _resolveComponent, createVNode as _createVNode, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, createElementVNode as _createElementVNode, normalizeClass as _normalizeClass, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, withCtx as _withCtx, Fragment as _Fragment, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "vue";
const _withScopeId = (n) => (_pushScopeId(""), n = n(), _popScopeId(), n);
const _hoisted_1 = { class: "m-action-bar-icon__text" };
function __vue_render__(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_van_icon = _resolveComponent("van-icon");
  const _component_van_button = _resolveComponent("van-button");
  return _openBlock(), _createElementBlock(
    _Fragment,
    null,
    [
      _ctx.type === "icon" ? (_openBlock(), _createElementBlock(
        "div",
        {
          key: 0,
          class: _normalizeClass(["m-action-bar-item m-action-bar-icon", [{ inline: _ctx.inline }, _ctx.mClass]]),
          onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onClick && _ctx.onClick(...args))
        },
        [
          _renderSlot(_ctx.$slots, "icon", {}, () => [
            _createVNode(_component_van_icon, {
              name: _ctx.icon,
              dot: _ctx.dot,
              color: _ctx.color,
              "class-prefix": _ctx.prefix,
              class: "m-action-bar-icon__icon"
            }, null, 8, ["name", "dot", "color", "class-prefix"])
          ]),
          _createElementVNode("span", _hoisted_1, [
            _renderSlot(_ctx.$slots, "text", {}, () => [
              _createTextVNode(
                _toDisplayString(_ctx.text),
                1
                /* TEXT */
              )
            ])
          ])
        ],
        2
        /* CLASS */
      )) : _createCommentVNode("v-if", true),
      _ctx.type === "button" ? (_openBlock(), _createElementBlock(
        "div",
        {
          key: 1,
          class: _normalizeClass(["m-action-bar-item m-action-bar-button", _ctx.mClass]),
          onClick: _cache[1] || (_cache[1] = (...args) => _ctx.onClick && _ctx.onClick(...args))
        },
        [
          _createVNode(_component_van_button, {
            type: "primary",
            disabled: _ctx.disabled,
            plain: _ctx.plain,
            color: _ctx.color,
            block: "",
            round: ""
          }, {
            default: _withCtx(() => [
              _createTextVNode(
                _toDisplayString(_ctx.text),
                1
                /* TEXT */
              )
            ]),
            _: 1
            /* STABLE */
          }, 8, ["disabled", "plain", "color"]),
          _renderSlot(_ctx.$slots, "default")
        ],
        2
        /* CLASS */
      )) : _createCommentVNode("v-if", true)
    ],
    64
    /* STABLE_FRAGMENT */
  );
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
export {
  stdin_default as default
};

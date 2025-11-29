import { ref, computed, onMounted, nextTick, defineComponent } from "vue";
import { useRect, useChildren } from "@vant/use";
import { makeNumericProp } from "../utils/index";
const name = "m-action-bar";
const ACTIONBAR_KEY = Symbol(name);
const __vue_sfc__ = defineComponent({
  name,
  props: {
    sticky: Boolean,
    container: Object,
    offsetBottom: makeNumericProp(0)
  },
  emits: [],
  setup() {
    const { linkChildren } = useChildren(ACTIONBAR_KEY);
    const offsetHeight = ref(55);
    const rootRef = ref();
    const styleObj = computed(() => {
      let style = "";
      if (offsetHeight.value > 0) {
        style = `height: ${offsetHeight.value}px;`;
      }
      return style;
    });
    onMounted(() => {
      nextTick(() => {
        setTimeout(() => {
          const rect = useRect(rootRef);
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
import { renderSlot as _renderSlot, createElementVNode as _createElementVNode, resolveComponent as _resolveComponent, withCtx as _withCtx, openBlock as _openBlock, createBlock as _createBlock, normalizeStyle as _normalizeStyle, createElementBlock as _createElementBlock, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "vue";
const _withScopeId = (n) => (_pushScopeId(""), n = n(), _popScopeId(), n);
const _hoisted_1 = { class: "m-action-bar" };
const _hoisted_2 = {
  ref: "rootRef",
  class: "m-action-bar fixed"
};
function __vue_render__(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_van_sticky = _resolveComponent("van-sticky");
  return _ctx.sticky ? (_openBlock(), _createBlock(_component_van_sticky, {
    key: 0,
    container: _ctx.container,
    position: "bottom",
    "offset-bottom": _ctx.offsetBottom
  }, {
    default: _withCtx(() => [
      _createElementVNode("div", _hoisted_1, [
        _renderSlot(_ctx.$slots, "default")
      ])
    ]),
    _: 3
    /* FORWARDED */
  }, 8, ["container", "offset-bottom"])) : (_openBlock(), _createElementBlock(
    "div",
    {
      key: 1,
      class: "m-action-bar__placeholder",
      style: _normalizeStyle(_ctx.styleObj)
    },
    [
      _createElementVNode(
        "div",
        _hoisted_2,
        [
          _renderSlot(_ctx.$slots, "default")
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
export {
  ACTIONBAR_KEY,
  stdin_default as default
};

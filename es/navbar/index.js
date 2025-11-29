import { computed, defineComponent } from "vue";
import { navbarProps } from "./props";
const name = "m-nav-bar";
const __vue_sfc__ = defineComponent({
  name,
  props: navbarProps,
  emits: ["click-left", "click-right"],
  setup(props, { emit }) {
    const isShow = computed(() => {
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
import { renderSlot as _renderSlot, resolveComponent as _resolveComponent, withCtx as _withCtx, createSlots as _createSlots, openBlock as _openBlock, createBlock as _createBlock, createCommentVNode as _createCommentVNode } from "vue";
function __vue_render__(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_van_nav_bar = _resolveComponent("van-nav-bar");
  return _ctx.isShow ? (_openBlock(), _createBlock(_component_van_nav_bar, {
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
  }, _createSlots({
    _: 2
    /* DYNAMIC */
  }, [
    _ctx.$slots.title ? {
      name: "title",
      fn: _withCtx(() => [
        _renderSlot(_ctx.$slots, "title")
      ]),
      key: "0"
    } : void 0,
    _ctx.$slots.left ? {
      name: "left",
      fn: _withCtx(() => [
        _renderSlot(_ctx.$slots, "left")
      ]),
      key: "1"
    } : void 0,
    _ctx.$slots.right ? {
      name: "right",
      fn: _withCtx(() => [
        _renderSlot(_ctx.$slots, "right")
      ]),
      key: "2"
    } : void 0
  ]), 1032, ["title", "left-text", "right-text", "left-arrow", "border", "fixed", "placeholder", "z-index", "safe-area-inset-top", "onClickLeft", "onClickRight"])) : _createCommentVNode("v-if", true);
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
export {
  stdin_default as default
};

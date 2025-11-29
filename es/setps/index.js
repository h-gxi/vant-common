import { defineComponent } from "vue";
import { useChildren } from "@vant/use";
import { stepsProps } from "./props";
const name = "m-setps";
const STEPS_KEY = Symbol(name);
const __vue_sfc__ = defineComponent({
  name,
  props: stepsProps,
  emits: ["clickStep"],
  setup(props, { emit }) {
    const { linkChildren } = useChildren(STEPS_KEY);
    const onClickStep = (index) => emit("clickStep", index);
    linkChildren({
      props,
      onClickStep
    });
    return {};
  }
});
import { renderSlot as _renderSlot, normalizeClass as _normalizeClass, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue";
function __vue_render__(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock(), _createElementBlock(
    "div",
    {
      class: _normalizeClass(["m-setps", [`m-setps--${_ctx.direction}`, _ctx.type]])
    },
    [
      _renderSlot(_ctx.$slots, "default")
    ],
    2
    /* CLASS */
  );
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
export {
  STEPS_KEY,
  stdin_default as default
};

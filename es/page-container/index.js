import { ref, defineComponent } from "vue";
import { useChildren } from "@vant/use";
const name = "m-page-container";
const PAGE_KEY = Symbol(name);
const __vue_sfc__ = defineComponent({
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
    const rootRef = ref();
    const { linkChildren } = useChildren(PAGE_KEY);
    const headerHeight = ref(0);
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
import { renderSlot as _renderSlot, normalizeStyle as _normalizeStyle, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue";
function __vue_render__(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock(), _createElementBlock(
    "div",
    {
      ref: "rootRef",
      class: "m-page-container",
      style: _normalizeStyle({ background: _ctx.background, minHeight: _ctx.minHeight })
    },
    [
      _renderSlot(_ctx.$slots, "default")
    ],
    4
    /* STYLE */
  );
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
export {
  PAGE_KEY,
  stdin_default as default
};

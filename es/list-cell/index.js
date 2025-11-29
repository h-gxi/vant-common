import { defineComponent, computed } from "vue";
import { useParent } from "@vant/use";
import { LIST_KEY } from "../list/index";
const name = "m-list-cell";
const __vue_sfc__ = defineComponent({
  name,
  props: {},
  setup() {
    const { parent, index } = useParent(LIST_KEY);
    if (!parent) {
      if (process.env.NODE_ENV !== "production") {
        console.error("[Vant] <m-list> must be a child component of <m-list>.");
      }
      return;
    }
    const item = computed(() => parent.getCellItem(index.value));
    const onClick = () => parent.onClick(item.value);
    return {
      index,
      item,
      onClick
    };
  }
});
import { renderSlot as _renderSlot, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue";
function __vue_render__(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock(), _createElementBlock("div", {
    class: "m-list--item",
    onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onClick && _ctx.onClick(...args))
  }, [
    _renderSlot(_ctx.$slots, "default", {
      item: _ctx.item,
      index: _ctx.index,
      group: _ctx.item.group
    })
  ]);
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
export {
  stdin_default as default
};

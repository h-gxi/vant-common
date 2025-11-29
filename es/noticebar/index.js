import { ref, computed, defineComponent } from "vue";
import { useParent } from "@vant/use";
import { noticebarProps } from "./props";
import { HEADER_KEY } from "../header/index";
const name = "m-noticebar";
const __vue_sfc__ = defineComponent({
  name,
  props: noticebarProps,
  emits: ["remove", "click", "update:modelValue"],
  setup(props, { emit }) {
    const { parent } = useParent(HEADER_KEY);
    const swipeItems = computed({
      get() {
        if (props.value) {
          return props.value;
        }
        return props.modelValue || [];
      },
      set(value) {
        emit("update:modelValue", value);
      }
    });
    const visible = computed(() => swipeItems.value.length > 0);
    const swipeRef = ref();
    const swipeIndex = ref(0);
    const swipeChage = (index) => {
      swipeIndex.value = index;
    };
    const onClose = () => {
      var _a;
      if (props.value) {
        emit("remove", swipeIndex.value);
      } else {
        swipeItems.value.splice(swipeIndex.value, 1);
      }
      if (swipeIndex.value > 0) {
        (_a = swipeRef.value) == null ? void 0 : _a.swipeTo(swipeIndex.value--);
      }
      if (!visible.value) {
        parent == null ? void 0 : parent.resize();
      }
    };
    const onClick = (item, index) => {
      emit("click", item, index);
    };
    return {
      visible,
      swipeRef,
      swipeItems,
      swipeChage,
      onClose,
      onClick
    };
  }
});
import { resolveComponent as _resolveComponent, createVNode as _createVNode, renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, withCtx as _withCtx, createBlock as _createBlock, vShow as _vShow, withDirectives as _withDirectives } from "vue";
function __vue_render__(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_van_icon = _resolveComponent("van-icon");
  const _component_van_swipe_item = _resolveComponent("van-swipe-item");
  const _component_van_swipe = _resolveComponent("van-swipe");
  const _component_van_notice_bar = _resolveComponent("van-notice-bar");
  return _withDirectives((_openBlock(), _createBlock(_component_van_notice_bar, {
    class: "m-noticebar",
    scrollable: _ctx.scrollable,
    color: _ctx.color,
    background: _ctx.background,
    "left-icon": _ctx.leftIcon,
    onClose: _ctx.onClose
  }, {
    "right-icon": _withCtx(() => [
      _createVNode(_component_van_icon, {
        name: "cross",
        onClick: _ctx.onClose
      }, null, 8, ["onClick"])
    ]),
    default: _withCtx(() => [
      _createVNode(_component_van_swipe, {
        ref: "swipeRef",
        vertical: "",
        class: "m-noticebar__swipe",
        autoplay: _ctx.autoplay,
        touchable: false,
        "show-indicators": false,
        onChange: _ctx.swipeChage
      }, {
        default: _withCtx(() => [
          (_openBlock(true), _createElementBlock(
            _Fragment,
            null,
            _renderList(_ctx.swipeItems, (item, index) => {
              return _openBlock(), _createBlock(_component_van_swipe_item, {
                key: index,
                onClick: ($event) => _ctx.onClick(item, index)
              }, {
                default: _withCtx(() => [
                  _createTextVNode(
                    _toDisplayString(item.title),
                    1
                    /* TEXT */
                  )
                ]),
                _: 2
                /* DYNAMIC */
              }, 1032, ["onClick"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]),
        _: 1
        /* STABLE */
      }, 8, ["autoplay", "onChange"])
    ]),
    _: 1
    /* STABLE */
  }, 8, ["scrollable", "color", "background", "left-icon", "onClose"])), [
    [_vShow, _ctx.visible]
  ]);
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
export {
  stdin_default as default
};

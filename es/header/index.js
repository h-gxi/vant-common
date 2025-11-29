import {
  ref,
  computed,
  defineComponent,
  nextTick,
  onMounted
} from "vue";
import { useChildren, useParent } from "@vant/use";
import { useRect } from "@vant/use";
import { PAGE_KEY } from "../page-container/index";
const name = "m-header";
const HEADER_KEY = Symbol(name);
const headerProps = {
  /** 指定header高度 */
  height: {
    type: [String, Number],
    default: null
  }
};
const __vue_sfc__ = defineComponent({
  name,
  props: headerProps,
  emits: ["onResize"],
  setup(props, { emit, slots }) {
    const { linkChildren } = useChildren(HEADER_KEY);
    const { parent } = useParent(PAGE_KEY);
    const offsetHeight = ref(46);
    const headerRef = ref();
    const isSlotsLoaded = computed(
      () => slots.default && slots.default().length > 0
    );
    const styleObj = computed(() => {
      let style = "";
      if (props.height) {
        if (typeof props.height === "number") {
          style = `height: ${props.height}px;`;
        } else {
          style = `height: ${props.height};`;
        }
      } else {
        if (offsetHeight.value > 0) {
          style = `height: ${offsetHeight.value}px;`;
        }
      }
      return style;
    });
    const setHeight = (val) => {
      if (parent) {
        parent.setHeight(val);
      }
    };
    const resize = () => {
      nextTick(() => {
        var _a;
        offsetHeight.value = (_a = headerRef.value) == null ? void 0 : _a.offsetHeight;
        setHeight(offsetHeight.value);
        emit("onResize", offsetHeight.value);
      });
    };
    linkChildren({
      resize
    });
    onMounted(() => {
      if (!props.height) {
        nextTick(() => {
          setTimeout(() => {
            const rect = useRect(headerRef);
            offsetHeight.value = rect.height;
            setHeight(rect.height);
          }, 50);
        });
      }
    });
    return {
      isSlotsLoaded,
      styleObj,
      headerRef,
      resize
    };
  }
});
import { renderSlot as _renderSlot, createElementVNode as _createElementVNode, normalizeStyle as _normalizeStyle, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "vue";
const _withScopeId = (n) => (_pushScopeId(""), n = n(), _popScopeId(), n);
const _hoisted_1 = {
  ref: "headerRef",
  class: "m-header--fixed"
};
function __vue_render__(_ctx, _cache, $props, $setup, $data, $options) {
  return _ctx.isSlotsLoaded ? (_openBlock(), _createElementBlock(
    "div",
    {
      key: 0,
      class: "m-header",
      style: _normalizeStyle(_ctx.styleObj)
    },
    [
      _createElementVNode(
        "div",
        _hoisted_1,
        [
          _renderSlot(_ctx.$slots, "default")
        ],
        512
        /* NEED_PATCH */
      )
    ],
    4
    /* STYLE */
  )) : _createCommentVNode("v-if", true);
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
export {
  HEADER_KEY,
  stdin_default as default
};

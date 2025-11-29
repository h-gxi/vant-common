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
var import_use = require("@vant/use");
var import_props = require("./props");
var import_header = require("../header/index");
var import_vue2 = require("vue");
const name = "m-noticebar";
const __vue_sfc__ = (0, import_vue.defineComponent)({
  name,
  props: import_props.noticebarProps,
  emits: ["remove", "click", "update:modelValue"],
  setup(props, { emit }) {
    const { parent } = (0, import_use.useParent)(import_header.HEADER_KEY);
    const swipeItems = (0, import_vue.computed)({
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
    const visible = (0, import_vue.computed)(() => swipeItems.value.length > 0);
    const swipeRef = (0, import_vue.ref)();
    const swipeIndex = (0, import_vue.ref)(0);
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
function __vue_render__(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_van_icon = (0, import_vue2.resolveComponent)("van-icon");
  const _component_van_swipe_item = (0, import_vue2.resolveComponent)("van-swipe-item");
  const _component_van_swipe = (0, import_vue2.resolveComponent)("van-swipe");
  const _component_van_notice_bar = (0, import_vue2.resolveComponent)("van-notice-bar");
  return (0, import_vue2.withDirectives)(((0, import_vue2.openBlock)(), (0, import_vue2.createBlock)(_component_van_notice_bar, {
    class: "m-noticebar",
    scrollable: _ctx.scrollable,
    color: _ctx.color,
    background: _ctx.background,
    "left-icon": _ctx.leftIcon,
    onClose: _ctx.onClose
  }, {
    "right-icon": (0, import_vue2.withCtx)(() => [
      (0, import_vue2.createVNode)(_component_van_icon, {
        name: "cross",
        onClick: _ctx.onClose
      }, null, 8, ["onClick"])
    ]),
    default: (0, import_vue2.withCtx)(() => [
      (0, import_vue2.createVNode)(_component_van_swipe, {
        ref: "swipeRef",
        vertical: "",
        class: "m-noticebar__swipe",
        autoplay: _ctx.autoplay,
        touchable: false,
        "show-indicators": false,
        onChange: _ctx.swipeChage
      }, {
        default: (0, import_vue2.withCtx)(() => [
          ((0, import_vue2.openBlock)(true), (0, import_vue2.createElementBlock)(
            import_vue2.Fragment,
            null,
            (0, import_vue2.renderList)(_ctx.swipeItems, (item, index) => {
              return (0, import_vue2.openBlock)(), (0, import_vue2.createBlock)(_component_van_swipe_item, {
                key: index,
                onClick: ($event) => _ctx.onClick(item, index)
              }, {
                default: (0, import_vue2.withCtx)(() => [
                  (0, import_vue2.createTextVNode)(
                    (0, import_vue2.toDisplayString)(item.title),
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
    [import_vue2.vShow, _ctx.visible]
  ]);
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;

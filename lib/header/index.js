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
  HEADER_KEY: () => HEADER_KEY,
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_use = require("@vant/use");
var import_use2 = require("@vant/use");
var import_page_container = require("../page-container/index");
var import_vue2 = require("vue");
const name = "m-header";
const HEADER_KEY = Symbol(name);
const headerProps = {
  /** 指定header高度 */
  height: {
    type: [String, Number],
    default: null
  }
};
const __vue_sfc__ = (0, import_vue.defineComponent)({
  name,
  props: headerProps,
  emits: ["onResize"],
  setup(props, { emit, slots }) {
    const { linkChildren } = (0, import_use.useChildren)(HEADER_KEY);
    const { parent } = (0, import_use.useParent)(import_page_container.PAGE_KEY);
    const offsetHeight = (0, import_vue.ref)(46);
    const headerRef = (0, import_vue.ref)();
    const isSlotsLoaded = (0, import_vue.computed)(
      () => slots.default && slots.default().length > 0
    );
    const styleObj = (0, import_vue.computed)(() => {
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
      (0, import_vue.nextTick)(() => {
        var _a;
        offsetHeight.value = (_a = headerRef.value) == null ? void 0 : _a.offsetHeight;
        setHeight(offsetHeight.value);
        emit("onResize", offsetHeight.value);
      });
    };
    linkChildren({
      resize
    });
    (0, import_vue.onMounted)(() => {
      if (!props.height) {
        (0, import_vue.nextTick)(() => {
          setTimeout(() => {
            const rect = (0, import_use2.useRect)(headerRef);
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
const _withScopeId = (n) => ((0, import_vue2.pushScopeId)(""), n = n(), (0, import_vue2.popScopeId)(), n);
const _hoisted_1 = {
  ref: "headerRef",
  class: "m-header--fixed"
};
function __vue_render__(_ctx, _cache, $props, $setup, $data, $options) {
  return _ctx.isSlotsLoaded ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
    "div",
    {
      key: 0,
      class: "m-header",
      style: (0, import_vue2.normalizeStyle)(_ctx.styleObj)
    },
    [
      (0, import_vue2.createElementVNode)(
        "div",
        _hoisted_1,
        [
          (0, import_vue2.renderSlot)(_ctx.$slots, "default")
        ],
        512
        /* NEED_PATCH */
      )
    ],
    4
    /* STYLE */
  )) : (0, import_vue2.createCommentVNode)("v-if", true);
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;

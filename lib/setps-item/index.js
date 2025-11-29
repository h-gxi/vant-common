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
var import_use2 = require("@vant/use");
var import_props = require("../setps/props");
var import_setps = require("../setps/index");
var import_vue2 = require("vue");
const name = "m-setps-item";
const __vue_sfc__ = (0, import_vue.defineComponent)({
  name,
  props: import_props.stepsItemProps,
  emits: [],
  setup() {
    const { parent, index } = (0, import_use.useParent)(import_setps.STEPS_KEY);
    if (!parent) {
      if (process.env.NODE_ENV !== "production") {
        console.error("[Vant] <m-setps> must be a child component of <m-setps>.");
      }
      return;
    }
    const mSetpsItemRef = (0, import_vue.ref)();
    const parentProps = parent.props;
    const size = (0, import_vue.ref)({
      width: 0,
      height: 0
    });
    (0, import_vue.onMounted)(() => {
      const rect = (0, import_use2.useRect)(mSetpsItemRef);
      size.value.width = rect.width;
      size.value.height = rect.height;
    });
    const showLine = (0, import_vue.computed)(() => {
      if (parentProps.type === "thickline") {
        return true;
      }
      return index.value + 1 < parent.children.length;
    });
    const getStatus = () => {
      const active = +parentProps.active;
      if (index.value < active) {
        return "finish";
      }
      return index.value === active ? "process" : "waiting";
    };
    const isActive = (0, import_vue.computed)(() => getStatus() === "process");
    const isFinish = (0, import_vue.computed)(() => getStatus() === "finish");
    const thickline = (0, import_vue.computed)(() => getStatus() === "process" || getStatus() === "finish");
    const isSuccess = (0, import_vue.computed)(() => {
      if (parentProps.type === "thickline") {
        return false;
      }
      return getStatus() === "finish";
    });
    const lineStyle = (0, import_vue.computed)(() => {
      const style = {
        background: isFinish.value ? parentProps.activeColor : parentProps.inactiveColor
      };
      if (parentProps.direction === "horizontal") {
        style.width = size.value.width + "px";
        style.left = size.value.width / 2 + "px";
        if (parentProps.type === "thickline") {
          style.left = 0;
          style.background = thickline.value ? parentProps.activeColor : "";
        }
      } else {
        style.height = size.value.height + "px";
      }
      return style;
    });
    const circleStyle = (0, import_vue.computed)(() => {
      if (parentProps.type === "thickline") {
        return {
          borderColor: thickline.value ? parentProps.activeColor : ""
        };
      }
      return {
        backgroundColor: getStatus() === "process" ? parentProps.activeColor : "#fff",
        borderColor: getStatus() === "finish" ? parentProps.activeColor : getStatus() === "process" ? "transparent" : parentProps.inactiveColor
      };
    });
    const circleTextStyle = (0, import_vue.computed)(() => {
      if (parentProps.type === "thickline") {
        return {
          color: thickline.value ? parentProps.activeColor : ""
        };
      }
      return "";
    });
    const contentStyle = (0, import_vue.computed)(() => {
      if (parentProps.type === "thickline") {
        return {
          color: thickline.value ? parentProps.activeTextColor || parentProps.activeColor : ""
        };
      }
      return {
        color: getStatus() === "waiting" ? parentProps.inactiveColor : parentProps.activeTextColor || parentProps.activeColor
      };
    });
    const onClickStep = () => parent.onClickStep(index.value);
    return {
      index,
      mSetpsItemRef,
      parentProps,
      showLine,
      isActive,
      isFinish,
      isSuccess,
      lineStyle,
      circleStyle,
      circleTextStyle,
      contentStyle,
      onClickStep
    };
  }
});
function __vue_render__(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_van_icon = (0, import_vue2.resolveComponent)("van-icon");
  return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
    "div",
    {
      ref: "mSetpsItemRef",
      class: (0, import_vue2.normalizeClass)(["m-setps-item", [`m-setps-item--${_ctx.parentProps.direction}`, { isActive: _ctx.isActive, isFinish: _ctx.isFinish }]]),
      onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onClickStep && _ctx.onClickStep(...args))
    },
    [
      _ctx.showLine ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
        "div",
        {
          key: 0,
          class: (0, import_vue2.normalizeClass)(["m-setps-item--line", [`m-setps-item--line--${_ctx.parentProps.direction}`]]),
          style: (0, import_vue2.normalizeStyle)([_ctx.lineStyle])
        },
        null,
        6
        /* CLASS, STYLE */
      )) : (0, import_vue2.createCommentVNode)("v-if", true),
      (0, import_vue2.createElementVNode)(
        "div",
        {
          class: (0, import_vue2.normalizeClass)(["m-setps-item--wrapper", [`m-setps-item--wrapper--${_ctx.parentProps.direction}`]])
        },
        [
          (0, import_vue2.createElementVNode)(
            "div",
            {
              class: "m-setps-item--wrapper__circle",
              style: (0, import_vue2.normalizeStyle)([_ctx.circleStyle])
            },
            [
              _ctx.isSuccess ? ((0, import_vue2.openBlock)(), (0, import_vue2.createBlock)(_component_van_icon, {
                key: 0,
                name: "success",
                color: _ctx.parentProps.activeColor,
                size: "12"
              }, null, 8, ["color"])) : ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
                "span",
                {
                  key: 1,
                  class: (0, import_vue2.normalizeClass)(["m-setps-item--wrapper__circle__text", [{ isActive: _ctx.isActive }]]),
                  style: (0, import_vue2.normalizeStyle)([_ctx.circleTextStyle])
                },
                (0, import_vue2.toDisplayString)(_ctx.index + 1),
                7
                /* TEXT, CLASS, STYLE */
              ))
            ],
            4
            /* STYLE */
          )
        ],
        2
        /* CLASS */
      ),
      (0, import_vue2.createElementVNode)(
        "div",
        {
          class: (0, import_vue2.normalizeClass)(["m-setps-item--value", [`m-setps-item--value--${_ctx.parentProps.direction}`]]),
          style: (0, import_vue2.normalizeStyle)([_ctx.contentStyle])
        },
        [
          (0, import_vue2.renderSlot)(_ctx.$slots, "default", {}, () => [
            (0, import_vue2.createElementVNode)(
              "span",
              null,
              (0, import_vue2.toDisplayString)(_ctx.title),
              1
              /* TEXT */
            )
          ])
        ],
        6
        /* CLASS, STYLE */
      )
    ],
    2
    /* CLASS */
  );
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;

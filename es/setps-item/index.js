import { ref, defineComponent, computed, onMounted } from "vue";
import { useParent } from "@vant/use";
import { useRect } from "@vant/use";
import { stepsItemProps } from "../setps/props";
import { STEPS_KEY } from "../setps/index";
const name = "m-setps-item";
const __vue_sfc__ = defineComponent({
  name,
  props: stepsItemProps,
  emits: [],
  setup() {
    const { parent, index } = useParent(STEPS_KEY);
    if (!parent) {
      if (process.env.NODE_ENV !== "production") {
        console.error("[Vant] <m-setps> must be a child component of <m-setps>.");
      }
      return;
    }
    const mSetpsItemRef = ref();
    const parentProps = parent.props;
    const size = ref({
      width: 0,
      height: 0
    });
    onMounted(() => {
      const rect = useRect(mSetpsItemRef);
      size.value.width = rect.width;
      size.value.height = rect.height;
    });
    const showLine = computed(() => {
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
    const isActive = computed(() => getStatus() === "process");
    const isFinish = computed(() => getStatus() === "finish");
    const thickline = computed(() => getStatus() === "process" || getStatus() === "finish");
    const isSuccess = computed(() => {
      if (parentProps.type === "thickline") {
        return false;
      }
      return getStatus() === "finish";
    });
    const lineStyle = computed(() => {
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
    const circleStyle = computed(() => {
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
    const circleTextStyle = computed(() => {
      if (parentProps.type === "thickline") {
        return {
          color: thickline.value ? parentProps.activeColor : ""
        };
      }
      return "";
    });
    const contentStyle = computed(() => {
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
import { normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, resolveComponent as _resolveComponent, createBlock as _createBlock, toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, renderSlot as _renderSlot } from "vue";
function __vue_render__(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_van_icon = _resolveComponent("van-icon");
  return _openBlock(), _createElementBlock(
    "div",
    {
      ref: "mSetpsItemRef",
      class: _normalizeClass(["m-setps-item", [`m-setps-item--${_ctx.parentProps.direction}`, { isActive: _ctx.isActive, isFinish: _ctx.isFinish }]]),
      onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onClickStep && _ctx.onClickStep(...args))
    },
    [
      _ctx.showLine ? (_openBlock(), _createElementBlock(
        "div",
        {
          key: 0,
          class: _normalizeClass(["m-setps-item--line", [`m-setps-item--line--${_ctx.parentProps.direction}`]]),
          style: _normalizeStyle([_ctx.lineStyle])
        },
        null,
        6
        /* CLASS, STYLE */
      )) : _createCommentVNode("v-if", true),
      _createElementVNode(
        "div",
        {
          class: _normalizeClass(["m-setps-item--wrapper", [`m-setps-item--wrapper--${_ctx.parentProps.direction}`]])
        },
        [
          _createElementVNode(
            "div",
            {
              class: "m-setps-item--wrapper__circle",
              style: _normalizeStyle([_ctx.circleStyle])
            },
            [
              _ctx.isSuccess ? (_openBlock(), _createBlock(_component_van_icon, {
                key: 0,
                name: "success",
                color: _ctx.parentProps.activeColor,
                size: "12"
              }, null, 8, ["color"])) : (_openBlock(), _createElementBlock(
                "span",
                {
                  key: 1,
                  class: _normalizeClass(["m-setps-item--wrapper__circle__text", [{ isActive: _ctx.isActive }]]),
                  style: _normalizeStyle([_ctx.circleTextStyle])
                },
                _toDisplayString(_ctx.index + 1),
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
      _createElementVNode(
        "div",
        {
          class: _normalizeClass(["m-setps-item--value", [`m-setps-item--value--${_ctx.parentProps.direction}`]]),
          style: _normalizeStyle([_ctx.contentStyle])
        },
        [
          _renderSlot(_ctx.$slots, "default", {}, () => [
            _createElementVNode(
              "span",
              null,
              _toDisplayString(_ctx.title),
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
export {
  stdin_default as default
};

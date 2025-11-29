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
  default: () => stdin_default,
  formCheckboxProps: () => formCheckboxProps
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_use = require("@vant/use");
var import_popup = require("../popup/index");
var import_vue2 = require("vue");
const name = "m-form-checkbox";
const formCheckboxProps = {
  /** 选项列表数据 */
  columns: {
    type: Array,
    default: []
  },
  /** 默认选中项 */
  defaultValue: {
    type: Array,
    default: []
  },
  /** 开启顶部工具栏 */
  toolbar: {
    type: Boolean,
    default: true
  },
  /** 顶部工具栏标题 */
  toolbarTitle: {
    type: String,
    default: ""
  }
};
const __vue_sfc__ = (0, import_vue.defineComponent)({
  name,
  props: formCheckboxProps,
  emits: ["change"],
  setup(props, { emit }) {
    const { parent } = (0, import_use.useParent)(import_popup.POPUP_KEY);
    const checkedAll = (0, import_vue.ref)(false);
    const checkedGroup = (0, import_vue.ref)([]);
    const onChage = (arr) => {
      if (arr.length === 0) {
        checkedAll.value = false;
      }
      if (arr.length === props.columns.length) {
        checkedAll.value = true;
      }
      setValue(checkedGroup.value);
      emit("change", checkedGroup.value);
    };
    const onChageAll = (checked) => {
      if (checked) {
        checkedGroup.value = props.columns.map((m) => m.value);
      } else {
        checkedGroup.value = [];
      }
    };
    const setValue = (val) => {
      if (parent) {
        parent.setValue(val);
      }
    };
    (0, import_vue.onMounted)(() => {
      (0, import_vue.nextTick)(() => {
        checkedGroup.value = props.defaultValue;
        setValue(props.defaultValue);
      });
    });
    return {
      checkedAll,
      checkedGroup,
      onChage,
      onChageAll
    };
  }
});
const _withScopeId = (n) => ((0, import_vue2.pushScopeId)(""), n = n(), (0, import_vue2.popScopeId)(), n);
const _hoisted_1 = { class: "m-form-checkbox" };
const _hoisted_2 = {
  key: 0,
  class: "m-form-checkbox-content__toolbar"
};
const _hoisted_3 = { class: "title" };
function __vue_render__(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_van_checkbox = (0, import_vue2.resolveComponent)("van-checkbox");
  const _component_van_checkbox_group = (0, import_vue2.resolveComponent)("van-checkbox-group");
  return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("div", _hoisted_1, [
    _ctx.toolbar ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("div", _hoisted_2, [
      (0, import_vue2.createElementVNode)(
        "div",
        _hoisted_3,
        (0, import_vue2.toDisplayString)(_ctx.toolbarTitle),
        1
        /* TEXT */
      ),
      (0, import_vue2.createElementVNode)("div", null, [
        (0, import_vue2.createVNode)(_component_van_checkbox, {
          modelValue: _ctx.checkedAll,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.checkedAll = $event),
          onChange: _ctx.onChageAll
        }, {
          default: (0, import_vue2.withCtx)(() => [
            (0, import_vue2.createTextVNode)("\u5168\u9009")
          ]),
          _: 1
          /* STABLE */
        }, 8, ["modelValue", "onChange"])
      ])
    ])) : (0, import_vue2.createCommentVNode)("v-if", true),
    (0, import_vue2.createVNode)(_component_van_checkbox_group, {
      modelValue: _ctx.checkedGroup,
      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.checkedGroup = $event),
      direction: "horizontal",
      onChange: _ctx.onChage
    }, {
      default: (0, import_vue2.withCtx)(() => [
        ((0, import_vue2.openBlock)(true), (0, import_vue2.createElementBlock)(
          import_vue2.Fragment,
          null,
          (0, import_vue2.renderList)(_ctx.columns, (item, i) => {
            return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
              "div",
              {
                key: i,
                class: (0, import_vue2.normalizeClass)(["m-form-checkbox-content__item", {
                  "m-form-checkbox-content__item--checked": _ctx.checkedGroup.includes(
                    item.value
                  )
                }])
              },
              [
                (0, import_vue2.createVNode)(_component_van_checkbox, {
                  name: item.value
                }, {
                  default: (0, import_vue2.withCtx)(() => [
                    (0, import_vue2.createTextVNode)(
                      (0, import_vue2.toDisplayString)(item.label),
                      1
                      /* TEXT */
                    )
                  ]),
                  _: 2
                  /* DYNAMIC */
                }, 1032, ["name"])
              ],
              2
              /* CLASS */
            );
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ]),
      _: 1
      /* STABLE */
    }, 8, ["modelValue", "onChange"])
  ]);
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;

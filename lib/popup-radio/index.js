var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  default: () => stdin_default,
  popupRadioProps: () => popupRadioProps
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_popup = __toESM(require("../popup/index"));
var import_vue2 = require("vue");
const name = "m-popup-radio";
const popupRadioProps = __spreadProps(__spreadValues({}, import_popup.popupProps), {
  /** 选项列表数据 */
  columns: {
    type: Array,
    default: []
  },
  /** 默认选中项 */
  defaultValue: {
    type: String,
    default: ""
  },
  /** 图标 */
  icon: {
    type: String,
    default: "https://unpkg.com/vant-common@0.2.0-beta.14/assets/mobile-school.png"
  }
});
const __vue_sfc__ = (0, import_vue.defineComponent)({
  name,
  components: { Popup: import_popup.default },
  props: popupRadioProps,
  emits: [],
  setup(props) {
    const popupRef = (0, import_vue.ref)();
    const checked = (0, import_vue.ref)("");
    const onChange = (name2) => {
      popupRef.value.setValue(name2);
    };
    const open = () => {
      (0, import_vue.nextTick)(() => {
        popupRef.value.open();
      });
    };
    const close = () => popupRef.value.close();
    (0, import_vue.onMounted)(() => {
      checked.value = props.defaultValue;
      popupRef.value.setValue(props.defaultValue);
    });
    return {
      popupRef,
      checked,
      onChange,
      open,
      close
    };
  }
});
const _withScopeId = (n) => ((0, import_vue2.pushScopeId)(""), n = n(), (0, import_vue2.popScopeId)(), n);
const _hoisted_1 = { class: "label" };
const _hoisted_2 = { class: "icon" };
const _hoisted_3 = { class: "value" };
function __vue_render__(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_van_radio = (0, import_vue2.resolveComponent)("van-radio");
  const _component_van_radio_group = (0, import_vue2.resolveComponent)("van-radio-group");
  const _component_Popup = (0, import_vue2.resolveComponent)("Popup");
  const _directive_lazy = (0, import_vue2.resolveDirective)("lazy");
  return (0, import_vue2.openBlock)(), (0, import_vue2.createBlock)(_component_Popup, {
    ref: "popupRef",
    title: _ctx.title,
    round: _ctx.round,
    header: _ctx.header,
    footer: _ctx.footer,
    "left-icon": _ctx.leftIcon,
    "cancel-text": _ctx.cancelText,
    "cancel-func": _ctx.cancelFunc,
    "confirm-text": _ctx.confirmText,
    "confirm-func": _ctx.confirmFunc,
    "auto-close": _ctx.autoClose
  }, {
    default: (0, import_vue2.withCtx)(() => [
      (0, import_vue2.createVNode)(_component_van_radio_group, {
        modelValue: _ctx.checked,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.checked = $event),
        onChange: _ctx.onChange
      }, {
        default: (0, import_vue2.withCtx)(() => [
          ((0, import_vue2.openBlock)(true), (0, import_vue2.createElementBlock)(
            import_vue2.Fragment,
            null,
            (0, import_vue2.renderList)(_ctx.columns, (item, i) => {
              return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("div", {
                key: i,
                class: "m-popup-radio__row"
              }, [
                (0, import_vue2.createElementVNode)("div", _hoisted_1, [
                  (0, import_vue2.withDirectives)((0, import_vue2.createElementVNode)(
                    "img",
                    _hoisted_2,
                    null,
                    512
                    /* NEED_PATCH */
                  ), [
                    [_directive_lazy, _ctx.icon]
                  ]),
                  (0, import_vue2.createElementVNode)(
                    "span",
                    {
                      class: (0, import_vue2.normalizeClass)({ "is-active": _ctx.checked === item.value })
                    },
                    (0, import_vue2.toDisplayString)(item.label),
                    3
                    /* TEXT, CLASS */
                  )
                ]),
                (0, import_vue2.createElementVNode)("div", _hoisted_3, [
                  (0, import_vue2.createVNode)(_component_van_radio, {
                    name: item.value
                  }, null, 8, ["name"])
                ])
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]),
        _: 1
        /* STABLE */
      }, 8, ["modelValue", "onChange"])
    ]),
    _: 1
    /* STABLE */
  }, 8, ["title", "round", "header", "footer", "left-icon", "cancel-text", "cancel-func", "confirm-text", "confirm-func", "auto-close"]);
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;

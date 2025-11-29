var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
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
import { ref, defineComponent, nextTick, onMounted } from "vue";
import Popup, { popupProps } from "../popup/index";
const name = "m-popup-radio";
const popupRadioProps = __spreadProps(__spreadValues({}, popupProps), {
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
const __vue_sfc__ = defineComponent({
  name,
  components: { Popup },
  props: popupRadioProps,
  emits: [],
  setup(props) {
    const popupRef = ref();
    const checked = ref("");
    const onChange = (name2) => {
      popupRef.value.setValue(name2);
    };
    const open = () => {
      nextTick(() => {
        popupRef.value.open();
      });
    };
    const close = () => popupRef.value.close();
    onMounted(() => {
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
import { renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, resolveDirective as _resolveDirective, createElementVNode as _createElementVNode, withDirectives as _withDirectives, toDisplayString as _toDisplayString, normalizeClass as _normalizeClass, resolveComponent as _resolveComponent, createVNode as _createVNode, withCtx as _withCtx, createBlock as _createBlock, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "vue";
const _withScopeId = (n) => (_pushScopeId(""), n = n(), _popScopeId(), n);
const _hoisted_1 = { class: "label" };
const _hoisted_2 = { class: "icon" };
const _hoisted_3 = { class: "value" };
function __vue_render__(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_van_radio = _resolveComponent("van-radio");
  const _component_van_radio_group = _resolveComponent("van-radio-group");
  const _component_Popup = _resolveComponent("Popup");
  const _directive_lazy = _resolveDirective("lazy");
  return _openBlock(), _createBlock(_component_Popup, {
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
    default: _withCtx(() => [
      _createVNode(_component_van_radio_group, {
        modelValue: _ctx.checked,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.checked = $event),
        onChange: _ctx.onChange
      }, {
        default: _withCtx(() => [
          (_openBlock(true), _createElementBlock(
            _Fragment,
            null,
            _renderList(_ctx.columns, (item, i) => {
              return _openBlock(), _createElementBlock("div", {
                key: i,
                class: "m-popup-radio__row"
              }, [
                _createElementVNode("div", _hoisted_1, [
                  _withDirectives(_createElementVNode(
                    "img",
                    _hoisted_2,
                    null,
                    512
                    /* NEED_PATCH */
                  ), [
                    [_directive_lazy, _ctx.icon]
                  ]),
                  _createElementVNode(
                    "span",
                    {
                      class: _normalizeClass({ "is-active": _ctx.checked === item.value })
                    },
                    _toDisplayString(item.label),
                    3
                    /* TEXT, CLASS */
                  )
                ]),
                _createElementVNode("div", _hoisted_3, [
                  _createVNode(_component_van_radio, {
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
export {
  stdin_default as default,
  popupRadioProps
};

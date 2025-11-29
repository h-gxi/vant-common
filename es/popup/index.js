import { ref, defineComponent } from "vue";
import { useChildren } from "@vant/use";
const name = "m-popup";
const POPUP_KEY = Symbol(name);
const popupProps = {
  /** 标题 */
  title: {
    type: String,
    default: ""
  },
  /** 是否显示圆角 */
  round: {
    type: Boolean,
    default: true
  },
  /** 是否显示标题栏 */
  header: {
    type: Boolean,
    default: true
  },
  /** 是否显示底部按钮 */
  footer: {
    type: Boolean,
    default: true
  },
  /** 左上角按钮 可选值 arrow-left | cross  */
  leftIcon: {
    type: String,
    default: "arrow-left"
  },
  /** 底部左侧按钮  */
  cancelText: {
    type: String,
    default: "\u53D6\u6D88"
  },
  /** 底部左侧按钮回调函数  */
  cancelFunc: {
    type: Function,
    default: null
  },
  /** 底部右侧按钮  */
  confirmText: {
    type: String,
    default: "\u786E\u8BA4"
  },
  /** 标题栏左侧按钮回调函数  */
  backFunc: {
    type: Function,
    default: null
  },
  /** 底部右侧按钮回调函数  */
  confirmFunc: {
    type: Function,
    default: null
  },
  /** 是否调用回调函数后自动关闭 */
  autoClose: {
    type: Boolean,
    default: false
  }
};
const __vue_sfc__ = defineComponent({
  name,
  props: popupProps,
  emits: [],
  setup(props) {
    const { linkChildren } = useChildren(POPUP_KEY);
    const visible = ref(false);
    const checked = ref(null);
    const setValue = (val) => {
      checked.value = val;
    };
    const onBack = () => {
      if (props.backFunc) {
        props.backFunc();
        if (props.autoClose) {
          close();
        }
      } else {
        close();
      }
    };
    const onConfirm = () => {
      if (props.confirmFunc) {
        props.confirmFunc(checked.value);
        if (props.autoClose) {
          close();
        }
      } else {
        close();
      }
    };
    const onCancel = () => {
      if (props.cancelFunc) {
        props.cancelFunc();
        if (props.autoClose) {
          close();
        }
      } else {
        close();
      }
    };
    const open = () => {
      visible.value = true;
    };
    const close = () => {
      visible.value = false;
    };
    linkChildren({
      setValue,
      open,
      close
    });
    return {
      visible,
      onBack,
      onConfirm,
      onCancel,
      setValue,
      open,
      close
    };
  }
});
import { resolveComponent as _resolveComponent, createVNode as _createVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, renderSlot as _renderSlot, withCtx as _withCtx, createBlock as _createBlock, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "vue";
const _withScopeId = (n) => (_pushScopeId(""), n = n(), _popScopeId(), n);
const _hoisted_1 = { class: "m-popup" };
const _hoisted_2 = {
  key: 0,
  class: "m-popup-header"
};
const _hoisted_3 = {
  key: 0,
  class: "left"
};
const _hoisted_4 = { class: "title" };
const _hoisted_5 = { class: "right" };
const _hoisted_6 = { class: "m-popup-content" };
const _hoisted_7 = {
  key: 1,
  class: "m-popup-footer"
};
function __vue_render__(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_van_icon = _resolveComponent("van-icon");
  const _component_van_popup = _resolveComponent("van-popup");
  return _openBlock(), _createBlock(_component_van_popup, {
    show: _ctx.visible,
    "onUpdate:show": _cache[2] || (_cache[2] = ($event) => _ctx.visible = $event),
    round: _ctx.round,
    "safe-area-inset-bottom": "",
    position: "bottom"
  }, {
    default: _withCtx(() => [
      _createElementVNode("div", _hoisted_1, [
        _ctx.header ? (_openBlock(), _createElementBlock("div", _hoisted_2, [
          _ctx.leftIcon ? (_openBlock(), _createElementBlock("div", _hoisted_3, [
            _createVNode(_component_van_icon, {
              name: _ctx.leftIcon,
              onClick: _ctx.onBack
            }, null, 8, ["name", "onClick"])
          ])) : _createCommentVNode("v-if", true),
          _createElementVNode(
            "div",
            _hoisted_4,
            _toDisplayString(_ctx.title),
            1
            /* TEXT */
          ),
          _createElementVNode("div", _hoisted_5, [
            _renderSlot(_ctx.$slots, "header-right", {}, () => [
              _createVNode(_component_van_icon, {
                name: "cross",
                onClick: _ctx.close
              }, null, 8, ["onClick"])
            ])
          ])
        ])) : _createCommentVNode("v-if", true),
        _createElementVNode("div", _hoisted_6, [
          _renderSlot(_ctx.$slots, "default")
        ]),
        _ctx.footer ? (_openBlock(), _createElementBlock("div", _hoisted_7, [
          _renderSlot(_ctx.$slots, "footer", {}, () => [
            _ctx.cancelText ? (_openBlock(), _createElementBlock(
              "div",
              {
                key: 0,
                class: "btn cancel",
                onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onCancel && _ctx.onCancel(...args))
              },
              _toDisplayString(_ctx.cancelText),
              1
              /* TEXT */
            )) : _createCommentVNode("v-if", true),
            _ctx.confirmText ? (_openBlock(), _createElementBlock(
              "div",
              {
                key: 1,
                class: "btn confirm",
                onClick: _cache[1] || (_cache[1] = (...args) => _ctx.onConfirm && _ctx.onConfirm(...args))
              },
              _toDisplayString(_ctx.confirmText),
              1
              /* TEXT */
            )) : _createCommentVNode("v-if", true)
          ])
        ])) : _createCommentVNode("v-if", true)
      ])
    ]),
    _: 3
    /* FORWARDED */
  }, 8, ["show", "round"]);
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
export {
  POPUP_KEY,
  stdin_default as default,
  popupProps
};

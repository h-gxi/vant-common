import { ref, defineComponent } from "vue";
const name = "m-action-sheet";
const actionSheetProps = {
  /** 面板选项列表 */
  actions: {
    type: Array,
    default: []
  },
  /** 标题 */
  title: {
    type: String,
    default: ""
  },
  /** 取消按钮文字 */
  cancelText: {
    type: String,
    default: ""
  },
  /** 是否显示圆角 */
  round: {
    type: Boolean,
    default: false
  },
  /** 左上角按钮图标  */
  leftIcon: {
    type: String,
    default: "arrow-left"
  },
  /** 是否在点击选项后关闭 */
  closeOnClickAction: {
    type: Boolean,
    default: false
  }
};
const __vue_sfc__ = defineComponent({
  name,
  props: actionSheetProps,
  emits: ["select", "cancel"],
  setup(props, { emit }) {
    const visible = ref(false);
    const onclick = (item, i) => {
      if (props.closeOnClickAction) {
        close();
      }
      emit("select", item, i);
    };
    const onClose = () => {
      close();
      emit("cancel");
    };
    const open = () => {
      visible.value = true;
    };
    const close = () => {
      visible.value = false;
    };
    return {
      visible,
      onclick,
      onClose,
      open,
      close
    };
  }
});
import { resolveComponent as _resolveComponent, createVNode as _createVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, renderSlot as _renderSlot, renderList as _renderList, Fragment as _Fragment, createBlock as _createBlock, createTextVNode as _createTextVNode, withCtx as _withCtx, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "vue";
const _withScopeId = (n) => (_pushScopeId(""), n = n(), _popScopeId(), n);
const _hoisted_1 = { class: "m-action-sheet" };
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
const _hoisted_6 = { class: "m-action-sheet__content" };
const _hoisted_7 = ["onClick"];
const _hoisted_8 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ _createElementVNode(
  "div",
  { class: "m-action-sheet__gap" },
  null,
  -1
  /* HOISTED */
));
const _hoisted_9 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ _createElementVNode(
  "div",
  { class: "m-action-sheet__bottom" },
  null,
  -1
  /* HOISTED */
));
function __vue_render__(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_van_icon = _resolveComponent("van-icon");
  const _component_van_popup = _resolveComponent("van-popup");
  return _openBlock(), _createElementBlock("div", _hoisted_1, [
    _createVNode(_component_van_popup, {
      show: _ctx.visible,
      "onUpdate:show": _cache[1] || (_cache[1] = ($event) => _ctx.visible = $event),
      round: _ctx.round,
      "safe-area-inset-bottom": "",
      position: "bottom"
    }, {
      default: _withCtx(() => [
        _ctx.title ? (_openBlock(), _createElementBlock("div", _hoisted_2, [
          _ctx.leftIcon ? (_openBlock(), _createElementBlock("div", _hoisted_3, [
            _createVNode(_component_van_icon, {
              name: _ctx.leftIcon,
              onClick: _ctx.onClose
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
                onClick: _ctx.onClose
              }, null, 8, ["onClick"])
            ])
          ])
        ])) : _createCommentVNode("v-if", true),
        _createElementVNode("div", _hoisted_6, [
          (_openBlock(true), _createElementBlock(
            _Fragment,
            null,
            _renderList(_ctx.actions, (item, i) => {
              return _openBlock(), _createElementBlock("button", {
                type: "button",
                class: "m-action-sheet__item",
                onClick: ($event) => _ctx.onclick(item, i)
              }, [
                item.icon ? (_openBlock(), _createBlock(_component_van_icon, {
                  key: 0,
                  name: item.icon
                }, null, 8, ["name"])) : _createCommentVNode("v-if", true),
                _createTextVNode(
                  " " + _toDisplayString(item.name),
                  1
                  /* TEXT */
                )
              ], 8, _hoisted_7);
            }),
            256
            /* UNKEYED_FRAGMENT */
          )),
          _ctx.cancelText ? (_openBlock(), _createElementBlock(
            _Fragment,
            { key: 0 },
            [
              _hoisted_8,
              _createElementVNode(
                "button",
                {
                  type: "button",
                  class: "m-action-sheet__cancel",
                  onClick: _cache[0] || (_cache[0] = ($event) => _ctx.onClose())
                },
                _toDisplayString(_ctx.cancelText),
                1
                /* TEXT */
              ),
              _hoisted_9
            ],
            64
            /* STABLE_FRAGMENT */
          )) : _createCommentVNode("v-if", true)
        ])
      ]),
      _: 3
      /* FORWARDED */
    }, 8, ["show", "round"])
  ]);
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
export {
  actionSheetProps,
  stdin_default as default
};

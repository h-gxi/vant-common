import { computed } from "vue";
import { useAddressStore } from "../address/store";
import { addressProps } from "../address/props";
const name = "m-address-select";
const __vue_sfc__ = /* @__PURE__ */ Object.assign({ name }, {
  __name: "index",
  props: addressProps,
  setup(__props, { expose: __expose }) {
    __expose();
    const addressStore = useAddressStore();
    const getImage = computed(() => addressStore.getImage);
    const checkedUsers = computed(() => {
      const nodes = Array.from(addressStore.checkedMap.values());
      return nodes.filter((m) => m.type === 1);
    });
    const onRemove = (node) => {
      addressStore.remove(node);
    };
    const __returned__ = { addressStore, name, getImage, checkedUsers, onRemove, computed, get useAddressStore() {
      return useAddressStore;
    }, get addressProps() {
      return addressProps;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
import { createElementVNode as _createElementVNode, renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, resolveDirective as _resolveDirective, withDirectives as _withDirectives, toDisplayString as _toDisplayString, resolveComponent as _resolveComponent, withCtx as _withCtx, createBlock as _createBlock, createCommentVNode as _createCommentVNode, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "vue";
const _withScopeId = (n) => (_pushScopeId(""), n = n(), _popScopeId(), n);
const _hoisted_1 = { class: "m-address" };
const _hoisted_2 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ _createElementVNode(
  "div",
  { class: "gray-divider" },
  null,
  -1
  /* HOISTED */
));
const _hoisted_3 = { class: "m-address-select-list van-safe-area-bottom" };
const _hoisted_4 = { class: "label" };
const _hoisted_5 = { class: "right" };
const _hoisted_6 = ["onClick"];
const _hoisted_7 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ _createElementVNode(
  "i",
  { class: "van-badge__wrapper van-icon van-icon-minus remove" },
  null,
  -1
  /* HOISTED */
));
const _hoisted_8 = [
  _hoisted_7
];
function __vue_render__(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_lazy_component = _resolveComponent("lazy-component");
  const _component_van_empty = _resolveComponent("van-empty");
  const _directive_lazy = _resolveDirective("lazy");
  return _openBlock(), _createElementBlock("div", _hoisted_1, [
    _hoisted_2,
    _createElementVNode("div", _hoisted_3, [
      (_openBlock(true), _createElementBlock(
        _Fragment,
        null,
        _renderList($setup.checkedUsers, (item, index) => {
          return _openBlock(), _createBlock(
            _component_lazy_component,
            {
              key: index,
              class: "m-address-cell"
            },
            {
              default: _withCtx(() => [
                _createElementVNode("div", _hoisted_4, [
                  _withDirectives(_createElementVNode(
                    "img",
                    null,
                    null,
                    512
                    /* NEED_PATCH */
                  ), [
                    [_directive_lazy, item.photo ? $setup.getImage(item.photo) : _ctx.leafIcon]
                  ]),
                  _createElementVNode(
                    "span",
                    null,
                    _toDisplayString(item.name),
                    1
                    /* TEXT */
                  )
                ]),
                _createElementVNode("div", _hoisted_5, [
                  _createElementVNode("div", {
                    class: "van-checkbox__icon van-checkbox__icon--round van-checkbox__icon--checked",
                    onClick: ($event) => $setup.onRemove(item)
                  }, [..._hoisted_8], 8, _hoisted_6)
                ])
              ]),
              _: 2
              /* DYNAMIC */
            },
            1024
            /* DYNAMIC_SLOTS */
          );
        }),
        128
        /* KEYED_FRAGMENT */
      )),
      $setup.checkedUsers.length === 0 ? (_openBlock(), _createBlock(_component_van_empty, {
        key: 0,
        image: _ctx.emptyImage,
        "image-size": _ctx.imageSize,
        description: _ctx.emptyMsg
      }, null, 8, ["image", "image-size", "description"])) : _createCommentVNode("v-if", true)
    ])
  ]);
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
export {
  stdin_default as default
};

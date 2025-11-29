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
var import_store = require("../address/store");
var import_props = require("../address/props");
var import_vue2 = require("vue");
const name = "m-address-select";
const __vue_sfc__ = /* @__PURE__ */ Object.assign({ name }, {
  __name: "index",
  props: import_props.addressProps,
  setup(__props, { expose: __expose }) {
    __expose();
    const addressStore = (0, import_store.useAddressStore)();
    const getImage = (0, import_vue.computed)(() => addressStore.getImage);
    const checkedUsers = (0, import_vue.computed)(() => {
      const nodes = Array.from(addressStore.checkedMap.values());
      return nodes.filter((m) => m.type === 1);
    });
    const onRemove = (node) => {
      addressStore.remove(node);
    };
    const __returned__ = { addressStore, name, getImage, checkedUsers, onRemove, computed: import_vue.computed, get useAddressStore() {
      return import_store.useAddressStore;
    }, get addressProps() {
      return import_props.addressProps;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _withScopeId = (n) => ((0, import_vue2.pushScopeId)(""), n = n(), (0, import_vue2.popScopeId)(), n);
const _hoisted_1 = { class: "m-address" };
const _hoisted_2 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ (0, import_vue2.createElementVNode)(
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
const _hoisted_7 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ (0, import_vue2.createElementVNode)(
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
  const _component_lazy_component = (0, import_vue2.resolveComponent)("lazy-component");
  const _component_van_empty = (0, import_vue2.resolveComponent)("van-empty");
  const _directive_lazy = (0, import_vue2.resolveDirective)("lazy");
  return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("div", _hoisted_1, [
    _hoisted_2,
    (0, import_vue2.createElementVNode)("div", _hoisted_3, [
      ((0, import_vue2.openBlock)(true), (0, import_vue2.createElementBlock)(
        import_vue2.Fragment,
        null,
        (0, import_vue2.renderList)($setup.checkedUsers, (item, index) => {
          return (0, import_vue2.openBlock)(), (0, import_vue2.createBlock)(
            _component_lazy_component,
            {
              key: index,
              class: "m-address-cell"
            },
            {
              default: (0, import_vue2.withCtx)(() => [
                (0, import_vue2.createElementVNode)("div", _hoisted_4, [
                  (0, import_vue2.withDirectives)((0, import_vue2.createElementVNode)(
                    "img",
                    null,
                    null,
                    512
                    /* NEED_PATCH */
                  ), [
                    [_directive_lazy, item.photo ? $setup.getImage(item.photo) : _ctx.leafIcon]
                  ]),
                  (0, import_vue2.createElementVNode)(
                    "span",
                    null,
                    (0, import_vue2.toDisplayString)(item.name),
                    1
                    /* TEXT */
                  )
                ]),
                (0, import_vue2.createElementVNode)("div", _hoisted_5, [
                  (0, import_vue2.createElementVNode)("div", {
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
      $setup.checkedUsers.length === 0 ? ((0, import_vue2.openBlock)(), (0, import_vue2.createBlock)(_component_van_empty, {
        key: 0,
        image: _ctx.emptyImage,
        "image-size": _ctx.imageSize,
        description: _ctx.emptyMsg
      }, null, 8, ["image", "image-size", "description"])) : (0, import_vue2.createCommentVNode)("v-if", true)
    ])
  ]);
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;

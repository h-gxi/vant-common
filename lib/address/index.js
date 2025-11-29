var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var import_lodash = __toESM(require("lodash"));
var import_vue = require("vue");
var import_store = require("./store");
var import_props = require("./props");
var import_vue2 = require("vue");
const name = "m-address";
const __vue_sfc__ = /* @__PURE__ */ Object.assign({ name }, {
  __name: "index",
  props: import_props.addressProps,
  emits: ["onSave"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const addressStore = (0, import_store.useAddressStore)();
    const emit = __emit;
    const props = __props;
    const { hideSelect, sticky, multiple, icon, leafIcon, emptyMsg, emptyImage, imageSize, filterMsg, suffixText } = props;
    const filterText = (0, import_vue.ref)("");
    const emptyText = (0, import_vue.computed)(() => {
      if (filterText.value)
        return filterMsg || "\u8BF7\u8F93\u5165\u90E8\u95E8\u540D\u79F0/\u7528\u6237\u59D3\u540D\u641C\u7D22";
      return emptyMsg || "\u6682\u65E0\u6210\u5458";
    });
    const disabled = (0, import_vue.ref)(false);
    const loading = (0, import_vue.ref)(true);
    const container = (0, import_vue.ref)(null);
    const getImage = (0, import_vue.computed)(() => addressStore.getImage);
    (0, import_vue.watch)(filterText, (val) => {
      addressStore.filter(val);
    });
    const initOptions = {
      rootTitle: "\u5168\u90E8",
      actionFunc: "",
      actionParms: {},
      getImageFunc: "",
      data: null,
      defaultCheckedKeys: []
    };
    const reload = (options) => {
      Object.assign(initOptions, options);
      addressStore.config(initOptions.rootTitle, initOptions.actionFunc, initOptions.getImageFunc);
      loading.value = true;
      addressStore.init(initOptions.actionParms, initOptions.data, initOptions.defaultCheckedKeys).then(() => {
        loading.value = false;
      });
    };
    __expose({ reload });
    const dataNode = (0, import_vue.computed)(() => addressStore.getDataNode);
    const breadcrumbNode = (0, import_vue.computed)(() => addressStore.breadcrumb);
    const checkedUsers = (0, import_vue.computed)(() => {
      const nodes = Array.from(addressStore.checkedMap.values());
      return nodes.filter((m) => m.type === 1);
    });
    const onClick = (node) => {
      addressStore.selectNode(node);
    };
    const onChangeChecked = (node) => {
      const { name: name2, checked, checkedAll } = node;
      console.log("onChangeChecked :>> ", JSON.stringify({ name: name2, checked, checkedAll }), node);
      addressStore.checked(node, multiple);
    };
    const onSave = () => {
      if (multiple) {
        emit("onSave", JSON.parse(JSON.stringify(checkedUsers.value)));
      } else {
        const first = import_lodash.default.findLast(checkedUsers.value, (m) => m.id);
        emit("onSave", first);
      }
    };
    const __returned__ = { addressStore, name, emit, props, hideSelect, sticky, multiple, icon, leafIcon, emptyMsg, emptyImage, imageSize, filterMsg, suffixText, filterText, emptyText, disabled, loading, container, getImage, initOptions, reload, dataNode, breadcrumbNode, checkedUsers, onClick, onChangeChecked, onSave, get _() {
      return import_lodash.default;
    }, ref: import_vue.ref, computed: import_vue.computed, watch: import_vue.watch, get useAddressStore() {
      return import_store.useAddressStore;
    }, get addressProps() {
      return import_props.addressProps;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _withScopeId = (n) => ((0, import_vue2.pushScopeId)(""), n = n(), (0, import_vue2.popScopeId)(), n);
const _hoisted_1 = {
  ref: "container",
  class: "m-address"
};
const _hoisted_2 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ (0, import_vue2.createElementVNode)(
  "div",
  { class: "gray-divider" },
  null,
  -1
  /* HOISTED */
));
const _hoisted_3 = { class: "m-address-breadcrumb" };
const _hoisted_4 = ["onClick"];
const _hoisted_5 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ (0, import_vue2.createElementVNode)(
  "i",
  null,
  ">",
  -1
  /* HOISTED */
));
const _hoisted_6 = {
  key: 1,
  class: "m-address-breadcrumb__label"
};
const _hoisted_7 = { class: "m-address-list" };
const _hoisted_8 = { class: "label" };
const _hoisted_9 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ (0, import_vue2.createElementVNode)(
  "div",
  { class: "right" },
  null,
  -1
  /* HOISTED */
));
const _hoisted_10 = { key: 1 };
const _hoisted_11 = ["onClick"];
const _hoisted_12 = ["onClick"];
const _hoisted_13 = {
  key: 0,
  class: "van-icon van-icon-arrow van-cell__right-icon"
};
const _hoisted_14 = { class: "m-address-action-bar" };
const _hoisted_15 = { class: "m-address-action-bar__fixed" };
const _hoisted_16 = { class: "m-address-action-bar__flex" };
const _hoisted_17 = {
  key: 0,
  class: "m-address-action-bar__select"
};
function __vue_render__(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_van_icon = (0, import_vue2.resolveComponent)("van-icon");
  const _component_van_search = (0, import_vue2.resolveComponent)("van-search");
  const _component_van_sticky = (0, import_vue2.resolveComponent)("van-sticky");
  const _component_van_checkbox = (0, import_vue2.resolveComponent)("van-checkbox");
  const _component_lazy_component = (0, import_vue2.resolveComponent)("lazy-component");
  const _component_van_loading = (0, import_vue2.resolveComponent)("van-loading");
  const _component_van_empty = (0, import_vue2.resolveComponent)("van-empty");
  const _component_router_link = (0, import_vue2.resolveComponent)("router-link");
  const _component_van_button = (0, import_vue2.resolveComponent)("van-button");
  const _directive_lazy = (0, import_vue2.resolveDirective)("lazy");
  return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
    "div",
    _hoisted_1,
    [
      (0, import_vue2.createVNode)(_component_van_sticky, {
        container: $setup.container,
        position: $setup.sticky ? "top" : "bottom"
      }, {
        default: (0, import_vue2.withCtx)(() => [
          (0, import_vue2.createVNode)(_component_van_search, {
            modelValue: $setup.filterText,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.filterText = $event),
            "show-action": $setup.filterText.length > 0,
            placeholder: "\u641C\u7D22",
            shape: "round"
          }, {
            "left-icon": (0, import_vue2.withCtx)(() => [
              (0, import_vue2.renderSlot)(_ctx.$slots, "search-icon", {}, () => [
                (0, import_vue2.createVNode)(_component_van_icon, { name: "search" })
              ])
            ]),
            _: 3
            /* FORWARDED */
          }, 8, ["modelValue", "show-action"]),
          _hoisted_2,
          (0, import_vue2.createElementVNode)("div", _hoisted_3, [
            ((0, import_vue2.openBlock)(true), (0, import_vue2.createElementBlock)(
              import_vue2.Fragment,
              null,
              (0, import_vue2.renderList)($setup.breadcrumbNode, (item, index) => {
                return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
                  import_vue2.Fragment,
                  { key: index },
                  [
                    index < $setup.breadcrumbNode.length - 1 ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("span", {
                      key: 0,
                      class: "m-address-breadcrumb__title",
                      onClick: ($event) => $setup.onClick(item)
                    }, [
                      (0, import_vue2.createTextVNode)(
                        (0, import_vue2.toDisplayString)(item.title),
                        1
                        /* TEXT */
                      ),
                      _hoisted_5
                    ], 8, _hoisted_4)) : ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
                      "span",
                      _hoisted_6,
                      (0, import_vue2.toDisplayString)(item.title),
                      1
                      /* TEXT */
                    ))
                  ],
                  64
                  /* STABLE_FRAGMENT */
                );
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ]),
        _: 3
        /* FORWARDED */
      }, 8, ["container", "position"]),
      (0, import_vue2.createElementVNode)("div", _hoisted_7, [
        ((0, import_vue2.openBlock)(true), (0, import_vue2.createElementBlock)(
          import_vue2.Fragment,
          null,
          (0, import_vue2.renderList)($setup.dataNode, (item, index) => {
            return (0, import_vue2.openBlock)(), (0, import_vue2.createBlock)(
              _component_lazy_component,
              {
                key: index,
                class: "m-address-cell"
              },
              {
                default: (0, import_vue2.withCtx)(() => [
                  item.type === 1 ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
                    import_vue2.Fragment,
                    { key: 0 },
                    [
                      (0, import_vue2.createVNode)(_component_van_checkbox, {
                        modelValue: item.checked,
                        "onUpdate:modelValue": ($event) => item.checked = $event,
                        name: item.id,
                        onClick: ($event) => $setup.onChangeChecked(item)
                      }, {
                        icon: (0, import_vue2.withCtx)(() => [
                          (0, import_vue2.createVNode)(_component_van_icon, {
                            class: (0, import_vue2.normalizeClass)({ checked: item.checked }),
                            name: "success"
                          }, null, 8, ["class"])
                        ]),
                        _: 2
                        /* DYNAMIC */
                      }, 1032, ["modelValue", "onUpdate:modelValue", "name", "onClick"]),
                      (0, import_vue2.createElementVNode)("div", _hoisted_8, [
                        (0, import_vue2.withDirectives)((0, import_vue2.createElementVNode)(
                          "img",
                          null,
                          null,
                          512
                          /* NEED_PATCH */
                        ), [
                          [_directive_lazy, item.photo ? $setup.getImage(item.photo) : $setup.leafIcon]
                        ]),
                        (0, import_vue2.createElementVNode)(
                          "span",
                          null,
                          (0, import_vue2.toDisplayString)(item.name),
                          1
                          /* TEXT */
                        )
                      ]),
                      _hoisted_9
                    ],
                    64
                    /* STABLE_FRAGMENT */
                  )) : ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
                    import_vue2.Fragment,
                    { key: 1 },
                    [
                      $setup.multiple ? ((0, import_vue2.openBlock)(), (0, import_vue2.createBlock)(_component_van_checkbox, {
                        key: 0,
                        modelValue: item.checked,
                        "onUpdate:modelValue": ($event) => item.checked = $event,
                        name: item.id,
                        onClick: ($event) => $setup.onChangeChecked(item)
                      }, {
                        icon: (0, import_vue2.withCtx)(() => [
                          (0, import_vue2.createVNode)(_component_van_icon, {
                            class: (0, import_vue2.normalizeClass)({ checked: item.checked }),
                            name: item.checkedAll ? "success" : "minus"
                          }, null, 8, ["class", "name"])
                        ]),
                        _: 2
                        /* DYNAMIC */
                      }, 1032, ["modelValue", "onUpdate:modelValue", "name", "onClick"])) : (0, import_vue2.createCommentVNode)("v-if", true),
                      $setup.icon ? (0, import_vue2.withDirectives)(((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)(
                        "img",
                        _hoisted_10,
                        null,
                        512
                        /* NEED_PATCH */
                      )), [
                        [_directive_lazy, $setup.icon]
                      ]) : (0, import_vue2.createCommentVNode)("v-if", true),
                      (0, import_vue2.createElementVNode)("div", {
                        class: "label",
                        onClick: ($event) => $setup.onClick(item)
                      }, [
                        (0, import_vue2.createElementVNode)(
                          "span",
                          null,
                          (0, import_vue2.toDisplayString)(item.name),
                          1
                          /* TEXT */
                        )
                      ], 8, _hoisted_11),
                      (0, import_vue2.createElementVNode)("div", {
                        class: "right",
                        onClick: ($event) => $setup.onClick(item)
                      }, [
                        item.breadcrumb ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("i", _hoisted_13)) : (0, import_vue2.createCommentVNode)("v-if", true)
                      ], 8, _hoisted_12)
                    ],
                    64
                    /* STABLE_FRAGMENT */
                  ))
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
        $setup.loading && $setup.dataNode.length === 0 ? ((0, import_vue2.openBlock)(), (0, import_vue2.createBlock)(_component_van_loading, {
          key: 0,
          size: "24px",
          vertical: ""
        }, {
          default: (0, import_vue2.withCtx)(() => [
            (0, import_vue2.createTextVNode)("\u52A0\u8F7D\u4E2D...")
          ]),
          _: 1
          /* STABLE */
        })) : (0, import_vue2.createCommentVNode)("v-if", true),
        !$setup.loading && $setup.dataNode.length === 0 ? ((0, import_vue2.openBlock)(), (0, import_vue2.createBlock)(_component_van_empty, {
          key: 1,
          image: $setup.emptyImage,
          "image-size": $setup.imageSize,
          description: $setup.emptyText
        }, null, 8, ["image", "image-size", "description"])) : (0, import_vue2.createCommentVNode)("v-if", true)
      ]),
      (0, import_vue2.createElementVNode)("div", _hoisted_14, [
        (0, import_vue2.createElementVNode)("div", _hoisted_15, [
          (0, import_vue2.createElementVNode)("div", _hoisted_16, [
            !$setup.hideSelect && $setup.multiple ? ((0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("div", _hoisted_17, [
              (0, import_vue2.createTextVNode)(" \u5DF2\u9009\u62E9\uFF1A "),
              (0, import_vue2.createVNode)(_component_router_link, { to: "?page=select" }, {
                default: (0, import_vue2.withCtx)(() => [
                  (0, import_vue2.createTextVNode)(
                    (0, import_vue2.toDisplayString)($setup.checkedUsers.length) + " " + (0, import_vue2.toDisplayString)($setup.suffixText) + " ",
                    1
                    /* TEXT */
                  ),
                  (0, import_vue2.createVNode)(_component_van_icon, {
                    name: "arrow-up",
                    class: "blue"
                  })
                ]),
                _: 1
                /* STABLE */
              })
            ])) : (0, import_vue2.createCommentVNode)("v-if", true),
            (0, import_vue2.createVNode)(_component_van_button, {
              type: "primary",
              disabled: $setup.disabled,
              block: "",
              round: "",
              onClick: $setup.onSave
            }, {
              default: (0, import_vue2.withCtx)(() => [
                (0, import_vue2.createTextVNode)("\u786E\u5B9A")
              ]),
              _: 1
              /* STABLE */
            }, 8, ["disabled"])
          ])
        ])
      ])
    ],
    512
    /* NEED_PATCH */
  );
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;

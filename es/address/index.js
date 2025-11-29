import _ from "lodash";
import { ref, computed, watch } from "vue";
import { useAddressStore } from "./store";
import { addressProps } from "./props";
const name = "m-address";
const __vue_sfc__ = /* @__PURE__ */ Object.assign({ name }, {
  __name: "index",
  props: addressProps,
  emits: ["onSave"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const addressStore = useAddressStore();
    const emit = __emit;
    const props = __props;
    const { hideSelect, sticky, multiple, icon, leafIcon, emptyMsg, emptyImage, imageSize, filterMsg, suffixText } = props;
    const filterText = ref("");
    const emptyText = computed(() => {
      if (filterText.value)
        return filterMsg || "\u8BF7\u8F93\u5165\u90E8\u95E8\u540D\u79F0/\u7528\u6237\u59D3\u540D\u641C\u7D22";
      return emptyMsg || "\u6682\u65E0\u6210\u5458";
    });
    const disabled = ref(false);
    const loading = ref(true);
    const container = ref(null);
    const getImage = computed(() => addressStore.getImage);
    watch(filterText, (val) => {
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
    const dataNode = computed(() => addressStore.getDataNode);
    const breadcrumbNode = computed(() => addressStore.breadcrumb);
    const checkedUsers = computed(() => {
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
        const first = _.findLast(checkedUsers.value, (m) => m.id);
        emit("onSave", first);
      }
    };
    const __returned__ = { addressStore, name, emit, props, hideSelect, sticky, multiple, icon, leafIcon, emptyMsg, emptyImage, imageSize, filterMsg, suffixText, filterText, emptyText, disabled, loading, container, getImage, initOptions, reload, dataNode, breadcrumbNode, checkedUsers, onClick, onChangeChecked, onSave, get _() {
      return _;
    }, ref, computed, watch, get useAddressStore() {
      return useAddressStore;
    }, get addressProps() {
      return addressProps;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
import { renderSlot as _renderSlot, resolveComponent as _resolveComponent, createVNode as _createVNode, withCtx as _withCtx, createElementVNode as _createElementVNode, renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, createCommentVNode as _createCommentVNode, normalizeClass as _normalizeClass, resolveDirective as _resolveDirective, withDirectives as _withDirectives, createBlock as _createBlock, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "vue";
const _withScopeId = (n) => (_pushScopeId(""), n = n(), _popScopeId(), n);
const _hoisted_1 = {
  ref: "container",
  class: "m-address"
};
const _hoisted_2 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ _createElementVNode(
  "div",
  { class: "gray-divider" },
  null,
  -1
  /* HOISTED */
));
const _hoisted_3 = { class: "m-address-breadcrumb" };
const _hoisted_4 = ["onClick"];
const _hoisted_5 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ _createElementVNode(
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
const _hoisted_9 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ _createElementVNode(
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
  const _component_van_icon = _resolveComponent("van-icon");
  const _component_van_search = _resolveComponent("van-search");
  const _component_van_sticky = _resolveComponent("van-sticky");
  const _component_van_checkbox = _resolveComponent("van-checkbox");
  const _component_lazy_component = _resolveComponent("lazy-component");
  const _component_van_loading = _resolveComponent("van-loading");
  const _component_van_empty = _resolveComponent("van-empty");
  const _component_router_link = _resolveComponent("router-link");
  const _component_van_button = _resolveComponent("van-button");
  const _directive_lazy = _resolveDirective("lazy");
  return _openBlock(), _createElementBlock(
    "div",
    _hoisted_1,
    [
      _createVNode(_component_van_sticky, {
        container: $setup.container,
        position: $setup.sticky ? "top" : "bottom"
      }, {
        default: _withCtx(() => [
          _createVNode(_component_van_search, {
            modelValue: $setup.filterText,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.filterText = $event),
            "show-action": $setup.filterText.length > 0,
            placeholder: "\u641C\u7D22",
            shape: "round"
          }, {
            "left-icon": _withCtx(() => [
              _renderSlot(_ctx.$slots, "search-icon", {}, () => [
                _createVNode(_component_van_icon, { name: "search" })
              ])
            ]),
            _: 3
            /* FORWARDED */
          }, 8, ["modelValue", "show-action"]),
          _hoisted_2,
          _createElementVNode("div", _hoisted_3, [
            (_openBlock(true), _createElementBlock(
              _Fragment,
              null,
              _renderList($setup.breadcrumbNode, (item, index) => {
                return _openBlock(), _createElementBlock(
                  _Fragment,
                  { key: index },
                  [
                    index < $setup.breadcrumbNode.length - 1 ? (_openBlock(), _createElementBlock("span", {
                      key: 0,
                      class: "m-address-breadcrumb__title",
                      onClick: ($event) => $setup.onClick(item)
                    }, [
                      _createTextVNode(
                        _toDisplayString(item.title),
                        1
                        /* TEXT */
                      ),
                      _hoisted_5
                    ], 8, _hoisted_4)) : (_openBlock(), _createElementBlock(
                      "span",
                      _hoisted_6,
                      _toDisplayString(item.title),
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
      _createElementVNode("div", _hoisted_7, [
        (_openBlock(true), _createElementBlock(
          _Fragment,
          null,
          _renderList($setup.dataNode, (item, index) => {
            return _openBlock(), _createBlock(
              _component_lazy_component,
              {
                key: index,
                class: "m-address-cell"
              },
              {
                default: _withCtx(() => [
                  item.type === 1 ? (_openBlock(), _createElementBlock(
                    _Fragment,
                    { key: 0 },
                    [
                      _createVNode(_component_van_checkbox, {
                        modelValue: item.checked,
                        "onUpdate:modelValue": ($event) => item.checked = $event,
                        name: item.id,
                        onClick: ($event) => $setup.onChangeChecked(item)
                      }, {
                        icon: _withCtx(() => [
                          _createVNode(_component_van_icon, {
                            class: _normalizeClass({ checked: item.checked }),
                            name: "success"
                          }, null, 8, ["class"])
                        ]),
                        _: 2
                        /* DYNAMIC */
                      }, 1032, ["modelValue", "onUpdate:modelValue", "name", "onClick"]),
                      _createElementVNode("div", _hoisted_8, [
                        _withDirectives(_createElementVNode(
                          "img",
                          null,
                          null,
                          512
                          /* NEED_PATCH */
                        ), [
                          [_directive_lazy, item.photo ? $setup.getImage(item.photo) : $setup.leafIcon]
                        ]),
                        _createElementVNode(
                          "span",
                          null,
                          _toDisplayString(item.name),
                          1
                          /* TEXT */
                        )
                      ]),
                      _hoisted_9
                    ],
                    64
                    /* STABLE_FRAGMENT */
                  )) : (_openBlock(), _createElementBlock(
                    _Fragment,
                    { key: 1 },
                    [
                      $setup.multiple ? (_openBlock(), _createBlock(_component_van_checkbox, {
                        key: 0,
                        modelValue: item.checked,
                        "onUpdate:modelValue": ($event) => item.checked = $event,
                        name: item.id,
                        onClick: ($event) => $setup.onChangeChecked(item)
                      }, {
                        icon: _withCtx(() => [
                          _createVNode(_component_van_icon, {
                            class: _normalizeClass({ checked: item.checked }),
                            name: item.checkedAll ? "success" : "minus"
                          }, null, 8, ["class", "name"])
                        ]),
                        _: 2
                        /* DYNAMIC */
                      }, 1032, ["modelValue", "onUpdate:modelValue", "name", "onClick"])) : _createCommentVNode("v-if", true),
                      $setup.icon ? _withDirectives((_openBlock(), _createElementBlock(
                        "img",
                        _hoisted_10,
                        null,
                        512
                        /* NEED_PATCH */
                      )), [
                        [_directive_lazy, $setup.icon]
                      ]) : _createCommentVNode("v-if", true),
                      _createElementVNode("div", {
                        class: "label",
                        onClick: ($event) => $setup.onClick(item)
                      }, [
                        _createElementVNode(
                          "span",
                          null,
                          _toDisplayString(item.name),
                          1
                          /* TEXT */
                        )
                      ], 8, _hoisted_11),
                      _createElementVNode("div", {
                        class: "right",
                        onClick: ($event) => $setup.onClick(item)
                      }, [
                        item.breadcrumb ? (_openBlock(), _createElementBlock("i", _hoisted_13)) : _createCommentVNode("v-if", true)
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
        $setup.loading && $setup.dataNode.length === 0 ? (_openBlock(), _createBlock(_component_van_loading, {
          key: 0,
          size: "24px",
          vertical: ""
        }, {
          default: _withCtx(() => [
            _createTextVNode("\u52A0\u8F7D\u4E2D...")
          ]),
          _: 1
          /* STABLE */
        })) : _createCommentVNode("v-if", true),
        !$setup.loading && $setup.dataNode.length === 0 ? (_openBlock(), _createBlock(_component_van_empty, {
          key: 1,
          image: $setup.emptyImage,
          "image-size": $setup.imageSize,
          description: $setup.emptyText
        }, null, 8, ["image", "image-size", "description"])) : _createCommentVNode("v-if", true)
      ]),
      _createElementVNode("div", _hoisted_14, [
        _createElementVNode("div", _hoisted_15, [
          _createElementVNode("div", _hoisted_16, [
            !$setup.hideSelect && $setup.multiple ? (_openBlock(), _createElementBlock("div", _hoisted_17, [
              _createTextVNode(" \u5DF2\u9009\u62E9\uFF1A "),
              _createVNode(_component_router_link, { to: "?page=select" }, {
                default: _withCtx(() => [
                  _createTextVNode(
                    _toDisplayString($setup.checkedUsers.length) + " " + _toDisplayString($setup.suffixText) + " ",
                    1
                    /* TEXT */
                  ),
                  _createVNode(_component_van_icon, {
                    name: "arrow-up",
                    class: "blue"
                  })
                ]),
                _: 1
                /* STABLE */
              })
            ])) : _createCommentVNode("v-if", true),
            _createVNode(_component_van_button, {
              type: "primary",
              disabled: $setup.disabled,
              block: "",
              round: "",
              onClick: $setup.onSave
            }, {
              default: _withCtx(() => [
                _createTextVNode("\u786E\u5B9A")
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
export {
  stdin_default as default
};

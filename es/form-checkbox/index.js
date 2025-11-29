import { ref, defineComponent, nextTick, onMounted } from "vue";
import { useParent } from "@vant/use";
import { POPUP_KEY } from "../popup/index";
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
const __vue_sfc__ = defineComponent({
  name,
  props: formCheckboxProps,
  emits: ["change"],
  setup(props, { emit }) {
    const { parent } = useParent(POPUP_KEY);
    const checkedAll = ref(false);
    const checkedGroup = ref([]);
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
    onMounted(() => {
      nextTick(() => {
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
import { toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, createTextVNode as _createTextVNode, resolveComponent as _resolveComponent, withCtx as _withCtx, createVNode as _createVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, renderList as _renderList, Fragment as _Fragment, normalizeClass as _normalizeClass, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "vue";
const _withScopeId = (n) => (_pushScopeId(""), n = n(), _popScopeId(), n);
const _hoisted_1 = { class: "m-form-checkbox" };
const _hoisted_2 = {
  key: 0,
  class: "m-form-checkbox-content__toolbar"
};
const _hoisted_3 = { class: "title" };
function __vue_render__(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_van_checkbox = _resolveComponent("van-checkbox");
  const _component_van_checkbox_group = _resolveComponent("van-checkbox-group");
  return _openBlock(), _createElementBlock("div", _hoisted_1, [
    _ctx.toolbar ? (_openBlock(), _createElementBlock("div", _hoisted_2, [
      _createElementVNode(
        "div",
        _hoisted_3,
        _toDisplayString(_ctx.toolbarTitle),
        1
        /* TEXT */
      ),
      _createElementVNode("div", null, [
        _createVNode(_component_van_checkbox, {
          modelValue: _ctx.checkedAll,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.checkedAll = $event),
          onChange: _ctx.onChageAll
        }, {
          default: _withCtx(() => [
            _createTextVNode("\u5168\u9009")
          ]),
          _: 1
          /* STABLE */
        }, 8, ["modelValue", "onChange"])
      ])
    ])) : _createCommentVNode("v-if", true),
    _createVNode(_component_van_checkbox_group, {
      modelValue: _ctx.checkedGroup,
      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.checkedGroup = $event),
      direction: "horizontal",
      onChange: _ctx.onChage
    }, {
      default: _withCtx(() => [
        (_openBlock(true), _createElementBlock(
          _Fragment,
          null,
          _renderList(_ctx.columns, (item, i) => {
            return _openBlock(), _createElementBlock(
              "div",
              {
                key: i,
                class: _normalizeClass(["m-form-checkbox-content__item", {
                  "m-form-checkbox-content__item--checked": _ctx.checkedGroup.includes(
                    item.value
                  )
                }])
              },
              [
                _createVNode(_component_van_checkbox, {
                  name: item.value
                }, {
                  default: _withCtx(() => [
                    _createTextVNode(
                      _toDisplayString(item.label),
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
export {
  stdin_default as default,
  formCheckboxProps
};

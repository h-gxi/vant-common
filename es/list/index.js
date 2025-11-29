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
import {
  ref,
  reactive,
  toRefs,
  computed,
  watch,
  defineComponent
} from "vue";
import { useChildren, useParent } from "@vant/use";
import { listProps } from "./props";
import { PAGE_KEY } from "../page-container/index";
const name = "m-list";
const LIST_KEY = Symbol(name);
const __vue_sfc__ = defineComponent({
  name,
  props: listProps,
  emits: ["click"],
  setup(props, { emit }) {
    const { linkChildren } = useChildren(LIST_KEY);
    const { parent } = useParent(PAGE_KEY);
    const loading = ref(false);
    const errorCount = ref(0);
    const offsetTop = ref(0);
    if (parent) {
      watch(parent.headerHeight, (value) => {
        offsetTop.value = value;
      });
    }
    const state = reactive({
      finished: false,
      refreshing: false,
      pageIndex: 1,
      list: []
    });
    const finishedText = computed(() => {
      if (formatList.value.length === 0 && state.finished) {
        return props.emptyText;
      }
      return props.nomoreText;
    });
    const showImage = computed(() => {
      if (props.image && finishedText.value === props.emptyText) {
        return true;
      }
      return false;
    });
    const formatList = computed(() => {
      let _list = state.list;
      if (props.filter) {
        _list = props.filter(_list);
      }
      if (props.formatter) {
        _list = props.formatter(_list);
      }
      if (props.groupBy) {
        const groupArr = _list.reduce((result, currentItem) => {
          const groupKey = typeof props.groupBy === "function" ? props.groupBy(currentItem) : currentItem[props.groupBy];
          if (!result[groupKey]) {
            result[groupKey] = [];
            currentItem["group"] = groupKey;
          }
          result[groupKey].push(currentItem);
          return result;
        }, {});
        _list = Object.values(groupArr).reduce((acc, curr) => {
          return acc.concat(curr);
        }, []);
      }
      return _list;
    });
    const onLoad = () => {
      if (props.queryMethod && errorCount.value < 3) {
        const queryParams = Object.assign({}, props.queryModel);
        queryParams["pageIndex"] = state.pageIndex;
        queryParams["pageSize"] = props.pageSize;
        props.queryMethod(queryParams).then((res) => {
          console.log("res :>> ", res);
          state.pageIndex++;
          if (res.total === 0) {
            state.finished = true;
          }
          if (res.item) {
            if (res.item.length < props.pageSize) {
              state.finished = true;
            }
            state.list.push(...res.item);
          }
        }).catch(() => {
          errorCount.value++;
        }).finally(() => {
          loading.value = false;
          state.refreshing = false;
        });
      }
    };
    const onRefresh = () => {
      state.list = [];
      state.pageIndex = 1;
      state.finished = false;
      loading.value = true;
      onLoad();
    };
    watch(
      () => props.queryModel,
      () => {
        onRefresh();
      }
    );
    const onClick = (item) => emit("click", item);
    const getCellItem = (index) => {
      return formatList.value[index];
    };
    linkChildren({
      props,
      onClick,
      getCellItem
    });
    return __spreadProps(__spreadValues({
      loading,
      offsetTop,
      finishedText,
      showImage,
      formatList
    }, toRefs(state)), {
      onRefresh,
      onLoad
    });
  }
});
import { renderSlot as _renderSlot, resolveComponent as _resolveComponent, withCtx as _withCtx, createVNode as _createVNode, createElementVNode as _createElementVNode, renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, createBlock as _createBlock, createCommentVNode as _createCommentVNode, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "vue";
const _withScopeId = (n) => (_pushScopeId(""), n = n(), _popScopeId(), n);
const _hoisted_1 = { class: "m-list-header" };
function __vue_render__(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_van_sticky = _resolveComponent("van-sticky");
  const _component_van_empty = _resolveComponent("van-empty");
  const _component_van_list = _resolveComponent("van-list");
  const _component_van_pull_refresh = _resolveComponent("van-pull-refresh");
  return _openBlock(), _createBlock(_component_van_pull_refresh, {
    modelValue: _ctx.refreshing,
    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.refreshing = $event),
    onRefresh: _ctx.onRefresh,
    "pulling-text": _ctx.pullingText,
    "loosing-text": _ctx.loosingText,
    "loading-text": _ctx.loadingText,
    "success-text": _ctx.successText,
    "success-duration": _ctx.successDuration,
    disabled: _ctx.disabled
  }, {
    default: _withCtx(() => [
      _createElementVNode("div", _hoisted_1, [
        _createVNode(_component_van_sticky, { "offset-top": _ctx.offsetTop }, {
          default: _withCtx(() => [
            _renderSlot(_ctx.$slots, "sticky-header")
          ]),
          _: 3
          /* FORWARDED */
        }, 8, ["offset-top"]),
        _renderSlot(_ctx.$slots, "header")
      ]),
      _createVNode(_component_van_list, {
        class: "m-list",
        loading: _ctx.loading,
        "onUpdate:loading": _cache[0] || (_cache[0] = ($event) => _ctx.loading = $event),
        finished: _ctx.finished,
        offset: _ctx.offset,
        "finished-text": _ctx.finishedText,
        "loading-text": _ctx.loadingText,
        onLoad: _ctx.onLoad
      }, {
        default: _withCtx(() => [
          (_openBlock(true), _createElementBlock(
            _Fragment,
            null,
            _renderList(_ctx.formatList, (item, index) => {
              return _renderSlot(_ctx.$slots, "default", { key: index });
            }),
            128
            /* KEYED_FRAGMENT */
          )),
          _ctx.showImage ? (_openBlock(), _createBlock(_component_van_empty, {
            key: 0,
            image: _ctx.image,
            "image-size": _ctx.imageSize
          }, null, 8, ["image", "image-size"])) : _createCommentVNode("v-if", true)
        ]),
        _: 3
        /* FORWARDED */
      }, 8, ["loading", "finished", "offset", "finished-text", "loading-text", "onLoad"])
    ]),
    _: 3
    /* FORWARDED */
  }, 8, ["modelValue", "onRefresh", "pulling-text", "loosing-text", "loading-text", "success-text", "success-duration", "disabled"]);
}
__vue_sfc__.render = __vue_render__;
var stdin_default = __vue_sfc__;
export {
  LIST_KEY,
  stdin_default as default
};

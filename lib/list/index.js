var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
  LIST_KEY: () => LIST_KEY,
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_use = require("@vant/use");
var import_props = require("./props");
var import_page_container = require("../page-container/index");
var import_vue2 = require("vue");
const name = "m-list";
const LIST_KEY = Symbol(name);
const __vue_sfc__ = (0, import_vue.defineComponent)({
  name,
  props: import_props.listProps,
  emits: ["click"],
  setup(props, { emit }) {
    const { linkChildren } = (0, import_use.useChildren)(LIST_KEY);
    const { parent } = (0, import_use.useParent)(import_page_container.PAGE_KEY);
    const loading = (0, import_vue.ref)(false);
    const errorCount = (0, import_vue.ref)(0);
    const offsetTop = (0, import_vue.ref)(0);
    if (parent) {
      (0, import_vue.watch)(parent.headerHeight, (value) => {
        offsetTop.value = value;
      });
    }
    const state = (0, import_vue.reactive)({
      finished: false,
      refreshing: false,
      pageIndex: 1,
      list: []
    });
    const finishedText = (0, import_vue.computed)(() => {
      if (formatList.value.length === 0 && state.finished) {
        return props.emptyText;
      }
      return props.nomoreText;
    });
    const showImage = (0, import_vue.computed)(() => {
      if (props.image && finishedText.value === props.emptyText) {
        return true;
      }
      return false;
    });
    const formatList = (0, import_vue.computed)(() => {
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
    (0, import_vue.watch)(
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
    }, (0, import_vue.toRefs)(state)), {
      onRefresh,
      onLoad
    });
  }
});
const _withScopeId = (n) => ((0, import_vue2.pushScopeId)(""), n = n(), (0, import_vue2.popScopeId)(), n);
const _hoisted_1 = { class: "m-list-header" };
function __vue_render__(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_van_sticky = (0, import_vue2.resolveComponent)("van-sticky");
  const _component_van_empty = (0, import_vue2.resolveComponent)("van-empty");
  const _component_van_list = (0, import_vue2.resolveComponent)("van-list");
  const _component_van_pull_refresh = (0, import_vue2.resolveComponent)("van-pull-refresh");
  return (0, import_vue2.openBlock)(), (0, import_vue2.createBlock)(_component_van_pull_refresh, {
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
    default: (0, import_vue2.withCtx)(() => [
      (0, import_vue2.createElementVNode)("div", _hoisted_1, [
        (0, import_vue2.createVNode)(_component_van_sticky, { "offset-top": _ctx.offsetTop }, {
          default: (0, import_vue2.withCtx)(() => [
            (0, import_vue2.renderSlot)(_ctx.$slots, "sticky-header")
          ]),
          _: 3
          /* FORWARDED */
        }, 8, ["offset-top"]),
        (0, import_vue2.renderSlot)(_ctx.$slots, "header")
      ]),
      (0, import_vue2.createVNode)(_component_van_list, {
        class: "m-list",
        loading: _ctx.loading,
        "onUpdate:loading": _cache[0] || (_cache[0] = ($event) => _ctx.loading = $event),
        finished: _ctx.finished,
        offset: _ctx.offset,
        "finished-text": _ctx.finishedText,
        "loading-text": _ctx.loadingText,
        onLoad: _ctx.onLoad
      }, {
        default: (0, import_vue2.withCtx)(() => [
          ((0, import_vue2.openBlock)(true), (0, import_vue2.createElementBlock)(
            import_vue2.Fragment,
            null,
            (0, import_vue2.renderList)(_ctx.formatList, (item, index) => {
              return (0, import_vue2.renderSlot)(_ctx.$slots, "default", { key: index });
            }),
            128
            /* KEYED_FRAGMENT */
          )),
          _ctx.showImage ? ((0, import_vue2.openBlock)(), (0, import_vue2.createBlock)(_component_van_empty, {
            key: 0,
            image: _ctx.image,
            "image-size": _ctx.imageSize
          }, null, 8, ["image", "image-size"])) : (0, import_vue2.createCommentVNode)("v-if", true)
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

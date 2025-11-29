"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
const vue = require("vue");
const use = require("@vant/use");
const extend = Object.assign;
var isVue2 = false;
function set(target, key, val) {
  if (Array.isArray(target)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val;
  }
  target[key] = val;
  return val;
}
function del(target, key) {
  if (Array.isArray(target)) {
    target.splice(key, 1);
    return;
  }
  delete target[key];
}
/*!
 * pinia v2.1.7
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */
let activePinia;
const setActivePinia = (pinia) => activePinia = pinia;
const piniaSymbol = process.env.NODE_ENV !== "production" ? Symbol("pinia") : (
  /* istanbul ignore next */
  Symbol()
);
function isPlainObject(o) {
  return o && typeof o === "object" && Object.prototype.toString.call(o) === "[object Object]" && typeof o.toJSON !== "function";
}
var MutationType;
(function(MutationType2) {
  MutationType2["direct"] = "direct";
  MutationType2["patchObject"] = "patch object";
  MutationType2["patchFunction"] = "patch function";
})(MutationType || (MutationType = {}));
const IS_CLIENT = typeof window !== "undefined";
const USE_DEVTOOLS = (process.env.NODE_ENV !== "production" || typeof __VUE_PROD_DEVTOOLS__ !== "undefined" && __VUE_PROD_DEVTOOLS__) && !(process.env.NODE_ENV === "test") && IS_CLIENT;
function patchObject(newState, oldState) {
  for (const key in oldState) {
    const subPatch = oldState[key];
    if (!(key in newState)) {
      continue;
    }
    const targetValue = newState[key];
    if (isPlainObject(targetValue) && isPlainObject(subPatch) && !vue.isRef(subPatch) && !vue.isReactive(subPatch)) {
      newState[key] = patchObject(targetValue, subPatch);
    } else {
      {
        newState[key] = subPatch;
      }
    }
  }
  return newState;
}
const noop = () => {
};
function addSubscription(subscriptions, callback, detached, onCleanup = noop) {
  subscriptions.push(callback);
  const removeSubscription = () => {
    const idx = subscriptions.indexOf(callback);
    if (idx > -1) {
      subscriptions.splice(idx, 1);
      onCleanup();
    }
  };
  if (!detached && vue.getCurrentScope()) {
    vue.onScopeDispose(removeSubscription);
  }
  return removeSubscription;
}
function triggerSubscriptions(subscriptions, ...args) {
  subscriptions.slice().forEach((callback) => {
    callback(...args);
  });
}
const fallbackRunWithContext = (fn) => fn();
function mergeReactiveObjects(target, patchToApply) {
  if (target instanceof Map && patchToApply instanceof Map) {
    patchToApply.forEach((value, key) => target.set(key, value));
  }
  if (target instanceof Set && patchToApply instanceof Set) {
    patchToApply.forEach(target.add, target);
  }
  for (const key in patchToApply) {
    if (!patchToApply.hasOwnProperty(key))
      continue;
    const subPatch = patchToApply[key];
    const targetValue = target[key];
    if (isPlainObject(targetValue) && isPlainObject(subPatch) && target.hasOwnProperty(key) && !vue.isRef(subPatch) && !vue.isReactive(subPatch)) {
      target[key] = mergeReactiveObjects(targetValue, subPatch);
    } else {
      target[key] = subPatch;
    }
  }
  return target;
}
const skipHydrateSymbol = process.env.NODE_ENV !== "production" ? Symbol("pinia:skipHydration") : (
  /* istanbul ignore next */
  Symbol()
);
function shouldHydrate(obj) {
  return !isPlainObject(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
}
const { assign } = Object;
function isComputed(o) {
  return !!(vue.isRef(o) && o.effect);
}
function createOptionsStore(id, options, pinia, hot) {
  const { state, actions, getters } = options;
  const initialState = pinia.state.value[id];
  let store;
  function setup() {
    if (!initialState && (!(process.env.NODE_ENV !== "production") || !hot)) {
      {
        pinia.state.value[id] = state ? state() : {};
      }
    }
    const localState = process.env.NODE_ENV !== "production" && hot ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      vue.toRefs(vue.ref(state ? state() : {}).value)
    ) : vue.toRefs(pinia.state.value[id]);
    return assign(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name2) => {
      if (process.env.NODE_ENV !== "production" && name2 in localState) {
        console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${name2}" in store "${id}".`);
      }
      computedGetters[name2] = vue.markRaw(vue.computed(() => {
        setActivePinia(pinia);
        const store2 = pinia._s.get(id);
        return getters[name2].call(store2, store2);
      }));
      return computedGetters;
    }, {}));
  }
  store = createSetupStore(id, setup, options, pinia, hot, true);
  return store;
}
function createSetupStore($id, setup, options = {}, pinia, hot, isOptionsStore) {
  let scope;
  const optionsForPlugin = assign({ actions: {} }, options);
  if (process.env.NODE_ENV !== "production" && !pinia._e.active) {
    throw new Error("Pinia destroyed");
  }
  const $subscribeOptions = {
    deep: true
    // flush: 'post',
  };
  if (process.env.NODE_ENV !== "production" && !isVue2) {
    $subscribeOptions.onTrigger = (event) => {
      if (isListening) {
        debuggerEvents = event;
      } else if (isListening == false && !store._hotUpdating) {
        if (Array.isArray(debuggerEvents)) {
          debuggerEvents.push(event);
        } else {
          console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug.");
        }
      }
    };
  }
  let isListening;
  let isSyncListening;
  let subscriptions = [];
  let actionSubscriptions = [];
  let debuggerEvents;
  const initialState = pinia.state.value[$id];
  if (!isOptionsStore && !initialState && (!(process.env.NODE_ENV !== "production") || !hot)) {
    {
      pinia.state.value[$id] = {};
    }
  }
  const hotState = vue.ref({});
  let activeListener;
  function $patch(partialStateOrMutator) {
    let subscriptionMutation;
    isListening = isSyncListening = false;
    if (process.env.NODE_ENV !== "production") {
      debuggerEvents = [];
    }
    if (typeof partialStateOrMutator === "function") {
      partialStateOrMutator(pinia.state.value[$id]);
      subscriptionMutation = {
        type: MutationType.patchFunction,
        storeId: $id,
        events: debuggerEvents
      };
    } else {
      mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
      subscriptionMutation = {
        type: MutationType.patchObject,
        payload: partialStateOrMutator,
        storeId: $id,
        events: debuggerEvents
      };
    }
    const myListenerId = activeListener = Symbol();
    vue.nextTick().then(() => {
      if (activeListener === myListenerId) {
        isListening = true;
      }
    });
    isSyncListening = true;
    triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
  }
  const $reset = isOptionsStore ? function $reset2() {
    const { state } = options;
    const newState = state ? state() : {};
    this.$patch(($state) => {
      assign($state, newState);
    });
  } : (
    /* istanbul ignore next */
    process.env.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${$id}" is built using the setup syntax and does not implement $reset().`);
    } : noop
  );
  function $dispose() {
    scope.stop();
    subscriptions = [];
    actionSubscriptions = [];
    pinia._s.delete($id);
  }
  function wrapAction(name2, action) {
    return function() {
      setActivePinia(pinia);
      const args = Array.from(arguments);
      const afterCallbackList = [];
      const onErrorCallbackList = [];
      function after(callback) {
        afterCallbackList.push(callback);
      }
      function onError(callback) {
        onErrorCallbackList.push(callback);
      }
      triggerSubscriptions(actionSubscriptions, {
        args,
        name: name2,
        store,
        after,
        onError
      });
      let ret;
      try {
        ret = action.apply(this && this.$id === $id ? this : store, args);
      } catch (error) {
        triggerSubscriptions(onErrorCallbackList, error);
        throw error;
      }
      if (ret instanceof Promise) {
        return ret.then((value) => {
          triggerSubscriptions(afterCallbackList, value);
          return value;
        }).catch((error) => {
          triggerSubscriptions(onErrorCallbackList, error);
          return Promise.reject(error);
        });
      }
      triggerSubscriptions(afterCallbackList, ret);
      return ret;
    };
  }
  const _hmrPayload = /* @__PURE__ */ vue.markRaw({
    actions: {},
    getters: {},
    state: [],
    hotState
  });
  const partialStore = {
    _p: pinia,
    // _s: scope,
    $id,
    $onAction: addSubscription.bind(null, actionSubscriptions),
    $patch,
    $reset,
    $subscribe(callback, options2 = {}) {
      const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher());
      const stopWatcher = scope.run(() => vue.watch(() => pinia.state.value[$id], (state) => {
        if (options2.flush === "sync" ? isSyncListening : isListening) {
          callback({
            storeId: $id,
            type: MutationType.direct,
            events: debuggerEvents
          }, state);
        }
      }, assign({}, $subscribeOptions, options2)));
      return removeSubscription;
    },
    $dispose
  };
  const store = vue.reactive(process.env.NODE_ENV !== "production" || USE_DEVTOOLS ? assign(
    {
      _hmrPayload,
      _customProperties: vue.markRaw(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    partialStore
    // must be added later
    // setupStore
  ) : partialStore);
  pinia._s.set($id, store);
  const runWithContext = pinia._a && pinia._a.runWithContext || fallbackRunWithContext;
  const setupStore = runWithContext(() => pinia._e.run(() => (scope = vue.effectScope()).run(setup)));
  for (const key in setupStore) {
    const prop = setupStore[key];
    if (vue.isRef(prop) && !isComputed(prop) || vue.isReactive(prop)) {
      if (process.env.NODE_ENV !== "production" && hot) {
        set(hotState.value, key, vue.toRef(setupStore, key));
      } else if (!isOptionsStore) {
        if (initialState && shouldHydrate(prop)) {
          if (vue.isRef(prop)) {
            prop.value = initialState[key];
          } else {
            mergeReactiveObjects(prop, initialState[key]);
          }
        }
        {
          pinia.state.value[$id][key] = prop;
        }
      }
      if (process.env.NODE_ENV !== "production") {
        _hmrPayload.state.push(key);
      }
    } else if (typeof prop === "function") {
      const actionValue = process.env.NODE_ENV !== "production" && hot ? prop : wrapAction(key, prop);
      {
        setupStore[key] = actionValue;
      }
      if (process.env.NODE_ENV !== "production") {
        _hmrPayload.actions[key] = prop;
      }
      optionsForPlugin.actions[key] = prop;
    } else if (process.env.NODE_ENV !== "production") {
      if (isComputed(prop)) {
        _hmrPayload.getters[key] = isOptionsStore ? (
          // @ts-expect-error
          options.getters[key]
        ) : prop;
        if (IS_CLIENT) {
          const getters = setupStore._getters || // @ts-expect-error: same
          (setupStore._getters = vue.markRaw([]));
          getters.push(key);
        }
      }
    }
  }
  {
    assign(store, setupStore);
    assign(vue.toRaw(store), setupStore);
  }
  Object.defineProperty(store, "$state", {
    get: () => process.env.NODE_ENV !== "production" && hot ? hotState.value : pinia.state.value[$id],
    set: (state) => {
      if (process.env.NODE_ENV !== "production" && hot) {
        throw new Error("cannot set hotState");
      }
      $patch(($state) => {
        assign($state, state);
      });
    }
  });
  if (process.env.NODE_ENV !== "production") {
    store._hotUpdate = vue.markRaw((newStore) => {
      store._hotUpdating = true;
      newStore._hmrPayload.state.forEach((stateKey) => {
        if (stateKey in store.$state) {
          const newStateTarget = newStore.$state[stateKey];
          const oldStateSource = store.$state[stateKey];
          if (typeof newStateTarget === "object" && isPlainObject(newStateTarget) && isPlainObject(oldStateSource)) {
            patchObject(newStateTarget, oldStateSource);
          } else {
            newStore.$state[stateKey] = oldStateSource;
          }
        }
        set(store, stateKey, vue.toRef(newStore.$state, stateKey));
      });
      Object.keys(store.$state).forEach((stateKey) => {
        if (!(stateKey in newStore.$state)) {
          del(store, stateKey);
        }
      });
      isListening = false;
      isSyncListening = false;
      pinia.state.value[$id] = vue.toRef(newStore._hmrPayload, "hotState");
      isSyncListening = true;
      vue.nextTick().then(() => {
        isListening = true;
      });
      for (const actionName in newStore._hmrPayload.actions) {
        const action = newStore[actionName];
        set(store, actionName, wrapAction(actionName, action));
      }
      for (const getterName in newStore._hmrPayload.getters) {
        const getter = newStore._hmrPayload.getters[getterName];
        const getterValue = isOptionsStore ? (
          // special handling of options api
          vue.computed(() => {
            setActivePinia(pinia);
            return getter.call(store, store);
          })
        ) : getter;
        set(store, getterName, getterValue);
      }
      Object.keys(store._hmrPayload.getters).forEach((key) => {
        if (!(key in newStore._hmrPayload.getters)) {
          del(store, key);
        }
      });
      Object.keys(store._hmrPayload.actions).forEach((key) => {
        if (!(key in newStore._hmrPayload.actions)) {
          del(store, key);
        }
      });
      store._hmrPayload = newStore._hmrPayload;
      store._getters = newStore._getters;
      store._hotUpdating = false;
    });
  }
  if (USE_DEVTOOLS) {
    const nonEnumerable = {
      writable: true,
      configurable: true,
      // avoid warning on devtools trying to display this property
      enumerable: false
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((p) => {
      Object.defineProperty(store, p, assign({ value: store[p] }, nonEnumerable));
    });
  }
  pinia._p.forEach((extender) => {
    if (USE_DEVTOOLS) {
      const extensions = scope.run(() => extender({
        store,
        app: pinia._a,
        pinia,
        options: optionsForPlugin
      }));
      Object.keys(extensions || {}).forEach((key) => store._customProperties.add(key));
      assign(store, extensions);
    } else {
      assign(store, scope.run(() => extender({
        store,
        app: pinia._a,
        pinia,
        options: optionsForPlugin
      })));
    }
  });
  if (process.env.NODE_ENV !== "production" && store.$state && typeof store.$state === "object" && typeof store.$state.constructor === "function" && !store.$state.constructor.toString().includes("[native code]")) {
    console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${store.$id}".`);
  }
  if (initialState && isOptionsStore && options.hydrate) {
    options.hydrate(store.$state, initialState);
  }
  isListening = true;
  isSyncListening = true;
  return store;
}
function defineStore(idOrOptions, setup, setupOptions) {
  let id;
  let options;
  const isSetupStore = typeof setup === "function";
  {
    id = idOrOptions;
    options = isSetupStore ? setupOptions : setup;
  }
  function useStore(pinia, hot) {
    const hasContext = vue.hasInjectionContext();
    pinia = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (process.env.NODE_ENV === "test" && activePinia && activePinia._testing ? null : pinia) || (hasContext ? vue.inject(piniaSymbol, null) : null);
    if (pinia)
      setActivePinia(pinia);
    if (process.env.NODE_ENV !== "production" && !activePinia) {
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    }
    pinia = activePinia;
    if (!pinia._s.has(id)) {
      if (isSetupStore) {
        createSetupStore(id, setup, options, pinia);
      } else {
        createOptionsStore(id, options, pinia);
      }
      if (process.env.NODE_ENV !== "production") {
        useStore._pinia = pinia;
      }
    }
    const store = pinia._s.get(id);
    if (process.env.NODE_ENV !== "production" && hot) {
      const hotId = "__hot:" + id;
      const newStore = isSetupStore ? createSetupStore(hotId, setup, options, pinia, true) : createOptionsStore(hotId, assign({}, options), pinia, true);
      hot._hotUpdate(newStore);
      delete pinia.state.value[hotId];
      pinia._s.delete(hotId);
    }
    if (process.env.NODE_ENV !== "production" && IS_CLIENT) {
      const currentInstance = vue.getCurrentInstance();
      if (currentInstance && currentInstance.proxy && // avoid adding stores that are just built for hot module replacement
      !hot) {
        const vm = currentInstance.proxy;
        const cache = "_pStores" in vm ? vm._pStores : vm._pStores = {};
        cache[id] = store;
      }
    }
    return store;
  }
  useStore.$id = id;
  return useStore;
}
const numericProp = [Number, String];
const makeNumericProp = (defaultVal) => ({
  type: numericProp,
  default: defaultVal
});
const makeStringProp = (defaultVal) => ({
  type: String,
  default: defaultVal
});
const name$i = "m-action-bar";
const ACTIONBAR_KEY = Symbol(name$i);
const __vue_sfc__$i = vue.defineComponent({
  name: name$i,
  props: {
    sticky: Boolean,
    container: Object,
    offsetBottom: makeNumericProp(0)
  },
  emits: [],
  setup() {
    const { linkChildren } = use.useChildren(ACTIONBAR_KEY);
    const offsetHeight = vue.ref(55);
    const rootRef = vue.ref();
    const styleObj = vue.computed(() => {
      let style = "";
      if (offsetHeight.value > 0) {
        style = `height: ${offsetHeight.value}px;`;
      }
      return style;
    });
    vue.onMounted(() => {
      vue.nextTick(() => {
        setTimeout(() => {
          const rect = use.useRect(rootRef);
          offsetHeight.value = rect.height;
        }, 50);
      });
    });
    linkChildren();
    return {
      rootRef,
      styleObj
    };
  }
});
const _hoisted_1$c = { class: "m-action-bar" };
const _hoisted_2$8 = {
  ref: "rootRef",
  class: "m-action-bar fixed"
};
function __vue_render__$i(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_van_sticky = vue.resolveComponent("van-sticky");
  return _ctx.sticky ? (vue.openBlock(), vue.createBlock(_component_van_sticky, {
    key: 0,
    container: _ctx.container,
    position: "bottom",
    "offset-bottom": _ctx.offsetBottom
  }, {
    default: vue.withCtx(() => [
      vue.createElementVNode("div", _hoisted_1$c, [
        vue.renderSlot(_ctx.$slots, "default")
      ])
    ]),
    _: 3
    /* FORWARDED */
  }, 8, ["container", "offset-bottom"])) : (vue.openBlock(), vue.createElementBlock(
    "div",
    {
      key: 1,
      class: "m-action-bar__placeholder",
      style: vue.normalizeStyle(_ctx.styleObj)
    },
    [
      vue.createElementVNode(
        "div",
        _hoisted_2$8,
        [
          vue.renderSlot(_ctx.$slots, "default")
        ],
        512
        /* NEED_PATCH */
      )
    ],
    4
    /* STYLE */
  ));
}
__vue_sfc__$i.render = __vue_render__$i;
var stdin_default$j = __vue_sfc__$i;
const routeProps = {
  to: [String, Object],
  url: String,
  replace: Boolean
};
function route({
  to,
  url,
  replace,
  $router: router
}) {
  if (to && router) {
    router[replace ? "replace" : "push"](to);
  } else if (url) {
    replace ? location.replace(url) : location.href = url;
  }
}
function useRoute() {
  const vm = vue.getCurrentInstance().proxy;
  return () => route(vm);
}
const name$h = "m-action-bar-item";
const actionBarIiemProps = extend({}, routeProps, {
  /** 按钮类型 'icon' | 'button' */
  type: makeStringProp("icon"),
  /** 图标 */
  icon: String,
  /** 类名前缀，用于使用自定义图标 */
  classPrefix: String,
  /** 是否显示图标右上角小红点 */
  dot: Boolean,
  /** 按钮文字 */
  text: String,
  /** 是否禁用按钮 */
  disabled: Boolean,
  /** 朴素按钮 */
  plain: Boolean,
  /** 行内元素 */
  inline: Boolean,
  /** 按钮颜色，支持传入 linear-gradient 渐变色 */
  color: String,
  /** 按钮样式 */
  mClass: null
});
const __vue_sfc__$h = vue.defineComponent({
  name: name$h,
  props: actionBarIiemProps,
  emits: ["click"],
  setup(props, { emit }) {
    const route2 = useRoute();
    const { parent } = use.useParent(ACTIONBAR_KEY);
    if (!parent) {
      if (process.env.NODE_ENV !== "production") {
        console.error(
          "[Vant] <m-action-bar> must be a child component of <m-action-bar>."
        );
      }
      return;
    }
    const prefix = vue.computed(() => props.classPrefix || "van-icon");
    const onClick = (event) => {
      emit("click", event);
      route2();
    };
    return {
      prefix,
      onClick
    };
  }
});
const _hoisted_1$b = { class: "m-action-bar-icon__text" };
function __vue_render__$h(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_van_icon = vue.resolveComponent("van-icon");
  const _component_van_button = vue.resolveComponent("van-button");
  return vue.openBlock(), vue.createElementBlock(
    vue.Fragment,
    null,
    [
      _ctx.type === "icon" ? (vue.openBlock(), vue.createElementBlock(
        "div",
        {
          key: 0,
          class: vue.normalizeClass(["m-action-bar-item m-action-bar-icon", [{ inline: _ctx.inline }, _ctx.mClass]]),
          onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onClick && _ctx.onClick(...args))
        },
        [
          vue.renderSlot(_ctx.$slots, "icon", {}, () => [
            vue.createVNode(_component_van_icon, {
              name: _ctx.icon,
              dot: _ctx.dot,
              color: _ctx.color,
              "class-prefix": _ctx.prefix,
              class: "m-action-bar-icon__icon"
            }, null, 8, ["name", "dot", "color", "class-prefix"])
          ]),
          vue.createElementVNode("span", _hoisted_1$b, [
            vue.renderSlot(_ctx.$slots, "text", {}, () => [
              vue.createTextVNode(
                vue.toDisplayString(_ctx.text),
                1
                /* TEXT */
              )
            ])
          ])
        ],
        2
        /* CLASS */
      )) : vue.createCommentVNode("v-if", true),
      _ctx.type === "button" ? (vue.openBlock(), vue.createElementBlock(
        "div",
        {
          key: 1,
          class: vue.normalizeClass(["m-action-bar-item m-action-bar-button", _ctx.mClass]),
          onClick: _cache[1] || (_cache[1] = (...args) => _ctx.onClick && _ctx.onClick(...args))
        },
        [
          vue.createVNode(_component_van_button, {
            type: "primary",
            disabled: _ctx.disabled,
            plain: _ctx.plain,
            color: _ctx.color,
            block: "",
            round: ""
          }, {
            default: vue.withCtx(() => [
              vue.createTextVNode(
                vue.toDisplayString(_ctx.text),
                1
                /* TEXT */
              )
            ]),
            _: 1
            /* STABLE */
          }, 8, ["disabled", "plain", "color"]),
          vue.renderSlot(_ctx.$slots, "default")
        ],
        2
        /* CLASS */
      )) : vue.createCommentVNode("v-if", true)
    ],
    64
    /* STABLE_FRAGMENT */
  );
}
__vue_sfc__$h.render = __vue_render__$h;
var stdin_default$i = __vue_sfc__$h;
const name$g = "m-action-sheet";
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
const __vue_sfc__$g = vue.defineComponent({
  name: name$g,
  props: actionSheetProps,
  emits: ["select", "cancel"],
  setup(props, { emit }) {
    const visible = vue.ref(false);
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
const _withScopeId$3 = (n) => (vue.pushScopeId(""), n = n(), vue.popScopeId(), n);
const _hoisted_1$a = { class: "m-action-sheet" };
const _hoisted_2$7 = {
  key: 0,
  class: "m-popup-header"
};
const _hoisted_3$7 = {
  key: 0,
  class: "left"
};
const _hoisted_4$5 = { class: "title" };
const _hoisted_5$4 = { class: "right" };
const _hoisted_6$4 = { class: "m-action-sheet__content" };
const _hoisted_7$4 = ["onClick"];
const _hoisted_8$3 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ vue.createElementVNode(
  "div",
  { class: "m-action-sheet__gap" },
  null,
  -1
  /* HOISTED */
));
const _hoisted_9$2 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ vue.createElementVNode(
  "div",
  { class: "m-action-sheet__bottom" },
  null,
  -1
  /* HOISTED */
));
function __vue_render__$g(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_van_icon = vue.resolveComponent("van-icon");
  const _component_van_popup = vue.resolveComponent("van-popup");
  return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$a, [
    vue.createVNode(_component_van_popup, {
      show: _ctx.visible,
      "onUpdate:show": _cache[1] || (_cache[1] = ($event) => _ctx.visible = $event),
      round: _ctx.round,
      "safe-area-inset-bottom": "",
      position: "bottom"
    }, {
      default: vue.withCtx(() => [
        _ctx.title ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2$7, [
          _ctx.leftIcon ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_3$7, [
            vue.createVNode(_component_van_icon, {
              name: _ctx.leftIcon,
              onClick: _ctx.onClose
            }, null, 8, ["name", "onClick"])
          ])) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode(
            "div",
            _hoisted_4$5,
            vue.toDisplayString(_ctx.title),
            1
            /* TEXT */
          ),
          vue.createElementVNode("div", _hoisted_5$4, [
            vue.renderSlot(_ctx.$slots, "header-right", {}, () => [
              vue.createVNode(_component_van_icon, {
                name: "cross",
                onClick: _ctx.onClose
              }, null, 8, ["onClick"])
            ])
          ])
        ])) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode("div", _hoisted_6$4, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList(_ctx.actions, (item, i) => {
              return vue.openBlock(), vue.createElementBlock("button", {
                type: "button",
                class: "m-action-sheet__item",
                onClick: ($event) => _ctx.onclick(item, i)
              }, [
                item.icon ? (vue.openBlock(), vue.createBlock(_component_van_icon, {
                  key: 0,
                  name: item.icon
                }, null, 8, ["name"])) : vue.createCommentVNode("v-if", true),
                vue.createTextVNode(
                  " " + vue.toDisplayString(item.name),
                  1
                  /* TEXT */
                )
              ], 8, _hoisted_7$4);
            }),
            256
            /* UNKEYED_FRAGMENT */
          )),
          _ctx.cancelText ? (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            { key: 0 },
            [
              _hoisted_8$3,
              vue.createElementVNode(
                "button",
                {
                  type: "button",
                  class: "m-action-sheet__cancel",
                  onClick: _cache[0] || (_cache[0] = ($event) => _ctx.onClose())
                },
                vue.toDisplayString(_ctx.cancelText),
                1
                /* TEXT */
              ),
              _hoisted_9$2
            ],
            64
            /* STABLE_FRAGMENT */
          )) : vue.createCommentVNode("v-if", true)
        ])
      ]),
      _: 3
      /* FORWARDED */
    }, 8, ["show", "round"])
  ]);
}
__vue_sfc__$g.render = __vue_render__$g;
var stdin_default$h = __vue_sfc__$g;
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var lodash = { exports: {} };
/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
lodash.exports;
(function(module2, exports2) {
  (function() {
    var undefined$1;
    var VERSION = "4.17.21";
    var LARGE_ARRAY_SIZE = 200;
    var CORE_ERROR_TEXT = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", FUNC_ERROR_TEXT = "Expected a function", INVALID_TEMPL_VAR_ERROR_TEXT = "Invalid `variable` option passed into `_.template`";
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    var MAX_MEMOIZE_SIZE = 500;
    var PLACEHOLDER = "__lodash_placeholder__";
    var CLONE_DEEP_FLAG = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG = 4;
    var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
    var WRAP_BIND_FLAG = 1, WRAP_BIND_KEY_FLAG = 2, WRAP_CURRY_BOUND_FLAG = 4, WRAP_CURRY_FLAG = 8, WRAP_CURRY_RIGHT_FLAG = 16, WRAP_PARTIAL_FLAG = 32, WRAP_PARTIAL_RIGHT_FLAG = 64, WRAP_ARY_FLAG = 128, WRAP_REARG_FLAG = 256, WRAP_FLIP_FLAG = 512;
    var DEFAULT_TRUNC_LENGTH = 30, DEFAULT_TRUNC_OMISSION = "...";
    var HOT_COUNT = 800, HOT_SPAN = 16;
    var LAZY_FILTER_FLAG = 1, LAZY_MAP_FLAG = 2, LAZY_WHILE_FLAG = 3;
    var INFINITY = 1 / 0, MAX_SAFE_INTEGER = 9007199254740991, MAX_INTEGER = 17976931348623157e292, NAN = 0 / 0;
    var MAX_ARRAY_LENGTH = 4294967295, MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1, HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;
    var wrapFlags = [
      ["ary", WRAP_ARY_FLAG],
      ["bind", WRAP_BIND_FLAG],
      ["bindKey", WRAP_BIND_KEY_FLAG],
      ["curry", WRAP_CURRY_FLAG],
      ["curryRight", WRAP_CURRY_RIGHT_FLAG],
      ["flip", WRAP_FLIP_FLAG],
      ["partial", WRAP_PARTIAL_FLAG],
      ["partialRight", WRAP_PARTIAL_RIGHT_FLAG],
      ["rearg", WRAP_REARG_FLAG]
    ];
    var argsTag = "[object Arguments]", arrayTag = "[object Array]", asyncTag = "[object AsyncFunction]", boolTag = "[object Boolean]", dateTag = "[object Date]", domExcTag = "[object DOMException]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", nullTag = "[object Null]", objectTag = "[object Object]", promiseTag = "[object Promise]", proxyTag = "[object Proxy]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", undefinedTag = "[object Undefined]", weakMapTag = "[object WeakMap]", weakSetTag = "[object WeakSet]";
    var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
    var reEmptyStringLeading = /\b__p \+= '';/g, reEmptyStringMiddle = /\b(__p \+=) '' \+/g, reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
    var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g, reUnescapedHtml = /[&<>"']/g, reHasEscapedHtml = RegExp(reEscapedHtml.source), reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
    var reEscape = /<%-([\s\S]+?)%>/g, reEvaluate = /<%([\s\S]+?)%>/g, reInterpolate = /<%=([\s\S]+?)%>/g;
    var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/, rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g, reHasRegExpChar = RegExp(reRegExpChar.source);
    var reTrimStart = /^\s+/;
    var reWhitespace = /\s/;
    var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/, reSplitDetails = /,? & /;
    var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
    var reForbiddenIdentifierChars = /[()=,{}\[\]\/\s]/;
    var reEscapeChar = /\\(\\)?/g;
    var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
    var reFlags = /\w*$/;
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
    var reIsBinary = /^0b[01]+$/i;
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    var reIsOctal = /^0o[0-7]+$/i;
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
    var reNoMatch = /($^)/;
    var reUnescapedString = /['\n\r\u2028\u2029\\]/g;
    var rsAstralRange = "\\ud800-\\udfff", rsComboMarksRange = "\\u0300-\\u036f", reComboHalfMarksRange = "\\ufe20-\\ufe2f", rsComboSymbolsRange = "\\u20d0-\\u20ff", rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange, rsDingbatRange = "\\u2700-\\u27bf", rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff", rsMathOpRange = "\\xac\\xb1\\xd7\\xf7", rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", rsPunctuationRange = "\\u2000-\\u206f", rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde", rsVarRange = "\\ufe0e\\ufe0f", rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
    var rsApos = "['’]", rsAstral = "[" + rsAstralRange + "]", rsBreak = "[" + rsBreakRange + "]", rsCombo = "[" + rsComboRange + "]", rsDigits = "\\d+", rsDingbat = "[" + rsDingbatRange + "]", rsLower = "[" + rsLowerRange + "]", rsMisc = "[^" + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + "]", rsFitz = "\\ud83c[\\udffb-\\udfff]", rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")", rsNonAstral = "[^" + rsAstralRange + "]", rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsUpper = "[" + rsUpperRange + "]", rsZWJ = "\\u200d";
    var rsMiscLower = "(?:" + rsLower + "|" + rsMisc + ")", rsMiscUpper = "(?:" + rsUpper + "|" + rsMisc + ")", rsOptContrLower = "(?:" + rsApos + "(?:d|ll|m|re|s|t|ve))?", rsOptContrUpper = "(?:" + rsApos + "(?:D|LL|M|RE|S|T|VE))?", reOptMod = rsModifier + "?", rsOptVar = "[" + rsVarRange + "]?", rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*", rsOrdLower = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", rsOrdUpper = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", rsSeq = rsOptVar + reOptMod + rsOptJoin, rsEmoji = "(?:" + [rsDingbat, rsRegional, rsSurrPair].join("|") + ")" + rsSeq, rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")";
    var reApos = RegExp(rsApos, "g");
    var reComboMark = RegExp(rsCombo, "g");
    var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
    var reUnicodeWord = RegExp([
      rsUpper + "?" + rsLower + "+" + rsOptContrLower + "(?=" + [rsBreak, rsUpper, "$"].join("|") + ")",
      rsMiscUpper + "+" + rsOptContrUpper + "(?=" + [rsBreak, rsUpper + rsMiscLower, "$"].join("|") + ")",
      rsUpper + "?" + rsMiscLower + "+" + rsOptContrLower,
      rsUpper + "+" + rsOptContrUpper,
      rsOrdUpper,
      rsOrdLower,
      rsDigits,
      rsEmoji
    ].join("|"), "g");
    var reHasUnicode = RegExp("[" + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + "]");
    var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
    var contextProps = [
      "Array",
      "Buffer",
      "DataView",
      "Date",
      "Error",
      "Float32Array",
      "Float64Array",
      "Function",
      "Int8Array",
      "Int16Array",
      "Int32Array",
      "Map",
      "Math",
      "Object",
      "Promise",
      "RegExp",
      "Set",
      "String",
      "Symbol",
      "TypeError",
      "Uint8Array",
      "Uint8ClampedArray",
      "Uint16Array",
      "Uint32Array",
      "WeakMap",
      "_",
      "clearTimeout",
      "isFinite",
      "parseInt",
      "setTimeout"
    ];
    var templateCounter = -1;
    var typedArrayTags = {};
    typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
    typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
    var cloneableTags = {};
    cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
    cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
    var deburredLetters = {
      // Latin-1 Supplement block.
      "À": "A",
      "Á": "A",
      "Â": "A",
      "Ã": "A",
      "Ä": "A",
      "Å": "A",
      "à": "a",
      "á": "a",
      "â": "a",
      "ã": "a",
      "ä": "a",
      "å": "a",
      "Ç": "C",
      "ç": "c",
      "Ð": "D",
      "ð": "d",
      "È": "E",
      "É": "E",
      "Ê": "E",
      "Ë": "E",
      "è": "e",
      "é": "e",
      "ê": "e",
      "ë": "e",
      "Ì": "I",
      "Í": "I",
      "Î": "I",
      "Ï": "I",
      "ì": "i",
      "í": "i",
      "î": "i",
      "ï": "i",
      "Ñ": "N",
      "ñ": "n",
      "Ò": "O",
      "Ó": "O",
      "Ô": "O",
      "Õ": "O",
      "Ö": "O",
      "Ø": "O",
      "ò": "o",
      "ó": "o",
      "ô": "o",
      "õ": "o",
      "ö": "o",
      "ø": "o",
      "Ù": "U",
      "Ú": "U",
      "Û": "U",
      "Ü": "U",
      "ù": "u",
      "ú": "u",
      "û": "u",
      "ü": "u",
      "Ý": "Y",
      "ý": "y",
      "ÿ": "y",
      "Æ": "Ae",
      "æ": "ae",
      "Þ": "Th",
      "þ": "th",
      "ß": "ss",
      // Latin Extended-A block.
      "Ā": "A",
      "Ă": "A",
      "Ą": "A",
      "ā": "a",
      "ă": "a",
      "ą": "a",
      "Ć": "C",
      "Ĉ": "C",
      "Ċ": "C",
      "Č": "C",
      "ć": "c",
      "ĉ": "c",
      "ċ": "c",
      "č": "c",
      "Ď": "D",
      "Đ": "D",
      "ď": "d",
      "đ": "d",
      "Ē": "E",
      "Ĕ": "E",
      "Ė": "E",
      "Ę": "E",
      "Ě": "E",
      "ē": "e",
      "ĕ": "e",
      "ė": "e",
      "ę": "e",
      "ě": "e",
      "Ĝ": "G",
      "Ğ": "G",
      "Ġ": "G",
      "Ģ": "G",
      "ĝ": "g",
      "ğ": "g",
      "ġ": "g",
      "ģ": "g",
      "Ĥ": "H",
      "Ħ": "H",
      "ĥ": "h",
      "ħ": "h",
      "Ĩ": "I",
      "Ī": "I",
      "Ĭ": "I",
      "Į": "I",
      "İ": "I",
      "ĩ": "i",
      "ī": "i",
      "ĭ": "i",
      "į": "i",
      "ı": "i",
      "Ĵ": "J",
      "ĵ": "j",
      "Ķ": "K",
      "ķ": "k",
      "ĸ": "k",
      "Ĺ": "L",
      "Ļ": "L",
      "Ľ": "L",
      "Ŀ": "L",
      "Ł": "L",
      "ĺ": "l",
      "ļ": "l",
      "ľ": "l",
      "ŀ": "l",
      "ł": "l",
      "Ń": "N",
      "Ņ": "N",
      "Ň": "N",
      "Ŋ": "N",
      "ń": "n",
      "ņ": "n",
      "ň": "n",
      "ŋ": "n",
      "Ō": "O",
      "Ŏ": "O",
      "Ő": "O",
      "ō": "o",
      "ŏ": "o",
      "ő": "o",
      "Ŕ": "R",
      "Ŗ": "R",
      "Ř": "R",
      "ŕ": "r",
      "ŗ": "r",
      "ř": "r",
      "Ś": "S",
      "Ŝ": "S",
      "Ş": "S",
      "Š": "S",
      "ś": "s",
      "ŝ": "s",
      "ş": "s",
      "š": "s",
      "Ţ": "T",
      "Ť": "T",
      "Ŧ": "T",
      "ţ": "t",
      "ť": "t",
      "ŧ": "t",
      "Ũ": "U",
      "Ū": "U",
      "Ŭ": "U",
      "Ů": "U",
      "Ű": "U",
      "Ų": "U",
      "ũ": "u",
      "ū": "u",
      "ŭ": "u",
      "ů": "u",
      "ű": "u",
      "ų": "u",
      "Ŵ": "W",
      "ŵ": "w",
      "Ŷ": "Y",
      "ŷ": "y",
      "Ÿ": "Y",
      "Ź": "Z",
      "Ż": "Z",
      "Ž": "Z",
      "ź": "z",
      "ż": "z",
      "ž": "z",
      "Ĳ": "IJ",
      "ĳ": "ij",
      "Œ": "Oe",
      "œ": "oe",
      "ŉ": "'n",
      "ſ": "s"
    };
    var htmlEscapes = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };
    var htmlUnescapes = {
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": '"',
      "&#39;": "'"
    };
    var stringEscapes = {
      "\\": "\\",
      "'": "'",
      "\n": "n",
      "\r": "r",
      "\u2028": "u2028",
      "\u2029": "u2029"
    };
    var freeParseFloat = parseFloat, freeParseInt = parseInt;
    var freeGlobal = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    var freeExports = exports2 && !exports2.nodeType && exports2;
    var freeModule = freeExports && true && module2 && !module2.nodeType && module2;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var freeProcess = moduleExports && freeGlobal.process;
    var nodeUtil = function() {
      try {
        var types = freeModule && freeModule.require && freeModule.require("util").types;
        if (types) {
          return types;
        }
        return freeProcess && freeProcess.binding && freeProcess.binding("util");
      } catch (e) {
      }
    }();
    var nodeIsArrayBuffer = nodeUtil && nodeUtil.isArrayBuffer, nodeIsDate = nodeUtil && nodeUtil.isDate, nodeIsMap = nodeUtil && nodeUtil.isMap, nodeIsRegExp = nodeUtil && nodeUtil.isRegExp, nodeIsSet = nodeUtil && nodeUtil.isSet, nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
    function apply(func, thisArg, args) {
      switch (args.length) {
        case 0:
          return func.call(thisArg);
        case 1:
          return func.call(thisArg, args[0]);
        case 2:
          return func.call(thisArg, args[0], args[1]);
        case 3:
          return func.call(thisArg, args[0], args[1], args[2]);
      }
      return func.apply(thisArg, args);
    }
    function arrayAggregator(array, setter, iteratee, accumulator) {
      var index = -1, length = array == null ? 0 : array.length;
      while (++index < length) {
        var value = array[index];
        setter(accumulator, value, iteratee(value), array);
      }
      return accumulator;
    }
    function arrayEach(array, iteratee) {
      var index = -1, length = array == null ? 0 : array.length;
      while (++index < length) {
        if (iteratee(array[index], index, array) === false) {
          break;
        }
      }
      return array;
    }
    function arrayEachRight(array, iteratee) {
      var length = array == null ? 0 : array.length;
      while (length--) {
        if (iteratee(array[length], length, array) === false) {
          break;
        }
      }
      return array;
    }
    function arrayEvery(array, predicate) {
      var index = -1, length = array == null ? 0 : array.length;
      while (++index < length) {
        if (!predicate(array[index], index, array)) {
          return false;
        }
      }
      return true;
    }
    function arrayFilter(array, predicate) {
      var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
      while (++index < length) {
        var value = array[index];
        if (predicate(value, index, array)) {
          result[resIndex++] = value;
        }
      }
      return result;
    }
    function arrayIncludes(array, value) {
      var length = array == null ? 0 : array.length;
      return !!length && baseIndexOf(array, value, 0) > -1;
    }
    function arrayIncludesWith(array, value, comparator) {
      var index = -1, length = array == null ? 0 : array.length;
      while (++index < length) {
        if (comparator(value, array[index])) {
          return true;
        }
      }
      return false;
    }
    function arrayMap(array, iteratee) {
      var index = -1, length = array == null ? 0 : array.length, result = Array(length);
      while (++index < length) {
        result[index] = iteratee(array[index], index, array);
      }
      return result;
    }
    function arrayPush(array, values) {
      var index = -1, length = values.length, offset = array.length;
      while (++index < length) {
        array[offset + index] = values[index];
      }
      return array;
    }
    function arrayReduce(array, iteratee, accumulator, initAccum) {
      var index = -1, length = array == null ? 0 : array.length;
      if (initAccum && length) {
        accumulator = array[++index];
      }
      while (++index < length) {
        accumulator = iteratee(accumulator, array[index], index, array);
      }
      return accumulator;
    }
    function arrayReduceRight(array, iteratee, accumulator, initAccum) {
      var length = array == null ? 0 : array.length;
      if (initAccum && length) {
        accumulator = array[--length];
      }
      while (length--) {
        accumulator = iteratee(accumulator, array[length], length, array);
      }
      return accumulator;
    }
    function arraySome(array, predicate) {
      var index = -1, length = array == null ? 0 : array.length;
      while (++index < length) {
        if (predicate(array[index], index, array)) {
          return true;
        }
      }
      return false;
    }
    var asciiSize = baseProperty("length");
    function asciiToArray(string) {
      return string.split("");
    }
    function asciiWords(string) {
      return string.match(reAsciiWord) || [];
    }
    function baseFindKey(collection, predicate, eachFunc) {
      var result;
      eachFunc(collection, function(value, key, collection2) {
        if (predicate(value, key, collection2)) {
          result = key;
          return false;
        }
      });
      return result;
    }
    function baseFindIndex(array, predicate, fromIndex, fromRight) {
      var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
      while (fromRight ? index-- : ++index < length) {
        if (predicate(array[index], index, array)) {
          return index;
        }
      }
      return -1;
    }
    function baseIndexOf(array, value, fromIndex) {
      return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
    }
    function baseIndexOfWith(array, value, fromIndex, comparator) {
      var index = fromIndex - 1, length = array.length;
      while (++index < length) {
        if (comparator(array[index], value)) {
          return index;
        }
      }
      return -1;
    }
    function baseIsNaN(value) {
      return value !== value;
    }
    function baseMean(array, iteratee) {
      var length = array == null ? 0 : array.length;
      return length ? baseSum(array, iteratee) / length : NAN;
    }
    function baseProperty(key) {
      return function(object) {
        return object == null ? undefined$1 : object[key];
      };
    }
    function basePropertyOf(object) {
      return function(key) {
        return object == null ? undefined$1 : object[key];
      };
    }
    function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
      eachFunc(collection, function(value, index, collection2) {
        accumulator = initAccum ? (initAccum = false, value) : iteratee(accumulator, value, index, collection2);
      });
      return accumulator;
    }
    function baseSortBy(array, comparer) {
      var length = array.length;
      array.sort(comparer);
      while (length--) {
        array[length] = array[length].value;
      }
      return array;
    }
    function baseSum(array, iteratee) {
      var result, index = -1, length = array.length;
      while (++index < length) {
        var current = iteratee(array[index]);
        if (current !== undefined$1) {
          result = result === undefined$1 ? current : result + current;
        }
      }
      return result;
    }
    function baseTimes(n, iteratee) {
      var index = -1, result = Array(n);
      while (++index < n) {
        result[index] = iteratee(index);
      }
      return result;
    }
    function baseToPairs(object, props) {
      return arrayMap(props, function(key) {
        return [key, object[key]];
      });
    }
    function baseTrim(string) {
      return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
    }
    function baseUnary(func) {
      return function(value) {
        return func(value);
      };
    }
    function baseValues(object, props) {
      return arrayMap(props, function(key) {
        return object[key];
      });
    }
    function cacheHas(cache, key) {
      return cache.has(key);
    }
    function charsStartIndex(strSymbols, chrSymbols) {
      var index = -1, length = strSymbols.length;
      while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {
      }
      return index;
    }
    function charsEndIndex(strSymbols, chrSymbols) {
      var index = strSymbols.length;
      while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {
      }
      return index;
    }
    function countHolders(array, placeholder) {
      var length = array.length, result = 0;
      while (length--) {
        if (array[length] === placeholder) {
          ++result;
        }
      }
      return result;
    }
    var deburrLetter = basePropertyOf(deburredLetters);
    var escapeHtmlChar = basePropertyOf(htmlEscapes);
    function escapeStringChar(chr) {
      return "\\" + stringEscapes[chr];
    }
    function getValue(object, key) {
      return object == null ? undefined$1 : object[key];
    }
    function hasUnicode(string) {
      return reHasUnicode.test(string);
    }
    function hasUnicodeWord(string) {
      return reHasUnicodeWord.test(string);
    }
    function iteratorToArray(iterator) {
      var data, result = [];
      while (!(data = iterator.next()).done) {
        result.push(data.value);
      }
      return result;
    }
    function mapToArray(map) {
      var index = -1, result = Array(map.size);
      map.forEach(function(value, key) {
        result[++index] = [key, value];
      });
      return result;
    }
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }
    function replaceHolders(array, placeholder) {
      var index = -1, length = array.length, resIndex = 0, result = [];
      while (++index < length) {
        var value = array[index];
        if (value === placeholder || value === PLACEHOLDER) {
          array[index] = PLACEHOLDER;
          result[resIndex++] = index;
        }
      }
      return result;
    }
    function setToArray(set2) {
      var index = -1, result = Array(set2.size);
      set2.forEach(function(value) {
        result[++index] = value;
      });
      return result;
    }
    function setToPairs(set2) {
      var index = -1, result = Array(set2.size);
      set2.forEach(function(value) {
        result[++index] = [value, value];
      });
      return result;
    }
    function strictIndexOf(array, value, fromIndex) {
      var index = fromIndex - 1, length = array.length;
      while (++index < length) {
        if (array[index] === value) {
          return index;
        }
      }
      return -1;
    }
    function strictLastIndexOf(array, value, fromIndex) {
      var index = fromIndex + 1;
      while (index--) {
        if (array[index] === value) {
          return index;
        }
      }
      return index;
    }
    function stringSize(string) {
      return hasUnicode(string) ? unicodeSize(string) : asciiSize(string);
    }
    function stringToArray(string) {
      return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
    }
    function trimmedEndIndex(string) {
      var index = string.length;
      while (index-- && reWhitespace.test(string.charAt(index))) {
      }
      return index;
    }
    var unescapeHtmlChar = basePropertyOf(htmlUnescapes);
    function unicodeSize(string) {
      var result = reUnicode.lastIndex = 0;
      while (reUnicode.test(string)) {
        ++result;
      }
      return result;
    }
    function unicodeToArray(string) {
      return string.match(reUnicode) || [];
    }
    function unicodeWords(string) {
      return string.match(reUnicodeWord) || [];
    }
    var runInContext = function runInContext2(context) {
      context = context == null ? root : _2.defaults(root.Object(), context, _2.pick(root, contextProps));
      var Array2 = context.Array, Date = context.Date, Error2 = context.Error, Function2 = context.Function, Math2 = context.Math, Object2 = context.Object, RegExp2 = context.RegExp, String2 = context.String, TypeError = context.TypeError;
      var arrayProto = Array2.prototype, funcProto = Function2.prototype, objectProto = Object2.prototype;
      var coreJsData = context["__core-js_shared__"];
      var funcToString = funcProto.toString;
      var hasOwnProperty = objectProto.hasOwnProperty;
      var idCounter = 0;
      var maskSrcKey = function() {
        var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
        return uid ? "Symbol(src)_1." + uid : "";
      }();
      var nativeObjectToString = objectProto.toString;
      var objectCtorString = funcToString.call(Object2);
      var oldDash = root._;
      var reIsNative = RegExp2(
        "^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
      );
      var Buffer = moduleExports ? context.Buffer : undefined$1, Symbol2 = context.Symbol, Uint8Array = context.Uint8Array, allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined$1, getPrototype = overArg(Object2.getPrototypeOf, Object2), objectCreate = Object2.create, propertyIsEnumerable = objectProto.propertyIsEnumerable, splice = arrayProto.splice, spreadableSymbol = Symbol2 ? Symbol2.isConcatSpreadable : undefined$1, symIterator = Symbol2 ? Symbol2.iterator : undefined$1, symToStringTag = Symbol2 ? Symbol2.toStringTag : undefined$1;
      var defineProperty = function() {
        try {
          var func = getNative(Object2, "defineProperty");
          func({}, "", {});
          return func;
        } catch (e) {
        }
      }();
      var ctxClearTimeout = context.clearTimeout !== root.clearTimeout && context.clearTimeout, ctxNow = Date && Date.now !== root.Date.now && Date.now, ctxSetTimeout = context.setTimeout !== root.setTimeout && context.setTimeout;
      var nativeCeil = Math2.ceil, nativeFloor = Math2.floor, nativeGetSymbols = Object2.getOwnPropertySymbols, nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined$1, nativeIsFinite = context.isFinite, nativeJoin = arrayProto.join, nativeKeys = overArg(Object2.keys, Object2), nativeMax = Math2.max, nativeMin = Math2.min, nativeNow = Date.now, nativeParseInt = context.parseInt, nativeRandom = Math2.random, nativeReverse = arrayProto.reverse;
      var DataView = getNative(context, "DataView"), Map2 = getNative(context, "Map"), Promise2 = getNative(context, "Promise"), Set2 = getNative(context, "Set"), WeakMap = getNative(context, "WeakMap"), nativeCreate = getNative(Object2, "create");
      var metaMap = WeakMap && new WeakMap();
      var realNames = {};
      var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map2), promiseCtorString = toSource(Promise2), setCtorString = toSource(Set2), weakMapCtorString = toSource(WeakMap);
      var symbolProto = Symbol2 ? Symbol2.prototype : undefined$1, symbolValueOf = symbolProto ? symbolProto.valueOf : undefined$1, symbolToString = symbolProto ? symbolProto.toString : undefined$1;
      function lodash2(value) {
        if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
          if (value instanceof LodashWrapper) {
            return value;
          }
          if (hasOwnProperty.call(value, "__wrapped__")) {
            return wrapperClone(value);
          }
        }
        return new LodashWrapper(value);
      }
      var baseCreate = /* @__PURE__ */ function() {
        function object() {
        }
        return function(proto) {
          if (!isObject(proto)) {
            return {};
          }
          if (objectCreate) {
            return objectCreate(proto);
          }
          object.prototype = proto;
          var result2 = new object();
          object.prototype = undefined$1;
          return result2;
        };
      }();
      function baseLodash() {
      }
      function LodashWrapper(value, chainAll) {
        this.__wrapped__ = value;
        this.__actions__ = [];
        this.__chain__ = !!chainAll;
        this.__index__ = 0;
        this.__values__ = undefined$1;
      }
      lodash2.templateSettings = {
        /**
         * Used to detect `data` property values to be HTML-escaped.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        "escape": reEscape,
        /**
         * Used to detect code to be evaluated.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        "evaluate": reEvaluate,
        /**
         * Used to detect `data` property values to inject.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        "interpolate": reInterpolate,
        /**
         * Used to reference the data object in the template text.
         *
         * @memberOf _.templateSettings
         * @type {string}
         */
        "variable": "",
        /**
         * Used to import variables into the compiled template.
         *
         * @memberOf _.templateSettings
         * @type {Object}
         */
        "imports": {
          /**
           * A reference to the `lodash` function.
           *
           * @memberOf _.templateSettings.imports
           * @type {Function}
           */
          "_": lodash2
        }
      };
      lodash2.prototype = baseLodash.prototype;
      lodash2.prototype.constructor = lodash2;
      LodashWrapper.prototype = baseCreate(baseLodash.prototype);
      LodashWrapper.prototype.constructor = LodashWrapper;
      function LazyWrapper(value) {
        this.__wrapped__ = value;
        this.__actions__ = [];
        this.__dir__ = 1;
        this.__filtered__ = false;
        this.__iteratees__ = [];
        this.__takeCount__ = MAX_ARRAY_LENGTH;
        this.__views__ = [];
      }
      function lazyClone() {
        var result2 = new LazyWrapper(this.__wrapped__);
        result2.__actions__ = copyArray(this.__actions__);
        result2.__dir__ = this.__dir__;
        result2.__filtered__ = this.__filtered__;
        result2.__iteratees__ = copyArray(this.__iteratees__);
        result2.__takeCount__ = this.__takeCount__;
        result2.__views__ = copyArray(this.__views__);
        return result2;
      }
      function lazyReverse() {
        if (this.__filtered__) {
          var result2 = new LazyWrapper(this);
          result2.__dir__ = -1;
          result2.__filtered__ = true;
        } else {
          result2 = this.clone();
          result2.__dir__ *= -1;
        }
        return result2;
      }
      function lazyValue() {
        var array = this.__wrapped__.value(), dir = this.__dir__, isArr = isArray(array), isRight = dir < 0, arrLength = isArr ? array.length : 0, view = getView(0, arrLength, this.__views__), start = view.start, end = view.end, length = end - start, index = isRight ? end : start - 1, iteratees = this.__iteratees__, iterLength = iteratees.length, resIndex = 0, takeCount = nativeMin(length, this.__takeCount__);
        if (!isArr || !isRight && arrLength == length && takeCount == length) {
          return baseWrapperValue(array, this.__actions__);
        }
        var result2 = [];
        outer:
          while (length-- && resIndex < takeCount) {
            index += dir;
            var iterIndex = -1, value = array[index];
            while (++iterIndex < iterLength) {
              var data = iteratees[iterIndex], iteratee2 = data.iteratee, type = data.type, computed = iteratee2(value);
              if (type == LAZY_MAP_FLAG) {
                value = computed;
              } else if (!computed) {
                if (type == LAZY_FILTER_FLAG) {
                  continue outer;
                } else {
                  break outer;
                }
              }
            }
            result2[resIndex++] = value;
          }
        return result2;
      }
      LazyWrapper.prototype = baseCreate(baseLodash.prototype);
      LazyWrapper.prototype.constructor = LazyWrapper;
      function Hash(entries) {
        var index = -1, length = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      function hashClear() {
        this.__data__ = nativeCreate ? nativeCreate(null) : {};
        this.size = 0;
      }
      function hashDelete(key) {
        var result2 = this.has(key) && delete this.__data__[key];
        this.size -= result2 ? 1 : 0;
        return result2;
      }
      function hashGet(key) {
        var data = this.__data__;
        if (nativeCreate) {
          var result2 = data[key];
          return result2 === HASH_UNDEFINED ? undefined$1 : result2;
        }
        return hasOwnProperty.call(data, key) ? data[key] : undefined$1;
      }
      function hashHas(key) {
        var data = this.__data__;
        return nativeCreate ? data[key] !== undefined$1 : hasOwnProperty.call(data, key);
      }
      function hashSet(key, value) {
        var data = this.__data__;
        this.size += this.has(key) ? 0 : 1;
        data[key] = nativeCreate && value === undefined$1 ? HASH_UNDEFINED : value;
        return this;
      }
      Hash.prototype.clear = hashClear;
      Hash.prototype["delete"] = hashDelete;
      Hash.prototype.get = hashGet;
      Hash.prototype.has = hashHas;
      Hash.prototype.set = hashSet;
      function ListCache(entries) {
        var index = -1, length = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      function listCacheClear() {
        this.__data__ = [];
        this.size = 0;
      }
      function listCacheDelete(key) {
        var data = this.__data__, index = assocIndexOf(data, key);
        if (index < 0) {
          return false;
        }
        var lastIndex = data.length - 1;
        if (index == lastIndex) {
          data.pop();
        } else {
          splice.call(data, index, 1);
        }
        --this.size;
        return true;
      }
      function listCacheGet(key) {
        var data = this.__data__, index = assocIndexOf(data, key);
        return index < 0 ? undefined$1 : data[index][1];
      }
      function listCacheHas(key) {
        return assocIndexOf(this.__data__, key) > -1;
      }
      function listCacheSet(key, value) {
        var data = this.__data__, index = assocIndexOf(data, key);
        if (index < 0) {
          ++this.size;
          data.push([key, value]);
        } else {
          data[index][1] = value;
        }
        return this;
      }
      ListCache.prototype.clear = listCacheClear;
      ListCache.prototype["delete"] = listCacheDelete;
      ListCache.prototype.get = listCacheGet;
      ListCache.prototype.has = listCacheHas;
      ListCache.prototype.set = listCacheSet;
      function MapCache(entries) {
        var index = -1, length = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      function mapCacheClear() {
        this.size = 0;
        this.__data__ = {
          "hash": new Hash(),
          "map": new (Map2 || ListCache)(),
          "string": new Hash()
        };
      }
      function mapCacheDelete(key) {
        var result2 = getMapData(this, key)["delete"](key);
        this.size -= result2 ? 1 : 0;
        return result2;
      }
      function mapCacheGet(key) {
        return getMapData(this, key).get(key);
      }
      function mapCacheHas(key) {
        return getMapData(this, key).has(key);
      }
      function mapCacheSet(key, value) {
        var data = getMapData(this, key), size2 = data.size;
        data.set(key, value);
        this.size += data.size == size2 ? 0 : 1;
        return this;
      }
      MapCache.prototype.clear = mapCacheClear;
      MapCache.prototype["delete"] = mapCacheDelete;
      MapCache.prototype.get = mapCacheGet;
      MapCache.prototype.has = mapCacheHas;
      MapCache.prototype.set = mapCacheSet;
      function SetCache(values2) {
        var index = -1, length = values2 == null ? 0 : values2.length;
        this.__data__ = new MapCache();
        while (++index < length) {
          this.add(values2[index]);
        }
      }
      function setCacheAdd(value) {
        this.__data__.set(value, HASH_UNDEFINED);
        return this;
      }
      function setCacheHas(value) {
        return this.__data__.has(value);
      }
      SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
      SetCache.prototype.has = setCacheHas;
      function Stack(entries) {
        var data = this.__data__ = new ListCache(entries);
        this.size = data.size;
      }
      function stackClear() {
        this.__data__ = new ListCache();
        this.size = 0;
      }
      function stackDelete(key) {
        var data = this.__data__, result2 = data["delete"](key);
        this.size = data.size;
        return result2;
      }
      function stackGet(key) {
        return this.__data__.get(key);
      }
      function stackHas(key) {
        return this.__data__.has(key);
      }
      function stackSet(key, value) {
        var data = this.__data__;
        if (data instanceof ListCache) {
          var pairs = data.__data__;
          if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
            pairs.push([key, value]);
            this.size = ++data.size;
            return this;
          }
          data = this.__data__ = new MapCache(pairs);
        }
        data.set(key, value);
        this.size = data.size;
        return this;
      }
      Stack.prototype.clear = stackClear;
      Stack.prototype["delete"] = stackDelete;
      Stack.prototype.get = stackGet;
      Stack.prototype.has = stackHas;
      Stack.prototype.set = stackSet;
      function arrayLikeKeys(value, inherited) {
        var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result2 = skipIndexes ? baseTimes(value.length, String2) : [], length = result2.length;
        for (var key in value) {
          if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
          (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
          isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
          isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
          isIndex(key, length)))) {
            result2.push(key);
          }
        }
        return result2;
      }
      function arraySample(array) {
        var length = array.length;
        return length ? array[baseRandom(0, length - 1)] : undefined$1;
      }
      function arraySampleSize(array, n) {
        return shuffleSelf(copyArray(array), baseClamp(n, 0, array.length));
      }
      function arrayShuffle(array) {
        return shuffleSelf(copyArray(array));
      }
      function assignMergeValue(object, key, value) {
        if (value !== undefined$1 && !eq(object[key], value) || value === undefined$1 && !(key in object)) {
          baseAssignValue(object, key, value);
        }
      }
      function assignValue(object, key, value) {
        var objValue = object[key];
        if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === undefined$1 && !(key in object)) {
          baseAssignValue(object, key, value);
        }
      }
      function assocIndexOf(array, key) {
        var length = array.length;
        while (length--) {
          if (eq(array[length][0], key)) {
            return length;
          }
        }
        return -1;
      }
      function baseAggregator(collection, setter, iteratee2, accumulator) {
        baseEach(collection, function(value, key, collection2) {
          setter(accumulator, value, iteratee2(value), collection2);
        });
        return accumulator;
      }
      function baseAssign(object, source) {
        return object && copyObject(source, keys(source), object);
      }
      function baseAssignIn(object, source) {
        return object && copyObject(source, keysIn(source), object);
      }
      function baseAssignValue(object, key, value) {
        if (key == "__proto__" && defineProperty) {
          defineProperty(object, key, {
            "configurable": true,
            "enumerable": true,
            "value": value,
            "writable": true
          });
        } else {
          object[key] = value;
        }
      }
      function baseAt(object, paths) {
        var index = -1, length = paths.length, result2 = Array2(length), skip = object == null;
        while (++index < length) {
          result2[index] = skip ? undefined$1 : get(object, paths[index]);
        }
        return result2;
      }
      function baseClamp(number, lower, upper) {
        if (number === number) {
          if (upper !== undefined$1) {
            number = number <= upper ? number : upper;
          }
          if (lower !== undefined$1) {
            number = number >= lower ? number : lower;
          }
        }
        return number;
      }
      function baseClone(value, bitmask, customizer, key, object, stack) {
        var result2, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG;
        if (customizer) {
          result2 = object ? customizer(value, key, object, stack) : customizer(value);
        }
        if (result2 !== undefined$1) {
          return result2;
        }
        if (!isObject(value)) {
          return value;
        }
        var isArr = isArray(value);
        if (isArr) {
          result2 = initCloneArray(value);
          if (!isDeep) {
            return copyArray(value, result2);
          }
        } else {
          var tag = getTag(value), isFunc = tag == funcTag || tag == genTag;
          if (isBuffer(value)) {
            return cloneBuffer(value, isDeep);
          }
          if (tag == objectTag || tag == argsTag || isFunc && !object) {
            result2 = isFlat || isFunc ? {} : initCloneObject(value);
            if (!isDeep) {
              return isFlat ? copySymbolsIn(value, baseAssignIn(result2, value)) : copySymbols(value, baseAssign(result2, value));
            }
          } else {
            if (!cloneableTags[tag]) {
              return object ? value : {};
            }
            result2 = initCloneByTag(value, tag, isDeep);
          }
        }
        stack || (stack = new Stack());
        var stacked = stack.get(value);
        if (stacked) {
          return stacked;
        }
        stack.set(value, result2);
        if (isSet(value)) {
          value.forEach(function(subValue) {
            result2.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
          });
        } else if (isMap(value)) {
          value.forEach(function(subValue, key2) {
            result2.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
          });
        }
        var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys;
        var props = isArr ? undefined$1 : keysFunc(value);
        arrayEach(props || value, function(subValue, key2) {
          if (props) {
            key2 = subValue;
            subValue = value[key2];
          }
          assignValue(result2, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
        });
        return result2;
      }
      function baseConforms(source) {
        var props = keys(source);
        return function(object) {
          return baseConformsTo(object, source, props);
        };
      }
      function baseConformsTo(object, source, props) {
        var length = props.length;
        if (object == null) {
          return !length;
        }
        object = Object2(object);
        while (length--) {
          var key = props[length], predicate = source[key], value = object[key];
          if (value === undefined$1 && !(key in object) || !predicate(value)) {
            return false;
          }
        }
        return true;
      }
      function baseDelay(func, wait, args) {
        if (typeof func != "function") {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        return setTimeout2(function() {
          func.apply(undefined$1, args);
        }, wait);
      }
      function baseDifference(array, values2, iteratee2, comparator) {
        var index = -1, includes2 = arrayIncludes, isCommon = true, length = array.length, result2 = [], valuesLength = values2.length;
        if (!length) {
          return result2;
        }
        if (iteratee2) {
          values2 = arrayMap(values2, baseUnary(iteratee2));
        }
        if (comparator) {
          includes2 = arrayIncludesWith;
          isCommon = false;
        } else if (values2.length >= LARGE_ARRAY_SIZE) {
          includes2 = cacheHas;
          isCommon = false;
          values2 = new SetCache(values2);
        }
        outer:
          while (++index < length) {
            var value = array[index], computed = iteratee2 == null ? value : iteratee2(value);
            value = comparator || value !== 0 ? value : 0;
            if (isCommon && computed === computed) {
              var valuesIndex = valuesLength;
              while (valuesIndex--) {
                if (values2[valuesIndex] === computed) {
                  continue outer;
                }
              }
              result2.push(value);
            } else if (!includes2(values2, computed, comparator)) {
              result2.push(value);
            }
          }
        return result2;
      }
      var baseEach = createBaseEach(baseForOwn);
      var baseEachRight = createBaseEach(baseForOwnRight, true);
      function baseEvery(collection, predicate) {
        var result2 = true;
        baseEach(collection, function(value, index, collection2) {
          result2 = !!predicate(value, index, collection2);
          return result2;
        });
        return result2;
      }
      function baseExtremum(array, iteratee2, comparator) {
        var index = -1, length = array.length;
        while (++index < length) {
          var value = array[index], current = iteratee2(value);
          if (current != null && (computed === undefined$1 ? current === current && !isSymbol(current) : comparator(current, computed))) {
            var computed = current, result2 = value;
          }
        }
        return result2;
      }
      function baseFill(array, value, start, end) {
        var length = array.length;
        start = toInteger(start);
        if (start < 0) {
          start = -start > length ? 0 : length + start;
        }
        end = end === undefined$1 || end > length ? length : toInteger(end);
        if (end < 0) {
          end += length;
        }
        end = start > end ? 0 : toLength(end);
        while (start < end) {
          array[start++] = value;
        }
        return array;
      }
      function baseFilter(collection, predicate) {
        var result2 = [];
        baseEach(collection, function(value, index, collection2) {
          if (predicate(value, index, collection2)) {
            result2.push(value);
          }
        });
        return result2;
      }
      function baseFlatten(array, depth, predicate, isStrict, result2) {
        var index = -1, length = array.length;
        predicate || (predicate = isFlattenable);
        result2 || (result2 = []);
        while (++index < length) {
          var value = array[index];
          if (depth > 0 && predicate(value)) {
            if (depth > 1) {
              baseFlatten(value, depth - 1, predicate, isStrict, result2);
            } else {
              arrayPush(result2, value);
            }
          } else if (!isStrict) {
            result2[result2.length] = value;
          }
        }
        return result2;
      }
      var baseFor = createBaseFor();
      var baseForRight = createBaseFor(true);
      function baseForOwn(object, iteratee2) {
        return object && baseFor(object, iteratee2, keys);
      }
      function baseForOwnRight(object, iteratee2) {
        return object && baseForRight(object, iteratee2, keys);
      }
      function baseFunctions(object, props) {
        return arrayFilter(props, function(key) {
          return isFunction(object[key]);
        });
      }
      function baseGet(object, path) {
        path = castPath(path, object);
        var index = 0, length = path.length;
        while (object != null && index < length) {
          object = object[toKey(path[index++])];
        }
        return index && index == length ? object : undefined$1;
      }
      function baseGetAllKeys(object, keysFunc, symbolsFunc) {
        var result2 = keysFunc(object);
        return isArray(object) ? result2 : arrayPush(result2, symbolsFunc(object));
      }
      function baseGetTag(value) {
        if (value == null) {
          return value === undefined$1 ? undefinedTag : nullTag;
        }
        return symToStringTag && symToStringTag in Object2(value) ? getRawTag(value) : objectToString(value);
      }
      function baseGt(value, other) {
        return value > other;
      }
      function baseHas(object, key) {
        return object != null && hasOwnProperty.call(object, key);
      }
      function baseHasIn(object, key) {
        return object != null && key in Object2(object);
      }
      function baseInRange(number, start, end) {
        return number >= nativeMin(start, end) && number < nativeMax(start, end);
      }
      function baseIntersection(arrays, iteratee2, comparator) {
        var includes2 = comparator ? arrayIncludesWith : arrayIncludes, length = arrays[0].length, othLength = arrays.length, othIndex = othLength, caches = Array2(othLength), maxLength = Infinity, result2 = [];
        while (othIndex--) {
          var array = arrays[othIndex];
          if (othIndex && iteratee2) {
            array = arrayMap(array, baseUnary(iteratee2));
          }
          maxLength = nativeMin(array.length, maxLength);
          caches[othIndex] = !comparator && (iteratee2 || length >= 120 && array.length >= 120) ? new SetCache(othIndex && array) : undefined$1;
        }
        array = arrays[0];
        var index = -1, seen = caches[0];
        outer:
          while (++index < length && result2.length < maxLength) {
            var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
            value = comparator || value !== 0 ? value : 0;
            if (!(seen ? cacheHas(seen, computed) : includes2(result2, computed, comparator))) {
              othIndex = othLength;
              while (--othIndex) {
                var cache = caches[othIndex];
                if (!(cache ? cacheHas(cache, computed) : includes2(arrays[othIndex], computed, comparator))) {
                  continue outer;
                }
              }
              if (seen) {
                seen.push(computed);
              }
              result2.push(value);
            }
          }
        return result2;
      }
      function baseInverter(object, setter, iteratee2, accumulator) {
        baseForOwn(object, function(value, key, object2) {
          setter(accumulator, iteratee2(value), key, object2);
        });
        return accumulator;
      }
      function baseInvoke(object, path, args) {
        path = castPath(path, object);
        object = parent(object, path);
        var func = object == null ? object : object[toKey(last(path))];
        return func == null ? undefined$1 : apply(func, object, args);
      }
      function baseIsArguments(value) {
        return isObjectLike(value) && baseGetTag(value) == argsTag;
      }
      function baseIsArrayBuffer(value) {
        return isObjectLike(value) && baseGetTag(value) == arrayBufferTag;
      }
      function baseIsDate(value) {
        return isObjectLike(value) && baseGetTag(value) == dateTag;
      }
      function baseIsEqual(value, other, bitmask, customizer, stack) {
        if (value === other) {
          return true;
        }
        if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
          return value !== value && other !== other;
        }
        return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
      }
      function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
        var objIsArr = isArray(object), othIsArr = isArray(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
        objTag = objTag == argsTag ? objectTag : objTag;
        othTag = othTag == argsTag ? objectTag : othTag;
        var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
        if (isSameTag && isBuffer(object)) {
          if (!isBuffer(other)) {
            return false;
          }
          objIsArr = true;
          objIsObj = false;
        }
        if (isSameTag && !objIsObj) {
          stack || (stack = new Stack());
          return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
        }
        if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
          var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
          if (objIsWrapped || othIsWrapped) {
            var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
            stack || (stack = new Stack());
            return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
          }
        }
        if (!isSameTag) {
          return false;
        }
        stack || (stack = new Stack());
        return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
      }
      function baseIsMap(value) {
        return isObjectLike(value) && getTag(value) == mapTag;
      }
      function baseIsMatch(object, source, matchData, customizer) {
        var index = matchData.length, length = index, noCustomizer = !customizer;
        if (object == null) {
          return !length;
        }
        object = Object2(object);
        while (index--) {
          var data = matchData[index];
          if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
            return false;
          }
        }
        while (++index < length) {
          data = matchData[index];
          var key = data[0], objValue = object[key], srcValue = data[1];
          if (noCustomizer && data[2]) {
            if (objValue === undefined$1 && !(key in object)) {
              return false;
            }
          } else {
            var stack = new Stack();
            if (customizer) {
              var result2 = customizer(objValue, srcValue, key, object, source, stack);
            }
            if (!(result2 === undefined$1 ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack) : result2)) {
              return false;
            }
          }
        }
        return true;
      }
      function baseIsNative(value) {
        if (!isObject(value) || isMasked(value)) {
          return false;
        }
        var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
        return pattern.test(toSource(value));
      }
      function baseIsRegExp(value) {
        return isObjectLike(value) && baseGetTag(value) == regexpTag;
      }
      function baseIsSet(value) {
        return isObjectLike(value) && getTag(value) == setTag;
      }
      function baseIsTypedArray(value) {
        return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
      }
      function baseIteratee(value) {
        if (typeof value == "function") {
          return value;
        }
        if (value == null) {
          return identity;
        }
        if (typeof value == "object") {
          return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
        }
        return property(value);
      }
      function baseKeys(object) {
        if (!isPrototype(object)) {
          return nativeKeys(object);
        }
        var result2 = [];
        for (var key in Object2(object)) {
          if (hasOwnProperty.call(object, key) && key != "constructor") {
            result2.push(key);
          }
        }
        return result2;
      }
      function baseKeysIn(object) {
        if (!isObject(object)) {
          return nativeKeysIn(object);
        }
        var isProto = isPrototype(object), result2 = [];
        for (var key in object) {
          if (!(key == "constructor" && (isProto || !hasOwnProperty.call(object, key)))) {
            result2.push(key);
          }
        }
        return result2;
      }
      function baseLt(value, other) {
        return value < other;
      }
      function baseMap(collection, iteratee2) {
        var index = -1, result2 = isArrayLike(collection) ? Array2(collection.length) : [];
        baseEach(collection, function(value, key, collection2) {
          result2[++index] = iteratee2(value, key, collection2);
        });
        return result2;
      }
      function baseMatches(source) {
        var matchData = getMatchData(source);
        if (matchData.length == 1 && matchData[0][2]) {
          return matchesStrictComparable(matchData[0][0], matchData[0][1]);
        }
        return function(object) {
          return object === source || baseIsMatch(object, source, matchData);
        };
      }
      function baseMatchesProperty(path, srcValue) {
        if (isKey(path) && isStrictComparable(srcValue)) {
          return matchesStrictComparable(toKey(path), srcValue);
        }
        return function(object) {
          var objValue = get(object, path);
          return objValue === undefined$1 && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
        };
      }
      function baseMerge(object, source, srcIndex, customizer, stack) {
        if (object === source) {
          return;
        }
        baseFor(source, function(srcValue, key) {
          stack || (stack = new Stack());
          if (isObject(srcValue)) {
            baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
          } else {
            var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack) : undefined$1;
            if (newValue === undefined$1) {
              newValue = srcValue;
            }
            assignMergeValue(object, key, newValue);
          }
        }, keysIn);
      }
      function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
        var objValue = safeGet(object, key), srcValue = safeGet(source, key), stacked = stack.get(srcValue);
        if (stacked) {
          assignMergeValue(object, key, stacked);
          return;
        }
        var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : undefined$1;
        var isCommon = newValue === undefined$1;
        if (isCommon) {
          var isArr = isArray(srcValue), isBuff = !isArr && isBuffer(srcValue), isTyped = !isArr && !isBuff && isTypedArray(srcValue);
          newValue = srcValue;
          if (isArr || isBuff || isTyped) {
            if (isArray(objValue)) {
              newValue = objValue;
            } else if (isArrayLikeObject(objValue)) {
              newValue = copyArray(objValue);
            } else if (isBuff) {
              isCommon = false;
              newValue = cloneBuffer(srcValue, true);
            } else if (isTyped) {
              isCommon = false;
              newValue = cloneTypedArray(srcValue, true);
            } else {
              newValue = [];
            }
          } else if (isPlainObject2(srcValue) || isArguments(srcValue)) {
            newValue = objValue;
            if (isArguments(objValue)) {
              newValue = toPlainObject(objValue);
            } else if (!isObject(objValue) || isFunction(objValue)) {
              newValue = initCloneObject(srcValue);
            }
          } else {
            isCommon = false;
          }
        }
        if (isCommon) {
          stack.set(srcValue, newValue);
          mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
          stack["delete"](srcValue);
        }
        assignMergeValue(object, key, newValue);
      }
      function baseNth(array, n) {
        var length = array.length;
        if (!length) {
          return;
        }
        n += n < 0 ? length : 0;
        return isIndex(n, length) ? array[n] : undefined$1;
      }
      function baseOrderBy(collection, iteratees, orders) {
        if (iteratees.length) {
          iteratees = arrayMap(iteratees, function(iteratee2) {
            if (isArray(iteratee2)) {
              return function(value) {
                return baseGet(value, iteratee2.length === 1 ? iteratee2[0] : iteratee2);
              };
            }
            return iteratee2;
          });
        } else {
          iteratees = [identity];
        }
        var index = -1;
        iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
        var result2 = baseMap(collection, function(value, key, collection2) {
          var criteria = arrayMap(iteratees, function(iteratee2) {
            return iteratee2(value);
          });
          return { "criteria": criteria, "index": ++index, "value": value };
        });
        return baseSortBy(result2, function(object, other) {
          return compareMultiple(object, other, orders);
        });
      }
      function basePick(object, paths) {
        return basePickBy(object, paths, function(value, path) {
          return hasIn(object, path);
        });
      }
      function basePickBy(object, paths, predicate) {
        var index = -1, length = paths.length, result2 = {};
        while (++index < length) {
          var path = paths[index], value = baseGet(object, path);
          if (predicate(value, path)) {
            baseSet(result2, castPath(path, object), value);
          }
        }
        return result2;
      }
      function basePropertyDeep(path) {
        return function(object) {
          return baseGet(object, path);
        };
      }
      function basePullAll(array, values2, iteratee2, comparator) {
        var indexOf2 = comparator ? baseIndexOfWith : baseIndexOf, index = -1, length = values2.length, seen = array;
        if (array === values2) {
          values2 = copyArray(values2);
        }
        if (iteratee2) {
          seen = arrayMap(array, baseUnary(iteratee2));
        }
        while (++index < length) {
          var fromIndex = 0, value = values2[index], computed = iteratee2 ? iteratee2(value) : value;
          while ((fromIndex = indexOf2(seen, computed, fromIndex, comparator)) > -1) {
            if (seen !== array) {
              splice.call(seen, fromIndex, 1);
            }
            splice.call(array, fromIndex, 1);
          }
        }
        return array;
      }
      function basePullAt(array, indexes) {
        var length = array ? indexes.length : 0, lastIndex = length - 1;
        while (length--) {
          var index = indexes[length];
          if (length == lastIndex || index !== previous) {
            var previous = index;
            if (isIndex(index)) {
              splice.call(array, index, 1);
            } else {
              baseUnset(array, index);
            }
          }
        }
        return array;
      }
      function baseRandom(lower, upper) {
        return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
      }
      function baseRange(start, end, step, fromRight) {
        var index = -1, length = nativeMax(nativeCeil((end - start) / (step || 1)), 0), result2 = Array2(length);
        while (length--) {
          result2[fromRight ? length : ++index] = start;
          start += step;
        }
        return result2;
      }
      function baseRepeat(string, n) {
        var result2 = "";
        if (!string || n < 1 || n > MAX_SAFE_INTEGER) {
          return result2;
        }
        do {
          if (n % 2) {
            result2 += string;
          }
          n = nativeFloor(n / 2);
          if (n) {
            string += string;
          }
        } while (n);
        return result2;
      }
      function baseRest(func, start) {
        return setToString(overRest(func, start, identity), func + "");
      }
      function baseSample(collection) {
        return arraySample(values(collection));
      }
      function baseSampleSize(collection, n) {
        var array = values(collection);
        return shuffleSelf(array, baseClamp(n, 0, array.length));
      }
      function baseSet(object, path, value, customizer) {
        if (!isObject(object)) {
          return object;
        }
        path = castPath(path, object);
        var index = -1, length = path.length, lastIndex = length - 1, nested = object;
        while (nested != null && ++index < length) {
          var key = toKey(path[index]), newValue = value;
          if (key === "__proto__" || key === "constructor" || key === "prototype") {
            return object;
          }
          if (index != lastIndex) {
            var objValue = nested[key];
            newValue = customizer ? customizer(objValue, key, nested) : undefined$1;
            if (newValue === undefined$1) {
              newValue = isObject(objValue) ? objValue : isIndex(path[index + 1]) ? [] : {};
            }
          }
          assignValue(nested, key, newValue);
          nested = nested[key];
        }
        return object;
      }
      var baseSetData = !metaMap ? identity : function(func, data) {
        metaMap.set(func, data);
        return func;
      };
      var baseSetToString = !defineProperty ? identity : function(func, string) {
        return defineProperty(func, "toString", {
          "configurable": true,
          "enumerable": false,
          "value": constant(string),
          "writable": true
        });
      };
      function baseShuffle(collection) {
        return shuffleSelf(values(collection));
      }
      function baseSlice(array, start, end) {
        var index = -1, length = array.length;
        if (start < 0) {
          start = -start > length ? 0 : length + start;
        }
        end = end > length ? length : end;
        if (end < 0) {
          end += length;
        }
        length = start > end ? 0 : end - start >>> 0;
        start >>>= 0;
        var result2 = Array2(length);
        while (++index < length) {
          result2[index] = array[index + start];
        }
        return result2;
      }
      function baseSome(collection, predicate) {
        var result2;
        baseEach(collection, function(value, index, collection2) {
          result2 = predicate(value, index, collection2);
          return !result2;
        });
        return !!result2;
      }
      function baseSortedIndex(array, value, retHighest) {
        var low = 0, high = array == null ? low : array.length;
        if (typeof value == "number" && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
          while (low < high) {
            var mid = low + high >>> 1, computed = array[mid];
            if (computed !== null && !isSymbol(computed) && (retHighest ? computed <= value : computed < value)) {
              low = mid + 1;
            } else {
              high = mid;
            }
          }
          return high;
        }
        return baseSortedIndexBy(array, value, identity, retHighest);
      }
      function baseSortedIndexBy(array, value, iteratee2, retHighest) {
        var low = 0, high = array == null ? 0 : array.length;
        if (high === 0) {
          return 0;
        }
        value = iteratee2(value);
        var valIsNaN = value !== value, valIsNull = value === null, valIsSymbol = isSymbol(value), valIsUndefined = value === undefined$1;
        while (low < high) {
          var mid = nativeFloor((low + high) / 2), computed = iteratee2(array[mid]), othIsDefined = computed !== undefined$1, othIsNull = computed === null, othIsReflexive = computed === computed, othIsSymbol = isSymbol(computed);
          if (valIsNaN) {
            var setLow = retHighest || othIsReflexive;
          } else if (valIsUndefined) {
            setLow = othIsReflexive && (retHighest || othIsDefined);
          } else if (valIsNull) {
            setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
          } else if (valIsSymbol) {
            setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
          } else if (othIsNull || othIsSymbol) {
            setLow = false;
          } else {
            setLow = retHighest ? computed <= value : computed < value;
          }
          if (setLow) {
            low = mid + 1;
          } else {
            high = mid;
          }
        }
        return nativeMin(high, MAX_ARRAY_INDEX);
      }
      function baseSortedUniq(array, iteratee2) {
        var index = -1, length = array.length, resIndex = 0, result2 = [];
        while (++index < length) {
          var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
          if (!index || !eq(computed, seen)) {
            var seen = computed;
            result2[resIndex++] = value === 0 ? 0 : value;
          }
        }
        return result2;
      }
      function baseToNumber(value) {
        if (typeof value == "number") {
          return value;
        }
        if (isSymbol(value)) {
          return NAN;
        }
        return +value;
      }
      function baseToString(value) {
        if (typeof value == "string") {
          return value;
        }
        if (isArray(value)) {
          return arrayMap(value, baseToString) + "";
        }
        if (isSymbol(value)) {
          return symbolToString ? symbolToString.call(value) : "";
        }
        var result2 = value + "";
        return result2 == "0" && 1 / value == -INFINITY ? "-0" : result2;
      }
      function baseUniq(array, iteratee2, comparator) {
        var index = -1, includes2 = arrayIncludes, length = array.length, isCommon = true, result2 = [], seen = result2;
        if (comparator) {
          isCommon = false;
          includes2 = arrayIncludesWith;
        } else if (length >= LARGE_ARRAY_SIZE) {
          var set3 = iteratee2 ? null : createSet(array);
          if (set3) {
            return setToArray(set3);
          }
          isCommon = false;
          includes2 = cacheHas;
          seen = new SetCache();
        } else {
          seen = iteratee2 ? [] : result2;
        }
        outer:
          while (++index < length) {
            var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
            value = comparator || value !== 0 ? value : 0;
            if (isCommon && computed === computed) {
              var seenIndex = seen.length;
              while (seenIndex--) {
                if (seen[seenIndex] === computed) {
                  continue outer;
                }
              }
              if (iteratee2) {
                seen.push(computed);
              }
              result2.push(value);
            } else if (!includes2(seen, computed, comparator)) {
              if (seen !== result2) {
                seen.push(computed);
              }
              result2.push(value);
            }
          }
        return result2;
      }
      function baseUnset(object, path) {
        path = castPath(path, object);
        object = parent(object, path);
        return object == null || delete object[toKey(last(path))];
      }
      function baseUpdate(object, path, updater, customizer) {
        return baseSet(object, path, updater(baseGet(object, path)), customizer);
      }
      function baseWhile(array, predicate, isDrop, fromRight) {
        var length = array.length, index = fromRight ? length : -1;
        while ((fromRight ? index-- : ++index < length) && predicate(array[index], index, array)) {
        }
        return isDrop ? baseSlice(array, fromRight ? 0 : index, fromRight ? index + 1 : length) : baseSlice(array, fromRight ? index + 1 : 0, fromRight ? length : index);
      }
      function baseWrapperValue(value, actions) {
        var result2 = value;
        if (result2 instanceof LazyWrapper) {
          result2 = result2.value();
        }
        return arrayReduce(actions, function(result3, action) {
          return action.func.apply(action.thisArg, arrayPush([result3], action.args));
        }, result2);
      }
      function baseXor(arrays, iteratee2, comparator) {
        var length = arrays.length;
        if (length < 2) {
          return length ? baseUniq(arrays[0]) : [];
        }
        var index = -1, result2 = Array2(length);
        while (++index < length) {
          var array = arrays[index], othIndex = -1;
          while (++othIndex < length) {
            if (othIndex != index) {
              result2[index] = baseDifference(result2[index] || array, arrays[othIndex], iteratee2, comparator);
            }
          }
        }
        return baseUniq(baseFlatten(result2, 1), iteratee2, comparator);
      }
      function baseZipObject(props, values2, assignFunc) {
        var index = -1, length = props.length, valsLength = values2.length, result2 = {};
        while (++index < length) {
          var value = index < valsLength ? values2[index] : undefined$1;
          assignFunc(result2, props[index], value);
        }
        return result2;
      }
      function castArrayLikeObject(value) {
        return isArrayLikeObject(value) ? value : [];
      }
      function castFunction(value) {
        return typeof value == "function" ? value : identity;
      }
      function castPath(value, object) {
        if (isArray(value)) {
          return value;
        }
        return isKey(value, object) ? [value] : stringToPath(toString(value));
      }
      var castRest = baseRest;
      function castSlice(array, start, end) {
        var length = array.length;
        end = end === undefined$1 ? length : end;
        return !start && end >= length ? array : baseSlice(array, start, end);
      }
      var clearTimeout = ctxClearTimeout || function(id) {
        return root.clearTimeout(id);
      };
      function cloneBuffer(buffer, isDeep) {
        if (isDeep) {
          return buffer.slice();
        }
        var length = buffer.length, result2 = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
        buffer.copy(result2);
        return result2;
      }
      function cloneArrayBuffer(arrayBuffer) {
        var result2 = new arrayBuffer.constructor(arrayBuffer.byteLength);
        new Uint8Array(result2).set(new Uint8Array(arrayBuffer));
        return result2;
      }
      function cloneDataView(dataView, isDeep) {
        var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
        return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
      }
      function cloneRegExp(regexp) {
        var result2 = new regexp.constructor(regexp.source, reFlags.exec(regexp));
        result2.lastIndex = regexp.lastIndex;
        return result2;
      }
      function cloneSymbol(symbol) {
        return symbolValueOf ? Object2(symbolValueOf.call(symbol)) : {};
      }
      function cloneTypedArray(typedArray, isDeep) {
        var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
        return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
      }
      function compareAscending(value, other) {
        if (value !== other) {
          var valIsDefined = value !== undefined$1, valIsNull = value === null, valIsReflexive = value === value, valIsSymbol = isSymbol(value);
          var othIsDefined = other !== undefined$1, othIsNull = other === null, othIsReflexive = other === other, othIsSymbol = isSymbol(other);
          if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) {
            return 1;
          }
          if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) {
            return -1;
          }
        }
        return 0;
      }
      function compareMultiple(object, other, orders) {
        var index = -1, objCriteria = object.criteria, othCriteria = other.criteria, length = objCriteria.length, ordersLength = orders.length;
        while (++index < length) {
          var result2 = compareAscending(objCriteria[index], othCriteria[index]);
          if (result2) {
            if (index >= ordersLength) {
              return result2;
            }
            var order = orders[index];
            return result2 * (order == "desc" ? -1 : 1);
          }
        }
        return object.index - other.index;
      }
      function composeArgs(args, partials, holders, isCurried) {
        var argsIndex = -1, argsLength = args.length, holdersLength = holders.length, leftIndex = -1, leftLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result2 = Array2(leftLength + rangeLength), isUncurried = !isCurried;
        while (++leftIndex < leftLength) {
          result2[leftIndex] = partials[leftIndex];
        }
        while (++argsIndex < holdersLength) {
          if (isUncurried || argsIndex < argsLength) {
            result2[holders[argsIndex]] = args[argsIndex];
          }
        }
        while (rangeLength--) {
          result2[leftIndex++] = args[argsIndex++];
        }
        return result2;
      }
      function composeArgsRight(args, partials, holders, isCurried) {
        var argsIndex = -1, argsLength = args.length, holdersIndex = -1, holdersLength = holders.length, rightIndex = -1, rightLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result2 = Array2(rangeLength + rightLength), isUncurried = !isCurried;
        while (++argsIndex < rangeLength) {
          result2[argsIndex] = args[argsIndex];
        }
        var offset = argsIndex;
        while (++rightIndex < rightLength) {
          result2[offset + rightIndex] = partials[rightIndex];
        }
        while (++holdersIndex < holdersLength) {
          if (isUncurried || argsIndex < argsLength) {
            result2[offset + holders[holdersIndex]] = args[argsIndex++];
          }
        }
        return result2;
      }
      function copyArray(source, array) {
        var index = -1, length = source.length;
        array || (array = Array2(length));
        while (++index < length) {
          array[index] = source[index];
        }
        return array;
      }
      function copyObject(source, props, object, customizer) {
        var isNew = !object;
        object || (object = {});
        var index = -1, length = props.length;
        while (++index < length) {
          var key = props[index];
          var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined$1;
          if (newValue === undefined$1) {
            newValue = source[key];
          }
          if (isNew) {
            baseAssignValue(object, key, newValue);
          } else {
            assignValue(object, key, newValue);
          }
        }
        return object;
      }
      function copySymbols(source, object) {
        return copyObject(source, getSymbols(source), object);
      }
      function copySymbolsIn(source, object) {
        return copyObject(source, getSymbolsIn(source), object);
      }
      function createAggregator(setter, initializer) {
        return function(collection, iteratee2) {
          var func = isArray(collection) ? arrayAggregator : baseAggregator, accumulator = initializer ? initializer() : {};
          return func(collection, setter, getIteratee(iteratee2, 2), accumulator);
        };
      }
      function createAssigner(assigner) {
        return baseRest(function(object, sources) {
          var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : undefined$1, guard = length > 2 ? sources[2] : undefined$1;
          customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : undefined$1;
          if (guard && isIterateeCall(sources[0], sources[1], guard)) {
            customizer = length < 3 ? undefined$1 : customizer;
            length = 1;
          }
          object = Object2(object);
          while (++index < length) {
            var source = sources[index];
            if (source) {
              assigner(object, source, index, customizer);
            }
          }
          return object;
        });
      }
      function createBaseEach(eachFunc, fromRight) {
        return function(collection, iteratee2) {
          if (collection == null) {
            return collection;
          }
          if (!isArrayLike(collection)) {
            return eachFunc(collection, iteratee2);
          }
          var length = collection.length, index = fromRight ? length : -1, iterable = Object2(collection);
          while (fromRight ? index-- : ++index < length) {
            if (iteratee2(iterable[index], index, iterable) === false) {
              break;
            }
          }
          return collection;
        };
      }
      function createBaseFor(fromRight) {
        return function(object, iteratee2, keysFunc) {
          var index = -1, iterable = Object2(object), props = keysFunc(object), length = props.length;
          while (length--) {
            var key = props[fromRight ? length : ++index];
            if (iteratee2(iterable[key], key, iterable) === false) {
              break;
            }
          }
          return object;
        };
      }
      function createBind(func, bitmask, thisArg) {
        var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
        function wrapper() {
          var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
          return fn.apply(isBind ? thisArg : this, arguments);
        }
        return wrapper;
      }
      function createCaseFirst(methodName) {
        return function(string) {
          string = toString(string);
          var strSymbols = hasUnicode(string) ? stringToArray(string) : undefined$1;
          var chr = strSymbols ? strSymbols[0] : string.charAt(0);
          var trailing = strSymbols ? castSlice(strSymbols, 1).join("") : string.slice(1);
          return chr[methodName]() + trailing;
        };
      }
      function createCompounder(callback) {
        return function(string) {
          return arrayReduce(words(deburr(string).replace(reApos, "")), callback, "");
        };
      }
      function createCtor(Ctor) {
        return function() {
          var args = arguments;
          switch (args.length) {
            case 0:
              return new Ctor();
            case 1:
              return new Ctor(args[0]);
            case 2:
              return new Ctor(args[0], args[1]);
            case 3:
              return new Ctor(args[0], args[1], args[2]);
            case 4:
              return new Ctor(args[0], args[1], args[2], args[3]);
            case 5:
              return new Ctor(args[0], args[1], args[2], args[3], args[4]);
            case 6:
              return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
            case 7:
              return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
          }
          var thisBinding = baseCreate(Ctor.prototype), result2 = Ctor.apply(thisBinding, args);
          return isObject(result2) ? result2 : thisBinding;
        };
      }
      function createCurry(func, bitmask, arity) {
        var Ctor = createCtor(func);
        function wrapper() {
          var length = arguments.length, args = Array2(length), index = length, placeholder = getHolder(wrapper);
          while (index--) {
            args[index] = arguments[index];
          }
          var holders = length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder ? [] : replaceHolders(args, placeholder);
          length -= holders.length;
          if (length < arity) {
            return createRecurry(
              func,
              bitmask,
              createHybrid,
              wrapper.placeholder,
              undefined$1,
              args,
              holders,
              undefined$1,
              undefined$1,
              arity - length
            );
          }
          var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
          return apply(fn, this, args);
        }
        return wrapper;
      }
      function createFind(findIndexFunc) {
        return function(collection, predicate, fromIndex) {
          var iterable = Object2(collection);
          if (!isArrayLike(collection)) {
            var iteratee2 = getIteratee(predicate, 3);
            collection = keys(collection);
            predicate = function(key) {
              return iteratee2(iterable[key], key, iterable);
            };
          }
          var index = findIndexFunc(collection, predicate, fromIndex);
          return index > -1 ? iterable[iteratee2 ? collection[index] : index] : undefined$1;
        };
      }
      function createFlow(fromRight) {
        return flatRest(function(funcs) {
          var length = funcs.length, index = length, prereq = LodashWrapper.prototype.thru;
          if (fromRight) {
            funcs.reverse();
          }
          while (index--) {
            var func = funcs[index];
            if (typeof func != "function") {
              throw new TypeError(FUNC_ERROR_TEXT);
            }
            if (prereq && !wrapper && getFuncName(func) == "wrapper") {
              var wrapper = new LodashWrapper([], true);
            }
          }
          index = wrapper ? index : length;
          while (++index < length) {
            func = funcs[index];
            var funcName = getFuncName(func), data = funcName == "wrapper" ? getData(func) : undefined$1;
            if (data && isLaziable(data[0]) && data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) && !data[4].length && data[9] == 1) {
              wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
            } else {
              wrapper = func.length == 1 && isLaziable(func) ? wrapper[funcName]() : wrapper.thru(func);
            }
          }
          return function() {
            var args = arguments, value = args[0];
            if (wrapper && args.length == 1 && isArray(value)) {
              return wrapper.plant(value).value();
            }
            var index2 = 0, result2 = length ? funcs[index2].apply(this, args) : value;
            while (++index2 < length) {
              result2 = funcs[index2].call(this, result2);
            }
            return result2;
          };
        });
      }
      function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary2, arity) {
        var isAry = bitmask & WRAP_ARY_FLAG, isBind = bitmask & WRAP_BIND_FLAG, isBindKey = bitmask & WRAP_BIND_KEY_FLAG, isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG), isFlip = bitmask & WRAP_FLIP_FLAG, Ctor = isBindKey ? undefined$1 : createCtor(func);
        function wrapper() {
          var length = arguments.length, args = Array2(length), index = length;
          while (index--) {
            args[index] = arguments[index];
          }
          if (isCurried) {
            var placeholder = getHolder(wrapper), holdersCount = countHolders(args, placeholder);
          }
          if (partials) {
            args = composeArgs(args, partials, holders, isCurried);
          }
          if (partialsRight) {
            args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
          }
          length -= holdersCount;
          if (isCurried && length < arity) {
            var newHolders = replaceHolders(args, placeholder);
            return createRecurry(
              func,
              bitmask,
              createHybrid,
              wrapper.placeholder,
              thisArg,
              args,
              newHolders,
              argPos,
              ary2,
              arity - length
            );
          }
          var thisBinding = isBind ? thisArg : this, fn = isBindKey ? thisBinding[func] : func;
          length = args.length;
          if (argPos) {
            args = reorder(args, argPos);
          } else if (isFlip && length > 1) {
            args.reverse();
          }
          if (isAry && ary2 < length) {
            args.length = ary2;
          }
          if (this && this !== root && this instanceof wrapper) {
            fn = Ctor || createCtor(fn);
          }
          return fn.apply(thisBinding, args);
        }
        return wrapper;
      }
      function createInverter(setter, toIteratee) {
        return function(object, iteratee2) {
          return baseInverter(object, setter, toIteratee(iteratee2), {});
        };
      }
      function createMathOperation(operator, defaultValue) {
        return function(value, other) {
          var result2;
          if (value === undefined$1 && other === undefined$1) {
            return defaultValue;
          }
          if (value !== undefined$1) {
            result2 = value;
          }
          if (other !== undefined$1) {
            if (result2 === undefined$1) {
              return other;
            }
            if (typeof value == "string" || typeof other == "string") {
              value = baseToString(value);
              other = baseToString(other);
            } else {
              value = baseToNumber(value);
              other = baseToNumber(other);
            }
            result2 = operator(value, other);
          }
          return result2;
        };
      }
      function createOver(arrayFunc) {
        return flatRest(function(iteratees) {
          iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
          return baseRest(function(args) {
            var thisArg = this;
            return arrayFunc(iteratees, function(iteratee2) {
              return apply(iteratee2, thisArg, args);
            });
          });
        });
      }
      function createPadding(length, chars) {
        chars = chars === undefined$1 ? " " : baseToString(chars);
        var charsLength = chars.length;
        if (charsLength < 2) {
          return charsLength ? baseRepeat(chars, length) : chars;
        }
        var result2 = baseRepeat(chars, nativeCeil(length / stringSize(chars)));
        return hasUnicode(chars) ? castSlice(stringToArray(result2), 0, length).join("") : result2.slice(0, length);
      }
      function createPartial(func, bitmask, thisArg, partials) {
        var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
        function wrapper() {
          var argsIndex = -1, argsLength = arguments.length, leftIndex = -1, leftLength = partials.length, args = Array2(leftLength + argsLength), fn = this && this !== root && this instanceof wrapper ? Ctor : func;
          while (++leftIndex < leftLength) {
            args[leftIndex] = partials[leftIndex];
          }
          while (argsLength--) {
            args[leftIndex++] = arguments[++argsIndex];
          }
          return apply(fn, isBind ? thisArg : this, args);
        }
        return wrapper;
      }
      function createRange(fromRight) {
        return function(start, end, step) {
          if (step && typeof step != "number" && isIterateeCall(start, end, step)) {
            end = step = undefined$1;
          }
          start = toFinite(start);
          if (end === undefined$1) {
            end = start;
            start = 0;
          } else {
            end = toFinite(end);
          }
          step = step === undefined$1 ? start < end ? 1 : -1 : toFinite(step);
          return baseRange(start, end, step, fromRight);
        };
      }
      function createRelationalOperation(operator) {
        return function(value, other) {
          if (!(typeof value == "string" && typeof other == "string")) {
            value = toNumber(value);
            other = toNumber(other);
          }
          return operator(value, other);
        };
      }
      function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary2, arity) {
        var isCurry = bitmask & WRAP_CURRY_FLAG, newHolders = isCurry ? holders : undefined$1, newHoldersRight = isCurry ? undefined$1 : holders, newPartials = isCurry ? partials : undefined$1, newPartialsRight = isCurry ? undefined$1 : partials;
        bitmask |= isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG;
        bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);
        if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
          bitmask &= ~(WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG);
        }
        var newData = [
          func,
          bitmask,
          thisArg,
          newPartials,
          newHolders,
          newPartialsRight,
          newHoldersRight,
          argPos,
          ary2,
          arity
        ];
        var result2 = wrapFunc.apply(undefined$1, newData);
        if (isLaziable(func)) {
          setData(result2, newData);
        }
        result2.placeholder = placeholder;
        return setWrapToString(result2, func, bitmask);
      }
      function createRound(methodName) {
        var func = Math2[methodName];
        return function(number, precision) {
          number = toNumber(number);
          precision = precision == null ? 0 : nativeMin(toInteger(precision), 292);
          if (precision && nativeIsFinite(number)) {
            var pair = (toString(number) + "e").split("e"), value = func(pair[0] + "e" + (+pair[1] + precision));
            pair = (toString(value) + "e").split("e");
            return +(pair[0] + "e" + (+pair[1] - precision));
          }
          return func(number);
        };
      }
      var createSet = !(Set2 && 1 / setToArray(new Set2([, -0]))[1] == INFINITY) ? noop2 : function(values2) {
        return new Set2(values2);
      };
      function createToPairs(keysFunc) {
        return function(object) {
          var tag = getTag(object);
          if (tag == mapTag) {
            return mapToArray(object);
          }
          if (tag == setTag) {
            return setToPairs(object);
          }
          return baseToPairs(object, keysFunc(object));
        };
      }
      function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary2, arity) {
        var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
        if (!isBindKey && typeof func != "function") {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        var length = partials ? partials.length : 0;
        if (!length) {
          bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
          partials = holders = undefined$1;
        }
        ary2 = ary2 === undefined$1 ? ary2 : nativeMax(toInteger(ary2), 0);
        arity = arity === undefined$1 ? arity : toInteger(arity);
        length -= holders ? holders.length : 0;
        if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
          var partialsRight = partials, holdersRight = holders;
          partials = holders = undefined$1;
        }
        var data = isBindKey ? undefined$1 : getData(func);
        var newData = [
          func,
          bitmask,
          thisArg,
          partials,
          holders,
          partialsRight,
          holdersRight,
          argPos,
          ary2,
          arity
        ];
        if (data) {
          mergeData(newData, data);
        }
        func = newData[0];
        bitmask = newData[1];
        thisArg = newData[2];
        partials = newData[3];
        holders = newData[4];
        arity = newData[9] = newData[9] === undefined$1 ? isBindKey ? 0 : func.length : nativeMax(newData[9] - length, 0);
        if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
          bitmask &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);
        }
        if (!bitmask || bitmask == WRAP_BIND_FLAG) {
          var result2 = createBind(func, bitmask, thisArg);
        } else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
          result2 = createCurry(func, bitmask, arity);
        } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
          result2 = createPartial(func, bitmask, thisArg, partials);
        } else {
          result2 = createHybrid.apply(undefined$1, newData);
        }
        var setter = data ? baseSetData : setData;
        return setWrapToString(setter(result2, newData), func, bitmask);
      }
      function customDefaultsAssignIn(objValue, srcValue, key, object) {
        if (objValue === undefined$1 || eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key)) {
          return srcValue;
        }
        return objValue;
      }
      function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
        if (isObject(objValue) && isObject(srcValue)) {
          stack.set(srcValue, objValue);
          baseMerge(objValue, srcValue, undefined$1, customDefaultsMerge, stack);
          stack["delete"](srcValue);
        }
        return objValue;
      }
      function customOmitClone(value) {
        return isPlainObject2(value) ? undefined$1 : value;
      }
      function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
        if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
          return false;
        }
        var arrStacked = stack.get(array);
        var othStacked = stack.get(other);
        if (arrStacked && othStacked) {
          return arrStacked == other && othStacked == array;
        }
        var index = -1, result2 = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : undefined$1;
        stack.set(array, other);
        stack.set(other, array);
        while (++index < arrLength) {
          var arrValue = array[index], othValue = other[index];
          if (customizer) {
            var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
          }
          if (compared !== undefined$1) {
            if (compared) {
              continue;
            }
            result2 = false;
            break;
          }
          if (seen) {
            if (!arraySome(other, function(othValue2, othIndex) {
              if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
                return seen.push(othIndex);
              }
            })) {
              result2 = false;
              break;
            }
          } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
            result2 = false;
            break;
          }
        }
        stack["delete"](array);
        stack["delete"](other);
        return result2;
      }
      function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
        switch (tag) {
          case dataViewTag:
            if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
              return false;
            }
            object = object.buffer;
            other = other.buffer;
          case arrayBufferTag:
            if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
              return false;
            }
            return true;
          case boolTag:
          case dateTag:
          case numberTag:
            return eq(+object, +other);
          case errorTag:
            return object.name == other.name && object.message == other.message;
          case regexpTag:
          case stringTag:
            return object == other + "";
          case mapTag:
            var convert = mapToArray;
          case setTag:
            var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
            convert || (convert = setToArray);
            if (object.size != other.size && !isPartial) {
              return false;
            }
            var stacked = stack.get(object);
            if (stacked) {
              return stacked == other;
            }
            bitmask |= COMPARE_UNORDERED_FLAG;
            stack.set(object, other);
            var result2 = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
            stack["delete"](object);
            return result2;
          case symbolTag:
            if (symbolValueOf) {
              return symbolValueOf.call(object) == symbolValueOf.call(other);
            }
        }
        return false;
      }
      function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
        if (objLength != othLength && !isPartial) {
          return false;
        }
        var index = objLength;
        while (index--) {
          var key = objProps[index];
          if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
            return false;
          }
        }
        var objStacked = stack.get(object);
        var othStacked = stack.get(other);
        if (objStacked && othStacked) {
          return objStacked == other && othStacked == object;
        }
        var result2 = true;
        stack.set(object, other);
        stack.set(other, object);
        var skipCtor = isPartial;
        while (++index < objLength) {
          key = objProps[index];
          var objValue = object[key], othValue = other[key];
          if (customizer) {
            var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
          }
          if (!(compared === undefined$1 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
            result2 = false;
            break;
          }
          skipCtor || (skipCtor = key == "constructor");
        }
        if (result2 && !skipCtor) {
          var objCtor = object.constructor, othCtor = other.constructor;
          if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
            result2 = false;
          }
        }
        stack["delete"](object);
        stack["delete"](other);
        return result2;
      }
      function flatRest(func) {
        return setToString(overRest(func, undefined$1, flatten), func + "");
      }
      function getAllKeys(object) {
        return baseGetAllKeys(object, keys, getSymbols);
      }
      function getAllKeysIn(object) {
        return baseGetAllKeys(object, keysIn, getSymbolsIn);
      }
      var getData = !metaMap ? noop2 : function(func) {
        return metaMap.get(func);
      };
      function getFuncName(func) {
        var result2 = func.name + "", array = realNames[result2], length = hasOwnProperty.call(realNames, result2) ? array.length : 0;
        while (length--) {
          var data = array[length], otherFunc = data.func;
          if (otherFunc == null || otherFunc == func) {
            return data.name;
          }
        }
        return result2;
      }
      function getHolder(func) {
        var object = hasOwnProperty.call(lodash2, "placeholder") ? lodash2 : func;
        return object.placeholder;
      }
      function getIteratee() {
        var result2 = lodash2.iteratee || iteratee;
        result2 = result2 === iteratee ? baseIteratee : result2;
        return arguments.length ? result2(arguments[0], arguments[1]) : result2;
      }
      function getMapData(map2, key) {
        var data = map2.__data__;
        return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
      }
      function getMatchData(object) {
        var result2 = keys(object), length = result2.length;
        while (length--) {
          var key = result2[length], value = object[key];
          result2[length] = [key, value, isStrictComparable(value)];
        }
        return result2;
      }
      function getNative(object, key) {
        var value = getValue(object, key);
        return baseIsNative(value) ? value : undefined$1;
      }
      function getRawTag(value) {
        var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
        try {
          value[symToStringTag] = undefined$1;
          var unmasked = true;
        } catch (e) {
        }
        var result2 = nativeObjectToString.call(value);
        if (unmasked) {
          if (isOwn) {
            value[symToStringTag] = tag;
          } else {
            delete value[symToStringTag];
          }
        }
        return result2;
      }
      var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
        if (object == null) {
          return [];
        }
        object = Object2(object);
        return arrayFilter(nativeGetSymbols(object), function(symbol) {
          return propertyIsEnumerable.call(object, symbol);
        });
      };
      var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
        var result2 = [];
        while (object) {
          arrayPush(result2, getSymbols(object));
          object = getPrototype(object);
        }
        return result2;
      };
      var getTag = baseGetTag;
      if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set2 && getTag(new Set2()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
        getTag = function(value) {
          var result2 = baseGetTag(value), Ctor = result2 == objectTag ? value.constructor : undefined$1, ctorString = Ctor ? toSource(Ctor) : "";
          if (ctorString) {
            switch (ctorString) {
              case dataViewCtorString:
                return dataViewTag;
              case mapCtorString:
                return mapTag;
              case promiseCtorString:
                return promiseTag;
              case setCtorString:
                return setTag;
              case weakMapCtorString:
                return weakMapTag;
            }
          }
          return result2;
        };
      }
      function getView(start, end, transforms) {
        var index = -1, length = transforms.length;
        while (++index < length) {
          var data = transforms[index], size2 = data.size;
          switch (data.type) {
            case "drop":
              start += size2;
              break;
            case "dropRight":
              end -= size2;
              break;
            case "take":
              end = nativeMin(end, start + size2);
              break;
            case "takeRight":
              start = nativeMax(start, end - size2);
              break;
          }
        }
        return { "start": start, "end": end };
      }
      function getWrapDetails(source) {
        var match = source.match(reWrapDetails);
        return match ? match[1].split(reSplitDetails) : [];
      }
      function hasPath(object, path, hasFunc) {
        path = castPath(path, object);
        var index = -1, length = path.length, result2 = false;
        while (++index < length) {
          var key = toKey(path[index]);
          if (!(result2 = object != null && hasFunc(object, key))) {
            break;
          }
          object = object[key];
        }
        if (result2 || ++index != length) {
          return result2;
        }
        length = object == null ? 0 : object.length;
        return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
      }
      function initCloneArray(array) {
        var length = array.length, result2 = new array.constructor(length);
        if (length && typeof array[0] == "string" && hasOwnProperty.call(array, "index")) {
          result2.index = array.index;
          result2.input = array.input;
        }
        return result2;
      }
      function initCloneObject(object) {
        return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
      }
      function initCloneByTag(object, tag, isDeep) {
        var Ctor = object.constructor;
        switch (tag) {
          case arrayBufferTag:
            return cloneArrayBuffer(object);
          case boolTag:
          case dateTag:
            return new Ctor(+object);
          case dataViewTag:
            return cloneDataView(object, isDeep);
          case float32Tag:
          case float64Tag:
          case int8Tag:
          case int16Tag:
          case int32Tag:
          case uint8Tag:
          case uint8ClampedTag:
          case uint16Tag:
          case uint32Tag:
            return cloneTypedArray(object, isDeep);
          case mapTag:
            return new Ctor();
          case numberTag:
          case stringTag:
            return new Ctor(object);
          case regexpTag:
            return cloneRegExp(object);
          case setTag:
            return new Ctor();
          case symbolTag:
            return cloneSymbol(object);
        }
      }
      function insertWrapDetails(source, details) {
        var length = details.length;
        if (!length) {
          return source;
        }
        var lastIndex = length - 1;
        details[lastIndex] = (length > 1 ? "& " : "") + details[lastIndex];
        details = details.join(length > 2 ? ", " : " ");
        return source.replace(reWrapComment, "{\n/* [wrapped with " + details + "] */\n");
      }
      function isFlattenable(value) {
        return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
      }
      function isIndex(value, length) {
        var type = typeof value;
        length = length == null ? MAX_SAFE_INTEGER : length;
        return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
      }
      function isIterateeCall(value, index, object) {
        if (!isObject(object)) {
          return false;
        }
        var type = typeof index;
        if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) {
          return eq(object[index], value);
        }
        return false;
      }
      function isKey(value, object) {
        if (isArray(value)) {
          return false;
        }
        var type = typeof value;
        if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
          return true;
        }
        return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object2(object);
      }
      function isKeyable(value) {
        var type = typeof value;
        return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
      }
      function isLaziable(func) {
        var funcName = getFuncName(func), other = lodash2[funcName];
        if (typeof other != "function" || !(funcName in LazyWrapper.prototype)) {
          return false;
        }
        if (func === other) {
          return true;
        }
        var data = getData(other);
        return !!data && func === data[0];
      }
      function isMasked(func) {
        return !!maskSrcKey && maskSrcKey in func;
      }
      var isMaskable = coreJsData ? isFunction : stubFalse;
      function isPrototype(value) {
        var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
        return value === proto;
      }
      function isStrictComparable(value) {
        return value === value && !isObject(value);
      }
      function matchesStrictComparable(key, srcValue) {
        return function(object) {
          if (object == null) {
            return false;
          }
          return object[key] === srcValue && (srcValue !== undefined$1 || key in Object2(object));
        };
      }
      function memoizeCapped(func) {
        var result2 = memoize(func, function(key) {
          if (cache.size === MAX_MEMOIZE_SIZE) {
            cache.clear();
          }
          return key;
        });
        var cache = result2.cache;
        return result2;
      }
      function mergeData(data, source) {
        var bitmask = data[1], srcBitmask = source[1], newBitmask = bitmask | srcBitmask, isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG);
        var isCombo = srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_CURRY_FLAG || srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_REARG_FLAG && data[7].length <= source[8] || srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG) && source[7].length <= source[8] && bitmask == WRAP_CURRY_FLAG;
        if (!(isCommon || isCombo)) {
          return data;
        }
        if (srcBitmask & WRAP_BIND_FLAG) {
          data[2] = source[2];
          newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG;
        }
        var value = source[3];
        if (value) {
          var partials = data[3];
          data[3] = partials ? composeArgs(partials, value, source[4]) : value;
          data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source[4];
        }
        value = source[5];
        if (value) {
          partials = data[5];
          data[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
          data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source[6];
        }
        value = source[7];
        if (value) {
          data[7] = value;
        }
        if (srcBitmask & WRAP_ARY_FLAG) {
          data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
        }
        if (data[9] == null) {
          data[9] = source[9];
        }
        data[0] = source[0];
        data[1] = newBitmask;
        return data;
      }
      function nativeKeysIn(object) {
        var result2 = [];
        if (object != null) {
          for (var key in Object2(object)) {
            result2.push(key);
          }
        }
        return result2;
      }
      function objectToString(value) {
        return nativeObjectToString.call(value);
      }
      function overRest(func, start, transform2) {
        start = nativeMax(start === undefined$1 ? func.length - 1 : start, 0);
        return function() {
          var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array2(length);
          while (++index < length) {
            array[index] = args[start + index];
          }
          index = -1;
          var otherArgs = Array2(start + 1);
          while (++index < start) {
            otherArgs[index] = args[index];
          }
          otherArgs[start] = transform2(array);
          return apply(func, this, otherArgs);
        };
      }
      function parent(object, path) {
        return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
      }
      function reorder(array, indexes) {
        var arrLength = array.length, length = nativeMin(indexes.length, arrLength), oldArray = copyArray(array);
        while (length--) {
          var index = indexes[length];
          array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined$1;
        }
        return array;
      }
      function safeGet(object, key) {
        if (key === "constructor" && typeof object[key] === "function") {
          return;
        }
        if (key == "__proto__") {
          return;
        }
        return object[key];
      }
      var setData = shortOut(baseSetData);
      var setTimeout2 = ctxSetTimeout || function(func, wait) {
        return root.setTimeout(func, wait);
      };
      var setToString = shortOut(baseSetToString);
      function setWrapToString(wrapper, reference, bitmask) {
        var source = reference + "";
        return setToString(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
      }
      function shortOut(func) {
        var count = 0, lastCalled = 0;
        return function() {
          var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
          lastCalled = stamp;
          if (remaining > 0) {
            if (++count >= HOT_COUNT) {
              return arguments[0];
            }
          } else {
            count = 0;
          }
          return func.apply(undefined$1, arguments);
        };
      }
      function shuffleSelf(array, size2) {
        var index = -1, length = array.length, lastIndex = length - 1;
        size2 = size2 === undefined$1 ? length : size2;
        while (++index < size2) {
          var rand = baseRandom(index, lastIndex), value = array[rand];
          array[rand] = array[index];
          array[index] = value;
        }
        array.length = size2;
        return array;
      }
      var stringToPath = memoizeCapped(function(string) {
        var result2 = [];
        if (string.charCodeAt(0) === 46) {
          result2.push("");
        }
        string.replace(rePropName, function(match, number, quote, subString) {
          result2.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
        });
        return result2;
      });
      function toKey(value) {
        if (typeof value == "string" || isSymbol(value)) {
          return value;
        }
        var result2 = value + "";
        return result2 == "0" && 1 / value == -INFINITY ? "-0" : result2;
      }
      function toSource(func) {
        if (func != null) {
          try {
            return funcToString.call(func);
          } catch (e) {
          }
          try {
            return func + "";
          } catch (e) {
          }
        }
        return "";
      }
      function updateWrapDetails(details, bitmask) {
        arrayEach(wrapFlags, function(pair) {
          var value = "_." + pair[0];
          if (bitmask & pair[1] && !arrayIncludes(details, value)) {
            details.push(value);
          }
        });
        return details.sort();
      }
      function wrapperClone(wrapper) {
        if (wrapper instanceof LazyWrapper) {
          return wrapper.clone();
        }
        var result2 = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
        result2.__actions__ = copyArray(wrapper.__actions__);
        result2.__index__ = wrapper.__index__;
        result2.__values__ = wrapper.__values__;
        return result2;
      }
      function chunk(array, size2, guard) {
        if (guard ? isIterateeCall(array, size2, guard) : size2 === undefined$1) {
          size2 = 1;
        } else {
          size2 = nativeMax(toInteger(size2), 0);
        }
        var length = array == null ? 0 : array.length;
        if (!length || size2 < 1) {
          return [];
        }
        var index = 0, resIndex = 0, result2 = Array2(nativeCeil(length / size2));
        while (index < length) {
          result2[resIndex++] = baseSlice(array, index, index += size2);
        }
        return result2;
      }
      function compact(array) {
        var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result2 = [];
        while (++index < length) {
          var value = array[index];
          if (value) {
            result2[resIndex++] = value;
          }
        }
        return result2;
      }
      function concat() {
        var length = arguments.length;
        if (!length) {
          return [];
        }
        var args = Array2(length - 1), array = arguments[0], index = length;
        while (index--) {
          args[index - 1] = arguments[index];
        }
        return arrayPush(isArray(array) ? copyArray(array) : [array], baseFlatten(args, 1));
      }
      var difference = baseRest(function(array, values2) {
        return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true)) : [];
      });
      var differenceBy = baseRest(function(array, values2) {
        var iteratee2 = last(values2);
        if (isArrayLikeObject(iteratee2)) {
          iteratee2 = undefined$1;
        }
        return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true), getIteratee(iteratee2, 2)) : [];
      });
      var differenceWith = baseRest(function(array, values2) {
        var comparator = last(values2);
        if (isArrayLikeObject(comparator)) {
          comparator = undefined$1;
        }
        return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true), undefined$1, comparator) : [];
      });
      function drop(array, n, guard) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return [];
        }
        n = guard || n === undefined$1 ? 1 : toInteger(n);
        return baseSlice(array, n < 0 ? 0 : n, length);
      }
      function dropRight(array, n, guard) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return [];
        }
        n = guard || n === undefined$1 ? 1 : toInteger(n);
        n = length - n;
        return baseSlice(array, 0, n < 0 ? 0 : n);
      }
      function dropRightWhile(array, predicate) {
        return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true, true) : [];
      }
      function dropWhile(array, predicate) {
        return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true) : [];
      }
      function fill(array, value, start, end) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return [];
        }
        if (start && typeof start != "number" && isIterateeCall(array, value, start)) {
          start = 0;
          end = length;
        }
        return baseFill(array, value, start, end);
      }
      function findIndex(array, predicate, fromIndex) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return -1;
        }
        var index = fromIndex == null ? 0 : toInteger(fromIndex);
        if (index < 0) {
          index = nativeMax(length + index, 0);
        }
        return baseFindIndex(array, getIteratee(predicate, 3), index);
      }
      function findLastIndex(array, predicate, fromIndex) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return -1;
        }
        var index = length - 1;
        if (fromIndex !== undefined$1) {
          index = toInteger(fromIndex);
          index = fromIndex < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
        }
        return baseFindIndex(array, getIteratee(predicate, 3), index, true);
      }
      function flatten(array) {
        var length = array == null ? 0 : array.length;
        return length ? baseFlatten(array, 1) : [];
      }
      function flattenDeep(array) {
        var length = array == null ? 0 : array.length;
        return length ? baseFlatten(array, INFINITY) : [];
      }
      function flattenDepth(array, depth) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return [];
        }
        depth = depth === undefined$1 ? 1 : toInteger(depth);
        return baseFlatten(array, depth);
      }
      function fromPairs(pairs) {
        var index = -1, length = pairs == null ? 0 : pairs.length, result2 = {};
        while (++index < length) {
          var pair = pairs[index];
          result2[pair[0]] = pair[1];
        }
        return result2;
      }
      function head(array) {
        return array && array.length ? array[0] : undefined$1;
      }
      function indexOf(array, value, fromIndex) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return -1;
        }
        var index = fromIndex == null ? 0 : toInteger(fromIndex);
        if (index < 0) {
          index = nativeMax(length + index, 0);
        }
        return baseIndexOf(array, value, index);
      }
      function initial(array) {
        var length = array == null ? 0 : array.length;
        return length ? baseSlice(array, 0, -1) : [];
      }
      var intersection = baseRest(function(arrays) {
        var mapped = arrayMap(arrays, castArrayLikeObject);
        return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped) : [];
      });
      var intersectionBy = baseRest(function(arrays) {
        var iteratee2 = last(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
        if (iteratee2 === last(mapped)) {
          iteratee2 = undefined$1;
        } else {
          mapped.pop();
        }
        return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, getIteratee(iteratee2, 2)) : [];
      });
      var intersectionWith = baseRest(function(arrays) {
        var comparator = last(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
        comparator = typeof comparator == "function" ? comparator : undefined$1;
        if (comparator) {
          mapped.pop();
        }
        return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, undefined$1, comparator) : [];
      });
      function join(array, separator) {
        return array == null ? "" : nativeJoin.call(array, separator);
      }
      function last(array) {
        var length = array == null ? 0 : array.length;
        return length ? array[length - 1] : undefined$1;
      }
      function lastIndexOf(array, value, fromIndex) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return -1;
        }
        var index = length;
        if (fromIndex !== undefined$1) {
          index = toInteger(fromIndex);
          index = index < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
        }
        return value === value ? strictLastIndexOf(array, value, index) : baseFindIndex(array, baseIsNaN, index, true);
      }
      function nth(array, n) {
        return array && array.length ? baseNth(array, toInteger(n)) : undefined$1;
      }
      var pull = baseRest(pullAll);
      function pullAll(array, values2) {
        return array && array.length && values2 && values2.length ? basePullAll(array, values2) : array;
      }
      function pullAllBy(array, values2, iteratee2) {
        return array && array.length && values2 && values2.length ? basePullAll(array, values2, getIteratee(iteratee2, 2)) : array;
      }
      function pullAllWith(array, values2, comparator) {
        return array && array.length && values2 && values2.length ? basePullAll(array, values2, undefined$1, comparator) : array;
      }
      var pullAt = flatRest(function(array, indexes) {
        var length = array == null ? 0 : array.length, result2 = baseAt(array, indexes);
        basePullAt(array, arrayMap(indexes, function(index) {
          return isIndex(index, length) ? +index : index;
        }).sort(compareAscending));
        return result2;
      });
      function remove(array, predicate) {
        var result2 = [];
        if (!(array && array.length)) {
          return result2;
        }
        var index = -1, indexes = [], length = array.length;
        predicate = getIteratee(predicate, 3);
        while (++index < length) {
          var value = array[index];
          if (predicate(value, index, array)) {
            result2.push(value);
            indexes.push(index);
          }
        }
        basePullAt(array, indexes);
        return result2;
      }
      function reverse(array) {
        return array == null ? array : nativeReverse.call(array);
      }
      function slice(array, start, end) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return [];
        }
        if (end && typeof end != "number" && isIterateeCall(array, start, end)) {
          start = 0;
          end = length;
        } else {
          start = start == null ? 0 : toInteger(start);
          end = end === undefined$1 ? length : toInteger(end);
        }
        return baseSlice(array, start, end);
      }
      function sortedIndex(array, value) {
        return baseSortedIndex(array, value);
      }
      function sortedIndexBy(array, value, iteratee2) {
        return baseSortedIndexBy(array, value, getIteratee(iteratee2, 2));
      }
      function sortedIndexOf(array, value) {
        var length = array == null ? 0 : array.length;
        if (length) {
          var index = baseSortedIndex(array, value);
          if (index < length && eq(array[index], value)) {
            return index;
          }
        }
        return -1;
      }
      function sortedLastIndex(array, value) {
        return baseSortedIndex(array, value, true);
      }
      function sortedLastIndexBy(array, value, iteratee2) {
        return baseSortedIndexBy(array, value, getIteratee(iteratee2, 2), true);
      }
      function sortedLastIndexOf(array, value) {
        var length = array == null ? 0 : array.length;
        if (length) {
          var index = baseSortedIndex(array, value, true) - 1;
          if (eq(array[index], value)) {
            return index;
          }
        }
        return -1;
      }
      function sortedUniq(array) {
        return array && array.length ? baseSortedUniq(array) : [];
      }
      function sortedUniqBy(array, iteratee2) {
        return array && array.length ? baseSortedUniq(array, getIteratee(iteratee2, 2)) : [];
      }
      function tail(array) {
        var length = array == null ? 0 : array.length;
        return length ? baseSlice(array, 1, length) : [];
      }
      function take(array, n, guard) {
        if (!(array && array.length)) {
          return [];
        }
        n = guard || n === undefined$1 ? 1 : toInteger(n);
        return baseSlice(array, 0, n < 0 ? 0 : n);
      }
      function takeRight(array, n, guard) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return [];
        }
        n = guard || n === undefined$1 ? 1 : toInteger(n);
        n = length - n;
        return baseSlice(array, n < 0 ? 0 : n, length);
      }
      function takeRightWhile(array, predicate) {
        return array && array.length ? baseWhile(array, getIteratee(predicate, 3), false, true) : [];
      }
      function takeWhile(array, predicate) {
        return array && array.length ? baseWhile(array, getIteratee(predicate, 3)) : [];
      }
      var union = baseRest(function(arrays) {
        return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
      });
      var unionBy = baseRest(function(arrays) {
        var iteratee2 = last(arrays);
        if (isArrayLikeObject(iteratee2)) {
          iteratee2 = undefined$1;
        }
        return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), getIteratee(iteratee2, 2));
      });
      var unionWith = baseRest(function(arrays) {
        var comparator = last(arrays);
        comparator = typeof comparator == "function" ? comparator : undefined$1;
        return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), undefined$1, comparator);
      });
      function uniq(array) {
        return array && array.length ? baseUniq(array) : [];
      }
      function uniqBy(array, iteratee2) {
        return array && array.length ? baseUniq(array, getIteratee(iteratee2, 2)) : [];
      }
      function uniqWith(array, comparator) {
        comparator = typeof comparator == "function" ? comparator : undefined$1;
        return array && array.length ? baseUniq(array, undefined$1, comparator) : [];
      }
      function unzip(array) {
        if (!(array && array.length)) {
          return [];
        }
        var length = 0;
        array = arrayFilter(array, function(group) {
          if (isArrayLikeObject(group)) {
            length = nativeMax(group.length, length);
            return true;
          }
        });
        return baseTimes(length, function(index) {
          return arrayMap(array, baseProperty(index));
        });
      }
      function unzipWith(array, iteratee2) {
        if (!(array && array.length)) {
          return [];
        }
        var result2 = unzip(array);
        if (iteratee2 == null) {
          return result2;
        }
        return arrayMap(result2, function(group) {
          return apply(iteratee2, undefined$1, group);
        });
      }
      var without = baseRest(function(array, values2) {
        return isArrayLikeObject(array) ? baseDifference(array, values2) : [];
      });
      var xor = baseRest(function(arrays) {
        return baseXor(arrayFilter(arrays, isArrayLikeObject));
      });
      var xorBy = baseRest(function(arrays) {
        var iteratee2 = last(arrays);
        if (isArrayLikeObject(iteratee2)) {
          iteratee2 = undefined$1;
        }
        return baseXor(arrayFilter(arrays, isArrayLikeObject), getIteratee(iteratee2, 2));
      });
      var xorWith = baseRest(function(arrays) {
        var comparator = last(arrays);
        comparator = typeof comparator == "function" ? comparator : undefined$1;
        return baseXor(arrayFilter(arrays, isArrayLikeObject), undefined$1, comparator);
      });
      var zip = baseRest(unzip);
      function zipObject(props, values2) {
        return baseZipObject(props || [], values2 || [], assignValue);
      }
      function zipObjectDeep(props, values2) {
        return baseZipObject(props || [], values2 || [], baseSet);
      }
      var zipWith = baseRest(function(arrays) {
        var length = arrays.length, iteratee2 = length > 1 ? arrays[length - 1] : undefined$1;
        iteratee2 = typeof iteratee2 == "function" ? (arrays.pop(), iteratee2) : undefined$1;
        return unzipWith(arrays, iteratee2);
      });
      function chain(value) {
        var result2 = lodash2(value);
        result2.__chain__ = true;
        return result2;
      }
      function tap(value, interceptor) {
        interceptor(value);
        return value;
      }
      function thru(value, interceptor) {
        return interceptor(value);
      }
      var wrapperAt = flatRest(function(paths) {
        var length = paths.length, start = length ? paths[0] : 0, value = this.__wrapped__, interceptor = function(object) {
          return baseAt(object, paths);
        };
        if (length > 1 || this.__actions__.length || !(value instanceof LazyWrapper) || !isIndex(start)) {
          return this.thru(interceptor);
        }
        value = value.slice(start, +start + (length ? 1 : 0));
        value.__actions__.push({
          "func": thru,
          "args": [interceptor],
          "thisArg": undefined$1
        });
        return new LodashWrapper(value, this.__chain__).thru(function(array) {
          if (length && !array.length) {
            array.push(undefined$1);
          }
          return array;
        });
      });
      function wrapperChain() {
        return chain(this);
      }
      function wrapperCommit() {
        return new LodashWrapper(this.value(), this.__chain__);
      }
      function wrapperNext() {
        if (this.__values__ === undefined$1) {
          this.__values__ = toArray(this.value());
        }
        var done = this.__index__ >= this.__values__.length, value = done ? undefined$1 : this.__values__[this.__index__++];
        return { "done": done, "value": value };
      }
      function wrapperToIterator() {
        return this;
      }
      function wrapperPlant(value) {
        var result2, parent2 = this;
        while (parent2 instanceof baseLodash) {
          var clone2 = wrapperClone(parent2);
          clone2.__index__ = 0;
          clone2.__values__ = undefined$1;
          if (result2) {
            previous.__wrapped__ = clone2;
          } else {
            result2 = clone2;
          }
          var previous = clone2;
          parent2 = parent2.__wrapped__;
        }
        previous.__wrapped__ = value;
        return result2;
      }
      function wrapperReverse() {
        var value = this.__wrapped__;
        if (value instanceof LazyWrapper) {
          var wrapped = value;
          if (this.__actions__.length) {
            wrapped = new LazyWrapper(this);
          }
          wrapped = wrapped.reverse();
          wrapped.__actions__.push({
            "func": thru,
            "args": [reverse],
            "thisArg": undefined$1
          });
          return new LodashWrapper(wrapped, this.__chain__);
        }
        return this.thru(reverse);
      }
      function wrapperValue() {
        return baseWrapperValue(this.__wrapped__, this.__actions__);
      }
      var countBy = createAggregator(function(result2, value, key) {
        if (hasOwnProperty.call(result2, key)) {
          ++result2[key];
        } else {
          baseAssignValue(result2, key, 1);
        }
      });
      function every(collection, predicate, guard) {
        var func = isArray(collection) ? arrayEvery : baseEvery;
        if (guard && isIterateeCall(collection, predicate, guard)) {
          predicate = undefined$1;
        }
        return func(collection, getIteratee(predicate, 3));
      }
      function filter(collection, predicate) {
        var func = isArray(collection) ? arrayFilter : baseFilter;
        return func(collection, getIteratee(predicate, 3));
      }
      var find = createFind(findIndex);
      var findLast = createFind(findLastIndex);
      function flatMap(collection, iteratee2) {
        return baseFlatten(map(collection, iteratee2), 1);
      }
      function flatMapDeep(collection, iteratee2) {
        return baseFlatten(map(collection, iteratee2), INFINITY);
      }
      function flatMapDepth(collection, iteratee2, depth) {
        depth = depth === undefined$1 ? 1 : toInteger(depth);
        return baseFlatten(map(collection, iteratee2), depth);
      }
      function forEach(collection, iteratee2) {
        var func = isArray(collection) ? arrayEach : baseEach;
        return func(collection, getIteratee(iteratee2, 3));
      }
      function forEachRight(collection, iteratee2) {
        var func = isArray(collection) ? arrayEachRight : baseEachRight;
        return func(collection, getIteratee(iteratee2, 3));
      }
      var groupBy = createAggregator(function(result2, value, key) {
        if (hasOwnProperty.call(result2, key)) {
          result2[key].push(value);
        } else {
          baseAssignValue(result2, key, [value]);
        }
      });
      function includes(collection, value, fromIndex, guard) {
        collection = isArrayLike(collection) ? collection : values(collection);
        fromIndex = fromIndex && !guard ? toInteger(fromIndex) : 0;
        var length = collection.length;
        if (fromIndex < 0) {
          fromIndex = nativeMax(length + fromIndex, 0);
        }
        return isString(collection) ? fromIndex <= length && collection.indexOf(value, fromIndex) > -1 : !!length && baseIndexOf(collection, value, fromIndex) > -1;
      }
      var invokeMap = baseRest(function(collection, path, args) {
        var index = -1, isFunc = typeof path == "function", result2 = isArrayLike(collection) ? Array2(collection.length) : [];
        baseEach(collection, function(value) {
          result2[++index] = isFunc ? apply(path, value, args) : baseInvoke(value, path, args);
        });
        return result2;
      });
      var keyBy = createAggregator(function(result2, value, key) {
        baseAssignValue(result2, key, value);
      });
      function map(collection, iteratee2) {
        var func = isArray(collection) ? arrayMap : baseMap;
        return func(collection, getIteratee(iteratee2, 3));
      }
      function orderBy(collection, iteratees, orders, guard) {
        if (collection == null) {
          return [];
        }
        if (!isArray(iteratees)) {
          iteratees = iteratees == null ? [] : [iteratees];
        }
        orders = guard ? undefined$1 : orders;
        if (!isArray(orders)) {
          orders = orders == null ? [] : [orders];
        }
        return baseOrderBy(collection, iteratees, orders);
      }
      var partition = createAggregator(function(result2, value, key) {
        result2[key ? 0 : 1].push(value);
      }, function() {
        return [[], []];
      });
      function reduce(collection, iteratee2, accumulator) {
        var func = isArray(collection) ? arrayReduce : baseReduce, initAccum = arguments.length < 3;
        return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEach);
      }
      function reduceRight(collection, iteratee2, accumulator) {
        var func = isArray(collection) ? arrayReduceRight : baseReduce, initAccum = arguments.length < 3;
        return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEachRight);
      }
      function reject(collection, predicate) {
        var func = isArray(collection) ? arrayFilter : baseFilter;
        return func(collection, negate(getIteratee(predicate, 3)));
      }
      function sample(collection) {
        var func = isArray(collection) ? arraySample : baseSample;
        return func(collection);
      }
      function sampleSize(collection, n, guard) {
        if (guard ? isIterateeCall(collection, n, guard) : n === undefined$1) {
          n = 1;
        } else {
          n = toInteger(n);
        }
        var func = isArray(collection) ? arraySampleSize : baseSampleSize;
        return func(collection, n);
      }
      function shuffle(collection) {
        var func = isArray(collection) ? arrayShuffle : baseShuffle;
        return func(collection);
      }
      function size(collection) {
        if (collection == null) {
          return 0;
        }
        if (isArrayLike(collection)) {
          return isString(collection) ? stringSize(collection) : collection.length;
        }
        var tag = getTag(collection);
        if (tag == mapTag || tag == setTag) {
          return collection.size;
        }
        return baseKeys(collection).length;
      }
      function some(collection, predicate, guard) {
        var func = isArray(collection) ? arraySome : baseSome;
        if (guard && isIterateeCall(collection, predicate, guard)) {
          predicate = undefined$1;
        }
        return func(collection, getIteratee(predicate, 3));
      }
      var sortBy = baseRest(function(collection, iteratees) {
        if (collection == null) {
          return [];
        }
        var length = iteratees.length;
        if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
          iteratees = [];
        } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
          iteratees = [iteratees[0]];
        }
        return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
      });
      var now = ctxNow || function() {
        return root.Date.now();
      };
      function after(n, func) {
        if (typeof func != "function") {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        n = toInteger(n);
        return function() {
          if (--n < 1) {
            return func.apply(this, arguments);
          }
        };
      }
      function ary(func, n, guard) {
        n = guard ? undefined$1 : n;
        n = func && n == null ? func.length : n;
        return createWrap(func, WRAP_ARY_FLAG, undefined$1, undefined$1, undefined$1, undefined$1, n);
      }
      function before(n, func) {
        var result2;
        if (typeof func != "function") {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        n = toInteger(n);
        return function() {
          if (--n > 0) {
            result2 = func.apply(this, arguments);
          }
          if (n <= 1) {
            func = undefined$1;
          }
          return result2;
        };
      }
      var bind = baseRest(function(func, thisArg, partials) {
        var bitmask = WRAP_BIND_FLAG;
        if (partials.length) {
          var holders = replaceHolders(partials, getHolder(bind));
          bitmask |= WRAP_PARTIAL_FLAG;
        }
        return createWrap(func, bitmask, thisArg, partials, holders);
      });
      var bindKey = baseRest(function(object, key, partials) {
        var bitmask = WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG;
        if (partials.length) {
          var holders = replaceHolders(partials, getHolder(bindKey));
          bitmask |= WRAP_PARTIAL_FLAG;
        }
        return createWrap(key, bitmask, object, partials, holders);
      });
      function curry(func, arity, guard) {
        arity = guard ? undefined$1 : arity;
        var result2 = createWrap(func, WRAP_CURRY_FLAG, undefined$1, undefined$1, undefined$1, undefined$1, undefined$1, arity);
        result2.placeholder = curry.placeholder;
        return result2;
      }
      function curryRight(func, arity, guard) {
        arity = guard ? undefined$1 : arity;
        var result2 = createWrap(func, WRAP_CURRY_RIGHT_FLAG, undefined$1, undefined$1, undefined$1, undefined$1, undefined$1, arity);
        result2.placeholder = curryRight.placeholder;
        return result2;
      }
      function debounce(func, wait, options) {
        var lastArgs, lastThis, maxWait, result2, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
        if (typeof func != "function") {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        wait = toNumber(wait) || 0;
        if (isObject(options)) {
          leading = !!options.leading;
          maxing = "maxWait" in options;
          maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
          trailing = "trailing" in options ? !!options.trailing : trailing;
        }
        function invokeFunc(time) {
          var args = lastArgs, thisArg = lastThis;
          lastArgs = lastThis = undefined$1;
          lastInvokeTime = time;
          result2 = func.apply(thisArg, args);
          return result2;
        }
        function leadingEdge(time) {
          lastInvokeTime = time;
          timerId = setTimeout2(timerExpired, wait);
          return leading ? invokeFunc(time) : result2;
        }
        function remainingWait(time) {
          var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
          return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
        }
        function shouldInvoke(time) {
          var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
          return lastCallTime === undefined$1 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
        }
        function timerExpired() {
          var time = now();
          if (shouldInvoke(time)) {
            return trailingEdge(time);
          }
          timerId = setTimeout2(timerExpired, remainingWait(time));
        }
        function trailingEdge(time) {
          timerId = undefined$1;
          if (trailing && lastArgs) {
            return invokeFunc(time);
          }
          lastArgs = lastThis = undefined$1;
          return result2;
        }
        function cancel() {
          if (timerId !== undefined$1) {
            clearTimeout(timerId);
          }
          lastInvokeTime = 0;
          lastArgs = lastCallTime = lastThis = timerId = undefined$1;
        }
        function flush() {
          return timerId === undefined$1 ? result2 : trailingEdge(now());
        }
        function debounced() {
          var time = now(), isInvoking = shouldInvoke(time);
          lastArgs = arguments;
          lastThis = this;
          lastCallTime = time;
          if (isInvoking) {
            if (timerId === undefined$1) {
              return leadingEdge(lastCallTime);
            }
            if (maxing) {
              clearTimeout(timerId);
              timerId = setTimeout2(timerExpired, wait);
              return invokeFunc(lastCallTime);
            }
          }
          if (timerId === undefined$1) {
            timerId = setTimeout2(timerExpired, wait);
          }
          return result2;
        }
        debounced.cancel = cancel;
        debounced.flush = flush;
        return debounced;
      }
      var defer = baseRest(function(func, args) {
        return baseDelay(func, 1, args);
      });
      var delay = baseRest(function(func, wait, args) {
        return baseDelay(func, toNumber(wait) || 0, args);
      });
      function flip(func) {
        return createWrap(func, WRAP_FLIP_FLAG);
      }
      function memoize(func, resolver) {
        if (typeof func != "function" || resolver != null && typeof resolver != "function") {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        var memoized = function() {
          var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
          if (cache.has(key)) {
            return cache.get(key);
          }
          var result2 = func.apply(this, args);
          memoized.cache = cache.set(key, result2) || cache;
          return result2;
        };
        memoized.cache = new (memoize.Cache || MapCache)();
        return memoized;
      }
      memoize.Cache = MapCache;
      function negate(predicate) {
        if (typeof predicate != "function") {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        return function() {
          var args = arguments;
          switch (args.length) {
            case 0:
              return !predicate.call(this);
            case 1:
              return !predicate.call(this, args[0]);
            case 2:
              return !predicate.call(this, args[0], args[1]);
            case 3:
              return !predicate.call(this, args[0], args[1], args[2]);
          }
          return !predicate.apply(this, args);
        };
      }
      function once(func) {
        return before(2, func);
      }
      var overArgs = castRest(function(func, transforms) {
        transforms = transforms.length == 1 && isArray(transforms[0]) ? arrayMap(transforms[0], baseUnary(getIteratee())) : arrayMap(baseFlatten(transforms, 1), baseUnary(getIteratee()));
        var funcsLength = transforms.length;
        return baseRest(function(args) {
          var index = -1, length = nativeMin(args.length, funcsLength);
          while (++index < length) {
            args[index] = transforms[index].call(this, args[index]);
          }
          return apply(func, this, args);
        });
      });
      var partial = baseRest(function(func, partials) {
        var holders = replaceHolders(partials, getHolder(partial));
        return createWrap(func, WRAP_PARTIAL_FLAG, undefined$1, partials, holders);
      });
      var partialRight = baseRest(function(func, partials) {
        var holders = replaceHolders(partials, getHolder(partialRight));
        return createWrap(func, WRAP_PARTIAL_RIGHT_FLAG, undefined$1, partials, holders);
      });
      var rearg = flatRest(function(func, indexes) {
        return createWrap(func, WRAP_REARG_FLAG, undefined$1, undefined$1, undefined$1, indexes);
      });
      function rest(func, start) {
        if (typeof func != "function") {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        start = start === undefined$1 ? start : toInteger(start);
        return baseRest(func, start);
      }
      function spread(func, start) {
        if (typeof func != "function") {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        start = start == null ? 0 : nativeMax(toInteger(start), 0);
        return baseRest(function(args) {
          var array = args[start], otherArgs = castSlice(args, 0, start);
          if (array) {
            arrayPush(otherArgs, array);
          }
          return apply(func, this, otherArgs);
        });
      }
      function throttle(func, wait, options) {
        var leading = true, trailing = true;
        if (typeof func != "function") {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        if (isObject(options)) {
          leading = "leading" in options ? !!options.leading : leading;
          trailing = "trailing" in options ? !!options.trailing : trailing;
        }
        return debounce(func, wait, {
          "leading": leading,
          "maxWait": wait,
          "trailing": trailing
        });
      }
      function unary(func) {
        return ary(func, 1);
      }
      function wrap(value, wrapper) {
        return partial(castFunction(wrapper), value);
      }
      function castArray() {
        if (!arguments.length) {
          return [];
        }
        var value = arguments[0];
        return isArray(value) ? value : [value];
      }
      function clone(value) {
        return baseClone(value, CLONE_SYMBOLS_FLAG);
      }
      function cloneWith(value, customizer) {
        customizer = typeof customizer == "function" ? customizer : undefined$1;
        return baseClone(value, CLONE_SYMBOLS_FLAG, customizer);
      }
      function cloneDeep(value) {
        return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
      }
      function cloneDeepWith(value, customizer) {
        customizer = typeof customizer == "function" ? customizer : undefined$1;
        return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG, customizer);
      }
      function conformsTo(object, source) {
        return source == null || baseConformsTo(object, source, keys(source));
      }
      function eq(value, other) {
        return value === other || value !== value && other !== other;
      }
      var gt = createRelationalOperation(baseGt);
      var gte = createRelationalOperation(function(value, other) {
        return value >= other;
      });
      var isArguments = baseIsArguments(/* @__PURE__ */ function() {
        return arguments;
      }()) ? baseIsArguments : function(value) {
        return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
      };
      var isArray = Array2.isArray;
      var isArrayBuffer = nodeIsArrayBuffer ? baseUnary(nodeIsArrayBuffer) : baseIsArrayBuffer;
      function isArrayLike(value) {
        return value != null && isLength(value.length) && !isFunction(value);
      }
      function isArrayLikeObject(value) {
        return isObjectLike(value) && isArrayLike(value);
      }
      function isBoolean(value) {
        return value === true || value === false || isObjectLike(value) && baseGetTag(value) == boolTag;
      }
      var isBuffer = nativeIsBuffer || stubFalse;
      var isDate = nodeIsDate ? baseUnary(nodeIsDate) : baseIsDate;
      function isElement(value) {
        return isObjectLike(value) && value.nodeType === 1 && !isPlainObject2(value);
      }
      function isEmpty(value) {
        if (value == null) {
          return true;
        }
        if (isArrayLike(value) && (isArray(value) || typeof value == "string" || typeof value.splice == "function" || isBuffer(value) || isTypedArray(value) || isArguments(value))) {
          return !value.length;
        }
        var tag = getTag(value);
        if (tag == mapTag || tag == setTag) {
          return !value.size;
        }
        if (isPrototype(value)) {
          return !baseKeys(value).length;
        }
        for (var key in value) {
          if (hasOwnProperty.call(value, key)) {
            return false;
          }
        }
        return true;
      }
      function isEqual(value, other) {
        return baseIsEqual(value, other);
      }
      function isEqualWith(value, other, customizer) {
        customizer = typeof customizer == "function" ? customizer : undefined$1;
        var result2 = customizer ? customizer(value, other) : undefined$1;
        return result2 === undefined$1 ? baseIsEqual(value, other, undefined$1, customizer) : !!result2;
      }
      function isError(value) {
        if (!isObjectLike(value)) {
          return false;
        }
        var tag = baseGetTag(value);
        return tag == errorTag || tag == domExcTag || typeof value.message == "string" && typeof value.name == "string" && !isPlainObject2(value);
      }
      function isFinite(value) {
        return typeof value == "number" && nativeIsFinite(value);
      }
      function isFunction(value) {
        if (!isObject(value)) {
          return false;
        }
        var tag = baseGetTag(value);
        return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
      }
      function isInteger(value) {
        return typeof value == "number" && value == toInteger(value);
      }
      function isLength(value) {
        return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
      }
      function isObject(value) {
        var type = typeof value;
        return value != null && (type == "object" || type == "function");
      }
      function isObjectLike(value) {
        return value != null && typeof value == "object";
      }
      var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
      function isMatch(object, source) {
        return object === source || baseIsMatch(object, source, getMatchData(source));
      }
      function isMatchWith(object, source, customizer) {
        customizer = typeof customizer == "function" ? customizer : undefined$1;
        return baseIsMatch(object, source, getMatchData(source), customizer);
      }
      function isNaN(value) {
        return isNumber(value) && value != +value;
      }
      function isNative(value) {
        if (isMaskable(value)) {
          throw new Error2(CORE_ERROR_TEXT);
        }
        return baseIsNative(value);
      }
      function isNull(value) {
        return value === null;
      }
      function isNil(value) {
        return value == null;
      }
      function isNumber(value) {
        return typeof value == "number" || isObjectLike(value) && baseGetTag(value) == numberTag;
      }
      function isPlainObject2(value) {
        if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
          return false;
        }
        var proto = getPrototype(value);
        if (proto === null) {
          return true;
        }
        var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
        return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
      }
      var isRegExp = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp;
      function isSafeInteger(value) {
        return isInteger(value) && value >= -MAX_SAFE_INTEGER && value <= MAX_SAFE_INTEGER;
      }
      var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
      function isString(value) {
        return typeof value == "string" || !isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag;
      }
      function isSymbol(value) {
        return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
      }
      var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
      function isUndefined(value) {
        return value === undefined$1;
      }
      function isWeakMap(value) {
        return isObjectLike(value) && getTag(value) == weakMapTag;
      }
      function isWeakSet(value) {
        return isObjectLike(value) && baseGetTag(value) == weakSetTag;
      }
      var lt = createRelationalOperation(baseLt);
      var lte = createRelationalOperation(function(value, other) {
        return value <= other;
      });
      function toArray(value) {
        if (!value) {
          return [];
        }
        if (isArrayLike(value)) {
          return isString(value) ? stringToArray(value) : copyArray(value);
        }
        if (symIterator && value[symIterator]) {
          return iteratorToArray(value[symIterator]());
        }
        var tag = getTag(value), func = tag == mapTag ? mapToArray : tag == setTag ? setToArray : values;
        return func(value);
      }
      function toFinite(value) {
        if (!value) {
          return value === 0 ? value : 0;
        }
        value = toNumber(value);
        if (value === INFINITY || value === -INFINITY) {
          var sign = value < 0 ? -1 : 1;
          return sign * MAX_INTEGER;
        }
        return value === value ? value : 0;
      }
      function toInteger(value) {
        var result2 = toFinite(value), remainder = result2 % 1;
        return result2 === result2 ? remainder ? result2 - remainder : result2 : 0;
      }
      function toLength(value) {
        return value ? baseClamp(toInteger(value), 0, MAX_ARRAY_LENGTH) : 0;
      }
      function toNumber(value) {
        if (typeof value == "number") {
          return value;
        }
        if (isSymbol(value)) {
          return NAN;
        }
        if (isObject(value)) {
          var other = typeof value.valueOf == "function" ? value.valueOf() : value;
          value = isObject(other) ? other + "" : other;
        }
        if (typeof value != "string") {
          return value === 0 ? value : +value;
        }
        value = baseTrim(value);
        var isBinary = reIsBinary.test(value);
        return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
      }
      function toPlainObject(value) {
        return copyObject(value, keysIn(value));
      }
      function toSafeInteger(value) {
        return value ? baseClamp(toInteger(value), -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER) : value === 0 ? value : 0;
      }
      function toString(value) {
        return value == null ? "" : baseToString(value);
      }
      var assign2 = createAssigner(function(object, source) {
        if (isPrototype(source) || isArrayLike(source)) {
          copyObject(source, keys(source), object);
          return;
        }
        for (var key in source) {
          if (hasOwnProperty.call(source, key)) {
            assignValue(object, key, source[key]);
          }
        }
      });
      var assignIn = createAssigner(function(object, source) {
        copyObject(source, keysIn(source), object);
      });
      var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
        copyObject(source, keysIn(source), object, customizer);
      });
      var assignWith = createAssigner(function(object, source, srcIndex, customizer) {
        copyObject(source, keys(source), object, customizer);
      });
      var at = flatRest(baseAt);
      function create(prototype, properties) {
        var result2 = baseCreate(prototype);
        return properties == null ? result2 : baseAssign(result2, properties);
      }
      var defaults = baseRest(function(object, sources) {
        object = Object2(object);
        var index = -1;
        var length = sources.length;
        var guard = length > 2 ? sources[2] : undefined$1;
        if (guard && isIterateeCall(sources[0], sources[1], guard)) {
          length = 1;
        }
        while (++index < length) {
          var source = sources[index];
          var props = keysIn(source);
          var propsIndex = -1;
          var propsLength = props.length;
          while (++propsIndex < propsLength) {
            var key = props[propsIndex];
            var value = object[key];
            if (value === undefined$1 || eq(value, objectProto[key]) && !hasOwnProperty.call(object, key)) {
              object[key] = source[key];
            }
          }
        }
        return object;
      });
      var defaultsDeep = baseRest(function(args) {
        args.push(undefined$1, customDefaultsMerge);
        return apply(mergeWith, undefined$1, args);
      });
      function findKey(object, predicate) {
        return baseFindKey(object, getIteratee(predicate, 3), baseForOwn);
      }
      function findLastKey(object, predicate) {
        return baseFindKey(object, getIteratee(predicate, 3), baseForOwnRight);
      }
      function forIn(object, iteratee2) {
        return object == null ? object : baseFor(object, getIteratee(iteratee2, 3), keysIn);
      }
      function forInRight(object, iteratee2) {
        return object == null ? object : baseForRight(object, getIteratee(iteratee2, 3), keysIn);
      }
      function forOwn(object, iteratee2) {
        return object && baseForOwn(object, getIteratee(iteratee2, 3));
      }
      function forOwnRight(object, iteratee2) {
        return object && baseForOwnRight(object, getIteratee(iteratee2, 3));
      }
      function functions(object) {
        return object == null ? [] : baseFunctions(object, keys(object));
      }
      function functionsIn(object) {
        return object == null ? [] : baseFunctions(object, keysIn(object));
      }
      function get(object, path, defaultValue) {
        var result2 = object == null ? undefined$1 : baseGet(object, path);
        return result2 === undefined$1 ? defaultValue : result2;
      }
      function has(object, path) {
        return object != null && hasPath(object, path, baseHas);
      }
      function hasIn(object, path) {
        return object != null && hasPath(object, path, baseHasIn);
      }
      var invert = createInverter(function(result2, value, key) {
        if (value != null && typeof value.toString != "function") {
          value = nativeObjectToString.call(value);
        }
        result2[value] = key;
      }, constant(identity));
      var invertBy = createInverter(function(result2, value, key) {
        if (value != null && typeof value.toString != "function") {
          value = nativeObjectToString.call(value);
        }
        if (hasOwnProperty.call(result2, value)) {
          result2[value].push(key);
        } else {
          result2[value] = [key];
        }
      }, getIteratee);
      var invoke = baseRest(baseInvoke);
      function keys(object) {
        return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
      }
      function keysIn(object) {
        return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
      }
      function mapKeys(object, iteratee2) {
        var result2 = {};
        iteratee2 = getIteratee(iteratee2, 3);
        baseForOwn(object, function(value, key, object2) {
          baseAssignValue(result2, iteratee2(value, key, object2), value);
        });
        return result2;
      }
      function mapValues(object, iteratee2) {
        var result2 = {};
        iteratee2 = getIteratee(iteratee2, 3);
        baseForOwn(object, function(value, key, object2) {
          baseAssignValue(result2, key, iteratee2(value, key, object2));
        });
        return result2;
      }
      var merge = createAssigner(function(object, source, srcIndex) {
        baseMerge(object, source, srcIndex);
      });
      var mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
        baseMerge(object, source, srcIndex, customizer);
      });
      var omit = flatRest(function(object, paths) {
        var result2 = {};
        if (object == null) {
          return result2;
        }
        var isDeep = false;
        paths = arrayMap(paths, function(path) {
          path = castPath(path, object);
          isDeep || (isDeep = path.length > 1);
          return path;
        });
        copyObject(object, getAllKeysIn(object), result2);
        if (isDeep) {
          result2 = baseClone(result2, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
        }
        var length = paths.length;
        while (length--) {
          baseUnset(result2, paths[length]);
        }
        return result2;
      });
      function omitBy(object, predicate) {
        return pickBy(object, negate(getIteratee(predicate)));
      }
      var pick = flatRest(function(object, paths) {
        return object == null ? {} : basePick(object, paths);
      });
      function pickBy(object, predicate) {
        if (object == null) {
          return {};
        }
        var props = arrayMap(getAllKeysIn(object), function(prop) {
          return [prop];
        });
        predicate = getIteratee(predicate);
        return basePickBy(object, props, function(value, path) {
          return predicate(value, path[0]);
        });
      }
      function result(object, path, defaultValue) {
        path = castPath(path, object);
        var index = -1, length = path.length;
        if (!length) {
          length = 1;
          object = undefined$1;
        }
        while (++index < length) {
          var value = object == null ? undefined$1 : object[toKey(path[index])];
          if (value === undefined$1) {
            index = length;
            value = defaultValue;
          }
          object = isFunction(value) ? value.call(object) : value;
        }
        return object;
      }
      function set2(object, path, value) {
        return object == null ? object : baseSet(object, path, value);
      }
      function setWith(object, path, value, customizer) {
        customizer = typeof customizer == "function" ? customizer : undefined$1;
        return object == null ? object : baseSet(object, path, value, customizer);
      }
      var toPairs = createToPairs(keys);
      var toPairsIn = createToPairs(keysIn);
      function transform(object, iteratee2, accumulator) {
        var isArr = isArray(object), isArrLike = isArr || isBuffer(object) || isTypedArray(object);
        iteratee2 = getIteratee(iteratee2, 4);
        if (accumulator == null) {
          var Ctor = object && object.constructor;
          if (isArrLike) {
            accumulator = isArr ? new Ctor() : [];
          } else if (isObject(object)) {
            accumulator = isFunction(Ctor) ? baseCreate(getPrototype(object)) : {};
          } else {
            accumulator = {};
          }
        }
        (isArrLike ? arrayEach : baseForOwn)(object, function(value, index, object2) {
          return iteratee2(accumulator, value, index, object2);
        });
        return accumulator;
      }
      function unset(object, path) {
        return object == null ? true : baseUnset(object, path);
      }
      function update(object, path, updater) {
        return object == null ? object : baseUpdate(object, path, castFunction(updater));
      }
      function updateWith(object, path, updater, customizer) {
        customizer = typeof customizer == "function" ? customizer : undefined$1;
        return object == null ? object : baseUpdate(object, path, castFunction(updater), customizer);
      }
      function values(object) {
        return object == null ? [] : baseValues(object, keys(object));
      }
      function valuesIn(object) {
        return object == null ? [] : baseValues(object, keysIn(object));
      }
      function clamp(number, lower, upper) {
        if (upper === undefined$1) {
          upper = lower;
          lower = undefined$1;
        }
        if (upper !== undefined$1) {
          upper = toNumber(upper);
          upper = upper === upper ? upper : 0;
        }
        if (lower !== undefined$1) {
          lower = toNumber(lower);
          lower = lower === lower ? lower : 0;
        }
        return baseClamp(toNumber(number), lower, upper);
      }
      function inRange(number, start, end) {
        start = toFinite(start);
        if (end === undefined$1) {
          end = start;
          start = 0;
        } else {
          end = toFinite(end);
        }
        number = toNumber(number);
        return baseInRange(number, start, end);
      }
      function random(lower, upper, floating) {
        if (floating && typeof floating != "boolean" && isIterateeCall(lower, upper, floating)) {
          upper = floating = undefined$1;
        }
        if (floating === undefined$1) {
          if (typeof upper == "boolean") {
            floating = upper;
            upper = undefined$1;
          } else if (typeof lower == "boolean") {
            floating = lower;
            lower = undefined$1;
          }
        }
        if (lower === undefined$1 && upper === undefined$1) {
          lower = 0;
          upper = 1;
        } else {
          lower = toFinite(lower);
          if (upper === undefined$1) {
            upper = lower;
            lower = 0;
          } else {
            upper = toFinite(upper);
          }
        }
        if (lower > upper) {
          var temp = lower;
          lower = upper;
          upper = temp;
        }
        if (floating || lower % 1 || upper % 1) {
          var rand = nativeRandom();
          return nativeMin(lower + rand * (upper - lower + freeParseFloat("1e-" + ((rand + "").length - 1))), upper);
        }
        return baseRandom(lower, upper);
      }
      var camelCase = createCompounder(function(result2, word, index) {
        word = word.toLowerCase();
        return result2 + (index ? capitalize(word) : word);
      });
      function capitalize(string) {
        return upperFirst(toString(string).toLowerCase());
      }
      function deburr(string) {
        string = toString(string);
        return string && string.replace(reLatin, deburrLetter).replace(reComboMark, "");
      }
      function endsWith(string, target, position) {
        string = toString(string);
        target = baseToString(target);
        var length = string.length;
        position = position === undefined$1 ? length : baseClamp(toInteger(position), 0, length);
        var end = position;
        position -= target.length;
        return position >= 0 && string.slice(position, end) == target;
      }
      function escape(string) {
        string = toString(string);
        return string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string;
      }
      function escapeRegExp(string) {
        string = toString(string);
        return string && reHasRegExpChar.test(string) ? string.replace(reRegExpChar, "\\$&") : string;
      }
      var kebabCase = createCompounder(function(result2, word, index) {
        return result2 + (index ? "-" : "") + word.toLowerCase();
      });
      var lowerCase = createCompounder(function(result2, word, index) {
        return result2 + (index ? " " : "") + word.toLowerCase();
      });
      var lowerFirst = createCaseFirst("toLowerCase");
      function pad(string, length, chars) {
        string = toString(string);
        length = toInteger(length);
        var strLength = length ? stringSize(string) : 0;
        if (!length || strLength >= length) {
          return string;
        }
        var mid = (length - strLength) / 2;
        return createPadding(nativeFloor(mid), chars) + string + createPadding(nativeCeil(mid), chars);
      }
      function padEnd(string, length, chars) {
        string = toString(string);
        length = toInteger(length);
        var strLength = length ? stringSize(string) : 0;
        return length && strLength < length ? string + createPadding(length - strLength, chars) : string;
      }
      function padStart(string, length, chars) {
        string = toString(string);
        length = toInteger(length);
        var strLength = length ? stringSize(string) : 0;
        return length && strLength < length ? createPadding(length - strLength, chars) + string : string;
      }
      function parseInt2(string, radix, guard) {
        if (guard || radix == null) {
          radix = 0;
        } else if (radix) {
          radix = +radix;
        }
        return nativeParseInt(toString(string).replace(reTrimStart, ""), radix || 0);
      }
      function repeat(string, n, guard) {
        if (guard ? isIterateeCall(string, n, guard) : n === undefined$1) {
          n = 1;
        } else {
          n = toInteger(n);
        }
        return baseRepeat(toString(string), n);
      }
      function replace() {
        var args = arguments, string = toString(args[0]);
        return args.length < 3 ? string : string.replace(args[1], args[2]);
      }
      var snakeCase = createCompounder(function(result2, word, index) {
        return result2 + (index ? "_" : "") + word.toLowerCase();
      });
      function split(string, separator, limit) {
        if (limit && typeof limit != "number" && isIterateeCall(string, separator, limit)) {
          separator = limit = undefined$1;
        }
        limit = limit === undefined$1 ? MAX_ARRAY_LENGTH : limit >>> 0;
        if (!limit) {
          return [];
        }
        string = toString(string);
        if (string && (typeof separator == "string" || separator != null && !isRegExp(separator))) {
          separator = baseToString(separator);
          if (!separator && hasUnicode(string)) {
            return castSlice(stringToArray(string), 0, limit);
          }
        }
        return string.split(separator, limit);
      }
      var startCase = createCompounder(function(result2, word, index) {
        return result2 + (index ? " " : "") + upperFirst(word);
      });
      function startsWith(string, target, position) {
        string = toString(string);
        position = position == null ? 0 : baseClamp(toInteger(position), 0, string.length);
        target = baseToString(target);
        return string.slice(position, position + target.length) == target;
      }
      function template(string, options, guard) {
        var settings = lodash2.templateSettings;
        if (guard && isIterateeCall(string, options, guard)) {
          options = undefined$1;
        }
        string = toString(string);
        options = assignInWith({}, options, settings, customDefaultsAssignIn);
        var imports = assignInWith({}, options.imports, settings.imports, customDefaultsAssignIn), importsKeys = keys(imports), importsValues = baseValues(imports, importsKeys);
        var isEscaping, isEvaluating, index = 0, interpolate = options.interpolate || reNoMatch, source = "__p += '";
        var reDelimiters = RegExp2(
          (options.escape || reNoMatch).source + "|" + interpolate.source + "|" + (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + "|" + (options.evaluate || reNoMatch).source + "|$",
          "g"
        );
        var sourceURL = "//# sourceURL=" + (hasOwnProperty.call(options, "sourceURL") ? (options.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++templateCounter + "]") + "\n";
        string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
          interpolateValue || (interpolateValue = esTemplateValue);
          source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);
          if (escapeValue) {
            isEscaping = true;
            source += "' +\n__e(" + escapeValue + ") +\n'";
          }
          if (evaluateValue) {
            isEvaluating = true;
            source += "';\n" + evaluateValue + ";\n__p += '";
          }
          if (interpolateValue) {
            source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
          }
          index = offset + match.length;
          return match;
        });
        source += "';\n";
        var variable = hasOwnProperty.call(options, "variable") && options.variable;
        if (!variable) {
          source = "with (obj) {\n" + source + "\n}\n";
        } else if (reForbiddenIdentifierChars.test(variable)) {
          throw new Error2(INVALID_TEMPL_VAR_ERROR_TEXT);
        }
        source = (isEvaluating ? source.replace(reEmptyStringLeading, "") : source).replace(reEmptyStringMiddle, "$1").replace(reEmptyStringTrailing, "$1;");
        source = "function(" + (variable || "obj") + ") {\n" + (variable ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (isEscaping ? ", __e = _.escape" : "") + (isEvaluating ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + source + "return __p\n}";
        var result2 = attempt(function() {
          return Function2(importsKeys, sourceURL + "return " + source).apply(undefined$1, importsValues);
        });
        result2.source = source;
        if (isError(result2)) {
          throw result2;
        }
        return result2;
      }
      function toLower(value) {
        return toString(value).toLowerCase();
      }
      function toUpper(value) {
        return toString(value).toUpperCase();
      }
      function trim(string, chars, guard) {
        string = toString(string);
        if (string && (guard || chars === undefined$1)) {
          return baseTrim(string);
        }
        if (!string || !(chars = baseToString(chars))) {
          return string;
        }
        var strSymbols = stringToArray(string), chrSymbols = stringToArray(chars), start = charsStartIndex(strSymbols, chrSymbols), end = charsEndIndex(strSymbols, chrSymbols) + 1;
        return castSlice(strSymbols, start, end).join("");
      }
      function trimEnd(string, chars, guard) {
        string = toString(string);
        if (string && (guard || chars === undefined$1)) {
          return string.slice(0, trimmedEndIndex(string) + 1);
        }
        if (!string || !(chars = baseToString(chars))) {
          return string;
        }
        var strSymbols = stringToArray(string), end = charsEndIndex(strSymbols, stringToArray(chars)) + 1;
        return castSlice(strSymbols, 0, end).join("");
      }
      function trimStart(string, chars, guard) {
        string = toString(string);
        if (string && (guard || chars === undefined$1)) {
          return string.replace(reTrimStart, "");
        }
        if (!string || !(chars = baseToString(chars))) {
          return string;
        }
        var strSymbols = stringToArray(string), start = charsStartIndex(strSymbols, stringToArray(chars));
        return castSlice(strSymbols, start).join("");
      }
      function truncate(string, options) {
        var length = DEFAULT_TRUNC_LENGTH, omission = DEFAULT_TRUNC_OMISSION;
        if (isObject(options)) {
          var separator = "separator" in options ? options.separator : separator;
          length = "length" in options ? toInteger(options.length) : length;
          omission = "omission" in options ? baseToString(options.omission) : omission;
        }
        string = toString(string);
        var strLength = string.length;
        if (hasUnicode(string)) {
          var strSymbols = stringToArray(string);
          strLength = strSymbols.length;
        }
        if (length >= strLength) {
          return string;
        }
        var end = length - stringSize(omission);
        if (end < 1) {
          return omission;
        }
        var result2 = strSymbols ? castSlice(strSymbols, 0, end).join("") : string.slice(0, end);
        if (separator === undefined$1) {
          return result2 + omission;
        }
        if (strSymbols) {
          end += result2.length - end;
        }
        if (isRegExp(separator)) {
          if (string.slice(end).search(separator)) {
            var match, substring = result2;
            if (!separator.global) {
              separator = RegExp2(separator.source, toString(reFlags.exec(separator)) + "g");
            }
            separator.lastIndex = 0;
            while (match = separator.exec(substring)) {
              var newEnd = match.index;
            }
            result2 = result2.slice(0, newEnd === undefined$1 ? end : newEnd);
          }
        } else if (string.indexOf(baseToString(separator), end) != end) {
          var index = result2.lastIndexOf(separator);
          if (index > -1) {
            result2 = result2.slice(0, index);
          }
        }
        return result2 + omission;
      }
      function unescape(string) {
        string = toString(string);
        return string && reHasEscapedHtml.test(string) ? string.replace(reEscapedHtml, unescapeHtmlChar) : string;
      }
      var upperCase = createCompounder(function(result2, word, index) {
        return result2 + (index ? " " : "") + word.toUpperCase();
      });
      var upperFirst = createCaseFirst("toUpperCase");
      function words(string, pattern, guard) {
        string = toString(string);
        pattern = guard ? undefined$1 : pattern;
        if (pattern === undefined$1) {
          return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
        }
        return string.match(pattern) || [];
      }
      var attempt = baseRest(function(func, args) {
        try {
          return apply(func, undefined$1, args);
        } catch (e) {
          return isError(e) ? e : new Error2(e);
        }
      });
      var bindAll = flatRest(function(object, methodNames) {
        arrayEach(methodNames, function(key) {
          key = toKey(key);
          baseAssignValue(object, key, bind(object[key], object));
        });
        return object;
      });
      function cond(pairs) {
        var length = pairs == null ? 0 : pairs.length, toIteratee = getIteratee();
        pairs = !length ? [] : arrayMap(pairs, function(pair) {
          if (typeof pair[1] != "function") {
            throw new TypeError(FUNC_ERROR_TEXT);
          }
          return [toIteratee(pair[0]), pair[1]];
        });
        return baseRest(function(args) {
          var index = -1;
          while (++index < length) {
            var pair = pairs[index];
            if (apply(pair[0], this, args)) {
              return apply(pair[1], this, args);
            }
          }
        });
      }
      function conforms(source) {
        return baseConforms(baseClone(source, CLONE_DEEP_FLAG));
      }
      function constant(value) {
        return function() {
          return value;
        };
      }
      function defaultTo(value, defaultValue) {
        return value == null || value !== value ? defaultValue : value;
      }
      var flow = createFlow();
      var flowRight = createFlow(true);
      function identity(value) {
        return value;
      }
      function iteratee(func) {
        return baseIteratee(typeof func == "function" ? func : baseClone(func, CLONE_DEEP_FLAG));
      }
      function matches(source) {
        return baseMatches(baseClone(source, CLONE_DEEP_FLAG));
      }
      function matchesProperty(path, srcValue) {
        return baseMatchesProperty(path, baseClone(srcValue, CLONE_DEEP_FLAG));
      }
      var method = baseRest(function(path, args) {
        return function(object) {
          return baseInvoke(object, path, args);
        };
      });
      var methodOf = baseRest(function(object, args) {
        return function(path) {
          return baseInvoke(object, path, args);
        };
      });
      function mixin(object, source, options) {
        var props = keys(source), methodNames = baseFunctions(source, props);
        if (options == null && !(isObject(source) && (methodNames.length || !props.length))) {
          options = source;
          source = object;
          object = this;
          methodNames = baseFunctions(source, keys(source));
        }
        var chain2 = !(isObject(options) && "chain" in options) || !!options.chain, isFunc = isFunction(object);
        arrayEach(methodNames, function(methodName) {
          var func = source[methodName];
          object[methodName] = func;
          if (isFunc) {
            object.prototype[methodName] = function() {
              var chainAll = this.__chain__;
              if (chain2 || chainAll) {
                var result2 = object(this.__wrapped__), actions = result2.__actions__ = copyArray(this.__actions__);
                actions.push({ "func": func, "args": arguments, "thisArg": object });
                result2.__chain__ = chainAll;
                return result2;
              }
              return func.apply(object, arrayPush([this.value()], arguments));
            };
          }
        });
        return object;
      }
      function noConflict() {
        if (root._ === this) {
          root._ = oldDash;
        }
        return this;
      }
      function noop2() {
      }
      function nthArg(n) {
        n = toInteger(n);
        return baseRest(function(args) {
          return baseNth(args, n);
        });
      }
      var over = createOver(arrayMap);
      var overEvery = createOver(arrayEvery);
      var overSome = createOver(arraySome);
      function property(path) {
        return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
      }
      function propertyOf(object) {
        return function(path) {
          return object == null ? undefined$1 : baseGet(object, path);
        };
      }
      var range = createRange();
      var rangeRight = createRange(true);
      function stubArray() {
        return [];
      }
      function stubFalse() {
        return false;
      }
      function stubObject() {
        return {};
      }
      function stubString() {
        return "";
      }
      function stubTrue() {
        return true;
      }
      function times(n, iteratee2) {
        n = toInteger(n);
        if (n < 1 || n > MAX_SAFE_INTEGER) {
          return [];
        }
        var index = MAX_ARRAY_LENGTH, length = nativeMin(n, MAX_ARRAY_LENGTH);
        iteratee2 = getIteratee(iteratee2);
        n -= MAX_ARRAY_LENGTH;
        var result2 = baseTimes(length, iteratee2);
        while (++index < n) {
          iteratee2(index);
        }
        return result2;
      }
      function toPath(value) {
        if (isArray(value)) {
          return arrayMap(value, toKey);
        }
        return isSymbol(value) ? [value] : copyArray(stringToPath(toString(value)));
      }
      function uniqueId(prefix) {
        var id = ++idCounter;
        return toString(prefix) + id;
      }
      var add = createMathOperation(function(augend, addend) {
        return augend + addend;
      }, 0);
      var ceil = createRound("ceil");
      var divide = createMathOperation(function(dividend, divisor) {
        return dividend / divisor;
      }, 1);
      var floor = createRound("floor");
      function max(array) {
        return array && array.length ? baseExtremum(array, identity, baseGt) : undefined$1;
      }
      function maxBy(array, iteratee2) {
        return array && array.length ? baseExtremum(array, getIteratee(iteratee2, 2), baseGt) : undefined$1;
      }
      function mean(array) {
        return baseMean(array, identity);
      }
      function meanBy(array, iteratee2) {
        return baseMean(array, getIteratee(iteratee2, 2));
      }
      function min(array) {
        return array && array.length ? baseExtremum(array, identity, baseLt) : undefined$1;
      }
      function minBy(array, iteratee2) {
        return array && array.length ? baseExtremum(array, getIteratee(iteratee2, 2), baseLt) : undefined$1;
      }
      var multiply = createMathOperation(function(multiplier, multiplicand) {
        return multiplier * multiplicand;
      }, 1);
      var round = createRound("round");
      var subtract = createMathOperation(function(minuend, subtrahend) {
        return minuend - subtrahend;
      }, 0);
      function sum(array) {
        return array && array.length ? baseSum(array, identity) : 0;
      }
      function sumBy(array, iteratee2) {
        return array && array.length ? baseSum(array, getIteratee(iteratee2, 2)) : 0;
      }
      lodash2.after = after;
      lodash2.ary = ary;
      lodash2.assign = assign2;
      lodash2.assignIn = assignIn;
      lodash2.assignInWith = assignInWith;
      lodash2.assignWith = assignWith;
      lodash2.at = at;
      lodash2.before = before;
      lodash2.bind = bind;
      lodash2.bindAll = bindAll;
      lodash2.bindKey = bindKey;
      lodash2.castArray = castArray;
      lodash2.chain = chain;
      lodash2.chunk = chunk;
      lodash2.compact = compact;
      lodash2.concat = concat;
      lodash2.cond = cond;
      lodash2.conforms = conforms;
      lodash2.constant = constant;
      lodash2.countBy = countBy;
      lodash2.create = create;
      lodash2.curry = curry;
      lodash2.curryRight = curryRight;
      lodash2.debounce = debounce;
      lodash2.defaults = defaults;
      lodash2.defaultsDeep = defaultsDeep;
      lodash2.defer = defer;
      lodash2.delay = delay;
      lodash2.difference = difference;
      lodash2.differenceBy = differenceBy;
      lodash2.differenceWith = differenceWith;
      lodash2.drop = drop;
      lodash2.dropRight = dropRight;
      lodash2.dropRightWhile = dropRightWhile;
      lodash2.dropWhile = dropWhile;
      lodash2.fill = fill;
      lodash2.filter = filter;
      lodash2.flatMap = flatMap;
      lodash2.flatMapDeep = flatMapDeep;
      lodash2.flatMapDepth = flatMapDepth;
      lodash2.flatten = flatten;
      lodash2.flattenDeep = flattenDeep;
      lodash2.flattenDepth = flattenDepth;
      lodash2.flip = flip;
      lodash2.flow = flow;
      lodash2.flowRight = flowRight;
      lodash2.fromPairs = fromPairs;
      lodash2.functions = functions;
      lodash2.functionsIn = functionsIn;
      lodash2.groupBy = groupBy;
      lodash2.initial = initial;
      lodash2.intersection = intersection;
      lodash2.intersectionBy = intersectionBy;
      lodash2.intersectionWith = intersectionWith;
      lodash2.invert = invert;
      lodash2.invertBy = invertBy;
      lodash2.invokeMap = invokeMap;
      lodash2.iteratee = iteratee;
      lodash2.keyBy = keyBy;
      lodash2.keys = keys;
      lodash2.keysIn = keysIn;
      lodash2.map = map;
      lodash2.mapKeys = mapKeys;
      lodash2.mapValues = mapValues;
      lodash2.matches = matches;
      lodash2.matchesProperty = matchesProperty;
      lodash2.memoize = memoize;
      lodash2.merge = merge;
      lodash2.mergeWith = mergeWith;
      lodash2.method = method;
      lodash2.methodOf = methodOf;
      lodash2.mixin = mixin;
      lodash2.negate = negate;
      lodash2.nthArg = nthArg;
      lodash2.omit = omit;
      lodash2.omitBy = omitBy;
      lodash2.once = once;
      lodash2.orderBy = orderBy;
      lodash2.over = over;
      lodash2.overArgs = overArgs;
      lodash2.overEvery = overEvery;
      lodash2.overSome = overSome;
      lodash2.partial = partial;
      lodash2.partialRight = partialRight;
      lodash2.partition = partition;
      lodash2.pick = pick;
      lodash2.pickBy = pickBy;
      lodash2.property = property;
      lodash2.propertyOf = propertyOf;
      lodash2.pull = pull;
      lodash2.pullAll = pullAll;
      lodash2.pullAllBy = pullAllBy;
      lodash2.pullAllWith = pullAllWith;
      lodash2.pullAt = pullAt;
      lodash2.range = range;
      lodash2.rangeRight = rangeRight;
      lodash2.rearg = rearg;
      lodash2.reject = reject;
      lodash2.remove = remove;
      lodash2.rest = rest;
      lodash2.reverse = reverse;
      lodash2.sampleSize = sampleSize;
      lodash2.set = set2;
      lodash2.setWith = setWith;
      lodash2.shuffle = shuffle;
      lodash2.slice = slice;
      lodash2.sortBy = sortBy;
      lodash2.sortedUniq = sortedUniq;
      lodash2.sortedUniqBy = sortedUniqBy;
      lodash2.split = split;
      lodash2.spread = spread;
      lodash2.tail = tail;
      lodash2.take = take;
      lodash2.takeRight = takeRight;
      lodash2.takeRightWhile = takeRightWhile;
      lodash2.takeWhile = takeWhile;
      lodash2.tap = tap;
      lodash2.throttle = throttle;
      lodash2.thru = thru;
      lodash2.toArray = toArray;
      lodash2.toPairs = toPairs;
      lodash2.toPairsIn = toPairsIn;
      lodash2.toPath = toPath;
      lodash2.toPlainObject = toPlainObject;
      lodash2.transform = transform;
      lodash2.unary = unary;
      lodash2.union = union;
      lodash2.unionBy = unionBy;
      lodash2.unionWith = unionWith;
      lodash2.uniq = uniq;
      lodash2.uniqBy = uniqBy;
      lodash2.uniqWith = uniqWith;
      lodash2.unset = unset;
      lodash2.unzip = unzip;
      lodash2.unzipWith = unzipWith;
      lodash2.update = update;
      lodash2.updateWith = updateWith;
      lodash2.values = values;
      lodash2.valuesIn = valuesIn;
      lodash2.without = without;
      lodash2.words = words;
      lodash2.wrap = wrap;
      lodash2.xor = xor;
      lodash2.xorBy = xorBy;
      lodash2.xorWith = xorWith;
      lodash2.zip = zip;
      lodash2.zipObject = zipObject;
      lodash2.zipObjectDeep = zipObjectDeep;
      lodash2.zipWith = zipWith;
      lodash2.entries = toPairs;
      lodash2.entriesIn = toPairsIn;
      lodash2.extend = assignIn;
      lodash2.extendWith = assignInWith;
      mixin(lodash2, lodash2);
      lodash2.add = add;
      lodash2.attempt = attempt;
      lodash2.camelCase = camelCase;
      lodash2.capitalize = capitalize;
      lodash2.ceil = ceil;
      lodash2.clamp = clamp;
      lodash2.clone = clone;
      lodash2.cloneDeep = cloneDeep;
      lodash2.cloneDeepWith = cloneDeepWith;
      lodash2.cloneWith = cloneWith;
      lodash2.conformsTo = conformsTo;
      lodash2.deburr = deburr;
      lodash2.defaultTo = defaultTo;
      lodash2.divide = divide;
      lodash2.endsWith = endsWith;
      lodash2.eq = eq;
      lodash2.escape = escape;
      lodash2.escapeRegExp = escapeRegExp;
      lodash2.every = every;
      lodash2.find = find;
      lodash2.findIndex = findIndex;
      lodash2.findKey = findKey;
      lodash2.findLast = findLast;
      lodash2.findLastIndex = findLastIndex;
      lodash2.findLastKey = findLastKey;
      lodash2.floor = floor;
      lodash2.forEach = forEach;
      lodash2.forEachRight = forEachRight;
      lodash2.forIn = forIn;
      lodash2.forInRight = forInRight;
      lodash2.forOwn = forOwn;
      lodash2.forOwnRight = forOwnRight;
      lodash2.get = get;
      lodash2.gt = gt;
      lodash2.gte = gte;
      lodash2.has = has;
      lodash2.hasIn = hasIn;
      lodash2.head = head;
      lodash2.identity = identity;
      lodash2.includes = includes;
      lodash2.indexOf = indexOf;
      lodash2.inRange = inRange;
      lodash2.invoke = invoke;
      lodash2.isArguments = isArguments;
      lodash2.isArray = isArray;
      lodash2.isArrayBuffer = isArrayBuffer;
      lodash2.isArrayLike = isArrayLike;
      lodash2.isArrayLikeObject = isArrayLikeObject;
      lodash2.isBoolean = isBoolean;
      lodash2.isBuffer = isBuffer;
      lodash2.isDate = isDate;
      lodash2.isElement = isElement;
      lodash2.isEmpty = isEmpty;
      lodash2.isEqual = isEqual;
      lodash2.isEqualWith = isEqualWith;
      lodash2.isError = isError;
      lodash2.isFinite = isFinite;
      lodash2.isFunction = isFunction;
      lodash2.isInteger = isInteger;
      lodash2.isLength = isLength;
      lodash2.isMap = isMap;
      lodash2.isMatch = isMatch;
      lodash2.isMatchWith = isMatchWith;
      lodash2.isNaN = isNaN;
      lodash2.isNative = isNative;
      lodash2.isNil = isNil;
      lodash2.isNull = isNull;
      lodash2.isNumber = isNumber;
      lodash2.isObject = isObject;
      lodash2.isObjectLike = isObjectLike;
      lodash2.isPlainObject = isPlainObject2;
      lodash2.isRegExp = isRegExp;
      lodash2.isSafeInteger = isSafeInteger;
      lodash2.isSet = isSet;
      lodash2.isString = isString;
      lodash2.isSymbol = isSymbol;
      lodash2.isTypedArray = isTypedArray;
      lodash2.isUndefined = isUndefined;
      lodash2.isWeakMap = isWeakMap;
      lodash2.isWeakSet = isWeakSet;
      lodash2.join = join;
      lodash2.kebabCase = kebabCase;
      lodash2.last = last;
      lodash2.lastIndexOf = lastIndexOf;
      lodash2.lowerCase = lowerCase;
      lodash2.lowerFirst = lowerFirst;
      lodash2.lt = lt;
      lodash2.lte = lte;
      lodash2.max = max;
      lodash2.maxBy = maxBy;
      lodash2.mean = mean;
      lodash2.meanBy = meanBy;
      lodash2.min = min;
      lodash2.minBy = minBy;
      lodash2.stubArray = stubArray;
      lodash2.stubFalse = stubFalse;
      lodash2.stubObject = stubObject;
      lodash2.stubString = stubString;
      lodash2.stubTrue = stubTrue;
      lodash2.multiply = multiply;
      lodash2.nth = nth;
      lodash2.noConflict = noConflict;
      lodash2.noop = noop2;
      lodash2.now = now;
      lodash2.pad = pad;
      lodash2.padEnd = padEnd;
      lodash2.padStart = padStart;
      lodash2.parseInt = parseInt2;
      lodash2.random = random;
      lodash2.reduce = reduce;
      lodash2.reduceRight = reduceRight;
      lodash2.repeat = repeat;
      lodash2.replace = replace;
      lodash2.result = result;
      lodash2.round = round;
      lodash2.runInContext = runInContext2;
      lodash2.sample = sample;
      lodash2.size = size;
      lodash2.snakeCase = snakeCase;
      lodash2.some = some;
      lodash2.sortedIndex = sortedIndex;
      lodash2.sortedIndexBy = sortedIndexBy;
      lodash2.sortedIndexOf = sortedIndexOf;
      lodash2.sortedLastIndex = sortedLastIndex;
      lodash2.sortedLastIndexBy = sortedLastIndexBy;
      lodash2.sortedLastIndexOf = sortedLastIndexOf;
      lodash2.startCase = startCase;
      lodash2.startsWith = startsWith;
      lodash2.subtract = subtract;
      lodash2.sum = sum;
      lodash2.sumBy = sumBy;
      lodash2.template = template;
      lodash2.times = times;
      lodash2.toFinite = toFinite;
      lodash2.toInteger = toInteger;
      lodash2.toLength = toLength;
      lodash2.toLower = toLower;
      lodash2.toNumber = toNumber;
      lodash2.toSafeInteger = toSafeInteger;
      lodash2.toString = toString;
      lodash2.toUpper = toUpper;
      lodash2.trim = trim;
      lodash2.trimEnd = trimEnd;
      lodash2.trimStart = trimStart;
      lodash2.truncate = truncate;
      lodash2.unescape = unescape;
      lodash2.uniqueId = uniqueId;
      lodash2.upperCase = upperCase;
      lodash2.upperFirst = upperFirst;
      lodash2.each = forEach;
      lodash2.eachRight = forEachRight;
      lodash2.first = head;
      mixin(lodash2, function() {
        var source = {};
        baseForOwn(lodash2, function(func, methodName) {
          if (!hasOwnProperty.call(lodash2.prototype, methodName)) {
            source[methodName] = func;
          }
        });
        return source;
      }(), { "chain": false });
      lodash2.VERSION = VERSION;
      arrayEach(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(methodName) {
        lodash2[methodName].placeholder = lodash2;
      });
      arrayEach(["drop", "take"], function(methodName, index) {
        LazyWrapper.prototype[methodName] = function(n) {
          n = n === undefined$1 ? 1 : nativeMax(toInteger(n), 0);
          var result2 = this.__filtered__ && !index ? new LazyWrapper(this) : this.clone();
          if (result2.__filtered__) {
            result2.__takeCount__ = nativeMin(n, result2.__takeCount__);
          } else {
            result2.__views__.push({
              "size": nativeMin(n, MAX_ARRAY_LENGTH),
              "type": methodName + (result2.__dir__ < 0 ? "Right" : "")
            });
          }
          return result2;
        };
        LazyWrapper.prototype[methodName + "Right"] = function(n) {
          return this.reverse()[methodName](n).reverse();
        };
      });
      arrayEach(["filter", "map", "takeWhile"], function(methodName, index) {
        var type = index + 1, isFilter = type == LAZY_FILTER_FLAG || type == LAZY_WHILE_FLAG;
        LazyWrapper.prototype[methodName] = function(iteratee2) {
          var result2 = this.clone();
          result2.__iteratees__.push({
            "iteratee": getIteratee(iteratee2, 3),
            "type": type
          });
          result2.__filtered__ = result2.__filtered__ || isFilter;
          return result2;
        };
      });
      arrayEach(["head", "last"], function(methodName, index) {
        var takeName = "take" + (index ? "Right" : "");
        LazyWrapper.prototype[methodName] = function() {
          return this[takeName](1).value()[0];
        };
      });
      arrayEach(["initial", "tail"], function(methodName, index) {
        var dropName = "drop" + (index ? "" : "Right");
        LazyWrapper.prototype[methodName] = function() {
          return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
        };
      });
      LazyWrapper.prototype.compact = function() {
        return this.filter(identity);
      };
      LazyWrapper.prototype.find = function(predicate) {
        return this.filter(predicate).head();
      };
      LazyWrapper.prototype.findLast = function(predicate) {
        return this.reverse().find(predicate);
      };
      LazyWrapper.prototype.invokeMap = baseRest(function(path, args) {
        if (typeof path == "function") {
          return new LazyWrapper(this);
        }
        return this.map(function(value) {
          return baseInvoke(value, path, args);
        });
      });
      LazyWrapper.prototype.reject = function(predicate) {
        return this.filter(negate(getIteratee(predicate)));
      };
      LazyWrapper.prototype.slice = function(start, end) {
        start = toInteger(start);
        var result2 = this;
        if (result2.__filtered__ && (start > 0 || end < 0)) {
          return new LazyWrapper(result2);
        }
        if (start < 0) {
          result2 = result2.takeRight(-start);
        } else if (start) {
          result2 = result2.drop(start);
        }
        if (end !== undefined$1) {
          end = toInteger(end);
          result2 = end < 0 ? result2.dropRight(-end) : result2.take(end - start);
        }
        return result2;
      };
      LazyWrapper.prototype.takeRightWhile = function(predicate) {
        return this.reverse().takeWhile(predicate).reverse();
      };
      LazyWrapper.prototype.toArray = function() {
        return this.take(MAX_ARRAY_LENGTH);
      };
      baseForOwn(LazyWrapper.prototype, function(func, methodName) {
        var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName), isTaker = /^(?:head|last)$/.test(methodName), lodashFunc = lodash2[isTaker ? "take" + (methodName == "last" ? "Right" : "") : methodName], retUnwrapped = isTaker || /^find/.test(methodName);
        if (!lodashFunc) {
          return;
        }
        lodash2.prototype[methodName] = function() {
          var value = this.__wrapped__, args = isTaker ? [1] : arguments, isLazy = value instanceof LazyWrapper, iteratee2 = args[0], useLazy = isLazy || isArray(value);
          var interceptor = function(value2) {
            var result3 = lodashFunc.apply(lodash2, arrayPush([value2], args));
            return isTaker && chainAll ? result3[0] : result3;
          };
          if (useLazy && checkIteratee && typeof iteratee2 == "function" && iteratee2.length != 1) {
            isLazy = useLazy = false;
          }
          var chainAll = this.__chain__, isHybrid = !!this.__actions__.length, isUnwrapped = retUnwrapped && !chainAll, onlyLazy = isLazy && !isHybrid;
          if (!retUnwrapped && useLazy) {
            value = onlyLazy ? value : new LazyWrapper(this);
            var result2 = func.apply(value, args);
            result2.__actions__.push({ "func": thru, "args": [interceptor], "thisArg": undefined$1 });
            return new LodashWrapper(result2, chainAll);
          }
          if (isUnwrapped && onlyLazy) {
            return func.apply(this, args);
          }
          result2 = this.thru(interceptor);
          return isUnwrapped ? isTaker ? result2.value()[0] : result2.value() : result2;
        };
      });
      arrayEach(["pop", "push", "shift", "sort", "splice", "unshift"], function(methodName) {
        var func = arrayProto[methodName], chainName = /^(?:push|sort|unshift)$/.test(methodName) ? "tap" : "thru", retUnwrapped = /^(?:pop|shift)$/.test(methodName);
        lodash2.prototype[methodName] = function() {
          var args = arguments;
          if (retUnwrapped && !this.__chain__) {
            var value = this.value();
            return func.apply(isArray(value) ? value : [], args);
          }
          return this[chainName](function(value2) {
            return func.apply(isArray(value2) ? value2 : [], args);
          });
        };
      });
      baseForOwn(LazyWrapper.prototype, function(func, methodName) {
        var lodashFunc = lodash2[methodName];
        if (lodashFunc) {
          var key = lodashFunc.name + "";
          if (!hasOwnProperty.call(realNames, key)) {
            realNames[key] = [];
          }
          realNames[key].push({ "name": methodName, "func": lodashFunc });
        }
      });
      realNames[createHybrid(undefined$1, WRAP_BIND_KEY_FLAG).name] = [{
        "name": "wrapper",
        "func": undefined$1
      }];
      LazyWrapper.prototype.clone = lazyClone;
      LazyWrapper.prototype.reverse = lazyReverse;
      LazyWrapper.prototype.value = lazyValue;
      lodash2.prototype.at = wrapperAt;
      lodash2.prototype.chain = wrapperChain;
      lodash2.prototype.commit = wrapperCommit;
      lodash2.prototype.next = wrapperNext;
      lodash2.prototype.plant = wrapperPlant;
      lodash2.prototype.reverse = wrapperReverse;
      lodash2.prototype.toJSON = lodash2.prototype.valueOf = lodash2.prototype.value = wrapperValue;
      lodash2.prototype.first = lodash2.prototype.head;
      if (symIterator) {
        lodash2.prototype[symIterator] = wrapperToIterator;
      }
      return lodash2;
    };
    var _2 = runInContext();
    if (freeModule) {
      (freeModule.exports = _2)._ = _2;
      freeExports._ = _2;
    } else {
      root._ = _2;
    }
  }).call(commonjsGlobal);
})(lodash, lodash.exports);
var lodashExports = lodash.exports;
const _ = /* @__PURE__ */ getDefaultExportFromCjs(lodashExports);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
const useAddressStore = defineStore("app.address", {
  state: () => {
    return {
      apiAction: "",
      // 部门人员树数据接口
      getImage: null,
      // 获取照片
      dataObj: [],
      // 树结构数据源
      dataNode: [],
      // 节点数据
      dataFilter: [],
      // 搜索过滤
      filterText: "",
      // 搜索关键字
      selectNodeId: "",
      // 当前节点id
      rootTitle: "全部",
      // 根节点标题
      breadcrumb: [],
      // 面包屑
      checkedMap: /* @__PURE__ */ new Map(),
      // 选中节点集合
      defaultCheckedKeys: []
      // 初始化默认选中ids
    };
  },
  getters: {
    /** 获取当前节点数据 */
    getDataNode: (state) => {
      if (state.selectNodeId) {
        const dataObj = state.dataNode.find((m) => m.id === state.selectNodeId);
        return dataObj.children;
      }
      if (state.filterText) {
        return state.dataFilter;
      }
      return state.dataObj;
    }
  },
  actions: {
    config(title, api, imageFunc) {
      this.rootTitle = title;
      this.apiAction = api;
      this.getImage = imageFunc;
    },
    init(parms, data, checkedKeys) {
      return __async(this, null, function* () {
        if (this.dataObj.length === 0) {
          this.breadcrumb = [{ id: "", title: this.rootTitle }];
          if (data && typeof data === Array) {
            this.dataObj = data;
          } else if (this.apiAction) {
            const result = yield this.apiAction(parms || {});
            this.dataObj = result || [];
          }
        }
        if (checkedKeys) {
          this.defaultCheckedKeys = Array.from(checkedKeys);
        }
        this.dataNode = [];
        resolveBreadcrumb(this, this.dataObj);
        resolveDefaultChecked(this);
      });
    },
    selectNode(node) {
      if (node.type !== 1) {
        this.selectNodeId = node.id;
        if (!node.breadcrumb) {
          const obj = this.dataNode.find((m) => m.id === node.id);
          node.breadcrumb = (obj == null ? void 0 : obj.breadcrumb) || [];
        }
        this.breadcrumb = [{ id: "", title: this.rootTitle }, ...node.breadcrumb];
        if (this.breadcrumb.length === 1 && this.filterText) {
          this.breadcrumb = [{ id: "", title: this.rootTitle }, { id: "", title: `包含“${this.filterText}”的搜索结果` }];
        }
      }
    },
    checked(node, multiple) {
      if (multiple) {
        resolveChecked(this, node);
        resolveParentChecked(this, node.parentId, node.checked);
      } else {
        resolveChecked2(this, node);
      }
      console.log("checkedMap :>> ", this.checkedMap);
    },
    filter(value) {
      this.filterText = value;
      this.dataFilter = [];
      this.selectNodeId = "";
      this.selectNode({ id: "", title: this.rootTitle });
      if (!value)
        return;
      this.dataNode.forEach((node) => {
        if (node.name.indexOf(value) !== -1) {
          this.dataFilter.push(node);
        }
      });
    },
    remove(node) {
      if (this.checkedMap.has(node.id)) {
        this.checkedMap.delete(node.id);
        resolveRemoveChecked(this, node.id);
        console.log("node :>> ", node);
      }
    }
  }
});
const resolveBreadcrumb = (state, data, parent) => {
  data.forEach((m) => {
    m.breadcrumb = [];
    if (parent) {
      m.breadcrumb = m.breadcrumb.concat(parent.breadcrumb);
    }
    state.dataNode.push(m);
    if (m.type !== 1) {
      m.breadcrumb.push({
        id: m.id,
        title: m.name
      });
    }
    if (m.children) {
      resolveBreadcrumb(state, m.children, m);
    }
  });
};
const resolveChecked = (state, node) => {
  if (node.checked) {
    node.checkedAll = true;
    const { id, name: name2, type, photo, checked, checkedAll, breadcrumb } = node;
    const parent = breadcrumb.map((v) => {
      return { id: v.id, title: v.title };
    });
    state.checkedMap.set(node.id, { id, name: name2, type, photo, checked, checkedAll, parent });
    node.children.forEach((m) => {
      m.checked = true;
      resolveChecked(state, m);
    });
  } else {
    if (state.checkedMap.has(node.id)) {
      state.checkedMap.delete(node.id);
    }
    node.checkedAll = false;
    node.children.forEach((m) => {
      m.checked = false;
      resolveChecked(state, m);
    });
  }
};
const resolveChecked2 = (state, node) => {
  if (node.checked) {
    state.dataNode.forEach((node2) => {
      node2.checked = false;
    });
    state.checkedMap.clear();
    node.checked = true;
    const { id, name: name2, type, photo, checked, checkedAll, breadcrumb } = node;
    const parent = breadcrumb.map((v) => {
      return { id: v.id, title: v.title };
    });
    state.checkedMap.set(node.id, { id, name: name2, type, photo, checked, checkedAll, parent });
  } else {
    if (state.checkedMap.has(node.id)) {
      state.checkedMap.delete(node.id);
    }
  }
};
const resolveParentChecked = (state, parentId, isChecked) => {
  if (parentId) {
    const parentNode = state.dataNode.find((m) => m.id === parentId);
    if (parentNode) {
      if (isChecked) {
        parentNode.checked = true;
      } else {
        parentNode.checked = parentNode.children.some((v) => v.checked);
      }
      parentNode.checkedAll = !parentNode.children.some((v) => !v.checked || !v.checkedAll);
      const { id, name: name2, type, photo, checked, checkedAll, breadcrumb } = parentNode;
      const parent = breadcrumb.map((v) => {
        return { id: v.id, title: v.title };
      });
      state.checkedMap.set(parentNode.id, { id, name: name2, type, photo, checked, checkedAll, parent });
      resolveParentChecked(state, parentNode.parentId, isChecked);
    }
  }
};
const resolveDefaultChecked = (state) => {
  state.dataNode.forEach((node) => {
    node.checked = false;
    node.checkedAll = false;
  });
  state.checkedMap.clear();
  const filter = state.dataNode.filter((e) => e.type === 1 && state.defaultCheckedKeys.includes(e.id));
  filter.forEach((node) => {
    node.checked = true;
    node.checkedAll = true;
    const { id, name: name2, type, photo, checked, checkedAll, breadcrumb } = node;
    const parent = breadcrumb.map((v) => {
      return { id: v.id, title: v.title };
    });
    state.checkedMap.set(node.id, { id, name: name2, type, photo, checked, checkedAll, parent });
    resolveParentChecked(state, node.parentId, true);
  });
};
const resolveRemoveChecked = (state, nodeId) => {
  if (nodeId) {
    const node = state.dataNode.find((m) => m.id === nodeId);
    if (node) {
      node.checked = false;
      node.checkedAll = true;
      resolveParentChecked(state, node.parentId, false);
    }
  }
};
const addressProps = {
  /** 隐藏左下角已选择区域 */
  hideSelect: {
    type: Boolean,
    default: false
  },
  /** 粘性布局，使用粘性布局时，滚动到顶部时会自动吸顶 */
  sticky: {
    type: Boolean,
    default: false
  },
  /** 是否多选，开启多选时支持批量选择操作 */
  multiple: {
    type: Boolean,
    default: false
  },
  /** 节点图标 */
  icon: {
    type: String,
    default: "https://unpkg.com/vant-common@0.2.0-beta.14/assets/mobile-school.png"
  },
  /** 叶子节点图标 */
  leafIcon: {
    type: String,
    default: "https://unpkg.com/vant-common@0.2.0-beta.14/assets/mobile-init-image.png"
  },
  /** 列表数据空文案 */
  emptyMsg: {
    type: String,
    default: "暂无成员"
  },
  /** 列表数据空图片 */
  emptyImage: {
    type: String,
    default: "https://unpkg.com/vant-common@0.2.0-beta.14/assets/mobile-nodata.png"
  },
  /** 图片大小 */
  imageSize: [Number, String, Array],
  /** 搜索列表空文案 */
  filterMsg: {
    type: String,
    default: "请输入部门名称/用户姓名搜索"
  },
  /** 已选择对象后缀 */
  suffixText: {
    type: String,
    default: "人"
  }
};
const name$f = "m-address";
const __vue_sfc__$f = /* @__PURE__ */ Object.assign({ name: name$f }, {
  __name: "index",
  props: addressProps,
  emits: ["onSave"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const addressStore = useAddressStore();
    const emit = __emit;
    const props = __props;
    const { hideSelect, sticky, multiple, icon, leafIcon, emptyMsg, emptyImage, imageSize, filterMsg, suffixText } = props;
    const filterText = vue.ref("");
    const emptyText = vue.computed(() => {
      if (filterText.value)
        return filterMsg || "请输入部门名称/用户姓名搜索";
      return emptyMsg || "暂无成员";
    });
    const disabled = vue.ref(false);
    const loading = vue.ref(true);
    const container = vue.ref(null);
    const getImage = vue.computed(() => addressStore.getImage);
    vue.watch(filterText, (val) => {
      addressStore.filter(val);
    });
    const initOptions = {
      rootTitle: "全部",
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
    const dataNode = vue.computed(() => addressStore.getDataNode);
    const breadcrumbNode = vue.computed(() => addressStore.breadcrumb);
    const checkedUsers = vue.computed(() => {
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
    const __returned__ = { addressStore, name: name$f, emit, props, hideSelect, sticky, multiple, icon, leafIcon, emptyMsg, emptyImage, imageSize, filterMsg, suffixText, filterText, emptyText, disabled, loading, container, getImage, initOptions, reload, dataNode, breadcrumbNode, checkedUsers, onClick, onChangeChecked, onSave, get _() {
      return _;
    }, ref: vue.ref, computed: vue.computed, watch: vue.watch, get useAddressStore() {
      return useAddressStore;
    }, get addressProps() {
      return addressProps;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _withScopeId$2 = (n) => (vue.pushScopeId(""), n = n(), vue.popScopeId(), n);
const _hoisted_1$9 = {
  ref: "container",
  class: "m-address"
};
const _hoisted_2$6 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ vue.createElementVNode(
  "div",
  { class: "gray-divider" },
  null,
  -1
  /* HOISTED */
));
const _hoisted_3$6 = { class: "m-address-breadcrumb" };
const _hoisted_4$4 = ["onClick"];
const _hoisted_5$3 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ vue.createElementVNode(
  "i",
  null,
  ">",
  -1
  /* HOISTED */
));
const _hoisted_6$3 = {
  key: 1,
  class: "m-address-breadcrumb__label"
};
const _hoisted_7$3 = { class: "m-address-list" };
const _hoisted_8$2 = { class: "label" };
const _hoisted_9$1 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ vue.createElementVNode(
  "div",
  { class: "right" },
  null,
  -1
  /* HOISTED */
));
const _hoisted_10$1 = { key: 1 };
const _hoisted_11$1 = ["onClick"];
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
function __vue_render__$f(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_van_icon = vue.resolveComponent("van-icon");
  const _component_van_search = vue.resolveComponent("van-search");
  const _component_van_sticky = vue.resolveComponent("van-sticky");
  const _component_van_checkbox = vue.resolveComponent("van-checkbox");
  const _component_lazy_component = vue.resolveComponent("lazy-component");
  const _component_van_loading = vue.resolveComponent("van-loading");
  const _component_van_empty = vue.resolveComponent("van-empty");
  const _component_router_link = vue.resolveComponent("router-link");
  const _component_van_button = vue.resolveComponent("van-button");
  const _directive_lazy = vue.resolveDirective("lazy");
  return vue.openBlock(), vue.createElementBlock(
    "div",
    _hoisted_1$9,
    [
      vue.createVNode(_component_van_sticky, {
        container: $setup.container,
        position: $setup.sticky ? "top" : "bottom"
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(_component_van_search, {
            modelValue: $setup.filterText,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.filterText = $event),
            "show-action": $setup.filterText.length > 0,
            placeholder: "搜索",
            shape: "round"
          }, {
            "left-icon": vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "search-icon", {}, () => [
                vue.createVNode(_component_van_icon, { name: "search" })
              ])
            ]),
            _: 3
            /* FORWARDED */
          }, 8, ["modelValue", "show-action"]),
          _hoisted_2$6,
          vue.createElementVNode("div", _hoisted_3$6, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.breadcrumbNode, (item, index) => {
                return vue.openBlock(), vue.createElementBlock(
                  vue.Fragment,
                  { key: index },
                  [
                    index < $setup.breadcrumbNode.length - 1 ? (vue.openBlock(), vue.createElementBlock("span", {
                      key: 0,
                      class: "m-address-breadcrumb__title",
                      onClick: ($event) => $setup.onClick(item)
                    }, [
                      vue.createTextVNode(
                        vue.toDisplayString(item.title),
                        1
                        /* TEXT */
                      ),
                      _hoisted_5$3
                    ], 8, _hoisted_4$4)) : (vue.openBlock(), vue.createElementBlock(
                      "span",
                      _hoisted_6$3,
                      vue.toDisplayString(item.title),
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
      vue.createElementVNode("div", _hoisted_7$3, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($setup.dataNode, (item, index) => {
            return vue.openBlock(), vue.createBlock(
              _component_lazy_component,
              {
                key: index,
                class: "m-address-cell"
              },
              {
                default: vue.withCtx(() => [
                  item.type === 1 ? (vue.openBlock(), vue.createElementBlock(
                    vue.Fragment,
                    { key: 0 },
                    [
                      vue.createVNode(_component_van_checkbox, {
                        modelValue: item.checked,
                        "onUpdate:modelValue": ($event) => item.checked = $event,
                        name: item.id,
                        onClick: ($event) => $setup.onChangeChecked(item)
                      }, {
                        icon: vue.withCtx(() => [
                          vue.createVNode(_component_van_icon, {
                            class: vue.normalizeClass({ checked: item.checked }),
                            name: "success"
                          }, null, 8, ["class"])
                        ]),
                        _: 2
                        /* DYNAMIC */
                      }, 1032, ["modelValue", "onUpdate:modelValue", "name", "onClick"]),
                      vue.createElementVNode("div", _hoisted_8$2, [
                        vue.withDirectives(vue.createElementVNode(
                          "img",
                          null,
                          null,
                          512
                          /* NEED_PATCH */
                        ), [
                          [_directive_lazy, item.photo ? $setup.getImage(item.photo) : $setup.leafIcon]
                        ]),
                        vue.createElementVNode(
                          "span",
                          null,
                          vue.toDisplayString(item.name),
                          1
                          /* TEXT */
                        )
                      ]),
                      _hoisted_9$1
                    ],
                    64
                    /* STABLE_FRAGMENT */
                  )) : (vue.openBlock(), vue.createElementBlock(
                    vue.Fragment,
                    { key: 1 },
                    [
                      $setup.multiple ? (vue.openBlock(), vue.createBlock(_component_van_checkbox, {
                        key: 0,
                        modelValue: item.checked,
                        "onUpdate:modelValue": ($event) => item.checked = $event,
                        name: item.id,
                        onClick: ($event) => $setup.onChangeChecked(item)
                      }, {
                        icon: vue.withCtx(() => [
                          vue.createVNode(_component_van_icon, {
                            class: vue.normalizeClass({ checked: item.checked }),
                            name: item.checkedAll ? "success" : "minus"
                          }, null, 8, ["class", "name"])
                        ]),
                        _: 2
                        /* DYNAMIC */
                      }, 1032, ["modelValue", "onUpdate:modelValue", "name", "onClick"])) : vue.createCommentVNode("v-if", true),
                      $setup.icon ? vue.withDirectives((vue.openBlock(), vue.createElementBlock(
                        "img",
                        _hoisted_10$1,
                        null,
                        512
                        /* NEED_PATCH */
                      )), [
                        [_directive_lazy, $setup.icon]
                      ]) : vue.createCommentVNode("v-if", true),
                      vue.createElementVNode("div", {
                        class: "label",
                        onClick: ($event) => $setup.onClick(item)
                      }, [
                        vue.createElementVNode(
                          "span",
                          null,
                          vue.toDisplayString(item.name),
                          1
                          /* TEXT */
                        )
                      ], 8, _hoisted_11$1),
                      vue.createElementVNode("div", {
                        class: "right",
                        onClick: ($event) => $setup.onClick(item)
                      }, [
                        item.breadcrumb ? (vue.openBlock(), vue.createElementBlock("i", _hoisted_13)) : vue.createCommentVNode("v-if", true)
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
        $setup.loading && $setup.dataNode.length === 0 ? (vue.openBlock(), vue.createBlock(_component_van_loading, {
          key: 0,
          size: "24px",
          vertical: ""
        }, {
          default: vue.withCtx(() => [
            vue.createTextVNode("加载中...")
          ]),
          _: 1
          /* STABLE */
        })) : vue.createCommentVNode("v-if", true),
        !$setup.loading && $setup.dataNode.length === 0 ? (vue.openBlock(), vue.createBlock(_component_van_empty, {
          key: 1,
          image: $setup.emptyImage,
          "image-size": $setup.imageSize,
          description: $setup.emptyText
        }, null, 8, ["image", "image-size", "description"])) : vue.createCommentVNode("v-if", true)
      ]),
      vue.createElementVNode("div", _hoisted_14, [
        vue.createElementVNode("div", _hoisted_15, [
          vue.createElementVNode("div", _hoisted_16, [
            !$setup.hideSelect && $setup.multiple ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_17, [
              vue.createTextVNode(" 已选择： "),
              vue.createVNode(_component_router_link, { to: "?page=select" }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode(
                    vue.toDisplayString($setup.checkedUsers.length) + " " + vue.toDisplayString($setup.suffixText) + " ",
                    1
                    /* TEXT */
                  ),
                  vue.createVNode(_component_van_icon, {
                    name: "arrow-up",
                    class: "blue"
                  })
                ]),
                _: 1
                /* STABLE */
              })
            ])) : vue.createCommentVNode("v-if", true),
            vue.createVNode(_component_van_button, {
              type: "primary",
              disabled: $setup.disabled,
              block: "",
              round: "",
              onClick: $setup.onSave
            }, {
              default: vue.withCtx(() => [
                vue.createTextVNode("确定")
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
__vue_sfc__$f.render = __vue_render__$f;
var stdin_default$g = __vue_sfc__$f;
const name$e = "m-address-select";
const __vue_sfc__$e = /* @__PURE__ */ Object.assign({ name: name$e }, {
  __name: "index",
  props: addressProps,
  setup(__props, { expose: __expose }) {
    __expose();
    const addressStore = useAddressStore();
    const getImage = vue.computed(() => addressStore.getImage);
    const checkedUsers = vue.computed(() => {
      const nodes = Array.from(addressStore.checkedMap.values());
      return nodes.filter((m) => m.type === 1);
    });
    const onRemove = (node) => {
      addressStore.remove(node);
    };
    const __returned__ = { addressStore, name: name$e, getImage, checkedUsers, onRemove, computed: vue.computed, get useAddressStore() {
      return useAddressStore;
    }, get addressProps() {
      return addressProps;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
const _withScopeId$1 = (n) => (vue.pushScopeId(""), n = n(), vue.popScopeId(), n);
const _hoisted_1$8 = { class: "m-address" };
const _hoisted_2$5 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ vue.createElementVNode(
  "div",
  { class: "gray-divider" },
  null,
  -1
  /* HOISTED */
));
const _hoisted_3$5 = { class: "m-address-select-list van-safe-area-bottom" };
const _hoisted_4$3 = { class: "label" };
const _hoisted_5$2 = { class: "right" };
const _hoisted_6$2 = ["onClick"];
const _hoisted_7$2 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ vue.createElementVNode(
  "i",
  { class: "van-badge__wrapper van-icon van-icon-minus remove" },
  null,
  -1
  /* HOISTED */
));
const _hoisted_8$1 = [
  _hoisted_7$2
];
function __vue_render__$e(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_lazy_component = vue.resolveComponent("lazy-component");
  const _component_van_empty = vue.resolveComponent("van-empty");
  const _directive_lazy = vue.resolveDirective("lazy");
  return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$8, [
    _hoisted_2$5,
    vue.createElementVNode("div", _hoisted_3$5, [
      (vue.openBlock(true), vue.createElementBlock(
        vue.Fragment,
        null,
        vue.renderList($setup.checkedUsers, (item, index) => {
          return vue.openBlock(), vue.createBlock(
            _component_lazy_component,
            {
              key: index,
              class: "m-address-cell"
            },
            {
              default: vue.withCtx(() => [
                vue.createElementVNode("div", _hoisted_4$3, [
                  vue.withDirectives(vue.createElementVNode(
                    "img",
                    null,
                    null,
                    512
                    /* NEED_PATCH */
                  ), [
                    [_directive_lazy, item.photo ? $setup.getImage(item.photo) : _ctx.leafIcon]
                  ]),
                  vue.createElementVNode(
                    "span",
                    null,
                    vue.toDisplayString(item.name),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("div", _hoisted_5$2, [
                  vue.createElementVNode("div", {
                    class: "van-checkbox__icon van-checkbox__icon--round van-checkbox__icon--checked",
                    onClick: ($event) => $setup.onRemove(item)
                  }, [..._hoisted_8$1], 8, _hoisted_6$2)
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
      $setup.checkedUsers.length === 0 ? (vue.openBlock(), vue.createBlock(_component_van_empty, {
        key: 0,
        image: _ctx.emptyImage,
        "image-size": _ctx.imageSize,
        description: _ctx.emptyMsg
      }, null, 8, ["image", "image-size", "description"])) : vue.createCommentVNode("v-if", true)
    ])
  ]);
}
__vue_sfc__$e.render = __vue_render__$e;
var stdin_default$f = __vue_sfc__$e;
const name$d = "m-popup";
const POPUP_KEY = Symbol(name$d);
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
    default: "取消"
  },
  /** 底部左侧按钮回调函数  */
  cancelFunc: {
    type: Function,
    default: null
  },
  /** 底部右侧按钮  */
  confirmText: {
    type: String,
    default: "确认"
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
const __vue_sfc__$d = vue.defineComponent({
  name: name$d,
  props: popupProps,
  emits: [],
  setup(props) {
    const { linkChildren } = use.useChildren(POPUP_KEY);
    const visible = vue.ref(false);
    const checked = vue.ref(null);
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
const _hoisted_1$7 = { class: "m-popup" };
const _hoisted_2$4 = {
  key: 0,
  class: "m-popup-header"
};
const _hoisted_3$4 = {
  key: 0,
  class: "left"
};
const _hoisted_4$2 = { class: "title" };
const _hoisted_5$1 = { class: "right" };
const _hoisted_6$1 = { class: "m-popup-content" };
const _hoisted_7$1 = {
  key: 1,
  class: "m-popup-footer"
};
function __vue_render__$d(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_van_icon = vue.resolveComponent("van-icon");
  const _component_van_popup = vue.resolveComponent("van-popup");
  return vue.openBlock(), vue.createBlock(_component_van_popup, {
    show: _ctx.visible,
    "onUpdate:show": _cache[2] || (_cache[2] = ($event) => _ctx.visible = $event),
    round: _ctx.round,
    "safe-area-inset-bottom": "",
    position: "bottom"
  }, {
    default: vue.withCtx(() => [
      vue.createElementVNode("div", _hoisted_1$7, [
        _ctx.header ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2$4, [
          _ctx.leftIcon ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_3$4, [
            vue.createVNode(_component_van_icon, {
              name: _ctx.leftIcon,
              onClick: _ctx.onBack
            }, null, 8, ["name", "onClick"])
          ])) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode(
            "div",
            _hoisted_4$2,
            vue.toDisplayString(_ctx.title),
            1
            /* TEXT */
          ),
          vue.createElementVNode("div", _hoisted_5$1, [
            vue.renderSlot(_ctx.$slots, "header-right", {}, () => [
              vue.createVNode(_component_van_icon, {
                name: "cross",
                onClick: _ctx.close
              }, null, 8, ["onClick"])
            ])
          ])
        ])) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode("div", _hoisted_6$1, [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _ctx.footer ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_7$1, [
          vue.renderSlot(_ctx.$slots, "footer", {}, () => [
            _ctx.cancelText ? (vue.openBlock(), vue.createElementBlock(
              "div",
              {
                key: 0,
                class: "btn cancel",
                onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onCancel && _ctx.onCancel(...args))
              },
              vue.toDisplayString(_ctx.cancelText),
              1
              /* TEXT */
            )) : vue.createCommentVNode("v-if", true),
            _ctx.confirmText ? (vue.openBlock(), vue.createElementBlock(
              "div",
              {
                key: 1,
                class: "btn confirm",
                onClick: _cache[1] || (_cache[1] = (...args) => _ctx.onConfirm && _ctx.onConfirm(...args))
              },
              vue.toDisplayString(_ctx.confirmText),
              1
              /* TEXT */
            )) : vue.createCommentVNode("v-if", true)
          ])
        ])) : vue.createCommentVNode("v-if", true)
      ])
    ]),
    _: 3
    /* FORWARDED */
  }, 8, ["show", "round"]);
}
__vue_sfc__$d.render = __vue_render__$d;
var stdin_default$e = __vue_sfc__$d;
const name$c = "m-form-checkbox";
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
const __vue_sfc__$c = vue.defineComponent({
  name: name$c,
  props: formCheckboxProps,
  emits: ["change"],
  setup(props, { emit }) {
    const { parent } = use.useParent(POPUP_KEY);
    const checkedAll = vue.ref(false);
    const checkedGroup = vue.ref([]);
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
    vue.onMounted(() => {
      vue.nextTick(() => {
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
const _hoisted_1$6 = { class: "m-form-checkbox" };
const _hoisted_2$3 = {
  key: 0,
  class: "m-form-checkbox-content__toolbar"
};
const _hoisted_3$3 = { class: "title" };
function __vue_render__$c(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_van_checkbox = vue.resolveComponent("van-checkbox");
  const _component_van_checkbox_group = vue.resolveComponent("van-checkbox-group");
  return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$6, [
    _ctx.toolbar ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2$3, [
      vue.createElementVNode(
        "div",
        _hoisted_3$3,
        vue.toDisplayString(_ctx.toolbarTitle),
        1
        /* TEXT */
      ),
      vue.createElementVNode("div", null, [
        vue.createVNode(_component_van_checkbox, {
          modelValue: _ctx.checkedAll,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.checkedAll = $event),
          onChange: _ctx.onChageAll
        }, {
          default: vue.withCtx(() => [
            vue.createTextVNode("全选")
          ]),
          _: 1
          /* STABLE */
        }, 8, ["modelValue", "onChange"])
      ])
    ])) : vue.createCommentVNode("v-if", true),
    vue.createVNode(_component_van_checkbox_group, {
      modelValue: _ctx.checkedGroup,
      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.checkedGroup = $event),
      direction: "horizontal",
      onChange: _ctx.onChage
    }, {
      default: vue.withCtx(() => [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList(_ctx.columns, (item, i) => {
            return vue.openBlock(), vue.createElementBlock(
              "div",
              {
                key: i,
                class: vue.normalizeClass(["m-form-checkbox-content__item", {
                  "m-form-checkbox-content__item--checked": _ctx.checkedGroup.includes(
                    item.value
                  )
                }])
              },
              [
                vue.createVNode(_component_van_checkbox, {
                  name: item.value
                }, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode(
                      vue.toDisplayString(item.label),
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
__vue_sfc__$c.render = __vue_render__$c;
var stdin_default$d = __vue_sfc__$c;
const name$b = "m-page-container";
const PAGE_KEY = Symbol(name$b);
const __vue_sfc__$b = vue.defineComponent({
  name: name$b,
  props: {
    background: String,
    minHeight: {
      type: String,
      default: "100%"
    }
  },
  emits: [],
  setup() {
    const rootRef = vue.ref();
    const { linkChildren } = use.useChildren(PAGE_KEY);
    const headerHeight = vue.ref(0);
    const setHeight = (value) => {
      headerHeight.value = value;
    };
    linkChildren({
      headerHeight,
      setHeight
    });
    return {
      rootRef
    };
  }
});
function __vue_render__$b(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      ref: "rootRef",
      class: "m-page-container",
      style: vue.normalizeStyle({ background: _ctx.background, minHeight: _ctx.minHeight })
    },
    [
      vue.renderSlot(_ctx.$slots, "default")
    ],
    4
    /* STYLE */
  );
}
__vue_sfc__$b.render = __vue_render__$b;
var stdin_default$c = __vue_sfc__$b;
const name$a = "m-header";
const HEADER_KEY = Symbol(name$a);
const headerProps = {
  /** 指定header高度 */
  height: {
    type: [String, Number],
    default: null
  }
};
const __vue_sfc__$a = vue.defineComponent({
  name: name$a,
  props: headerProps,
  emits: ["onResize"],
  setup(props, { emit, slots }) {
    const { linkChildren } = use.useChildren(HEADER_KEY);
    const { parent } = use.useParent(PAGE_KEY);
    const offsetHeight = vue.ref(46);
    const headerRef = vue.ref();
    const isSlotsLoaded = vue.computed(
      () => slots.default && slots.default().length > 0
    );
    const styleObj = vue.computed(() => {
      let style = "";
      if (props.height) {
        if (typeof props.height === "number") {
          style = `height: ${props.height}px;`;
        } else {
          style = `height: ${props.height};`;
        }
      } else {
        if (offsetHeight.value > 0) {
          style = `height: ${offsetHeight.value}px;`;
        }
      }
      return style;
    });
    const setHeight = (val) => {
      if (parent) {
        parent.setHeight(val);
      }
    };
    const resize = () => {
      vue.nextTick(() => {
        var _a;
        offsetHeight.value = (_a = headerRef.value) == null ? void 0 : _a.offsetHeight;
        setHeight(offsetHeight.value);
        emit("onResize", offsetHeight.value);
      });
    };
    linkChildren({
      resize
    });
    vue.onMounted(() => {
      if (!props.height) {
        vue.nextTick(() => {
          setTimeout(() => {
            const rect = use.useRect(headerRef);
            offsetHeight.value = rect.height;
            setHeight(rect.height);
          }, 50);
        });
      }
    });
    return {
      isSlotsLoaded,
      styleObj,
      headerRef,
      resize
    };
  }
});
const _hoisted_1$5 = {
  ref: "headerRef",
  class: "m-header--fixed"
};
function __vue_render__$a(_ctx, _cache, $props, $setup, $data, $options) {
  return _ctx.isSlotsLoaded ? (vue.openBlock(), vue.createElementBlock(
    "div",
    {
      key: 0,
      class: "m-header",
      style: vue.normalizeStyle(_ctx.styleObj)
    },
    [
      vue.createElementVNode(
        "div",
        _hoisted_1$5,
        [
          vue.renderSlot(_ctx.$slots, "default")
        ],
        512
        /* NEED_PATCH */
      )
    ],
    4
    /* STYLE */
  )) : vue.createCommentVNode("v-if", true);
}
__vue_sfc__$a.render = __vue_render__$a;
var stdin_default$b = __vue_sfc__$a;
const listProps = {
  /** 滚动条与底部距离小于 offset 时触发load事件 */
  offset: { type: Number, default: 250 },
  /** 下拉过程提示文案 */
  pullingText: { type: String, default: "下拉即可刷新..." },
  /** 释放过程提示文案 */
  loosingText: { type: String, default: "释放即可刷新..." },
  /** 加载过程提示文案 */
  loadingText: { type: String, default: "加载中..." },
  /** 刷新成功提示文案 */
  successText: { type: String, default: "刷新成功" },
  /** 刷新成功提示展示时长(ms) */
  successDuration: { type: Number, default: 1e3 },
  /** 暂无数据的提示文案 */
  emptyText: { type: String, default: "暂无数据" },
  /** 没有更多了的提示文案 */
  nomoreText: { type: String, default: "没有更多了" },
  /** 滚动触发加载的方向，可选值为up */
  direction: { type: String, default: "down" },
  /** 暂无数据时显示图片 */
  image: { type: String, default: "" },
  /** 图片大小 */
  imageSize: [Number, String, Array],
  /** 默认分页大小 */
  pageSize: { type: Number, default: 10 },
  /** 查询方法 */
  queryMethod: { type: Function, default: null },
  /** 查询参数模型 */
  queryModel: { type: Object, default: null },
  /** 格式化数据 */
  formatter: { type: Function, default: null },
  /** 过滤显示数据 */
  filter: { type: Function, default: null },
  /** 分组字段 */
  groupBy: { type: [String, Function], default: "" },
  /** 是否禁用下拉刷新 */
  disabled: { type: Boolean, default: false }
};
var __defProp$2 = Object.defineProperty;
var __defProps$2 = Object.defineProperties;
var __getOwnPropDescs$2 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$2 = Object.getOwnPropertySymbols;
var __hasOwnProp$2 = Object.prototype.hasOwnProperty;
var __propIsEnum$2 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$2 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$2.call(b, prop))
      __defNormalProp$2(a, prop, b[prop]);
  if (__getOwnPropSymbols$2)
    for (var prop of __getOwnPropSymbols$2(b)) {
      if (__propIsEnum$2.call(b, prop))
        __defNormalProp$2(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$2 = (a, b) => __defProps$2(a, __getOwnPropDescs$2(b));
const name$9 = "m-list";
const LIST_KEY = Symbol(name$9);
const __vue_sfc__$9 = vue.defineComponent({
  name: name$9,
  props: listProps,
  emits: ["click"],
  setup(props, { emit }) {
    const { linkChildren } = use.useChildren(LIST_KEY);
    const { parent } = use.useParent(PAGE_KEY);
    const loading = vue.ref(false);
    const errorCount = vue.ref(0);
    const offsetTop = vue.ref(0);
    if (parent) {
      vue.watch(parent.headerHeight, (value) => {
        offsetTop.value = value;
      });
    }
    const state = vue.reactive({
      finished: false,
      refreshing: false,
      pageIndex: 1,
      list: []
    });
    const finishedText = vue.computed(() => {
      if (formatList.value.length === 0 && state.finished) {
        return props.emptyText;
      }
      return props.nomoreText;
    });
    const showImage = vue.computed(() => {
      if (props.image && finishedText.value === props.emptyText) {
        return true;
      }
      return false;
    });
    const formatList = vue.computed(() => {
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
    vue.watch(
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
    return __spreadProps$2(__spreadValues$2({
      loading,
      offsetTop,
      finishedText,
      showImage,
      formatList
    }, vue.toRefs(state)), {
      onRefresh,
      onLoad
    });
  }
});
const _hoisted_1$4 = { class: "m-list-header" };
function __vue_render__$9(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_van_sticky = vue.resolveComponent("van-sticky");
  const _component_van_empty = vue.resolveComponent("van-empty");
  const _component_van_list = vue.resolveComponent("van-list");
  const _component_van_pull_refresh = vue.resolveComponent("van-pull-refresh");
  return vue.openBlock(), vue.createBlock(_component_van_pull_refresh, {
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
    default: vue.withCtx(() => [
      vue.createElementVNode("div", _hoisted_1$4, [
        vue.createVNode(_component_van_sticky, { "offset-top": _ctx.offsetTop }, {
          default: vue.withCtx(() => [
            vue.renderSlot(_ctx.$slots, "sticky-header")
          ]),
          _: 3
          /* FORWARDED */
        }, 8, ["offset-top"]),
        vue.renderSlot(_ctx.$slots, "header")
      ]),
      vue.createVNode(_component_van_list, {
        class: "m-list",
        loading: _ctx.loading,
        "onUpdate:loading": _cache[0] || (_cache[0] = ($event) => _ctx.loading = $event),
        finished: _ctx.finished,
        offset: _ctx.offset,
        "finished-text": _ctx.finishedText,
        "loading-text": _ctx.loadingText,
        onLoad: _ctx.onLoad
      }, {
        default: vue.withCtx(() => [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList(_ctx.formatList, (item, index) => {
              return vue.renderSlot(_ctx.$slots, "default", { key: index });
            }),
            128
            /* KEYED_FRAGMENT */
          )),
          _ctx.showImage ? (vue.openBlock(), vue.createBlock(_component_van_empty, {
            key: 0,
            image: _ctx.image,
            "image-size": _ctx.imageSize
          }, null, 8, ["image", "image-size"])) : vue.createCommentVNode("v-if", true)
        ]),
        _: 3
        /* FORWARDED */
      }, 8, ["loading", "finished", "offset", "finished-text", "loading-text", "onLoad"])
    ]),
    _: 3
    /* FORWARDED */
  }, 8, ["modelValue", "onRefresh", "pulling-text", "loosing-text", "loading-text", "success-text", "success-duration", "disabled"]);
}
__vue_sfc__$9.render = __vue_render__$9;
var stdin_default$a = __vue_sfc__$9;
const name$8 = "m-list-card";
const listCardProps = {
  /** 右上角图标 */
  rightIcon: String,
  /** 右上角文字 */
  rightText: String,
  /** 类名前缀，用于使用自定义图标 */
  classPrefix: String,
  /** 标题文字 */
  title: String,
  /** 标签文字 */
  label: String,
  /** 正文 */
  content: String,
  /** 底部左边文字 */
  toolbarLeft: String,
  /** 正文样式 */
  contentClass: {
    type: String,
    default: "van-multi-ellipsis--l2"
  },
  /** 底部右边字体颜色 */
  toolbarRightColor: String
};
const __vue_sfc__$8 = vue.defineComponent({
  name: name$8,
  props: listCardProps,
  emits: ["click", "header-icon", "toolbar-right"],
  setup(props, { emit, slots }) {
    const isShowToolbar = vue.computed(
      () => props.toolbarLeft || slots["toolbar-left"] || slots["toolbar-right"]
    );
    const toolbarRightStyle = vue.computed(() => {
      if (props.toolbarRightColor) {
        const style = {
          color: props.toolbarRightColor
        };
        return style;
      }
      return "";
    });
    const onClick = (event) => {
      emit("click", event);
    };
    const onHeaderIcon = (event) => {
      emit("header-icon", event);
    };
    const onToolbarRight = (event) => {
      emit("toolbar-right", event);
    };
    return {
      isShowToolbar,
      toolbarRightStyle,
      onClick,
      onHeaderIcon,
      onToolbarRight
    };
  }
});
const _hoisted_1$3 = { class: "m-list--card__left" };
const _hoisted_2$2 = { class: "m-list--card__box" };
const _hoisted_3$2 = { class: "m-list--card__header" };
const _hoisted_4$1 = { class: "left" };
const _hoisted_5 = { class: "header-title van-ellipsis" };
const _hoisted_6 = { class: "header-label" };
const _hoisted_7 = { class: "right" };
const _hoisted_8 = { class: "label" };
const _hoisted_9 = {
  key: 0,
  class: "m-list--card__toolbar"
};
const _hoisted_10 = { class: "toolbar-left" };
const _hoisted_11 = { class: "toolbar-left__span" };
function __vue_render__$8(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_van_icon = vue.resolveComponent("van-icon");
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      class: vue.normalizeClass(["m-list--card", [{ "show-toobar__line": _ctx.isShowToolbar }]]),
      onClick: _cache[2] || (_cache[2] = (...args) => _ctx.onClick && _ctx.onClick(...args))
    },
    [
      vue.createElementVNode("div", _hoisted_1$3, [
        vue.renderSlot(_ctx.$slots, "avatar")
      ]),
      vue.createElementVNode("div", _hoisted_2$2, [
        vue.createElementVNode("div", _hoisted_3$2, [
          vue.createElementVNode("div", _hoisted_4$1, [
            vue.createElementVNode(
              "div",
              _hoisted_5,
              vue.toDisplayString(_ctx.title),
              1
              /* TEXT */
            ),
            vue.createElementVNode("div", _hoisted_6, [
              vue.renderSlot(_ctx.$slots, "label", {}, () => [
                vue.createTextVNode(
                  vue.toDisplayString(_ctx.label),
                  1
                  /* TEXT */
                )
              ])
            ])
          ]),
          vue.createElementVNode("div", _hoisted_7, [
            vue.renderSlot(_ctx.$slots, "right", {}, () => [
              vue.createElementVNode("div", {
                class: "header-icon",
                onClick: _cache[0] || (_cache[0] = vue.withModifiers((...args) => _ctx.onHeaderIcon && _ctx.onHeaderIcon(...args), ["stop"]))
              }, [
                vue.createVNode(_component_van_icon, {
                  name: _ctx.rightIcon,
                  "class-prefix": _ctx.classPrefix
                }, null, 8, ["name", "class-prefix"]),
                vue.createElementVNode(
                  "div",
                  _hoisted_8,
                  vue.toDisplayString(_ctx.rightText),
                  1
                  /* TEXT */
                )
              ])
            ])
          ])
        ]),
        vue.createElementVNode(
          "div",
          {
            class: vue.normalizeClass(["m-list--card__content", [_ctx.contentClass, { "hide-toobar": !_ctx.isShowToolbar }]])
          },
          vue.toDisplayString(_ctx.content),
          3
          /* TEXT, CLASS */
        ),
        _ctx.isShowToolbar ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_9, [
          vue.createElementVNode("div", _hoisted_10, [
            vue.renderSlot(_ctx.$slots, "toolbar-left", {}, () => [
              vue.createElementVNode(
                "span",
                _hoisted_11,
                vue.toDisplayString(_ctx.toolbarLeft),
                1
                /* TEXT */
              )
            ])
          ]),
          vue.createElementVNode(
            "div",
            {
              class: "right",
              style: vue.normalizeStyle(_ctx.toolbarRightStyle),
              onClick: _cache[1] || (_cache[1] = vue.withModifiers((...args) => _ctx.onToolbarRight && _ctx.onToolbarRight(...args), ["stop"]))
            },
            [
              vue.renderSlot(_ctx.$slots, "toolbar-right")
            ],
            4
            /* STYLE */
          )
        ])) : vue.createCommentVNode("v-if", true)
      ])
    ],
    2
    /* CLASS */
  );
}
__vue_sfc__$8.render = __vue_render__$8;
var stdin_default$9 = __vue_sfc__$8;
const name$7 = "m-list-cell";
const __vue_sfc__$7 = vue.defineComponent({
  name: name$7,
  props: {},
  setup() {
    const { parent, index } = use.useParent(LIST_KEY);
    if (!parent) {
      if (process.env.NODE_ENV !== "production") {
        console.error("[Vant] <m-list> must be a child component of <m-list>.");
      }
      return;
    }
    const item = vue.computed(() => parent.getCellItem(index.value));
    const onClick = () => parent.onClick(item.value);
    return {
      index,
      item,
      onClick
    };
  }
});
function __vue_render__$7(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("div", {
    class: "m-list--item",
    onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onClick && _ctx.onClick(...args))
  }, [
    vue.renderSlot(_ctx.$slots, "default", {
      item: _ctx.item,
      index: _ctx.index,
      group: _ctx.item.group
    })
  ]);
}
__vue_sfc__$7.render = __vue_render__$7;
var stdin_default$8 = __vue_sfc__$7;
const navbarProps = {
  /** 是否显示组件，默认auto微信小程序端隐藏显示 */
  show: {
    type: [Boolean, String],
    default: "auto"
  },
  /** 标题 */
  title: {
    type: String,
    default: ""
  },
  /** 左侧文案 */
  leftText: {
    type: String,
    default: ""
  },
  /** 右侧文案 */
  rightText: {
    type: String,
    default: ""
  },
  /** 是否显示左侧箭头 */
  leftArrow: {
    type: Boolean,
    default: true
  },
  /** 是否显示下边框 */
  border: {
    type: Boolean,
    default: true
  },
  /** 是否固定在顶部 */
  fixed: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: Boolean,
    default: false
  },
  /** 元素 z-index */
  zIndex: {
    type: Number,
    default: 99
  },
  /** 是否开启[顶部安全区适配] */
  safeAreaInsetTop: {
    type: Boolean,
    default: true
  },
  /** 返回按钮绑定方法，return false 停止触发click-left事件 */
  clickLeft: {
    type: Function,
    default: null
  }
};
const name$6 = "m-nav-bar";
const __vue_sfc__$6 = vue.defineComponent({
  name: name$6,
  props: navbarProps,
  emits: ["click-left", "click-right"],
  setup(props, { emit }) {
    const isShow = vue.computed(() => {
      if (props.show === "auto") {
        return !/MicroMessenger/i.test(navigator.userAgent);
      }
      return props.show;
    });
    const onClickLeft = () => {
      const { clickLeft } = props;
      if (clickLeft) {
        const res = props.clickLeft();
        if (res === false) {
          return;
        }
      }
      emit("click-left");
    };
    const onClickRight = () => {
      emit("click-right");
    };
    return {
      isShow,
      onClickLeft,
      onClickRight
    };
  }
});
function __vue_render__$6(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_van_nav_bar = vue.resolveComponent("van-nav-bar");
  return _ctx.isShow ? (vue.openBlock(), vue.createBlock(_component_van_nav_bar, {
    key: 0,
    class: "m-nav-bar",
    title: _ctx.title,
    "left-text": _ctx.leftText,
    "right-text": _ctx.rightText,
    "left-arrow": _ctx.leftArrow,
    border: _ctx.border,
    fixed: _ctx.fixed,
    placeholder: _ctx.placeholder,
    "z-index": _ctx.zIndex,
    "safe-area-inset-top": _ctx.safeAreaInsetTop,
    onClickLeft: _ctx.onClickLeft,
    onClickRight: _ctx.onClickRight
  }, vue.createSlots({
    _: 2
    /* DYNAMIC */
  }, [
    _ctx.$slots.title ? {
      name: "title",
      fn: vue.withCtx(() => [
        vue.renderSlot(_ctx.$slots, "title")
      ]),
      key: "0"
    } : void 0,
    _ctx.$slots.left ? {
      name: "left",
      fn: vue.withCtx(() => [
        vue.renderSlot(_ctx.$slots, "left")
      ]),
      key: "1"
    } : void 0,
    _ctx.$slots.right ? {
      name: "right",
      fn: vue.withCtx(() => [
        vue.renderSlot(_ctx.$slots, "right")
      ]),
      key: "2"
    } : void 0
  ]), 1032, ["title", "left-text", "right-text", "left-arrow", "border", "fixed", "placeholder", "z-index", "safe-area-inset-top", "onClickLeft", "onClickRight"])) : vue.createCommentVNode("v-if", true);
}
__vue_sfc__$6.render = __vue_render__$6;
var stdin_default$7 = __vue_sfc__$6;
const noticebarProps = {
  /** 双向绑定列表 {title} */
  modelValue: {
    type: Array,
    default: null
  },
  /** 列表数据 v-model/value 二选一，使用value时触发@remove事件*/
  value: {
    type: Array,
    default: null
  },
  /** 文本颜色 */
  color: String,
  /** 滚动条背景 */
  background: String,
  /** 左侧图标名称或图片链接，可选值见 Icon 组件 */
  leftIcon: String,
  /** 是否在长度溢出时滚动播放 */
  scrollable: {
    type: Boolean,
    default: false
  },
  /** 自动轮播间隔，单位为 ms */
  autoplay: {
    type: Number,
    default: 4e3
  }
};
const name$5 = "m-noticebar";
const __vue_sfc__$5 = vue.defineComponent({
  name: name$5,
  props: noticebarProps,
  emits: ["remove", "click", "update:modelValue"],
  setup(props, { emit }) {
    const { parent } = use.useParent(HEADER_KEY);
    const swipeItems = vue.computed({
      get() {
        if (props.value) {
          return props.value;
        }
        return props.modelValue || [];
      },
      set(value) {
        emit("update:modelValue", value);
      }
    });
    const visible = vue.computed(() => swipeItems.value.length > 0);
    const swipeRef = vue.ref();
    const swipeIndex = vue.ref(0);
    const swipeChage = (index) => {
      swipeIndex.value = index;
    };
    const onClose = () => {
      var _a;
      if (props.value) {
        emit("remove", swipeIndex.value);
      } else {
        swipeItems.value.splice(swipeIndex.value, 1);
      }
      if (swipeIndex.value > 0) {
        (_a = swipeRef.value) == null ? void 0 : _a.swipeTo(swipeIndex.value--);
      }
      if (!visible.value) {
        parent == null ? void 0 : parent.resize();
      }
    };
    const onClick = (item, index) => {
      emit("click", item, index);
    };
    return {
      visible,
      swipeRef,
      swipeItems,
      swipeChage,
      onClose,
      onClick
    };
  }
});
function __vue_render__$5(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_van_icon = vue.resolveComponent("van-icon");
  const _component_van_swipe_item = vue.resolveComponent("van-swipe-item");
  const _component_van_swipe = vue.resolveComponent("van-swipe");
  const _component_van_notice_bar = vue.resolveComponent("van-notice-bar");
  return vue.withDirectives((vue.openBlock(), vue.createBlock(_component_van_notice_bar, {
    class: "m-noticebar",
    scrollable: _ctx.scrollable,
    color: _ctx.color,
    background: _ctx.background,
    "left-icon": _ctx.leftIcon,
    onClose: _ctx.onClose
  }, {
    "right-icon": vue.withCtx(() => [
      vue.createVNode(_component_van_icon, {
        name: "cross",
        onClick: _ctx.onClose
      }, null, 8, ["onClick"])
    ]),
    default: vue.withCtx(() => [
      vue.createVNode(_component_van_swipe, {
        ref: "swipeRef",
        vertical: "",
        class: "m-noticebar__swipe",
        autoplay: _ctx.autoplay,
        touchable: false,
        "show-indicators": false,
        onChange: _ctx.swipeChage
      }, {
        default: vue.withCtx(() => [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList(_ctx.swipeItems, (item, index) => {
              return vue.openBlock(), vue.createBlock(_component_van_swipe_item, {
                key: index,
                onClick: ($event) => _ctx.onClick(item, index)
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode(
                    vue.toDisplayString(item.title),
                    1
                    /* TEXT */
                  )
                ]),
                _: 2
                /* DYNAMIC */
              }, 1032, ["onClick"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]),
        _: 1
        /* STABLE */
      }, 8, ["autoplay", "onChange"])
    ]),
    _: 1
    /* STABLE */
  }, 8, ["scrollable", "color", "background", "left-icon", "onClose"])), [
    [vue.vShow, _ctx.visible]
  ]);
}
__vue_sfc__$5.render = __vue_render__$5;
var stdin_default$6 = __vue_sfc__$5;
var __defProp$1 = Object.defineProperty;
var __defProps$1 = Object.defineProperties;
var __getOwnPropDescs$1 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$1 = Object.getOwnPropertySymbols;
var __hasOwnProp$1 = Object.prototype.hasOwnProperty;
var __propIsEnum$1 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$1 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$1.call(b, prop))
      __defNormalProp$1(a, prop, b[prop]);
  if (__getOwnPropSymbols$1)
    for (var prop of __getOwnPropSymbols$1(b)) {
      if (__propIsEnum$1.call(b, prop))
        __defNormalProp$1(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$1 = (a, b) => __defProps$1(a, __getOwnPropDescs$1(b));
const name$4 = "m-popup-radio";
const popupRadioProps = __spreadProps$1(__spreadValues$1({}, popupProps), {
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
const __vue_sfc__$4 = vue.defineComponent({
  name: name$4,
  components: { Popup: stdin_default$e },
  props: popupRadioProps,
  emits: [],
  setup(props) {
    const popupRef = vue.ref();
    const checked = vue.ref("");
    const onChange = (name2) => {
      popupRef.value.setValue(name2);
    };
    const open = () => {
      vue.nextTick(() => {
        popupRef.value.open();
      });
    };
    const close = () => popupRef.value.close();
    vue.onMounted(() => {
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
const _hoisted_1$2 = { class: "label" };
const _hoisted_2$1 = { class: "icon" };
const _hoisted_3$1 = { class: "value" };
function __vue_render__$4(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_van_radio = vue.resolveComponent("van-radio");
  const _component_van_radio_group = vue.resolveComponent("van-radio-group");
  const _component_Popup = vue.resolveComponent("Popup");
  const _directive_lazy = vue.resolveDirective("lazy");
  return vue.openBlock(), vue.createBlock(_component_Popup, {
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
    default: vue.withCtx(() => [
      vue.createVNode(_component_van_radio_group, {
        modelValue: _ctx.checked,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.checked = $event),
        onChange: _ctx.onChange
      }, {
        default: vue.withCtx(() => [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList(_ctx.columns, (item, i) => {
              return vue.openBlock(), vue.createElementBlock("div", {
                key: i,
                class: "m-popup-radio__row"
              }, [
                vue.createElementVNode("div", _hoisted_1$2, [
                  vue.withDirectives(vue.createElementVNode(
                    "img",
                    _hoisted_2$1,
                    null,
                    512
                    /* NEED_PATCH */
                  ), [
                    [_directive_lazy, _ctx.icon]
                  ]),
                  vue.createElementVNode(
                    "span",
                    {
                      class: vue.normalizeClass({ "is-active": _ctx.checked === item.value })
                    },
                    vue.toDisplayString(item.label),
                    3
                    /* TEXT, CLASS */
                  )
                ]),
                vue.createElementVNode("div", _hoisted_3$1, [
                  vue.createVNode(_component_van_radio, {
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
__vue_sfc__$4.render = __vue_render__$4;
var stdin_default$5 = __vue_sfc__$4;
const stepsProps = {
  /** 当前步骤对应的索引值 */
  active: {
    type: [String, Number],
    default: 0
  },
  /** 激活状态颜色 */
  activeColor: {
    type: String,
    default: "#3c9cff"
  },
  /** 激活状态文字颜色 */
  activeTextColor: {
    type: String,
    default: null
  },
  /** 未激活状态颜色 */
  inactiveColor: {
    type: String,
    default: "#969799"
  },
  /** 激活状态的图标 */
  activeIcon: {
    type: String,
    default: null
  },
  /** 未激活状态图标 */
  inactiveIcon: {
    type: String,
    default: null
  },
  /** 图标大小 */
  iconSize: {
    type: Number,
    default: 17
  },
  /** 步骤条方向，可选值为 vertical */
  direction: {
    type: String,
    default: "horizontal"
  },
  /** 步骤条样式，可选值为 thickline */
  type: {
    type: String,
    default: null
  }
};
const stepsItemProps = {
  /** 标题文字 */
  title: {
    type: String,
    default: ""
  },
  /** 失败状态 */
  error: {
    type: Boolean,
    default: false
  }
};
const name$3 = "m-setps";
const STEPS_KEY = Symbol(name$3);
const __vue_sfc__$3 = vue.defineComponent({
  name: name$3,
  props: stepsProps,
  emits: ["clickStep"],
  setup(props, { emit }) {
    const { linkChildren } = use.useChildren(STEPS_KEY);
    const onClickStep = (index) => emit("clickStep", index);
    linkChildren({
      props,
      onClickStep
    });
    return {};
  }
});
function __vue_render__$3(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      class: vue.normalizeClass(["m-setps", [`m-setps--${_ctx.direction}`, _ctx.type]])
    },
    [
      vue.renderSlot(_ctx.$slots, "default")
    ],
    2
    /* CLASS */
  );
}
__vue_sfc__$3.render = __vue_render__$3;
var stdin_default$4 = __vue_sfc__$3;
const name$2 = "m-setps-item";
const __vue_sfc__$2 = vue.defineComponent({
  name: name$2,
  props: stepsItemProps,
  emits: [],
  setup() {
    const { parent, index } = use.useParent(STEPS_KEY);
    if (!parent) {
      if (process.env.NODE_ENV !== "production") {
        console.error("[Vant] <m-setps> must be a child component of <m-setps>.");
      }
      return;
    }
    const mSetpsItemRef = vue.ref();
    const parentProps = parent.props;
    const size = vue.ref({
      width: 0,
      height: 0
    });
    vue.onMounted(() => {
      const rect = use.useRect(mSetpsItemRef);
      size.value.width = rect.width;
      size.value.height = rect.height;
    });
    const showLine = vue.computed(() => {
      if (parentProps.type === "thickline") {
        return true;
      }
      return index.value + 1 < parent.children.length;
    });
    const getStatus = () => {
      const active = +parentProps.active;
      if (index.value < active) {
        return "finish";
      }
      return index.value === active ? "process" : "waiting";
    };
    const isActive = vue.computed(() => getStatus() === "process");
    const isFinish = vue.computed(() => getStatus() === "finish");
    const thickline = vue.computed(() => getStatus() === "process" || getStatus() === "finish");
    const isSuccess = vue.computed(() => {
      if (parentProps.type === "thickline") {
        return false;
      }
      return getStatus() === "finish";
    });
    const lineStyle = vue.computed(() => {
      const style = {
        background: isFinish.value ? parentProps.activeColor : parentProps.inactiveColor
      };
      if (parentProps.direction === "horizontal") {
        style.width = size.value.width + "px";
        style.left = size.value.width / 2 + "px";
        if (parentProps.type === "thickline") {
          style.left = 0;
          style.background = thickline.value ? parentProps.activeColor : "";
        }
      } else {
        style.height = size.value.height + "px";
      }
      return style;
    });
    const circleStyle = vue.computed(() => {
      if (parentProps.type === "thickline") {
        return {
          borderColor: thickline.value ? parentProps.activeColor : ""
        };
      }
      return {
        backgroundColor: getStatus() === "process" ? parentProps.activeColor : "#fff",
        borderColor: getStatus() === "finish" ? parentProps.activeColor : getStatus() === "process" ? "transparent" : parentProps.inactiveColor
      };
    });
    const circleTextStyle = vue.computed(() => {
      if (parentProps.type === "thickline") {
        return {
          color: thickline.value ? parentProps.activeColor : ""
        };
      }
      return "";
    });
    const contentStyle = vue.computed(() => {
      if (parentProps.type === "thickline") {
        return {
          color: thickline.value ? parentProps.activeTextColor || parentProps.activeColor : ""
        };
      }
      return {
        color: getStatus() === "waiting" ? parentProps.inactiveColor : parentProps.activeTextColor || parentProps.activeColor
      };
    });
    const onClickStep = () => parent.onClickStep(index.value);
    return {
      index,
      mSetpsItemRef,
      parentProps,
      showLine,
      isActive,
      isFinish,
      isSuccess,
      lineStyle,
      circleStyle,
      circleTextStyle,
      contentStyle,
      onClickStep
    };
  }
});
function __vue_render__$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_van_icon = vue.resolveComponent("van-icon");
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      ref: "mSetpsItemRef",
      class: vue.normalizeClass(["m-setps-item", [`m-setps-item--${_ctx.parentProps.direction}`, { isActive: _ctx.isActive, isFinish: _ctx.isFinish }]]),
      onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onClickStep && _ctx.onClickStep(...args))
    },
    [
      _ctx.showLine ? (vue.openBlock(), vue.createElementBlock(
        "div",
        {
          key: 0,
          class: vue.normalizeClass(["m-setps-item--line", [`m-setps-item--line--${_ctx.parentProps.direction}`]]),
          style: vue.normalizeStyle([_ctx.lineStyle])
        },
        null,
        6
        /* CLASS, STYLE */
      )) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode(
        "div",
        {
          class: vue.normalizeClass(["m-setps-item--wrapper", [`m-setps-item--wrapper--${_ctx.parentProps.direction}`]])
        },
        [
          vue.createElementVNode(
            "div",
            {
              class: "m-setps-item--wrapper__circle",
              style: vue.normalizeStyle([_ctx.circleStyle])
            },
            [
              _ctx.isSuccess ? (vue.openBlock(), vue.createBlock(_component_van_icon, {
                key: 0,
                name: "success",
                color: _ctx.parentProps.activeColor,
                size: "12"
              }, null, 8, ["color"])) : (vue.openBlock(), vue.createElementBlock(
                "span",
                {
                  key: 1,
                  class: vue.normalizeClass(["m-setps-item--wrapper__circle__text", [{ isActive: _ctx.isActive }]]),
                  style: vue.normalizeStyle([_ctx.circleTextStyle])
                },
                vue.toDisplayString(_ctx.index + 1),
                7
                /* TEXT, CLASS, STYLE */
              ))
            ],
            4
            /* STYLE */
          )
        ],
        2
        /* CLASS */
      ),
      vue.createElementVNode(
        "div",
        {
          class: vue.normalizeClass(["m-setps-item--value", [`m-setps-item--value--${_ctx.parentProps.direction}`]]),
          style: vue.normalizeStyle([_ctx.contentStyle])
        },
        [
          vue.renderSlot(_ctx.$slots, "default", {}, () => [
            vue.createElementVNode(
              "span",
              null,
              vue.toDisplayString(_ctx.title),
              1
              /* TEXT */
            )
          ])
        ],
        6
        /* CLASS, STYLE */
      )
    ],
    2
    /* CLASS */
  );
}
__vue_sfc__$2.render = __vue_render__$2;
var stdin_default$3 = __vue_sfc__$2;
const tableProps = {
  data: {
    type: Array,
    default: null
  },
  /** 表头背景颜色 */
  headerBgColor: {
    type: String,
    default: null
  },
  /** 显示边框 */
  border: {
    type: Boolean,
    default: false
  }
};
const tableColumnProps = {
  prop: {
    type: String,
    default: ""
  },
  label: {
    type: String,
    default: ""
  },
  fixed: {
    type: Boolean,
    default: false
  },
  minWidth: {
    type: Number,
    default: 80
  },
  /** 对应列是否可以排序
   * 如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件
   */
  sortable: {
    type: [String, Boolean],
    default: ""
  },
  /** 对齐方式 'left' | 'center' */
  align: {
    type: String,
    default: "left"
  },
  /** 用来格式化内容
   * (row: any, column: any, cellValue: any, index: number) => VNode | string
   */
  formatter: {
    type: Function,
    default: null
  },
  /** 是否在一行内显示 */
  nowrap: {
    type: Boolean,
    default: false
  }
};
const name$1 = "m-table";
const TABLE_KEY = Symbol(name$1);
const __vue_sfc__$1 = vue.defineComponent({
  name: name$1,
  props: tableProps,
  emits: ["sort-change", "cell-click"],
  setup(props, { emit }) {
    const state = vue.reactive({
      prop: "",
      order: ""
    });
    const tableData = vue.computed(() => {
      let array = _.cloneDeep(props.data || []);
      if (state.prop && state.order) {
        array = array.sort((a, b) => {
          const _a = a[state.prop] === "" ? -1 : a[state.prop];
          const _b = b[state.prop] === "" ? -1 : b[state.prop];
          if (_a < _b) {
            return state.order === "descending" ? 1 : -1;
          }
          if (_a > _b) {
            return state.order === "descending" ? -1 : 1;
          }
          return 0;
        });
      }
      return array;
    });
    const columns = vue.ref([]);
    const addColumn = (e) => {
      columns.value.push(e);
    };
    const clearColumn = () => {
      columns.value = [];
    };
    const setOrder = (sortable, prop, order) => {
      columns.value.forEach((e) => {
        if (e.prop === prop) {
          e.order = order;
        } else {
          e.order = "";
        }
      });
      if (sortable === "custom") {
        state.prop = "";
        state.order = "";
        emit("sort-change", { prop, order });
      } else {
        state.prop = prop;
        state.order = order;
      }
    };
    const isSticky = (item) => {
      const node = _.findLast(columns.value, (m) => m.fixed);
      if (node) {
        return node.prop === item.prop;
      }
      return false;
    };
    const styleObj = (item) => {
      const style = {
        width: `${item.minWidth}px`,
        paddingLeft: "12px"
      };
      if (item.fixed) {
        style["left"] = `${item.left}px`;
      }
      if (item.align === "center") {
        style["justify-content"] = "center";
        style["padding-left"] = "0";
      }
      return style;
    };
    const headerStyle = vue.computed(() => {
      if (props.headerBgColor) {
        return { backgroundColor: props.headerBgColor };
      }
      return "";
    });
    const getCellValue = (row, item, i) => {
      if (item.formatter) {
        return item.formatter(row, item, row[item.prop], i) || "";
      }
      return row[item.prop];
    };
    vue.onActivated(() => {
      columns.value = [];
    });
    const onClick = (row, item) => {
      emit("cell-click", row, item, item.prop);
    };
    const tableRef = vue.ref();
    const scrollParent = use.useScrollParent(tableRef);
    const scroller = vue.computed(() => scrollParent.value);
    const isScrolling = vue.ref(false);
    const check = () => {
      vue.nextTick(() => {
        isScrolling.value = scroller.value.scrollLeft > 0;
      });
    };
    use.useEventListener("scroll", check, {
      target: scroller,
      passive: true
    });
    const { linkChildren } = use.useChildren(TABLE_KEY);
    linkChildren({
      columns,
      addColumn,
      clearColumn,
      setOrder
    });
    return {
      tableRef,
      isScrolling,
      tableData,
      columns,
      isSticky,
      styleObj,
      headerStyle,
      getCellValue,
      onClick
    };
  }
});
const _hoisted_1$1 = ["innerHTML", "onClick"];
function __vue_render__$1(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      ref: "tableRef",
      key: _ctx.columns,
      class: vue.normalizeClass(["m-table", [{ "is-scrolling": _ctx.isScrolling, "is-border": _ctx.border }]]),
      style: { "width": "100%" }
    },
    [
      vue.createElementVNode(
        "div",
        {
          class: "m-table__header",
          style: vue.normalizeStyle(_ctx.headerStyle)
        },
        [
          vue.renderSlot(_ctx.$slots, "default")
        ],
        4
        /* STYLE */
      ),
      (vue.openBlock(true), vue.createElementBlock(
        vue.Fragment,
        null,
        vue.renderList(_ctx.tableData, (row, i) => {
          return vue.openBlock(), vue.createElementBlock("div", {
            key: i,
            class: "m-table__row"
          }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(_ctx.columns, (item) => {
                return vue.openBlock(), vue.createElementBlock(
                  "div",
                  {
                    key: item.prop,
                    class: vue.normalizeClass(["m-table__cell", [
                      {
                        "is-sticky": item.fixed,
                        "is-last-column": _ctx.isSticky(item),
                        "is-nowrap": item.nowrap
                      }
                    ]]),
                    style: vue.normalizeStyle(_ctx.styleObj(item))
                  },
                  [
                    vue.createElementVNode("span", {
                      class: "cell",
                      innerHTML: _ctx.getCellValue(row, item, i),
                      onClick: ($event) => _ctx.onClick(row, item)
                    }, null, 8, _hoisted_1$1)
                  ],
                  6
                  /* CLASS, STYLE */
                );
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ]);
        }),
        128
        /* KEYED_FRAGMENT */
      ))
    ],
    2
    /* CLASS */
  );
}
__vue_sfc__$1.render = __vue_render__$1;
var stdin_default$2 = __vue_sfc__$1;
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
const name = "m-table-column";
const __vue_sfc__ = vue.defineComponent({
  name,
  props: tableColumnProps,
  emits: [],
  setup(props) {
    const { parent } = use.useParent(TABLE_KEY);
    if (!parent) {
      if (process.env.NODE_ENV !== "production") {
        console.error("[Vant] <m-table> must be a child component of <m-table>.");
      }
      return;
    }
    let left = 0;
    if (props.fixed) {
      const list = parent.columns.value.filter((m) => m.fixed);
      list.forEach((e) => {
        left = left + e.minWidth;
      });
    }
    parent.addColumn(__spreadProps(__spreadValues({}, props), { left, order: "" }));
    const order = vue.computed(() => {
      var _a;
      return ((_a = parent.columns.value.find((m) => m.prop === props.prop)) == null ? void 0 : _a.order) || "";
    });
    const isSticky = vue.computed(() => {
      const node = _.findLast(parent.columns.value, (m) => m.fixed);
      if (node) {
        return node.prop === props.prop;
      }
      return false;
    });
    const styleObj = vue.computed(() => {
      const style = {
        width: `${props.minWidth}px`,
        paddingLeft: "12px"
      };
      if (props.fixed) {
        style["left"] = `${left}px`;
      }
      if (props.align === "center") {
        style["justify-content"] = "center";
        style["padding-left"] = "0";
      }
      return style;
    });
    const onSortable = () => {
      let type = "";
      if (order.value === "") {
        type = "descending";
      } else if (order.value === "descending") {
        type = "ascending";
      }
      parent.setOrder(props.sortable, props.prop, type);
    };
    return {
      order,
      isSticky,
      styleObj,
      onSortable
    };
  }
});
const _withScopeId = (n) => (vue.pushScopeId(""), n = n(), vue.popScopeId(), n);
const _hoisted_1 = { class: "cell" };
const _hoisted_2 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ vue.createElementVNode(
  "i",
  { class: "sort-caret ascending" },
  null,
  -1
  /* HOISTED */
));
const _hoisted_3 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ vue.createElementVNode(
  "i",
  { class: "sort-caret descending" },
  null,
  -1
  /* HOISTED */
));
const _hoisted_4 = [
  _hoisted_2,
  _hoisted_3
];
function __vue_render__(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      class: vue.normalizeClass(["m-table__cell", [{ "is-sticky": _ctx.fixed, "is-last-column": _ctx.isSticky, "ascending": _ctx.order === "ascending", "descending": _ctx.order === "descending" }]]),
      style: vue.normalizeStyle(_ctx.styleObj)
    },
    [
      vue.createElementVNode("div", _hoisted_1, [
        vue.createTextVNode(
          vue.toDisplayString(_ctx.label) + " ",
          1
          /* TEXT */
        ),
        _ctx.sortable ? (vue.openBlock(), vue.createElementBlock("span", {
          key: 0,
          class: "caret-wrapper",
          onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onSortable && _ctx.onSortable(...args))
        }, [..._hoisted_4])) : vue.createCommentVNode("v-if", true)
      ])
    ],
    6
    /* CLASS, STYLE */
  );
}
__vue_sfc__.render = __vue_render__;
var stdin_default$1 = __vue_sfc__;
const version = "0.4.8";
function install(app) {
  const components = [
    stdin_default$j,
    stdin_default$i,
    stdin_default$h,
    stdin_default$g,
    stdin_default$f,
    stdin_default$d,
    stdin_default$b,
    stdin_default$a,
    stdin_default$9,
    stdin_default$8,
    stdin_default$7,
    stdin_default$6,
    stdin_default$c,
    stdin_default$e,
    stdin_default$5,
    stdin_default$4,
    stdin_default$3,
    stdin_default$2,
    stdin_default$1
  ];
  components.forEach((item) => {
    if (item.install) {
      app.use(item);
    } else if (item.name) {
      app.component(item.name, item);
    }
  });
}
var stdin_default = {
  install,
  version
};
exports.ActionBar = stdin_default$j;
exports.ActionBarItem = stdin_default$i;
exports.ActionSheet = stdin_default$h;
exports.Address = stdin_default$g;
exports.AddressSelect = stdin_default$f;
exports.FormCheckbox = stdin_default$d;
exports.Header = stdin_default$b;
exports.List = stdin_default$a;
exports.ListCard = stdin_default$9;
exports.ListCell = stdin_default$8;
exports.Navbar = stdin_default$7;
exports.Noticebar = stdin_default$6;
exports.PageContainer = stdin_default$c;
exports.Popup = stdin_default$e;
exports.PopupRadio = stdin_default$5;
exports.Setps = stdin_default$4;
exports.SetpsItem = stdin_default$3;
exports.Table = stdin_default$2;
exports.TableColumn = stdin_default$1;
exports.default = stdin_default;
exports.install = install;
exports.version = version;

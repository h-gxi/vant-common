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
import { defineStore } from "pinia";
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
      rootTitle: "\u5168\u90E8",
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
          this.breadcrumb = [{ id: "", title: this.rootTitle }, { id: "", title: `\u5305\u542B\u201C${this.filterText}\u201D\u7684\u641C\u7D22\u7ED3\u679C` }];
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
    const { id, name, type, photo, checked, checkedAll, breadcrumb } = node;
    const parent = breadcrumb.map((v) => {
      return { id: v.id, title: v.title };
    });
    state.checkedMap.set(node.id, { id, name, type, photo, checked, checkedAll, parent });
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
    const { id, name, type, photo, checked, checkedAll, breadcrumb } = node;
    const parent = breadcrumb.map((v) => {
      return { id: v.id, title: v.title };
    });
    state.checkedMap.set(node.id, { id, name, type, photo, checked, checkedAll, parent });
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
      const { id, name, type, photo, checked, checkedAll, breadcrumb } = parentNode;
      const parent = breadcrumb.map((v) => {
        return { id: v.id, title: v.title };
      });
      state.checkedMap.set(parentNode.id, { id, name, type, photo, checked, checkedAll, parent });
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
    const { id, name, type, photo, checked, checkedAll, breadcrumb } = node;
    const parent = breadcrumb.map((v) => {
      return { id: v.id, title: v.title };
    });
    state.checkedMap.set(node.id, { id, name, type, photo, checked, checkedAll, parent });
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
export {
  useAddressStore
};

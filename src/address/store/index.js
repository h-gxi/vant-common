import { defineStore } from 'pinia'
export const useAddressStore = defineStore('app.address', {
  state: () => {
    return {
      apiAction: '', // 部门人员树数据接口
      getImage: null, // 获取照片
      dataObj: [], // 树结构数据源
      dataNode: [], // 节点数据
      dataFilter: [], // 搜索过滤
      filterText: '', // 搜索关键字
      selectNodeId: '', // 当前节点id
      rootTitle: '全部', // 根节点标题
      breadcrumb: [], // 面包屑
      checkedMap: new Map(), // 选中节点集合
      defaultCheckedKeys: [] // 初始化默认选中ids
    }
  },
  getters: {
    /** 获取当前节点数据 */
    getDataNode: (state) => {
      if (state.selectNodeId) {
        const dataObj = state.dataNode.find(m => m.id === state.selectNodeId)
        return dataObj.children
      }
      if (state.filterText) {
        return state.dataFilter
      }
      return state.dataObj
    }
  },
  actions: {
    config(title, api, imageFunc) {
      this.rootTitle = title
      this.apiAction = api
      this.getImage = imageFunc
    },
    async init(parms, data, checkedKeys) {
      if (this.dataObj.length === 0) {
        this.breadcrumb = [{ id: '', title: this.rootTitle }]
        if (data && typeof data === Array) {
          this.dataObj = data
        } else if (this.apiAction) {
          const result = await this.apiAction(parms || {})
          this.dataObj = result || []
        }
      }
      if (checkedKeys) {
        this.defaultCheckedKeys = Array.from(checkedKeys)
      }
      this.dataNode = []
      resolveBreadcrumb(this, this.dataObj)
      resolveDefaultChecked(this)
      // console.log('m-address Store :>> ', this.dataNode)
    },
    selectNode(node) {
      if (node.type !== 1) { // 节点只能是部门班级
        this.selectNodeId = node.id
        if (!node.breadcrumb) {
          const obj = this.dataNode.find(m => m.id === node.id)
          node.breadcrumb = obj?.breadcrumb || []
        }
        this.breadcrumb = [{ id: '', title: this.rootTitle }, ...node.breadcrumb]

        if (this.breadcrumb.length === 1 && this.filterText) {
          this.breadcrumb = [{ id: '', title: this.rootTitle }, { id: '', title: `包含“${this.filterText}”的搜索结果` }]
        }
      }
    },
    checked(node, multiple) {
      // console.log('node :>> ', node)
      if (multiple) {
        resolveChecked(this, node)
        resolveParentChecked(this, node.parentId, node.checked)
      } else {
        resolveChecked2(this, node)
      }
      console.log('checkedMap :>> ', this.checkedMap)
    },
    filter(value) {
      this.filterText = value
      this.dataFilter = []
      this.selectNodeId = ''
      this.selectNode({ id: '', title: this.rootTitle })
      if (!value) return
      this.dataNode.forEach((node) => {
        if (node.name.indexOf(value) !== -1) { this.dataFilter.push(node) }
      })
    },
    remove(node) {
      if (this.checkedMap.has(node.id)) {
        this.checkedMap.delete(node.id)
        resolveRemoveChecked(this, node.id)
        console.log('node :>> ', node)
      }
    }
  }
})

/** 处理数据添加面包屑 */
const resolveBreadcrumb = (state, data, parent) => {
  data.forEach(m => {
    // 面包屑
    m.breadcrumb = []

    if (parent) {
    // 添加父级
      m.breadcrumb = m.breadcrumb.concat(parent.breadcrumb)
    }
    state.dataNode.push(m)
    if (m.type !== 1) { // 叶子不加自己
      m.breadcrumb.push({
        id: m.id,
        title: m.name
      })
    }

    if (m.children) {
      resolveBreadcrumb(state, m.children, m)
    }
  })
}

/** 处理选中状态 */
const resolveChecked = (state, node) => {
  if (node.checked) {
    node.checkedAll = true
    const { id, name, type, photo, checked, checkedAll, breadcrumb } = node
    const parent = breadcrumb.map(v => { return { id: v.id, title: v.title } })
    state.checkedMap.set(node.id, { id, name, type, photo, checked, checkedAll, parent })
    node.children.forEach(m => {
      m.checked = true // 选中叶子
      resolveChecked(state, m)
    })
  } else {
    if (state.checkedMap.has(node.id)) {
      state.checkedMap.delete(node.id)
    }
    node.checkedAll = false
    node.children.forEach(m => {
      m.checked = false // 移除叶子
      resolveChecked(state, m)
    })
  }
}
/** 处理选中状态 单选 */
const resolveChecked2 = (state, node) => {
  if (node.checked) {
    state.dataNode.forEach(node => {
      node.checked = false
    })
    state.checkedMap.clear()
    node.checked = true
    const { id, name, type, photo, checked, checkedAll, breadcrumb } = node
    const parent = breadcrumb.map(v => { return { id: v.id, title: v.title } })
    state.checkedMap.set(node.id, { id, name, type, photo, checked, checkedAll, parent })
  } else {
    if (state.checkedMap.has(node.id)) {
      state.checkedMap.delete(node.id)
    }
  }
}
/** 处理父级选中状态 */
const resolveParentChecked = (state, parentId, isChecked) => {
  if (parentId) {
    const parentNode = state.dataNode.find(m => m.id === parentId)
    if (parentNode) {
      if (isChecked) {
        parentNode.checked = true
      } else {
        parentNode.checked = parentNode.children.some(v => v.checked) // 存在叶子节点勾选
      }
      parentNode.checkedAll = !parentNode.children.some(v => !v.checked || !v.checkedAll) // 半选
      const { id, name, type, photo, checked, checkedAll, breadcrumb } = parentNode
      const parent = breadcrumb.map(v => { return { id: v.id, title: v.title } })
      state.checkedMap.set(parentNode.id, { id, name, type, photo, checked, checkedAll, parent })
      resolveParentChecked(state, parentNode.parentId, isChecked)
    }
  }
}

/** 处理默认选中节点 */
const resolveDefaultChecked = (state) => {
  state.dataNode.forEach(node => {
    node.checked = false
    node.checkedAll = false
  })
  state.checkedMap.clear()
  const filter = state.dataNode.filter(e => e.type === 1 && state.defaultCheckedKeys.includes(e.id))
  filter.forEach(node => {
    node.checked = true
    node.checkedAll = true
    const { id, name, type, photo, checked, checkedAll, breadcrumb } = node
    const parent = breadcrumb.map(v => { return { id: v.id, title: v.title } })
    state.checkedMap.set(node.id, { id, name, type, photo, checked, checkedAll, parent })
    resolveParentChecked(state, node.parentId, true)
  })
}

/** 处理移除人员时更新选中状态 */
const resolveRemoveChecked = (state, nodeId) => {
  if (nodeId) {
    const node = state.dataNode.find(m => m.id === nodeId)
    if (node) {
      node.checked = false
      node.checkedAll = true
      resolveParentChecked(state, node.parentId, false)
    }
  }
}


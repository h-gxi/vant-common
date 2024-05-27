import ListCell from './cell.vue'

ListCell.install = function(Vue) {
  Vue.component(ListCell.name, ListCell)
}

export default ListCell

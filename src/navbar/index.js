import NavBar from './index.vue'

NavBar.install = function(Vue) {
  Vue.component(NavBar.name, NavBar)
}

export default NavBar

import Components from './components/index'
import './components/index.scss'
import pkg from '../package.json'

/**
 * 注册表单生成器
 * @author 一如既往 <h_gxi@foxmail.com>
 * @param {App<Element>} Vue Vue3实例
 */
const install = function(Vue) {
  Components.forEach(component => {
    Vue.component(component.name, component)
  })
  console.log('vant-common :>> ', { components: Components, version: pkg.version })
}

export default {
  version: pkg.version,
  install,
  ...Components
}

export * from './components/index'

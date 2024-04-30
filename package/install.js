import Components from './components'
import './components/index.scss'

/**
 * 注册表单生成器
 * @author 一如既往 <h_gxi@foxmail.com>
 * @param {App<Element>} app Vue3实例
 */
const install = function(app) {
  app.use(Components)
}

export default {
  install
}

export * from './components'

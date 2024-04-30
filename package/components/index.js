import baseComponets from './base'
import TableComponents from './table'
import SetpsComponents from './setps'
import AddressComponents from './address'

const components = [
  ...baseComponets,
  ...TableComponents,
  ...SetpsComponents,
  ...AddressComponents
]

const componentNames = []

const registerComponent = (app, name, component) => {
  app.component(`m-${name}`, component)
  componentNames.push(`m-${name}`)
}

export default (app) => {
  components.forEach((m) => {
    registerComponent(app, m.name, m.component)
  })
  console.log('componentNames :>> ', componentNames)
}

export * from './base'
export * from './table'
export * from './setps'
export * from './address'


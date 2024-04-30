import Address from './src/list.vue'
import Select from './src/select.vue'

export default [
  { name: 'address', component: Address },
  { name: 'address-select', component: Select }
]

export { useAddressStore } from './store'


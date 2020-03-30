import Buses from '../../../../../views/Privado/Bus/Buses.vue'
import Bus from '../../../../../views/Privado/Bus/Bus.vue'

export default [
  {
    path: '/buses',
    name: 'buses',
    component: Buses
  },
  {
    path: '/buses/:bu_bus',
    name: 'bus',
    component: Bus
  },
]
import Buses from '../../../../../views/Privado/Bus/Buses.vue'
import Bus from '../../../../../views/Privado/Bus/Bus.vue'
import BusAbordar from '../../../../../views/Privado/Bus/BusAbordar.vue'

export default [
  {
    path: '/buses',
    name: 'buses',
    component: Buses
  },
  {
    path: '/buses/abordar',
    name: 'buses-abordar',
    component: BusAbordar
  },
  {
    path: '/buses/:bu_bus',
    name: 'bus',
    component: Bus
  },
]
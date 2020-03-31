import Viajes from '../../../../../views/Privado/Viaje/Viajes.vue'
import ViajeReadOnly from '../../../../../views/Privado/Viaje/ViajeReadOnly.vue'

export default [
  {
    path: '/viajes',
    name: 'viajes',
    component: Viajes
  },
  {
    path: '/viajes/:vi_viaje/info',
    name: 'viajereadonly',
    component: ViajeReadOnly
  },
]
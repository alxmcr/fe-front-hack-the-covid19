import Viajes from '../../../../../views/Privado/Viaje/Viajes.vue'
import Viaje from '../../../../../views/Privado/Viaje/Viaje.vue'

export default [
  {
    path: '/viajes',
    name: 'viajes',
    component: Viajes
  },
  {
    path: '/viajes/:vi_viaje',
    name: 'viaje',
    component: Viaje
  },
]
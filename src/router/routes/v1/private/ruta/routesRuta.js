import Ruta from '../../../../../views/Privado/Ruta/Ruta.vue'
import Rutas from '../../../../../views/Privado/Ruta/Rutas.vue'

export default [
  {
    path: '/rutas/:ru_ruta',
    name: 'ruta',
    component: Ruta
  },
  {
    path: '/rutas',
    name: 'rutas',
    component: Rutas
  },
]
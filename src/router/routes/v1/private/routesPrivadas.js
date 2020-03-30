// Dashboard
import routesDashboard from '../private/dashboard/routesDashboard'
// Entidades
import routesBus from '../private/bus/routesBus'
import routesRuta from '../private/ruta/routesRuta'
import routesUsuario from '../private/usuario/routesUsuario'
import routesUsuarioEnfermo from '../private/usuario-enfermo/routesUsuarioEnfermo'
import routesViaje from '../private/viaje/routesViaje'

const routesPrivadas = [
  // Dashboard
  ...routesDashboard,
  // Entidades
  ...routesBus,
  ...routesRuta,
  ...routesUsuario,
  ...routesUsuarioEnfermo,
  ...routesViaje,
]

export default routesPrivadas
import routesHome from './home/routesHome'
import routesAbout from './about/routesAbout'
import rutasCallToAction from './calltoaction/routesCallToAction'
import routesInformacion from './informacion/routesInformacion'

const routesPublicas = [
  ...routesHome,
  ...routesAbout,
  ...rutasCallToAction,
  ...routesInformacion
]

export default routesPublicas
import Login from '../../../../../views/Publico/CallToAction/Login.vue'
import Register from '../../../../../views/Publico/CallToAction/Register.vue'

export default [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  }
]
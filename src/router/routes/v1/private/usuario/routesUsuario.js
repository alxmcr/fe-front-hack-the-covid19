import Usuarios from "../../../../../views/Privado/Usuario/Usuarios.vue";
import UsuarioEdit from "../../../../../views/Privado/Usuario/UsuarioEdit.vue";
import UsuarioOnlyRead from "../../../../../views/Privado/Usuario/UsuarioOnlyRead.vue";
import UsuarioProfile from "../../../../../views/Privado/Usuario/UsuarioProfile.vue";

export default [
  {
    path: "/usuarios",
    name: "usuarios",
    component: Usuarios
  },
  {
    path: "/usuarios/:us_usuario/edit",
    name: "usuarioedit",
    component: UsuarioEdit
  },
  {
    path: "/usuarios/:us_usuario/read",
    name: "usuarioonlyread",
    component: UsuarioOnlyRead
  },
  {
    path: "/usuarios/:us_usuario/profile",
    name: "usuarioprofile",
    component: UsuarioProfile
  }
];

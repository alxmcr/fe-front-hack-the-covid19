import UsuariosEnfermos from "../../../../../views/Privado/UsuarioEnfermo/UsuariosEnfermos.vue";
import UsuarioEnfermoEdit from "../../../../../views/Privado/UsuarioEnfermo/UsuarioEnfermoEdit.vue";
import UsuarioEnfermoOnlyRead from "../../../../../views/Privado/UsuarioEnfermo/UsuarioEnfermoOnlyRead.vue";

export default [
  {
    path: "/usuarios/enfermos",
    name: "usuarioenfermos",
    component: UsuariosEnfermos
  },
  {
    path: "/usuarios/enfermos/:ue_usuario_enfermo/edit",
    name: "usuarioenfermoedit",
    component: UsuarioEnfermoEdit
  },
  {
    path: "/usuarios/enfermos/:ue_usuario_enfermo/read",
    name: "usuarioenfermoread",
    component: UsuarioEnfermoOnlyRead
  }
];

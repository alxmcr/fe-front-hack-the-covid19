<template>
  <v-data-table
    :headers="tableUsuario.headersUsuario"
    :items="listaUsuario"
    sort-by="ru_nombre"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Lista de Usuarios</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <!-- Dialog -->
        <v-dialog v-model="tableUsuario.dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">Nuevo Usuario</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline" v-if="editedIndex < 0 ">{{ formTitle }}</span>
              <span class="headline" v-else>{{ formTitle }} #{{editedUsuario.us_usuario}}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedUsuario.ru_codigo" label="Codigo"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedUsuario.ru_lugar_partida" label="Partida"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedUsuario.ru_lugar_destino" label="Llegada"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-checkbox v-model="editedUsuario.us_estado" color="primary" label="Estado"></v-checkbox>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="save">Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.us_avatar="{ item }">
      <v-avatar>
        <img :src="getAvatar(item)" :alt="item.us_nombre" />
      </v-avatar>
    </template>
    <template v-slot:item.us_estado="{ item }">
      <v-icon>
        {{
        item.us_estado ? "mdi-checkbox-marked" : "mdi-checkbox-blank-outline"
        }}
      </v-icon>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editUsuario(item)">mdi-pencil</v-icon>
      <v-icon small @click="deleteUsuario(item)">mdi-delete</v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Limpiar</v-btn>
    </template>
  </v-data-table>
</template>

<script>
// Repository Factory
import { RepositoryFactory } from "../../repositories/RepositoryFactory";
// Repositories
const UsuarioRepository = RepositoryFactory.get("usuario");

export default {
  name: "UsuarioTableManager",
  data() {
    return {
      listaUsuario: [],
      editedIndex: -1,
      editedUsuario: {
        us_usuario: 0,
        us_tipo_usuario: "",
        us_codigo: "",
        us_nombre: "",
        us_apellido_paterno: "",
        us_apellido_materno: "",
        us_carnet_identidad: "",
        us_carnet_lugar_exp: "",
        us_direccion_domicilio: "",
        us_telefono_fijo: "",
        us_telefono_movil: "",
        us_telefono_emergency: "",
        us_licencia_conducir: "",
        us_categoria_licencia: "",
        us_email: "",
        us_username: "",
        us_password: "",
        us_status_covid: true,
        us_estado: true
      },
      defaultUsuario: {
        us_usuario: 0,
        us_tipo_usuario: "",
        us_codigo: "",
        us_nombre: "",
        us_apellido_paterno: "",
        us_apellido_materno: "",
        us_carnet_identidad: "",
        us_carnet_lugar_exp: "",
        us_direccion_domicilio: "",
        us_telefono_fijo: "",
        us_telefono_movil: "",
        us_telefono_emergency: "",
        us_licencia_conducir: "",
        us_categoria_licencia: "",
        us_email: "",
        us_username: "",
        us_password: "",
        us_status_covid: true,
        us_estado: true
      },
      tableUsuario: {
        dialog: false,
        headersUsuario: [
          { text: "Avatar", value: "us_avatar" },
          { text: "Codigo", value: "us_codigo" },
          { text: "Tipo de Usuario", value: "us_tipo_usuario" },
          { text: "Codigo", value: "us_codigo" },
          { text: "Nombre", value: "us_nombre" },
          { text: "Ap.Paterno", value: "us_apellido_paterno" },
          { text: "Ap.Materno", value: "us_apellido_materno" },
          { text: "Carnet de Identidad", value: "us_carnet_identidad" },
          { text: "Lugar Expedido", value: "us_carnet_lugar_exp" },
          { text: "Direccion", value: "us_direccion_domicilio" },
          { text: "Telefono Fijo", value: "us_telefono_fijo" },
          { text: "Telefono Movil", value: "us_telefono_movil" },
          { text: "Telefono Emergencia", value: "us_telefono_emergency" },
          { text: "Telefono Movil", value: "us_telefono_movil" },
          { text: "Telefono Movil", value: "us_telefono_movil" },
          { text: "Telefono Movil", value: "us_telefono_movil" },
          { text: "Telefono Movil", value: "us_telefono_movil" },
          { text: "Estado", value: "us_estado" },
          { text: "Acciones", value: "actions", sortable: false }
        ]
      }
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Usuario" : "Editar Usuario";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      UsuarioRepository.get()
        .then(response => {
          this.listaUsuario = response.data.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    editUsuario(item) {
      this.editedIndex = this.listaUsuario.indexOf(item);
      this.editedUsuario = Object.assign({}, item);
      this.tableUsuario.dialog = true;
    },

    deleteUsuario(item) {
      const index = this.listaUsuario.indexOf(item);
      // Get id
      const { us_usuario } = item;
      // Call to service
      this.callToServiceDeleteUsuario(us_usuario);
      // Quitar de la tabla
      this.listaUsuario.splice(index, 1);
    },

    close() {
      this.tableUsuario.dialog = false;
      setTimeout(() => {
        this.editedUsuario = Object.assign({}, this.defaultUsuario);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        // Get id
        const { us_usuario } = this.editedUsuario;
        // Call to service
        this.callToServiceUpdateUsuario(us_usuario, this.editedUsuario);
        // Update
        Object.assign(this.listaUsuario[this.editedIndex], this.editedUsuario);
      } else {
        // Call to service
        this.callToServiceCreateUsuario(this.editedUsuario);
      }
      this.close();
    },
    callToServiceCreateUsuario(usuario) {
      UsuarioRepository.createUsuario(usuario)
        .then(response => {
          const { data } = response;
          // usuario creada
          const usuario = data.data;
          // Push
          this.listaUsuario.push(usuario);
        })
        .catch(error => {
          console.error(error);
        });
    },
    callToServiceUpdateUsuario(id, usuario) {
      UsuarioRepository.updateUsuario(id, usuario)
        .then(response => {
          // Log
          console.log("response", response);
        })
        .catch(error => {
          console.error(error);
        });
    },
    callToServiceDeleteUsuario(id) {
      UsuarioRepository.deleteUsuario(id)
        .then(response => {
          // Log
          console.log("response", response);
        })
        .catch(error => {
          console.error(error);
        });
    },
    getAvatar(usuario) {
      if (usuario === null || usuario === undefined) {
        return "https://raw.githubusercontent.com/alxmcr/assets-online-store/master/avatar/profile.png";
      }

      if (usuario.us_avatar === null || usuario.us_avatar === undefined) {
        return "https://raw.githubusercontent.com/alxmcr/assets-online-store/master/avatar/profile.png";
      }

      if (usuario.us_avatar === "") {
        return "https://raw.githubusercontent.com/alxmcr/assets-online-store/master/avatar/profile.png";
      }

      return usuario.us_avatar;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
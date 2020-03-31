<template>
  <v-data-table
    :headers="tableUsuarioEnfermo.headersUsuarioEnfermo"
    :items="listaUsuarioEnfermo"
    sort-by="ru_nombre"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Lista de Usuarios Contagiados con COVID-19</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <!-- Dialog -->
        <v-dialog v-model="tableUsuarioEnfermo.dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">Nuevo Usuario Contagiado</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline" v-if="editedIndex < 0 ">{{ formTitle }}</span>
              <span class="headline" v-else>{{ formTitle }} #{{editedUsuarioEnfermo.ue_usuario_enfermo}}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedUsuarioEnfermo.ru_codigo" label="Codigo"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedUsuarioEnfermo.ru_lugar_partida" label="Partida"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedUsuarioEnfermo.ru_lugar_destino" label="Llegada"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-checkbox v-model="editedUsuarioEnfermo.us_estado" color="primary" label="Estado"></v-checkbox>
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
    <template v-slot:item.ue_avatar="{ item }">
      <v-avatar>
        <img :src="getAvatar(item)" :alt="item.ue_nombre" />
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
      <v-icon small class="mr-2" @click="editUsuarioEnfermo(item)">mdi-pencil</v-icon>
      <v-icon small @click="deleteUsuarioEnfermo(item)">mdi-delete</v-icon>
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
const UsuarioEnfermoRepository = RepositoryFactory.get("usuarioEnfermo");

export default {
  name: "UsuarioEnfermoTableManager",
  data() {
    return {
      listaUsuarioEnfermo: [],
      editedIndex: -1,
      editedUsuarioEnfermo: {
        ue_usuario_enfermo: 0,
        ue_tipo_usuario: "",
        ue_codigo: "",
        ue_nombre: "",
        ue_apellido_paterno: "",
        ue_apellido_materno: "",
        ue_carnet_identidad: "",
        ue_carnet_lugar_exp: "",
        ue_direccion_domicilio: "",
        ue_telefono_fijo: "",
        ue_telefono_movil: "",
        ue_telefono_emergency: "",
        ue_licencia_conducir: "",
        ue_categoria_licencia: "",
        ue_email: "",
        ue_username: "",
        ue_password: "",
        ue_status_covid: true,
        ue_estado: true
      },
      defaultUsuarioEnfermo: {
        ue_usuario_enfermo: 0,
        ue_tipo_usuario: "",
        ue_codigo: "",
        ue_nombre: "",
        ue_apellido_paterno: "",
        ue_apellido_materno: "",
        ue_carnet_identidad: "",
        ue_carnet_lugar_exp: "",
        ue_direccion_domicilio: "",
        ue_telefono_fijo: "",
        ue_telefono_movil: "",
        ue_telefono_emergency: "",
        ue_licencia_conducir: "",
        ue_categoria_licencia: "",
        ue_email: "",
        ue_username: "",
        ue_password: "",
        ue_status_covid: true,
        ue_estado: true
      },
      tableUsuarioEnfermo: {
        dialog: false,
        headersUsuarioEnfermo: [
          { text: "Avatar", value: "ue_avatar" },
          { text: "Codigo", value: "ue_codigo" },
          { text: "Nombre", value: "ue_nombre" },
          { text: "Ap.Paterno", value: "ue_apellido_paterno" },
          { text: "Ap.Materno", value: "ue_apellido_materno" },
          { text: "Carnet de Identidad", value: "ue_carnet_identidad" },
          { text: "Lugar Expedido", value: "ue_carnet_lugar_exp" },
          { text: "Direccion", value: "ue_direccion_domicilio" },
          { text: "Telefono Fijo", value: "ue_telefono_fijo" },
          { text: "Telefono Movil", value: "ue_telefono_movil" },
          { text: "Telefono Emergencia", value: "ue_telefono_emergency" },
          { text: "Telefono Movil", value: "ue_telefono_movil" },
          { text: "Telefono Movil", value: "ue_telefono_movil" },
          { text: "Telefono Movil", value: "ue_telefono_movil" },
          { text: "Telefono Movil", value: "ue_telefono_movil" },
          { text: "Estado", value: "ue_estado" },
          { text: "Acciones", value: "actions", sortable: false }
        ]
      }
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Usuario Contagiado" : "Editar Usuario Contagiado";
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
      UsuarioEnfermoRepository.get()
        .then(response => {
          this.listaUsuarioEnfermo = response.data.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    editUsuario(item) {
      this.editedIndex = this.listaUsuarioEnfermo.indexOf(item);
      this.editedUsuarioEnfermo = Object.assign({}, item);
      this.tableUsuarioEnfermo.dialog = true;
    },

    deleteUsuarioEnfermo(item) {
      const index = this.listaUsuarioEnfermo.indexOf(item);
      // Get id
      const { ue_usuario_enfermo } = item;
      // Call to service
      this.callToServiceDeleteUsuarioEnfermo(ue_usuario_enfermo);
      // Quitar de la tabla
      this.listaUsuarioEnfermo.splice(index, 1);
    },

    close() {
      this.tableUsuarioEnfermo.dialog = false;
      setTimeout(() => {
        this.editedUsuarioEnfermo = Object.assign({}, this.defaultUsuarioEnfermo);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        // Get id
        const { ue_usuario_enfermo } = this.editedUsuarioEnfermo;
        // Call to service
        this.callToServiceUpdateUsuarioEnfermo(ue_usuario_enfermo, this.editedUsuarioEnfermo);
        // Update
        Object.assign(this.listaUsuarioEnfermo[this.editedIndex], this.editedUsuarioEnfermo);
      } else {
        // Call to service
        this.callToServiceCreateUsuarioEnfermo(this.editedUsuarioEnfermo);
      }
      this.close();
    },
    callToServiceCreateUsuarioEnfermo(usuario) {
      UsuarioEnfermoRepository.createUsuario(usuario)
        .then(response => {
          const { data } = response;
          // usuario creada
          const usuario = data.data;
          // Push
          this.listaUsuarioEnfermo.push(usuario);
        })
        .catch(error => {
          console.error(error);
        });
    },
    callToServiceUpdateUsuarioEnfermo(id, usuario) {
      UsuarioEnfermoRepository.updateUsuario(id, usuario)
        .then(response => {
          // Log
          console.log("response", response);
        })
        .catch(error => {
          console.error(error);
        });
    },
    callToServiceDeleteUsuarioEnfermo(id) {
      UsuarioEnfermoRepository.deleteUsuario(id)
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
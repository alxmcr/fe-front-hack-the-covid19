<template>
  <v-data-table
    :headers="tableRuta.headersRuta"
    :items="listaRuta"
    sort-by="ru_nombre"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Lista de Rutas</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <!-- Dialog -->
        <v-dialog v-model="tableRuta.dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on"
              >Nueva Ruta</v-btn
            >
          </template>
          <v-card>
            <v-card-title>
              <span class="headline" v-if="editedIndex < 0">{{
                formTitle
              }}</span>
              <span class="headline" v-else
                >{{ formTitle }} #{{ editedRuta.ru_ruta }}</span
              >
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedRuta.ru_codigo"
                      label="Codigo"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedRuta.ru_lugar_partida"
                      label="Partida"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedRuta.ru_lugar_destino"
                      label="Llegada"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-checkbox
                      v-model="editedRuta.ru_estado"
                      color="primary"
                      label="Estado"
                    ></v-checkbox>
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
    <template v-slot:item.ru_estado="{ item }">
      <v-icon>
        {{
          item.ru_estado ? "mdi-checkbox-marked" : "mdi-checkbox-blank-outline"
        }}
      </v-icon>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editRuta(item)">mdi-pencil</v-icon>
      <v-icon small @click="deleteRuta(item)">mdi-delete</v-icon>
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
const RutaRepository = RepositoryFactory.get("ruta");

export default {
  name: "RutaTableManager",
  data() {
    return {
      listaRuta: [],
      editedIndex: -1,
      editedRuta: {
        ru_ruta: 0,
        ru_codigo: "",
        ru_lugar_partida: "",
        ru_lugar_destino: "",
        ru_estado: true
      },
      defaultRuta: {
        ru_ruta: 0,
        ru_codigo: "",
        ru_lugar_partida: "",
        ru_lugar_destino: "",
        ru_estado: true
      },
      tableRuta: {
        dialog: false,
        headersRuta: [
          {
            text: "ID Ruta",
            align: "start",
            sortable: false,
            value: "ru_ruta"
          },
          { text: "Codigo", value: "ru_codigo" },
          { text: "Partida", value: "ru_lugar_partida" },
          { text: "Llegada", value: "ru_lugar_destino" },
          { text: "Estado", value: "ru_estado" },
          { text: "Acciones", value: "actions", sortable: false }
        ]
      }
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nueva Ruta" : "Editar Ruta";
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
      RutaRepository.get()
        .then(response => {
          this.listaRuta = response.data.data;
        })
        .catch(() => {
          
        });
    },
    editRuta(item) {
      this.editedIndex = this.listaRuta.indexOf(item);
      this.editedRuta = Object.assign({}, item);
      this.tableRuta.dialog = true;
    },

    deleteRuta(item) {
      const index = this.listaRuta.indexOf(item);
      // Get id
      const { ru_ruta } = item;
      // Call to service
      this.callToServiceDeleteRuta(ru_ruta);
      // Quitar de la tabla
      this.listaRuta.splice(index, 1);
    },

    close() {
      this.tableRuta.dialog = false;
      setTimeout(() => {
        this.editedRuta = Object.assign({}, this.defaultRuta);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        // Get id
        const { ru_ruta } = this.editedRuta;
        // Call to service
        this.callToServiceUpdateRuta(ru_ruta, this.editedRuta);
        // Update
        Object.assign(this.listaRuta[this.editedIndex], this.editedRuta);
      } else {
        // Call to service
        this.callToServiceCreateRuta(this.editedRuta);
      }
      this.close();
    },
    callToServiceCreateRuta(ruta) {
      RutaRepository.createRuta(ruta)
        .then(response => {
          const { data } = response;
          // Ruta creada
          const ruta = data.data;
          // Push
          this.listaRuta.push(ruta);
        })
        .catch(() => {
          
        });
    },
    callToServiceUpdateRuta(id, ruta) {
      RutaRepository.updateRuta(id, ruta)
        .then(() => {
          // Log
        })
        .catch(() => {
          
        });
    },
    callToServiceDeleteRuta(id) {
      RutaRepository.deleteRuta(id)
        .then(() => {
          // Log
        })
        .catch(() => {
          
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>

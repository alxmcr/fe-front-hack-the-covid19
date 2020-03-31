<template>
  <v-data-table
    :headers="tableRutas.headersRutas"
    :items="rutas"
    sort-by="ru_nombre"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Lista de Rutas</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <!-- Dialog -->
        <v-dialog v-model="tableRutas.dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">Nueva Ruta</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline" v-if="editedIndex < 0 ">{{ formTitle }}</span>
              <span class="headline" v-else>{{ formTitle }} #{{editedRuta.ru_ruta}}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedRuta.name" label="Dessert name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedRuta.calories" label="Calories"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedRuta.fat" label="Fat (g)"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedRuta.carbs" label="Carbs (g)"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedRuta.protein" label="Protein (g)"></v-text-field>
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
const RutasRepository = RepositoryFactory.get("rutas");

export default {
  name: "RutaTableManager",
  data() {
    return {
      rutas: [],
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
      tableRutas: {
        dialog: false,
        headersRutas: [
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
          { text: "Actiones", value: "actions", sortable: false }
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
      RutasRepository.get()
        .then(response => {
          this.rutas = response.data.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    editRuta(item) {
      this.editedIndex = this.rutas.indexOf(item);
      this.editedRuta = Object.assign({}, item);
      this.tableRutas.dialog = true;
    },

    deleteRuta(item) {
      const index = this.rutas.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.rutas.splice(index, 1);
    },

    close() {
      this.tableRutas.dialog = false;
      setTimeout(() => {
        this.editedRuta = Object.assign({}, this.defaultRuta);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        // Call to service
        this.callToServiceUpdateRuta(this.editedRuta);
        // Update table
        Object.assign(this.rutas[this.editedIndex], this.editedRuta);
      } else {
        // Call to service
        this.callToServiceCreateRuta(this.editedRuta);
        // Push
        this.rutas.push(this.editedRuta);
      }
      this.close();
    },
    callToServiceCreateRuta(ruta) {
      console.log("Ruta a crear", ruta);
    },
    callToServiceUpdateRuta(ruta) {
      console.log("Ruta a actualizar", ruta);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
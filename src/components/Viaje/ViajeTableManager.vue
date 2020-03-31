<template>
  <v-data-table
    :headers="tableViaje.headersViaje"
    :items="listaViaje"
    sort-by="ru_nombre"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Lista de Viajes</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <!-- Dialog -->
        <v-dialog v-model="tableViaje.dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on"
              >Nuevo Viaje</v-btn
            >
          </template>
          <v-card>
            <v-card-title>
              <span class="headline" v-if="editedIndex < 0">{{
                formTitle
              }}</span>
              <span class="headline" v-else
                >{{ formTitle }} #{{ editedViaje.vi_viaje }}</span
              >
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedViaje.vi_codigo"
                      label="Codigo"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedViaje.vi_fecha_viaje"
                      label="Fecha Viaje"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedViaje.vi_hora_partida"
                      label="Hora Partida"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedViaje.vi_hora_llegada"
                      label="Hora Llegada"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedViaje.bu_bus"
                      label="Bus"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-checkbox
                      v-model="editedViaje.vi_estado"
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
    <template v-slot:item.vi_estado="{ item }">
      <v-icon>
        {{
          item.vi_estado ? "mdi-checkbox-marked" : "mdi-checkbox-blank-outline"
        }}
      </v-icon>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-btn
        text
        icon
        color="primary"
        :to="`viajes/${item.vi_viaje}/info`"
        tile
        v-on="on"
      >
        <v-icon small class="mr-2" color="primary">mdi-eye</v-icon>
      </v-btn>
      <v-icon small class="mr-2" @click="editViaje(item)">mdi-pencil</v-icon>
      <v-icon small @click="deleteViaje(item)">mdi-delete</v-icon>
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
const ViajeRepository = RepositoryFactory.get("viaje");

export default {
  name: "ViajeTableManager",
  data() {
    return {
      listaViaje: [],
      editedIndex: -1,
      editedViaje: {
        vi_viaje: 0,
        vi_codigo: "",
        vi_fecha_viaje: "",
        vi_hora_partida: "",
        vi_hora_llegada: null,
        bu_bus: 0,
        vi_estado: true
      },
      defaultViaje: {
        vi_viaje: 0,
        vi_codigo: "",
        vi_fecha_viaje: "",
        vi_hora_partida: "",
        vi_hora_llegada: null,
        bu_bus: 0,
        vi_estado: true
      },
      tableViaje: {
        dialog: false,
        headersViaje: [
          {
            text: "ID Viaje",
            align: "start",
            sortable: false,
            value: "vi_viaje"
          },
          { text: "Codigo", value: "vi_codigo" },
          { text: "Fecha de Viaje", value: "vi_fecha_viaje" },
          { text: "Hora de Partida", value: "vi_hora_partida" },
          { text: "Hora de Llegada", value: "vi_hora_llegada" },
          { text: "Bus", value: "bu_bus" },
          { text: "Estado", value: "vi_estado" },
          { text: "Acciones", value: "actions", sortable: false }
        ]
      }
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Viaje" : "Editar Viaje";
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
      ViajeRepository.get()
        .then(response => {
          this.listaViaje = response.data.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    editViaje(item) {
      this.editedIndex = this.listaViaje.indexOf(item);
      this.editedViaje = Object.assign({}, item);
      this.tableViaje.dialog = true;
    },

    deleteViaje(item) {
      const index = this.listaViaje.indexOf(item);
      // Get id
      const { vi_viaje } = item;
      // Call to service
      this.callToServiceDeleteViaje(vi_viaje);
      // Quitar de la tabla
      this.listaViaje.splice(index, 1);
    },

    close() {
      this.tableViaje.dialog = false;
      setTimeout(() => {
        this.editedViaje = Object.assign({}, this.defaultViaje);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        // Get id
        const { vi_viaje } = this.editedViaje;
        // Call to service
        this.callToServiceUpdateViaje(vi_viaje, this.editedViaje);
        // Update
        Object.assign(this.listaViaje[this.editedIndex], this.editedViaje);
      } else {
        // Call to service
        this.callToServiceCreateViaje(this.editedViaje);
      }
      this.close();
    },
    callToServiceCreateViaje(viaje) {
      ViajeRepository.createViaje(viaje)
        .then(response => {
          const { data } = response;
          // Viaje creada
          const viaje = data.data;
          // Push
          this.listaViaje.push(viaje);
        })
        .catch(error => {
          console.error(error);
        });
    },
    callToServiceUpdateViaje(id, viaje) {
      ViajeRepository.updateViaje(id, viaje)
        .then(response => {
          // Log
          console.log("response", response);
        })
        .catch(error => {
          console.error(error);
        });
    },
    callToServiceDeleteViaje(id) {
      ViajeRepository.deleteViaje(id)
        .then(response => {
          // Log
          console.log("response", response);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>

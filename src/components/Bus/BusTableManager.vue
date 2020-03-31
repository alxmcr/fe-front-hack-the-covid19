<template>
  <v-data-table
    :headers="tableBus.headersBus"
    :items="listaBus"
    sort-by="ru_nombre"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Lista de Buses</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <!-- Dialog -->
        <v-dialog v-model="tableBus.dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">Nuevo Bus</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline" v-if="editedIndex < 0 ">{{ formTitle }}</span>
              <span class="headline" v-else>{{ formTitle }} #{{editedBus.bu_bus}}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedBus.bu_codigo" label="Codigo"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedBus.bu_placa" label="Placa"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedBus.ru_ruta" label="Ruta"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-checkbox v-model="editedBus.bu_estado" color="primary" label="Estado"></v-checkbox>
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
    <template v-slot:item.bu_estado="{ item }">
      <v-icon>
        {{
        item.bu_estado ? "mdi-checkbox-marked" : "mdi-checkbox-blank-outline"
        }}
      </v-icon>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editBus(item)">mdi-pencil</v-icon>
      <v-icon small @click="deleteBus(item)">mdi-delete</v-icon>
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
const BusRepository = RepositoryFactory.get("bus");

export default {
  name: "BusTableManager",
  data() {
    return {
      listaBus: [],
      editedIndex: -1,
      editedBus: {
        bu_bus: 0,
        bu_codigo: "",
        bu_placa: "",
        ru_ruta: 0,
        bu_estado: true
      },
      defaultBus: {
        bu_bus: 0,
        bu_codigo: "",
        bu_placa: "",
        ru_ruta: 0,
        bu_estado: true
      },
      tableBus: {
        dialog: false,
        headersBus: [
          {
            text: "ID Bus",
            align: "start",
            sortable: false,
            value: "bu_bus"
          },
          { text: "Codigo", value: "bu_codigo" },
          { text: "Placa", value: "bu_placa" },
          { text: "Ruta", value: "bu_bus" },
          { text: "Estado", value: "bu_estado" },
          { text: "Acciones", value: "actions", sortable: false }
        ]
      }
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Bus" : "Editar Bus";
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
      BusRepository.get()
        .then(response => {
          this.listaBus = response.data.data;
        })
        .catch(() => {
          
        });
    },
    editBus(item) {
      this.editedIndex = this.listaBus.indexOf(item);
      this.editedBus = Object.assign({}, item);
      this.tableBus.dialog = true;
    },

    deleteBus(item) {
      const index = this.listaBus.indexOf(item);
      // Get id
      const { bu_bus } = item;
      // Call to service
      this.callToServiceDeleteBus(bu_bus);
      // Quitar de la tabla
      this.listaBus.splice(index, 1);
    },

    close() {
      this.tableBus.dialog = false;
      setTimeout(() => {
        this.editedBus = Object.assign({}, this.defaultBus);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        // Get id
        const { bu_bus } = this.editedBus;
        // Call to service
        this.callToServiceUpdateBus(bu_bus, this.editedBus);
        // Update
        Object.assign(this.listaBus[this.editedIndex], this.editedBus);
      } else {
        // Call to service
        this.callToServiceCreateBus(this.editedBus);
      }
      this.close();
    },
    callToServiceCreateBus(bus) {
      BusRepository.createBus(bus)
        .then(response => {
          const { data } = response;
          // bus creada
          const bus = data.data;
          // Push
          this.listaBus.push(bus);
        })
        .catch(() => {
          
        });
    },
    callToServiceUpdateBus(id, bus) {
      BusRepository.updateBus(id, bus)
        .then(() => {
          // Log
        })
        .catch(() => {
          
        });
    },
    callToServiceDeleteBus(id) {
      BusRepository.deleteBus(id)
        .then(() => {
          // Log
        })
        .catch(() => {
          
        });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
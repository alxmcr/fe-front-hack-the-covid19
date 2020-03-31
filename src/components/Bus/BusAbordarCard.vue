<template>
  <v-card color="primary lighten-2" dark>
    <v-card-title>Abordar un bus</v-card-title>
    <v-card-subtitle>Busque el bus que desea abordar</v-card-subtitle>
    <v-card-text>
      <v-autocomplete
        v-model="busModel"
        :items="items"
        :loading="isLoading"
        :search-input.sync="search"
        color="white"
        hide-no-data
        hide-selected
        item-text="bu_codigo"
        item-value="bu_bus"
        label="Codigo Bus"
        placeholder="Start typing to Search"
        prepend-icon="mdi-database-search"
        return-object
      ></v-autocomplete>
    </v-card-text>
    <v-divider></v-divider>
    <v-expand-transition>
      <v-list v-if="busModel" class="primary lighten-3">
        <v-list-item v-for="(field, i) in fields" :key="i">
          <v-list-item-content>
            <v-list-item-title v-text="field.value"></v-list-item-title>
            <v-list-item-subtitle v-text="field.key"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-expand-transition>
    <v-card-actions>
      <v-btn
        :disabled="!busModel"
        color="green darken-3"
        @click="busModel != null"
      >
        Abordar
        <v-icon right>mdi-check-circle</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        :disabled="!busModel"
        color="red darken-3"
        @click="busModel = null"
      >
        Limpiar
        <v-icon right>mdi-close-circle</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
// Repository Factory
import { RepositoryFactory } from "../../repositories/RepositoryFactory";
// Repositories
const BusRepository = RepositoryFactory.get("bus");
// const ViajeRepository = RepositoryFactory.get("viaje");

export default {
  data: () => ({
    busCodigoLimit: 5,
    busList: [],
    isLoading: false,
    busModel: null,
    search: null
  }),

  computed: {
    fields() {
      if (!this.busModel) return [];

      return Object.keys(this.busModel).map(key => {
        return {
          key,
          value: this.busModel[key] || "n/a"
        };
      });
    },
    items() {
      let busListMappedByBusCodigo = this.busList.map(entry => {
        const { bu_codigo } = entry;

        const BusCodigoMap =
          bu_codigo.length > this.busCodigoLimit
            ? bu_codigo.slice(0, this.busCodigoLimit) + "..."
            : bu_codigo;

        const result = Object.assign({}, entry, { BusCodigoMap });
        console.log("result", result);

        return result;
      });

      return busListMappedByBusCodigo;
    }
  },

  watch: {
    search() {
      // Items have already been loaded
      if (this.items.length > 0) return;

      // Items have already been requested
      if (this.isLoading) return;

      this.isLoading = true;

      // Lazily load input items
      BusRepository.get()
        .then(response => {
          this.busList = response.data.data;
        })
        .catch(error => {
          console.error(error);
        })
        .finally(() => (this.isLoading = false));
    }
  }
};
</script>

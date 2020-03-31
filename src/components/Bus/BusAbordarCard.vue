<template>
  <v-card color="primary" dark>
    <v-card-title>Abordar un bus</v-card-title>
    <v-card-subtitle>Busque el bus que desea abordar</v-card-subtitle>
    <v-card-text>
      <v-autocomplete
        v-model="model"
        :items="items"
        :loading="isLoading"
        :search-input.sync="search"
        color="white"
        hide-no-data
        hide-selected
        item-text="Codigo"
        item-value="API"
        label="Codigo del Bus"
        placeholder="Inicia escribiendo el codigo"
        prepend-icon="mdi-database-search"
        return-object
      ></v-autocomplete>
    </v-card-text>
    <v-divider></v-divider>
    <v-expand-transition>
      <v-list v-if="model" class="secondary">
        <v-list-item v-for="(field, i) in fields" :key="i">
          <v-list-item-content>
            <v-list-item-title v-text="field.ru_ruta"></v-list-item-title>
            <v-list-item-subtitle
              v-text="field.bu_codigo"
            ></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-expand-transition>
    <v-card-actions>
      <v-btn
        :disabled="!model"
        color="secondary darken-3"
        @click="model = null"
      >
        Abordar
        <v-icon right>mdi-check-circle</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn :disabled="!model" color="grey darken-3" @click="model = null">
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

export default {
  name: "BusAbordarCard",
  data: () => ({
    BusCodigoLimit: 5,
    entries: [],
    isLoading: false,
    model: null,
    search: null
  }),

  computed: {
    fields() {
      if (!this.model) return [];

      return Object.keys(this.model).map(key => {
        return {
          key,
          value: this.model[key] || "n/a"
        };
      });
    },
    items() {
      //console.log("entries", this.entries);
      console.log("search", this.search);

      let entriesMap = this.entries.map(entry => {
        // console.log("entry", entry);

        const { bu_codigo } = entry;
        // console.log("bu_codigo", bu_codigo);

        const BusCodigo =
          bu_codigo.length > this.BusCodigoLimit
            ? bu_codigo.slice(0, this.BusCodigoLimit) + "..."
            : bu_codigo;

        // console.log("BusCodigo", BusCodigo);

        const result = Object.assign({}, entry, { BusCodigo });
        console.log("result", result);

        return result;
      });
      console.log("entriesMap", entriesMap);

      return entriesMap;
    }
  },

  watch: {
    search(value) {
      console.log(value);
      console.log(this.items);
      // Items have already been loaded
      if (this.items.length > 0) return;

      // Items have already been requested
      if (this.isLoading) return;

      this.isLoading = true;

      // Lazily load input items
      BusRepository.get()
        .then(response => {
          this.entries = response.data.data;
        })
        .catch(error => {
          console.error(error);
        })
        .finally(() => (this.isLoading = false));
    }
  }
};
</script>

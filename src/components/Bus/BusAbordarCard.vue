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
        placeholder="Inicie la busqueda por codigo aqui"
        prepend-icon="mdi-database-search"
        return-object
      ></v-autocomplete>
    </v-card-text>
    <v-divider></v-divider>
    <v-expand-transition>
      <v-list v-if="busModel" class="primary lighten-3">
        <span v-for="(field, i) in fields" :key="i">
          <v-list-item
            v-if="
              field.key != 'listViaje' &&
                field.key != 'Ruta' &&
                field.key != 'ru_ruta'
            "
          >
            <v-list-item-content>
              <v-list-item-title v-text="field.value"></v-list-item-title>
              <v-list-item-subtitle v-text="field.key"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </span>
      </v-list>
    </v-expand-transition>
    <v-expand-transition>
      <v-list v-if="busModel" class="secondary lighten-3">
        <span v-for="(field, i) in fields" :key="i">
          <v-list-item v-if="field.key == 'Ruta'">
            <v-list-item-content>
              <v-list v-if="field.value" class="secondary lighten-3">
                <v-list-item :key="i">
                  <v-list-item-content>
                    <RutaCardOnly :ruta="field.value" />
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-list-item-content>
          </v-list-item>
        </span>
      </v-list>
    </v-expand-transition>
    <v-expand-transition>
      <v-list v-if="busModel" class="secondary lighten-3">
        <span v-for="(field, i) in fields" :key="i">
          <v-list-item
            v-if="
              field.key == 'listViaje' &&
                field.key != 'Ruta' &&
                field.key != 'ru_ruta'
            "
          >
            <v-list-item-content>
              <v-list v-if="field.value" class="secondary lighten-3">
                <v-list-item v-for="(field, i) in field.value" :key="i">
                  <v-list-item-content>
                    <ViajeAbordarCard :viaje="field" />
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-list-item-content>
          </v-list-item>
        </span>
      </v-list>
    </v-expand-transition>
    <v-card-actions>
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
import ViajeAbordarCard from "../Viaje/ViajeAbordarCard";
import RutaCardOnly from "../Ruta/RutaCardOnly";

// Repository Factory
import { RepositoryFactory } from "../../repositories/RepositoryFactory";
// Repositories
const BusRepository = RepositoryFactory.get("bus");
const ViajeRepository = RepositoryFactory.get("viaje");

export default {
  name: "BusAbordarCard",
  components: { ViajeAbordarCard, RutaCardOnly },
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

        return result;
      });

      return busListMappedByBusCodigo;
    }
  },

  watch: {
    async search() {
      // Items have already been loaded
      if (this.items.length > 0) return;

      // Items have already been requested
      if (this.isLoading) return;

      this.isLoading = true;

      // Clear
      this.busList = [];

      // Lazily load input items

      const response = await BusRepository.get();
      const busListAsync = response.data.data;

      if (busListAsync !== null && busListAsync !== null) {
        for (let index = 0; index < busListAsync.length; index++) {
          const bus = busListAsync[index];

          const { bu_bus } = bus;

          const responseViajesByBus = await ViajeRepository.findAllViajesActivosByBus(
            bu_bus
          );

          const viajesByBusListAsync = responseViajesByBus.data.data;

          // Set viajes
          bus.listViaje = viajesByBusListAsync;
          this.busList.push(bus);
        }
      } else {
        this.busList = [];
      }

      this.isLoading = false;
    }
  }
};
</script>

<template>
  <v-card>
    <v-card-title>
      <span>Informacion General del Viaje</span>
    </v-card-title>
    <v-card-text>
      <v-list class="secondary lighten-3">
        <v-list-item>
          <v-list-item-content>
            <b>Codigo:</b>
            <span>{{ viaje.vi_codigo }}</span>
          </v-list-item-content>
          <v-list-item-content>
            <b>Fecha Viaje:</b>
            <span>{{ viaje.vi_fecha_viaje }}</span>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
// Repository Factory
import { RepositoryFactory } from "../../repositories/RepositoryFactory";
// Repositories
const ViajeRepository = RepositoryFactory.get("viaje");

export default {
  props: ["vi_viaje"],
  name: "ViajeByIdOnlyRead",
  data() {
    return {
      viaje: {}
    };
  },
  created() {
    this.initialize(this.vi_viaje);
  },
  methods: {
    initialize(id) {
      ViajeRepository.getViaje(id)
        .then(response => {
          const { data } = response;
          this.viaje = data.data;
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>

<style></style>

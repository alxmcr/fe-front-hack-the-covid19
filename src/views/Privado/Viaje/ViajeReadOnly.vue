<template>
  <v-container fluid>
    <h1 class="text-center">Viaje #{{ $route.params.vi_viaje }}</h1>
    <v-row>
      <v-col>
        <ViajeByIdOnlyReadCard :vi_viaje="$route.params.vi_viaje" />
      </v-col>
      <v-col>
        <UsuarioTableReadOnly :usuarios="listaPasajeros" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ViajeByIdOnlyReadCard from "../../../components/Viaje/ViajeByIdOnlyReadCard";
import UsuarioTableReadOnly from "../../../components/Usuario/UsuarioTableReadOnly";

// Repository Factory
import { RepositoryFactory } from "../../../repositories/RepositoryFactory";
// Repositories
const RelTieneRepository = RepositoryFactory.get("tiene");

export default {
  name: "ViajeReadOnly",
  components: { UsuarioTableReadOnly, ViajeByIdOnlyReadCard },
  data() {
    return {
      listaPasajeros: []
    };
  },
  created(){
    this.initialize(this.$route.params.vi_viaje);
  },
  methods: {
    initialize(id) {
      RelTieneRepository.findAllRelTieneByViaje(id)
        .then(response => {
          this.listaPasajeros = response.data.data;
        })
        .catch(() => {});
    }
  }
};
</script>

<style></style>

<template>
  <v-card>
    <v-card-title>Viaje #{{ viaje.vi_viaje }}</v-card-title>
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
    <v-card-actions>
      <v-btn :disabled="!viaje" color="green darken-3" @click="viaje != null">
        Abordar
        <v-icon right>mdi-check-circle</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ["viaje"],
  name: "ViajeAbordarCard"
};
</script>

<style></style>

<template>
  <v-card>
    <v-card-title>Viaje: {{ viaje.vi_codigo }}</v-card-title>
    <v-card-text>
      <v-list class="secondary lighten-3">
        <v-list-item>
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
export default {
  props: ["viaje"],
  name: "ViajeOnlyRead"
};
</script>

<style></style>

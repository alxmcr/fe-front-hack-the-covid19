<template>
  <v-card>
    <v-card-title>Ruta #{{ ruta.ru_ruta }}</v-card-title>
    <v-card-text>
      <v-list class="secondary lighten-3">
        <v-list-item>
          <v-list-item-content>
            <b>Codigo:</b>
            <span>{{ ruta.ru_codigo }}</span>
          </v-list-item-content>
          <v-list-item-content>
            <b>Lugar Partida:</b>
            <span>{{ ruta.ru_lugar_partida }}</span>
          </v-list-item-content>
          <v-list-item-content>
            <b>Lugar Destino:</b>
            <span>{{ ruta.ru_lugar_destino }}</span>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ["ruta"],
  name: "RutaCardOnly"
};
</script>

<style></style>

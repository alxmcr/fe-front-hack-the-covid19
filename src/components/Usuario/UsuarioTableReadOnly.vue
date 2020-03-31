<template>
  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="usuarios"
    :single-select="singleSelect"
    item-key="name"
    show-select
    class="elevation-1"
  >
    <template v-slot:top>
      <h2>Pasajeros</h2>
    </template>
  </v-data-table>
</template>
<script>
export default {
  props: ["usuarios"],
  name: "UsuarioTableReadOnly",
  data() {
    return {
      singleSelect: false,
      selected: [],
      headers: [
        { text: "Avatar", value: "us_avatar" },
        { text: "Codigo", value: "us_codigo" },
        { text: "Nombre", value: "us_nombre" },
        { text: "Ap.Paterno", value: "us_apellido_paterno" },
        { text: "Ap.Materno", value: "us_apellido_materno" },
      ]
    };
  }
};
</script>

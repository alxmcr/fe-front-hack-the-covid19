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
        {
          text: "Dessert (100g serving)",
          align: "start",
          sortable: false,
          value: "name"
        },
        { text: "Calories", value: "calories" },
        { text: "Fat (g)", value: "fat" },
        { text: "Carbs (g)", value: "carbs" },
        { text: "Protein (g)", value: "protein" },
        { text: "Iron (%)", value: "iron" }
      ]
    };
  }
};
</script>

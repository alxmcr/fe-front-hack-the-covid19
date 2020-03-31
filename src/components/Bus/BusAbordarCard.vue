<template>
  <v-card color="red lighten-2" dark>
    <v-card-title>Abordar un bus</v-card-title>
    <v-card-subtitle>Busque el bus que desea abordar</v-card-subtitle>
    <v-card-text>
      <v-autocomplete
        v-model="apiModel"
        :items="items"
        :loading="isLoading"
        :search-input.sync="search"
        color="white"
        hide-no-data
        hide-selected
        item-text="Description"
        item-value="API"
        label="Public APIs"
        placeholder="Start typing to Search"
        prepend-icon="mdi-database-search"
        return-object
      ></v-autocomplete>
    </v-card-text>
    <v-divider></v-divider>
    <v-expand-transition>
      <v-list v-if="apiModel" class="red lighten-3">
        <v-list-item v-for="(field, i) in fields" :key="i">
          <v-list-item-content>
            <v-list-item-title v-text="field.value"></v-list-item-title>
            <v-list-item-subtitle v-text="field.key"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-expand-transition>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        :disabled="!apiModel"
        color="grey darken-3"
        @click="apiModel = null"
      >
        Clear
        <v-icon right>mdi-close-circle</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    descriptionLimit: 60,
    entries: [],
    isLoading: false,
    apiModel: null,
    search: null
  }),

  computed: {
    fields() {
      if (!this.apiModel) return [];

      return Object.keys(this.apiModel).map(key => {
        return {
          key,
          value: this.apiModel[key] || "n/a"
        };
      });
    },
    items() {
      return this.entries.map(entry => {
        const { Description } = entry;

        const DescriptionMap =
          Description.length > this.descriptionLimit
            ? Description.slice(0, this.descriptionLimit) + "..."
            : Description;

        const result = Object.assign({}, entry, { DescriptionMap });
        console.log("result", result);
        return result;
      });
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
      fetch("https://api.publicapis.org/entries")
        .then(res => res.json())
        .then(res => {
          const { count, entries } = res;
          this.count = count;
          this.entries = entries;
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => (this.isLoading = false));
    }
  }
};
</script>

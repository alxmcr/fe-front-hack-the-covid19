<template>
  <v-app>
    <AppNavBar />
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer app></v-footer>
  </v-app>
</template>

<script>
import AppNavBar from "./components/Comunes/AppNavBar";

export default {
  name: "App",
  components: { AppNavBar },

  data: () => ({
    //
  })
};
</script>

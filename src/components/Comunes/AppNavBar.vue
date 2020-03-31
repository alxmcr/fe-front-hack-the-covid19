<template>
  <!-- <v-app-bar app color="primary" dark> -->
  <div>
    <b-navbar toggleable="lg" type="dark" class="primary">
      <b-navbar-brand href="#">La Paz Te Cuida</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <v-btn text color="white" to="/">Inicio</v-btn>

          <v-btn text color="white" to="/buses">Buses</v-btn>
          <v-btn text color="white" to="/viajes">Viajes</v-btn>

          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark v-on="on">
                Usuarios
                <v-icon right>mdi-arrow-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item>
                <v-list-item-title>
                  <v-btn text to="/usuarios">Usuarios</v-btn>
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>
                  <v-btn text to="/usuarios/enfermos"
                    >Confirmados con COVID-19</v-btn
                  >
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark v-on="on">
                Como Pasajero
                <v-icon right>mdi-arrow-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item>
                <v-list-item-title>
                  <v-btn text to="/rutas">Rutas</v-btn>
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>
                  <v-btn text to="/buses/abordar">Abordar a un Bus</v-btn>
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>
                  <v-btn text to="/viajes/iniciar">Iniciar Recorrido</v-btn>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <!-- <b-nav-item-dropdown text="Idioma" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown>-->

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
  <!-- </v-app-bar> -->
</template>

<script>
export default {
  name: "AppNavBar"
};
</script>

<style lang="scss" scoped></style>

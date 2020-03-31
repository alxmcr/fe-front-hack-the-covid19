<template>
  <!-- <v-app-bar app color="primary" dark> -->
  <div>
    <b-navbar toggleable="lg" type="dark" class="primary">
      <b-navbar-brand href="#">La Paz Te Cuida</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/">Inicio</b-nav-item>
          <b-nav-item to="/about">Nuestro servicio</b-nav-item>
          <b-nav-item to="/rutas">Rutas</b-nav-item>
          <b-nav-item to="/buses">Buses</b-nav-item>
          <b-nav-item to="/buses/abordar">Abordar a un Bus</b-nav-item>
          <b-nav-item to="/viajes/iniciar">Iniciar Recorrido</b-nav-item>
          <b-nav-item to="/viajes">Viajes</b-nav-item>
          <b-nav-item to="/usuarios">Usuarios</b-nav-item>
          <b-nav-item to="/usuarios/enfermos">Confirmados con COVID-19</b-nav-item>
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

<style lang="scss" scoped>
</style>

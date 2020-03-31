<template>
  <div class="home">
    <!-- Header -->
    <header class="d-flex">
      <div class="container text-center my-auto">
        <h1 class="mb-1">La Paz Te Cuida</h1>
        <h3 class="mb-5">
          <em>VIAJA Y VIVE SEGURO</em>
        </h3>
        <v-flex xs12 wrap>
          <v-btn class="ma-2" rounded color="success" dark to="/register"
            >Registrarse</v-btn
          >
          <v-btn class="ma-2" rounded color="info" dark to="/login"
            >Ingresar</v-btn
          >
        </v-flex>
      </div>
      <div class="overlay"></div>
    </header>
  </div>
</template>

<script>
export default {
  name: "Home"
};
</script>

<style lang="scss" scoped>
$white: #fff !default;
$images: "../../../public/img";

.home {
  min-height: 30rem;
  position: relative;
  display: table;
  width: 100%;
  height: auto;
  padding-top: 8rem;
  padding-bottom: 8rem;
  background: linear-gradient(
      90deg,
      fade-out($white, 0.9) 0%,
      fade-out($white, 0.9) 100%
    ),
    url("../../../public/img/backgrounds/women-yellow.jpg");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  h1 {
    font-size: 4rem;
    margin: 0;
    padding: 0;
  }
  @media (min-width: 992px) {
    height: 100vh;
    h1 {
      font-size: 5.5rem;
    }
  }
}
</style>

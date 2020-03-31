<template>
  <v-card class="elevation-12">
    <v-toolbar color="primary" dark>
      <v-toolbar-title>Iniciar sesion</v-toolbar-title>
    </v-toolbar>

    <v-card-text>
      <v-form id="LoginForm" ref="formLogin">
        <v-text-field
          type="text"
          v-model="userToLogin.us_username"
          label="Usuario"
          counter
          clearable
        ></v-text-field>
        <v-text-field
          :type="showPassword ? 'text' : 'password'"
          v-model="userToLogin.us_password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          label="Contraseña"
          @click:append="showPassword = !showPassword"
          counter
          clearable
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <div class="my-2">
        <v-btn
          @click="submitLoginSimple"
          depressed
          large
          color="success"
          >Ingresar</v-btn
        >
      </div>
      <v-spacer></v-spacer>
      <div class="my-2">
        <v-btn @click="reset" depressed large color="error">Limpiar</v-btn>
      </div>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "LoginForm",
  data: function() {
    return {
      // nuevo usuario
      userToLogin: {
        us_username: "",
        us_password: ""
      },
      // Form
      showPassword: false
    };
  },
  methods: {
    submitLoginSimple() {},
    reset() {}
  }
};
</script>
<style lang="scss" scoped>
.text-danger {
  color: red;
}
</style>

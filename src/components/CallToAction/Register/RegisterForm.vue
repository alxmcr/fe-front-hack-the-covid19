<template>
  <v-card class="elevation-12">
    <v-toolbar color="primary" dark>
      <v-toolbar-title>Registro</v-toolbar-title>
    </v-toolbar>

    <v-card-text>
      <v-form id="RegisterForm" ref="formRegister">
        <v-text-field
          id="us_username"
          type="text"
          v-model="userToRegister.us_username"
          label="Usuario"
          clearable
        ></v-text-field>
        <v-text-field
          id="us_password"
          :type="showPassword ? 'text' : 'password'"
          v-model="userToRegister.us_password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          label="Contraseña"
          @click:append="showPassword = !showPassword"
          counter
          clearable
        ></v-text-field>
        <v-text-field
          id="us_email"
          type="text"
          v-model="userToRegister.us_email"
          label="Correo Electronico"
          clearable
        ></v-text-field>
        <v-select
          id="ci_ciudad_nacimiento"
          v-model="userToRegister.ci_ciudad_nacimiento"
          :items="listCiudades"
          item-text="ci_nombre"
          item-value="ci_ciudad"
          label="Lugar de Nacimiento"
        ></v-select>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <div class="my-2">
        <v-btn @click="submitClienteRegister" depressed large color="success"
          >Registrarse</v-btn
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
  name: "RegisterForm",
  data: function() {
    return {
      // Name Resource
      nameResource: "Cliente",
      // nuevo cliente
      userToRegister: {
        us_username: "",
        us_password: "",
        us_email: "",
        ci_ciudad_nacimiento: 1
      },
      // Form
      showPassword: false,
      listCiudades: []
    };
  },
  created() {
    // Ciudades
    this.fetchCiudades();
  },
  methods: {
    fetchCiudades() {},
    submitClienteRegister() {},
    reset() {}
  }
};
</script>
<style lang="scss" scoped>
.text-danger {
  color: red;
}
</style>

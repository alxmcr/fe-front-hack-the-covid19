<template>
  <div>
    <h1>Usuarios Contagiados con COVID-19</h1>
    <UsuarioEnfermoTableManager />
  </div>
</template>

<script>
import UsuarioEnfermoTableManager from "@/components/UsuarioEnfermo/UsuarioEnfermoTableManager";

export default {
  name: "UsuariosEnfermos",
  components: { UsuarioEnfermoTableManager }
};
</script>

<style>
</style>
<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Navbar from "./components/Navbar.vue";
import { useRoute } from "vue-router";
const route = useRoute();
</script>

<template>
  <Navbar></Navbar>
  <div class="px-12 pb-12 pt-28">
    <router-view :key="route.fullPath"></router-view>
  </div>
</template>

<style></style>

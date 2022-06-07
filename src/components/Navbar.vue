<script setup>
import { useRouter } from "vue-router";
</script>

<template>
  <div
    class="absolute top-0 flex h-24 w-full items-center justify-between bg-slate-900 px-8"
  >
    <router-link to="/">
      <h1 class="text-2xl text-white">Book Catalog</h1>
    </router-link>
    <router-link to="/add">
      <h1 class="text-lg text-white">Add book</h1>
    </router-link>
  </div>
</template>

<style scoped></style>

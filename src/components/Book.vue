<script setup>
const props = defineProps({
  book: Object,
  id: String,
});
</script>

<template>
  <div class="pl-4">
    <h2 class="text-xl font-bold">{{ props.book.name }}</h2>
    <div class="pl-6">
      <p>- Author: {{ props.book.author }}</p>
      <p v-if="props.book.pub_year">- Year: {{ props.book.pub_year }}</p>
      <p v-if="props.book.rating">- Rating: {{ props.book.rating }}</p>
      <p v-if="props.book.isbn">- ISBN: {{ props.book.isbn }}</p>
    </div>
    <div class="py-4">
      <router-link :to="'/update/' + props.id"
        ><button
          class="btn mr-4 border-green-700 text-green-700 hover:bg-green-800 focus:ring-green-300"
        >
          Update
        </button></router-link
      >
      <button
        @click="$emit('delete')"
        class="btn border-red-700 text-red-700 hover:bg-red-700 focus:ring-red-300"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<style scoped></style>

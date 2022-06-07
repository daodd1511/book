<script setup>
import useFirestore from "../composable/useFirestore.js";
import { useStore } from "../store/store.js";
import Book from "../components/Book.vue";
import { ref, onBeforeMount, watch } from "vue";
import { useRoute } from "vue-router";
const { readBook, removeBook } = useFirestore();
const route = useRoute();
const emit = defineEmits(["delete"]);
let recommendedBook = ref();
let years = ref();
const store = useStore();
onBeforeMount(async () => {
  await loadBook();
});
const loadBook = async () => {
  store.$reset();
  if (store.books.length == 0) {
    await readBook();
    // Get years
    years.value = new Set(store.years.sort((a, b) => b - a));
    // Get recommended book
    recommendedBook.value =
      store.getRecommendedBook[getRandomInt(store.getRecommendedBook.length)];
  }
};
const deleteBook = async (id) => {
  await removeBook(id);
  store.books = [];
  store.recomended = [];
  await loadBook();
};
const getRandomInt = (max) => Math.floor(Math.random() * max);
</script>

<template>
  <div v-if="store.books.length != 0">
    <!-- Recommended section -->
    <div class="pb-8">
      <h1 class="text-3xl font-bold">Recommended book</h1>
      <Book
        v-if="recommendedBook"
        :book="recommendedBook.data"
        :id="recommendedBook.id"
        @delete="deleteBook(recommendedBook.id)"
      ></Book>
      <p v-else>No book match the criteria</p>
    </div>
    <!-- Years section -->
    <div v-for="year in years">
      <h1 class="text-3xl font-bold">{{ year }}</h1>
      <div v-for="book in store.filterByYear(year)">
        <Book
          :book="book.data"
          :id="book.id"
          @delete="deleteBook(book.id)"
        ></Book>
        <br />
      </div>
    </div>
    <!-- No years section -->
    <div class="pb-8">
      <h1 class="text-3xl font-bold" v-if="store.books.length != 0">
        Books Without Year
      </h1>
      <div v-for="book in store.filterBookWithoutYear">
        <Book
          :book="book.data"
          :id="book.id"
          @delete="deleteBook(book.id)"
        ></Book>
        <br />
      </div>
    </div>
  </div>
</template>

<style scoped></style>

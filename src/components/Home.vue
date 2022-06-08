<script setup>
import useFirestore from "../composable/useFirestore.js";
import { useStore } from "../store/store.js";
import Book from "../components/Book.vue";
import Modal from "../components/Modal.vue";
import { ref, onBeforeMount } from "vue";
const { readBook, removeBook } = useFirestore();
const emit = defineEmits(["delete", "closeModal"]);
const store = useStore();
let recommendedBook = ref();
let years = ref();
let ratings = ref();
let group_option = ref("year");
let isOpenModal = ref(false);
let deleteBookId = ref();
onBeforeMount(async () => {
  await loadBook();
  ratings.value = new Set(store.ratings.sort((a, b) => b - a));
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
  isOpenModal.value = false;
  await loadBook();
};
const getRandomInt = (max) => Math.floor(Math.random() * max);
</script>

<template>
  <div v-if="store.books.length != 0">
    <!-- Group options -->
    <div class="flex items-center gap-4">
      <h2 class="text-lg">Group by:</h2>
      <div class="mr-4 flex items-center">
        <input
          id="years-radio"
          type="radio"
          value="year"
          v-model="group_option"
          name="inline-radio-group"
          class="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600"
          checked="checked"
        />
        <label for="years-radio" class="text-md ml-2 font-medium text-gray-900"
          >Years</label
        >
      </div>
      <div class="mr-4 flex items-center">
        <input
          id="rating-radio"
          type="radio"
          value="rating"
          v-model="group_option"
          name="inline-radio-group"
          class="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600"
        />
        <label for="rating-radio" class="text-md ml-2 font-medium text-gray-900"
          >Ratings</label
        >
      </div>
    </div>
    <!-- Recommended section -->
    <div class="pb-8">
      <h1 class="text-3xl font-bold">Recommended book</h1>
      <Book
        v-if="recommendedBook"
        :book="recommendedBook.data"
        :id="recommendedBook.id"
        @delete="(isOpenModal = true), (deleteBookId = recommendedBook.id)"
      ></Book>
      <p v-else>No book match the criteria</p>
    </div>
    <!-- Years section -->
    <div v-if="group_option == 'year'">
      <div v-for="year in years">
        <h1 class="text-3xl font-bold">{{ year }}</h1>
        <div v-for="book in store.filterByYear(year)">
          <Book
            :book="book.data"
            :id="book.id"
            @delete="(isOpenModal = true), (deleteBookId = book.id)"
          ></Book>
          <br />
        </div>
      </div>
    </div>
    <!-- Rating section -->
    <div v-if="group_option == 'rating'">
      <div v-for="rating in ratings">
        <h1 class="text-3xl font-bold">{{ rating }}</h1>
        <div v-for="book in store.filterByRating(rating)">
          <Book
            :book="book.data"
            :id="book.id"
            @delete="(isOpenModal = true), (deleteBookId = book.id)"
          ></Book>
          <br />
        </div>
      </div>
    </div>
    <!-- No years section -->
    <div class="pb-8" v-if="group_option == 'year'">
      <h1 class="text-3xl font-bold" v-if="store.books.length != 0">
        Books Without Year
      </h1>
      <div v-for="book in store.filterBookWithoutYear">
        <Book
          :book="book.data"
          :id="book.id"
          @delete="(isOpenModal = true), (deleteBookId = book.id)"
        ></Book>
        <br />
      </div>
    </div>
    <!-- No rating section-->
    <div class="pb-8" v-if="group_option == 'rating'">
      <h1 class="text-3xl font-bold" v-if="store.books.length != 0">
        Books Without Rating
      </h1>
      <div v-for="book in store.filterBookWithoutRating">
        <Book
          :book="book.data"
          :id="book.id"
          @delete="(isOpenModal = true), (deleteBookId = book.id)"
        ></Book>
        <br />
      </div>
    </div>
  </div>
  <Modal v-if="isOpenModal" @closeModal="isOpenModal = false">
    <button
      type="button"
      class="mr-2 inline-flex items-center rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300"
      @click="deleteBook(deleteBookId)"
    >
      Yes, I'm sure
    </button>
    <button
      type="button"
      class="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200"
      @click="isOpenModal = false"
    >
      No, cancel
    </button>
  </Modal>
</template>

<style scoped></style>

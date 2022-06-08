<script setup>
import useFirestore from "../composable/useFirestore";
import { ref } from "vue";
const { add } = useFirestore();
let name = ref("");
let author = ref("");
let pub_year = ref(null);
let rating = ref(0);
let isbn = ref("");
let book = ref({
  name: name.value,
  author: author.value,
  pub_year: pub_year.value,
  rating: rating.value,
  isbn: isbn.value,
});
const addBook = async (book) => {
  try {
    await add(book);
    window.alert("Book added successfully!");
    book.name = "";
    book.author = "";
    book.pub_year = null;
    book.rating = 0;
    book.isbn = "";
  } catch (error) {
    window.alert(error);
  }
};
</script>

<template>
  <div>
    <form @submit.prevent="addBook(book)">
      <label for="name">Name</label>
      <input
        id="name"
        type="text"
        maxlength="100"
        placeholder="Name"
        v-model="book.name"
        required
      /><br />
      <label for="author">Author</label>
      <input
        id="author"
        type="text"
        placeholder="Author"
        v-model="book.author"
        required
      /><br />
      <label for="year">Publication Year</label>
      <input
        id="year"
        type="number"
        min="1800"
        placeholder="Publication Year"
        v-model="book.pub_year"
      /><br />
      <label for="rating">Rating</label>
      <input
        id="rating"
        type="number"
        placeholder="Rating"
        v-model="book.rating"
      /><br />
      <label for="isbn">ISBN</label>
      <input
        id="isbn"
        type="text"
        placeholder="ISBN"
        v-model="book.isbn"
      /><br />
      <button
        type="submit"
        class="float-right rounded-lg border border-blue-700 px-5 py-2.5 text-center text-sm font-medium text-blue-700 hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        Add book
      </button>
    </form>
  </div>
</template>

<style scoped>
@tailwind components;
@layer components {
  input {
    @apply block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-gray-600 focus:border-blue-500 focus:ring-blue-500;
  }
}
</style>

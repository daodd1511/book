<script setup>
import useFirestore from "../composable/useFirestore";
import ISBN from "isbn3";
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
const checkISBN = (isbn) => {
  if (ISBN.parse(isbn) != null) {
    if (ISBN.parse(isbn).isValid) {
      alert("Your ISBN is valid");
      return;
    } else {
      alert("Your ISBN is not valid");
      return;
    }
  }
  alert("Your ISBN is not valid");
};
const alert = (msg) => {
  window.alert(msg);
};
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
      <div class="inline-block w-11/12">
        <input id="isbn" type="text" placeholder="ISBN" v-model="book.isbn" />
      </div>
      <button
        type="button"
        @click="
          book.isbn != '' ? checkISBN(book.isbn) : alert(`Please type in ISBN`)
        "
        class="float-right w-1/12 rounded-lg border border-yellow-700 py-2.5 text-center text-sm font-medium text-yellow-700 hover:bg-yellow-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-yellow-300"
      >
        Check ISBN
      </button>
      <br />
      <button
        type="submit"
        class="float-right mt-6 rounded-lg border border-blue-700 px-5 py-2.5 text-center text-sm font-medium text-blue-700 hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300"
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
  label {
    @apply mb-1 block text-sm font-medium text-gray-900;
  }
}
</style>

<script setup>
import useFirestore from "../composable/useFirestore";
import { useRoute } from "vue-router";
import { ref, onBeforeMount } from "vue";
import ISBN from "isbn3";

const route = useRoute();
const { update, getBookById } = useFirestore();
const book = ref();
onBeforeMount(async () => {
  book.value = await getBookById(route.params.id);
});
const checkISBN = (isbn) => {
  if (ISBN.parse(isbn) != null) {
    if (ISBN.parse(isbn).isValid) {
      alert("Your ISBN is valid");
      return ISBN.parse(isbn).isValid;
    } else {
      alert("Your ISBN is not valid");
      return ISBN.parse(isbn).isValid;
    }
  }
  alert("Your ISBN is not valid");
  return false;
};
const alert = (msg) => {
  window.alert(msg);
};
const updateBook = async (book) => {
  try {
    if (book.isbn != "" && checkISBN(book.isbn) == false) {
      throw "Please type in valid ISBN";
    }
    await update(route.params.id, book);
    window.alert("Update sucessfully");
  } catch (error) {
    alert(error);
  }
};
</script>

<template>
  <div v-if="book">
    <form @submit.prevent="updateBook(book)">
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
        class="float-right mt-6 rounded-lg border border-green-700 px-5 py-2.5 text-center text-sm font-medium text-green-700 hover:bg-green-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-green-300"
      >
        Update book
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

<script setup>
import useFirestore from "../composable/useFirestore";
import { useRoute } from "vue-router";
import { ref, onBeforeMount } from "vue";
const route = useRoute();
const { update, getBookById } = useFirestore();
const book = ref();
onBeforeMount(async () => {
  book.value = await getBookById(route.params.id);
});
const updateBook = async (book) => {
  try {
    await update(route.params.id, book);
    window.alert("Update sucessfully");
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div v-if="book">
    <form @submit.prevent="updateBook(book)">
      <input
        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-gray-600 focus:border-blue-500 focus:ring-blue-500"
        type="text"
        maxlength="100"
        placeholder="Name"
        v-model="book.name"
        required
      /><br />
      <input
        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-gray-600 focus:border-blue-500 focus:ring-blue-500"
        type="text"
        placeholder="Author"
        v-model="book.author"
        required
      /><br />
      <input
        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-gray-600 focus:border-blue-500 focus:ring-blue-500"
        type="number"
        min="1800"
        placeholder="Publication Year"
        v-model="book.pub_year"
      /><br />
      <input
        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-gray-600 focus:border-blue-500 focus:ring-blue-500"
        type="number"
        placeholder="Rating"
        v-model="book.rating"
      /><br />
      <input
        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-gray-600 focus:border-blue-500 focus:ring-blue-500"
        type="text"
        placeholder="ISBN"
        v-model="book.isbn"
      /><br />
      <button
        type="submit"
        class="float-right rounded-lg border border-green-700 px-5 py-2.5 text-center text-sm font-medium text-green-700 hover:bg-green-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-green-300"
      >
        Update book
      </button>
    </form>
  </div>
</template>

<style scoped></style>

import { defineStore } from "pinia";
// import useFireStore from "../composable/useFireStore";
// const { addData } = useFireStore();
export const useStore = defineStore("main", {
  state: () => {
    return {
      books: [],
      years: [],
      recomended: [],
    };
  },
  getters: {
    filterByYear: (state) => {
      return (year) => {
        let books = [...state.books];
        books.sort(function (a, b) {
          return a.data.name.localeCompare(b.data.name);
        });
        return books.filter((book) => {
          if (book.data.pub_year === year && book.data.pub_year != null) {
            return book;
          }
        });
      };
    },
    filterBookWithoutYear: (state) => {
      state.books.sort((a, b) => {
        return a.data.name.localeCompare(b.data.name);
      });
      return state.books.filter((book) => book.data.pub_year == null);
    },
    getRecommendedBook: (state) => {
      let currentYear = new Date().getFullYear();
      state.books.sort((a, b) => {
        return b.data.rating - a.data.rating;
      });
      state.recomended = state.books.filter((book) => {
        return (
          currentYear - book.data.pub_year >= 3 && book.data.rating != null
        );
      });
      return state.recomended.filter((rec) => {
        return rec.data.rating === state.recomended[0].data.rating;
      });
    },
  },
  actions: {},
});

import { db } from "./useFirebase";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  getDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { useStore } from "../store/store.js";
const useFirestore = () => {
  const readBook = async () => {
    try {
      const store = useStore();
      const querySnapshot = await getDocs(collection(db, "books"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        store.books.push({
          id: doc.id,
          data: doc.data(),
        });
        store.years.push(doc.data().pub_year);
      });
    } catch (err) {
      console.log("Error handling document: ", error);
    }
  };
  const add = async (book) => {
    try {
      const newBook = doc(collection(db, "books"));
      console.log(book);
      await setDoc(newBook, book);
    } catch (error) {
      console.log("Error handling document: ", error);
    }
  };
  const removeBook = async (id) => {
    await deleteDoc(doc(db, "books", id));
  };
  const getBookById = async (id) => {
    const docRef = doc(db, "books", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };
  const update = async (id, data) => {
    const docRef = doc(db, "books", id);

    // Set the "capital" field of the city 'DC'
    await updateDoc(docRef, data);
  };
  return { readBook, add, removeBook, getBookById, update };
};
export default useFirestore;

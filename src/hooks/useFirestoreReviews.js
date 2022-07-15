import { useState } from "react";
import firebaseApp from "../Firebase";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

// Hook
export const useFirestoreReviews = () => {
  const [dataReview, setDataReview] = useState([]);
  const [error, setError] = useState();
  const [loadingReview, setLoadingReview] = useState({});

  // get data from firestore with query
  const getDataReviewUser = async (userUID) => {
    try {
      setLoadingReview((prev) => ({ ...prev, getData: true }));

      const dataRef = collection(db, "users");
      if (auth.currentUser) {
        const filterQuery = query(
          dataRef,
          where("userUID", "==", auth.currentUser.uid)
        );
        const querySnapshot = await getDocs(filterQuery);
        const dataDb = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDataReview(dataDb);
      } else {
        const querySnapshot = await getDocs(dataRef);
        const dataDb = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDataReview(dataDb);
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading((prev) => ({ ...prev, getData: false }));
    }
  };

  // get data all Reviews from firestore
  const getDataReviews = async () => {
    try {
      setLoadingReview((prev) => ({ ...prev, getDataReviews: true }));

      const dataRef = collection(db, "reviews");
      const querySnapshot = await getDocs(dataRef);
      const dataDb = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDataReview(dataDb);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoadingReview((prev) => ({ ...prev, getDataReviews: false }));
    }
  };

  //  add data to firestore
  const addDataReview = async (dataReview) => {
    try {
      setLoadingReview((prev) => ({ ...prev, addData: true }));
      const newDoc = {
        name: dataReview.name,
        lastName: dataReview.lastName,
        email: auth.currentUser.email,
        phone: dataReview.phone,
        role: "user",
        userUID: auth.currentUser.uid,
        profileImage: dataReview.profileImage,
      };

      const dataRef = collection(db, "reviews");

      await addDoc(dataRef, newDoc);
      setDataReview([...data, newDoc]);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoadingReview((prev) => ({ ...prev, addData: false }));
    }
  };

  // update data to firestore
  const updateDataReview = async (dataReview) => {
    try {
      setLoadingReview((prev) => ({ ...prev, updateData: true }));
      const dataRef = doc(db, "reviews", dataReview.id);
      await updateDoc(dataRef, dataReview);

      setDataReview((prev) =>
        prev.map((item) => (item.id === dataReview.id ? dataReview : item))
      );
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoadingReview((prev) => ({ ...prev, updateData: false }));
    }
  };
  // update Role to firestore
  const updateRoleReview = async (dataReview) => {
    try {
      setLoadingReview((prev) => ({ ...prev, updateData: true }));
      const dataRef = doc(db, "reviews", dataReview.id);
      const newData = {
        role: dataReview.role,
      };
      await updateDoc(dataRef, newData);

      setDataReview((prev) =>
        prev.map((item) => (item.id === dataUser.id ? newData : item))
      );
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoadingReview((prev) => ({ ...prev, updateData: false }));
    }
  };

  // delete data to firestore
  const deleteDataReview = async (idUser) => {
    try {
      setLoadingReview((prev) => ({ ...prev, [idUser]: true }));
      const docRef = doc(db, "reviews", idUser);
      await deleteDoc(docRef);
      setDataReview(data.filter((item) => item.id !== idUser));
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoadingReview((prev) => ({ ...prev, [idUser]: false }));
    }
  };

  // return data
  return {
    dataReview,
    error,
    loadingReview,
    getDataReviewUser,
    addDataReview,
    getDataReviews,
    deleteDataReview,
    updateDataReview,
    updateRoleReview,
  };
};

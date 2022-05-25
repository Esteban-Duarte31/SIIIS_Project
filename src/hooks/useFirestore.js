import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	query,
	updateDoc,
	where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../Firebase";

export const useFirestore = () => {
	const [data, setData] = useState([]);
	const [error, setError] = useState();
	const [loading, setLoading] = useState({});

	const getData = async () => {
		try {
			setLoading((prev) => ({ ...prev, getData: true }));

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
				setData(dataDb);
			} else {
				const querySnapshot = await getDocs(dataRef);
				const dataDb = querySnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setData(dataDb);
			}
		} catch (error) {
			console.log(error);
			setError(error.message);
		} finally {
			setLoading((prev) => ({ ...prev, getData: false }));
		}
	};
	const getDataUsers = async () => {
		try {
			setLoading((prev) => ({ ...prev, getDataUsers: true }));

			const dataRef = collection(db, "users");
			// const filterQuery = query(
			// 	dataRef,
			// 	where("userUID", "==", auth.currentUser.uid)
			// );
			const querySnapshot = await getDocs(dataRef);
			const dataDb = querySnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			setData(dataDb);
		} catch (error) {
			console.log(error);
			setError(error.message);
		} finally {
			setLoading((prev) => ({ ...prev, getDataUsers: false }));
		}
	};

	const addData = async (dataUser) => {
		console.log("datauser",dataUser);
		try {
			setLoading((prev) => ({ ...prev, addData: true }));
			const newDoc = {
				name: dataUser.names,
				lastName: dataUser.lastNames,
				email: auth.currentUser.email,
				phone: dataUser.phone,
				role: "user",
				userUID: auth.currentUser.uid,
			};

			const dataRef = collection(db, "users");

			await addDoc(dataRef, newDoc);
			setData([...data, newDoc]);
		} catch (error) {
			console.log(error);
			setError(error.message);
		} finally {
			setLoading((prev) => ({ ...prev, addData: false }));
		}
	};

	const updateData = async (dataUser) => {
		try {
			console.log(dataUser);
			setLoading((prev) => ({ ...prev, updateData: true }));
			const dataRef = doc(db, "users", dataUser.id);
			const newData = {
				name: dataUser.names,
				lastName: dataUser.lastNames,
				phone: dataUser.phone,
				userUID: auth.currentUser.uid,
			};
			await updateDoc(dataRef, newData);
			// setData((prev) =>
			// 	prev.map((item) => (item.id === dataUser.id ? newData : item))
			// );
		} catch (error) {
			console.log(error);
			setError(error.message);
		} finally {
			setLoading((prev) => ({ ...prev, updateData: false }));
		}
	};

	const deleteData = async (idUser) => {
		try {
			setLoading((prev) => ({ ...prev, [idUser]: true }));
			const docRef = doc(db, "users", idUser);
			await deleteDoc(docRef);
			setData(data.filter((item) => item.id !== idUser));
		} catch (error) {
			console.log(error);
			setError(error.message);
		} finally {
			setLoading((prev) => ({ ...prev, [idUser]: false }));
		}
	};

	return {
		data,
		error,
		loading,
		getData,
		addData,
		getDataUsers,
		deleteData,
		updateData,
	};
};

import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
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
		} catch (error) {
			console.log(error);
			setError(error.message);
		} finally {
			setLoading((prev) => ({ ...prev, getData: false }));
		}
	};

	const addData = async (dataUser) => {
		try {
			setLoading((prev) => ({ ...prev, addData: true }));
			const newDoc = {
				names: dataUser.names,
				lastName: dataUser.lastNames,
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

	return { data, error, loading, getData, addData };
};

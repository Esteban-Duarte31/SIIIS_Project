import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useFirestore } from "../hooks/useFirestore";
import { useFirestoreReviews } from "../hooks/useFirestoreReviews";
import { ErrorsFirebase } from "../utils/ErrorsFirebase";

import Modal_Review from "../components/Modal_Review";
import { async } from "@firebase/util";

const Review = () => {
  const {
    dataReview,
    loadingReview,
    getDataReviews,
    getDataReviewUser,
    deleteDataReview,
  } = useFirestoreReviews();
  const { data, loading, getDataUsers, deleteData, getDataUserId } =
    useFirestore();

  const { setError } = useForm();

  useEffect(() => {
    getDataReviews();
    getDataUsers();
  }, []);

  if (
    (loadingReview.getDataReviews && loading.getDataUsers) ||
    (loadingReview.getDataReviews === undefined && loading.getDataUsers)
  ) {
    return (
      <div className="text-center text-gray-500 text-xl font-bold h-screen">
        Cargando...
      </div>
    );
  }

  const handleClickDelete = async (id) => {
    try {
      await deleteDataReview(id);
    } catch (error) {
      console.log(error.code);
      const { code, message } = ErrorsFirebase(error.code);
      setError(code, { message });
    }
  };


  return (
    <div className="flex flex-col py-12">
      <div className="grid grid-cols-6 gap-4 p-6">
        <div className="col-start-1 col-end-3 ...">
          <h1 className="font-semibold text-blue-900 text-3xl">RESEÑAS</h1>
        </div>

        <div className="col-end-7 col-span-2 ...">
          <form>
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
            >
              Search
            </label>
            <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Mockups, Logos..."
                required=""
              />
              <button
                type="submit"
                className="text-white absolute right-2.5 bottom-2.5 bg-slate-700 hover:bg-amber-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Buscar
              </button>
            </div>
          </form>
        </div>
      </div>

      <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto py-6 lg:max-w-none">
            <h2 className="text-2xl font-extrabold text-gray-900">Reseñas</h2>

            <div className="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-6">
              {dataReview.map((item) => (
                <div key={item.id} className="group relative ">
                  <div id="imagen">
                    <div className="relative w-full h-80 bg-white rounded-lg overflow-hidden sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                      <img
                        src={item.imageReview}
                        alt={item.title}
                        className="w-full h-full object-center object-cover"
                      />
                    </div>
                    <div id="info" className="rounded-lg">
                      <p id="headline" className="font-semibold">
                        Título
                        
                      </p>
                      <p id="descripcion">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Sapiente voluptates.
                      </p>
                      <Modal_Review dataReview1={item}/>
                    </div>
                    <h3 className="mt-6 text-sm text-gray-500">
                      <a href={item.href}>
                        <span className="absolute inset-0" />
                        {item.title}
                      </a>
                    </h3>
                    <p className="text-base font-semibold text-gray-900">
                      {item.title}
                    </p>
                    <div className="flex flex-row-reverse items-center space-x-4">
                    <img
                        className="w-10 h-10 rounded-full"
                        src={data.map((user) => {
                          if (user.userUID === item.userUID) {
                            return user.profileImage;
                          }
                        })}
                        alt=""
                      />
                      <div className="space-y-1 font-medium dark:text-white">
                        <div>
                          {data.map((user) => {
                            if (user.userUID === item.userUID) {
                              return user.name + " " + user.lastName;
                            }
                          })}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Joined in August 2014
                        </div>
                      </div>
                      
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;

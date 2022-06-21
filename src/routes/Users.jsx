import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useFirestore } from "../hooks/useFirestore";
import { ErrorsFirebase } from "../utils/ErrorsFirebase";

import SelectRole from "../components/SelectRole";

const Users = () => {
  const { data, loading, getDataUsers, deleteData } =
    useFirestore();

  const {
    setError,
  } = useForm();

  useEffect(() => {
    getDataUsers();
  }, []);

  // if (loading.getDataUsers) {
  if (loading.getDataUsers || loading.getDataUsers === undefined) {

    return <div
      className="text-center text-gray-500 text-xl font-bold h-screen"
    >Cargando...</div>;
  }

  const handleClickDelete = async (id) => {
    try {
      await deleteData(id);
    } catch (error) {
      console.log(error.code);
      const { code, message } = ErrorsFirebase(error.code);
      setError(code, { message });
    }
  };

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-6 gap-4 p-6">
        <div className="col-start-1 col-end-3 ...">
          <h1 className="font-semibold text-blue-900 text-3xl">USUARIOS</h1>
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
                className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="bg-white m-8">
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-1 gap-x-8 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-8 ">
          {data.map((item) => (
            <div
              key={item.userUID}
              className="flex font-sans border-t-4 border-teal-800"
            >
              <div className="flex-none w-48 relative">
                <img
                  src={item.profileImage}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <form className="flex-auto p-6 shadow-lg shadow-slate-500/50">
                <div className="flex flex-wrap">
                  <h1 className="flex-auto text-lg font-semibold text-slate-900">
                    {item.name}
                  </h1>
                  <div className="text-lg font-semibold text-slate-500">
                    {item.role === "user" ? "Usuario" : "Administrador"}
                  </div>
                  <div className="w-full flex-none">
                    <h2 className="flex-auto text-base font-semibold text-slate-600">
                      {item.lastName}
                    </h2>
                  </div>
                  <div className="w-full flex-none font-semibold text-teal-800 m-6 border-b-2">
                    {item.email}
                  </div>
                </div>

                <div className="flex space-x-4 mb-6 text-sm font-medium">
                  <div className="flex-auto flex space-x-4">
                    <SelectRole idUser={item.id} role={item.role} />
                  </div>
                </div>
                <button
                  className="h-10 w-full  font-semibold rounded-md bg-black text-white"
                  type="button"
                  onClick={() => handleClickDelete(item.id, item.userUID)}
                >
                  Delete
                </button>
              </form>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Users;

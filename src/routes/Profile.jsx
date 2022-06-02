import FormErrors from "../components/FormErrors";
import FormInputProfile from "../components/FormInputProfile";

import { useFirestore } from "../hooks/useFirestore";
import { ErrorsFirebase } from "../utils/ErrorsFirebase";
import { FormValidate } from "../utils/FormValidate";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, Fragment, useRef, useState } from "react";
import { UserContext } from "../context/UserProvider";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/outline";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const [idDataUser, setidDataUser] = useState("");

  const cancelButtonRef = useRef(null);
  const navegate = useNavigate();
  const { deleteUserWhitID } = useContext(UserContext);

  // validate form with react-hook-form
  const { required } = FormValidate();

  // useForm hook
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm();

  const { data, loading, error, getData, addData, updateData, deleteData } =
    useFirestore();

  useEffect(() => {
    console.log("getdata profile");
    getData();
  }, []);

  if (loading.getData) {
    return <div>Cargando...</div>;
  }

  // useState hook
  const onSubmit = async (data) => {
    console.log("actualizando perfil...", data);
    try {
      await updateData(data);
    } catch (error) {
      console.log(error.code);
      const { code, message } = ErrorsFirebase(error.code);
      setError(code, { message });
    }
  };

  const handleClickDelete = async (userUID) => {
    console.log("eliminando usuario...", userUID);
    try {
      await deleteUserWhitID();
      await deleteData(id);
    } catch (error) {
      console.log(error.code);
      const { code, message } = ErrorsFirebase(error.code);
      setError(code, { message });
    }
  };

  return (
    <>
      <FormErrors error={errors.errorIntern} />

      {data.map((item) => (
        <div
          key={item.userUID}
          className="p-6 w-9/12 ml-auto mr-auto mt-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
        >
          {/* {setidDataUser(item.id)} */}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6 mb-6 lg:grid-cols-4">
              <input
                name="id"
                className="col-span-2  text-lg font-semibold text-slate-500 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                defaultValue={item.id}
                placeholder={item.id}
                readOnly
                {...register("id")}
              />
              <input
                name="Role"
                className=" col-end-5  text-lg font-semibold text-slate-500 text-right rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                defaultValue={item.role}
                placeholder={item.role}
                readOnly
                {...register("role")}
              />
            </div>

            <div className="grid gap-6 mb-6 lg:grid-cols-2">
              <FormInputProfile
                type="text"
                placeholder={item.name}
                label="Nombres"
                htmlFor="names"
                name="names"
                error={errors.names}
                {...register("names", {
                  required,
                })}
              >
                <FormErrors error={errors.names} />
              </FormInputProfile>

              <FormInputProfile
                type="text"
                placeholder={item.lastName}
                label="Apellidos"
                htmlFor="lastNames"
                name="lastNames"
                error={errors.lastNames}
                {...register("lastNames", {
                  required,
                })}
              >
                <FormErrors error={errors.names} />
              </FormInputProfile>

              <div className="flex flex-wrap">
                <div className="flex items-center mr-4">
                  <input
                    id="red-radio"
                    type="radio"
                    defaultValue=""
                    name="colored-radio"
                    className="w-4 h-4 text-pink-500 bg-gray-100 border-gray-300 focus:ring-pink-400 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="red-radio"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Femenino
                  </label>
                </div>
                <div className="flex items-center mr-4">
                  <input
                    id="green-radio"
                    type="radio"
                    defaultValue=""
                    name="colored-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="green-radio"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Masculino
                  </label>
                </div>

                <div className="flex items-center mr-4">
                  <input
                    id="teal-radio"
                    type="radio"
                    defaultValue=""
                    name="colored-radio"
                    className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="teal-radio"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    LGBTQ +
                  </label>
                </div>
              </div>

              <FormInputProfile
                type="tel"
                placeholder={item.phone}
                label="Telefono"
                htmlFor="phone"
                name="phone"
                error={errors.phone}
                {...register("phone", {
                  required,
                })}
              >
                <FormErrors error={errors.phone} />
              </FormInputProfile>
            </div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Correo
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={item.email}
                defaultValue={item.email}
                readOnly
                {...register("email")}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="•••••••••"
                required=""
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="confirm_password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Confirmar contraseña
              </label>
              <input
                type="password"
                id="confirm_password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="•••••••••"
                required=""
              />
            </div>

            <button
              type="submit"
              className=" group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Actualizar Información
            </button>
            <button
              className=" group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-700"
              type="button"
              onClick={() => setOpen(true)}
            >
              Eliminar cuenta
            </button>
          </form>

          <Transition.Root show={open} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-10"
              initialFocus={cancelButtonRef}
              onClose={setOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  >
                    <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                            <ExclamationIcon
                              className="h-6 w-6 text-red-600"
                              aria-hidden="true"
                            />
                          </div>
                          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <Dialog.Title
                              as="h3"
                              className="text-lg leading-6 font-medium text-gray-900"
                            >
                              Deactivar cuenta
                            </Dialog.Title>
                            <div className="mt-2">
                              <p className="text-sm text-gray-500">
                                Estás a punto de eliminar tu cuenta, está acción
                                es irrevercible.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                          type="button"
                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                          onClick={() => handleClickDelete(item.id)}
                        >
                          Eliminar cuenta
                        </button>
                        <button
                          type="button"
                          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                          onClick={() => setOpen(false)}
                          ref={cancelButtonRef}
                        >
                          Cancelar
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition.Root>
        </div>
      ))}
    </>
  );
};

export default Profile;

import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { useFirestore } from "../hooks/useFirestore";

const navigation = [
	{ name: "Home", href: "/", current: true },
	{ name: "Reseñas", href: "/review", current: false },
];

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
	const { user, logoutUser } = useContext(UserContext);
	const { data, getData } = useFirestore();

	useEffect(() => {
		getData();
	}, []);
	// method to logout user
	const handleLogout = async () => {
		try {
			await logoutUser();
		} catch (error) {
			console.log(error.code);
		}
	};

	// render navbar
	return (
		<Disclosure as="nav" className="bg-gray-800">
			{({ open }) => (
				<>
					<div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-6">
						<div className="relative flex items-center justify-between h-16">
							<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
								{/* Mobile menu button*/}
								<Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
									<span className="sr-only">Abrir menú</span>
									{open ? (
										<XIcon
											className="block h-6 w-6"
											aria-hidden="true"
										/>
									) : (
										<MenuIcon
											className="block h-6 w-6"
											aria-hidden="true"
										/>
									)}
								</Disclosure.Button>
							</div>
							<div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
								<div className="flex-shrink-0 flex items-center">
									<img
										className="block lg:hidden h-8 w-auto"
										src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
										alt="Workflow"
									/>
									<img
										className="hidden lg:block h-8 w-auto"
										src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
										alt="Workflow"
									/>
								</div>
								<div className="hidden sm:block sm:ml-6">
									<div className="flex space-x-4">
										{navigation.map((item) => (
											<NavLink
												key={item.name}
												to={item.href}
												className={classNames(
													item.current
														? "bg-gray-900 text-white"
														: "text-gray-300 hover:bg-gray-700 hover:text-white",
													"px-3 py-2 rounded-md text-sm font-medium"
												)}
												aria-current={
													item.current ? "page" : undefined
												}
											>
												{item.name}
											</NavLink>
										))}
									</div>
								</div>
							</div>
							<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
								{user ? (
									// user is logged in

									<>
										{/* button notification */}
										<button
											type="button"
											className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
										>
											<span className="sr-only">
												View notifications
											</span>
											<BellIcon
												className="h-6 w-6"
												aria-hidden="true"
											/>
										</button>
										{/* Profile dropdown */}
										<Menu as="div" className="ml-3 z-20">
											<div>
												<Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
													<span className="sr-only">
														Open user menu
													</span>
													<img
														className="h-8 w-8 rounded-full"
														src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
														alt=""
													/>
												</Menu.Button>
											</div>
											<Transition
												as={Fragment}
												enter="transition ease-out duration-100"
												enterFrom="transform opacity-0 scale-95"
												enterTo="transform opacity-100 scale-100"
												leave="transition ease-in duration-75"
												leaveFrom="transform opacity-100 scale-100"
												leaveTo="transform opacity-0 scale-95"
											>
												<Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
													<Menu.Item>
														{({ active }) => (
															<NavLink
																to="/profile"
																className={classNames(
																	active ? "bg-gray-100" : "",
																	"block px-4 py-2 text-sm text-gray-700"
																)}
															>
																Perfil
															</NavLink>
														)}
													</Menu.Item>

													{data.map((item) => (
														<div key={item.userUID}>
															{item.role == "admin" && (
																<Menu.Item>
																	{({ active }) => (
																		<NavLink
																			to="/users"
																			className={classNames(
																				active
																					? "bg-gray-100"
																					: "",
																				"block px-4 py-2 text-sm text-gray-700"
																			)}
																		>
																			Gestión de usuarios
																		</NavLink>
																	)}
																</Menu.Item>
															)}
														</div>
													))}

													<Menu.Item>
														{({ active }) => (
															// <a
															//     href="#"
															//     className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
															// >
															//     Sign out
															// </a>
															<button
																type="button"
																onClick={handleLogout}
																className={classNames(
																	active
																		? "w-full bg-red-100  "
																		: "",
																	"text-gray-700  text-sm px-4 py-2 text-center inline-flex items-center   "
																)}
															>
																<svg
																	className="w-6 h-6"
																	fill="none"
																	stroke="currentColor"
																	viewBox="0 0 24 24"
																	xmlns="http://www.w3.org/2000/svg"
																>
																	<path
																		strokeLinecap="round"
																		strokeLinejoin="round"
																		strokeWidth={2}
																		d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
																	/>
																</svg>
																Cerrar sesión
															</button>
														)}
													</Menu.Item>
												</Menu.Items>
											</Transition>
										</Menu>
									</>
								) : (
									<>
										<div className="hidden sm:block sm:ml-6">
											<div className="flex space-x-4">
												<NavLink
													key="login"
													to="/register"
													className={classNames(
														true
															? "bg-green-900 text-white"
															: "text-gray-300 hover:bg-gray-700 hover:text-white",
														"px-3 py-2 rounded-md text-sm font-medium"
													)}
													aria-current="page"
												>
													Registrate
												</NavLink>
											</div>
										</div>
										<div className="hidden sm:block sm:ml-6">
											<div className="flex space-x-4">
												<NavLink
													key="login"
													to="/login"
													className={classNames(
														true
															? "bg-green-600 text-white"
															: "text-gray-300 hover:bg-gray-700 hover:text-white",
														"px-3 py-2 rounded-md text-sm font-medium"
													)}
													aria-current="page"
												>
													Inicio de sesión
												</NavLink>
											</div>
										</div>
									</>
								)}
							</div>
						</div>
					</div>

					<Disclosure.Panel className="sm:hidden">
						<div className="px-2 pt-2 pb-3 space-y-1">
							{navigation.map((item) => (
								<Disclosure.Button
									key={item.name}
									as="a"
									href={item.href}
									className={classNames(
										item.current
											? "bg-gray-900 text-white"
											: "text-gray-300 hover:bg-gray-700 hover:text-white",
										"block px-3 py-2 rounded-md text-base font-medium"
									)}
									aria-current={item.current ? "page" : undefined}
								>
									{item.name}
								</Disclosure.Button>
							))}
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
};
export default Navbar;

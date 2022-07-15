import { useState, useEffect } from "react";
import { Carousel } from "flowbite-react";
import firebaseApp from "../Firebase";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import Mision_Vision from "../components/Mision_Vision";
const storage = getStorage(firebaseApp);

// page principale
const Home = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const getImages = async () => {
      try {
        const imagesRef = ref(storage, "images_slider");
        const querySnapshot = await listAll(imagesRef);
        const items = querySnapshot.items;
        const images = await Promise.all(
          items.map(async (item) => {
            const url = await getDownloadURL(item);
            return url;
          })
        );
        setImages(images);
      } catch (error) {
        console.log(error);
      }
    };
    getImages();
  }, []);

  return (
    <div className={"mt-14"}>
      <div className="border rounded p-2 ">
        <Carousel
          indicators={false}
          slideInterval={3000}
          leftControl={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              />
            </svg>
          }
          rightControl={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              />
            </svg>
          }
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={"slider"}
              className={"w-full h-full object-contain"}
            />
          ))}
        </Carousel>
      </div>

      {/* -------------------------------------------------------------------------------------------------------------------- */}
      <section className="pb-20 bg-gray-300 -mt-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-row flex-wrap mx-auto">
            <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-2 text-center">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-5 flex-auto">
                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                    <i className="fas fa-award" />
                  </div>
                  <h6 className="text-xl font-semibold">Lorem ipsum</h6>
                  <p className="mt-2 mb-4 text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Duis sit amet purus ut libero feugiat tincidunt.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-4/12 px-2 text-center">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-5 flex-auto">
                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-blue-400">
                    <i className="fas fa-retweet" />
                  </div>
                  <h6 className="text-xl font-semibold">Lorem ipsum</h6>
                  <p className="mt-2 mb-4 text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Duis sit amet purus ut libero feugiat tincidunt.
                  </p>
                </div>
              </div>
            </div>
            <div className="pt-12 w-full md:w-4/12 px-2 text-center">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-5 flex-auto">
                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-green-400">
                    <i className="fas fa-fingerprint" />
                  </div>
                  <h6 className="text-xl font-semibold">Lorem ipsum</h6>
                  <p className="mt-2 mb-4 text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Duis sit amet purus ut libero feugiat tincidunt.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center mt-32">
            <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
              <div className="text-gray-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-gray-100">
                <i className="fas fa-user-friends text-xl" />
              </div>
              <h3 className="text-3xl mb-2 font-semibold leading-normal">
                Lorem ipsum dolor sit, amet consectetur.
              </h3>
              <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                lobortis neque eget sapien rutrum scelerisque. Nunc fringilla
                consequat diam. Donec pharetra fermentum odio ac pellentesque.
                Curabitur bibendum fringilla arcu in convallis. Phasellus
                vestibulum lorem eget neque tempor, id consequat lacus eleifend.
              </p>
              <p className="text-lg font-light leading-relaxed mt-0 mb-8 text-gray-700">
                The kit comes with three pre-built pages to help you get started
                faster. You can change the text and images and you're good to
                go. Just make sure you enable them first via JavaScript.
              </p>
              <a
                href="https://github.com/abhinavs/cookie"
                className="font-bold text-gray-500 px-8 py-4 rounded-md bg-gray-50 hover:bg-gray-400 hover:text-gray-50"
              >
                Ver más!
              </a>
            </div>
            <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-amber-400">
                <video className="w-full align-middle rounded-t-lg" controls>
                  <source
                    src="https://firebasestorage.googleapis.com/v0/b/siiis-a2398.appspot.com/o/videos%2Fvideo_home.mp4?alt=media&token=d4728384-b3cd-46fd-9b46-bc0f009bb91e"
                    type="video/mp4"
                  />
                </video>
                <blockquote className="relative p-8 mb-4">
                  <svg
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 583 95"
                    className="absolute left-0 w-full block"
                    style={{ height: 95, top: "-94px" }}
                  >
                    <polygon
                      points="-30,95 583,95 583,65"
                      className="text-amber-400 fill-current"
                    />
                  </svg>

                  <h4 className="text-xl font-bold text-white">Lorem ipsum</h4>
                  <p className="text-md font-light mt-2 text-white">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nunc lobortis neque eget sapien rutrum scelerisque.
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* -------------------------------------------------------------------------------------------------------------------- */}
      <section className="container mx-auto text-center  mb-6">
        <div className="w-full mb-4">
          <div className="h-1 mx-auto bg-white w-1/6 opacity-25  rounded-t" />
        </div>
        <h3 className=" text-slate-800 text-3xl leading-tight font-semibold">
          Semillero de Investigación e Innovación en Ingeniería de
          Sistemas.(SIIIS)
        </h3>
      </section>
      <Mision_Vision />
    </div>
  );
};
export default Home;

import { useState, useEffect } from 'react'
import { Carousel } from "flowbite-react";
import firebaseApp from "../Firebase";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
const storage = getStorage(firebaseApp);


// page principale
const Home = () => {

  const [images, setImages] = useState([])


  useEffect(() => {
    const getImages = async () => {
      try {
        const imagesRef = ref(storage, "images_slider");
        const querySnapshot = await listAll(imagesRef);
        const items = querySnapshot.items
        const images = await Promise.all(
          items.map(async (item) => {
            const url = await getDownloadURL(item);
            return url;
          })
        )
        setImages(images)

      } catch (error) {
        console.log(error);
      }
    }
    getImages();
  }, [])


  return (
    <div className={'m-2'}>
      <div className='border rounded p-2'>
        <Carousel
          indicators={false}
          slideInterval={3000}
          leftControl={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>}
          rightControl={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>}
        >
          {images.map((image, index) => (
            <img key={index} src={image} alt={'slider'} className={'w-full h-full object-contain'} />
          ))}
        </Carousel>
      </div>
      <h1 className='mt-6 pt-4 text-center md:text-3xl lg:text-4xl xl:text-4xl sm:text-2xl font-semibold'>
        Semillero de Investigación e Innovación en Ingeniería de Sistemas.(SIIIS)
      </h1>
      <div>
        <div className="container px-5 py-12 mx-auto" style={{ cursor: "auto" }}>
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <video className="lg:w-1/2 w-full lg:h-auto border" controls>
              <source src="https://firebasestorage.googleapis.com/v0/b/siiis-a2398.appspot.com/o/videos%2FWhatsApp%20Video%202019-05-23%20at%2012.10.07%20PM.mp4?alt=media&token=1448ca31-82db-43b5-ba04-df2b3a25ac67" type="video/mp4" />
            </video>
            <div
              className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0"
              style={{ cursor: "auto" }}
            >
              <h2 className="text-center md:text-3xl lg:text-4xl xl:text-4xl sm:text-2xl font-semibold">
                Mision
              </h2>
              <p className="mt-3 text-lg text-gray-900 pb-4">
                Promover la investigación a jóvenes para ayudar e impulsar al desarrollo
                por medio de la Tecnología y la transformación digital que van surgiendo
                con el tiempo, capacitándolos y guiándolos por sus propias ideas
                germinando sus capacidades más significativas.

              </p>
              <h2 className="text-center md:text-3xl lg:text-4xl xl:text-4xl sm:text-2xl font-semibold">
                Vision
              </h2>
              <p className="mt-3 text-lg text-gray-900">
                Proyectar al 2030 el medio por el cual los estudiantes se conecten con la
                curiosidad, llegando a crear espacios para las lluvias de ideas, e temas de
                innovación, tecnología y desarrollando aplicaciones de software que
                permitan solucionar dificultades en el entorno social y Humanístico.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
export default Home;

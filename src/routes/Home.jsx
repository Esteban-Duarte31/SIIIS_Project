import { Carousel } from "flowbite-react";

// page principale
const Home = () => {
  return (
    <>
      <Carousel slideInterval={5000}>
        <img
          src="http://img2.joyreactor.com/pics/post/gif-carousel-204491.gif"
          alt="..."
        />
        <img
          src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
          alt="..."
        />
        <img
          src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
          alt="..."
        />
        <img
          src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
          alt="..."
        />
        <img
          src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
          alt="..."
        />
      </Carousel>
    </>
  );
};
export default Home;

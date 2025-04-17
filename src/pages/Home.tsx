import React from "react";
import Hero from "../components/Hero";
import ImageCarousel from "../components/ImageCarousel";

const Home: React.FC = () => {
  const carouselImages = [
    {
      title: "Slide 1",
      url: "/carouselHome/landscape1.jpg",
    },
    {
      title: "Slide 2",
      url: "/carouselHome/landscape2.jpg",
    },
    {
      title: "Slide 3",
      url: "/carouselHome/landscape3.jpg",
    },
  ];

  const carouselLinks = [
    "https://example.com/slide1",
    "https://example.com/slide2",
    "https://example.com/slide3",
  ];

  console.log("HD Key:", import.meta.env.VITE_HD_API_KEY);

  return (
    <div>
      <Hero />
      <ImageCarousel images={carouselImages} links={carouselLinks} />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <h3 className="text-2xl font-bold mb-2">Home Content</h3>
        <p>
          This is an example content section on your home page. Customize it as
          needed.
        </p>
      </section>
    </div>
  );
};

export default Home;

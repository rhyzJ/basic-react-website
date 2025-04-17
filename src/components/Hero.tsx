import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="relative py-20 bg-[url('/colours.jpg')] bg-cover">
      {/* overlay */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative container mx-auto text-center text-white">
        <h2 className="text-4xl font-bold mb-4">Welcome to My Website</h2>
        <p className="text-lg mb-8">
          Discover amazing content and explore our awesome features!
        </p>
        <a
          href="/form"
          className="bg-orange-600 text-white px-6 py-3 rounded-full hover:bg-orange-900 transition duration-300"
        >
          Get Started
        </a>
      </div>
    </section>
  );
};

export default Hero;

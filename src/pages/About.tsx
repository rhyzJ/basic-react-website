const About: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
      {/* 1 */}
      <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-8 mt-8">
        <div className="text-center w-[250px] h-[240px] bg-white p-6 rounded-2xl shadow-lg border border-gray-300 flex flex-col items-center justify-center">
          <img
            src="/blank-profile.png"
            alt="Profile"
            className="w-24 h-24 mb-1 object-contain rounded-full"
          />
          <p className="text-base font-bold mt-2">Name</p>
          <p className="text-base font-regular">Position</p>
          <p className="text-xs text-gray-600 text-center leading-tight mt-4">
            About me
          </p>
        </div>

        {/* 2 */}
        <div className="text-center w-[250px] h-[240px] bg-white p-6 rounded-2xl shadow-lg border border-gray-300 flex flex-col items-center justify-center">
          <img
            src="/blank-profile.png"
            alt="Profile"
            className="w-24 h-24 mb-1 object-contain rounded-full"
          />
          <p className="text-base font-bold mt-2">Name</p>
          <p className="text-base font-regular">Position</p>
          <p className="text-xs text-gray-600 text-center leading-tight mt-4">
            About me
          </p>
        </div>

        {/* 3 */}
        <div className="text-center w-[250px] h-[240px] bg-white p-6 rounded-2xl shadow-lg border border-gray-300 flex flex-col items-center justify-center">
          <img
            src="/blank-profile.png"
            alt="Profile"
            className="w-24 h-24 mb-1 object-contain rounded-full"
          />
          <p className="text-base font-bold mt-2">Name</p>
          <p className="text-base font-regular">Position</p>
          <p className="text-xs text-gray-600 text-center leading-tight mt-4">
            About me
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;

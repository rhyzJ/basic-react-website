import React from "react";

interface SubmitButtonProps {
  isLoading: boolean;
}

const OrbitingLoader: React.FC = () => {
  return (
    <div className="relative w-[150px] h-[150px] mb-7">
      {/*  sun */}
      <div className="absolute w-[35px] h-[35px] bg-gradient-to-b from-yellow-400 to-orange-600 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 animate-pulse-sun shadow-lg " />

      {/* mercury */}
      <div
        className="absolute top-1/2 left-1/2 w-[70px] h-[70px] animate-orbit-faster transform -translate-x-1/2 -translate-y-1/2 origin-center"
        style={{ transform: "rotate(30deg)" }}
      >
        {/* Orbit line */}
        <div className="absolute inset-0 border-[0.3px] border-gray-300 rounded-full" />
        {/* Orbiting dot centered on orbit line */}
        <div
          className="w-[9px] h-[9px] bg-gradient-to-b from-yellow-100 to-black rounded-full absolute top-1/2 left-1/2"
          style={{
            transform: "translate(-50%, -50%) translateY(-35px)", // Increase this to match the new orbit size
          }}
        />
      </div>

      {/* venus*/}
      <div
        className="absolute top-1/2 left-1/2 w-[100px] h-[100px] animate-orbit-fast transform -translate-x-1/2 -translate-y-1/2 origin-center"
        style={{ transform: "rotate(-45deg)" }}
      >
        {/* Orbit line */}
        <div className="absolute inset-0 border-[0.3px] border-gray-300 rounded-full" />
        {/* Orbiting dot centered on orbit line */}
        <div
          className="w-[13px] h-[13px] bg-gradient-to-b from-amber-400 to-amber-100 rounded-full absolute top-1/2 left-1/2"
          style={{
            transform: "translate(-50%, -50%) translateY(-50px)", // 100px / 2 = 50
          }}
        />
      </div>

      {/* Earth */}
      <div
        className="absolute top-1/2 left-1/2 w-[130px] h-[130px] animate-orbit-slow transform -translate-x-1/2 -translate-y-1/2 origin-center"
        style={{ transform: "rotate(90deg)" }}
      >
        {/* Orbit line */}
        <div className="absolute inset-0 border-[0.3px] border-gray-300 rounded-full" />
        {/* Orbiting dot centered on orbit line */}
        <div
          className="w-[15px] h-[15px] bg-gradient-to-b from-blue-400 to-green-600 rounded-full absolute top-1/2 left-1/2"
          style={{
            transform: "translate(-50%, -50%) translateY(-65px)", // Adjusted to be a nice middle ground
          }}
        />
      </div>

      {/* Mars */}
      <div
        className="absolute top-1/2 left-1/2 w-[170px] h-[170px] animate-orbit-slower transform -translate-x-1/2 -translate-y-1/2 origin-center"
        style={{ transform: "rotate(-90deg)" }}
      >
        {/* Orbit line */}
        <div className="absolute inset-0 border-[0.3px] border-gray-300 rounded-full" />
        {/* Orbiting dot centered on orbit line */}
        <div
          className="w-[11px] h-[11px] bg-gradient-to-b from-red-700 to-orange-400 rounded-full absolute top-1/2 left-1/2"
          style={{
            transform: "translate(-50%, -50%) translateY(-85px)", // Adjusted to be slightly closer
          }}
        />
      </div>
    </div>
  );
};

const SubmitButton: React.FC<SubmitButtonProps> = ({ isLoading }) => {
  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center p-0 m-0 overflow-visible">
        <OrbitingLoader />
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center items-center">
      <button
        type="submit"
        className="w-1/2 bg-orange-400 text-white font-semibold py-3 rounded-xl hover:shadow-xl transition duration-200 flex justify-center items-center gap-2 cursor-pointer"
      >
        Submit
      </button>
    </div>
  );
};

export default SubmitButton;

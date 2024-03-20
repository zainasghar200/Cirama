import React from "react";

export default function FileInput() {
  return (
    <>
      <div className="md:w-[370px] md:h-[400px] lg:w-[470px] lg:h-[500px] rounded-lg bg-[#224957] flex flex-col justify-center items-center p-6 md:p-10">
        <img
          src="./icons/drop-file.svg"
          className="w-6 h-6 md:w-8 md:h-8"
          alt="Drop file"
        />
        <div className="text-white mt-2">Drop your file here</div>
      </div>
    </>
  );
}

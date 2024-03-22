import React from "react";

export default function MoviePoster({ image }) {
  return (
    <>
      <div className="md:w-[370px] lg:w-[470px] rounded-lg bg-[#224957] flex flex-col justify-center items-center p-2">
        <img src={image} className="w-full h-auto rounded-lg" alt="Drop file" />
      </div>
    </>
  );
}

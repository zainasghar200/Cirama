import React from "react";
import { Link } from "react-router-dom";

export default function MovieList() {
  return (
    <div className="w-full min-h-[100vh] bg-[#163545] px-20">
      <div className="pt-20 pb-10 flex flex-row justify-between items-center">
        <div className="flex flex-row gap-2 items-center">
          <div className="text-5xl font-medium text-white">My movies</div>
          <Link to="/create">
            <img
              src="./icons/add_circle_outline.svg"
              className="w-[24px] h-[24px] mt-3"
            />
          </Link>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <div className="text-xl font-medium text-white">Logout</div>
          <img src="./icons/logout.svg" className="w-[24px] h-[24px]" />
        </div>
      </div>

      <div className="py-10 flex flex-wrap gap-2">
        <div className="w-[calc(25% - 8px)] bg-[#092C39] px-[8px] pt-[8px] pb-[16px] rounded-xl">
          <img src="/movieBanner.png" className="w-full" />

          <div className="p-2">
            <div className="text-xl text-white">MovieName</div>
            <div className="text-base text-white">YearOfRelease</div>
          </div>
        </div>
      </div>
    </div>
  );
}

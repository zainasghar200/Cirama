import React from "react";
import { Link } from "react-router-dom";

export default function EmptyState() {
  return (
    <div className="w-full h-[100vh] flex flex-row justify-center items-center bg-[#163545]">
      <div className="flex flex-col gap-8 justify-between items-center">
        <div className="text-center text-6xl font-medium text-white">
          Your movie list is empty
        </div>
        <Link
          className="w-[202px] bg-[#66D17F] p-[15px] rounded-md text-white text-center"
          to="/movie-list"
        >
          Add a new movie
        </Link>
      </div>
    </div>
  );
}

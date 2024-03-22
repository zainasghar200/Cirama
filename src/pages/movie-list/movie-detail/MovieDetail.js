import React, { useState } from "react";
import MoviePosterComponent from "../../../component/movie-poster/MoviePoster";

export default function MovieDetail({ MovieObject }) {
  console.log("MovieObject: ", MovieObject);

  const [rating, setRating] = useState(0);

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 10; i++) {
      stars.push(
        <label
          key={i}
          htmlFor={`star${i}`}
          className={`text-xl cursor-pointer ${
            i <= rating ? "text-yellow-400" : "text-[#224957]"
          }`}
          onClick={() => handleRatingClick(i)}
        >
          &#9733;
        </label>
      );
      stars.push(
        <input
          key={`input${i}`}
          type="radio"
          id={`star${i}`}
          name="rating"
          value={i}
          className="hidden"
        />
      );
    }
    return stars;
  };

  const handleRatingClick = (value) => {
    console.log("value: ", value);
    setRating(value);
    // Here you can add the logic to send the rating value to the backend
    // Example: sendRatingToBackend(value);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#163545]">
      <div className="flex-grow px-5 md:px-10 lg:px-20">
        <div className="pt-10 pb-10 lg:pt-20 lg:pb-10 flex flex-row justify-between items-center">
          <div className="text-xl md:text-3xl lg:text-5xl font-medium text-white">
            {MovieObject.original_title}
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-6 flex-grow">
          <MoviePosterComponent image={MovieObject.poster_path} />
          <div className="w-full md:ml-10 md:w-1/2 lg:w-1/2">
            <div className="md:w-[312px] lg:w-[362px] flex flex-col justify-center item-center gap-4">
              <div className="w-full bg-[#224957] text-white p-2 rounded-md text-sm md:text-base">
                <div>{MovieObject.overview}</div>
                <div>{MovieObject.vote_average}</div>
                <div>{MovieObject.release_date}</div>

                <div>
                  {MovieObject.casts
                    .sort(
                      (a, b) =>
                        parseFloat(b.popularity) - parseFloat(a.popularity)
                    )
                    .slice(0, 5)
                    .map((cast, index) => (
                      <div key={index}>{cast.name}</div>
                    ))}
                </div>
              </div>
              <div className="flex items-center">{renderStars()}</div>
              <div className="flex flex-col mt-5 lg:mt-10 md:flex-row gap-2">
                <button className="w-full md:w-1/2 bg-transparent border border-white p-2 rounded-md text-white text-center hover:bg-white hover:text-[#66D17F] transition duration-300">
                  Cancel
                </button>
                <button className="w-full md:w-1/2 bg-[#66D17F] p-2 rounded-md text-white text-center hover:bg-white hover:text-[#66D17F] transition duration-300">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

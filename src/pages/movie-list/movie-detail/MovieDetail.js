import React, { useState } from "react";
import MoviePosterComponent from "../../../component/movie-poster/MoviePoster";

export default function MovieDetail({ MovieObject, onCancel, onSubmit }) {
  const [rating, setRating] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

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

  const renderHeart = () => {
    if (isFavorite) {
      // Check if the movie is marked as favorite
      return (
        <label
          className="text-2xl text-red-500 cursor-pointer"
          onClick={toggleFavorite}
        >
          &#9829;
        </label>
      );
    } else {
      return (
        <label
          className="text-2xl text-[#224957] cursor-pointer"
          onClick={toggleFavorite}
        >
          &#9829;
        </label>
      );
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite); // Toggle favorite status
  };

  const handleRatingClick = (value) => {
    console.log("value: ", value);
    setRating(value);
  };

  // Lift-Up
  const handleCancel = () => {
    onCancel();
  };

  const handleSubmit = () => {
    const submission = {
      rating: rating,
      isFavorite: isFavorite,
    };
    onSubmit(submission);
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
              <div className="flex flex-row justify-between items-center">
                <div>{renderStars()}</div>
                <div>{renderHeart()}</div>
              </div>
              <div className="flex flex-col mt-5 lg:mt-10 md:flex-row gap-2">
                <button
                  className="w-full md:w-1/2 bg-transparent border border-white p-2 rounded-md text-white text-center hover:bg-white hover:text-[#66D17F] transition duration-300"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  className="w-full md:w-1/2 bg-[#66D17F] p-2 rounded-md text-white text-center hover:bg-white hover:text-[#66D17F] transition duration-300"
                  onClick={handleSubmit}
                >
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

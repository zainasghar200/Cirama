import React, { useState } from "react";
import MoviePosterComponent from "../../../component/movie-poster/MoviePoster";

export default function MovieDetail({ MovieObject, onCancel, onSubmit }) {
  const [rating, setRating] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [reviews, setReviews] = useState();
  const [submissions, setSubmissions] = useState([]);

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

  const Star = ({ rating, iconsSize }) => {
    if (rating <= 0) {
      return (
        <label className={`${iconsSize} text-[#224957] cursor-pointer`}>
          &#9733;
        </label>
      );
    }

    return (
      <label className={`${iconsSize} text-[#FFD700] cursor-pointer`}>
        &#9733;
      </label>
    );
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
    const value = {
      rating: rating,
      isFavorite: isFavorite,
      reviews: reviews,
    };
    setSubmissions([...submissions, value]);
    setRating(0);
    setReviews("");
    setIsFavorite(false);
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
                <div className="text-lg font-medium">Overview:</div>
                <div className="text-sm">{MovieObject.overview}</div>

                <div className="flex flex-row items-center gap-2">
                  <Star iconsSize="text-xl" rating={MovieObject.vote_average} />
                  <div className="font-medium">
                    ({MovieObject.vote_average})
                  </div>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <div>Released On:</div>
                  <div className="font-medium">{MovieObject.release_date}</div>
                </div>
                <div className="flex flex-row items-baseline gap-2">
                  <div className="text-lg font-medium">Stars: </div>
                  <div className="flex flex-wrap">
                    {MovieObject.casts
                      .sort(
                        (a, b) =>
                          parseFloat(b.popularity) - parseFloat(a.popularity)
                      )
                      .slice(0, 5)
                      .map((cast, index) => (
                        <div key={index} className="mr-5">
                          {cast.name},
                        </div>
                      ))}
                  </div>
                </div>
                <div className="text-lg font-medium">Reviews:</div>
                <div className="bg-[#1E454A] p-[2px] rounded-md overflow-auto h-[160px]">
                  {submissions.map((submission, index) => (
                    <div
                      key={index}
                      className={`border-b border-[#092C39] ${
                        index === 0 ? "rounded-t-md" : ""
                      } ${
                        index === submissions.length - 1 ? "rounded-b-md" : ""
                      } hover:bg-[#092C39] p-1`}
                    >
                      <div className="flex flex-row justify-between items-center">
                        <div className="font-bold text-xs">UserName:</div>
                        <div>
                          <Star
                            iconsSize="text-xs"
                            rating={submission.rating}
                          />
                          <span>({submission.rating})</span>
                        </div>
                      </div>
                      <div className="w-full rounded-md text-xs">
                        {submission.reviews}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-row justify-between items-center">
                <div>
                  <div className="text-white font-medium">Rate Movie: </div>{" "}
                  <div>{renderStars()}</div>
                </div>
                <div>{renderHeart()}</div>
              </div>
              <div>
                <input
                  className="w-full bg-[#224957] p-2 rounded-md text-sm md:text-base"
                  placeholder="Add Your Review"
                  value={reviews}
                  onChange={(e) => {
                    setReviews(e.target.value);
                  }}
                />
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

import React from "react";

export default function MovieCard({
  index,
  PosterImage,
  MovieName,
  ReleaseDate,
  MovieRating,
}) {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 10; i++) {
      if (i <= rating) {
        stars.push(
          <label
            key={i}
            htmlFor={`star${i}`}
            className="text-xl text-[#FFD700] cursor-pointer"
          >
            &#9733;
          </label>
        );
      } else {
        stars.push(
          <label
            key={i}
            htmlFor={`star${i}`}
            className="text-xl text-[#224957] cursor-pointer"
          >
            &#9733;
          </label>
        );
      }
      stars.push(
        <input
          key={`input${i}`}
          type="radio"
          id={`star${i}`}
          name={`rating-${index}`}
          value={i}
          className="hidden"
          checked={i === Math.round(rating)}
        />
      );
    }
    return stars;
  };

  return (
    <div
      key={index}
      className="w-[260px] bg-[#092C39] px-[8px] pt-[8px] pb-[16px] rounded-xl"
    >
      <img src={PosterImage} className="w-full rounded-xl" />

      <div className="p-2">
        <div className="text-2xl text-white">{MovieName}</div>
        <div className="text-base text-white">{ReleaseDate}</div>
        <div className="flex items-end">
          <div className="flex items-center mr-2">
            {renderStars(MovieRating)}
          </div>
          <div className="text-white font-medium">({MovieRating})</div>
        </div>
      </div>
    </div>
  );
}

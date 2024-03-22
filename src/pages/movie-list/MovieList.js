import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from "../../component/dropdown/Dropdown";
import Footer from "../../component/footer/Footer";
import MovieCard from "../../component/movie-card/MovieCard";

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [searchNameQuery, setSearchNameQuery] = useState("");
  const [searchRatingQuery, setSearchRatingQuery] = useState("");
  const [searchGenreQuery, setSearchGenreQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSortingCriteria, setSelectedSortingCriteria] = useState("");

  useEffect(() => {
    getMovieList();
  }, []);

  const getMovieList = async () => {
    try {
      const response = await fetch(`https://jsonfakery.com/movies/paginated`);
      const movieData = await response.json();
      setMovies(movieData.data);
    } catch (error) {
      console.log(error);
    }
  };

  function handleSelect(item) {
    if (item.startsWith("Sort by")) {
      setSelectedSortingCriteria(item);
    } else {
      setSearchRatingQuery(item);
    }
  }

  function handleDateChange(event) {
    setSelectedDate(event.target.value);
  }

  function filterByReleaseDate(movie) {
    if (!selectedDate) return true;
    const selectedDateObj = new Date(selectedDate);
    const movieDateObj = new Date(movie.release_date);
    return (
      selectedDateObj.getDate() === movieDateObj.getDate() &&
      selectedDateObj.getMonth() === movieDateObj.getMonth() &&
      selectedDateObj.getFullYear() === movieDateObj.getFullYear()
    );
  }

  function sortMovies() {
    const sortedMovies = [...movies];
    switch (selectedSortingCriteria) {
      case "Sort by Name":
        sortedMovies.sort((a, b) =>
          a.original_title.localeCompare(b.original_title)
        );
        break;
      case "Sort by Rating":
        sortedMovies.sort((a, b) => a.vote_average - b.vote_average);
        break;
      case "Sort by Release Date":
        sortedMovies.sort(
          (a, b) => new Date(a.release_date) - new Date(b.release_date)
        );
        break;
      default:
        break;
    }
    return sortedMovies;
  }

  const sortedMovies = sortMovies();

  return (
    <div className="w-full min-h-[100vh] bg-[#163545]">
      <div className="w-full min-h-[100vh] bg-[#163545] px-20">
        <div className="pt-20 pb-10 flex flex-row gap-2 justify-between items-center">
          <div className="flex flex-row gap-2 items-center flex-grow">
            <div className="text-5xl font-medium text-white">My movies</div>
            <Link to="/create">
              <img
                src="./icons/add_circle_outline.svg"
                className="w-[24px] h-[24px] mt-3"
                alt="Add movie"
              />
            </Link>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <div className="text-xl font-medium text-white">Logout</div>
            <img
              src="./icons/logout.svg"
              className="w-[24px] h-[24px]"
              alt="Logout"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex-grow-0 flex-shrink-0 w-1/4">
            <input
              className="w-full bg-[#224957] text-gray-200 p-2 rounded-md text-sm md:text-base focus:outline-none"
              placeholder="Search by Movie Name, Release Date and Rating etc"
              value={searchNameQuery}
              onChange={(event) => setSearchNameQuery(event.target.value)}
              disabled={!movies}
            />
          </div>
          <div className="flex-grow-0 flex-shrink-0 w-1/4">
            <input
              type="date"
              className="w-full bg-[#224957] text-gray-200 p-2 rounded-md text-sm md:text-base focus:outline-none cursor-pointer"
              placeholder="Select Release Date"
              value={selectedDate}
              onChange={handleDateChange}
              disabled={!movies}
            />
          </div>
          <div className="flex-grow-0 flex-shrink-0 w-1/4">
            <Dropdown
              dropdownName="Select Rating"
              items={[
                "Show me movies with ratings less 5.0.",
                "Show me movies with ratings above 5.0.",
                "Filter highly-rated movies with ratings above 7.5.",
              ]}
              onSelect={handleSelect}
            />
          </div>
          <div className="flex-grow-0 flex-shrink-0 w-1/4">
            <Dropdown
              dropdownName="Select Genre"
              items={[]}
              onSelect={handleSelect}
            />
          </div>
          <div className="flex-grow-0 flex-shrink-0 w-1/4">
            <Dropdown
              dropdownName="Select Sorting"
              items={["Sort by Name", "Sort by Rating", "Sort by ReleaseDate"]}
              onSelect={handleSelect}
            />
          </div>
        </div>

        <div className="py-10 flex flex-wrap gap-4 justify-center">
          {sortedMovies &&
            sortedMovies.map((movie, index) =>
              filterByReleaseDate(movie) &&
              movie.original_title
                .toLowerCase()
                .includes(searchNameQuery.toLowerCase()) &&
              movie.vote_average.toString().includes(searchRatingQuery) ? (
                <MovieCard
                  key={index}
                  index={index}
                  PosterImage={movie.poster_path}
                  MovieName={movie.original_title}
                  ReleaseDate={movie.release_date}
                  MovieRating={movie.vote_average}
                />
              ) : null
            )}
        </div>
      </div>
      <div className="flex justify-end">
        <Footer />
      </div>
    </div>
  );
}

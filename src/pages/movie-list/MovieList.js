import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "../../component/dropdown/Dropdown";
import MovieCard from "../../component/movie-card/MovieCard";
import MovieDetail from "./movie-detail/MovieDetail";

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [searchNameQuery, setSearchNameQuery] = useState("");
  const [searchRatingQuery, setSearchRatingQuery] = useState("");
  const [searchGenreQuery, setSearchGenreQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSortingCriteria, setSelectedSortingCriteria] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [genres, setGenres] = useState(["horror", "comedy", "sci-fi"]); // Define genres
  const navigate = useNavigate();

  useEffect(() => {
    getMovieList();
  }, []);

  const getMovieList = async () => {
    try {
      const response = await fetch(`https://jsonfakery.com/movies/paginated`);
      if (!response.ok) {
        navigate("/empty-state");
        return;
      }
      const movieData = await response.json();
      // Add genre to each movie object
      const moviesWithGenres = movieData.data.map((movie) => {
        // Randomly select a genre from the predefined list
        const randomIndex = Math.floor(Math.random() * genres.length);
        const randomGenre = genres[randomIndex];
        return { ...movie, genre: randomGenre };
      });
      setMovies(moviesWithGenres);
    } catch (error) {
      console.log(error);
    }
  };

  function handleSelect(item, type) {
    if (type === "Sorting") {
      if (item.startsWith("Sort by")) {
        setSelectedSortingCriteria(item);
      }
    } else if (type === "Rating") {
      setSearchRatingQuery(item);
    } else if (type === "Genre") {
      setSearchGenreQuery(item);
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
          (a, b) =>
            new Date(a.release_date).getTime() -
            new Date(b.release_date).getTime()
        );
        break;
      default:
        break;
    }
    return sortedMovies;
  }

  const sortedMovies = sortMovies();

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCancel = () => {
    setSelectedMovie(false);
  };

  const handleSubmit = (submission) => {
    setSelectedMovie(false);
    console.log(submission);
  };

  return (
    <>
      {!selectedMovie && (
        <div className="px-20">
          <div className="pt-20 pb-10 flex flex-row gap-2 justify-between items-center">
            <div className="flex flex-row gap-2 items-center flex-grow">
              <div className="text-5xl font-medium text-white">My movies</div>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <div className="text-xl font-medium text-white">Logout</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="w-full sm:w-1/2 md:w-1/4">
              <input
                className="w-full bg-[#224957] text-gray-200 p-2 rounded-md text-sm md:text-base focus:outline-none"
                placeholder="Search by Movie Name"
                value={searchNameQuery}
                onChange={(event) => setSearchNameQuery(event.target.value)}
                disabled={!movies}
              />
            </div>
            <div className="w-full sm:w-1/2 md:w-1/4">
              <input
                type="date"
                className="w-full bg-[#224957] text-gray-200 p-2 rounded-md text-sm md:text-base focus:outline-none cursor-pointer"
                placeholder="Select Release Date"
                value={selectedDate}
                onChange={handleDateChange}
                disabled={!movies}
              />
            </div>
            <div className="w-full sm:w-1/2 md:w-1/4">
              <Dropdown
                dropdownName="Select Rating"
                items={[
                  "Ratings less 5.0.",
                  "Ratings above 5.0.",
                  "Highly-Rated above 7.5.",
                ]}
                onSelect={(item) => handleSelect(item, "Rating")}
              />
            </div>
            <div className="w-full sm:w-1/2 md:w-1/4">
              <Dropdown
                dropdownName="Select Genre"
                items={genres} // Populate dropdown with genres
                onSelect={(item) => handleSelect(item, "Genre")}
              />
            </div>
            <div className="w-full sm:w-1/2 md:w-1/4">
              <Dropdown
                dropdownName="Select Sorting"
                items={[
                  "Sort by Name",
                  "Sort by Rating",
                  "Sort by Release Date",
                ]}
                onSelect={(item) => handleSelect(item, "Sorting")}
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
                (searchRatingQuery === "" ||
                  (searchRatingQuery === "Ratings less 5.0." &&
                    movie.vote_average < 5.0) ||
                  (searchRatingQuery === "Ratings above 5.0." &&
                    movie.vote_average > 5.0) ||
                  (searchRatingQuery ===
                    "Filter highly-rated movies with ratings above 7.5." &&
                    movie.vote_average > 7.5)) &&
                (searchGenreQuery === "" ||
                  movie.genre === searchGenreQuery) ? (
                  <div
                    key={index}
                    className="cursor-pointer"
                    onClick={() => handleMovieClick(movie)}
                  >
                    <MovieCard
                      key={index}
                      index={index}
                      PosterImage={movie.poster_path}
                      MovieName={movie.original_title}
                      ReleaseDate={movie.release_date}
                      MovieRating={movie.vote_average}
                    />
                  </div>
                ) : null
              )}
          </div>
        </div>
      )}

      {selectedMovie && (
        <MovieDetail
          MovieObject={selectedMovie}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
}

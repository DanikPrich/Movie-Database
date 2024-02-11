import { fetchMovieList, fetchMovie } from "../store/movieSlice";
import { apiMovies } from "../api/movies";
import { createReduxStore } from "../store";

describe("moviesSlice TEST", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("fetchMovieList success", async () => {

    const mockResponse = {
      data: [
        {
          id: "tt0372784",
          year: "2005",
          type: "movie",
          title: "Batman Begins",
          poster:
            "https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
        },
        {
          id: "tt1877830",
          year: "2022",
          type: "movie",
          title: "The Batman",
          poster:
            "https://m.media-amazon.com/images/M/MV5BM2MyNTAwZGEtNTAxNC00ODVjLTgzZjUtYmU0YjAzNmQyZDEwXkEyXkFqcGdeQXVyNDc2NTg3NzA@._V1_SX300.jpg",
        },
        {
          id: "tt2975590",
          year: "2016",
          type: "movie",
          title: "Batman v Superman: Dawn of Justice",
          poster:
            "https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
        },
      ],
      total: 561,
      page: 1,
    };

    const postSpy = jest
      .spyOn(apiMovies, "getMoviesByTitle")
      .mockResolvedValueOnce(mockResponse);

    const store = createReduxStore();
    await store.dispatch(fetchMovieList({ title: "batman", page: 1 }));

    const { movie } = store.getState();

    expect(postSpy).toBeCalledTimes(1);
    expect(movie.movieListLoadingStatus).toBe("idle");
    expect(movie.movieList).toEqual(mockResponse.data);
    expect(movie.total).toEqual(mockResponse.total);
    expect(movie.page).toEqual(mockResponse.page);
  });

  test("fetchMovie success", async () => {

    const mockResponse = {
      id: "tt1877830",
      year: "2022",
      type: "movie",
      title: "The Batman",
      poster: "https://m.media-amazon.com/images/M/MV5BM2MyNTAwZGEtNTAxNC00ODVjLTgzZjUtYmU0YjAzNmQyZDEwXkEyXkFqcGdeQXVyNDc2NTg3NzA@._V1_SX300.jpg",
      plot: "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement.",
      writer: "Matt Reeves, Peter Craig, Bob Kane",
      imdbRating: "7.8",
      imdbVotes: "765,024",
      genre: "Action, Crime, Drama",
      country: "United States",
      actors: "Robert Pattinson, Zoë Kravitz, Jeffrey Wright",
    };

    const postSpy = jest
      .spyOn(apiMovies, "getMovieById")
      .mockResolvedValueOnce(mockResponse);

    const store = createReduxStore();

    await store.dispatch(fetchMovie('tt1877830'));

    const { movie } = store.getState();

    expect(postSpy).toBeCalledTimes(1);
    expect(movie.movieLoadingStatus).toBe("idle");
    expect(movie.movie).toEqual(mockResponse);
  });
});

import {
  applySnapshot,
  flow,
  onSnapshot,
  SnapshotIn,
  types,
} from 'mobx-state-tree';
import API from 'src/api';
import {storage} from './mmk-store';

export interface MovieDTO {
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
}

export const Movie = types.model({
  id: types.number,
  original_language: types.string,
  original_title: types.string,
  overview: types.string,
  popularity: types.number,
  poster_path: types.string,
  release_date: types.string,
  title: types.string,
  vote_average: types.number,
});

export const MovieStore = types
  .model({
    movieMap: types.map(Movie),
    nowPlaying: types.array(Movie),
    popular: types.array(Movie),
    upcoming: types.array(Movie),
    favorites: types.map(Movie),
  })
  .actions(self => {
    const changeInfo = (data: SnapshotIn<typeof MovieStore>) => {
      applySnapshot(self, data);
    };

    const addFavorite = flow(function* (movie: SnapshotIn<typeof Movie>) {
      self.favorites.set(movie.id, {...movie});
    });

    const removeFavorite = flow(function* (movie: SnapshotIn<typeof Movie>) {
      self.favorites.delete(movie.id.toString());
    });

    const isFavorite = (movie: SnapshotIn<typeof Movie>) => {
      return self.favorites.has(movie.id.toString());
    };

    const getFavorites = () => {
      return Array.from(self.favorites.values());
    };

    const getMovie = (id: number) => {
      return self.movieMap.get(id);
    };

    const getMovies = () => {
      return Array.from(self.movieMap.values());
    };

    const clear = () => {
      self.movieMap.clear();
      self.favorites.clear();
    };

    const load = (data: SnapshotIn<typeof MovieStore>) => {
      applySnapshot(self, data);
    };

    const save = () => {
      storage.set('movie.store', JSON.stringify(self));
    };

    const restore = () => {
      const data = storage.getString('movie.store');
      if (data) {
        applySnapshot(self, JSON.parse(data));
      }
    };

    const init = () => {
      restore();
    };

    const destroy = () => {
      storage.delete('movie.store');
    };

    const addMovies = flow(function* (movies: SnapshotIn<typeof Movie>[]) {
      movies.forEach(movie => {
        try {
          self.movieMap.set(movie.id, movie);
        } catch (error) {
          console.log(error);
        }
      });
    });

    const removeMovies = flow(function* (movies: SnapshotIn<typeof Movie>[]) {
      movies.forEach(movie => {
        self.movieMap.delete(movie.id.toString());
      });
    });

    const addFavoriteMovies = flow(function* (
      movies: SnapshotIn<typeof Movie>[],
    ) {
      movies.forEach(movie => {
        self.favorites.set(movie.id.toString(), movie);
      });
    });

    const removeFavoriteMovies = flow(function* (
      movies: SnapshotIn<typeof Movie>[],
    ) {
      movies.forEach(movie => {
        self.favorites.delete(movie.id.toString());
      });
    });

    const isFavoriteMovies = (movies: SnapshotIn<typeof Movie>[]) => {
      return movies.every(movie => self.favorites.has(movie.id.toString()));
    };

    const getFavoriteMovies = () => {
      return Array.from(self.favorites.values());
    };

    const getFavoriteMoviesIds = () => {
      return Array.from(self.favorites.keys());
    };

    const clearFavorites = () => {
      self.favorites.clear();
    };

    const clearMovies = () => {
      self.movieMap.clear();
    };

    const fetchAllMovies = flow(function* (paths: string[]) {
      try {
        const [nowPlayingRes, popularRes, upcomingRes] = yield Promise.all(
          paths.map(path => API.getMovies({path})),
        );

        addMovies(nowPlayingRes.results);
        addMovies(popularRes.results);
        addMovies(upcomingRes.results);

        self.nowPlaying = nowPlayingRes.results;
        self.popular = popularRes.results;
        self.upcoming = upcomingRes.results;
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    });

    return {
      fetchAllMovies,
      changeInfo,
      addFavorite,
      removeFavorite,
      isFavorite,
      getFavorites,
      getMovie,
      getMovies,
      clear,
      load,
      save,
      restore,
      init,
      destroy,
      addMovies,
      removeMovies,
      addFavoriteMovies,
      removeFavoriteMovies,
      isFavoriteMovies,
      getFavoriteMovies,
      getFavoriteMoviesIds,
      clearFavorites,
      clearMovies,
    };
  });

export const movieStore = MovieStore.create({});

onSnapshot(movieStore, snapshot => {
  storage.set('movie.store', JSON.stringify(snapshot));
});

type MovieStoreType = typeof movieStore;

export type {MovieStoreType};

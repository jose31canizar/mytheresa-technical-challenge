import {applySnapshot, onSnapshot, SnapshotIn, types} from 'mobx-state-tree';
import {storage} from './mmk-store';

export const Movie = types.model({
  id: types.number,
});

export const MovieStore = types
  .model({
    movieMap: types.map(Movie),
    favorites: types.map(Movie),
  })
  .actions(self => {
    const changeInfo = (data: SnapshotIn<typeof MovieStore>) => {
      applySnapshot(self, data);
    };

    return {changeInfo};
  });

export const movieStore = MovieStore.create({});

onSnapshot(movieStore, snapshot => {
  storage.set('movie.store', JSON.stringify(snapshot));
});

type MovieStoreType = typeof movieStore;

export type {MovieStoreType};

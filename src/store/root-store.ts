import {types} from 'mobx-state-tree';
import {MovieStore, MovieStoreType} from './movie-store';
import {NetworkStore, NetworkStoreType} from './network-store';

export type TRootStore = {
  movie: MovieStoreType;
  network: NetworkStoreType;
  clear: () => Promise<void>;
};

const RootStore = types
  .model({
    movie: MovieStore,
    network: NetworkStore,
  })
  .actions(self => {
    const clear = async () => {
      self.movie.clear();
    };

    return {clear};
  });

export default RootStore;

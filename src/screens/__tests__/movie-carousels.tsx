import React from 'react'
import { render, waitFor } from "@testing-library/react-native"
import { MovieCarousels } from '../index'
import { StoreContext } from 'src/context';
import { MovieStore } from 'src/store/movie-store';
import RootStore from 'src/store/root-store';
import { NetworkStore } from 'src/store/network-store';

const movieStore = MovieStore.create({
    movieMap: {},
    nowPlaying: [],
    popular: [],
    upcoming: [],
    favorites: {}
})

const networkStore = NetworkStore.create({})

const mockStore = RootStore.create({
    movie: movieStore,
    network: networkStore
})

jest.mock('src/api', () => ({
    getMovies: jest.fn().mockResolvedValue({ results: [] })
}));

it('shows empty state when no movies are loaded', async () => {
    const { getAllByText } = render(
        <StoreContext.Provider value={{ store: mockStore }}>
            <MovieCarousels navigation={{} as any} />
        </StoreContext.Provider>
    );

    await waitFor(() => {
        const emptyStates = getAllByText('No movies found');
        expect(emptyStates).toHaveLength(3); // One for each carousel
    });
});
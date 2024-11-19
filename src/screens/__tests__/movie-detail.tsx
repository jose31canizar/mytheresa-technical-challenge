import React from 'react'
import { render } from "@testing-library/react-native"
import { MovieDetail } from '../index'
import { StoreContext } from 'src/context';
import { } from 'mobx-state-tree';
import { MovieStore } from 'src/store/movie-store';
import RootStore from 'src/store/root-store';
import { NetworkStore } from 'src/store/network-store';

const movieStore = MovieStore.create({
    movieMap: {
        "1": { id: 1, title: "Inception", popularity: 8.8, poster_path: "test.jpg", vote_average: 1, release_date: "2024-01-01", original_language: "en", original_title: "Test Movie", overview: "test", popularity: 1 },
        "2": { id: 2, title: "Interstellar", popularity: 8.6, poster_path: "test.jpg", vote_average: 1, release_date: "2024-01-01", original_language: "en", original_title: "Test Movie", overview: "test", popularity: 1 },
        "3": { id: 3, title: "Test Movie", popularity: 8.6, poster_path: "test.jpg", vote_average: 1, release_date: "2024-01-01", original_language: "en", original_title: "Test Movie", overview: "test", popularity: 1 },
    },
    favorites: {
        "1": { id: 1, title: "Inception", popularity: 8.8, poster_path: "test.jpg", vote_average: 1, release_date: "2024-01-01", original_language: "en", original_title: "Test Movie", overview: "test", popularity: 1 },
        "2": { id: 2, title: "Interstellar", popularity: 8.6, poster_path: "test.jpg", vote_average: 1, release_date: "2024-01-01", original_language: "en", original_title: "Test Movie", overview: "test", popularity: 1 },
    }
})

const networkStore = NetworkStore.create({})

const mockStore = RootStore.create({
    movie: movieStore,
    network: networkStore
})

it('shows a filled star if list item is saved', () => {
    const movieDetail = render(
        <StoreContext.Provider value={{ store: mockStore }}>
            <MovieDetail route={{ params: { movieId: 1, fontFamily: "Jost-ExtraBoldItalic" } }} />
        </StoreContext.Provider>
    );

    const starIcon = movieDetail.getByLabelText("starIcon")

    expect(starIcon.props.fill).toBe("white")
})

it('shows a transparent star if list item is not saved', () => {
    const movieDetail = render(
        <StoreContext.Provider value={{ store: mockStore }}>
            <MovieDetail route={{ params: { movieId: 3, fontFamily: "Jost-ExtraBoldItalic" } }} />
        </StoreContext.Provider>
    );

    const starIcon = movieDetail.getByLabelText("starIcon")

    expect(starIcon.props.fill).toBe("transparent")
})
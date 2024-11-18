import { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, RefreshControl, ScrollView } from 'react-native';
import { Text, MovieCard, Box } from 'src/components';
import { FlashList } from '@shopify/flash-list';
import {
    API_KEY
} from '@env';
import { NavigationProp } from '@react-navigation/native';
import API from 'src/api';
import { StoreContext } from 'src/context';
import { observer } from 'mobx-react';

const keyExtractor = (item: Movie) => item.id.toString();

type Movie = {
    id: number;
    title: string;
    poster_path: string;
}

export default observer(function MovieCarousels({ navigation }: { navigation: NavigationProp<any> }) {
    const { store: RootStore } = useContext(StoreContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchMovies() {
            setLoading(true);
            await RootStore.movie.fetchAllMovies(['now_playing', 'popular', 'upcoming']);
            setLoading(false);
        }
        fetchMovies();
    }, []);

    if (loading) {
        return (
            <Box flex={1} justifyContent="center" alignItems="center">
                <ActivityIndicator size="large" />
            </Box>
        );
    }

    const onMoviePress = (movieId: number) => {
        navigation.navigate('MovieDetail', { movieId: movieId });
    }

    const onRefresh = () => {
        RootStore.movie.fetchAllMovies(['now_playing', 'popular', 'upcoming']);
    }

    const renderItem = ({ item }: { item: Movie }) => {
        return (
            <MovieCard
                posterPath={item.poster_path}
                onPress={() => onMoviePress(item.id)}
            />
        );
    }


    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={loading}
                    onRefresh={onRefresh}
                />
            }
        >
            <Box flex={1} backgroundColor='white' >
                <Text fontSize={24}
                    fontWeight="bold"
                    color="#333"
                    textAlign="center"
                    marginTop={16} marginBottom={16}>Now Playing</Text>
                <FlashList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={[...RootStore.movie.nowPlaying]}
                    renderItem={renderItem}
                    estimatedItemSize={225}
                    keyExtractor={keyExtractor}
                    ListEmptyComponent={<Text>No movies found</Text>}
                />
                <Text fontSize={24}
                    fontWeight="bold"
                    color="#333"
                    textAlign="center"
                    marginTop={16} marginBottom={16}>Popular</Text>
                <FlashList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={[...RootStore.movie.popular]}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    ListEmptyComponent={<Text>No movies found</Text>}
                />

                <Text fontSize={24}
                    fontWeight="bold"
                    color="#333"
                    textAlign="center"
                    marginTop={16} marginBottom={16}>Upcoming</Text>
                <FlashList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={RootStore.movie.upcoming}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    ListEmptyComponent={<Text>No movies found</Text>} />
            </Box>
        </ScrollView>
    );
});

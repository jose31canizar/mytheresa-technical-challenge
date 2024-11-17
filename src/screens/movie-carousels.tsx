import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
import { Text, MovieCard, Box } from 'src/components';
import { FlashList } from '@shopify/flash-list';
import {
    API_KEY
} from '@env';
import { NavigationProp } from '@react-navigation/native';
import API from 'src/api';

type Movie = {
    id: number;
    title: string;
    poster_path: string;
}

export default function MovieCarousels({ navigation }: { navigation: NavigationProp<any> }) {


    const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
    const [popular, setPopular] = useState<Movie[]>([]);
    const [upcoming, setUpcoming] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const [nowPlayingRes, popularRes, upcomingRes] = await Promise.all([
                    API.getMovies({ path: 'now_playing' }),
                    API.getMovies({ path: 'popular' }),
                    API.getMovies({ path: 'upcoming' })
                ]);


                setNowPlaying(nowPlayingRes.results);
                setPopular(popularRes.results);
                setUpcoming(upcomingRes.results);
            } catch (error) {
                console.error('Error fetching movies:', error);
            } finally {
                setLoading(false);
            }
        };

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

    return (
        <ScrollView>
            <Box flex={1} >
                <Text marginBottom={16}>Now Playing</Text>
                <FlashList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={nowPlaying}
                    renderItem={({ item }) => (
                        <MovieCard
                            posterPath={item.poster_path}
                            onPress={() => onMoviePress(item.id)}
                        />
                    )}
                    estimatedItemSize={225}
                    keyExtractor={item => item.id.toString()}
                />

                <Text marginVertical={16}>Popular</Text>
                <FlashList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={popular}
                    renderItem={({ item }) => (
                        <MovieCard
                            posterPath={item.poster_path}
                            onPress={() => onMoviePress(item.id)}
                        />
                    )}
                    keyExtractor={item => item.id.toString()}
                />

                <Text marginBottom={16}>Upcoming</Text>
                <FlashList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={upcoming}
                    renderItem={({ item }) => (
                        <MovieCard
                            posterPath={item.poster_path}
                            onPress={() => onMoviePress(item.id)}
                        />
                    )}
                    keyExtractor={item => item.id.toString()}
                />
            </Box>
        </ScrollView>
    );
}

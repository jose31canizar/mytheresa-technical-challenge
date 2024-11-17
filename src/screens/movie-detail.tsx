import { useEffect } from 'react';
import { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { ActivityIndicator, Image, ScrollView } from 'react-native';
import { Box, Pressable, Text } from 'src/components';
import API from 'src/api';
import { Star } from 'src/icons';

export default function MovieDetail({ route }: { route: { params: { movieId: number } } }) {
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await API.getMovieDetails({ movieId: route.params.movieId });
                setMovie(response);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [route?.params?.movieId]);

    if (loading) {
        return (
            <Box flex={1} justifyContent="center" alignItems="center">
                <ActivityIndicator size="large" />
            </Box>
        );
    }

    if (!movie) {
        return (
            <Box flex={1} justifyContent="center" alignItems="center">
                <Text>Failed to load movie details</Text>
            </Box>
        );
    }

    return (
        <ScrollView>
            <Box flex={1} padding={16}>
                <Text marginBottom={16}>
                    {movie.title}
                </Text>

                <Box flexDirection="row">
                    <Box flex={1}>
                        <Image
                            source={{
                                uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                            }}
                            style={{
                                width: '100%',
                                height: 300,
                                borderRadius: 8
                            }}
                        />
                    </Box>

                    <Box flex={1} paddingLeft={16}>
                        <Text variant="body" marginBottom="m">
                            {movie.overview}
                        </Text>

                        <Box flexDirection="row" alignItems="center">
                            <Text marginRight={4}>Rating: </Text>
                            <Text>{movie.vote_average}/10</Text>
                        </Box>

                        <Box flexDirection="row" alignItems="center" marginVertical={4}>
                            <Text marginRight={4}>Release Date: </Text>
                            <Text>{movie.release_date}</Text>
                        </Box>

                        <Pressable
                            onPress={() => {
                                // Add to wishlist logic here
                            }}
                            style={({ pressed }) => ({
                                opacity: pressed ? 0.7 : 1
                            })}
                        >
                            <Box
                                flexDirection="row"
                                alignItems="center"
                                backgroundColor="primary"
                                padding={4}
                                borderRadius={8}
                            >
                                <Star size={20} color="white" />
                                <Text color="white" marginLeft={4}>Add to Wishlist</Text>
                            </Box>
                        </Pressable>
                    </Box>
                </Box>
            </Box>
        </ScrollView>
    );
}

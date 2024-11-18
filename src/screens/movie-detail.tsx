import { useCallback, useContext } from 'react';
import { useState } from 'react';
import { Image, ScrollView } from 'react-native';
import { Box, Pressable, Text } from 'src/components';
import { Star } from 'src/icons';
import { StoreContext } from 'src/context';
import { observer } from 'mobx-react';

export default observer(function MovieDetail({ route }: { route: { params: { movieId: number } } }) {
    const { store: RootStore } = useContext(StoreContext)
    const [movie, setMovie] = useState(RootStore.movie.getMovie(route.params.movieId));

    if (!movie) {
        return (
            <Box flex={1} justifyContent="center" alignItems="center">

                <Text>Failed to load movie details</Text>
            </Box>
        );
    }

    const buttonColor = useCallback(() => {
        return RootStore.movie.isFavorite(movie) ? "#FF3B30" : "#007AFF"
    }, [movie, RootStore.movie.favorites.size])

    return (
        <ScrollView>
            <Box flex={1} padding={8} backgroundColor="white">
                <Text
                    fontSize={24}
                    fontWeight="bold"
                    color="#333"
                    textAlign="center"
                    marginTop={8}
                    marginBottom={16}
                >
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

                    <Box flex={1} paddingLeft={8} justifyContent="space-between">
                        <Box backgroundColor="#f0f0f0" paddingTop={8} paddingLeft={12} paddingRight={12} paddingBottom={8} borderRadius={8} >
                            <Text fontSize={12} color="#333">
                                {movie.overview}
                            </Text>
                        </Box>
                        <Box>
                            <Pressable
                                onPress={() => {
                                    if (RootStore.movie.isFavorite(movie)) {
                                        RootStore.movie.removeFavorite(movie)
                                    } else {
                                        RootStore.movie.addFavorite(movie)
                                    }
                                }}
                                style={({ pressed }) => ({
                                    opacity: pressed ? 0.7 : 1
                                })}
                            >
                                <Box
                                    flexDirection="row"
                                    backgroundColor={buttonColor()}
                                    padding={16}
                                    borderRadius={16}
                                >
                                    <Star size={20} color="white" />
                                    <Text color="white" marginLeft={4}>{RootStore.movie.isFavorite(movie) ? "Remove Favorite" : "Add to Favorites"}</Text>
                                </Box>
                            </Pressable>
                        </Box>

                    </Box>

                </Box>
                <Box alignItems="center" backgroundColor="#f0f0f0" padding={8} borderRadius={8} marginBottom={8} marginTop={16}>
                    <Text fontWeight="bold" marginRight={4}>Rating: </Text>
                    <Box backgroundColor="#007AFF" marginBottom={4} paddingVertical={4} borderRadius={4} paddingHorizontal={8}>
                        <Text color="white" fontWeight="bold">{movie.vote_average}/10</Text>
                    </Box>
                </Box>
                <Box alignItems="center" backgroundColor="#f0f0f0" padding={8} borderRadius={8} marginBottom={8}>
                    <Text fontWeight="bold" marginRight={4} marginBottom={4}>Release Date: </Text>
                    <Text fontWeight="bold" color="black">{new Date(movie.release_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}</Text>
                </Box>
            </Box>
        </ScrollView >
    );
}
);
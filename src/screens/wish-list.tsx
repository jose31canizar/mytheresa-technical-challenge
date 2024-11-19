import { observer } from 'mobx-react';
import { useContext, useMemo } from 'react';
import { Image, ScrollView } from 'react-native';
import { Box, Text, SafeAreaView, Pressable } from 'src/components';
import { StoreContext } from 'src/context';
import { MovieDTO } from 'src/store/movie-store';

export default observer(function WishList() {
    const { store: RootStore } = useContext(StoreContext);
    const favorites = useMemo(() => Array.from(RootStore.movie.favorites.values()) as MovieDTO[],
        [RootStore.movie.favorites.size])



    return (
        <SafeAreaView flex={1} backgroundColor="white" padding={8}>
            <Text
                fontSize={24}
                fontWeight="bold"
                color="#3   33"
                textAlign="center"
                marginTop={8}
                marginBottom={16}
            >
                My Favorites
            </Text>

            {favorites.length === 0 ? (
                <Box flex={1} justifyContent="center" alignItems="center">
                    <Text fontSize={16} color="#666">
                        No favorites added yet
                    </Text>
                </Box>
            ) : (
                <ScrollView>
                    {favorites.map(movie => (
                        <Box
                            key={movie.id}
                            flexDirection="row"
                            padding={8}
                            marginBottom={8}
                            backgroundColor="#f0f0f0"
                            borderRadius={8}
                        >
                            <Image
                                source={{
                                    uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                }}
                                style={{
                                    width: 80,
                                    height: 120,
                                    borderRadius: 4
                                }}
                            />
                            <Box flex={1} paddingLeft={8} justifyContent="space-between">
                                <Text fontSize={16} fontWeight="bold" color="#333">
                                    {movie.title}
                                </Text>
                                <Text fontSize={12} color="#666" numberOfLines={3}>
                                    {movie.overview}
                                </Text>
                                <Pressable
                                    onPress={() => RootStore.movie.removeFavorite(movie)}
                                    style={({ pressed }) => ({
                                        opacity: pressed ? 0.7 : 1
                                    })}
                                >
                                    <Box
                                        backgroundColor="#FF3B30"
                                        padding={8}
                                        borderRadius={8}
                                        alignItems="center"
                                    >
                                        <Text color="white" fontSize={12}>
                                            Remove from Favorites
                                        </Text>
                                    </Box>
                                </Pressable>
                            </Box>
                        </Box>
                    ))}
                </ScrollView>
            )}
        </SafeAreaView>
    );
})

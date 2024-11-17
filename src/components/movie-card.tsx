import { Image, Pressable } from 'react-native';

export default function MovieCard({ posterPath, onPress }: { posterPath: string, onPress: () => void }) {
    return (
        <Pressable onPress={onPress}>
            <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${posterPath}` }}
                style={{ width: 150, height: 225, marginRight: 10 }}
            />
        </Pressable>
    );

}
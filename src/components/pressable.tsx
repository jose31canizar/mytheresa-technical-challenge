import React from 'react';
import styled from 'styled-components/native';
import { Pressable as RNPressable, PressableProps } from 'react-native';

interface CustomPressableProps extends PressableProps {
    children: React.ReactNode;
}

const StyledPressable = styled(RNPressable)`
    flex-direction: ${({ flexDirection }: { flexDirection: string }) => flexDirection};
    align-items: ${({ alignItems }: { alignItems: string }) => alignItems};
    justify-content: ${({ justifyContent }: { justifyContent: string }) => justifyContent};
    opacity: ${({ pressed }) => pressed ? 0.7 : 1};
    transition: opacity 0.2s;
`;

export default function Pressable({ children, ...props }: CustomPressableProps) {
    return (
        <StyledPressable {...props}>
            {({ pressed }) => (
                <>{children}</>
            )}
        </StyledPressable>
    );
}

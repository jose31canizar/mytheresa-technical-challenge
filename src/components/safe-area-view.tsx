import React from 'react';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native';

const StyledSafeAreaView = styled(SafeAreaView)`
    flex: 1;
    background-color: #FFFFFF;
`;

interface SafeAreaViewProps {
    children: React.ReactNode;
}

export default function CustomSafeAreaView({ children }: SafeAreaViewProps) {
    return (
        <StyledSafeAreaView>
            {children}
        </StyledSafeAreaView>
    );
}

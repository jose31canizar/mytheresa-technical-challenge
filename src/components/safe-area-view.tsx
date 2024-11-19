import React, { PropsWithChildren } from 'react';
import { Edge, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Box } from './index';
import { BoxProps } from './box';



interface SafeAreaViewProps extends BoxProps {
    edges?: Edge[] | undefined;
}

const SafeAreaView = ({ children, edges, ...restProps }: PropsWithChildren<SafeAreaViewProps>) => {
    const insets = useSafeAreaInsets();

    return (
        <Box
            {...restProps}
            style={{
                paddingTop: !edges || edges.includes('top') ? insets.top : undefined,
                paddingBottom: !edges || edges.includes('bottom') ? (insets.bottom === 0 ? 16 : insets.bottom) : undefined
            }}
        >
            {children}
        </Box >
    );
};

export default SafeAreaView;

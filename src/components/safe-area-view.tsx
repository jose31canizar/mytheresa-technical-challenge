import React, { PropsWithChildren, useCallback } from 'react';
import { ViewProps } from 'react-native';
import { Edge, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Box } from './index';



interface SafeAreaViewProps {
    edges?: Edge[] | undefined;
}

const SafeAreaView = ({ children, edges, ...restProps }: PropsWithChildren<SafeAreaViewProps>) => {
    const insets = useSafeAreaInsets();
    // @ts-ignore

    const edgesStyle = useCallback(() => {
        if (edges.includes('bottom')) {
            return {
                paddingBottom: insets.bottom === 0 ? 16 : insets.bottom,
            };
        } else {
            return { paddingTop: insets.top };
        }
    }, [edges, insets]);

    return (
        <Box
            {...restProps}
            style={[
                !edges || (edges.includes('top') && edges.includes('bottom'))
                    ? {
                        paddingTop: insets.top,
                        paddingBottom:
                            insets.bottom === 0 ? 16 : insets.bottom,
                    }
                    : edgesStyle(),
            ]}
        >
            {children}
        </Box>
    );
};

export default SafeAreaView;

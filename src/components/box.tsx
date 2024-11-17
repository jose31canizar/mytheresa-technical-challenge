import React from 'react';
import styled from 'styled-components/native';

interface BoxProps {
    children?: React.ReactNode;
    padding?: number;
    margin?: number;
    backgroundColor?: string;
    width?: string | number;
    height?: string | number;
    flex?: number;
    alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch';
    justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
    flexDirection?: 'row' | 'column';
}

const StyledBox = styled.View<BoxProps>`
  ${({ padding }) => padding && `padding: ${padding}px`};
  ${({ margin }) => margin && `margin: ${margin}px`};
  ${({ backgroundColor }) => backgroundColor && `background-color: ${backgroundColor}`};
  ${({ width }) => width && `width: ${typeof width === 'number' ? `${width}px` : width}`};
  ${({ height }) => height && `height: ${typeof height === 'number' ? `${height}px` : height}`};
  ${({ flex }) => flex && `flex: ${flex}`};
  ${({ alignItems }) => alignItems && `align-items: ${alignItems}`};
  ${({ justifyContent }) => justifyContent && `justify-content: ${justifyContent}`};
  flex-direction: ${({ flexDirection }) => flexDirection || 'column'};
`;

const Box: React.FC<BoxProps> = ({ children, ...props }) => {
    return <StyledBox {...props}>{children}</StyledBox>;
};

export default Box;

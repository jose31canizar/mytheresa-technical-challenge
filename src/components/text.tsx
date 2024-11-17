import React from 'react';
import styled from 'styled-components/native';

interface TextProps {
    children?: React.ReactNode;
    color?: string;
    fontSize?: number;
    fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
    textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
    margin?: number;
    padding?: number;
    numberOfLines?: number;
}

const StyledText = styled.Text<TextProps>`
  ${({ color }) => color && `color: ${color}`};
  ${({ fontSize }) => fontSize && `font-size: ${fontSize}px`};
  ${({ fontWeight }) => fontWeight && `font-weight: ${fontWeight}`};
  ${({ textAlign }) => textAlign && `text-align: ${textAlign}`};
  ${({ margin }) => margin && `margin: ${margin}px`};
  ${({ padding }) => padding && `padding: ${padding}px`};
`;

const Text: React.FC<TextProps> = ({ children, numberOfLines, ...props }) => {
    return (
        <StyledText numberOfLines={numberOfLines} {...props}>
            {children}
        </StyledText>
    );
};

export default Text;
